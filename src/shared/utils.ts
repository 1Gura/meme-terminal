import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(addr: string, start = 4, end = 4) {
  if (!addr) return "";
  if (addr.length <= start + end) return addr;
  return `${addr.slice(0, start)}...${addr.slice(-end)}`;
}

export function safeImage(src?: string | null) {
  if (!src || src === "null" || src === "/images/empty.gif") {
    return "/mocks/img/token.png";
  }
  return src;
}
