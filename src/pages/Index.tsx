import { Link } from "react-router-dom";
import { ArrowRight, Fish, Leaf, Droplets, Zap, UtensilsCrossed, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import FeaturedFishCarousel from "@/components/home/FeaturedFishCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";
import { useHomepageImages } from "@/hooks/useHomepageImages";

// Fallback images (used while loading or if sheet fails)
import heroImageFallback from "@/assets/hero-aquarium.jpg";
import fishBettaFallback from "@/assets/fish-betta.jpg";
import plantsImageFallback from "@/assets/plants.jpg";
import foodImageFallback from "@/assets/food.jpg";
import equipmentImageFallback from "@/assets/equipment.jpg";
import waterCareImageFallback from "@/assets/water-care.jpg";
import substrateImageFallback from "@/assets/substrate.jpg";

const Index = () => {
  const { data: fishData, isLoading: isFishLoading } = useGoogleSheet("peixes");
  const { data: homepageImages, isLoading: isImagesLoading } = useHomepageImages();

  // Use dynamic images with fallbacks
  const heroImage = homepageImages?.hero || heroImageFallback;
  const fishImage = homepageImages?.fish || fishBettaFallback;
  const plantsImage = homepageImages?.plants || plantsImageFallback;
  const foodImage = homepageImages?.food || foodImageFallback;
  const equipmentImage = homepageImages?.equipment || equipmentImageFallback;
  const conditionersImage = homepageImages?.conditioners || waterCareImageFallback;
  const substrateImage = homepageImages?.substrates || substrateImageFallback;
  const aboutImage = homepageImages?.about || plantsImageFallback;

  const categories = [
    { icon: Fish, title: "Peixes", description: "Espécies tropicais e de água fria", href: "/peixes", image: fishImage },
    { icon: Leaf, title: "Plantas", description: "Plantas aquáticas naturais", href: "/plantas", image: plantsImage },
    { icon: UtensilsCrossed, title: "Alimentação", description: "Flocos, pellets e congelados", href: "/alimentacao", image: foodImage },
    { icon: Droplets, title: "Condicionadores", description: "Tratamento e fertilizantes", href: "/condicionadores", image: conditionersImage },
    { icon: Zap, title: "Equipamentos", description: "Iluminação e filtragem", href: "/equipamentos", image: equipmentImage },
    { icon: Layers, title: "Substratos", description: "Férteis e inertes", href: "/substratos", image: substrateImage },
  ];

  return (
    <Layout>
      {/* Hero Section - Apple-inspired clean design */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
        {/* Background Image with subtle overlay */}
        <div className="absolute inset-0">
          {isImagesLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <img
              src={heroImage}
              alt="Aquário tropical"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl py-20">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8 animate-fade-in tracking-wide">
              Bem-vindo à AquaBila
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-8 animate-fade-in tracking-tight leading-tight" style={{ animationDelay: "0.1s" }}>
              O teu universo
              <span className="block text-primary">submerso</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Na AquaBila, encontras peixes ornamentais únicos, plantas naturais vibrantes e tudo o que precisas para criar um aquário cheio de vida e cor. Oferecemos qualidade, variedade e aconselhamento especializado para que o teu aquário seja um verdadeiro espetáculo da natureza!
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="xl" className="rounded-full px-8">
                <Link to="/peixes">
                  Explorar Peixes
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full px-8">
                <Link to="/plantas">Ver Plantas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - All 6 categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              Descobre as Nossas Categorias
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
              Tudo o que precisas para o teu hobby de aquariofilia
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.title}
                to={category.href}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {isImagesLoading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/90 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-primary-foreground tracking-tight">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-sm text-primary-foreground/80">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fish Section - Dynamic from Google Sheets */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
                Peixes em Destaque
              </h2>
              <p className="font-body text-muted-foreground max-w-xl text-lg">
                As espécies mais procuradas pelos nossos clientes
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/peixes">
                Ver Todos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <FeaturedFishCarousel fish={fishData || []} isLoading={isFishLoading} />
        </div>
      </section>

      {/* About Section - Clean and minimal */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {isImagesLoading ? (
                <Skeleton className="rounded-3xl w-full h-80" />
              ) : (
                <img
                  src={aboutImage}
                  alt="Mundo aquático"
                  className="rounded-3xl shadow-card w-full"
                />
              )}
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-8">
                Sobre a AquaBila
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-8 tracking-tight">
                Paixão pelo Mundo Aquático
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6 text-lg">
                Desde 2010 que partilhamos a nossa paixão pela aquariofilia. A nossa missão é proporcionar aos entusiastas todos os recursos necessários para criar ecossistemas aquáticos saudáveis e deslumbrantes.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-10 text-lg">
                Contamos com uma equipa especializada que te ajudará a escolher as melhores espécies, plantas e equipamentos para o teu projeto.
              </p>
              <div className="flex flex-wrap gap-12">
                <div>
                  <p className="font-heading text-4xl font-semibold text-foreground tracking-tight">500+</p>
                  <p className="text-sm text-muted-foreground mt-1">Espécies de Peixes</p>
                </div>
                <div>
                  <p className="font-heading text-4xl font-semibold text-foreground tracking-tight">200+</p>
                  <p className="text-sm text-muted-foreground mt-1">Plantas Aquáticas</p>
                </div>
                <div>
                  <p className="font-heading text-4xl font-semibold text-foreground tracking-tight">15+</p>
                  <p className="text-sm text-muted-foreground mt-1">Anos de Experiência</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              Tudo Para o Teu Aquário
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
              Desde alimentação premium a equipamentos de última geração
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/alimentacao" className="group relative h-72 rounded-3xl overflow-hidden shadow-card">
              {isImagesLoading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <img src={foodImage} alt="Alimentação" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-heading text-2xl font-semibold text-primary-foreground mb-2 tracking-tight">Alimentação</h3>
                <p className="text-primary-foreground/80">Flocos, pellets e alimentos congelados</p>
              </div>
            </Link>
            <Link to="/equipamentos" className="group relative h-72 rounded-3xl overflow-hidden shadow-card">
              {isImagesLoading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <img src={equipmentImage} alt="Equipamentos" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-heading text-2xl font-semibold text-primary-foreground mb-2 tracking-tight">Equipamentos</h3>
                <p className="text-primary-foreground/80">Iluminação LED e sistemas de filtragem</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
