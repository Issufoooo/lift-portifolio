"use client";

import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { EASE_SOFT } from "@/lib/motion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (q: string): boolean => {
    if (IS_SERVER) return defaultValue;
    return window.matchMedia(q).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query);
    return defaultValue;
  });

  const handleChange = () => setMatches(getMatches(query));

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

const duration = 0.15;
const transition = { duration, ease: EASE_SOFT };
const transitionOverlay = { duration: 0.5, ease: EASE_SOFT };

const DRAG_SENS = 0.25;
const VEL_SENS = 0.015;
// 🟡 FIX: WHEEL_STEP estava ausente neste ficheiro — adicionado para paridade com HoloCarousel
const WHEEL_STEP = 0.08;

const Carousel = memo(
  ({
    handleClick,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string, index: number) => void;
    cards: string[];
    isCarouselActive: boolean;
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
    const faceCount = cards.length;
    const faceWidth = cylinderWidth / faceCount;
    const radius = cylinderWidth / (2 * Math.PI);

    const rotation = useMotionValue(0);
    const smoothRotation = useSpring(rotation, {
      stiffness: 70,
      damping: 18,
      mass: 0.35,
    });
    const transform = useTransform(
      smoothRotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    );

    // 🟡 FIX: ref para evitar closure stale no requestAnimationFrame (igual ao HoloCarousel)
    const isCarouselActiveRef = useRef(isCarouselActive);
    useEffect(() => {
      isCarouselActiveRef.current = isCarouselActive;
    }, [isCarouselActive]);

    // 🟡 FIX: wheel/trackpad support estava completamente ausente neste carousel
    const wheelRAF = useRef<number | null>(null);
    const wheelAccum = useRef(0);

    const flushWheel = useCallback(() => {
      wheelRAF.current = null;
      if (!isCarouselActiveRef.current) {
        wheelAccum.current = 0;
        return;
      }
      const delta = wheelAccum.current;
      wheelAccum.current = 0;

      const next = rotation.get() + delta * WHEEL_STEP;
      animate(rotation, next, {
        type: "spring",
        stiffness: 75,
        damping: 24,
        mass: 0.35,
      });
    }, [rotation]);

    const onWheel = (e: React.WheelEvent) => {
      if (!isCarouselActiveRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      const raw = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      wheelAccum.current += raw * 0.12;

      if (wheelRAF.current == null) {
        wheelRAF.current = window.requestAnimationFrame(flushWheel);
      }
    };

    useEffect(() => {
      return () => {
        if (wheelRAF.current != null) cancelAnimationFrame(wheelRAF.current);
      };
    }, []);

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        onWheel={onWheel}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          dragMomentum={false}
          dragElastic={0.08}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
            touchAction: "pan-y",
          }}
          onDrag={(_, info) => {
            if (!isCarouselActive) return;
            rotation.set(rotation.get() + info.delta.x * DRAG_SENS);
          }}
          onDragEnd={(_, info) => {
            if (!isCarouselActive) return;
            const next = rotation.get() + info.velocity.x * VEL_SENS;
            animate(rotation, next, {
              type: "spring",
              stiffness: 140,
              damping: 28,
              mass: 0.45,
            });
          }}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`key-${imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-3xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl, i)}
            >
              <motion.img
                src={imgUrl}
                alt={`lift-wear-${i}`}
                layoutId={`img-${imgUrl}`}
                className="pointer-events-none aspect-square w-full rounded-3xl object-cover"
                initial={{ filter: "blur(4px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export default function WearPage() {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);

  const cards = useMemo(
    () => [
      "/images/lift-wear/01.jpg",
      "/images/lift-wear/02.jpg",
      "/images/lift-wear/03.jpg",
      "/images/lift-wear/04.jpg",
      "/images/lift-wear/05.jpeg",
      "/images/lift-wear/06.jpeg",
      "/images/lift-wear/07.jpeg",
      "/images/lift-wear/08.jpeg",
    ],
    []
  );

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl);
    setIsCarouselActive(false);
  };

  const handleClose = () => {
    setActiveImg(null);
    setIsCarouselActive(true);
  };

  return (
    <main className="min-h-[100svh]">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 md:pt-16">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-xs font-semibold tracking-[0.22em] opacity-60">
              LIFT WEAR
            </div>
            <h1 className="text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
              Produto com linguagem.
              <br />
              <span className="opacity-40">Estética aplicada.</span>
            </h1>
          </div>

          <Link
            href="/"
            className="hidden text-sm font-semibold opacity-60 transition hover:opacity-100 md:inline-flex underline underline-offset-4"
          >
            ← Voltar
          </Link>
        </div>

        <motion.div layout className="relative">
          <AnimatePresence mode="sync">
            {activeImg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                layoutId={`img-container-${activeImg}`}
                onClick={handleClose}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6 md:p-16"
                transition={transitionOverlay}
              >
                <motion.img
                  layoutId={`img-${activeImg}`}
                  src={activeImg}
                  className="max-h-full max-w-full rounded-3xl shadow-lg"
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ willChange: "transform" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03]">
            <Carousel
              handleClick={(url) => handleClick(url)}
              cards={cards}
              isCarouselActive={isCarouselActive}
            />
          </div>
        </motion.div>

        <div className="mt-8 md:hidden">
          <Link
            href="/"
            className="text-sm font-semibold opacity-60 transition hover:opacity-100 underline underline-offset-4"
          >
            ← Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}
