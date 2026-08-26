import CategoryPageTemplate from "@/components/catalog/CategoryPageTemplate";

const Peixes = () => (
  <CategoryPageTemplate
    sheet="peixes"
    title="Peixes"
    subtitle="Descobre a nossa coleção de espécies tropicais e de água fria. Qualidade e saúde garantidas."
    href="/peixes"
    emptyMessage="Nenhum peixe disponível de momento."
  />
);

export default Peixes;
