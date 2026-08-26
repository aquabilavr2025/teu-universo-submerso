import CategoryPageTemplate from "@/components/catalog/CategoryPageTemplate";

const TestesMedicamentos = () => (
  <CategoryPageTemplate
    sheet="Testes/Medicamentos"
    title="Testes/Medicamentos"
    subtitle={"• Kits de teste rigorosos\n• Medicamentos especializados\n• Monitorize a saúde aquática"}
    href="/testes-medicamentos"
    emptyMessage="Nenhum teste ou medicamento disponível de momento."
  />
);

export default TestesMedicamentos;
