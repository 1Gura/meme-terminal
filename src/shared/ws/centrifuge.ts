import { Centrifuge } from "centrifuge";

export function createCentrifugeClient(token: string) {
  return new Centrifuge("wss://launch.meme/connection/websocket", {
    token,
  });
}
