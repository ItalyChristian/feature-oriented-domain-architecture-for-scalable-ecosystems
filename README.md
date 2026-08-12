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

```
/public
/src
  /app
    layout.tsx
    page.tsx
    /(public)
      /login
      /register
    /(private)
      layout.tsx
      /dashboard
      /settings
        /security
          page.tsx
          _actions.ts        # Server Action de uso único, colocated

  /features
    /auth
      /actions.
        actions.ts             # reaproveitado por mais de uma rota
        schema.ts
      /hooks
      /types
      /components

    /layout
      /shells
        PrivateShell.tsx
        PublicShell.tsx
      /components
        Header.tsx
        Sidebar.tsx
        Footer.tsx

  /shared
    /assets
    /components               # UI kit puro, sem conhecimento de negócio
    /hooks
    /utils
    /types
    /styles

next.config.ts
tsconfig.json
```

---

## Regras rápidas de decisão

| Situação | Onde vai |
|---|---|
| Componente reutilizado por 2+ domínios, sem lógica de negócio | `shared/components` |
| Componente que conhece regra de negócio, usado em 1+ rotas | `features/<dominio>/components` |
| Server Action chamada de mais de um lugar | `features/<dominio>/actions` |
| Server Action usada por uma única rota | Colocated em `app/.../_actions.ts` |
| Composição de layout (Header + Sidebar + Footer) | `features/layout/shells` |
| Peça atômica de layout (só o Header) | `features/layout/components` |

---

## Status

🚧 Em construção — este repositório existe para testar e validar a arquitetura na prática antes de considerá-la estável o suficiente para outros projetos.

## Sobre o nome

O nome não é acidental. Se você juntar as iniciais, vai entender o espírito do projeto.

## Créditos e inspiração

- [Feature-Sliced Design](https://feature-sliced.design)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Documentação oficial do Next.js — Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
