import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

import Index from "./pages/Index";
import Peixes from "./pages/Peixes";
import Plantas from "./pages/Plantas";
import Alimentacao from "./pages/Alimentacao";
import Condicionadores from "./pages/Condicionadores";
import Equipamentos from "./pages/Equipamentos";
import Substratos from "./pages/Substratos";
import TestesMedicamentos from "./pages/TestesMedicamentos";
import Aquarios from "./pages/Aquarios";
import Aquecimento from "./pages/Aquecimento";
import Acessorios from "./pages/Acessorios";
import Co2 from "./pages/Co2";
import AlimentacaoCongelada from "./pages/AlimentacaoCongelada";
import TroncosRochas from "./pages/TroncosRochas";
import Produto from "./pages/Produto";
import TermosLegais from "./pages/TermosLegais";
import EnviosDevolucoes from "./pages/EnviosDevolucoes";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import { GENERIC_CATEGORIES } from "@/config/categories";


const queryClient = new QueryClient();

const AppShell = () => {
  return (
    <>
      <CartDrawer />

      <Outlet />

      <ScrollRestoration />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "peixes",
        element: <Peixes />,
      },
      {
        path: "plantas",
        element: <Plantas />,
      },
      {
        path: "alimentacao",
        element: <Alimentacao />,
      },
      {
        path: "condicionadores",
        element: <Condicionadores />,
      },
      {
        path: "equipamentos",
        element: <Equipamentos />,
      },
      {
        path: "substratos",
        element: <Substratos />,
      },
      {
        path: "testes-medicamentos",
        element: <TestesMedicamentos />,
      },
      {
        path: "aquarios",
        element: <Aquarios />,
      },
      {
        path: "aquecimento",
        element: <Aquecimento />,
      },
      {
        path: "acessorios",
        element: <Acessorios />,
      },
      {
        path: "co2",
        element: <Co2 />,
      },
      {
        path: "alimentacao-congelada",
        element: <AlimentacaoCongelada />,
      },
      {
        path: "troncos-rochas",
        element: <TroncosRochas />,
      },
      ...GENERIC_CATEGORIES.map((category) => ({
        path: category.slug,
        element: <CategoryPage category={category} />,
      })),
      {
        path: "produto",
        element: <Produto />,
      },

      {
        path: "termos-legais",
        element: <TermosLegais />,
      },
      {
        path: "envios-devolucoes",
        element: <EnviosDevolucoes />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />

          <RouterProvider router={router} />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;