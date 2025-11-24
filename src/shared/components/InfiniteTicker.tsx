"use client";

import { ReactNode, useEffect, useRef } from "react";

export function InfiniteTicker({
  children,
  speed = 40,
  className = "",
  title = "The most popular tokens",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  title?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let last = performance.now();

    const step = (now: number) => {
      const dt = now - last;
      last = now;

      pos.current -= (speed * dt) / 1000;

      const width = el.scrollWidth;
      if (Math.abs(pos.current) >= width) {
        pos.current = 0;
      }

      el.style.transform = `translateX(${pos.current}px)`;

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [speed]);

  return (
    <div className={className}>
      <h2 className="text-3xl font-semibold text-center text-white mb-3 px-1">{title}</h2>

      <div className="overflow-hidden whitespace-nowrap">
        <div ref={trackRef} className="inline-flex gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}
