import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";

// Fish inventory data - easily expandable by adding new rows
// Format: { image: "URL", name: "Fish Name", quantity: number, price: "X,XX€" }
const fishInventory = [
  {
    image: "https://drive.google.com/thumbnail?id=1XnPCLqgPYPQmZJIlasXAM87kaU2_xgBP&sz=w800",
    name: "Tetra Neon",
    quantity: 50,
    price: "1,10€",
    category: "Cardume",
    description: "Peixe vibrante ideal para aquários comunitários"
  },
  // Add more fish entries below following this format:
  // { image: "https://drive.google.com/thumbnail?id=FILE_ID&sz=w800", name: "Nome", quantity: X, price: "X,XX€", category: "Categoria", description: "Descrição" },
];

// Helper function to convert Google Drive share links to thumbnail URLs
// Usage: convertDriveLink("https://drive.google.com/file/d/FILE_ID/view?usp=drive_link")
// Returns: "https://drive.google.com/thumbnail?id=FILE_ID&sz=w800"
export const convertDriveLink = (driveLink: string): string => {
  const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
  }
  return driveLink;
};

const Peixes = () => {
  return (
    <Layout>
      <PageHero
        title="Peixes"
        subtitle="Descobre a nossa coleção de espécies tropicais e de água fria. Qualidade e saúde garantidas."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {fishInventory.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhum peixe disponível de momento.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {fishInventory.map((fish, index) => (
                <div key={`${fish.name}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <ProductCard 
                    image={fish.image}
                    name={fish.name}
                    price={fish.price}
                    category={fish.category}
                    description={fish.description}
                    quantity={fish.quantity}
                    showWhatsAppButton 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Peixes;
