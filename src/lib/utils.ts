import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDescriptionBullets(description: string): string[] {
  return description
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
