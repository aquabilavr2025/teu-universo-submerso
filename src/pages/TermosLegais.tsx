import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const companyInfo = [
  {
    label: "Entidade responsável",
    value: "Marta Balsa - AquaBila",
  },
  {
    label: "NIF / NIPC",
    value: "245248110",
  },
  {
    label: "Sede / Morada",
    value: "Largo do Souto Nº51 5000-747 Torgueda-Vila Real",
  },
  {
    label: "Email",
    value: "aquabilavr2025@gmail.com",
  },
  {
    label: "Telefone",
    value: "+351 938 589 917",
  },
];

const legalSections = [
  {
    title: "1. Identificação e âmbito",
    items: [
      "A presente página estabelece os termos legais aplicáveis à utilização deste site e, quando aplicável, à compra de produtos ou serviços disponibilizados através do mesmo.",
      "O site é explorado pela entidade identificada nesta página, que atua como responsável pela informação disponibilizada e, quando aplicável, como vendedora dos produtos apresentados.",
      "Ao navegar neste site ou ao realizar uma encomenda, o utilizador declara ter lido, compreendido e aceite os presentes termos, sem prejuízo dos direitos legais que lhe assistem enquanto consumidor.",
    ],
  },
  {
    title: "2. Utilização do site",
    items: [
      "O utilizador compromete-se a utilizar o site de forma lícita, responsável e conforme a boa-fé, abstendo-se de praticar atos que possam danificar, inutilizar, sobrecarregar ou comprometer o funcionamento do site.",
      "É proibida a utilização do site para fins ilícitos, fraudulentos, abusivos ou que violem direitos de terceiros, incluindo direitos de propriedade intelectual, privacidade ou proteção de dados.",
      "Reservamo-nos o direito de suspender ou limitar o acesso ao site sempre que sejam detetadas utilizações abusivas, tentativas de intrusão, fraude ou violação destes termos.",
    ],
  },
  {
    title: "3. Informação sobre produtos, preços e disponibilidade",
    items: [
      "Fazemos todos os esforços razoáveis para apresentar informação correta, clara e atualizada sobre os produtos, incluindo características essenciais, preços, disponibilidade, custos de entrega e meios de pagamento aceites.",
      "Os preços apresentados, salvo indicação em contrário, incluem IVA à taxa legal em vigor.",
      "A disponibilidade dos produtos pode variar e a apresentação de um produto no site não constitui garantia de stock permanente.",
      "Em caso de erro manifesto no preço, descrição, disponibilidade ou informação essencial do produto, o cliente será informado logo que possível e poderá confirmar a encomenda corrigida ou solicitar o respetivo cancelamento.",
    ],
  },
  {
    title: "4. Encomendas, pagamento e confirmação",
    items: [
      "A encomenda apenas se considera aceite após confirmação expressa e validação do pagamento, quando aplicável.",
      "Antes da conclusão da encomenda, o cliente deverá confirmar os dados introduzidos, os produtos selecionados, o preço total, os custos de entrega e o meio de pagamento escolhido.",
      "Após a realização da encomenda, será enviada uma confirmação para o contacto indicado pelo cliente, em suporte duradouro, sempre que aplicável.",
      "Reservamo-nos o direito de recusar ou cancelar encomendas em caso de indisponibilidade, suspeita de fraude, erro manifesto ou incumprimento destes termos.",
    ],
  },
  {
    title: "5. Entregas",
    items: [
      "As condições de entrega, prazos estimados, zonas abrangidas, eventuais restrições geográficas e custos de envio serão indicados antes da conclusão da encomenda.",
      "Os prazos de entrega são estimativas e podem variar por motivos alheios à nossa vontade, incluindo atrasos dos transportadores, períodos de maior volume de encomendas ou causas de força maior.",
      "O cliente deve verificar a encomenda no momento da receção e comunicar qualquer dano, falta ou desconformidade através dos contactos indicados nesta página.",
    ],
  },
  {
    title: "6. Direito de livre resolução",
    items: [
      "Quando aplicável a contratos celebrados à distância com consumidores, o cliente dispõe de 14 dias para resolver o contrato, sem necessidade de indicar motivo, contados nos termos legalmente previstos.",
      "Para exercer este direito, o cliente deverá comunicar a sua decisão de forma inequívoca, através de email, formulário próprio ou outro meio suscetível de prova.",
      "Após comunicar a resolução, o cliente deverá devolver os bens dentro do prazo legal aplicável, em condições adequadas de conservação e, sempre que possível, na embalagem original.",
      "Salvo indicação em contrário ou imposição legal diferente, os custos diretos da devolução poderão ser suportados pelo cliente, desde que tal informação tenha sido prestada antes da compra.",
      "O reembolso será efetuado nos termos e prazos legalmente aplicáveis, podendo ficar dependente da receção dos bens devolvidos ou da apresentação de prova de envio.",
      "O direito de livre resolução poderá não se aplicar em situações legalmente excluídas, nomeadamente produtos personalizados, bens selados não suscetíveis de devolução por motivos de proteção da saúde ou higiene quando abertos após a entrega, ou outros casos previstos na lei.",
    ],
  },
  {
    title: "7. Garantia legal e conformidade",
    items: [
      "Os produtos vendidos a consumidores beneficiam da garantia legal de conformidade prevista na legislação portuguesa e europeia aplicável.",
      "Em caso de falta de conformidade, o consumidor poderá ter direito à reposição da conformidade do bem, através de reparação ou substituição, redução proporcional do preço ou resolução do contrato, nos termos legalmente previstos.",
      "A garantia legal não prejudica eventuais garantias comerciais adicionais que possam ser concedidas pelo fabricante ou pela nossa empresa.",
      "Para acionar a garantia, o cliente deverá contactar-nos através dos meios indicados nesta página, descrevendo a situação e juntando, sempre que possível, comprovativo de compra e fotografias ou outros elementos relevantes.",
    ],
  },
  {
    title: "8. Trocas, devoluções e reembolsos comerciais",
    items: [
      "Para além dos direitos legais do consumidor, poderemos disponibilizar condições comerciais de troca ou devolução mais favoráveis, quando expressamente indicadas no site ou na documentação da encomenda.",
      "As trocas e devoluções comerciais podem estar sujeitas a verificação do estado do produto, embalagem, acessórios e comprovativo de compra.",
      "As condições comerciais voluntárias nunca limitam nem substituem os direitos legais do consumidor.",
    ],
  },
  {
    title: "9. Proteção de dados pessoais",
    items: [
      "Os dados pessoais recolhidos através do site serão tratados nos termos do Regulamento Geral sobre a Proteção de Dados e da legislação nacional aplicável.",
      "Os dados poderão ser tratados para gestão de contactos, processamento de encomendas, faturação, entregas, apoio ao cliente, cumprimento de obrigações legais e, quando exista consentimento válido, comunicações de marketing.",
      "O titular dos dados poderá exercer os seus direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade, nos termos legalmente aplicáveis.",
      "Para mais informação sobre o tratamento de dados pessoais, consulte a nossa Política de Privacidade.",
    ],
  },
  {
    title: "10. Cookies e tecnologias semelhantes",
    items: [
      "O site poderá utilizar cookies técnicos necessários ao seu funcionamento e, mediante consentimento quando exigido, cookies analíticos, de personalização ou marketing.",
      "O utilizador deve poder aceitar, recusar ou configurar cookies não essenciais através de mecanismo próprio disponibilizado no site.",
      "Para mais informação sobre categorias de cookies, finalidades, duração e gestão de consentimento, consulte a nossa Política de Cookies.",
    ],
  },
  {
    title: "11. Propriedade intelectual",
    items: [
      "Todos os conteúdos do site, incluindo textos, imagens, logótipos, elementos gráficos, fotografias, vídeos, design, código e demais materiais, são protegidos por direitos de propriedade intelectual ou direitos de utilização legítima.",
      "É proibida a cópia, reprodução, distribuição, modificação, comunicação pública ou utilização comercial dos conteúdos sem autorização prévia e expressa, salvo quando permitido por lei.",
    ],
  },
  {
    title: "12. Ligações para sites de terceiros",
    items: [
      "O site poderá conter ligações para páginas externas de terceiros, disponibilizadas apenas para conveniência do utilizador.",
      "Não nos responsabilizamos pelo conteúdo, políticas de privacidade, práticas comerciais ou segurança de sites de terceiros.",
    ],
  },
  {
    title: "13. Reclamações e resolução de litígios",
    items: [
      "O cliente poderá apresentar reclamação através dos nossos contactos, do Livro de Reclamações Eletrónico ou de outros meios legalmente disponíveis.",
      "Em caso de litígio de consumo, o consumidor poderá recorrer a uma Entidade de Resolução Alternativa de Litígios de Consumo competente.",
      "A informação sobre entidades de Resolução Alternativa de Litígios de Consumo encontra-se disponível junto da Direção-Geral do Consumidor.",
      "Sem prejuízo dos mecanismos extrajudiciais disponíveis, as partes mantêm o direito de recorrer aos tribunais competentes nos termos da lei.",
    ],
  },
  {
    title: "14. Alterações aos termos legais",
    items: [
      "Reservamo-nos o direito de atualizar ou alterar estes termos legais a qualquer momento, nomeadamente por motivos legais, técnicos, comerciais ou operacionais.",
      "A versão em vigor será a publicada nesta página em cada momento, recomendando-se a sua consulta periódica.",
      "Alterações relevantes que afetem encomendas já confirmadas não prejudicam os direitos adquiridos pelo consumidor nos termos da lei.",
    ],
  },
  {
    title: "15. Lei aplicável e foro competente",
    items: [
      "Os presentes termos são regidos pela lei portuguesa, sem prejuízo das normas imperativas de proteção do consumidor que sejam aplicáveis.",
      "Em caso de litígio, será competente o foro legalmente determinado, não podendo estes termos limitar os direitos conferidos ao consumidor pela legislação aplicável.",
    ],
  },
];

