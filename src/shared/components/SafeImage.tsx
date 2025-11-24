import Image from "next/image";
import { useState } from "react";

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
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Надёжная проверка: если src явно сломан или был error — НЕ рендерим <Image />
  const canRenderImage =
    !!src &&
    !error &&
    (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/"));

  return (
    <div
      style={{ width, height }}
      className={`relative overflow-hidden bg-[#1a1f2e] ${className}`}
      aria-label={alt}
    >
      {!loaded && <div className="absolute inset-0 rounded-xl bg-[#1a1f2e]" aria-hidden="true" />}

      {canRenderImage && (
        <Image
          src={src!}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover ${className} ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            console.warn("SafeImage: image failed → using placeholder instead:", src);
            setError(true);
            setLoaded(false);
          }}
        />
      )}
    </div>
  );
}
