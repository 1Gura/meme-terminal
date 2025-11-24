import { WS_TOKEN, WS_URL } from "./ws.config";
import type { WSCallback, WSChannel, WSSubscription } from "./ws.types";
import { Centrifuge } from "centrifuge";

export class WebsocketService {
  private centrifuge = new Centrifuge(WS_URL, { token: WS_TOKEN });
  private connected = false;
  private reconnectAttempts = 0;

  private callbacks = new Map<WSChannel, WSCallback[]>();
  private activeSubs = new Map<WSChannel, ReturnType<typeof this.centrifuge.newSubscription>>();

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
        this.createOrRestoreSubscription(channel);
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

  private createOrRestoreSubscription(channel: WSChannel) {
    if (this.activeSubs.has(channel)) return;

    const sub = this.centrifuge.newSubscription(channel);

    sub.on("publication", (ctx) => {
      const cbs = this.callbacks.get(channel);
      if (cbs) cbs.forEach((cb) => cb(ctx.data));
    });

    sub.subscribe();
    this.activeSubs.set(channel, sub);
  }

  subscribe<C extends WSChannel>(channel: C, callback: WSCallback<C>): WSSubscription {
    if (!this.callbacks.has(channel)) {
      this.callbacks.set(channel, []);
    }
    this.callbacks.get(channel)!.push(callback);

    if (this.connected) {
      this.createOrRestoreSubscription(channel);
    }

    return {
      unsubscribe: () => {
        const list = this.callbacks.get(channel);
        if (!list) return;

        const updated = list.filter((cb) => cb !== callback);

        if (updated.length === 0) {
          this.callbacks.delete(channel);

          const sub = this.activeSubs.get(channel);
          if (sub) {
            sub.unsubscribe();
            this.activeSubs.delete(channel);
          }
        } else {
          this.callbacks.set(channel, updated);
        }
      },
    };
  }
}

export const wsService = new WebsocketService();
