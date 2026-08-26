import CategoryPageTemplate from "@/components/catalog/CategoryPageTemplate";

const Alimentacao = () => (
  <CategoryPageTemplate
    sheet="alimentação"
    title="Alimentação"
    subtitle="Nutrição de qualidade para manter os teus peixes saudáveis e vibrantes."
    href="/alimentacao"
    emptyMessage="Nenhum alimento disponível de momento."
  />
);

export default Alimentacao;
