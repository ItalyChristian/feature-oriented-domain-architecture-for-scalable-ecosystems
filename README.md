# Feature-Oriented Domain Architecture for Scalable Ecosystems

> Arquitetura de organização de código para aplicações Next.js (App Router) + React.s + TypeScript, pensada para escalar sem virar bagunça.

> Sugestão de abreviação para o ambiente corporativo: FDS-Architecture

_Guia demonstrativo, versão 2.1: como pensar, organizar e nomear um frontend Next.js que precisa crescer sem virar bagunça._

_Projeto de exemplo usado ao longo de todo o guia: **Dr. Shirt**, uma loja (fictícia) de shirts temáticas de bandas, cantores e afins, além de shirts divertidas e nerds, com site público e painel administrativo._

<img width="1254" height="1254" alt="logo-fds" src="https://github.com/user-attachments/assets/564c0907-329d-431d-a5f9-3d12af6fe0bb" />

---

## 1. Por que isso existe

Quem trabalha com React e Next.js em empresas diferentes acaba notando o mesmo padrão: cada projeto organiza as pastas de um jeito. Em um, os componentes específicos de uma página ficam numa pasta `components` dentro da própria página. Em outro, tudo vai para uma pasta `components` geral, e quando alguém precisa de algo específico cria uma pasta com o nome da página. Hooks seguem o mesmo caminho. E a cada atualização do Next.js a conversa fica ainda mais confusa.

Nenhum dos dois jeitos está “errado”. O problema é que nenhum deles responde com clareza a pergunta que todo desenvolvedor faz vinte vezes por dia: **onde esse arquivo deveria morar?**

No backend, esse problema já tem nome e vocabulário: DDD, Arquitetura Hexagonal, Clean Architecture. Existem camadas, regras de dependência e um jeito combinado de organizar o código. No frontend, a documentação do React e do Next.js entrega as ferramentas (rotas, route groups, pastas privadas, colocation), mas não entrega uma arquitetura.

Esta proposta tenta preencher essa lacuna. Ela se inspira em ideias que já existem no ecossistema (Feature-Sliced Design e Bulletproof React), mas toma decisões próprias, pensadas especificamente para o App Router do Next.js.

> **O objetivo em uma frase:** que duas pessoas diferentes, olhando o mesmo arquivo novo, cheguem à mesma conclusão sobre onde ele deve ficar.

## 2. A ideia em um minuto

Tudo se apoia em seis princípios:

| #   | Princípio                           | Em outras palavras                                                                                 |
| --- | ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1   | Uma pergunta por arquivo novo       | Ele é genérico ou conhece o negócio?                                                               |
| 2   | `app/` só roteia e compõe           | Nenhuma regra de negócio dentro de `page.tsx` ou `layout.tsx`                                      |
| 3   | Dependência em uma direção só       | `shared` não conhece `entities`, `entities` não conhece `features`, e `features` não conhece `app` |
| 4   | Organizar por domínio, não por tipo | Pastas como `catalog` e `orders`, e não um balde gigante de `hooks`                                |
| 5   | Nomes carregam intenção             | O padrão escolhido (compound component ou barrel simples) comunica a relação entre as peças        |
| 6   | Todo provider passa por um lugar só | `app/_providers.tsx` compõe, e nunca implementa                                                    |

E a regra de dependência, desenhada:

```
            shared
           /      \
      entities    layout
          |          |
      features       |
           \        /
              app
```

Quem está embaixo pode importar de quem está em cima, e nunca o contrário. As features não importam umas das outras: quando duas precisam do mesmo conceito (usuário, produto, pedido), ele vira uma _entidade_ em `entities/`. O `layout` recebe tudo por props ou slots, então só depende de `shared`. Essa regra pode ser reforçada automaticamente com ESLint (no monorepo, via tags do Nx).

## 3. Conhecendo o projeto de exemplo

**Dr. Shirt** vende shirts temáticas de bandas, cantores e afins, além de shirts divertidas e nerds. As shirts não são personalizadas pelo cliente: ele navega pelo catálogo, escolhe o modelo, o tamanho e a cor, e compra. Do outro lado, a equipe da loja usa um painel para acompanhar vendas, pedidos, produtos e clientes.

Isso gera duas “caras” no mesmo projeto: o **site público** e a **área administrativa**. Elas compartilham muita coisa (produtos, pedidos, usuários), e é exatamente aí que uma arquitetura por domínio mostra seu valor.

Os domínios de negócio (cada um vira uma pasta em `features/`):

| Domínio     | O que cuida                                                                 | Onde aparece                       |
| ----------- | --------------------------------------------------------------------------- | ---------------------------------- |
| `auth`      | Login, cadastro, sessão do usuário                                          | Site e painel                      |
| `catalog`   | Shirts por banda, cantor e coleção, categorias (divertidas, nerds), estoque | Site (vitrine) e painel (cadastro) |
| `cart`      | Shirts escolhidas antes da compra                                           | Site                               |
| `checkout`  | Endereço, frete, pagamento                                                  | Site                               |
| `orders`    | Pedidos e seus status                                                       | Cliente (“meus pedidos”) e painel  |
| `customers` | Dados e histórico de clientes                                               | Painel                             |
| `dashboard` | Indicadores de venda e gráficos                                             | Painel                             |

