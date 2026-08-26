import CategoryPageTemplate from "@/components/catalog/CategoryPageTemplate";

const Iluminacao = () => (
  <CategoryPageTemplate
    sheet="Iluminação"
    title="Iluminação"
    subtitle={"• Iluminação profissional\n• Soluções para o teu aquário\n• Desempenho sem compromissos"}
    href="/iluminacao"
    emptyMessage="Nenhum produto de iluminação disponível de momento."
  />
);

export default Iluminacao;