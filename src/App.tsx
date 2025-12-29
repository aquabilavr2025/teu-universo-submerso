import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Peixes from "./pages/Peixes";
import Plantas from "./pages/Plantas";
import Alimentacao from "./pages/Alimentacao";
import Condicionadores from "./pages/Condicionadores";
import Equipamentos from "./pages/Equipamentos";
import Substratos from "./pages/Substratos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/peixes" element={<Peixes />} />
          <Route path="/plantas" element={<Plantas />} />
          <Route path="/alimentacao" element={<Alimentacao />} />
          <Route path="/condicionadores" element={<Condicionadores />} />
          <Route path="/equipamentos" element={<Equipamentos />} />
          <Route path="/substratos" element={<Substratos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
