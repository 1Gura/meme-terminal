import { WS_TOKEN, WS_URL } from "./ws.config";
import type { PumpfunToken, WSCallback, WSChannel, WSSubscription } from "./ws.types";
import { Centrifuge, type Subscription } from "centrifuge";

export interface PumpfunPushMessage {
  push: {
    channel: string;
    pub: {
      data: PumpfunToken;
    };
  };
}

export class WebsocketService {
  private centrifuge = new Centrifuge(WS_URL, { token: WS_TOKEN });

  private connected = false;
  private reconnectAttempts = 0;

  // ключевой фикс: храним как массив ANY-колбэков
  private callbacks = new Map<WSChannel, WSCallback<unknown>[]>();

  private activeSubs = new Map<WSChannel, Subscription>();

  constructor() {
    this.attachBaseEvents();
    this.centrifuge.connect();
  }

  private attachBaseEvents() {
    this.centrifuge.on("connected", () => {
      console.log("%c[WS] Connected", "color: #4ade80");

      this.connected = true;
      this.reconnectAttempts = 0;

      for (const [channel] of this.callbacks.entries()) {
        this.ensureSubscription(channel);
      }
    });

    this.centrifuge.on("disconnected", () => {
      console.log("%c[WS] Disconnected", "color: #f87171");

      this.connected = false;
      this.scheduleReconnect();
    });
  }

  private scheduleReconnect() {
    this.reconnectAttempts++;

    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 15000);
    console.log(`[WS] reconnect in ${delay}ms`);

    setTimeout(() => this.centrifuge.connect(), delay);
  }

  private ensureSubscription(channel: WSChannel) {
    if (this.activeSubs.has(channel)) return;

    const sub = this.centrifuge.newSubscription(channel);

    sub.on("publication", (ctx) => {
      const msg = ctx.data as PumpfunPushMessage;
      const data = msg?.push?.pub?.data;
      if (!data) return;

      const cbs = this.callbacks.get(channel);
      if (!cbs) return;

      for (const cb of cbs) cb(data);
    });

    sub.subscribe();
    this.activeSubs.set(channel, sub);
  }

  subscribe<C extends WSChannel>(channel: C, callback: WSCallback<C>): WSSubscription {
    // приводим callback к унифицированному типу
    const existing = this.callbacks.get(channel) ?? [];
    this.callbacks.set(channel, [...existing, callback as WSCallback<unknown>]);

    if (this.connected) {
      this.ensureSubscription(channel);
    }

    return {
      unsubscribe: () => {
        const list = this.callbacks.get(channel);
        if (!list) return;

        const filtered = list.filter((cb) => cb !== callback);

        if (filtered.length === 0) {
          this.callbacks.delete(channel);

          const sub = this.activeSubs.get(channel);
          if (sub) {
            try {
              sub.removeAllListeners();
              sub.unsubscribe();
              this.centrifuge.removeSubscription(sub);
            } catch (e) {
              console.warn("[WS] unsubscribe cleanup error", e);
            }

            this.activeSubs.delete(channel);
          }
        } else {
          this.callbacks.set(channel, filtered);
        }
      },
    };
  }
}

export const wsService = new WebsocketService();
