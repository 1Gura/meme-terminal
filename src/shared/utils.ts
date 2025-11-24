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

// utils/formatTinyPrice.ts

// utils/formatTinyUsd.ts
export function formatTinyUsd(value: number, currency = "$") {
  if (!value || value === 0) {
    return `${currency}0.0`;
  }

  const str = value.toFixed(20); // много знаков, чтобы сохранить точность
  const [, decimals] = str.split(".");

  // найти первую НЕ нулевую цифру
  const firstNonZero = decimals.search(/[1-9]/);

  if (firstNonZero === -1) {
    return `${currency}0.0`;
  }

  const visibleNumbers = decimals.slice(firstNonZero, firstNonZero + 4); // 4 значимых цифры

  return `${currency}0.` + `0`.repeat(firstNonZero) + `<sub>${firstNonZero}</sub>` + visibleNumbers;
}
