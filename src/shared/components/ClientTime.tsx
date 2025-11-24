"use client";

import { useEffect, useState } from "react";

export function ClientTime({ date }: { date: number | string }) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    const ts = typeof date === "string" ? Number(date) : date;
    if (!ts || Number.isNaN(ts)) {
      setFormatted("Invalid Date");
      return;
    }

    function format() {
      const diff = Date.now() - ts;
      const seconds = Math.floor(diff / 1000);

      if (seconds < 60) return `${seconds}s ago`;
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    }

    // первая установка
    setFormatted(format());

    // обновление каждые 30 секунд
    const interval = setInterval(() => {
      setFormatted(format());
    }, 30_000);

    return () => clearInterval(interval);
  }, [date]);

  return <>{formatted}</>;
}
