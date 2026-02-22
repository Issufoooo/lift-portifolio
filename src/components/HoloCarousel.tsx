"use client";

// 🔵 FIX: removido `import React` — desnecessário com o JSX transform automático do Next.js 14+
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { EASE, EASE_SOFT } from "@/lib/motion";

export const useIsomorphicLayoutEffect =
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

const transition = { duration: 0.18, ease: EASE_SOFT };
const transitionOverlay = { duration: 0.45, ease: EASE_SOFT };

const DRAG_SENS = 0.25;
const VEL_SENS = 0.015;
const WHEEL_STEP = 0.08;

const Carousel = memo(
  ({
    handleClick,
    cards,
    isCarouselActive,
  }: {
    // 🔵 FIX: simplificado para reflectir a realidade — o índice era recebido e ignorado em HoloCarousel
    handleClick: (imgUrl: string, index: number) => void;
    cards: string[];
    isCarouselActive: boolean;
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
    const cylinderWidth = isScreenSizeSm ? 980 : 1650;
    const faceCount = cards.length;
    const faceWidth = cylinderWidth / Math.max(faceCount, 1);
    const radius = cylinderWidth / (2 * Math.PI);

    const rotation = useMotionValue(0);
    const smoothRotation = useSpring(rotation, {
      stiffness: 70,
      damping: 22,
      mass: 0.35,
    });
    const transform = useTransform(
      smoothRotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    );

    // --- Wheel / Trackpad ---
    const wheelRAF = useRef<number | null>(null);
    const wheelAccum = useRef(0);

    // 🟡 FIX: usar ref para isCarouselActive evita closure stale no requestAnimationFrame.
    // Quando flushWheel é chamado pelo rAF, a closure captura o valor de isCarouselActive
    // no momento em que foi criada, não o valor actual. Com a ref, lemos sempre o valor actual.
    const isCarouselActiveRef = useRef(isCarouselActive);
    useEffect(() => {
      isCarouselActiveRef.current = isCarouselActive;
    }, [isCarouselActive]);

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
              stiffness: 75,
              damping: 24,
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
                alt={`portfolio-${i}`}
                layoutId={`img-${imgUrl}`}
                className="pointer-events-none aspect-square w-full rounded-3xl object-cover"
                initial={{ filter: "blur(5px)" }}
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

export default function HoloCarousel({
  title,
  cards,
  onClose,
}: {
  title?: string;
  cards: string[];
  onClose?: () => void;
}) {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);

  const safeCards = useMemo(() => (cards ?? []).filter(Boolean), [cards]);

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl);
    setIsCarouselActive(false);
  };

  const handleCloseImg = () => {
    setActiveImg(null);
    setIsCarouselActive(true);
  };

  return (
    <motion.div layout className="relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-2xl
            border border-black/10 dark:border-white/10
            bg-black/5 dark:bg-white/5
            transition hover:bg-black/10 dark:hover:bg-white/10
            text-base leading-none"
          aria-label="Fechar"
        >
          ×
        </button>
      )}

      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            layoutId={`img-container-${activeImg}`}
            onClick={handleCloseImg}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 p-6 md:p-16"
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-h-full max-w-full rounded-3xl shadow-lg"
              initial={{ scale: 0.985 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ willChange: "transform" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03]">
        <Carousel
          handleClick={(url, i) => handleClick(url)}
          cards={safeCards}
          isCarouselActive={isCarouselActive}
        />
      </div>

      {title ? <span className="sr-only">{title}</span> : null}
    </motion.div>
  );
}