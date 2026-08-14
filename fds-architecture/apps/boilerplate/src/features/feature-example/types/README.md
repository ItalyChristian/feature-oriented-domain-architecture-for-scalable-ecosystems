# Convenção de tipos dentro de `features/<dominio>/`

## Regra geral

Tipos raramente pertencem a uma pasta específica (`hooks/`, `actions/`, `components/`) — eles atravessam todas elas. Um mesmo tipo é normalmente consumido pela action que busca o dado, pelo hook que processa esse dado no client, e pelo componente que renderiza. Por isso, tipos ficam centralizados por **domínio**, nunca duplicados ou fragmentados por "quem consome".

## Cenário padrão: `dashboard.types.ts` único

Para a maioria das features, um único arquivo resolve:

```
features/dashboard/
  dashboard.types.ts  ← todos os tipos do domínio dashboard, num lugar só
  actions.ts            ← importa de ./dashboard.types
  hooks.ts               ← importa de ./dashboard.types
  components/
    RevenueChart.tsx     ← importa de ../dashboard.types
```

`actions.ts`, `hooks.ts` e `components/` compartilham a mesma fonte de verdade. Nenhum tipo é redefinido em mais de um lugar.

## Cenário de crescimento: `types.ts` virando pasta

Se a feature crescer e `types.ts` virar um arquivo de centenas de linhas com conceitos diferentes misturados, ele pode virar uma pasta — mas a divisão deve ser **por assunto/conceito de domínio, nunca por "quem consome" (hooks, actions, components)**.

### ✅ Correto — dividido por conceito de domínio

```
features/dashboard/
  /types
    dashboard.types.ts        ← DashboardData, DashboardFilters
    graphic-metrics.types.ts   ← RevenueMetric, ConversionMetric
    index.ts                    ← barrel simples, reexporta tudo
```

Cada arquivo representa um **conceito coeso dentro do domínio** — não importa se esse conceito é usado por um hook, uma action ou um componente. `dashboard.types.ts` agrupa tudo relacionado à entidade `Dashboard`; `graphic-metrics.types.ts` agrupa tudo relacionado a métricas gráficas. Um mesmo arquivo pode (e deve) ser importado por `actions.ts`, `hooks.ts` e `components/` ao mesmo tempo — isso é o comportamento esperado, não uma falha de organização.

Nomes com mais de uma palavra usam **kebab-case** (`graphic-metrics`, não `graphicMetrics` nem `GraphicMetrics`) — consistente com a convenção de nomes de arquivo do restante do ecossistema JS/TS e com os segmentos de rota do próprio Next.js.

### ❌ Incorreto — dividido por "quem consome"

```
features/dashboard/
  /types
    hooks.types.ts        ❌ "tipos dos hooks" não é um conceito de domínio
    actions.types.ts      ❌ mesma coisa
    components.types.ts   ❌ idem
```

Esse modelo reintroduz o problema original que a arquitetura foi criada para resolver: organizar por **tipo técnico de arquivo** em vez de por **domínio real**. Na prática, o mesmo tipo (ex: `DashboardData`) acabaria duplicado entre `hooks.ts` e `actions.ts`, ou um arquivo passaria a importar do outro de forma cruzada e sem critério claro.

## Nomenclatura de arquivos

PascalCase é exclusivo de arquivos que exportam um componente React (`Header.tsx`, `RevenueChart.tsx`) — a convenção reflete o nome do identificador exportado.

Todo o resto — `hooks`, `actions`, `api`, `types`, `utils` — usa **lowercase/kebab-case**, já que esses arquivos não exportam um único identificador nomeado, e sim múltiplas interfaces, types ou funções.

O sufixo `.types.ts` é **sempre usado** para arquivos de tipos, em qualquer nível (componente, feature ou conceito dividido) — isso elimina a necessidade de decidir caso a caso se o nome sozinho seria ambíguo, e deixa imediatamente reconhecível o que é um arquivo de tipos ao navegar pelo projeto.

| Contexto | Convenção | Exemplo |
|---|---|---|
| Types de componente React | PascalCase (nome do componente) + `.types.ts` | `Combobox.types.ts` |
| Types de feature/domínio (arquivo único) | kebab-case + `.types.ts` | `dashboard.types.ts` |
| Types de feature divididos por conceito | kebab-case + `.types.ts` | `graphic-metrics.types.ts` |
| Pasta de tipos | lowercase | `types/` |
| Barrel de reexport | lowercase | `index.ts` |
| Componente React | PascalCase | `RevenueChart.tsx` |

## Resumo da regra

> **Tipos são organizados por conceito de domínio, nunca por tipo técnico de arquivo. PascalCase é exclusivo de componentes React — todo o resto fica em lowercase/kebab-case. O sufixo `.types.ts` é padrão em qualquer nível, sem exceção.**