Repare que `catalog` e `orders` aparecem nos dois lados, e que `auth` (site) e `customers` (painel) precisam do mesmo conceito de usuário. Em vez de duplicar código ou fazer uma feature importar outra, esses conceitos compartilhados ficam em `entities/`:

| Entidade  | O que guarda                                               | Quem usa                          |
| --------- | ---------------------------------------------------------- | --------------------------------- |
| `user`    | Tipos do usuário, `UserAvatar`, dados da sessão            | `auth`, `customers`, `orders`     |
| `product` | Tipos da shirt (produto), `ProductPrice`, chamadas básicas | `catalog`, `cart`, `checkout`     |
| `order`   | Tipos do pedido, `OrderStatusBadge`                        | `orders`, `checkout`, `dashboard` |

A entidade guarda o **substantivo** (o que é um produto e como ele aparece). A feature guarda o **fluxo** (listar, filtrar, comprar).

### O projeto inteiro visto de cima

```
src
|
+-- proxy.ts                              # middleware do Next.js: fica solto em src/
|
+-- app                                   # SÓ rotas e composição
|   +-- _providers.tsx                    # compõe todos os providers
|   +-- layout.tsx                        # usa <AppProviders>
|   +-- global.css
|   |
|   +-- (public)                          # a loja: qualquer visitante
|   |   +-- page.tsx                      # home
|   |   +-- catalog
|   |   |   +-- page.tsx                  # lista de shirts
|   |   |   +-- loading.tsx               # ao lado do page.tsx; só renderiza o skeleton da feature
|   |   |   +-- [slug]
|   |   |       +-- page.tsx              # página da shirt
|   |   +-- cart
|   |   |   +-- page.tsx
|   |   +-- checkout
|   |   |   +-- page.tsx
|   |   +-- login
|   |       +-- page.tsx
|   |
|   +-- (private)                         # exige login
|   |   +-- layout.tsx                    # guard de autenticação + shell
|   |   +-- account
|   |   |   +-- orders
|   |   |   |   +-- page.tsx              # meus pedidos
|   |   |   +-- security
|   |   |       +-- page.tsx
|   |   |       +-- _actions.ts           # troca de senha: só esta rota usa
|   |   |       +-- _validations.ts
|   |   +-- admin                         # painel administrativo
|   |       +-- dashboard
|   |       |   +-- page.tsx
|   |       +-- orders
|   |       |   +-- page.tsx
|   |       |   +-- [id]
|   |       |       +-- page.tsx
|   |       +-- products
|   |       |   +-- page.tsx
|   |       |   +-- new
|   |       |       +-- page.tsx
|   |       +-- customers
|   |           +-- page.tsx
|   |
|   +-- api                               # Route Handlers: finos, só traduzem o HTTP
|       +-- products
|       |   +-- route.ts                  # GET e POST (simula a API enquanto o backend não existe)
|       |   +-- [id]
|       |       +-- route.ts              # GET, PUT e DELETE
|       +-- webhooks
|           +-- payment
|               +-- route.ts              # delega a features/checkout
|
+-- entities                              # conceitos usados por mais de uma feature
|   +-- user
|   +-- product
|   +-- order
|
+-- features                              # os fluxos de cada domínio de negócio
|   +-- auth
|   +-- catalog
|   +-- cart
|   +-- checkout
|   +-- orders
|   +-- customers
|   +-- dashboard
|
+-- layout                                # estrutura visual das telas
|   +-- shells
|   |   +-- StoreShell.tsx                # site: Header + conteúdo + Footer
|   |   +-- AdminShell.tsx                # painel: Sidebar + Topbar + conteúdo
|   +-- components
|       +-- Header
|       +-- Footer
|       +-- Sidebar
|       +-- AdminTopbar
|
+-- shared                                # nada aqui conhece shirt
    +-- components                        # Button, Input, Modal, Tabs, DataTable
    +-- contexts                          # Contexts genéricos, sem conhecer o negócio
    +-- hooks                             # useDebounce, useMediaQuery
    +-- utils                             # format-currency.ts, cn.ts
    +-- lib                               # query-client.ts, axios-instance.ts
    +-- providers                         # ThemeProvider.tsx
    +-- types                             # api.types.ts, pagination.types.ts
    +-- styles                            # tokens.css, reset.css
    +-- assets                            # logo.svg, icons/
```

