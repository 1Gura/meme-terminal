import { WS_TOKEN, WS_URL } from "./ws.config";
import type { WSCallback, WSChannel, WSSubscription } from "./ws.types";
import { Centrifuge, type Subscription } from "centrifuge";

export class WebsocketService {
  private centrifuge = new Centrifuge(WS_URL, { token: WS_TOKEN });

  private connected = false;
  private reconnectAttempts = 0;

  private callbacks = new Map<WSChannel, WSCallback[]>();
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

      // Восстановить подписки после reconnect
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

  /**
   * Создать подписку, если её нет.
   */
  private ensureSubscription(channel: WSChannel) {
    // если у нас уже есть Subscription в this.activeSubs – просто выходим
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
    const list = this.callbacks.get(channel) ?? [];
    this.callbacks.set(channel, [...list, callback]);

    if (this.connected) {
      this.ensureSubscription(channel);
    }

    return {
      unsubscribe: () => {
        const current = this.callbacks.get(channel);
        if (!current) return;

        const nextList = current.filter((cb) => cb !== callback);

        // если нет других подписчиков на этот канал
        if (nextList.length === 0) {
          this.callbacks.delete(channel);

          const sub = this.activeSubs.get(channel);
          if (sub) {
            try {
              sub.removeAllListeners();
              sub.unsubscribe();
              // ключевой момент — удалить подписку из клиента Centrifuge
              this.centrifuge.removeSubscription(sub);
            } catch (e) {
              console.warn("[WS] unsubscribe cleanup error", e);
            }

            this.activeSubs.delete(channel);
          }
        } else {
          this.callbacks.set(channel, nextList);
        }
      },
    };
  }
}

export const wsService = new WebsocketService();
