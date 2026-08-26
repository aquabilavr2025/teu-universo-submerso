import { ReactNode, useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductGrid from "@/components/catalog/ProductGrid";
import CatalogBreadcrumbs, { Crumb } from "@/components/catalog/CatalogBreadcrumbs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGoogleSheet, type ProductItem } from "@/hooks/useGoogleSheet";
import { getBrand, getVolumeLabel, parsePrice } from "@/lib/productAttributes";

export interface CategoryPageTemplateProps {
  /** Exact Google Sheet tab name feeding this page. */
  sheet: string;
  title: string;
  subtitle?: string;
  /** Canonical route of the page, used for breadcrumbs and product links. */
  href: string;
  breadcrumbs?: Crumb[];
  emptyMessage?: string;
  /** Optional extra content rendered between the filters and the grid. */
  children?: ReactNode;
}

const SORT_OPTIONS = [
  { id: "default", label: "Ordenação predefinida" },
  { id: "price-asc", label: "Preço: mais baixo primeiro" },
  { id: "price-desc", label: "Preço: mais alto primeiro" },
  { id: "name-asc", label: "Nome: A – Z" },
];

const CategoryPageTemplate = ({
  sheet,
  title,
  subtitle,
  href,
  breadcrumbs,
  emptyMessage = "Nenhum produto disponível de momento.",
  children,
}: CategoryPageTemplateProps) => {
  const { data: inventory, isLoading, isError, refetch, isFetching } =
    useGoogleSheet(sheet);

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [volume, setVolume] = useState("all");
  const [stock, setStock] = useState("all");
  const [sort, setSort] = useState("default");

  const items: ProductItem[] = useMemo(() => inventory ?? [], [inventory]);

  const brands = useMemo(() => {
    const values = new Set<string>();
    items.forEach((item) => {
      const value = getBrand(item);
      if (value) values.add(value);
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b, "pt"));
  }, [items]);

  const volumes = useMemo(() => {
    const values = new Set<string>();
    items.forEach((item) => {
      const value = getVolumeLabel(item);
      if (value) values.add(value);
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b, "pt", { numeric: true }));
  }, [items]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const result = items.filter((item) => {
      if (
        normalizedQuery &&
        !`${item.name} ${item.description}`.toLowerCase().includes(normalizedQuery)
      ) {
        return false;
      }
      if (brand !== "all" && getBrand(item) !== brand) return false;
      if (volume !== "all" && getVolumeLabel(item) !== volume) return false;
      if (stock === "in" && item.stock !== 1) return false;
      if (stock === "order" && item.stock === 1) return false;
      return true;
    });

    if (sort === "price-asc") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sort === "price-desc") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sort === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name, "pt"));
    }

    return result;
  }, [items, query, brand, volume, stock, sort]);

  const hasFilters =
    query.trim() !== "" || brand !== "all" || volume !== "all" || stock !== "all" || sort !== "default";

  const resetFilters = () => {
    setQuery("");
    setBrand("all");
    setVolume("all");
    setStock("all");
    setSort("default");
  };

  return (
    <Layout>
      <PageHero title={title} subtitle={subtitle} />

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <CatalogBreadcrumbs items={breadcrumbs ?? [{ label: title }]} />

          <div className="mb-10 grid grid-cols-1 gap-4 rounded-2xl bg-muted/40 p-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium">Pesquisar</label>
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nome ou descrição..."
                className="bg-background"
              />
            </div>

            {brands.length > 1 && (
              <div>
                <label className="mb-2 block text-sm font-medium">Marca</label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">Todas</SelectItem>
                    {brands.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {volumes.length > 1 && (
              <div>
                <label className="mb-2 block text-sm font-medium">Volume</label>
                <Select value={volume} onValueChange={setVolume}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">Todos</SelectItem>
                    {volumes.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium">Disponibilidade</label>
              <Select value={stock} onValueChange={setStock}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="in">Em Stock</SelectItem>
                  <SelectItem value="order">Sob Encomenda</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Ordenar por</label>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasFilters && (
              <div className="flex items-end sm:col-span-2 lg:col-span-5">
                <Button type="button" variant="ghost" onClick={resetFilters}>
                  Limpar filtros
                </Button>
                <span className="ml-auto self-center text-sm text-muted-foreground">
                  {filtered.length} de {items.length} produtos
                </span>
              </div>
            )}
          </div>

          {children}

          <ProductGrid
            items={filtered}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching && !isLoading}
            refetch={refetch}
            href={href}
            emptyMessage={
              hasFilters
                ? "Nenhum produto corresponde aos filtros selecionados."
                : emptyMessage
            }
          />
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPageTemplate;
