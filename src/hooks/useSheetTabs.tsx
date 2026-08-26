import { useQuery } from "@tanstack/react-query";
import { SHEET_ID } from "@/hooks/useGoogleSheet";
import { slugify, titleize } from "@/lib/slug";

export interface SheetTab {
  /** Exact tab name inside the Google Sheet workbook. */
  sheet: string;
  /** URL slug generated from the tab name. */
  slug: string;
  /** Display title for the page. */
  title: string;
}

/**
 * Reads the list of tabs directly from the published workbook, so any sheet
 * added in Google Sheets automatically becomes a page on the site.
 */
const fetchSheetTabs = async (): Promise<SheetTab[]> => {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/htmlview?_t=${Date.now()}`;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to list workbook tabs");
  }

  const html = await response.text();
  const tabs: SheetTab[] = [];
  const seen = new Set<string>();

  const regex = /items\.push\(\{name:\s*"((?:[^"\\]|\\.)*)"/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const sheet = match[1]
      .replace(/\\x2f|\\\//g, "/")
      .replace(/\\x5c|\\\\/g, "\\")
      .replace(/\\"/g, '"')
      .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) =>
        String.fromCharCode(Number.parseInt(hex, 16)),
      )
      .trim();

    const slug = slugify(sheet);
    if (!sheet || !slug || seen.has(slug)) continue;

    seen.add(slug);
    tabs.push({ sheet, slug, title: titleize(sheet) });
  }

  return tabs;
};

export const useSheetTabs = () =>
  useQuery({
    queryKey: ["sheet-tabs"],
    queryFn: fetchSheetTabs,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });
