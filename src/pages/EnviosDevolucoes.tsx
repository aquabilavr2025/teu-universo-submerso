import Layout from "@/components/layout/Layout";
import { Construction } from "lucide-react";

const EnvioDevolucoes = () => {
  return (
    <Layout>
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
        <section className="w-full max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Construction className="h-10 w-10 text-primary" />
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Brevemente disponível
          </p>

          <h1 className="mt-3 font-heading text-4xl font-semibold text-foreground md:text-5xl">
            Página em construção
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
            Estamos a preparar toda a informação sobre envios, trocas e
            devoluções. Esta página estará disponível em breve.
          </p>

          <a
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Voltar ao início
          </a>
        </section>
      </main>
    </Layout>
  );
};

export default EnvioDevolucoes;