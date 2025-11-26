// ws-connect.ts
import { WS_TOKEN } from "./ws.config";
import { PumpfunToken } from "./ws.types";

export interface PushMessage {
  push: {
    channel: string;
    pub: {
      data: PumpfunToken;
    };
  };
}

let alreadyStarted = false;

export function connect(
  url: string,
  channels: string[],
  onPush: (channel: string, data: PumpfunToken) => void
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

      channels.forEach((ch, idx) => {
        socket!.send(
          JSON.stringify({
            subscribe: { channel: ch },
            id: 10 + idx,
          })
        );
      });
    };

    socket.onmessage = (event) => {
      const text = typeof event.data === "string" ? event.data.trim() : "";

      if (!text.startsWith("{")) return;

      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        return;
      }

      if (!json.push || !json.push.pub) return;

      const channel = json.push.channel;
      const data = json.push.pub.data;

      if (data) onPush(channel, data);
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