Como ler essa árvore: `app/` é só um mapa de URLs. Além de `page.tsx` e `layout.tsx`, cabem ali os outros arquivos que o Next.js exige ao lado da rota (`route.ts`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx`, `default.tsx` e os de metadata, como `sitemap.ts` e `robots.ts`), os arquivos privados com `_` e segmentos como `[locale]`. A regra não é “só `page.tsx`”, e sim **nenhuma regra de negócio em `app/`**: esses arquivos apenas importam e renderizam o que vem de `features/`. Tudo o que tem cara de fluxo da loja (comprar, gerenciar pedidos) mora em `features/`. Os conceitos que mais de uma feature usa (usuário, produto, pedido) moram em `entities/`. Tudo o que é peça genérica mora em `shared/`. A moldura das telas (cabeçalho, menu lateral, rodapé) mora em `layout/`.

## 4. Para onde vai cada arquivo?

Esta é a tabela que você vai consultar mais vezes. Cada linha é um arquivo real que poderia existir no Dr. Shirt:

| O que está sendo criado                               | Onde vai                                     | Por quê                                                                  |
| ----------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| `Button`, `Input`, `Modal`                            | `shared/components`                          | Genérico, não sabe nada de shirt                                         |
| `ProductCard`                                         | `features/catalog/components`                | Conhece produto: pertence ao catálogo                                    |
| `UserAvatar`, usado no Header e no painel             | `entities/user/components`                   | Conceito de negócio que mais de uma feature usa                          |
| `formatCurrency`                                      | `shared/utils`                               | Função pura usada por vários domínios                                    |
| Configuração do React Query                           | `shared/lib`                                 | Instancia e configura uma biblioteca de terceiros                        |
| `ThemeProvider`                                       | `shared/providers`                           | Context que não conhece o negócio                                        |
| `CartProvider`                                        | `features/cart`                              | Conhece regra de negócio (o carrinho)                                    |
| `Header`, `Footer`, `Sidebar`                         | `layout/components`                          | Peça de estrutura da tela                                                |
| `StoreShell`, `AdminShell`                            | `layout/shells`                              | Composição de peças de layout                                            |
| Ação “trocar senha”, usada só em `/account/security`  | `app/(private)/account/security/_actions.ts` | Uso único, colada na rota (o `_` marca como privado)                     |
| Ação “adicionar ao carrinho”, usada em vários lugares | `features/cart`                              | Reaproveitada, então é do domínio                                        |
| Página do catálogo                                    | `app/(public)/catalog/page.tsx`              | Só importa de `features/catalog` e monta a tela                          |
| `loading.tsx` do catálogo                             | `app/(public)/catalog/loading.tsx`           | Arquivo exigido pelo Next.js; só renderiza o skeleton que vem da feature |
| Chamadas HTTP do catálogo                             | `features/catalog/catalog.api.ts`            | Única porta para chamadas HTTP, simuladas ou reais                       |
| Dados fictícios do catálogo                           | `features/catalog/mocks`                     | Temporários, isolados para serem excluídos quando a API real chegar      |
| Regra compartilhada ao finalizar a compra             | `features/checkout/checkout.service.ts`      | Service opcional: só quando a regra é reaproveitada ou composta          |

Na prática, tudo se resume a um pequeno fluxo de perguntas:

```
Vou criar um arquivo novo...
|
+-- Ele sabe algo sobre shirts, pedidos, clientes ou carrinho?
|     NÃO  -->  shared/
|     SIM  -->  continua abaixo
|
+-- Mais de uma feature usa esse conceito (usuário, produto, pedido)?
|     SIM  -->  entities/<conceito>/
|     NÃO  -->  features/<domínio>/
|
+-- Só UMA rota vai usar isso, e nenhuma outra?
|     SIM  -->  fica colado na rota, dentro de app/, com prefixo _
|
+-- É um dado fictício que será excluído quando a API real chegar?
|     SIM  -->  mocks/, dentro da feature
|
+-- É estrutura visual das telas (cabeçalho, menu, moldura)?
      SIM  -->  layout/
```

As seções a seguir mostram como cada tipo de peça é montada por dentro.

## 5. Anatomia de uma feature: o domínio `catalog`

Uma feature é uma pasta que reúne tudo o que pertence a um domínio. Ela começa pequena, com poucos arquivos soltos, e só ganha subpastas quando realmente cresce.

```
features/catalog
|
+-- catalog.actions.ts       # Server Actions reaproveitadas (ex: favoritar uma shirt)
+-- catalog.api.ts           # chamadas HTTP do domínio
+-- catalog.service.ts       # opcional: regra reaproveitada por mais de um ponto de entrada
+-- catalog.validations.ts   # validação de formulários (ex: cadastro de produto)
+-- catalog.types.ts         # tipos próprios da feature (ex: ProductFilters)
+-- catalog.constants.ts     # tamanhos e cores padrão
+-- useProductFilters.ts     # hook do domínio: prefixo use + camelCase
|
+-- components
|   +-- ProductCard          # usado na vitrine do site
|   +-- ProductGrid
|   +-- ProductFilters
|   +-- ProductForm          # usado no painel administrativo
|
+-- mocks                    # opcional: só existe enquanto a API real não existe
|   +-- catalog.json         # dados iniciais
|   +-- catalog.mock-db.ts   # banco fictício em memória (só no servidor)
|
+-- tests                    # testes da feature
    +-- fixtures             # dados criados só para testes
```

Nem toda feature precisa de todos esses arquivos: inclua só o que faz sentido. Os marcados como opcionais (`.service.ts` e `mocks/`) só aparecem quando há uma necessidade concreta. Repare que `ProductCard` e `ProductForm` vivem lado a lado porque os dois falam de produto, mesmo que um apareça no site e o outro no painel.

### Quando os tipos crescem

Se `catalog.types.ts` virar um arquivo enorme com conceitos misturados, ele vira uma pasta. A divisão é feita **por conceito do domínio**, e não por quem consome o tipo:

```
features/catalog/types
+-- product.types.ts          # Product, ProductVariant
+-- category.types.ts         # Category
+-- inventory.types.ts        # StockLevel, StockMovement
+-- index.ts                  # barrel simples que reexporta tudo
```

E assim **não** se faz:

```
features/catalog/types
+-- hooks.types.ts            ❌  tipos “dos hooks” não são um conceito de negócio
+-- actions.types.ts          ❌  mesmo problema
+-- components.types.ts       ❌  idem
```

O motivo: o tipo `Product` é usado ao mesmo tempo pelo `ProductCard`, pelo `useProductFilters` e pelas actions. Dividir por consumidor obrigaria a duplicar o tipo ou a criar importações cruzadas confusas. O mesmo vale para hooks e actions: eles viram pasta (`hooks/`, `actions/`) quando há vários e de assuntos diferentes.

### Quando outra feature precisa do mesmo conceito: `entities`

Uma entidade é um substantivo do negócio que mais de uma feature usa. Ela tem a mesma anatomia de uma feature (arquivos soltos que viram pastas ao crescer), mas guarda só o que descreve o conceito, e não os fluxos construídos em cima dele:

```
entities/user
|
+-- user.types.ts            # User
+-- user-roles.types.ts      # UserRole, Permission (kebab-case quando o nome tem mais de uma palavra)
+-- user.api.ts              # buscar o usuário atual
+-- useCurrentUser.ts        # hook que expõe o usuário logado
|
+-- components
    +-- UserAvatar           # usado no Header (via slot) e no painel
```

Exemplo da loja: o `auth` e o painel de clientes (`features/customers`) precisam mostrar o avatar e o nome do usuário. Nenhuma das duas importa a outra: as duas importam `entities/user`. Nesta proposta, uma feature não importa de outra; quando isso parecer necessário, o que as duas compartilham é uma entidade que ainda não foi extraída.

Com isso, o tipo `Product` dos exemplos desta seção passa a morar em `entities/product`. A divisão de tipos por conceito continua valendo dentro de cada entidade e de cada feature.

## 6. Anatomia de um componente

A regra aqui é **coesão**: tudo o que muda junto fica junto. Em vez de criar subpastas `hooks/`, `types/` e `styles/` dentro de cada componente, os arquivos ficam lado a lado, com o nome do componente como prefixo. Um componente com tudo o que pode ter:

```
features/catalog/components/ProductGallery
|
+-- index.ts                       # barrel: expõe só o ProductGallery
+-- ProductGallery.tsx             # componente raiz
+-- ProductGalleryThumbs.tsx       # subcomponente interno
+-- ProductGalleryZoom.tsx         # subcomponente interno
+-- useProductGallery.ts           # hook único: o prefixo use já diz tudo
+-- ProductGallery.types.ts
+-- ProductGallery.constants.ts    # ex: níveis de zoom
+-- ProductGallery.utils.ts        # ex: getNextImageIndex (sem JSX, logo .ts)
+-- ProductGallery.module.css
```

Se o componente passar a ter **vários** hooks, aí sim eles ganham uma subpasta (e dentro dela não precisam mais repetir o nome do componente):

```
features/orders/components/OrdersTable
|
+-- OrdersTable.tsx
+-- OrdersTable.types.ts
+-- hooks
    +-- useOrderSorting.ts
    +-- useOrderFilters.ts
    +-- useOrderPagination.ts
```

### Três jeitos de expor um componente

| Situação                               | Padrão                 | Exemplo na loja                                                      |
| -------------------------------------- | ---------------------- | -------------------------------------------------------------------- |
| Peça independente                      | Barrel simples         | `Button`: `export { Button } from './Button'`                        |
| Partes que só fazem sentido juntas     | Compound component     | `Tabs.List`, `Tabs.Trigger`, `Tabs.Panel` (abas do pedido no painel) |
| Subcomponentes que são detalhe interno | Barrel expõe só o raiz | `Sidebar` (`SidebarNav` e `SidebarNavItem` ficam escondidos)         |

O compound component na prática:

```tsx
// shared/components/Tabs/index.tsx
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
}

