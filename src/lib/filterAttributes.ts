import type { ProductItem } from "@/hooks/useGoogleSheet";

/**
 * Technical attributes derived from the product name + description columns
 * of the Google Sheet (no extra columns required — future sheet updates
 * automatically produce new filter options).
 */
export interface FilterAttributes {
  /** Flow rate in litres/hour, when present (e.g. "1200 L/H"). */
  flowRate: number | null;
  /** Recommended tank volume in litres, when present (e.g. "até 200L"). */
  tankSize: number | null;
  /** Filter type keyword found in the text (e.g. "Externo"). */
  filterType: string | null;
}

const FILTER_TYPES: { label: string; patterns: RegExp[] }[] = [
  { label: "Externo", patterns: [/\bexterno?s?\b/i, /\bcanister\b/i] },
  { label: "Interno", patterns: [/\binterno?s?\b/i] },
  { label: "Mochila", patterns: [/\bmochila\b/i, /\bhang\s?-?on\b/i] },
  { label: "Esponja", patterns: [/\besponjas?\b/i, /\bsponge\b/i] },
  { label: "Sump", patterns: [/\bsump\b/i] },
  { label: "UV", patterns: [/\buv\b/i, /\besteriliza/i] },
  { label: "Bomba", patterns: [/\bbombas?\b/i, /\bcirculação\b/i] },
  { label: "Massas Filtrantes", patterns: [/\bmassas?\s+filtrantes?\b/i, /\bcerâmic/i, /\bcarvão\b/i] },
];

const parseNumber = (value: string) =>
  Number.parseFloat(value.replace(",", "."));

export const getFilterAttributes = (item: ProductItem): FilterAttributes => {
  const text = `${item.name} ${item.description}`;

  const flowMatch = text.match(/(\d+[.,]?\d*)\s*(?:l\s*\/\s*h|lph|litros?\s*\/\s*hora)/i);
  const tankMatch = text.match(
    /(?:até|ate|max\.?|máx\.?|aquários?\s+(?:de\s+)?)\s*(\d+[.,]?\d*)\s*(?:l\b|lt\b|litros?)/i,
  );

  const filterType =
    FILTER_TYPES.find((type) => type.patterns.some((pattern) => pattern.test(text)))
      ?.label ?? null;

  return {
    flowRate: flowMatch ? parseNumber(flowMatch[1]) : null,
    tankSize: tankMatch ? parseNumber(tankMatch[1]) : null,
    filterType,
  };
};

export const FLOW_RANGES = [
  { id: "all", label: "Todos", test: () => true },
  { id: "0-500", label: "Até 500 L/h", test: (v: number) => v <= 500 },
  { id: "500-1000", label: "500 – 1000 L/h", test: (v: number) => v > 500 && v <= 1000 },
  { id: "1000+", label: "Mais de 1000 L/h", test: (v: number) => v > 1000 },
];

export const TANK_RANGES = [
  { id: "all", label: "Todos", test: () => true },
  { id: "0-100", label: "Até 100 L", test: (v: number) => v <= 100 },
  { id: "100-250", label: "100 – 250 L", test: (v: number) => v > 100 && v <= 250 },
  { id: "250+", label: "Mais de 250 L", test: (v: number) => v > 250 },
];
