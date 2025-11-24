import { PumpfunTokenEvent } from "@/shared/ws/ws.types";

let alreadyStarted = false;

interface PushMessage {
  push: {
    channel: string;
    pub: {
      data: PumpfunTokenEvent;
    };
  };
}

export function connect(onPush: (ev: PumpfunTokenEvent) => void) {
  if (alreadyStarted) return;
  alreadyStarted = true;

  let socket: WebSocket | null = null;
  let reconnectTimer: any = null;

  function start() {
    socket = new WebSocket("wss://launch.meme/connection/websocket");

    socket.onopen = () => {
      socket!.send(
        JSON.stringify({
          connect: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcm9udCIsImlhdCI6MTc1MTkwMzI5Mn0.4ANk5jn-BaOq9K3rfZnoW3D-vvSTPMN2CeDFElKN0HY",
            name: "js",
          },
          id: 3,
        })
      );

      socket!.send(
        JSON.stringify({
          subscribe: {
            channel: "pumpfun-mintTokens",
          },
          id: 4,
        })
      );
    };

    socket.onmessage = (event) => {
      if (typeof event.data !== "string") return;

      const parts = event.data.split("\n").filter(Boolean);

      for (const part of parts) {
        try {
          const msg = JSON.parse(part) as PushMessage;

          if (!msg.push) continue;

          const data = msg.push.pub?.data;
          if (!data) continue;

          console.log("🔥 PUSH EVENT:", data);

          // 👉 Передаем данные в компонент
          onPush(data);
        } catch {
          // ignore
        }
      }
    };

    socket.onclose = () => {
      reconnectTimer = setTimeout(() => start(), 1000);
    };
  }

  start();

  return {
    close: () => {
      clearTimeout(reconnectTimer);
      socket?.close();
    },
  };
}
