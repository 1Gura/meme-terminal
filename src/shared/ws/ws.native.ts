export function connect() {
  let socket: WebSocket | null = null;
  let reconnectTimer: any = null;

  function start() {
    socket = new WebSocket("wss://launch.meme/connection/websocket");

    socket.onopen = () => {
      console.log("🟢 WS open");

      // === CONNECT === //
      socket!.send(
        JSON.stringify({
          connect: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcm9udCIsImlhdCI6MTc1MTkwMzI5Mn0.4ANk5jn-BaOq9K3rfZnoW3D-vvSTPMN2CeDFElKN0HY",
            name: "js",
          },
          id: 1,
        })
      );

      // === SUBSCRIBE TO PUMPFUN CHANNEL === //
      socket!.send(
        JSON.stringify({
          subscribe: {
            channel: "pumpfun-mintTokens",
          },
          id: 2,
        })
      );
    };

    socket.onmessage = (event) => {
      // raw message string
      const raw = event.data;

      if (typeof raw !== "string") {
        console.warn("Non-text WS message, skipping:", raw);
        return;
      }

      // Иногда Centrifugo добавляет многоканальные батчи через "\n"
      const messages = raw.split("\n").filter(Boolean);

      for (const msg of messages) {
        try {
          const json = JSON.parse(msg);

          // ------------------------------
          // 🔥 Обработка PUSH-сообщений
          // ------------------------------
          if (json.push) {
            const channel = json.push.channel;
            const data = json.push.data?.pub?.data;

            console.log("🔥 PUSH EVENT:", channel, data);
            continue;
          }

          // ------------------------------
          // 📣 Публикации (обычные)
          // ------------------------------
          if (json.pub) {
            console.log("📣 PUBLICATION:", json.pub);
            continue;
          }

          console.log("📨 MESSAGE:", json);
        } catch (err) {
          console.warn("❌ Failed to parse WS message:", err);
          console.log("Message:", msg);
        }
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
      clearTimeout(reconnectTimer);
      socket?.close();
    },
  };
}
