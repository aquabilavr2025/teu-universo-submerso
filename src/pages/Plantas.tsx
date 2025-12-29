import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import plantsImage from "@/assets/plants.jpg";

const plantsData = [
  { image: plantsImage, name: "Rotala Rotundifolia", price: "€3,50", category: "Hastes", description: "Planta de crescimento rápido, cor verde a vermelha" },
  { image: plantsImage, name: "Anubias Nana", price: "€6,00", category: "Epífita", description: "Resistente e fácil de manter" },
  { image: plantsImage, name: "Cryptocoryne Wendtii", price: "€4,50", category: "Roseta", description: "Folhas onduladas castanhas ou verdes" },
  { image: plantsImage, name: "Monte Carlo", price: "€5,00", category: "Tapete", description: "Perfeita para carpete verde" },
  { image: plantsImage, name: "Bucephalandra", price: "€8,00", category: "Epífita", description: "Folhas decorativas e únicas" },
  { image: plantsImage, name: "Vallisneria", price: "€2,50", category: "Fundo", description: "Folhas longas para o fundo do aquário" },
  { image: plantsImage, name: "Java Moss", price: "€4,00", category: "Musgo", description: "Versátil e fácil de cultivar" },
  { image: plantsImage, name: "Ludwigia Palustris", price: "€3,50", category: "Hastes", description: "Cores vermelhas intensas" },
  { image: plantsImage, name: "Echinodorus", price: "€7,00", category: "Roseta", description: "Planta imponente para aquários grandes" },
];

const Plantas = () => {
  return (
    <Layout>
      <PageHero
        title="Plantas Aquáticas"
        subtitle="Transforma o teu aquário num jardim subaquático com as nossas plantas naturais."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plantsData.map((plant, index) => (
              <div key={`${plant.name}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <ProductCard {...plant} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Plantas;
