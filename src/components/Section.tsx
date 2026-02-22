import { ReactNode } from "react";

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export default function Section({ id, className = "", children }: Props) {
  return (
    <section
      id={id}
      className={[
        "relative min-h-[100svh] flex items-center overflow-hidden",
        "bg-transparent",
        className,
      ].join(" ")}
    >
      {/* Atmospheric overlay — light mode */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.05),transparent_60%)] opacity-70" />
        <div className="grain opacity-60" />
      </div>

      {/* Atmospheric overlay — dark mode */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.04),transparent_60%)] opacity-70" />
        <div className="grain opacity-60" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-20 md:py-24 z-10">
        {children}
      </div>
    </section>
  );
}