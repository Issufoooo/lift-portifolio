"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { EASE_OUT } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────
   CUSTOM CURSOR  — desktop only (hidden md:block)
───────────────────────────────────────────────────────────── */
function CustomCursor() {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const [big, setBig] = useState(false);
  const [on, setOn]   = useState(false);

  const sx = useSpring(cx, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(cy, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    const mv = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); if (!on) setOn(true); };
    const ov = (e: MouseEvent) => setBig(!!(e.target as HTMLElement).closest("a,button,[data-cur]"));
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", ov);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseover", ov); };
  }, [cx, cy, on]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{ width: big ? 46 : 10, height: big ? 46 : 10, opacity: on ? 1 : 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        className="rounded-full bg-white"
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────────────────────── */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left pointer-events-none
        bg-gradient-to-r from-black/20 via-black/70 to-black/20
        dark:from-white/20 dark:via-white/60 dark:to-white/20"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────────────────────── */
function Counter({ n, l }: { n: string; l: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState("--");

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(n, 10);
    if (isNaN(num)) { setVal(n); return; }
    const ctrl = animate(0, num, {
      duration: 1.5,
      ease: EASE_OUT,
      onUpdate:  (v) => setVal(String(Math.floor(v)).padStart(2, "0")),
      onComplete: () => setVal(n.padStart(2, "0")),
    });
    return ctrl.stop;
  }, [inView, n]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      /* ↓ mobile: px-5 py-7 · desktop: px-8 py-10 */
      className="bg-[--bg] dark:bg-[--bg-dark] [--bg:white] [--bg-dark:#0a0a0a]
        px-5 py-7 sm:px-8 sm:py-10 group cursor-default select-none"
    >
      <div className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-none
        tabular-nums transition-transform duration-300 group-hover:scale-105 origin-left">
        {val}
      </div>
      <div className="mt-2 md:mt-3 text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] opacity-50">
        {l}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   WORD-BY-WORD REVEAL
───────────────────────────────────────────────────────────── */
function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span key={i}
          initial={{ opacity: 0.1, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.05, ease: EASE_OUT }}
          className="inline-block mr-[0.24em]"
        >{w}</motion.span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   3-D TILT  — desktop mouse only; on touch it's a plain div
───────────────────────────────────────────────────────────── */
function TiltPhoto({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0); const sc = useMotionValue(1);
  const srx = useSpring(rx, { stiffness: 180, damping: 28 });
  const sry = useSpring(ry, { stiffness: 180, damping: 28 });
  const ssc = useSpring(sc, { stiffness: 180, damping: 28 });

  /* Mouse only — touch devices never fire these, zero performance hit */
  const onMove  = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width  - 0.5) * 9);
    rx.set(-((e.clientY - r.top)  / r.height - 0.5) * 9);
    sc.set(1.022);
  }, [rx, ry, sc]);
  const onLeave = useCallback(() => { rx.set(0); ry.set(0); sc.set(1); }, [rx, ry, sc]);

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, scale: ssc, transformStyle: "preserve-3d" }}
      className={className}
    >{children}</motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAGNETIC BUTTON — desktop only; renders as plain <a> on touch
───────────────────────────────────────────────────────────── */
function MagBtn({ href, className = "", children }: {
  href: string; className?: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x   = useMotionValue(0); const y = useMotionValue(0);
  const sx  = useSpring(x, { stiffness: 200, damping: 20 });
  const sy  = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove  = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width  / 2) * 0.3);
    y.set((e.clientY - r.top  - r.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a ref={ref} href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      data-cur className={className}
    >{children}</motion.a>
  );
}

