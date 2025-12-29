import { Link } from "react-router-dom";
import { ArrowRight, Fish, Leaf, Droplets, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ui/ProductCard";
import heroImage from "@/assets/hero-aquarium.jpg";
import fishBetta from "@/assets/fish-betta.jpg";
import fishNeon from "@/assets/fish-neon.jpg";
import fishDiscus from "@/assets/fish-discus.jpg";
import plantsImage from "@/assets/plants.jpg";
import foodImage from "@/assets/food.jpg";
import equipmentImage from "@/assets/equipment.jpg";

const Index = () => {
  const featuredFish = [
    { image: fishBetta, name: "Betta Splendens", price: "€8,99", category: "Tropical" },
    { image: fishNeon, name: "Neon Tetra", price: "€1,50", category: "Cardume" },
    { image: fishDiscus, name: "Discus", price: "€45,00", category: "Premium" },
  ];

  const categories = [
    { icon: Fish, title: "Peixes", description: "Espécies tropicais e de água fria", href: "/peixes" },
    { icon: Leaf, title: "Plantas", description: "Plantas aquáticas naturais", href: "/plantas" },
    { icon: Droplets, title: "Condicionadores", description: "Tratamento de água", href: "/condicionadores" },
    { icon: Zap, title: "Equipamentos", description: "Iluminação e filtragem", href: "/equipamentos" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Aquário tropical"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/95 via-ocean-deep/70 to-transparent" />
        </div>

        {/* Animated bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-primary-foreground/20 rounded-full animate-bubble"
              style={{
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${5 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-teal/20 text-teal rounded-full text-sm font-medium mb-6 animate-fade-in">
              Bem-vindo à nossa loja
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              O teu universo
              <span className="block text-teal">submerso</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Descobre a magia do mundo aquático. Oferecemos tudo o que precisas para criar e manter o aquário dos teus sonhos - desde peixes exóticos a plantas vibrantes e equipamentos de qualidade.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild variant="hero" size="xl">
                <Link to="/peixes">
                  Explorar Peixes
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/plantas">Ver Plantas</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 gradient-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Descobre as Nossas Categorias
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Temos tudo o que precisas para o teu hobby de aquariofilia
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.title}
                to={category.href}
                className="group p-6 bg-card rounded-2xl shadow-card hover:shadow-glow transition-smooth hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-ocean flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce">
                  <category.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fish Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Peixes em Destaque
              </h2>
              <p className="font-body text-muted-foreground max-w-xl">
                As espécies mais procuradas pelos nossos clientes
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/peixes">
                Ver Todos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFish.map((fish, index) => (
              <div key={fish.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard {...fish} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 gradient-surface overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={plantsImage}
                alt="Plantas aquáticas"
                className="rounded-2xl shadow-card w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 gradient-ocean rounded-2xl shadow-glow animate-float hidden md:block" />
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-6">
                Sobre Nós
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Paixão pelo Mundo Aquático
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Desde 2010 que partilhamos a nossa paixão pela aquariofilia. A nossa missão é proporcionar aos entusiastas todos os recursos necessários para criar ecossistemas aquáticos saudáveis e deslumbrantes.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Contamos com uma equipa especializada que te ajudará a escolher as melhores espécies, plantas e equipamentos para o teu projeto. Visita-nos e descobre um mundo de possibilidades!
              </p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="font-heading text-4xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Espécies de Peixes</p>
                </div>
                <div>
                  <p className="font-heading text-4xl font-bold text-primary">200+</p>
                  <p className="text-sm text-muted-foreground">Plantas Aquáticas</p>
                </div>
                <div>
                  <p className="font-heading text-4xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">Anos de Experiência</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo Para o Teu Aquário
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Desde alimentação premium a equipamentos de última geração
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/alimentacao" className="group relative h-64 rounded-2xl overflow-hidden shadow-card">
              <img src={foodImage} alt="Alimentação" className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-2">Alimentação</h3>
                <p className="text-primary-foreground/80 text-sm">Flocos, pellets e alimentos congelados</p>
              </div>
            </Link>
            <Link to="/equipamentos" className="group relative h-64 rounded-2xl overflow-hidden shadow-card">
              <img src={equipmentImage} alt="Equipamentos" className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-2">Equipamentos</h3>
                <p className="text-primary-foreground/80 text-sm">Iluminação LED e sistemas de filtragem</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
