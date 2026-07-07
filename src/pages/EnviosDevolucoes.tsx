import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const shippingHighlights = [
  {
    title: "Processamento",
    value: "[1 a 3 dias úteis]",
    description: "Prazo estimado para preparação da encomenda após confirmação do pagamento.",
  },
  {
    title: "Entrega",
    value: "[2 a 5 dias úteis]",
    description: "Prazo estimado após expedição, sujeito à transportadora e à morada de entrega.",
  },
  {
    title: "Portes",
    value: "Desde [€X,XX]",
    description: "O valor final dos portes é apresentado antes da confirmação da encomenda.",
  },
  {
    title: "Devoluções",
    value: "14 dias",
    description: "Prazo legal de livre resolução aplicável a consumidores, quando previsto na lei.",
  },
];

const shippingSections = [
  {
    title: "1. Zonas de entrega",
    items: [
      "Efetuamos entregas em [Portugal Continental / Açores / Madeira / União Europeia / outras zonas a indicar].",
      "Algumas zonas geográficas poderão estar sujeitas a prazos de entrega superiores, custos adicionais ou restrições logísticas.",
      "Caso não seja possível entregar na morada indicada, entraremos em contacto para encontrar uma solução adequada ou, se necessário, proceder ao cancelamento da encomenda.",
    ],
  },
  {
    title: "2. Processamento das encomendas",
    items: [
      "As encomendas são processadas após confirmação do pagamento e validação dos dados fornecidos pelo cliente.",
      "O prazo habitual de preparação é de [1 a 3 dias úteis], salvo indicação diferente na página do produto ou em períodos de elevado volume de encomendas.",
      "Encomendas realizadas aos fins de semana, feriados ou fora do horário de funcionamento serão processadas no dia útil seguinte.",
    ],
  },
  {
    title: "3. Métodos de envio",
    items: [
      "As entregas são realizadas através de transportadoras parceiras ou outros meios logísticos adequados à encomenda.",
      "Sempre que disponível, será enviado ao cliente um código ou ligação de acompanhamento da encomenda.",
      "A transportadora poderá contactar o cliente através dos dados fornecidos para facilitar a entrega.",
    ],
  },
  {
    title: "4. Custos de envio",
    items: [
      "Os custos de envio são calculados em função da morada de entrega, peso, volume, método de envio e valor da encomenda.",
      "O valor total dos portes será apresentado antes da conclusão da compra.",
      "Poderemos disponibilizar campanhas de portes gratuitos, sujeitas às condições indicadas no site.",
    ],
  },
  {
    title: "5. Prazos de entrega",
    items: [
      "Os prazos de entrega apresentados são estimativas e contam a partir da expedição da encomenda, não da data de compra.",
      "Podem ocorrer atrasos por motivos alheios à nossa responsabilidade, incluindo atrasos da transportadora, greves, condições meteorológicas, períodos festivos, erros na morada ou situações de força maior.",
      "Se a entrega sofrer um atraso significativo, o cliente poderá contactar-nos para obter informação atualizada sobre o estado da encomenda.",
    ],
  },
  {
    title: "6. Receção da encomenda",
    items: [
      "No momento da entrega, o cliente deve verificar se a embalagem apresenta sinais visíveis de dano, violação ou mau acondicionamento.",
      "Caso existam danos visíveis, recomendamos que sejam registados junto da transportadora e comunicados à nossa equipa o mais rapidamente possível.",
      "A comunicação deve incluir, sempre que possível, fotografias da embalagem, do produto e da etiqueta de transporte.",
    ],
  },
];