/* ─────────────────────────────────────────────────────────────
   FADE IN
───────────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      className={className}
    >{children}</motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] md:text-xs font-semibold tracking-[0.28em] opacity-45 uppercase">
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRAIT CARD — left bar indicator + radial hover glow
───────────────────────────────────────────────────────────── */
function TraitCard({ num, title, body }: { num: string; title: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.button layout onClick={() => setOpen(v => !v)} data-cur
      className="w-full text-left rounded-2xl relative overflow-hidden
        border border-black/8 dark:border-white/10
        bg-black/[0.02] dark:bg-white/[0.03]
        hover:bg-black/[0.04] dark:hover:bg-white/[0.06]
        transition-colors duration-300
        px-5 py-4 md:px-6 md:py-5 cursor-pointer group"
    >
      {/* animated left accent bar */}
      <motion.div initial={false}
        animate={{ scaleY: open ? 1 : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.32, ease: EASE_OUT }}
        className="absolute left-0 top-2 bottom-2 w-[3px] bg-current origin-top rounded-full"
      />
      {/* radial hover glow */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100
        transition-opacity duration-500
        bg-[radial-gradient(ellipse_at_0%_50%,rgba(0,0,0,0.04),transparent_70%)]
        dark:bg-[radial-gradient(ellipse_at_0%_50%,rgba(255,255,255,0.04),transparent_70%)]" />

      <div className="flex items-center justify-between gap-3 md:gap-4 relative">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <span className="text-[10px] font-semibold tracking-[0.22em] opacity-35 w-5 shrink-0">{num}</span>
          <span className="text-sm md:text-lg font-semibold tracking-tight text-left">{title}</span>
        </div>
        <motion.span animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="text-lg opacity-40 shrink-0" aria-hidden>+</motion.span>
      </div>

      <motion.div initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="overflow-hidden"
      >
        <p className="pl-8 md:pl-9 pt-3 text-sm opacity-65 leading-relaxed text-left">{body}</p>
      </motion.div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function SobrePage() {
  const wa = buildWhatsAppUrl("Olá, vi o teu perfil na LIFT e quero conversar.");

  /* Hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const photoY      = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const photoScale  = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textY       = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const smoothY     = useSpring(photoY,    { stiffness: 80, damping: 20 });
  const smoothScale = useSpring(photoScale,{ stiffness: 80, damping: 20 });
  const smoothTextY = useSpring(textY,     { stiffness: 80, damping: 20 });

  const traits = [
    { num: "01", title: "Pensamento de marca",   body: "Antes de qualquer detalhe visual, tudo começa na lógica: o que esta marca quer ocupar na cabeça das pessoas? A resposta a essa pergunta é o que guia cada decisão." },
    { num: "02", title: "Obsessão por detalhe",  body: "O kerning importa. O ritmo das palavras importa. A consistência entre o digital e o físico importa. Nenhum detalhe é pequeno quando o objetivo é construir perceção de valor." },
    { num: "03", title: "Execução com intenção", body: "Produzir por produzir não é estratégia. Cada peça, cada campanha, cada publicação deve ter uma razão de existir — e deve empurrar a marca um passo à frente." },
    { num: "04", title: "Menos, mas melhor",     body: "Quantidade nunca venceu qualidade a longo prazo. A LIFT existe para ser a escolha certa, não a mais rápida — tanto no trabalho que produz como nos clientes que escolhe." },
  ];

  return (
    <>
      <CustomCursor />
      <ScrollBar />

      <main className="relative overflow-x-hidden">

        {/* ══ HERO SPLIT ════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative overflow-hidden">
          <div className="grid md:grid-cols-[1fr_1fr] min-h-[100svh]">

            {/*
            ┌──────────────────────────────────────────────────────────┐
            │  FOTO DO DONO                                             │
            │  Ficheiro: /public/images/owner.jpeg                      │
            │  · Formato vertical (retrato) — mínimo 800 × 1200 px     │
            │  · Rosto no terço superior da imagem                      │
            │  · Fundo neutro (preto, branco ou cinza)                  │
            │  · JPG ou WebP — máximo 2 MB                              │
            └──────────────────────────────────────────────────────────┘
            */}

            {/* LEFT — photo + tilt (desktop mouse only) */}
            <TiltPhoto className="relative overflow-hidden min-h-[55svh] md:min-h-[100svh] md:cursor-none">
              <motion.div style={{ y: smoothY, scale: smoothScale }}
                className="absolute inset-0 origin-center"
              >
                <Image
                  src="/images/owner.jpeg"
                  alt="Fundador da LIFT"
                  fill priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* desktop: right-side fade to background colour */}
              <div aria-hidden className="hidden md:block absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "linear-gradient(to right, transparent 55%, rgba(var(--background-rgb), 0.75))" }}
              />
              {/* mobile: bottom fade */}
              <div aria-hidden className="md:hidden absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "linear-gradient(to top, rgba(var(--background-rgb), 0.9) 0%, transparent 45%)" }}
              />

              {/* mobile name overlay */}
              <div className="absolute bottom-6 left-5 md:hidden">
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-[30px] font-semibold tracking-tight leading-none text-white drop-shadow-lg"
                >
                  Alecsandri<br />
                  <span className="text-lg opacity-70">Ferreira</span>
                </motion.p>
              </div>
            </TiltPhoto>

            {/* RIGHT — content */}
            <motion.div style={{ y: smoothTextY }}
              /* mobile: px-5 pt-6 pb-10 · desktop: px-14 pt-32 pb-24 */
              className="flex flex-col justify-end
                px-5 pt-6 pb-10
                md:px-14 md:pt-32 md:pb-24
                lg:px-20"
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
                <Label>LIFT · FUNDADOR · MAPUTO</Label>
              </motion.div>

              {/* Name — character by character, DESKTOP only */}
              <div className="hidden md:block mt-6 overflow-hidden">
                <h1 className="text-[56px] lg:text-[76px] xl:text-[88px] font-semibold leading-[0.88] tracking-tight">
                  {"Alecsandri".split("").map((ch, i) => (
                    <motion.span key={i}
                      initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.045, duration: 0.65, ease: EASE_OUT }}
                      className="inline-block"
                    >{ch}</motion.span>
                  ))}
                </h1>
                <h1 className="text-[56px] lg:text-[76px] xl:text-[88px] font-semibold leading-[0.88] tracking-tight opacity-35">
                  {"Ferreira".split("").map((ch, i) => (
                    <motion.span key={i}
                      initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.55 + i * 0.04, duration: 0.65, ease: EASE_OUT }}
                      className="inline-block"
                    >{ch}</motion.span>
                  ))}
                </h1>
              </div>

              {/* Badges — staggered pop */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.6 }}
                className="mt-5 md:mt-8 flex flex-wrap gap-2"
              >
                {["Fundador", "Estratega de Marca", "Designer", "Videomaker"].map((r, i) => (
                  <motion.span key={r}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.72 + i * 0.08, duration: 0.4, ease: EASE_OUT }}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-[0.16em]
                      border border-black/12 dark:border-white/15 bg-black/5 dark:bg-white/5"
                  >{r}</motion.span>
                ))}
              </motion.div>

              {/* One-liner */}
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.75, ease: EASE_OUT }}
                className="mt-5 md:mt-8 text-base md:text-xl lg:text-2xl
                  font-semibold opacity-80 leading-snug max-w-md"
              >
                Constrói marcas que o mercado escolhe — sem precisar de convencer.
              </motion.p>

              {/* Scroll cue — animated pulse, desktop only */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-12 md:mt-16 hidden md:flex items-center gap-3 opacity-40"
              >
                <motion.div animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  className="h-px w-8 bg-current"
                />
                <span className="text-[10px] tracking-[0.28em] font-semibold">SCROLL</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══ BIO ═══════════════════════════════════════════════════ */}
        {/* mobile: py-14 px-5 · desktop: py-36 px-12 */}
        <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12 py-14 md:py-36">
          <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-start">

            <FadeIn className="md:col-span-4 md:sticky md:top-28">
              <Label>SOBRE</Label>
              <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
                <div>
                  <div className="text-4xl md:text-6xl font-semibold tracking-tight leading-none">LIFT</div>
                  <div className="mt-2 text-xs font-semibold tracking-[0.2em] opacity-50">ESTÚDIO · MAPUTO</div>
                </div>
                <div className="h-px w-full bg-black/10 dark:bg-white/10" />
                <p className="text-sm opacity-60 leading-relaxed">Mozambique · Est. 2024</p>
              </div>
            </FadeIn>

            <div className="md:col-span-8 space-y-6 md:space-y-8">
              <FadeIn delay={0.1}>
                <p className="text-xl md:text-3xl font-semibold leading-[1.2] tracking-tight opacity-90">
                  A LIFT nasceu de uma convicção simples: marcas moçambicanas podem —
                  e devem — competir pelo mesmo nível de perceção que as internacionais.
                </p>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="text-sm md:text-lg opacity-65 leading-relaxed">
                  Antes de fundar o estúdio, Alecsandri trabalhou na interseção entre
                  estratégia, design e cultura — estudando como as marcas que mais
                  cobram comunicam de forma diferente das que mais barganham. A
                  conclusão foi sempre a mesma: não é produto, é identidade.
                </p>
              </FadeIn>
              <FadeIn delay={0.24}>
                <p className="text-sm md:text-lg opacity-65 leading-relaxed">
                  Hoje lidera um estúdio que trabalha posicionamento, identidade
                  visual e conteúdo de forma integrada — porque marca forte não
                  é um logo bonito, é um sistema que comunica valor de forma
                  consistente em todos os pontos de contacto.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══ MANIFESTO — palavra a palavra ═════════════════════════ */}
        {/* mobile: py-14 · desktop: py-40 */}
        <section className="relative overflow-hidden py-14 md:py-40">
          <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")", mixBlendMode: "overlay" }}
          />

          <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
            <FadeIn><Label>MANIFESTO</Label></FadeIn>

            <div className="mt-8 md:mt-10">
              {/*
                Mobile sizes:
                · "O mercado não compra o melhor produto." at 38px = ~700px → overflow
                · Fix: text-[20px] mobile → sm:text-[28px] → md:text-[64px] → lg:text-[80px]
                · Explicit <br /> on key breaks keeps the phrasing editorial at all sizes
              */}
              <blockquote className="
                text-[20px] leading-[1.2]
                sm:text-[28px]
                md:text-[64px] md:leading-[0.92]
                lg:text-[80px]
                font-semibold tracking-tight
              ">
                <span className="opacity-20">"</span>
                <WordReveal text="O mercado não compra" /><br />
                <WordReveal text="o melhor produto." /><br className="md:hidden" />
                {" "}<WordReveal text="Compra o que" />{" "}
                <em className="not-italic opacity-35"><WordReveal text="parece" /></em>{" "}
                <WordReveal text="melhor." /><br />
                <WordReveal text="O nosso trabalho" /><br className="md:hidden" />
                {" "}<WordReveal text="é fechar essa distância." />
                <span className="opacity-20">"</span>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ══ FILOSOFIA ═════════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12 py-14 md:py-36">
          <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-start">

            <FadeIn className="md:col-span-5 md:sticky md:top-28">
              <Label>FILOSOFIA</Label>
              <h2 className="
                mt-5 md:mt-6
                text-[30px] leading-[0.92]
                sm:text-[36px]
                md:text-6xl
                font-semibold tracking-tight
              ">
                Como<br /><span className="opacity-35">pensa</span><br />quem<br />constrói.
              </h2>
              <p className="mt-5 text-sm opacity-55 leading-relaxed max-w-xs">
                Clica em cada princípio para perceber como se traduz em trabalho real.
              </p>
            </FadeIn>

            <div className="md:col-span-7 space-y-3">
              {traits.map((t, i) => (
                <FadeIn key={t.num} delay={i * 0.07}><TraitCard {...t} /></FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ NUMBERS — animated counters ═══════════════════════════ */}
        <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12 py-10 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/8 dark:bg-white/8 rounded-2xl overflow-hidden">
            {[
              { n: "3",  l: "Marcas Próprias" },
              { n: "1",  l: "Padrão" },
              { n: "∞",  l: "Potencial" },
              { n: "MZ", l: "Raíz, Maputo" },
            ].map(({ n, l }) => <Counter key={l} n={n} l={l} />)}
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12 py-14 md:py-36">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">

              <div className="space-y-5 md:space-y-6">
                <Label>CONTACTO</Label>
                {/*
                  Mobile: text-[32px] is safe (~300px at 360px screen)
                  "Vamos" and "conversar." are short words — no overflow risk
                */}
                <h2 className="
                  text-[32px] leading-[0.88]
                  sm:text-[40px]
                  md:text-[72px]
                  font-semibold tracking-tight
                ">
                  Vamos<br />conversar.
                </h2>
                <p className="text-sm md:text-base opacity-60 leading-relaxed max-w-sm">
                  Se a tua marca precisa de clareza, presença e sistema —
                  é aqui que começa.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                {/* Magnetic on desktop — plain link on touch */}
                <MagBtn href={wa}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-2xl px-8 md:px-10 py-4 md:py-5
                    text-base font-semibold
                    bg-black text-white dark:bg-white dark:text-black
                    shadow-[0_18px_70px_rgba(0,0,0,0.16)]
                    dark:shadow-[0_18px_70px_rgba(255,255,255,0.08)]
                    hover:shadow-[0_28px_80px_rgba(0,0,0,0.28)]
                    dark:hover:shadow-[0_28px_80px_rgba(255,255,255,0.14)]
                    transition-shadow duration-300 whitespace-nowrap
                    active:scale-[0.97]
                  "
                >
                  WhatsApp →
                </MagBtn>

                <Link href="/" data-cur
                  className="text-center text-sm font-semibold opacity-55
                    hover:opacity-90 transition underline underline-offset-4
                    active:opacity-100"
                >Ver o portfólio</Link>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
    </>
  );
}

