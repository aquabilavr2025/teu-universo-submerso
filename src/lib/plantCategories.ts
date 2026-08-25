export interface PlantSubcategory {
  slug: string;
  label: string;
  sheet: string;
  subtitle: string;
}

export const PLANT_SUBCATEGORIES: PlantSubcategory[] = [
  {
    slug: "in-vitro",
    label: "In Vitro",
    sheet: "plantas-vitro",
    subtitle: "Plantas cultivadas em laboratório, livres de algas, caracóis e pesticidas.",
  },
  {
    slug: "em-clip",
    label: "Em Clip",
    sheet: "plantas-clip",
    subtitle: "Plantas prontas a fixar em troncos e rochas, com clip incluído.",
  },
  {
    slug: "em-vaso",
    label: "Em Vaso",
    sheet: "plantas-vaso",
    subtitle: "Plantas robustas em vaso, prontas a plantar no substrato do teu aquário.",
  },
];

/** Legacy query-param tabs → new subcategory slugs. */
export const LEGACY_PLANT_TABS: Record<string, string> = {
  "plantas-vitro": "in-vitro",
  "plantas-clip": "em-clip",
  "plantas-vaso": "em-vaso",
};
