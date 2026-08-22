# Padrão `AppProviders`

## O problema

Toda aplicação real acumula providers: tema, autenticação, data-fetching (React Query), localização, notificações, etc. Sem um padrão definido, esses providers costumam ser empilhados diretamente dentro do `layout.tsx` raiz — o que rapidamente vira um bloco de JSX profundamente aninhado, difícil de ler e difícil de alterar sem quebrar a ordem de composição.

## A solução: um componente de composição único

`AppProviders` é um componente cuja única responsabilidade é compor todos os providers da aplicação, na ordem correta, num único lugar. O `layout.tsx` raiz importa e usa apenas isso — nada de provider solto ali.

```tsx
// app/layout.tsx
import { AppProviders } from './_providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
```

## Onde vive

```
src/app/_providers.tsx
```

O prefixo `_` marca o arquivo como privado — ele nunca vira rota, mas continua colocated dentro de `app/`. Esse é o local correto porque `AppProviders` tem exatamente o perfil que já reservamos para colocation privada:

- **Ponto de uso único** — importado apenas pelo `layout.tsx` raiz, nunca reaproveitado por outra rota isoladamente.
- **Papel de composição, não de implementação** — assim como `page.tsx` e os `shells`, ele importa de `shared/` e `features/` e monta a árvore, sem conter lógica própria.

## Regra: `AppProviders` compõe, não implementa

Cada provider individual continua morando de acordo com as regras que já temos:

- Provider agnóstico de negócio (React Query, date picker, tema visual puro) → configurado em `shared/` (ex: `shared/lib/query-client.ts`, `shared/providers/ThemeProvider.tsx`).
- Provider que conhece regra de negócio (ex: `UserProvider`, que carrega sessão/autenticação) → vive em `features/<dominio>/` (ex: `features/auth/UserProvider.tsx`).

`_providers.tsx` apenas importa esses providers já prontos e define a ordem de composição. Ele nunca implementa um Context do zero ali dentro.

```
src/
  app/
    _providers.tsx        ← só compõe, importa de shared/ e features/
    layout.tsx

  shared/
    lib/
      query-client.ts      ← configuração do QueryClient
    providers/
      ThemeProvider.tsx   ← provider de tema, agnóstico de negócio

  features/
    auth/
      UserProvider.tsx    ← conhece sessão/usuário — pertence ao domínio
```

## Ordem de composição importa — documente-a

Providers frequentemente dependem uns dos outros (ex: um provider de notificações pode precisar do tema já resolvido). Trate a ordem como uma decisão deliberada, e comente no próprio arquivo por que ela é essa e não outra — isso evita que alguém reordene sem entender a dependência implícita.

## Regra prática

> **Todo provider global da aplicação passa por `app/_providers.tsx`. Nenhum provider é adicionado diretamente no `layout.tsx`. A implementação de cada provider mora em `shared/` (se agnóstico de negócio) ou `features/<dominio>/` (se conhece regra de negócio) — `_providers.tsx` apenas importa e compõe.**
