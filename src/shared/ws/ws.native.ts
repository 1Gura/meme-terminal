// ws-connect.ts
import { WS_TOKEN } from "./ws.config";
import { PumpfunTokenEvent } from "./ws.types";

export interface PushMessage {
  push: {
    channel: string;
    pub: {
      data: PumpfunTokenEvent;
    };
  };
}

let alreadyStarted = false;

export function connect(
  url: string,
  channels: string[],
  onPush: (channel: string, data: PumpfunTokenEvent) => void
) {
  if (alreadyStarted) return;
  alreadyStarted = true;

  let socket: WebSocket | null = null;
  let reconnectTimer: NodeJS.Timeout | null = null;

  function start() {
    socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("🟢 WS open:", url);

      // CONNECT handshake
      socket!.send(
        JSON.stringify({
          connect: {
            token: WS_TOKEN,
            name: "js",
          },
          id: 1,
        })
      );

      // SUBSCRIBE to multiple channels
      channels.forEach((ch, idx) => {
        socket!.send(
          JSON.stringify({
            subscribe: { channel: ch },
            id: 10 + idx,
          })
        );
        console.log("📡 Subscribed to:", ch);
      });
    };

    socket.onmessage = (event) => {
      if (typeof event.data !== "string") return;

      try {
        const msg = JSON.parse(event.data) as PushMessage;

        if (!msg.push) return;

        const channel = msg.push.channel;
        const data = msg.push.pub?.data;
        if (!data) return;

        onPush(channel, data);
      } catch (err) {
        console.warn("WS parse error:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("🔴 WS error:", err);
    };

    socket.onclose = () => {
      console.log("🟠 WS closed — reconnecting in 1s…");

      reconnectTimer = setTimeout(() => start(), 1000);
    };
  }

  start();

  return {
    close: () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      socket?.close();
      alreadyStarted = false;
    },
  };
}
