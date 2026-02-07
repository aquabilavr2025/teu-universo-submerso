import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import Peixes from "./pages/Peixes";
import Plantas from "./pages/Plantas";
import Alimentacao from "./pages/Alimentacao";
import Condicionadores from "./pages/Condicionadores";
import Equipamentos from "./pages/Equipamentos";
import Substratos from "./pages/Substratos";
import TestesMedicamentos from "./pages/TestesMedicamentos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/peixes" element={<Peixes />} />
            <Route path="/plantas" element={<Plantas />} />
            <Route path="/alimentacao" element={<Alimentacao />} />
            <Route path="/condicionadores" element={<Condicionadores />} />
            <Route path="/equipamentos" element={<Equipamentos />} />
            <Route path="/substratos" element={<Substratos />} />
            <Route path="/testes-medicamentos" element={<TestesMedicamentos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
