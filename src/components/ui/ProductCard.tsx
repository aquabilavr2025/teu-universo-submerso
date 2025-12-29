import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  description?: string;
  category?: string;
  quantity?: number;
  showWhatsAppButton?: boolean;
}

const ProductCard = ({ image, name, price, description, category, quantity, showWhatsAppButton = false }: ProductCardProps) => {
  const whatsappNumber = "351912345678"; // Replace with actual number
  const whatsappMessage = encodeURIComponent(`Olá! Gostaria de encomendar: ${name} - Preço: ${price}`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <Card className="group overflow-hidden bg-card border border-border/40 rounded-2xl shadow-card hover:shadow-glow transition-smooth hover:-translate-y-1 h-full flex flex-col">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500"
          loading="lazy"
        />
      </div>
      <CardContent className="p-5 flex flex-col flex-1">
        {/* Category & Stock badges */}
        {(category || quantity !== undefined) && (
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {category && (
              <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                {category}
              </span>
            )}
            {quantity !== undefined && (
              <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {quantity > 0 ? `${quantity} em stock` : 'Esgotado'}
              </span>
            )}
          </div>
        )}
        
        {/* Product name */}
        <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2 tracking-tight mb-2">
          {name}
        </h3>
        
        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">{description}</p>
        )}
        
        {/* Spacer to push price/button to bottom */}
        <div className="flex-1" />
        
        {/* Price and WhatsApp button */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <p className="font-body text-xl font-bold text-foreground">{price}</p>
          {showWhatsAppButton && (
            <Button 
              asChild 
              size="sm" 
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 rounded-full px-4"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Encomendar
              </a>
            </Button>
          )}
        </div>
        
        {showWhatsAppButton && (
          <p className="text-xs text-muted-foreground text-center pt-2">
            Atendimento personalizado via WhatsApp
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
