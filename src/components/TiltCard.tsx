"use client";

import { ReactNode, useMemo, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const isCoarse = useMemo(() => {
    // evita tilt em mobile/touch devices
    if (typeof window === "undefined") return true;
    return window.matchMedia("(pointer: coarse)").matches;
  }, []);

  function onMove(e: React.MouseEvent) {
    if (isCoarse) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    // Tilt leve (premium, não “gaming”)
    const rotateY = (px - 0.5) * 10; // -5..5
    const rotateX = (0.5 - py) * 10; // -5..5

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`,
    });
  }

  function onLeave() {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)",
      transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
    });

    // remove transition after it settles
    window.setTimeout(() => setStyle({}), 450);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`
        ${className}
        will-change-transform
        transition-transform duration-300
        ${isCoarse ? "active:scale-[0.99]" : "hover:shadow-[0_25px_100px_rgba(0,0,0,0.10)]"}
      `}
      style={style}
    >
      {children}
    </div>
  );
}
