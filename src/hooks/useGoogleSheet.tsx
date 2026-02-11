import { useQuery } from "@tanstack/react-query";

export interface ProductItem {
  image: string;
  name: string;
  price: string;
  description: string;
  stock: number | null;
}

const SHEET_ID = "1hyIToXk4yncsHUfQdokrKWk1QYdWwTvIVwfegJVA1xU";

// Sheet names exactly as they appear in Google Sheets (case-sensitive)
const SHEET_NAMES: Record<string, string> = {
  peixes: "peixes",
  plantas: "plantas",
  "plantas-vaso": "Plantas em Vaso",
  "plantas-vitro": "Plantas in Vitro",
  "plantas-clip": "Plantas em Clip",
  alimentação: "alimentação",
  "condicionadores\\fertilizantes": "condicionadores\\fertilizantes",
  "filtragem e iluminação": "filtragem e iluminação",
  substratos: "substratos",
  "Testes/Medicamentos": "Testes/Medicamentos",
  "Aquários": "Aquários",
  "Aquecimento": "Aquecimento",
};

// Convert Google Drive share links to thumbnail URLs
const convertDriveLink = (driveLink: string): string => {
  if (!driveLink) return "";
  
  // Handle direct thumbnail URLs
  if (driveLink.includes("thumbnail?id=")) {
    return driveLink;
  }
  
  // Handle /file/d/ format
  const fileMatch = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w800`;
  }
  
  // Handle id= parameter format
  const idMatch = driveLink.match(/id=([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w800`;
  }
  
  // Handle open?id= format
  const openMatch = driveLink.match(/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    return `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w800`;
  }
  
  return driveLink;
};

// Simple CSV parser that handles quoted fields
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

// Format price to ensure Euro format
const formatPrice = (price: string): string => {
  if (!price) return "0€";
  
  // Remove any existing currency symbols and clean up
  const cleanPrice = price.replace(/[€$]/g, "").trim();
  
  // If already has € at the end, return as is
  if (price.includes("€")) {
    return price;
  }
  
  // Add € symbol
  return `${cleanPrice}€`;
};

// Detect if the first row looks like a header row
const isHeaderRow = (row: string[]): boolean => {
  const headerKeywords = [
    "imagem", "image", "foto", "photo", "link",
    "nome", "name", "produto", "product",
    "preço", "preco", "price", "valor",
    "quantidade", "quantity", "stock",
    "descrição", "description",
  ];
  return row.some((cell) => {
    const lower = cell.trim().toLowerCase();
    return headerKeywords.some((keyword) => lower === keyword || lower.includes(keyword));
  });
};

const fetchSheetData = async (tabName: string): Promise<ProductItem[]> => {
  const sheetName = SHEET_NAMES[tabName] || tabName;
  const timestamp = Date.now();
  
  const encodedSheetName = encodeURIComponent(sheetName);
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodedSheetName}&_t=${timestamp}`;
  
  console.log(`Fetching sheet: ${sheetName} from URL: ${url}`);
  
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
    },
  });
  
  if (!response.ok) {
    console.error(`Failed to fetch sheet ${sheetName}: ${response.status}`);
    throw new Error(`Failed to fetch spreadsheet data for ${sheetName}`);
  }
  
  const csvText = await response.text();
  console.log(`Raw CSV for ${sheetName}:`, csvText.substring(0, 500));
  
  const rows = parseCSV(csvText);
  
  // Smart header detection: only skip first row if it looks like a header
  const dataRows = rows.length > 0 && isHeaderRow(rows[0]) ? rows.slice(1) : rows;
  
  const items: ProductItem[] = dataRows.map((row) => {
    const [imageLink, name, priceStr] = row;
    
    return {
      image: convertDriveLink(imageLink?.trim() || ""),
      name: name?.trim() || "",
      price: formatPrice(priceStr?.trim() || "0"),
    };
  }).filter(item => item.name && item.name.length > 0);
  
  console.log(`Parsed ${items.length} items from ${sheetName} (header detected: ${rows.length > 0 && isHeaderRow(rows[0])})`);
  
  return items;
};

export const useGoogleSheet = (tabName: string) => {
  return useQuery({
    queryKey: ["sheet-inventory", tabName],
    queryFn: () => fetchSheetData(tabName),
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 2,
  });
};
