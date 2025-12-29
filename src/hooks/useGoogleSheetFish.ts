import { useQuery } from "@tanstack/react-query";

export interface FishItem {
  image: string;
  name: string;
  quantity: number;
  price: string;
  category?: string;
  description?: string;
}

const SHEET_ID = "1hyIToXk4yncsHUfQdokrKWk1QYdWwTvIVwfegJVA1xU";

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

const fetchFishData = async (): Promise<FishItem[]> => {
  // Use Google Sheets CSV export endpoint with cache-busting
  const timestamp = Date.now();
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&_t=${timestamp}`;
  
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
  
  // Skip header row and map data
  // Expected format: [Image Link], [Fish Name], [Quantity], [Price]
  const fishItems: FishItem[] = rows.slice(1).map((row) => {
    const [imageLink, name, quantityStr, priceStr, category, description] = row;
    
    return {
      image: convertDriveLink(imageLink?.trim() || ""),
      name: name?.trim() || "Unknown",
      quantity: parseInt(quantityStr?.trim() || "0", 10) || 0,
      price: formatPrice(priceStr?.trim() || "0"),
      category: category?.trim() || "Peixe",
      description: description?.trim() || "",
    };
  }).filter(fish => fish.name && fish.name !== "Unknown" && fish.image);
  
  return fishItems;
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

export const useGoogleSheetFish = () => {
  return useQuery({
    queryKey: ["fish-inventory"],
    queryFn: fetchFishData,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache (formerly cacheTime)
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
