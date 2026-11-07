import { useState, useEffect, useMemo, useCallback } from "react";
import type { MouseEvent } from "react";
import Fuse from "fuse.js";
import { Search, X, Filter, Loader2, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAllProducts, SEARCH_CATEGORIES } from "@/hooks/useProductSearch";
import type { SearchableProduct } from "@/hooks/useProductSearch";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { getProductPath } from "@/lib/productRoute";
import { useNavigate } from "react-router-dom";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Highlight matching text in product names
const HighlightedText = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <span>{text}</span>;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <mark key={index} className="bg-primary/20 text-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// Empty price fields do not apply a filter
const parseOptionalPrice = (value: string): number | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const number = Number(trimmed.replace(",", "."));
  return Number.isFinite(number) && number >= 0 ? number : null;
};

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const { data: products = [], isLoading } = useAllProducts();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const debouncedQuery = useDebounce(query, 200);

  const minimum = parseOptionalPrice(minPrice);
  const maximum = parseOptionalPrice(maxPrice);
  const invalidRange = minimum !== null && maximum !== null && minimum > maximum;
  const hasActiveFilters = selectedCategories.length > 0 || minPrice.trim() !== "" || maxPrice.trim() !== "";

  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: [
          { name: "name", weight: 0.6 },
          { name: "description", weight: 0.25 },
          { name: "category", weight: 0.15 },
        ],
        threshold: 0.4,
        distance: 100,
        minMatchCharLength: 2,
        includeScore: true,
        ignoreLocation: true,
      }),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let results: SearchableProduct[] = debouncedQuery.trim()
      ? fuse.search(debouncedQuery).map(result => result.item)
      : [...products];

    if (selectedCategories.length > 0) {
      results = results.filter(product => selectedCategories.includes(product.category));
    }

    if (invalidRange) return [];

    if (minimum !== null) {
      results = results.filter(product => product.priceValue >= minimum);
    }

    if (maximum !== null) {
      results = results.filter(product => product.priceValue <= maximum);
    }

    return results;
  }, [debouncedQuery, fuse, products, selectedCategories, minimum, maximum, invalidRange]);

  // Recalculate the displayed list whenever either price input changes.
  const searchResults = filteredProducts.slice(0, 50);

  const suggestedProducts = useMemo(() => {
    if (searchResults.length > 0 || !debouncedQuery.trim() || hasActiveFilters) return [];
    return products.slice(0, 6);
  }, [searchResults, debouncedQuery, products, hasActiveFilters]);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories(previous =>
      previous.includes(category)
        ? previous.filter(item => item !== category)
        : [...previous, category]
    );
  }, []);

  const handleProductClick = useCallback((product: SearchableProduct) => {
    onOpenChange(false);
    navigate(getProductPath(product.categoryPath, product.routeId, product.name), {
      state: { from: product.categoryPath },
    });
  }, [navigate, onOpenChange]);

  const handleAddToCart = useCallback((product: SearchableProduct, event: MouseEvent) => {
    event.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceValue: product.priceValue,
      image: product.image,
    });
  }, [addItem]);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setShowFilters(false);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Pesquisar produtos</DialogTitle>
        </VisuallyHidden>

        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <Input
            placeholder="Pesquisar produtos..."
            value={query}
            onChange={event => setQuery(event.target.value)}
            className="border-0 focus-visible:ring-0 text-lg p-0 h-auto"
            autoFocus
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-8 w-8"
              onClick={() => setQuery("")}
              aria-label="Limpar pesquisa"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant={showFilters ? "secondary" : "ghost"}
            size="icon"
            className={cn("shrink-0 h-8 w-8", hasActiveFilters && "text-primary")}
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Mostrar filtros"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="p-4 border-b border-border bg-muted/30 space-y-4 animate-fade-in">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Categorias</span>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                    Limpar filtros
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {SEARCH_CATEGORIES.map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer transition-colors"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-foreground">Preço (opcional)</span>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="space-y-1">
                  <label htmlFor="search-min-price" className="text-xs text-muted-foreground">
                    Preço mínimo (€)
                  </label>
                  <Input
                    id="search-min-price"
                    type="text"
                    inputMode="decimal"
                    placeholder="Sem mínimo"
                    value={minPrice}
                    onChange={event => setMinPrice(event.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="search-max-price" className="text-xs text-muted-foreground">
                    Preço máximo (€)
                  </label>
                  <Input
                    id="search-max-price"
                    type="text"
                    inputMode="decimal"
                    placeholder="Sem máximo"
                    value={maxPrice}
                    onChange={event => setMaxPrice(event.target.value)}
                  />
                </div>
              </div>
              {invalidRange && (
                <p className="text-xs text-destructive mt-2" role="alert">
                  O preço mínimo não pode ser superior ao preço máximo.
                </p>
              )}
            </div>
          </div>
        )}

        <ScrollArea className="max-h-[60vh]">
          <div className="p-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                <p className="text-sm">A carregar produtos...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-3">
                  {filteredProducts.length} resultado{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}{filteredProducts.length > 50 ? " (a mostrar os primeiros 50)" : ""}
                </p>
                {searchResults.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={event => {
                          const image = event.currentTarget;
                          if (!image.src.endsWith("/placeholder.svg")) {
                            image.src = "/placeholder.svg";
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">
                        <HighlightedText text={product.name} query={debouncedQuery} />
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                        <span className="text-sm font-semibold text-primary">{product.price}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={event => handleAddToCart(product, event)}
                      aria-label={`Adicionar ${product.name} ao carrinho`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : debouncedQuery.trim() || hasActiveFilters ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-1">
                  {invalidRange ? "Intervalo de preços inválido" : "Nenhum produto encontrado"}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {invalidRange
                    ? "Altere o preço mínimo ou máximo para continuar."
                    : "Tente usar termos diferentes ou ajuste os filtros."}
                </p>
                {suggestedProducts.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-3">Sugestões</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {suggestedProducts.map(product => (
                        <div
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors text-left"
                        >
                          <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                          <p className="text-xs text-primary mt-1">{product.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Comece a escrever para pesquisar produtos</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
