"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef } from "react";
import PremiumCard from "@/components/PremiumCard";

type Project = any;

export default function WorkSlider({ projects }: { projects: Project[] }) {
  const items = useMemo(() => projects ?? [], [projects]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div className="text-sm md:text-base font-semibold tracking-[0.18em] opacity-75">
          TRABALHOS
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="
              h-10 w-10 rounded-2xl grid place-items-center
              border border-black/12 bg-black/5 text-black
              dark:border-white/15 dark:bg-white/5 dark:text-white
              hover:bg-black/10 dark:hover:bg-white/10 transition
            "
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="
              h-10 w-10 rounded-2xl grid place-items-center
              border border-black/12 bg-black/5 text-black
              dark:border-white/15 dark:bg-white/5 dark:text-white
              hover:bg-black/10 dark:hover:bg-white/10 transition
            "
            aria-label="Próximo"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="
          flex gap-4 overflow-x-auto pb-3
          snap-x snap-mandatory
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((p: Project, idx: number) => {
          const slug = p.slug ?? p.id ?? String(idx);
          const title = p.title ?? p.name ?? "Projeto";
          const line =
            p.oneLiner ?? p.line ?? p.subtitle ?? "Branding · Design · Estratégia";
          const tags: string[] = Array.isArray(p.tags)
            ? p.tags.slice(0, 3)
            : ["BRANDING", "DESIGN", "ESTRATÉGIA"];

          const cover = p.coverImage || "/images/placeholder.jpg";

          return (
            <Link
              key={slug}
              href={`/work/${slug}`}
              className="
                group snap-start shrink-0
                w-[86%] md:w-[46%] lg:w-[34%]
                block focus:outline-none
              "
              aria-label={`Abrir projeto ${title}`}
            >
              <PremiumCard className="p-0 overflow-hidden">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={cover}
                    alt={`${title} cover`}
                    fill
                    sizes="(max-width: 768px) 86vw, 420px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),transparent_60%)]" />
                  <div className="grain opacity-[0.30]" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="space-y-2">
                      <div className="text-xs font-semibold tracking-[0.22em] text-white/70">
                        {tags.join(" · ")}
                      </div>

                      <div className="text-2xl font-semibold tracking-tight text-white">
                        {title}
                      </div>

                      <div className="text-sm font-semibold text-white/75">
                        {line}
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/85 border border-white/15"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div
                          className="
                            h-10 w-10 rounded-2xl grid place-items-center
                            bg-white/10 border border-white/15 text-white
                            transition-transform duration-300
                            group-hover:translate-x-0.5
                          "
                          aria-hidden
                        >
                          →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PremiumCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}