const returnSections = [
  {
    title: "7. Direito de livre resolução",
    items: [
      "Nos contratos celebrados à distância com consumidores, o cliente pode exercer o direito de livre resolução no prazo de 14 dias, sem necessidade de indicar motivo, quando tal direito seja aplicável.",
      "O prazo conta, em regra, a partir do dia em que o consumidor, ou um terceiro por si indicado que não seja a transportadora, adquire a posse física dos bens.",
      "Para exercer este direito, o cliente deve comunicar a sua decisão de forma inequívoca através dos contactos indicados nesta página.",
      "A comunicação pode ser feita por email, formulário de contacto ou outro meio que permita comprovar a data e o conteúdo do pedido.",
    ],
  },
  {
    title: "8. Condições para devolução",
    items: [
      "Os produtos devem ser devolvidos em bom estado de conservação, completos, com acessórios, manuais, etiquetas e, sempre que possível, na embalagem original.",
      "O cliente deve manusear os produtos apenas na medida necessária para verificar a sua natureza, características e funcionamento.",
      "Reservamo-nos o direito de avaliar o estado dos produtos devolvidos e, quando legalmente admissível, refletir uma eventual desvalorização resultante de manuseamento excessivo.",
    ],
  },
  {
    title: "9. Produtos excluídos de devolução",
    items: [
      "O direito de livre resolução poderá não se aplicar a produtos personalizados ou feitos de acordo com especificações do cliente.",
      "Poderá também não se aplicar a bens selados que, por motivos de proteção da saúde ou higiene, não sejam suscetíveis de devolução depois de abertos.",
      "Podem existir outras exceções previstas na lei, consoante a natureza do produto ou serviço adquirido.",
      "Quando uma exceção seja aplicável, essa informação deverá ser indicada de forma clara antes da conclusão da compra.",
    ],
  },
  {
    title: "10. Custos de devolução",
    items: [
      "Salvo indicação em contrário ou obrigação legal diferente, os custos diretos da devolução poderão ser suportados pelo cliente.",
      "Quando a devolução resulte de erro nosso, produto danificado, artigo incorreto ou falta de conformidade, os custos de devolução serão tratados de acordo com os direitos legais aplicáveis.",
      "Recomendamos que o cliente utilize um método de envio rastreável, pois a responsabilidade pelo transporte da devolução poderá depender do motivo da devolução e das condições aplicáveis.",
    ],
  },
  {
    title: "11. Reembolsos",
    items: [
      "Após receção e verificação dos produtos devolvidos, o reembolso será processado nos termos e prazos legalmente aplicáveis.",
      "O reembolso será efetuado, sempre que possível, através do mesmo meio de pagamento utilizado na compra, salvo acordo diferente com o cliente.",
      "Poderemos reter o reembolso até recebermos os bens devolvidos ou até que o cliente apresente prova do respetivo envio, quando legalmente permitido.",
      "Custos adicionais resultantes da escolha de um método de entrega mais caro do que o método normal disponibilizado poderão não ser reembolsáveis, nos termos legais aplicáveis.",
    ],
  },
  {
    title: "12. Trocas",
    items: [
      "As trocas estão sujeitas à disponibilidade de stock e às condições comerciais em vigor no momento do pedido.",
      "Quando a troca não seja possível, poderá ser proposto reembolso, vale ou outra solução, sem prejuízo dos direitos legais do consumidor.",
      "Produtos personalizados, usados de forma indevida, incompletos ou danificados por causa imputável ao cliente poderão não ser elegíveis para troca, salvo obrigação legal em contrário.",
    ],
  },
  {
    title: "13. Produtos danificados, incorretos ou com defeito",
    items: [
      "Se receber um produto danificado, incorreto ou com aparente falta de conformidade, contacte-nos o mais rapidamente possível.",
      "A comunicação deve incluir o número da encomenda, descrição do problema e fotografias ou vídeos que permitam avaliar a situação.",
      "Os produtos vendidos a consumidores beneficiam da garantia legal de conformidade prevista na legislação aplicável.",
      "Em caso de falta de conformidade, o consumidor poderá ter direito à reparação, substituição, redução proporcional do preço ou resolução do contrato, nos termos legalmente previstos.",
    ],
  },
  {
    title: "14. Reclamações e resolução de litígios",
    items: [
      "O cliente pode apresentar reclamação através dos nossos contactos ou do Livro de Reclamações Eletrónico.",
      "Em caso de litígio de consumo, o consumidor poderá recorrer a uma Entidade de Resolução Alternativa de Litígios de Consumo competente.",
      "A informação sobre Entidades de Resolução Alternativa de Litígios de Consumo encontra-se disponível junto da Direção-Geral do Consumidor.",
    ],
  },
];

