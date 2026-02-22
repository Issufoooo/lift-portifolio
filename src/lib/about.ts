export type AboutSection = {
  title: string;
  body: string;
};

export const aboutIntro = {
  eyebrow: "SOBRE",
  title: "LIFT é padrão, não estética.",
  subtitle:
    "Um estúdio que trata marca como ativo: posicionamento, sistema visual e consistência — para sustentar valor no tempo.",
};

export const aboutSections: AboutSection[] = [
  {
    title: "Como trabalhamos",
    body:
      "Clareza primeiro. Depois sistema. A estética vem como consequência do posicionamento e do padrão de execução.",
  },
  {
    title: "O que defendemos",
    body:
      "Marca forte não depende de sorte. Depende de estrutura — e estrutura precisa de consistência.",
  },
  {
    title: "O que entregamos",
    body:
      "Direção estratégica, identidade visual e conteúdo com linguagem. Tudo aplicado com coerência.",
  },
];

export const aboutCTAs = [
  { label: "Abrir página Sobre", href: "/sobre" },
  { label: "Ver Portfólio (Marketing)", href: "/marketing" },
  { label: "Ver LIFT Wear", href: "/wear" },
];