# shared/lib/

## Por que `lib/` (e não outro)

`lib/` não é sinônimo de `utils/`, mesmo os dois parecendo "coisas genéricas que não são componente".

`shared/utils` tem um critério bem definido: **funções puras, sem estado, sem efeito colateral** (`formatCurrency`, `cn`, `slugify`). Você chama, ela transforma um valor e retorna outro — não guarda nada, não configura nada externo.

`shared/lib` é categoricamente diferente: aqui vivem arquivos que **instanciam e configuram uma biblioteca de terceiros**, produzindo algo com estado interno (cache, listeners, configuração global) que vive durante a sessão da aplicação. Não é transformação de dado — é a preparação de uma dependência externa pra ser consumida pelo resto do app. Misturar isso em `utils/` juntaria dois conceitos que merecem ficar separados: "função que eu escrevi" vs "biblioteca externa que eu configurei".

Essa não é uma convenção inventada — é uma categoria já estabelecida em outras arquiteturas feature-based (o próprio Bulletproof React tem exatamente essa pasta, descrita como bibliotecas reutilizáveis, pré-configuradas para a aplicação).

Exemplos do que pertence aqui:
- Instância configurada do `QueryClient` (`query-client.ts`)
- Configuração global do `dayjs` (`dayjs-config.ts`)
- Instância configurada do `axios` (`axios-instance.ts`)
- Setup de ferramentas de observabilidade (Sentry, analytics)

## Critério consolidado dentro de `shared/`

| Pasta | Critério | Exemplo |
|-------|----------|---------|
| `shared/utils` | Função pura, sem estado, sem dependência externa | `formatCurrency.ts`, `cn.ts` |
| `shared/lib` | Configuração/instância de biblioteca de terceiros | `query-client.ts`, `dayjs-config.ts`, `axios-instance.ts` |
| `shared/providers` | Componente React que expõe Context (infraestrutura, não UI visual) | `theme-provider.tsx` |

`shared/providers` também é uma categoria própria, distinta de `shared/components`: não renderiza UI visual, apenas conecta um Context em volta dos filhos. Um provider agnóstico de negócio (tema, i18n genérico) pertence aqui; um provider que conhece regra de negócio (sessão de usuário, carrinho) pertence a `features/<dominio>/`.


