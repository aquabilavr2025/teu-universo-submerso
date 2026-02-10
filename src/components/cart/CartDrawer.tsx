import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const CartDrawer = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isOpen,
    setIsOpen,
  } = useCart();

  const whatsappNumber = "351938589917";

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return "";

    const itemsList = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} - ${item.quantity}x - ${item.price}`
      )
      .join("\n");

    const message = `Olá AquaBila! Gostaria de encomendar os seguintes itens:\n\n${itemsList}\n\nTotal: ${totalPrice.toFixed(2)}€\n\nPor favor, confirmem a disponibilidade.`;

    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="flex flex-col p-0 w-full sm:max-w-md">
        <SheetHeader className="px-6 py-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <SheetTitle className="font-heading text-xl">
                Carrinho
              </SheetTitle>
              <SheetDescription className="text-sm">
                {totalItems === 0
                  ? "O seu carrinho está vazio"
                  : `${totalItems} ${totalItems === 1 ? "item" : "itens"}`}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-16 px-6">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">
              Adicione produtos ao carrinho para começar a sua encomenda
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-secondary/30 rounded-xl animate-fade-in"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-primary font-semibold mt-1">
                        {item.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border/50 px-6 py-4 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">
                  {totalPrice.toFixed(2)}€
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white h-12 rounded-full text-base font-medium gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Finalizar Encomenda via WhatsApp
              </Button>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="w-full text-muted-foreground hover:text-destructive mt-2"
              >
                Limpar Carrinho
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
