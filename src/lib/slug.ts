/** Convert a Google Sheet tab name into a clean URL slug. */
export const slugify = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\\/]+/g, "-")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

/** Human friendly title from a sheet tab name. */
export const titleize = (value: string): string =>
  value
    .replace(/[\\/]+/g, " / ")
    .split(" ")
    .filter(Boolean)
    .map((word) =>
      word.length > 2 && word === word.toLowerCase()
        ? word[0].toUpperCase() + word.slice(1)
        : word,
    )
    .join(" ");
