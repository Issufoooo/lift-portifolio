"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type NavLink = { href: string; label: string };

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* Close on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
        className="
          md:hidden flex flex-col justify-center items-center gap-[5px]
          h-9 w-9 rounded-full
          border border-black/10 dark:border-white/12
          bg-black/5 dark:bg-white/6
          hover:bg-black/8 dark:hover:bg-white/10
          transition-colors duration-200
        "
      >
        <motion.span
          animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="block h-px w-4 bg-current origin-center"
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.18 }}
          className="block h-px w-4 bg-current"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="block h-px w-4 bg-current origin-center"
        />
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            />

            {/* Drawer panel */}
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: EASE_OUT }}
              aria-label="Menu móvel"
              className="
                fixed top-0 right-0 bottom-0 z-50
                w-[72vw] max-w-xs
                flex flex-col
                bg-[var(--background)]
                border-l border-black/8 dark:border-white/10
                px-8 pt-24 pb-10
                md:hidden
              "
            >
              {/* Links */}
              <div className="flex flex-col gap-1">
                {links.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.06 + i * 0.06,
                      duration: 0.4,
                      ease: EASE_OUT,
                    }}
                  >
                    <Link
                      href={href}
                      className="
                        block py-4
                        text-2xl font-semibold tracking-tight
                        border-b border-black/8 dark:border-white/8
                        opacity-70 hover:opacity-100
                        transition-opacity duration-200
                      "
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="mt-auto"
              >
                <p className="text-[10px] font-semibold tracking-[0.24em] opacity-35">
                  LIFT · MAPUTO · MZ
                </p>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

