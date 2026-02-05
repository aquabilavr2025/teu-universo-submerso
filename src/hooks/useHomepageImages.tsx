import { useQuery } from "@tanstack/react-query";

export interface HomepageImage {
  label: string;
  imageUrl: string;
}

const SHEET_ID = "1hyIToXk4yncsHUfQdokrKWk1QYdWwTvIVwfegJVA1xU";
const SHEET_NAME = "Fotos Página Inicial";

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
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1200`;
  }
  
  // Handle id= parameter format
  const idMatch = driveLink.match(/id=([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1200`;
  }
  
  // Handle open?id= format
  const openMatch = driveLink.match(/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    return `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w1200`;
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

// Image label mapping (lowercase for matching)
const IMAGE_LABELS = {
  loja: "hero",
  peixes: "fish",
  plantas: "plants",
  substratos: "substrates",
  filtros: "equipment",
  condicionadores: "conditioners",
  comidas: "food",
  "mundo aquático": "about",
} as const;

export type ImageKey = typeof IMAGE_LABELS[keyof typeof IMAGE_LABELS];

const fetchHomepageImages = async (): Promise<Record<ImageKey, string>> => {
  const timestamp = Date.now();
  const encodedSheetName = encodeURIComponent(SHEET_NAME);
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodedSheetName}&_t=${timestamp}`;
  
  console.log(`Fetching homepage images from: ${url}`);
  
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
    },
  });
  
  if (!response.ok) {
    console.error(`Failed to fetch homepage images: ${response.status}`);
    throw new Error("Failed to fetch homepage images");
  }
  
  const csvText = await response.text();
  console.log("Raw homepage images CSV:", csvText.substring(0, 500));
  
  const rows = parseCSV(csvText);
  
  // Initialize with empty strings
  const images: Record<ImageKey, string> = {
    hero: "",
    fish: "",
    plants: "",
    substrates: "",
    equipment: "",
    conditioners: "",
    food: "",
    about: "",
  };
  
  // Skip header row and process data
  // Expected format: [Image URL], [Label]
  for (const row of rows.slice(1)) {
    const [imageUrl, label] = row;
    
    if (!label || !imageUrl) continue;
    
    const normalizedLabel = label.trim().toLowerCase();
    const imageKey = IMAGE_LABELS[normalizedLabel as keyof typeof IMAGE_LABELS];
    
    if (imageKey) {
      images[imageKey] = convertDriveLink(imageUrl.trim());
      console.log(`Mapped ${label} -> ${imageKey}:`, images[imageKey]);
    }
  }
  
  console.log("Final homepage images:", images);
  
  return images;
};

export const useHomepageImages = () => {
  return useQuery({
    queryKey: ["homepage-images"],
    queryFn: fetchHomepageImages,
    staleTime: 1000 * 60 * 5, // 5 minutes cache for images
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    retry: 2,
  });
};
