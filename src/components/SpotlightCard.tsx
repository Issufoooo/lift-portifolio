"use client";

import React, { useRef, useState, MouseEvent, TouchEvent } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function SpotlightCard({
  children,
  className = "",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const setFromClient = (clientX: number, clientY: number) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: clientX - rect.left, y: clientY - rect.top });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setFromClient(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    if (!t) return;
    setOpacity(1);
    setFromClient(t.clientX, t.clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    if (!t) return;
    setFromClient(t.clientX, t.clientY);
  };

  const handleTouchEnd = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={[
        "relative overflow-hidden rounded-3xl border backdrop-blur transition-all duration-300",
        // Light mode: card escuro (premium)
        "bg-[#0b0c0f]/92 text-white border-white/10",
        "shadow-[0_18px_70px_rgba(0,0,0,0.14)] hover:shadow-[0_28px_110px_rgba(0,0,0,0.20)] hover:border-white/18",
        // Dark mode: card claro (premium)
        "dark:bg-white/85 dark:text-black dark:border-black/10",
        "dark:shadow-[0_18px_70px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_28px_110px_rgba(0,0,0,0.12)] dark:hover:border-black/18",
        className,
      ].join(" ")}
      {...props}
    >
      {/* Spotlight: branco no light (card escuro), preto no dark (card claro) */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `
            radial-gradient(
              700px circle at ${position.x}px ${position.y}px,
              rgba(255,255,255,0.16),
              transparent 42%
            )
          `,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 dark:block hidden"
        style={{
          opacity,
          background: `
            radial-gradient(
              700px circle at ${position.x}px ${position.y}px,
              rgba(0,0,0,0.12),
              transparent 42%
            )
          `,
        }}
        aria-hidden
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
