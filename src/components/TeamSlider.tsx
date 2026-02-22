"use client";

import Link from "next/link";
import PremiumCard from "@/components/PremiumCard";
import { aboutIntro, aboutSections, aboutCTAs } from "@/lib/about";

export default function TeamSlider() {
  return (
    <div className="space-y-5">
      <PremiumCard
        className="
          p-7 md:p-8
          shadow-[0_18px_70px_rgba(0,0,0,0.18)]
          dark:shadow-[0_18px_70px_rgba(255,255,255,0.08)]
        "
      >
        <div className="space-y-5">
          <div className="text-xs font-semibold tracking-[0.22em] opacity-70">
            {aboutIntro.eyebrow}
          </div>

          <div className="text-2xl md:text-3xl font-semibold tracking-tight">
            {aboutIntro.title}
          </div>

          <div className="text-sm md:text-base opacity-80 leading-relaxed max-w-2xl">
            {aboutIntro.subtitle}
          </div>

          <div className="grid gap-3 md:grid-cols-3 pt-2">
            {aboutSections.slice(0, 3).map((s) => (
              <div
                key={s.title}
                className="
                  rounded-2xl border border-black/10 dark:border-white/10
                  bg-black/[0.03] dark:bg-white/[0.04]
                  p-5
                "
              >
                <div className="text-sm font-semibold tracking-tight">
                  {s.title}
                </div>
                <div className="mt-2 text-sm opacity-70 leading-relaxed">
                  {s.body}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {aboutCTAs.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="
                  inline-flex items-center gap-2 rounded-2xl
                  border border-black/12 bg-black/5 text-black
                  dark:border-white/15 dark:bg-white/5 dark:text-white
                  px-5 py-3 text-sm font-semibold
                  opacity-90 hover:opacity-100 transition
                "
              >
                {c.label} <span aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </div>
      </PremiumCard>
    </div>
  );
}