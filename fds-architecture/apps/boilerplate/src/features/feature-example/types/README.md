# features/<dominio>/types/

Tipos são organizados por **conceito de domínio**, nunca por "quem consome" (hooks, actions, components).

Cenário padrão — um único arquivo:
```
features/dashboard/
  types.ts
```

Cenário de crescimento — dividir por conceito, não por consumidor:
```
features/dashboard/
  /types
    dashboard.ts    ← DashboardData, DashboardFilters
    metrics.ts       ← RevenueMetric, ConversionMetric
    index.ts          ← barrel, reexporta tudo
```

Nunca dividir assim: `hooks.ts`, `actions.ts`, `components.ts` dentro de `types/` — isso organiza por tipo técnico de arquivo, não por domínio, e gera tipos duplicados entre pastas.

Nomenclatura: lowercase/camelCase (`types.ts`, `dashboard.ts` ou `dashboard.types.ts`). 
