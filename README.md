# Feature-Oriented Domain Architecture for Scalable Ecosystems

> Arquitetura de organização de código para aplicações Next.js (App Router) + React.s + TypeScript, pensada para escalar sem virar bagunça.

> Sugestão de abreviação para o ambiente corporativo: FDS-Architecture \
> Para os mais íntimos: FODASE ou simplesmente FOD-Architecture

---

## Por que existe

A documentação oficial do Next.js e do React não prescreve uma arquitetura — apenas convenções de roteamento. Isso é ótimo para flexibilidade, mas na prática resulta em cada projeto reinventando sua própria organização de pastas, geralmente sem critério explícito para decidir "isso é genérico ou isso é específico de domínio?".

Este modelo aplica princípios já consolidados no backend (camadas hierárquicas, separação por domínio) à realidade específica do App Router — colocation, route groups, Server Actions — sem tentar forçar um padrão de backend onde ele não encaixa.

---

## Princípios

### 1. Uma pergunta por arquivo novo
Ao criar qualquer arquivo, existe uma única pergunta a responder: **é genérico e agnóstico de negócio, ou pertence a um domínio específico?**
- Genérico → `shared/`
- Pertence a um domínio, usado por mais de uma rota → `features/<dominio>/`
- Hiperespecífico de uma única rota → colocated dentro de `app/` com prefixo `_`

### 2. `app/` é só roteamento e composição
A pasta `app/` nunca contém lógica de negócio. `page.tsx` e `layout.tsx` importam de `features/` e compõem a tela. Nada além disso.

### 3. Camadas não importam "para cima"
`shared` não conhece `features`. `features` não conhece `app`. A dependência flui numa direção só: `app → features → shared`.

### 4. Domínio agrupa por papel, não o contrário
Dentro de `features/<dominio>/`, os arquivos são organizados por papel (`components/`, `actions.ts ou actions/`, `hooks/`, `types/`, `shells/` quando aplicável) — essa subdivisão por pastas é opcional variando com a necessidade, quando possível inserir apenas os arquivos para cada um desses itens. seguindo as boas práticas de clean code o ideal é que um grande arquivo seja dividido em vários outros de acordo com a responsabilidade de cada um deles.

### 5. Nomes carregam intenção
Compound components (`Form.Label`, `Shell.Header`) são usados quando as partes têm relação de composição real entre si. Barrels simples são usados quando os componentes são independentes. A escolha do padrão comunica a relação entre as peças — nunca é arbitrária.

---

## Estrutura

A maior parte do código vive dentro de `src`, organizada assim:

```
src
|
+-- app                # roteamento e composição — nunca lógica de negócio
|   +-- (public)       # route group: páginas sem autenticação
|   +-- (private)      # route group: páginas autenticadas
|   +-- api            # Route Handlers — thin adapters, delegam para features
|
+-- features           # módulos organizados por domínio de negócio
|
+-- shared             # componentes, hooks e utils agnósticos de negócio
|   +-- assets         # imagens, fontes e outros arquivos estático
|   +-- components     # UI kit puro (Button, Input, Modal)
|   +-- hooks          # hooks genéricos (useDebounce, useMediaQuery)
|   +-- utils          # funções puras, sem estado
|   +-- types          # tipos genéricos, reaproveitáveis em qualquer contexto
|   +-- styles         # tokens de design, estilos base

```

A maior parte da lógica da aplicação deve viver dentro de `features`, organizada por domínio. Cada domínio agrupa o que é específico dele, evitando misturar lógica de negócio com componentes compartilhados — o que torna o código mais simples de localizar e manter do que espalhar tudo por tipo de arquivo num nível global.

Uma feature pode ter a seguinte estrutura:

```
src/features/dashboard
|
+-- actions        # Server Actions reaproveitadas por mais de uma rota
|
+-- hooks          # hooks específicos do domínio (um hook único, sem sufixo)
|
+-- types          # tipos do domínio — cresce para /types dividido por
|                  # conceito (não por consumidor) quando necessário
|
+-- validations    # validação (Zod ou similar)
|
+-- components     # componentes escopados a este domínio, com colocation
                   # flat (hook, types e styles junto ao próprio componente)
```

NOTE: nem toda feature precisa de todas essas pastas ou arquivos. Inclua apenas os que fazem sentido para aquele domínio específico.

```

## Regras rápidas de decisão

| Situação | Onde vai |
|----------|----------|
|`shared/components` | Componente reutilizado por 2+ domínios, sem lógica de negócio | 
| `features/<dominio>/components` | Componente que conhece regra de negócio, usado em 1+ rotas |
| `features/<dominio>/actions` | Server Action chamada de mais de um lugar |
| Colocated em `app/.../_actions.ts`| Server Action usada por uma única rota  |
| `features/layout/shells`| Composição de layout (Header + Sidebar + Footer)  |
| `features/layout/components`| Peça atômica de layout (só o Header)  |


```

## Status

🚧 Em construção — este repositório existe para testar e validar a arquitetura na prática antes de considerá-la estável o suficiente para outros projetos.

## Sobre o nome

O nome não é acidental. Se você juntar as iniciais, vai entender o espírito do projeto.

## Créditos e inspiração

- [Feature-Sliced Design](https://feature-sliced.design)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Documentação oficial do Next.js — Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
