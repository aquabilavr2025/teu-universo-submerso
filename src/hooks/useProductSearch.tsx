import { useQuery } from "@tanstack/react-query";
import { isHeaderRow, type ProductItem } from "./useGoogleSheet";
import { getProductId, getProductRouteId } from "@/lib/productRoute";

const SHEET_ID = "1hyIToXk4yncsHUfQdokrKWk1QYdWwTvIVwfegJVA1xU";

// All categories to fetch for global search
const CATEGORIES = [
  { key: "peixes", label: "Peixes", path: "/peixes" },
  { key: "Plantas em Vaso", label: "Plantas em Vaso", path: "/plantas/em-vaso" },
  { key: "Plantas in Vitro", label: "Plantas in Vitro", path: "/plantas/in-vitro" },
  { key: "Plantas em Clip", label: "Plantas em Clip", path: "/plantas/em-clip" },
  { key: "alimentação", label: "Alimentação", path: "/alimentacao" },
  { key: "condicionadores", label: "Condicionadores", path: "/condicionadores" },
  { key: "fertilizantes", label: "Fertilizantes", path: "/fertilizantes" },
  { key: "Iluminação", label: "Iluminação", path: "/iluminacao" },
  { key: "substratos", label: "Substratos", path: "/substratos" },
  { key: "Testes/Medicamentos", label: "Testes/Medicamentos", path: "/testes-medicamentos" },
  { key: "Aquários", label: "Aquários", path: "/aquarios" },
  { key: "Aquecimento", label: "Aquecimento", path: "/aquecimento" },
  { key: "Acessórios", label: "Acessórios", path: "/acessorios" },
  { key: "Co2", label: "Co2", path: "/co2" },
  { key: "Alimentação Congelada", label: "Alimentação Congelada", path: "/alimentacao-congelada" },
  { key: "Troncos/Rochas", label: "Troncos/Rochas", path: "/troncos-rochas" },
  { key: "Filtragem", label: "Filtragem", path: "/filtragem" },
  { key: "Jix/Sobo", label: "Jix/Sobo", path: "/jix-sobo" },
];

export interface SearchableProduct extends ProductItem {
  id: string;
  category: string;
  categoryPath: string;
  priceValue: number;
}

// Convert Google Drive share links to thumbnail URLs
const convertDriveLink = (driveLink: string): string => {
  if (!driveLink) return "";
  
  if (driveLink.includes("thumbnail?id=")) {
    return driveLink;
  }
  
  const fileMatch = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w800`;
  }
  
  const idMatch = driveLink.match(/id=([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w800`;
  }
  
  const openMatch = driveLink.match(/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    return `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w800`;
  }
  
  return driveLink;
};

// Parse CSV supporting quoted fields and multiline descriptions
const parseCSV = (csv: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }

      row.push(current);

      if (row.some(cell => cell.trim() !== "")) {
        rows.push(row);
      }

      row = [];
      current = "";
    } else {
      current += char;
    }
  }

  // Add the last row
  row.push(current);

  if (row.some(cell => cell.trim() !== "")) {
    rows.push(row);
  }

  return rows;
};

// Sanitize text
const sanitizeText = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-zA-Z]+;/g, " ")
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

// Sanitize product descriptions while preserving line breaks
const sanitizeDescription = (text: string): string => {
  if (!text) return "";

  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]*/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

// Extract numeric price value
const extractPriceValue = (price: string): number => {
  if (!price) return 0;

  let cleanPrice = price
    .replace(/[€$\s]/g, "")
    .trim();

  // Handle European and international price formats
  if (cleanPrice.includes(",") && cleanPrice.includes(".")) {
    if (cleanPrice.lastIndexOf(",") > cleanPrice.lastIndexOf(".")) {
      // European format: 1.250,50
      cleanPrice = cleanPrice.replace(/\./g, "").replace(",", ".");
    } else {
      // International format: 1,250.50
      cleanPrice = cleanPrice.replace(/,/g, "");
    }
  } else if (cleanPrice.includes(",")) {
    // Portuguese format: 22,50
    cleanPrice = cleanPrice.replace(",", ".");
  }

  const value = Number(cleanPrice);

  return Number.isFinite(value) ? value : 0;
};

const formatPrice = (price: string): string => {
  if (!price) return "0€";
  const cleanPrice = price.replace(/[€$]/g, "").trim();
  if (price.includes("€")) return price;
  return `${cleanPrice}€`;
};

// Fetch all products from all sheets
const fetchAllProducts = async (): Promise<SearchableProduct[]> => {
  const allProducts: SearchableProduct[] = [];
  
  const fetchPromises = CATEGORIES.map(async (category) => {
    try {
      const encodedSheetName = encodeURIComponent(category.key);
      const timestamp = Date.now();
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodedSheetName}&_t=${timestamp}`;
      
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
        },
      });
      
      if (!response.ok) return [];
      
      const csvText = await response.text();
      const rows = parseCSV(csvText);
      
      // Smart header detection: only skip first row if it looks like a header
      const hasHeader = rows.length > 0 && isHeaderRow(rows[0]);
      const dataRows = hasHeader ? rows.slice(1) : rows;
      
      return dataRows.map((row, index) => {
        const [imageLink, name, priceStr, description, stockStr] = row;
        const formattedPrice = formatPrice(priceStr?.trim() || "0");
        const stockVal = stockStr?.trim() ? parseInt(stockStr.trim(), 10) : null;
        
        return {
          id: getProductId(category.key, index),
          routeId: getProductRouteId(index),
          image: convertDriveLink(imageLink?.trim() || ""),
          name: sanitizeText(name?.trim() || ""),
          price: formattedPrice,
          priceValue: extractPriceValue(formattedPrice),
          description: sanitizeDescription(description?.trim() || ""),
          stock: isNaN(stockVal as number) ? null : stockVal,
          category: category.label,
          categoryPath: category.path,
        };
      }).filter(item => {
          const name = item.name.trim();
            //Validação que checka se os nomes são apenas números ou símbolos
          return (
            name.length >= 2 &&
            /[\p{L}\p{N}]/u.test(name) &&
            !/^[\d\s€$.,;"']+$/.test(name) &&
            Number.isFinite(item.priceValue) &&
            item.priceValue >= 0
          );
        });
    } catch (error) {
      console.error(`Error fetching ${category.key}:`, error);
      return [];
    }
  });
  
  const results = await Promise.all(fetchPromises);
  results.forEach(items => allProducts.push(...items));
  
  return allProducts;
};

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: fetchAllProducts,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes for search
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const SEARCH_CATEGORIES = CATEGORIES.map(c => c.label);
