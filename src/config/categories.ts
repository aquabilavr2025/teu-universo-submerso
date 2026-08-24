// Single source of truth: Excel sheet <-> website section mapping.
// `sheet` must match the Google Sheet tab name EXACTLY (including spaces).

export interface CategoryConfig {
  slug: string;
  path: string;
  label: string;
  sheet: string;
  subtitle: string;
  /** true when a bespoke page component already exists for this route */
  custom?: boolean;
  /** show in the homepage "Descobre as nossas categorias" section */
  homepage?: boolean;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: "peixes",
    path: "/peixes",
    label: "Peixes",
    sheet: "Peixes",
    subtitle: "Espécies saudáveis e vibrantes para o teu aquário.",
    custom: true,
    homepage: true,
  },
  {
    slug: "plantas",
    path: "/plantas",
    label: "Plantas",
    sheet: "Plantas Em Vaso",
    subtitle: "Transforma o teu aquário num jardim subaquático.",
    custom: true,
    homepage: true,
  },
  {
    slug: "plantas-em-vaso",
    path: "/plantas-em-vaso",
    label: "Plantas Em Vaso",
    sheet: "Plantas Em Vaso",
    subtitle: "Plantas cultivadas em vaso, prontas a plantar no substrato.",
  },
  {
    slug: "plantas-in-vitro",
    path: "/plantas-in-vitro",
    label: "Plantas In Vitro",
    sheet: "Plantas In Vitro",
    subtitle: "Plantas livres de algas e caracóis, cultivadas em laboratório.",
  },
  {
    slug: "plantas-em-clip",
    path: "/plantas-em-clip",
    label: "Plantas Em Clip",
    sheet: "Plantas Em Clip",
    subtitle: "Plantas em clip, ideais para fixar em troncos e rochas.",
  },
  {
    slug: "aquarios",
    path: "/aquarios",
    label: "Aquários",
    sheet: "Aquários",
    subtitle: "Aquários para criar o setup perfeito.",
    custom: true,
  },
  {
    slug: "moveis",
    path: "/moveis",
    label: "Móveis",
    sheet: "Móveis ",
    subtitle: "Móveis e suportes robustos para o teu aquário.",
  },
  {
    slug: "alimentacao",
    path: "/alimentacao",
    label: "Alimentação",
    sheet: "Alimentação",
    subtitle: "Nutrição de qualidade para peixes saudáveis.",
    custom: true,
    homepage: true,
  },
  {
    slug: "alimentacao-congelada",
    path: "/alimentacao-congelada",
    label: "Alimentação Congelada",
    sheet: "Alimentação Congelada",
    subtitle: "Alimento congelado rico em nutrientes.",
    custom: true,
  },
  {
    slug: "condicionadores",
    path: "/condicionadores",
    label: "Condicionadores",
    sheet: "Condicionadores",
    subtitle: "Tratamento e equilíbrio da água do teu aquário.",
    custom: true,
    homepage: true,
  },
  {
    slug: "fertilizantes",
    path: "/fertilizantes",
    label: "Fertilizantes",
    sheet: "Fertilizantes",
    subtitle: "Nutrientes essenciais para plantas exuberantes.",
  },
  {
    slug: "troncos-rochas",
    path: "/troncos-rochas",
    label: "Troncos/Rochas",
    sheet: "TroncosRochas",
    subtitle: "Hardscape natural para aquascaping.",
    custom: true,
  },
  {
    slug: "testes-medicamentos",
    path: "/testes-medicamentos",
    label: "Testes/Medicamentos",
    sheet: "TestesMedicamentos",
    subtitle: "Monitoriza a química da água e trata os teus peixes.",
    custom: true,
  },
  {
    slug: "aquecimento",
    path: "/aquecimento",
    label: "Aquecimento",
    sheet: "Aquecimento",
    subtitle: "Termostatos e aquecedores para temperatura estável.",
    custom: true,
  },
  {
    slug: "substratos",
    path: "/substratos",
    label: "Substratos",
    sheet: "Substratos",
    subtitle: "A base perfeita para o teu aquascape.",
    custom: true,
    homepage: true,
  },
  {
    slug: "iluminacao",
    path: "/iluminacao",
    label: "Iluminação",
    sheet: "Iluminação",
    subtitle: "Luz adequada para plantas e cores vivas.",
  },
  {
    slug: "jix-sobo",
    path: "/jix-sobo",
    label: "Jix/Sobo",
    sheet: "JixSobo",
    subtitle: "Equipamento Jix e Sobo com excelente relação qualidade/preço.",
  },
  {
    slug: "acessorios",
    path: "/acessorios",
    label: "Acessórios",
    sheet: "Acessórios",
    subtitle: "Tudo o que precisas no dia a dia do aquário.",
    custom: true,
  },
  {
    slug: "filtragem",
    path: "/filtragem",
    label: "Filtragem",
    sheet: "Filtragem e Iluminação",
    subtitle: "Filtros e materiais filtrantes para água cristalina.",
  },
  {
    slug: "equipamentos",
    path: "/equipamentos",
    label: "Equipamentos",
    sheet: "Filtragem e Iluminação",
    subtitle: "Filtragem e iluminação para o teu aquário.",
    custom: true,
    homepage: true,
  },
  {
    slug: "co2",
    path: "/co2",
    label: "Co2",
    sheet: "Co2",
    subtitle: "Sistemas de CO2 para plantas saudáveis.",
    custom: true,
  },
];

export const NAV_CATEGORIES = [...CATEGORIES].sort((a, b) =>
  a.label.localeCompare(b.label, "pt")
);

export const GENERIC_CATEGORIES = CATEGORIES.filter((c) => !c.custom);

export const getCategoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