const returnSteps = [
  {
    title: "1. Contacte-nos",
    description: "Envie um pedido para [EMAIL DE CONTACTO] com o número da encomenda.",
  },
  {
    title: "2. Aguarde confirmação",
    description: "A nossa equipa irá confirmar as instruções de devolução e a morada de envio.",
  },
  {
    title: "3. Envie o produto",
    description: "Acondicione o produto de forma segura e utilize, sempre que possível, envio rastreável.",
  },
  {
    title: "4. Receba o reembolso ou troca",
    description: "Após verificação, processaremos o reembolso, troca ou outra solução aplicável.",
  },
];

const usefulLinks = [
  {
    label: "Termos Legais",
    href: "/termos-legais",
    description: "Condições gerais de utilização do site e compras.",
  },
  {
    label: "Política de Privacidade",
    href: "/politica-privacidade",
    description: "Informação sobre tratamento de dados pessoais.",
  },
  {
    label: "Livro de Reclamações Eletrónico",
    href: "https://www.livroreclamacoes.pt/inicio",
    description: "Apresentação de reclamações por via eletrónica.",
  },
  {
    label: "Entidades RAL — Direção-Geral do Consumidor",
    href: "https://www.consumidor.gov.pt/ral-mapa-e-lista-de-entidades",
    description: "Lista de entidades de resolução alternativa de litígios.",
  },
];

const EnvioDevolucoes = () => {
  return (
    <Layout>
      <div className="bg-background">
        <PageHero
          title="Envios e Devoluções"
          subtitle="Informação sobre processamento de encomendas, entregas, trocas, devoluções, reembolsos e direitos do consumidor."
        />

        <section className="container mx-auto px-4 py-16 md:py-20">
          <Card className="mb-8 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent shadow-soft">
            <CardContent className="p-8 md:p-10">
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                Última atualização: julho de 2026
              </p>

              <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground">
                Política de envios, trocas e devoluções
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
                Nesta página encontra informação sobre os métodos de envio, prazos de entrega,
                custos, condições de devolução, direito de livre resolução, reembolsos e garantias
                aplicáveis às encomendas realizadas neste site.
              </p>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
                Antes de publicar, substitua os campos entre parênteses retos pelos dados reais da
                sua loja e confirme se existem regras específicas aplicáveis aos produtos que vende.
              </p>
            </CardContent>
          </Card>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {shippingHighlights.map((item) => (
              <Card key={item.title} className="border-border/60 shadow-soft">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                  <p className="mt-2 font-heading text-2xl font-semibold text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {shippingSections.map((section) => (
              <Card key={section.title} className="border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-foreground">
                    {section.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent shadow-soft">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-foreground">
                Como pedir uma devolução
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {returnSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-xl border border-border/60 bg-background/70 p-5"
                  >
                    <p className="font-heading text-base font-semibold text-foreground">
                      {step.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {returnSections.map((section) => (
              <Card key={section.title} className="border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-foreground">
                    {section.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 border-border/60 shadow-soft">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-foreground">
                Contactos para envios e devoluções
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border/60 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    [EMAIL DE CONTACTO]
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Morada para devoluções
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    [MORADA COMPLETA PARA DEVOLUÇÕES]
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Horário de apoio
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    [DIAS E HORÁRIO DE ATENDIMENTO]
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Prazo médio de resposta
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    [24 a 48 horas úteis]
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 border-border/60 shadow-soft">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-foreground">
                Documentos e ligações úteis
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {usefulLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="rounded-xl border border-border/60 p-5 transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    <p className="font-heading text-base font-semibold text-foreground">
                      {link.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {link.description}
                    </p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent shadow-soft">
            <CardContent className="p-8 md:p-10">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                Nota importante
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
                Esta política tem caráter informativo e deve ser adaptada à realidade da loja,
                incluindo tipos de produtos vendidos, transportadoras utilizadas, zonas de entrega,
                custos, prazos, métodos de pagamento e eventuais exceções legais aplicáveis.
                Esta informação não substitui aconselhamento jurídico individualizado.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default EnvioDevolucoes;