import CategoryPageTemplate from "@/components/catalog/CategoryPageTemplate";

const Equipamentos = () => (
  <CategoryPageTemplate
    sheet="filtragem e iluminação"
    title="Iluminação e Filtragem"
    subtitle={"• Iluminação profissional\n• Sistemas de filtragem eficientes\n• Desempenho sem compromissos"}
    href="/equipamentos"
    emptyMessage="Nenhum equipamento disponível de momento."
  />
);

export default Equipamentos;
