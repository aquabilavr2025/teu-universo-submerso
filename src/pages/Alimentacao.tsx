import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import foodImage from "@/assets/food.jpg";

const foodData = [
  { image: foodImage, name: "Flocos Tropicais", price: "€5,99", category: "Flocos", description: "Alimentação equilibrada para peixes tropicais" },
  { image: foodImage, name: "Pellets Premium", price: "€8,50", category: "Pellets", description: "Rico em proteínas e vitaminas" },
  { image: foodImage, name: "Artémia Congelada", price: "€4,00", category: "Congelado", description: "Alimento vivo congelado nutritivo" },
  { image: foodImage, name: "Bloodworms", price: "€3,50", category: "Congelado", description: "Larvas de mosquito congeladas" },
  { image: foodImage, name: "Spirulina Tablets", price: "€6,00", category: "Tabletes", description: "Rico em algas para herbívoros" },
  { image: foodImage, name: "Comida para Betta", price: "€4,50", category: "Especializado", description: "Formulação específica para Bettas" },
  { image: foodImage, name: "Comida para Corydoras", price: "€5,00", category: "Fundo", description: "Tabletes que afundam rapidamente" },
  { image: foodImage, name: "Daphnia Congelada", price: "€3,50", category: "Congelado", description: "Pulgas de água nutritivas" },
  { image: foodImage, name: "Granulado Ciclídeos", price: "€7,00", category: "Pellets", description: "Para ciclídeos africanos e sul-americanos" },
];

const Alimentacao = () => {
  return (
    <Layout>
      <PageHero
        title="Alimentação"
        subtitle="Nutrição de qualidade para manter os teus peixes saudáveis e vibrantes."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodData.map((food, index) => (
              <div key={`${food.name}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <ProductCard {...food} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Alimentacao;