const usefulLinks = [
  {
    label: "Política de Privacidade",
    href: "/politica-privacidade",
    description: "Informação detalhada sobre tratamento de dados pessoais.",
  },
  {
    label: "Política de Cookies",
    href: "/politica-cookies",
    description: "Gestão de cookies e tecnologias semelhantes.",
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
  {
    label: "CNPD",
    href: "https://www.cnpd.pt",
    description: "Autoridade nacional de controlo em matéria de proteção de dados.",
  },
];

const TermosLegais = () => {
  return (
    <Layout>
      <div className="bg-background">
        <PageHero
          title="Termos Legais"
          subtitle="Informação legal sobre a utilização do site, encomendas, direitos do consumidor, proteção de dados, reclamações e resolução de litígios."
        />

        <section className="container mx-auto px-4 py-16 md:py-20">
          <Card className="mb-8 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent shadow-soft">
            <CardContent className="p-8 md:p-10">
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                Última atualização: julho de 2026
              </p>

              <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground">
                Informação da entidade responsável
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
                Esta página reúne a informação legal essencial relativa à utilização deste site.
                Antes de publicar, substitua todos os campos entre parênteses retos pelos dados reais
                da entidade responsável e confirme se existem regras setoriais adicionais aplicáveis
                à sua atividade.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {companyInfo.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border/60 bg-background/70 p-4"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {legalSections.map((section) => (
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
            <CardContent className="p-8 md:p-10">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                Nota importante
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
                A informação disponibilizada nesta página tem caráter geral e não dispensa a consulta
                de aconselhamento jurídico adequado à atividade concreta da empresa, aos produtos
                vendidos, aos países de venda, aos métodos de pagamento, aos meios de entrega e às
                ferramentas de análise, marketing ou terceiros integradas no site.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default TermosLegais;