// uso na página de detalhe do pedido (painel)
<Tabs.Root>
  <Tabs.List>
    <Tabs.Trigger value='items'>Itens</Tabs.Trigger>
    <Tabs.Trigger value='payment'>Pagamento</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value='items'>...</Tabs.Panel>
</Tabs.Root>
```

Um teste rápido para escolher: ao ler `<Tabs.Panel />` sozinho, fora de qualquer contexto, você entende o que é? Então compound component faz sentido. Se os componentes da pasta só dividem o espaço por proximidade (como uma pasta de ícones), o barrel simples é mais honesto, porque `Icons.Arrow` sugeriria uma relação de composição que não existe.

## 7. A regra de promoção

Um arquivo nasce no nível mais específico possível e só sobe quando um segundo usuário real aparece. Nunca por antecedência. Exemplo com a função que formata preços:

```
1. Nasce colada ao componente
   catalog/components/ProductCard/ProductCard.utils.ts     -> formatPrice()

2. ProductDetails (mesmo domínio) também precisa dela
   catalog/catalog.utils.ts                                -> formatPrice()

3. CartItem (outro domínio) também precisa dela
   shared/utils/format-currency.ts                         -> formatCurrency()
```

Em resumo: usada por 1 componente, fica no componente. Usada por 2 ou mais componentes do mesmo domínio, sobe para a raiz da feature. Usada por 2 ou mais domínios, sobe para `entities` (se descreve um conceito de negócio, como usuário ou produto) ou para `shared` (se é genérica, como a formatação de preço). A regra vale para funções, hooks, tipos e constantes.

## 8. Layout e shells

O `layout/` guarda a estrutura visual das telas e se divide em dois papéis: **peças** (cada uma faz sentido sozinha) e **composições** (juntam as peças numa página). Chamamos as composições de _shells_, porque são o “casco” que envolve o conteúdo.

```
layout
|
+-- shells                        # COMPOSIÇÃO: monta a estrutura da página
|   +-- StoreShell.tsx            # Header + {children} + Footer
|   +-- AdminShell.tsx            # Sidebar + AdminTopbar + {children}
|
+-- components                    # PEÇAS: cada uma faz sentido sozinha
    +-- Header
    +-- Footer
    +-- Sidebar
    +-- AdminTopbar
