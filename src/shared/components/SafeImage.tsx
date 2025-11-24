// shared/components/SafeImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

function isValidUrl(url: string | null): boolean {
  if (!url) return false;
  try {
    // Абсолютные ссылки
    if (url.startsWith("http://") || url.startsWith("https://")) {
      new URL(url);
      return true;
    }
    // Локальные
    if (url.startsWith("/")) return true;

    return false;
  } catch {
    return false;
  }
}

// Проверяем разрешённые хосты
function isAllowedHost(url: string) {
  try {
    const u = new URL(url);
    return ["localhost", "yourdomain.com"].includes(u.hostname);
  } catch {
    return false;
  }
}

// === ПУСТОЙ ПЛЕЙСХОЛДЕР ===
function Placeholder({ width, height, className }: any) {
  return <div className={`rounded-xl bg-zinc-800 ${className || ""}`} style={{ width, height }} />;
}

export function SafeImage({
  src,
  alt,
  width = 48,
  height = 48,
  className,
}: {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const valid = isValidUrl(src);
  const [error, setError] = useState(false);

  // ❗ Если ссылка невалидна или произошла ошибка — показываем пустую ячейку
  if (!valid || error) {
    return <Placeholder width={width} height={height} className={className} />;
  }

  if (src!.startsWith("http") && !isAllowedHost(src!)) {
    return (
      <img
        src={src!}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <Image
      src={src!}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  );
}
