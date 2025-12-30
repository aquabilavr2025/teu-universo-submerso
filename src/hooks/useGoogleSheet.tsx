import { useQuery } from "@tanstack/react-query";

export interface ProductItem {
  image: string;
  name: string;
  price: string;
}

const SHEET_ID = "1hyIToXk4yncsHUfQdokrKWk1QYdWwTvIVwfegJVA1xU";

// Sheet tab GIDs - get these from the Google Sheet URL when viewing each tab
const SHEET_TABS: Record<string, string> = {
  peixes: "0", // Default first sheet
  plantas: "1",
  alimentação: "2",
  "condicionadores\\fertilizantes": "3",
  "filtragem e iluminação": "4",
  substratos: "5",
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
  // Remove any existing currency symbols and clean up
  const cleanPrice = price.replace(/[€$]/g, "").trim();
  
  // If already has € at the end, return as is
  if (price.includes("€")) {
    return price;
  }
  
  // Add € symbol
  return `${cleanPrice}€`;
};

const fetchSheetData = async (tabName: string): Promise<ProductItem[]> => {
  const gid = SHEET_TABS[tabName] || "0";
  const timestamp = Date.now();
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}&_t=${timestamp}`;
  
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch spreadsheet data");
  }
  
  const csvText = await response.text();
  const rows = parseCSV(csvText);
  
  // Map data - spreadsheet format: [Image URL], [Name], [Price]
  const items: ProductItem[] = rows.map((row) => {
    const [imageLink, name, priceStr] = row;
    
    return {
      image: convertDriveLink(imageLink?.trim() || ""),
      name: name?.trim() || "",
      price: formatPrice(priceStr?.trim() || "0"),
    };
  }).filter(item => item.name && item.image);
  
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
  });
};
