"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type Theme = "dark" | "light";

function SunIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("lift_theme") as Theme | null;
      const resolved: Theme =
        stored === "light" || stored === "dark" ? stored : "dark";
      setTheme(resolved);
    } catch {
      setTheme("dark");
    }
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("lift_theme", next);
    } catch {}
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  /* Avoid hydration flash */
  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full" aria-hidden />
    );
  }

  return (
    <motion.button
      onClick={toggle}
      aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo escuro"}
      title={theme === "dark" ? "Modo claro" : "Modo escuro"}
      whileTap={{ scale: 0.88 }}
      className="
        relative flex items-center justify-center
        h-9 w-9 rounded-full
        border border-black/10 dark:border-white/12
        bg-black/5 dark:bg-white/6
        hover:bg-black/8 dark:hover:bg-white/10
        text-black/70 dark:text-white/70
        hover:text-black dark:hover:text-white
        transition-colors duration-200
        overflow-hidden
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="flex items-center justify-center"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

