import { createContext, ReactNode, useContext } from "react";
import { wsService } from "@/shared/ws/ws.service";

const WSContext = createContext(wsService);

export function WebsocketProvider({ children }: { children: ReactNode }) {
  return <WSContext.Provider value={wsService}>{children}</WSContext.Provider>;
}

export const useWSContext = () => useContext(WSContext);
