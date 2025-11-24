// shared/components/SafeImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

const isExternal = (src: string | null) => {
  if (!src) return false;
  try {
    const url = new URL(src);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export function SafeImage({
  src,
  alt,
  width = 48,
  height = 48,
  className = "rounded-xl",
}: {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const showPlaceholder = !src || error;

  return (
    <div style={{ width, height }} className={`relative overflow-hidden bg-[#1a1f2e] ${className}`}>
      {!loaded && <div className="absolute inset-0 bg-[#1a1f2e] rounded-xl animate-pulse" />}

      {showPlaceholder && <div className="absolute inset-0 bg-[#1a1f2e] rounded-xl" />}

      {!showPlaceholder &&
        (() => {
          try {
            if (!isExternal(src)) {
              return (
                <Image
                  src={src!}
                  alt={alt}
                  width={width}
                  height={height}
                  className={`object-cover rounded-xl transition-opacity ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                  unoptimized
                  onLoad={() => setLoaded(true)}
                  onError={() => setError(true)}
                />
              );
            }

            return (
              <img
                src={src!}
                alt={alt}
                width={width}
                height={height}
                className={`object-cover rounded-xl transition-opacity ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
              />
            );
          } catch {
            setError(true);
            return null;
          }
        })()}
    </div>
  );
}
