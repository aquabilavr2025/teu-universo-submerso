import CategoryPageTemplate from "@/components/catalog/CategoryPageTemplate";

const Fertilizantes = () => (
  <CategoryPageTemplate
    sheet="fertilizantes"
    title="Fertilizantes"
    subtitle="Nutre as tuas plantas com os nossos fertilizantes especializados."
    href="/fertilizantes"
    emptyMessage="Nenhum fertilizante disponível de momento."
  />
);

export default Fertilizantes;