```

O `layout.tsx` do Next.js só importa um shell e o renderiza:

```tsx
// app/(public)/layout.tsx
import { StoreShell } from "@/layout/shells/StoreShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StoreShell>{children}</StoreShell>;
}
```

`layout/` fica fora de `features/` de propósito: ele não é um domínio de negócio como `catalog` ou `orders`, e sim infraestrutura de composição visual usada por toda a aplicação.

## 9. Dados, Actions e Route Handlers

Esta seção responde à pergunta que mais confunde: quem chama quem? São cinco peças diferentes, e cada uma tem um papel só.

| Peça                              | Papel                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Server Component (`page.tsx`)     | Busca dados no servidor e renderiza a tela                                                                   |
| Server Action (`.actions.ts`)     | Executa uma operação iniciada pela interface, principalmente escritas. Não é um substituto para buscar dados |
| Route Handler (`route.ts`)        | **Atende** uma chamada HTTP (GET, POST, PUT, DELETE). É um adaptador fino                                    |
| `.api.ts`                         | **Faz** a chamada HTTP. É a única porta para APIs, simuladas ou reais                                        |
| Service (`.service.ts`, opcional) | Concentra regra de negócio quando ela é reaproveitada ou tem várias etapas                                   |

Uma forma fácil de lembrar: o `route.ts` atende o telefone, e o `.api.ts` liga.

### O fluxo, com mock e com API real

```
Mock:  Componente ou Action  -->  catalog.api.ts  -->  /api/products (route.ts)  -->  mocks/
Real:  Componente ou Action  -->  catalog.api.ts  -->  API real
```

A URL base fica numa variável de ambiente, lida pelo próprio `.api.ts`. Quando a API real chegar, você exclui `mocks/` e os Route Handlers (ou os transforma em proxy) e troca o valor da variável. Nada mais muda: nem os componentes, nem o `.api.ts`.

```ts
// catalog.api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// mock: http://localhost:3000/api    real: a URL da API de verdade

export async function updateProduct(id: string, data: UpdateProductInput) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
}
```

Dois cuidados com essa URL:

- O `.api.ts` roda no navegador e no servidor, por isso o nome da variável começa com `NEXT_PUBLIC_`. Isso serve para URL, nunca para token ou segredo.
- No servidor (Server Component ou Action), a URL precisa ser completa: um `fetch('/api/...')` relativo só funciona no navegador. Na fase de mock, a página que faz essa chamada precisa ser dinâmica; senão o build tenta chamar o endpoint antes de o servidor existir.

Para a leitura inicial, o Server Component chama o `.api.ts`. Se preferir, o Client Component pode carregar os dados pelo `.api.ts` com uma biblioteca como o TanStack Query, o que também é uma prática normal para dados que mudam o tempo todo.

### Dados simulados (mocks)

Tudo o que é temporário na simulação fica junto, dentro de `features/<domínio>/mocks/`, para ser excluído de uma vez quando a API real chegar:

- **JSON:** os dados iniciais (`catalog.json`).
- **`<domínio>.mock-db.ts`:** banco fictício em memória, só quando a simulação precisa de escrita. É exclusivo do servidor (use `import 'server-only'`). O estado vive no processo do servidor e volta ao JSON quando ele reinicia, então não serve para hospedagem serverless, onde cada requisição pode cair numa instância diferente.
- A pasta só existe quando a feature realmente precisa de mocks. Não existe `shared/mocks/` para dados de negócio.
- Dados criados só para testes automatizados são outra coisa: ficam em `tests/fixtures/`, dentro da feature.
- `.store.ts` continua reservado ao Zustand; o banco fictício nunca usa esse sufixo.

Só os Route Handlers (e os testes) importam de `mocks/`. Os componentes e o `.api.ts` não sabem que o dado é fictício.

### Services: opcionais

Um Service não é obrigatório em nenhuma feature. Ele só entra quando existe uma regra de negócio que precisa ser reaproveitada por mais de um ponto de entrada (Action, Route Handler ou Server Component) ou uma operação de várias etapas. É um arquivo solto, `<domínio>.service.ts`, e só vira pasta se crescer. Um exemplo com o Dr. Shirt:

- **Sem Service:** listar as shirts. O `catalog.api.ts` chama o endpoint e nenhuma camada extra é necessária. Uma Action de escrita também pode chamar o `.api.ts` direto.
- **Com Service:** finalizar a compra. Validar as quantidades, conferir o estoque, calcular valor e descontos, criar o pedido e iniciar o pagamento são várias etapas, usadas pela Action do formulário e pelo webhook de pagamento.

```ts
// features/checkout/checkout.actions.ts
"use server";
import { checkoutService } from "./checkout.service";

