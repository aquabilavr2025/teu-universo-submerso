import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  description?: string;
  category?: string;
  showWhatsAppButton?: boolean;
}

const ProductCard = ({ image, name, price, description, category, showWhatsAppButton = false }: ProductCardProps) => {
  const whatsappNumber = "351912345678"; // Replace with actual number
  const whatsappMessage = encodeURIComponent(`Olá! Gostaria de encomendar: ${name} (${price})`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <Card className="group overflow-hidden bg-card border border-border/40 rounded-2xl shadow-card hover:shadow-glow transition-smooth hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500"
        />
      </div>
      <CardContent className="p-6 space-y-3">
        {category && (
          <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
            {category}
          </span>
        )}
        <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-1 tracking-tight">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
        )}
        <div className="flex items-center justify-between pt-2">
          <p className="font-body text-xl font-semibold text-foreground">{price}</p>
          {showWhatsAppButton && (
            <Button 
              asChild 
              size="sm" 
              className="bg-[#25D366] hover:bg-[#20BD5A] text-primary-foreground gap-2"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Encomendar
              </a>
            </Button>
          )}
        </div>
        {showWhatsAppButton && (
          <p className="text-xs text-muted-foreground text-center pt-1">
            Atendimento personalizado via WhatsApp
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
