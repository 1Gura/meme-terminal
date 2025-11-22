"use client";

import {useEffect, useRef} from "react";

export function SpotlightCursor() {
    const lightRef = useRef<HTMLDivElement>(null);

    const x = useRef(0);
    const y = useRef(0);
    const size = useRef(400);
    const blur = useRef(120);

    const targetX = useRef(0);
    const targetY = useRef(0);
    const targetSize = useRef(400);
    const targetBlur = useRef(120);

    // ⭐ Новая переменная — яркость
    const intensity = useRef(0.35);        // базовая яркость
    const targetIntensity = useRef(0.35);  // целевая яркость

    const raf = useRef(0);

    useEffect(() => {
        const el = lightRef.current;
        if (!el) return;

        const handleMove = (e: MouseEvent) => {
            targetX.current = e.clientX;
            targetY.current = e.clientY;
        };

        const handleClick = () => {
            // ⭐ Усиливаем яркость
            targetIntensity.current = 0.65;

            // ⭐ Возвращаем обратно через 250ms
            setTimeout(() => {
                targetIntensity.current = 0.35;
            }, 250);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("click", handleClick);

        const animate = () => {
            const factor = 0.12;

            x.current += (targetX.current - x.current) * factor;
            y.current += (targetY.current - y.current) * factor;
            size.current += (targetSize.current - size.current) * factor;
            blur.current += (targetBlur.current - blur.current) * factor;

            // ⭐ Плавная интерполяция яркости
            intensity.current += (targetIntensity.current - intensity.current) * factor;

            el.style.left = x.current - size.current / 2 + "px";
            el.style.top = y.current - size.current / 2 + "px";
            el.style.width = size.current + "px";
            el.style.height = size.current + "px";
            el.style.filter = `blur(${blur.current}px)`;

            // ⭐ Подставляем обновлённую яркость
            el.style.background = `
                radial-gradient(
                    circle,
                    rgba(255,120,30,${intensity.current}),
                    rgba(255,90,0,${intensity.current * 0.45}),
                    transparent 70%
                )
            `;

            raf.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(raf.current);
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div
            ref={lightRef}
            style={{
                position: "fixed",
                pointerEvents: "none",
                zIndex: 1,
                borderRadius: "50%",
                background:
                    "radial-gradient(circle, rgba(255,120,30,0.35), rgba(255,90,0,0.15), transparent 70%)",
            }}
        />
    );
}
