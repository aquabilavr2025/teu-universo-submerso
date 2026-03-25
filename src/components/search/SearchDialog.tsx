import { useState, useEffect, useMemo, useCallback } from "react";

import Fuse from "fuse.js";
import { Search, X, Filter, Loader2, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAllProducts, SearchableProduct, SEARCH_CATEGORIES } from "@/hooks/useProductSearch";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Highlight matching text
const HighlightedText = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <span>{text}</span>;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

// Debounce hook
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
};

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const { data: products = [], isLoading } = useAllProducts();
  const { addItem } = useCart();
  
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null); // null = no price filter active
  const [showFilters, setShowFilters] = useState(false);
  
  const debouncedQuery = useDebounce(query, 200);
  
  // Calculate price range from products
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 500;
    return Math.max(...products.map(p => p.priceValue), 500);
  }, [products]);
  
  // Initialize Fuse.js with fuzzy search options
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: [
        { name: "name", weight: 0.6 },
        { name: "description", weight: 0.25 },
        { name: "category", weight: 0.15 },
      ],
      threshold: 0.4, // Allows for typos
      distance: 100,
      minMatchCharLength: 2,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [products]);
  
  // Filter and search products
  const searchResults = useMemo(() => {
    let results: SearchableProduct[] = [];
    
    if (debouncedQuery.trim()) {
      const fuseResults = fuse.search(debouncedQuery);
      results = fuseResults.map(r => r.item);
    } else {
      results = [...products];
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(p => selectedCategories.includes(p.category));
    }
    
    // Apply price filter only when explicitly set by user
    if (priceRange !== null) {
      results = results.filter(p => 
        p.priceValue >= priceRange[0] && p.priceValue <= priceRange[1]
      );
    }
    
    return results.slice(0, 50); // Show up to 50 results
  }, [debouncedQuery, fuse, products, selectedCategories, priceRange]);
  
  // Suggested products when no results
  const suggestedProducts = useMemo(() => {
    if (searchResults.length > 0 || !debouncedQuery.trim()) return [];
    return products.slice(0, 6);
  }, [searchResults, debouncedQuery, products]);
  
  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }, []);
  
  const handleProductClick = useCallback((product: SearchableProduct) => {
    onOpenChange(false);
    const params = new URLSearchParams();
    params.set("nome", product.name);
    params.set("preco", product.price);
    params.set("imagem", product.image || "");
    params.set("descricao", product.description || "");
    params.set("stock", product.stock !== null && product.stock !== undefined ? String(product.stock) : "");
    params.set("categoria", product.category || "");
    params.set("origem", product.categoryPath || "/");

    // Navigate to product page with query params
    window.location.href = `/produto?${params.toString()}`;
  }, [onOpenChange]);
  
  const handleAddToCart = useCallback((product: SearchableProduct, e: React.MouseEvent) => {
    e.stopPropagation();
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
    setPriceRange(null);
  }, []);
  
  // Reset on close
  useEffect(() => {
    if (!open) {
      setQuery("");
      setShowFilters(false);
    }
  }, [open]);
  
  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);
  
  const hasActiveFilters = selectedCategories.length > 0 || priceRange !== null;
  
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
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-lg p-0 h-auto"
            autoFocus
          />
          {query && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="shrink-0 h-8 w-8"
              onClick={() => setQuery("")}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant={showFilters ? "secondary" : "ghost"}
            size="icon"
            className={cn("shrink-0 h-8 w-8", hasActiveFilters && "text-primary")}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <div className="p-4 border-b border-border bg-muted/30 space-y-4 animate-fade-in">
            {/* Category Filters */}
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
                {SEARCH_CATEGORIES.map((category) => (
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
            
            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Preço</span>
                <span className="text-sm text-muted-foreground">
                  {(priceRange ?? [0, maxPrice])[0]}€ - {(priceRange ?? [0, maxPrice])[1]}€
                </span>
              </div>
              <Slider
                value={priceRange ?? [0, maxPrice]}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                min={0}
                max={maxPrice}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        )}
        
        {/* Results */}
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
                  {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""} encontrado{searchResults.length !== 1 ? "s" : ""}
                </p>
                {searchResults.map((product) => (
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
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">
                        <HighlightedText text={product.name} query={debouncedQuery} />
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                        <span className="text-sm font-semibold text-primary">
                          {product.price}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : debouncedQuery.trim() ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-1">
                  Nenhum resultado para "{debouncedQuery}"
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Tente usar termos diferentes ou explore as nossas sugestões
                </p>
                
                {suggestedProducts.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-3">Sugestões</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {suggestedProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors text-left"
                        >
                          <p className="text-sm font-medium text-foreground truncate">
                            {product.name}
                          </p>
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
                <p className="text-sm">
                  Comece a escrever para pesquisar produtos
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
