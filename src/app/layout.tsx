import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import BrandLogo from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#060606",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "LIFT — Eleva a tua marca",
    template: "%s — LIFT",
  },
  description:
    "A LIFT é uma marca-mãe: estúdio de branding + fitness apparel + cultura de performance. Construímos identidade, produto e presença.",
  openGraph: {
    title: "LIFT — Eleva a tua marca",
    description:
      "Branding, produto e cultura. Uma marca-mãe construída para liderar.",
    siteName: "LIFT",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem("lift_theme");
    if (t !== "light" && t !== "dark") t = "dark";
    document.documentElement.classList.toggle("dark", t === "dark");
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

const nav = [
  { href: "/", label: "HOME" },
  { href: "/wear", label: "WEAR" },
  { href: "/marketing", label: "MARKETING" },
  { href: "/performance", label: "PERFORMANCE" },
  { href: "/sobre", label: "SOBRE" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>

      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          text-[var(--foreground)]
        `}
      >
        <header className="sticky top-0 z-50">
          <div className="px-2 pt-3 md:px-6 md:pt-5">
            <div
              className="
                flex items-center gap-3
                rounded-3xl
                border border-black/10 dark:border-white/10
                bg-[rgba(255,255,255,0.65)] dark:bg-[rgba(10,10,10,0.55)]
                backdrop-blur-xl
                px-2 py-2.5 md:px-4 md:py-3
              "
            >
              {/*
                FIX: Logo envolto em flex-1 com mr-auto.
                Antes: justify-between dividia o espaço igualmente entre os 3 filhos,
                puxando o logo para o centro quando o nav e os controlos eram grandes.
                Agora: flex-1 + mr-auto garantem que o logo ocupa todo o espaço livre
                à esquerda e fica sempre colado ao canto esquerdo.
              */}
              <div className="flex-1 mr-auto min-w-0">
                <Link
                  href="/"
                  aria-label="LIFT — Home"
                  className="inline-flex items-center"
                >
                  <div
                    className="
                      relative
                      h-11 w-[12.2rem]
                      sm:h-12 sm:w-[15.5rem]
                      md:h-14 md:w-[20rem]
                      lg:h-16 lg:w-[24rem]
                      opacity-95 transition-opacity duration-300 hover:opacity-100
                    "
                  >
                    <div className="hidden dark:block h-full w-full">
                      <BrandLogo variant="dark" className="h-full w-full" />
                    </div>
                    <div className="block dark:hidden h-full w-full">
                      <BrandLogo variant="light" className="h-full w-full" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-6">
                {nav.slice(1).map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="text-xs font-semibold tracking-[0.20em] opacity-70 hover:opacity-100 transition-opacity duration-200"
                  >
                    {x.label}
                  </Link>
                ))}
              </nav>

              {/* Right controls */}
              <div className="flex items-center gap-2 md:gap-3">
                {/* Mobile menu */}
                <details className="md:hidden relative">
                  <summary
                    className="
                      list-none cursor-pointer
                      h-10 w-10 rounded-2xl grid place-items-center
                      border border-black/10 dark:border-white/12
                      bg-black/5 dark:bg-white/5
                      hover:bg-black/10 dark:hover:bg-white/10
                      transition
                    "
                    aria-label="Abrir menu"
                  >
                    <span className="text-lg leading-none">≡</span>
                  </summary>

                  <div
                    className="
                      absolute right-0 mt-3 w-[220px]
                      rounded-3xl
                      border border-black/10 dark:border-white/10
                      bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(10,10,10,0.82)]
                      backdrop-blur-xl
                      p-2
                      shadow-[0_24px_80px_rgba(0,0,0,0.20)]
                      dark:shadow-[0_24px_80px_rgba(255,255,255,0.08)]
                    "
                  >
                    <div className="grid">
                      {nav.slice(1).map((x) => (
                        <Link
                          key={x.href}
                          href={x.href}
                          className="
                            px-4 py-3 rounded-2xl
                            text-xs font-semibold tracking-[0.20em]
                            opacity-80 hover:opacity-100
                            hover:bg-black/5 dark:hover:bg-white/5
                            transition
                          "
                        >
                          {x.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </details>

                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}