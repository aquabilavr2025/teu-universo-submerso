import { useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductGrid from "@/components/catalog/ProductGrid";
import CatalogBreadcrumbs from "@/components/catalog/CatalogBreadcrumbs";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";
import {
  FLOW_RANGES,
  TANK_RANGES,
  getFilterAttributes,
} from "@/lib/filterAttributes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Filtragem = () => {
  const { data: inventory, isLoading, isError, refetch, isFetching } =
    useGoogleSheet("Filtragem");

  const [filterType, setFilterType] = useState("all");
  const [flow, setFlow] = useState("all");
  const [tank, setTank] = useState("all");

  const enriched = useMemo(
    () =>
      (inventory ?? []).map((item) => ({
        item,
        attrs: getFilterAttributes(item),
      })),
    [inventory],
  );

  const filterTypes = useMemo(() => {
    const types = new Set<string>();
    enriched.forEach(({ attrs }) => attrs.filterType && types.add(attrs.filterType));
    return Array.from(types).sort();
  }, [enriched]);

  const filtered = useMemo(() => {
    const flowRange = FLOW_RANGES.find((r) => r.id === flow);
    const tankRange = TANK_RANGES.find((r) => r.id === tank);

    return enriched
      .filter(({ attrs }) => {
        if (filterType !== "all" && attrs.filterType !== filterType) return false;
        if (flow !== "all" && (attrs.flowRate === null || !flowRange?.test(attrs.flowRate)))
          return false;
        if (tank !== "all" && (attrs.tankSize === null || !tankRange?.test(attrs.tankSize)))
          return false;
        return true;
      })
      .map(({ item }) => item);
  }, [enriched, filterType, flow, tank]);

  const hasFilters = filterType !== "all" || flow !== "all" || tank !== "all";

  return (
    <Layout>
      <PageHero
        title="Filtragem"
        subtitle="Filtros, bombas e massas filtrantes para manter a água do teu aquário sempre cristalina."
      />

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <CatalogBreadcrumbs items={[{ label: "Filtragem" }]} />

          <div className="mb-10 flex flex-col gap-4 rounded-xl bg-muted/40 p-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium">Tipo de filtro</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">Todos</SelectItem>
                  {filterTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium">Caudal</label>
              <Select value={flow} onValueChange={setFlow}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {FLOW_RANGES.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium">Volume do aquário</label>
              <Select value={tank} onValueChange={setTank}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {TANK_RANGES.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setFilterType("all");
                  setFlow("all");
                  setTank("all");
                }}
              >
                Limpar filtros
              </Button>
            )}
          </div>

          <ProductGrid
            items={filtered}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching && !isLoading}
            refetch={refetch}
            href="/filtragem"
            emptyMessage={
              hasFilters
                ? "Nenhum produto corresponde aos filtros selecionados."
                : "Nenhum produto de filtragem disponível de momento."
            }
          />
        </div>
      </section>
    </Layout>
  );
};

export default Filtragem;
