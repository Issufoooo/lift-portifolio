"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion"; // 🔴 FIX: importar EASE_OUT (easeOut não existia)
import PremiumCard from "@/components/PremiumCard";
import HoloCarousel from "@/components/HoloCarousel";

type Company = {
  name: string;
  images: string[];
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function imgs(folder: string, total: number, ext = "jpeg"): string[] {
  // 🟡 AVISO: evita espaços nos nomes de pastas em /public para maior compatibilidade
  const safeFolder = encodeURIComponent(folder);
  return Array.from(
    { length: total },
    (_, i) => `/images/lift-portifolio/${safeFolder}/${pad2(i + 1)}.${ext}`
  );
}

function StackedCover({
  cover,
  backs,
  alt,
}: {
  cover: string;
  backs: string[];
  alt: string;
}) {
  const b1 = backs[0];
  const b2 = backs[1];

  return (
    <div className="relative aspect-[4/5] w-full">
      {b2 ? (
        <div className="absolute inset-0 translate-x-3 -translate-y-3 opacity-25 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03]">
          <img src={b2} alt="" className="h-full w-full object-cover" />
        </div>
      ) : null}

      {b1 ? (
        <div className="absolute inset-0 translate-x-1.5 -translate-y-1.5 opacity-40 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03]">
          <img src={b1} alt="" className="h-full w-full object-cover" />
        </div>
      ) : null}

      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03]">
        <img src={cover} alt={alt} className="h-full w-full object-cover" />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]"
      />
    </div>
  );
}

export default function MarketingPage() {
  const companies: Company[] = useMemo(() => {
    const raw = [
      { name: "Alexandre", images: imgs("Alexandre", 6) },
      { name: "ICT",       images: imgs("ICT", 2) },
      { name: "MozRiver",  images: imgs("MozRiver", 2) },
      { name: "NDR",       images: imgs("NDR", 11) },
      { name: "New Pizza", images: imgs("New Pizza", 5) },
      { name: "Som",       images: imgs("Som", 2) },
    ];

    const main  = raw.filter((c) => c.images.length >= 3);
    const small = raw.filter((c) => c.images.length < 3);

    if (small.length > 0) {
      main.push({
        name: "Outros",
        images: small.flatMap((c) => c.images),
      });
    }

    return main;
  }, []);

  const [open, setOpen] = useState<Company | null>(null);

  return (
    <main className="min-h-[100svh] pt-32 md:pt-36">
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {/* header */}
        <div className="flex items-end justify-between gap-6 mb-8">
          <div className="space-y-3">
            <div className="text-xs font-semibold tracking-[0.22em] opacity-60">
              LIFT MARKETING
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[0.95]">
              Portfólio.
              <br />
              <span className="opacity-40">Trabalhos reais, organizados.</span>
            </h1>
          </div>

          <Link
            href="/"
            className="hidden md:inline-flex text-sm font-semibold opacity-60 hover:opacity-100 transition underline underline-offset-4"
          >
            ← Voltar
          </Link>
        </div>

        {/* grid */}
        <div className="grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-3">
          {companies.map((c) => {
            const cover = c.images[0];
            const backs = c.images.slice(1, 3);

            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setOpen(c)}
                className="text-left group"
              >
                <PremiumCard className="p-4 sm:p-5 md:p-6">
                  <div className="space-y-4">
                    <StackedCover cover={cover} backs={backs} alt={c.name} />

                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold tracking-[0.20em] opacity-55">
                          CLIENTE
                        </div>
                        <div className="mt-2 text-base sm:text-lg md:text-xl font-semibold tracking-tight truncate">
                          {c.name}
                        </div>
                        <div className="mt-2 text-xs font-semibold tracking-[0.18em] opacity-40">
                          {c.images.length} IMAGENS
                        </div>
                      </div>

                      <div
                        className="
                          shrink-0 h-10 w-10 rounded-2xl grid place-items-center
                          border border-black/12 bg-black/5 text-black
                          dark:border-white/15 dark:bg-white/5 dark:text-white
                          transition-transform duration-300
                          group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                        "
                        aria-hidden
                      >
                        ↗
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </button>
            );
          })}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/"
            className="text-sm font-semibold opacity-60 hover:opacity-100 transition underline underline-offset-4"
          >
            ← Voltar
          </Link>
        </div>
      </div>

      {/* Modal da empresa */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[2px] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              className="w-full max-w-5xl"
              initial={{ y: 10, opacity: 0, scale: 0.99 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25, ease: EASE_OUT }} // 🔴 FIX: era `easeOut` (ReferenceError)
              onClick={(e) => e.stopPropagation()}
            >
              <PremiumCard className="p-4 md:p-6">
                <HoloCarousel
                  title={open.name}
                  cards={open.images}
                  onClose={() => setOpen(null)}
                />
              </PremiumCard>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}