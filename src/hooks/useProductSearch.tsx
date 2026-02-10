import { useQuery } from "@tanstack/react-query";
import { ProductItem } from "./useGoogleSheet";

const SHEET_ID = "1hyIToXk4yncsHUfQdokrKWk1QYdWwTvIVwfegJVA1xU";

// All categories to fetch for global search
const CATEGORIES = [
  { key: "peixes", label: "Peixes", path: "/peixes" },
  { key: "Plantas em Vaso", label: "Plantas em Vaso", path: "/plantas" },
  { key: "Plantas in Vitro", label: "Plantas in Vitro", path: "/plantas" },
  { key: "Plantas em Clip", label: "Plantas em Clip", path: "/plantas" },
  { key: "alimentação", label: "Alimentação", path: "/alimentacao" },
  { key: "condicionadores\\fertilizantes", label: "Condicionadores", path: "/condicionadores" },
  { key: "filtragem e iluminação", label: "Equipamentos", path: "/equipamentos" },
  { key: "substratos", label: "Substratos", path: "/substratos" },
  { key: "Testes/Medicamentos", label: "Testes/Medicamentos", path: "/testes-medicamentos" },
  { key: "Aquário/Móveis", label: "Aquários", path: "/aquarios" },
  { key: "Aquecimento", label: "Aquecimento", path: "/aquecimento" },
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

// Parse CSV
const parseCSV = (csv: string): string[][] => {
  const rows: string[][] = [];
  const lines = csv.split(/\r?\n/);
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const row: string[] = [];
    let current = "";
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        row.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    row.push(current);
    rows.push(row);
  }
  
  return rows;
};

// Extract numeric price value
const extractPriceValue = (price: string): number => {
  const cleanPrice = price.replace(/[€$,\s]/g, "").replace(",", ".");
  const value = parseFloat(cleanPrice);
  return isNaN(value) ? 0 : value;
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
      const headerKeywords = ["imagem", "image", "foto", "nome", "name", "preço", "preco", "price", "produto", "product"];
      const hasHeader = rows.length > 0 && rows[0].some(cell => {
        const lower = cell.trim().toLowerCase();
        return headerKeywords.some(kw => lower === kw || lower.includes(kw));
      });
      const dataRows = hasHeader ? rows.slice(1) : rows;
      
      return dataRows.map((row, index) => {
        const [imageLink, name, priceStr] = row;
        const formattedPrice = formatPrice(priceStr?.trim() || "0");
        
        return {
          id: `${category.key}-${index}`,
          image: convertDriveLink(imageLink?.trim() || ""),
          name: name?.trim() || "",
          price: formattedPrice,
          priceValue: extractPriceValue(formattedPrice),
          category: category.label,
          categoryPath: category.path,
        };
      }).filter(item => item.name && item.name.length > 0);
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
