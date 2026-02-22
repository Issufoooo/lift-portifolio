// src/lib/motion.ts
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_SOFT = [0.32, 0.72, 0, 1] as const;
export const EASE_OVERLAY = [0.3, 0.7, 0.1, 1] as const;

// Optional presets (use if you want)
export const t = {
  fast: { duration: 0.2, ease: EASE_OUT },
  base: { duration: 0.32, ease: EASE_OUT },
  slow: { duration: 0.6, ease: EASE_OUT },
  overlay: { duration: 0.5, ease: EASE_OVERLAY },
} as const;

export const withDelay = <T extends object>(transition: T, delay = 0) =>
  ({ ...transition, delay }) as T & { delay: number };

export const EASE = [0.25, 0.1, 0.25, 1] as const;
