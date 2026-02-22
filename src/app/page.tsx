import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";
import MotionIn from "@/components/MotionIn";
import PremiumCard from "@/components/PremiumCard";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/* ─── Atoms ──────────────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold tracking-[0.22em] opacity-55 uppercase">
      {children}
    </div>
  );
}

function PrimaryButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...props}
      className="
        inline-flex items-center justify-center gap-2.5
        rounded-2xl px-7 py-4 text-sm md:text-base font-semibold tracking-wide
        bg-black text-white
        dark:bg-white dark:text-black
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)]
        dark:hover:shadow-[0_20px_60px_rgba(255,255,255,0.10)]
        active:translate-y-0
      "
    >
      {children}
    </a>
  );
}

function GhostNumber({ children }: { children: React.ReactNode }) {
  return (
    <div aria-hidden className="ghost-text select-none pointer-events-none absolute">
      {children}
    </div>
  );
}

function Divider() {
  return <div className="section-divider my-0" aria-hidden />;
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function HomePage() {
  const wa = buildWhatsAppUrl("Quero elevar a minha marca com a LIFT. Vamos falar.");

  const wearCatalogPreview = [
    "/images/lift-wear/catalog/01.jpg",
    "/images/lift-wear/catalog/02.jpg",
    "/images/lift-wear/catalog/03.jpg",
  ];

  return (
    <main className="overflow-x-hidden">
      {/* ── 01 HERO ─────────────────────────────────────────────── */}
      <Section id="intro" className="justify-center min-h-[100svh]">
        <div className="relative max-w-5xl w-full">
          <GhostNumber>01</GhostNumber>

          <MotionIn>
            <div className="relative z-10 space-y-6 md:space-y-10">
              <Label>LIFT · ESTÚDIO CRIATIVO · MAPUTO</Label>

              {/*
                Mobile: 3 linhas, cada palavra sozinha numa linha garante que
                nenhuma linha transborda em ecrãs pequenos (360px+).
              */}
              <h1 className="
                text-[36px] leading-[0.88]
                sm:text-[48px]
                md:text-[88px]
                lg:text-[110px]
                font-semibold tracking-tight
              ">
                CONSTRUÍMOS<br />
                MARCAS QUE<br />
                <span className="opacity-40">SUSTENTAM<br className="md:hidden" /> VALOR.</span>
              </h1>

              <p className="text-sm md:text-lg opacity-75 leading-relaxed max-w-xl">
                Ecossistema moçambicano: estúdio de branding, fitness apparel e cultura de performance.
                Posicionamento, identidade e presença com padrão.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <PrimaryButton href="#marketing">Ver portfólio</PrimaryButton>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold opacity-70 hover:opacity-100 transition underline underline-offset-4"
                >
                  WhatsApp →
                </a>
              </div>

              <div className="flex flex-wrap gap-6 md:gap-8 pt-4 border-t border-black/10 dark:border-white/10">
                {[
                  { n: "3", l: "Pilares do ecossistema" },
                  { n: "∞", l: "Padrão. Sempre." },
                  { n: "MZ", l: "Feito em Moçambique" },
                ].map((s) => (
                  <div key={s.l} className="space-y-1">
                    <div className="text-2xl md:text-3xl font-semibold tracking-tight">
                      {s.n}
                    </div>
                    <div className="text-xs opacity-50 font-semibold tracking-[0.14em]">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionIn>
        </div>
      </Section>

      <Divider />

      {/* ── 02 ECOSSISTEMA ─────────────────────────────────────── */}
      <Section id="ecosistema" className="min-h-[80svh] items-center">
        <MotionIn>
          <div className="relative max-w-5xl w-full">
            <GhostNumber>02</GhostNumber>

            <div className="relative z-10 grid gap-8 md:grid-cols-12 md:gap-16 items-start">
              <div className="md:col-span-5 space-y-5">
                <Label>ECOSSISTEMA</Label>
                <h2 className="
                  text-[34px] leading-[0.92]
                  sm:text-[40px]
                  md:text-6xl
                  font-semibold tracking-tight
                ">
                  Marca.<br />
                  Produto.<br />
                  <span className="opacity-40">Cultura.</span>
                </h2>
                <p className="text-sm md:text-base opacity-70 leading-relaxed">
                  O estúdio cria marcas. A Wear prova estética no produto.
                  A Performance sustenta a cultura. Tudo trabalha junto para uma coisa:
                  presença premium e execução real.
                </p>
              </div>

              <div className="md:col-span-7 grid gap-3">
                {[
                  {
                    n: "01",
                    t: "LIFT Marketing",
                    d: "Branding, identidade e estratégia digital para marcas que querem clareza e autoridade no mercado.",
                    tag: "STUDIO",
                    href: "/marketing",
                  },
                  {
                    n: "02",
                    t: "LIFT Wear",
                    d: "Roupas fitness. Produto com linguagem visual forte e consistência — marca que se impõe no ginásio.",
                    tag: "APPAREL",
                    href: "/wear",
                  },
                  {
                    n: "03",
                    t: "LIFT Performance",
                    d: "Mentalidade e comunidade. Uma cultura que dá coerência e continuidade à marca.",
                    tag: "CULTURE",
                    href: "/performance",
                  },
                ].map((x) => (
                  <Link key={x.t} href={x.href} className="block">
                    <PremiumCard className="p-5 md:p-7 transition-transform duration-300 hover:-translate-y-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold opacity-40">{x.n}</span>
                            <span className="text-xs font-semibold tracking-[0.18em] opacity-50 border border-current/20 px-2 py-0.5 rounded-full">
                              {x.tag}
                            </span>
                          </div>
                          <div className="text-lg md:text-xl font-semibold tracking-tight">{x.t}</div>
                          <div className="text-sm opacity-70 leading-relaxed">{x.d}</div>
                        </div>

                        <div
                          className="
                            shrink-0 h-9 w-9 md:h-10 md:w-10 rounded-2xl grid place-items-center
                            border border-black/12 bg-black/5 text-black
                            dark:border-white/15 dark:bg-white/5 dark:text-white
                          "
                          aria-hidden
                        >
                          →
                        </div>
                      </div>
                    </PremiumCard>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </MotionIn>
      </Section>

      <Divider />

      {/* ── 03 LIFT WEAR · FLAGSHIP ────────────────────────────── */}
      <Section id="wear-flagship" className="min-h-[90svh] items-center">
        <div className="relative w-full max-w-5xl">
          <GhostNumber>03</GhostNumber>

          <MotionIn>
            <div className="relative z-10 space-y-8 md:space-y-10">
              <div className="space-y-4 md:space-y-5">
                <div className="flex items-center gap-4">
                  <Label>FLAGSHIP · LIFT WEAR</Label>
                  <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                  <span className="text-xs font-semibold tracking-[0.18em] opacity-40">2024</span>
                </div>

                {/* "Construído para parecer" would overflow at 44px on mobile */}
                <h2 className="
                  text-[28px] leading-[0.9]
                  sm:text-[36px]
                  md:text-[72px]
                  font-semibold tracking-tight
                ">
                  Construído para<br />
                  <span className="opacity-40">parecer inevitável.</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-end">
                  <p className="text-sm md:text-base opacity-75 leading-relaxed">
                    LIFT Wear não é streetwear com logo. É fitness apparel com sistema visual
                    próprio — construído para se impor no ginásio e comunicar padrão em cada peça.
                  </p>

                  <div className="md:flex md:justify-end">
                    <Link
                      href="/wear"
                      className="
                        inline-flex items-center gap-2 text-sm font-semibold
                        border border-black/15 dark:border-white/15
                        px-5 py-3 rounded-2xl
                        hover:bg-black/5 dark:hover:bg-white/5
                        transition-colors duration-200
                      "
                    >
                      Ver LIFT Wear →
                    </Link>
                  </div>
                </div>
              </div>

              {/*
                Mobile: horizontal scroll (cards 76vw each, snap).
                Desktop: 3-column grid.
              */}
              <div className="
                flex gap-4 overflow-x-auto pb-3 -mx-5 px-5
                md:mx-0 md:px-0 md:pb-0
                md:grid md:grid-cols-3
                md:overflow-visible
                no-scrollbar
                snap-x
              ">
                {wearCatalogPreview.map((src) => (
                  <div
                    key={src}
                    className="
                      shrink-0 w-[76vw] sm:w-[54vw]
                      md:w-auto md:shrink
                      snap-start
                    "
                  >
                    <PremiumCard className="p-0 overflow-hidden">
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={src}
                          alt="LIFT Wear catálogo"
                          fill
                          sizes="(max-width: 768px) 76vw, 380px"
                          className="object-cover"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.25),transparent_60%)]" />
                      </div>
                    </PremiumCard>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {["BRANDING", "DESIGN", "PRODUTO", "APPAREL"].map((t) => (
                  <span
                    key={t}
                    className="
                      px-3 py-1.5 rounded-full text-xs font-semibold
                      border border-black/12 dark:border-white/12
                      opacity-60
                    "
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </MotionIn>
        </div>
      </Section>

      <Divider />

      {/* ── 04 SERVIÇOS ─────────────────────────────────────────── */}
      <Section id="servicos" className="min-h-[80svh] items-center">
        <MotionIn>
          <div className="relative max-w-5xl w-full">
            <GhostNumber>04</GhostNumber>

            <div className="relative z-10 space-y-8 md:space-y-10">
              <div className="grid md:grid-cols-12 md:gap-16 items-end gap-4">
                <div className="md:col-span-7 space-y-3">
                  <Label>SERVIÇOS</Label>
                  <h2 className="
                    text-[32px] leading-[0.92]
                    sm:text-[40px]
                    md:text-6xl
                    font-semibold tracking-tight
                  ">
                    O que<br />
                    <span className="opacity-40">entregamos.</span>
                  </h2>
                </div>
                <div className="md:col-span-5">
                  <p className="text-sm md:text-base opacity-65 leading-relaxed">
                    Menos volume. Mais padrão. Cada entrega tem intenção — não preenche calendário.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    n: "01",
                    t: "Posicionamento & Narrativa",
                    d: "Mensagem clara, proposta de valor e direção — para o mercado entender e escolher.",
                  },
                  {
                    n: "02",
                    t: "Identidade Visual",
                    d: "Não é só logo: é um sistema aplicável em social, produto, impressão e digital.",
                  },
                  {
                    n: "03",
                    t: "Conteúdo com estratégia",
                    d: "Cadência, consistência e linguagem visual para construir demanda no tempo.",
                  },
                ].map((x) => (
                  <PremiumCard key={x.t} className="p-5 md:p-8 space-y-3 md:space-y-4">
                    <div className="text-xs font-semibold opacity-35 tracking-[0.18em]">{x.n}</div>
                    <div className="text-lg md:text-xl font-semibold tracking-tight leading-tight">{x.t}</div>
                    <div className="text-sm opacity-65 leading-relaxed">{x.d}</div>
                  </PremiumCard>
                ))}
              </div>

              <div className="pt-1">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold opacity-65 hover:opacity-100 transition underline underline-offset-4"
                >
                  Pedir proposta →
                </a>
              </div>
            </div>
          </div>
        </MotionIn>
      </Section>

      <Divider />

      {/* ── 05 MARKETING (PORTFÓLIO) ─────────────────────────────── */}
      <Section id="marketing" className="min-h-[80svh] items-center">
        <MotionIn>
          <div className="relative max-w-5xl w-full space-y-8 md:space-y-10">
            <GhostNumber>05</GhostNumber>

            <div className="relative z-10 space-y-5 md:space-y-6">
              <div className="space-y-3">
                <Label>LIFT MARKETING</Label>
                {/* "Portfólio organizado" overflows at 38px on 320px phones */}
                <div className="
                  text-[26px] leading-[0.92]
                  sm:text-[32px]
                  md:text-5xl
                  font-semibold tracking-tight
                ">
                  Trabalho real.<br />
                  <span className="opacity-40">Resultados documentados.</span>
                </div>
                <p className="text-sm md:text-base opacity-70 leading-relaxed max-w-2xl">
                  Cada projecto com contexto, decisões e execução.
                  Não existe repetição — existe prova de padrão.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/marketing"
                  className="
                    inline-flex items-center gap-2 rounded-2xl
                    border border-black/12 bg-black/5 text-black
                    dark:border-white/15 dark:bg-white/5 dark:text-white
                    px-5 py-3 text-sm md:text-base font-semibold
                    opacity-90 hover:opacity-100 transition
                  "
                >
                  Portfólio Marketing <span aria-hidden>→</span>
                </Link>

                <Link
                  href="/performance"
                  className="
                    inline-flex items-center gap-2 rounded-2xl
                    border border-black/12 bg-black/5 text-black
                    dark:border-white/15 dark:bg-white/5 dark:text-white
                    px-5 py-3 text-sm md:text-base font-semibold
                    opacity-70 hover:opacity-100 transition
                  "
                >
                  Ver Performance <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </MotionIn>
      </Section>

      <Divider />

      {/* ── 06 SOBRE ─────────────────────────────────────────────── */}
      <Section id="sobre" className="min-h-[70svh] items-center">
        <MotionIn>
          <div className="relative max-w-5xl w-full space-y-8 md:space-y-10">
            <GhostNumber>06</GhostNumber>
            <div className="relative z-10 space-y-3">
              <Label>SOBRE</Label>
              <h2 className="
                text-[28px] leading-[0.92]
                sm:text-[36px]
                md:text-6xl
                font-semibold tracking-tight
              ">
                A visão<br />
                <span className="opacity-40">por detrás da marca.</span>
              </h2>
            </div>

            <Link
              href="/sobre"
              className="
                relative z-10 inline-flex items-center gap-2 rounded-2xl
                border border-black/12 bg-black/5 text-black
                dark:border-white/15 dark:bg-white/5 dark:text-white
                px-6 py-4 text-sm md:text-base font-semibold
                opacity-90 hover:opacity-100 transition group
              "
            >
              Conhecer o fundador
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </MotionIn>
      </Section>

      <Divider />

      {/* ── 07 MANIFESTO ────────────────────────────────────────── */}
      <Section id="manifesto" className="min-h-[80svh] justify-center">
        <MotionIn>
          <div className="max-w-4xl w-full space-y-8 md:space-y-10">
            <Label>MANIFESTO</Label>

            <blockquote className="text-[26px] leading-[1.2] sm:text-[32px] md:text-5xl font-semibold tracking-tight">
              &ldquo;Marca forte não depende de sorte.{" "}
              <span className="opacity-40">Depende de estrutura.&rdquo;</span>
            </blockquote>

            <div className="grid gap-4 md:grid-cols-3 pt-2 md:pt-4">
              {[
                {
                  t: "Percepção que justifica preço",
                  d: "Quando a marca comunica valor de forma consistente, a conversa deixa de ser \"quanto custa\".",
                },
                {
                  t: "Decisão mais rápida",
                  d: "Clareza reduz dúvida. Menos hesitação, menos objeções, mais conversão.",
                },
                {
                  t: "Reputação que acumula",
                  d: "Consistência cria memória. E memória cria preferência — onde o mercado fica mais fácil.",
                },
              ].map((x) => (
                <PremiumCard key={x.t} className="p-5 md:p-7 space-y-3">
                  <div className="text-base font-semibold tracking-tight leading-tight">{x.t}</div>
                  <div className="text-sm opacity-60 leading-relaxed">{x.d}</div>
                </PremiumCard>
              ))}
            </div>
          </div>
        </MotionIn>
      </Section>

      <Divider />

      {/* ── 08 CTA ──────────────────────────────────────────────── */}
      <Section id="cta" className="min-h-[80svh] justify-center">
        <MotionIn>
          <div className="max-w-4xl w-full space-y-8 md:space-y-10">
            <Label>CONTACTO</Label>

            <h2 className="
              text-[32px] leading-[0.9]
              sm:text-[42px]
              md:text-[72px]
              font-semibold tracking-tight
            ">
              Vamos elevar<br />
              a tua marca<br />
              <span className="opacity-40">com padrão LIFT.</span>
            </h2>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <PrimaryButton href={wa} external>
                Falar no WhatsApp
              </PrimaryButton>
              <a
                href="#servicos"
                className="text-sm font-semibold opacity-55 hover:opacity-100 transition underline underline-offset-4"
              >
                Ver serviços
              </a>
            </div>

            <div className="pt-2 flex items-center gap-4 md:gap-6 text-xs opacity-40 font-semibold tracking-[0.16em] flex-wrap">
              <span>LIFT STUDIO</span>
              <span className="h-px w-6 md:w-8 bg-current" />
              <span>MAPUTO · MOÇAMBIQUE</span>
            </div>
          </div>
        </MotionIn>
      </Section>
    </main>
  );
}