import { slugify } from "@/lib/slug";

export const getProductId = (sheetName: string, rowIndex: number): string =>
  `${slugify(sheetName)}-${rowIndex + 1}`;

export const getProductRouteId = (rowIndex: number): string =>
  String(rowIndex + 1);

export const getProductCategory = (categoryPath: string): string =>
  categoryPath
    .split("/")
    .filter(Boolean)
    .map((segment) => slugify(segment))
    .join("/");

export const getProductSlug = (name: string): string => slugify(name);

export const getProductPath = (
  categoryPath: string,
  id: string,
  name: string,
): string =>
  `/${getProductCategory(categoryPath)}/${id}/${getProductSlug(name)}`;
