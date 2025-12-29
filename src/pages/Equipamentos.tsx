import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import equipmentImage from "@/assets/equipment.jpg";

const equipmentData = [
  { image: equipmentImage, name: "LED Aquarium Light 60cm", price: "€45,00", category: "Iluminação", description: "Espectro completo para plantas" },
  { image: equipmentImage, name: "Filtro Externo 1000L/h", price: "€89,00", category: "Filtragem", description: "Silencioso e eficiente" },
  { image: equipmentImage, name: "Aquecedor 100W", price: "€22,00", category: "Aquecimento", description: "Termostato ajustável" },
  { image: equipmentImage, name: "Bomba de Ar", price: "€15,00", category: "Oxigenação", description: "Silenciosa e potente" },
  { image: equipmentImage, name: "LED RGB 90cm", price: "€75,00", category: "Iluminação", description: "Cores personalizáveis via app" },
  { image: equipmentImage, name: "Filtro Interno 400L/h", price: "€25,00", category: "Filtragem", description: "Compacto e versátil" },
  { image: equipmentImage, name: "Sistema CO2 Completo", price: "€120,00", category: "CO2", description: "Garrafa, regulador e difusor" },
  { image: equipmentImage, name: "Termómetro Digital", price: "€8,00", category: "Acessórios", description: "Leitura precisa da temperatura" },
  { image: equipmentImage, name: "Timer Digital", price: "€12,00", category: "Acessórios", description: "Programação de iluminação" },
];

const Equipamentos = () => {
  return (
    <Layout>
      <PageHero
        title="Iluminação e Filtragem"
        subtitle="Equipamentos de qualidade profissional para o teu aquário funcionar na perfeição."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentData.map((item, index) => (
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

export default Equipamentos;
