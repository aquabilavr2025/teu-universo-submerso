import type { ProductItem } from "@/hooks/useGoogleSheet";

/** Numeric price (in euros) parsed from the sheet's price column. */
export const parsePrice = (price: string): number => {
  const value = Number.parseFloat(
    price.replace(/[^0-9.,]/g, "").replace(/\.(?=\d{3}\b)/g, "").replace(",", "."),
  );
  return Number.isNaN(value) ? Number.POSITIVE_INFINITY : value;
};

const BRAND_STOPWORDS = new Set([
  "kit", "pack", "planta", "plantas", "peixe", "peixes", "filtro", "bomba",
  "aquario", "aquário", "substrato", "areia", "tronco", "rocha", "luz",
  "de", "da", "do", "para", "com", "em", "e",
]);

/**
 * Brand inferred from the first token of the product name — the sheet has no
 * dedicated brand column, so this keeps filtering available without schema changes.
 */
export const getBrand = (item: ProductItem): string | null => {
  const token = item.name.trim().split(/\s+/)[0]?.replace(/[^\p{L}\p{N}&.-]/gu, "");
  if (!token || token.length < 2) return null;
  if (BRAND_STOPWORDS.has(token.toLowerCase())) return null;
  if (/^\d+$/.test(token)) return null;
  return token;
};

/** Volume / size label such as "500 ml" or "5 L" found in the name or description. */
export const getVolumeLabel = (item: ProductItem): string | null => {
  const match = `${item.name} ${item.description}`.match(
    /(\d+[.,]?\d*)\s?(ml|mls|l|lt|litros?|kg|g|gr)\b/i,
  );
  if (!match) return null;

  const amount = match[1].replace(",", ".");
  const unitRaw = match[2].toLowerCase();
  const unit =
    unitRaw.startsWith("ml") ? "ml"
    : unitRaw.startsWith("l") ? "L"
    : unitRaw === "kg" ? "kg"
    : "g";

  return `${amount} ${unit}`;
};
