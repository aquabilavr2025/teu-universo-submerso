import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import fishBetta from "@/assets/fish-betta.jpg";
import fishNeon from "@/assets/fish-neon.jpg";
import fishDiscus from "@/assets/fish-discus.jpg";

const fishData = [
  { image: fishBetta, name: "Betta Splendens", price: "€8,99", category: "Tropical", description: "Peixe majestoso com barbatanas elegantes" },
  { image: fishNeon, name: "Neon Tetra", price: "€1,50", category: "Cardume", description: "Colorido e ideal para aquários comunitários" },
  { image: fishDiscus, name: "Discus", price: "€45,00", category: "Premium", description: "O rei dos aquários plantados" },
  { image: fishBetta, name: "Guppy", price: "€2,50", category: "Tropical", description: "Colorido e fácil de manter" },
  { image: fishNeon, name: "Cardinal Tetra", price: "€2,00", category: "Cardume", description: "Cores vibrantes em cardume" },
  { image: fishDiscus, name: "Ramirezi", price: "€12,00", category: "Ciclídeo", description: "Pequeno ciclídeo sul-americano" },
  { image: fishBetta, name: "Corydoras", price: "€4,50", category: "Fundo", description: "Limpador de fundo pacífico" },
  { image: fishNeon, name: "Platy", price: "€2,00", category: "Vivíparo", description: "Resistente e colorido" },
  { image: fishDiscus, name: "Otocinclus", price: "€3,50", category: "Fundo", description: "Especialista em algas" },
];

const Peixes = () => {
  return (
    <Layout>
      <PageHero
        title="Peixes"
        subtitle="Descobre a nossa coleção de espécies tropicais e de água fria. Qualidade e saúde garantidas."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fishData.map((fish, index) => (
              <div key={`${fish.name}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <ProductCard {...fish} showWhatsAppButton />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Peixes;