export async function finalizePurchase(input: CheckoutInput) {
  // valida a entrada e confere a autenticação
  return checkoutService.finalizePurchase(input);
}
```

```ts
// app/api/webhooks/payment/route.ts
import { NextResponse } from "next/server";
import { checkoutService } from "@/features/checkout/checkout.service";

export async function POST(request: Request) {
  const result = await checkoutService.handlePaymentWebhook(
    await request.json(),
  );
  return NextResponse.json(result);
}
```

O Service guarda a regra (validar, calcular, criar o pedido), a Action só cuida da entrada pela interface e o `route.ts` só traduz o HTTP. A regra que se repetiria nos dois lugares mora num só. A regra geral: crie um Service quando a complexidade ou a reutilização justificar, nunca só porque a feature existe.

## 10. Providers: o `AppProviders`

Toda aplicação real acumula providers (tema, sessão, cache de dados, carrinho). Sem um padrão, eles vão se empilhando dentro do `layout.tsx` raiz. Aqui existe um único lugar para isso, `app/_providers.tsx`, que **só compõe** e nunca implementa um provider do zero:

```tsx
"use client";
// app/_providers.tsx

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <ThemeProvider>
      {" "}
      {/* shared/providers */}
      <QueryClientProvider client={queryClient}>
        {" "}
        {/* config em shared/lib */}
        <UserProvider>
          {" "}
          {/* features/auth */}
          <CartProvider>
            {" "}
            {/* features/cart */}
            {children}
          </CartProvider>
        </UserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
