import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import waterCareImage from "@/assets/water-care.jpg";

const conditionersData = [
  { image: waterCareImage, name: "Condicionador de Água", price: "€9,99", category: "Condicionador", description: "Remove cloro e cloraminas da água" },
  { image: waterCareImage, name: "Bactérias Nitrificantes", price: "€12,00", category: "Bactérias", description: "Acelera o ciclo do azoto" },
  { image: waterCareImage, name: "Fertilizante Líquido", price: "€8,50", category: "Fertilizante", description: "Macro e micronutrientes para plantas" },
  { image: waterCareImage, name: "CO2 Líquido", price: "€7,00", category: "CO2", description: "Fonte de carbono para plantas" },
  { image: waterCareImage, name: "Anti-Algas", price: "€6,50", category: "Tratamento", description: "Combate algas indesejadas" },
  { image: waterCareImage, name: "Ferro Líquido", price: "€5,50", category: "Fertilizante", description: "Essencial para plantas vermelhas" },
  { image: waterCareImage, name: "Redutor de pH", price: "€6,00", category: "pH", description: "Baixa o pH de forma segura" },
  { image: waterCareImage, name: "Vitaminas para Peixes", price: "€8,00", category: "Suplemento", description: "Fortalece o sistema imunitário" },
  { image: waterCareImage, name: "Teste de Água 6 em 1", price: "€15,00", category: "Testes", description: "Mede pH, NO2, NO3, GH, KH, Cl" },
];

const Condicionadores = () => {
  return (
    <Layout>
      <PageHero
        title="Condicionadores e Fertilizantes"
        subtitle="Mantém a qualidade da água e nutre as tuas plantas com os nossos produtos especializados."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditionersData.map((item, index) => (
              <div key={`${item.name}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Condicionadores;
