import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import substrateImage from "@/assets/substrate.jpg";

const substratesData = [
  { image: substrateImage, name: "ADA Amazonia", price: "€35,00", category: "Fértil", description: "Substrato nutritivo japonês premium" },
  { image: substrateImage, name: "Areia de Sílica", price: "€8,00", category: "Inerte", description: "Areia fina natural para aquários" },
  { image: substrateImage, name: "Basalto Negro", price: "€12,00", category: "Inerte", description: "Cascalho negro decorativo" },
  { image: substrateImage, name: "Substrato Fértil Nacional", price: "€18,00", category: "Fértil", description: "Rico em nutrientes essenciais" },
  { image: substrateImage, name: "Cascalho Natural", price: "€6,00", category: "Inerte", description: "Pedras roladas de rio" },
  { image: substrateImage, name: "Lava Rocks", price: "€10,00", category: "Decorativo", description: "Pedras de lava porosas" },
  { image: substrateImage, name: "Power Sand", price: "€28,00", category: "Base", description: "Camada base para substratos férteis" },
  { image: substrateImage, name: "Areia Branca", price: "€7,00", category: "Inerte", description: "Areia decorativa clara" },
  { image: substrateImage, name: "Soil Completo", price: "€22,00", category: "Fértil", description: "Substrato ativo para plantas" },
];

const Substratos = () => {
  return (
    <Layout>
      <PageHero
        title="Substratos"
        subtitle="A base perfeita para um aquário saudável. Substratos férteis e inertes de qualidade."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {substratesData.map((item, index) => (
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

export default Substratos;