```

A **ordem importa** e deve ser comentada no próprio arquivo: o `UserProvider` precisa do cache de dados já disponível, e o `CartProvider` pode depender do usuário logado.

| Provider                       | Onde mora                        | Por quê                                        |
| ------------------------------ | -------------------------------- | ---------------------------------------------- |
| `ThemeProvider`                | `shared/providers`               | Não conhece o negócio                          |
| Config do React Query          | `shared/lib/query-client.ts`     | Configura uma biblioteca (não é um componente) |
| `UserProvider`, `CartProvider` | `features/auth`, `features/cart` | Conhecem regras de negócio                     |

Os arquivos de provider usam PascalCase porque um provider é, na prática, um componente React (recebe `children` e devolve JSX).

## 11. Nomenclatura: o guia de bolso

| Tipo de arquivo                     | Convenção                                                                                                  | Exemplos da loja                                                 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Pastas                              | minúsculas, kebab-case                                                                                     | `catalog`, `order-items`, `mocks`, `contexts`                    |
| Componente React                    | PascalCase                                                                                                 | `ProductCard.tsx`, `OrdersTable.tsx`                             |
| Provider                            | PascalCase (é um componente)                                                                               | `CartProvider.tsx`, `ThemeProvider.tsx`                          |
| Hook                                | Prefixo `use` + camelCase, sem sufixo (exceção intencional à regra kebab-case)                             | `useCart.ts`, `useProductGallery.ts`                             |
| Tipos                               | Sufixo `.types.ts`, sempre, com o nome em kebab-case (tipos de componente usam o PascalCase do componente) | `ProductCard.types.ts`, `user-roles.types.ts`                    |
| Utilitários do escopo               | Sufixo `.utils.ts`                                                                                         | `ProductCard.utils.ts`, `catalog.utils.ts`                       |
| Constantes                          | Sufixo `.constants.ts`                                                                                     | `Sidebar.constants.ts`, `shipping.constants.ts`                  |
| Server Actions                      | Sufixo `.actions.ts`                                                                                       | `cart.actions.ts`                                                |
| Chamadas HTTP do domínio            | Sufixo `.api.ts`                                                                                           | `catalog.api.ts`                                                 |
| Service (opcional)                  | Sufixo `.service.ts`                                                                                       | `checkout.service.ts`                                            |
| Validação de formulários            | Sufixo `.validations.ts`                                                                                   | `catalog.validations.ts`                                         |
| Store (Zustand)                     | Sufixo `.store.ts`, reservado ao Zustand                                                                   | `cart.store.ts`                                                  |
| Banco fictício em memória           | Sufixo `.mock-db.ts`, dentro de `mocks/`                                                                   | `catalog.mock-db.ts`                                             |
| Dados simulados (JSON)              | JSON dentro de `mocks/`                                                                                    | `mocks/catalog.json`                                             |
| Estilos de componente               | `.module.css`                                                                                              | `ProductCard.module.css`                                         |
| Config de biblioteca (`shared/lib`) | kebab-case                                                                                                 | `query-client.ts`, `axios-instance.ts`                           |
| Função pura global (`shared/utils`) | kebab-case                                                                                                 | `format-currency.ts`, `cn.ts`                                    |
| Arquivos privados da rota           | Prefixo `_`                                                                                                | `_actions.ts`, `_validations.ts`, `_components/`                 |
| Arquivos exigidos pelo Next.js      | Nomes fixos                                                                                                | `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx` |
| Barrel                              | `index.ts` (ou `index.tsx` no compound)                                                                    | `ProductGallery/index.ts`                                        |

Algumas regrinhas que explicam quase tudo:

- PascalCase é exclusivo de arquivos que exportam um componente React. Todo o resto fica em minúsculas (os hooks, com o prefixo `use`, são a única exceção).
- A extensão é `.ts` sempre que não há JSX dentro (`ProductCard.utils.ts`, `query-client.ts`).
- Tipos de componente usam o PascalCase do componente (`ProductCard.types.ts`). Tipos de feature e de entidade usam kebab-case, inclusive quando o nome tem mais de uma palavra (`product.types.ts`, `user-roles.types.ts`).
- Nos arquivos de validação, os exports seguem o idioma da biblioteca: `createProductSchema` dentro de `catalog.validations.ts`. O sufixo descreve a função do arquivo, e não a ferramenta (e “schema” sozinho seria ambíguo, porque também lembra banco de dados).
- Estilos em TypeScript usam o nome do componente: `ProductCard.css.ts` no Vanilla Extract (a biblioteca exige esse sufixo) e `ProductCard.styles.ts` no styled-components. Só arquivos que não pertencem a um componente, como tokens, usam kebab-case (`design-tokens.css.ts`).
- Metadata e SEO ficam em `<domínio>.seo.ts` (por exemplo, `catalog.seo.ts`), como mostra a seção 13.
- Entidades usam nomes no singular (`user`, `product`, `order`).

E para não confundir as três pastas “de apoio” dentro de `shared`:

| Pasta              | Critério                                               | Exemplo              |
| ------------------ | ------------------------------------------------------ | -------------------- |
| `shared/utils`     | Função pura, sem estado                                | `format-currency.ts` |
| `shared/lib`       | Instancia ou configura uma biblioteca de terceiros     | `query-client.ts`    |
| `shared/providers` | Componente que expõe um Context sem conhecer o negócio | `ThemeProvider.tsx`  |

## 12. Como usar no dia a dia

**Criar uma página nova**

1. Crie a pasta da rota dentro de `app/(public)` ou `app/(private)`.
2. O `page.tsx` só importa de `features/` e monta a tela.
3. Precisa de algo que só essa rota usa? Coloque ao lado, com prefixo `_` (`_components/`, `_actions.ts`).
4. Precisa de tela de carregamento ou de erro? Crie `loading.tsx` ou `error.tsx` ao lado do `page.tsx`, importando o conteúdo da feature.
5. Se outra rota também vai usar algo, mova para a feature.

**Criar uma feature nova**

1. Crie a pasta em `features/<domínio>` (kebab-case).
2. Comece só com o necessário: uma pasta `components/` e um arquivo de tipos já bastam.
3. Deixe a feature crescer por promoção, e não por antecedência.
4. Uma feature nunca importa de `app/` nem de outra feature: o que é compartilhado vira entidade.

**Criar um componente novo**

1. Ele conhece o negócio? Vai para `features/<domínio>/components`. Se não conhece, vai para `shared/components`.
2. Comece com um arquivo. Hook, tipos e estilos entram ao lado, com o nome do componente como prefixo.
3. As partes só fazem sentido juntas? Compound component. Caso contrário, barrel simples.

**Ao trabalhar com dados**

1. Identifique se a fonte é uma API real ou uma implementação simulada.
2. Se for simulada, mantenha os arquivos em `mocks/`, dentro da feature.
3. Toda chamada HTTP fica no `.api.ts`, com a URL base vinda de `NEXT_PUBLIC_API_URL`.
4. Se precisar expor endpoints, crie Route Handlers finos em `app/api/`.
5. Não crie Actions nem Services só por convenção: introduza essas camadas quando houver uma responsabilidade concreta.

**Antes de abrir um pull request**

- Cada arquivo está no nível mais específico possível?
- Algum arquivo de `shared` importa de `features`? (não pode)
- Alguma feature importa de outra feature? (não pode)
- Existe lógica de negócio dentro de `page.tsx`, `layout.tsx` ou `route.ts`?
- Algum arquivo fora dos Route Handlers e dos testes importa de `mocks/`? (não pode)
- Os nomes seguem a tabela da seção 11?

## 13. SEO e metadata

A regra é a mesma do resto do guia: `app/` só chama, e a lógica mora na feature. O `page.tsx` exporta o `generateMetadata` (o Next.js exige isso), mas quem monta título, descrição e imagem é uma função em `<domínio>.seo.ts`.

| Peça                                           | Onde fica                                              |
| ---------------------------------------------- | ------------------------------------------------------ |
| `generateMetadata` e `metadata`                | Exportados do `page.tsx` ou do `layout.tsx`, em `app/` |
| Funções que montam a metadata de um domínio    | `features/<domínio>/<domínio>.seo.ts`                  |
| `sitemap.ts`, `robots.ts` e imagens Open Graph | `app/`, com nomes fixos exigidos pelo Next.js          |
| Padrões do site inteiro (título, URL base)     | `metadata` do `layout.tsx` raiz                        |

```ts
// features/catalog/catalog.seo.ts
import type { Metadata } from "next";
import type { Product } from "@/entities/product/product.types";

