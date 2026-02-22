export type CatalogItem = {
  id: string;
  name: string;
  note?: string; // ex: DROP 01, CORE, LOOKBOOK
  image: string;
};

export type Project = {
  slug: string;
  title: string;
  tags: [string, string, string];
  coverImage: string;
  gallery: string[];
  services: string[];
  oneLiner: string;

  // 🔹 opcional — só alguns projetos terão
  catalog?: CatalogItem[];
};

export const projects: Project[] = [
  {
    slug: "lift-wear",
    title: "LIFT Wear",
    tags: ["BRANDING", "DESIGN", "PRODUCT"],
    coverImage: "/images/lift-wear/cover.jpg",

    gallery: [
      "/images/lift-wear/01.jpg",
      "/images/lift-wear/02.jpg",
      "/images/lift-wear/03.jpg",
      "/images/lift-wear/04.jpg",
    ],

    services: ["Branding", "Visual Identity", "Product Direction"],

    oneLiner: "Built to look premium. Designed to feel inevitable.",

    // 🩶 CATÁLOGO / LOOKBOOK (não é loja)
    catalog: [
      {
        id: "lw-01",
        name: "Essential Training Tee",
        note: "CORE",
        image: "/images/lift-wear/catalog/01.jpg",
      },
      {
        id: "lw-02",
        name: "Performance Tank",
        note: "CORE",
        image: "/images/lift-wear/catalog/02.jpg",
      },
      {
        id: "lw-03",
        name: "Seamless Shorts",
        note: "DROP 01",
        image: "/images/lift-wear/catalog/03.jpg",
      },
      {
        id: "lw-04",
        name: "Compression Set",
        note: "DROP 01",
        image: "/images/lift-wear/catalog/04.jpg",
      },
      {
        id: "lw-05",
        name: "Warm-up Hoodie",
        note: "LOOKBOOK",
        image: "/images/lift-wear/catalog/05.jpg",
      },
      {
        id: "lw-06",
        name: "Full Look — Training Day",
        note: "LOOKBOOK",
        image: "/images/lift-wear/catalog/06.jpg",
      },
    ],
  },

  {
    slug: "lift-performance",
    title: "LIFT Performance",
    tags: ["BRANDING", "STRATEGY", "EXPERIENCE"],
    coverImage: "/images/lift-performance/cover.jpg",

    gallery: [
      "/images/lift-performance/01.jpg",
      "/images/lift-performance/02.jpg",
      "/images/lift-performance/03.jpg",
    ],

    services: ["Brand Strategy", "Positioning", "Concept System"],

    oneLiner: "A performance concept engineered to scale.",
  },

  {
    slug: "ginasio-local",
    title: "Ginásio Local",
    tags: ["BRANDING", "CONTENT", "GROWTH"],
    coverImage: "/images/ginasio-local/cover.jpg",

    gallery: [
      "/images/ginasio-local/01.jpg",
      "/images/ginasio-local/02.jpg",
      "/images/ginasio-local/03.jpg",
    ],

    services: ["Instagram System", "Content Design", "Visual Direction"],

    oneLiner: "A stronger feed. A sharper brand. More attention.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
