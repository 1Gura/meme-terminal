import { PumpfunToken, PushMessage } from "@/shared/ws/ws.types";
import { WS_TOKEN } from "@/shared/ws/ws.config";

let socket: WebSocket | null = null;
let reconnectTimer: NodeJS.Timeout | null = null;
let isStarting = false;
let listeners: Array<(ch: string, d: PumpfunToken) => void> = [];

export function connect(
  url: string,
  channels: string[],
  onPush: (channel: string, data: PumpfunToken) => void
) {
  listeners.push(onPush);

  if (socket && socket.readyState !== WebSocket.CLOSED) {
    return { close: unsubscribe };
  }

  if (isStarting) return { close: unsubscribe };
  isStarting = true;

  function start() {
    socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("🟢 WS open");

      socket!.send(
        JSON.stringify({
          connect: { token: WS_TOKEN, name: "js" },
          id: 1,
        })
      );

      channels.forEach((ch, idx) => {
        socket!.send(
          JSON.stringify({
            subscribe: { channel: ch },
            id: 10 + idx,
          })
        );
      });

      isStarting = false;
    };

    socket.onmessage = (event) => {
      const txt = typeof event.data === "string" ? event.data.trim() : "";
      if (!txt.startsWith("{")) return;

      let json: PushMessage;
      try {
        json = JSON.parse(txt);
      } catch {
        return;
      }

      const ch = json.push?.channel;
      const data = json.push?.pub?.data;
      if (!ch || !data) return;

      listeners.forEach((cb) => cb(ch, data));
    };

    socket.onclose = () => {
      reconnectTimer = setTimeout(() => start(), 1000);
    };
  }

  start();

  return { close: unsubscribe };
}

function unsubscribe() {
  listeners = [];
}