export function getProductMetadata(product: Product): Metadata {
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}
```

A página só chama essa função (o template do layout raiz acrescenta o nome da loja ao título):

```ts
// app/(public)/catalog/[slug]/page.tsx
import type { Metadata } from "next";
import { getProductBySlug } from "@/features/catalog/catalog.api";
import { getProductMetadata } from "@/features/catalog/catalog.seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return getProductMetadata(product);
}

// ...o componente da página vem depois, só compondo a tela
```

Se a página e o `generateMetadata` buscarem o mesmo produto com `fetch` e os mesmos parâmetros, o Next.js evita repetir a chamada dentro da mesma renderização. O padrão do site inteiro fica no layout raiz, assim cada página só informa o que é específico dela:

```ts
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://drshirt.example"),
  title: { default: "Dr. Shirt", template: "%s | Dr. Shirt" },
};
```

O `sitemap.ts` importa da feature para listar as URLs:

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getProducts } from "@/features/catalog/catalog.api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return products.map((product) => ({
    url: `https://drshirt.example/catalog/${product.slug}`,
    lastModified: product.updatedAt,
  }));
}
```

A área administrativa não deve aparecer em buscadores. O `robots.txt` só bloqueia o rastreamento; para tirar a página do índice, use `noindex` na metadata do layout do `(private)`:

```ts
// app/(private)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
```

Nos exemplos, a URL e o nome do site aparecem escritos direto. Onde essas constantes devem morar é uma decisão em aberto (veja a seção 14).

## 14. O que ainda precisa ser pensado

Quinze temas já estão decididos, quatro ainda pedem uma resposta e quatro podem esperar. O Dr. Shirt mostra onde cada um aparece.

### Decisões fechadas

| Tema                                                | Decisão                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camada `entities` e compartilhamento entre features | Conceitos usados por mais de uma feature sobem para `entities/`, e as features não importam umas das outras. A entidade guarda tipos, chamadas HTTP básicas e peças pequenas de interface, depende só de `shared`, e o `layout` também só depende de `shared`. Nomes de entidade no singular (`user`, `product`, `order`) |
| Layout                                              | Recebe dados por props ou slots; a ligação fica no `layout.tsx` do route group, que continua fino                                                                                                                                                                                                                         |
| Forma das features                                  | Nascem com arquivos soltos e viram pastas ao crescer (o `feature-example` já nasce com pastas só por ser um exemplo)                                                                                                                                                                                                      |
| Estado global                                       | O guia é agnóstico e traz exemplos com Context e com Zustand; features têm pasta `contexts/` (e `shared` também); o Zustand usa o sufixo `.store.ts`                                                                                                                                                                      |
| Estilos                                             | CSS Modules seguem o PascalCase do componente; tokens em kebab-case; Vanilla Extract usa `.css.ts` e styled-components usa `.styles.ts`, sempre com o nome do componente                                                                                                                                                  |
| Nomes                                               | Hooks em `use` + camelCase (exceção intencional); utilitários globais em kebab-case (`format-currency.ts`); todos os outros arquivos com sufixo (`cart.actions.ts`, `catalog.api.ts`, `catalog.validations.ts`)                                                                                                           |
| Validação                                           | Sufixo `.validations.ts` (e não `schema`), por ser agnóstico de biblioteca; os exports seguem a biblioteca, como `createProductSchema`                                                                                                                                                                                    |
| Testes                                              | Pasta `tests/` dentro de cada feature, com `fixtures/` para dados criados só para testes                                                                                                                                                                                                                                  |
| Dados simulados                                     | `features/<domínio>/mocks/`, com JSON e `<domínio>.mock-db.ts` (exclusivo do servidor); tudo o que é temporário fica num lugar só, para ser excluído quando a API real chegar                                                                                                                                             |
| Chamadas HTTP                                       | O `.api.ts` é a única porta, com a URL base em `NEXT_PUBLIC_API_URL`; o mesmo código serve para mock e API real; Server Actions só para escritas; não existe `.queries.ts`                                                                                                                                                |
| Services                                            | Opcionais: `<domínio>.service.ts`, solto, só quando há regra reaproveitada ou composta                                                                                                                                                                                                                                    |
| Arquivos especiais                                  | `proxy.ts` (o middleware) solto em `src/`; `error.tsx`, `loading.tsx` e afins ao lado do `page.tsx`, em `app/`, importando o conteúdo da feature                                                                                                                                                                          |
| Internacionalização                                 | Opção A do next-intl: `messages/` na raiz e `src/i18n/`, com as rotas em `app/[locale]`                                                                                                                                                                                                                                   |
| SEO e metadata                                      | O `generateMetadata` só chama funções de `<domínio>.seo.ts`; `sitemap.ts`, `robots.ts` e imagens Open Graph ficam em `app/`; a área administrativa usa `noindex` (exemplos na seção 13)                                                                                                                                   |
| Documentação                                        | Atualizar no repositório oficial; os exemplos não precisam                                                                                                                                                                                                                                                                |
