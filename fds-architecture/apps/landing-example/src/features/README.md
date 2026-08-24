# features/

Cada subpasta aqui representa um domínio de negócio (ex: `auth`, `dashboard`, `settings`).

Um arquivo pertence a `features/<dominio>/` quando:
- Conhece regra de negócio (não é genérico o suficiente pra `shared/`)
- É reaproveitado por mais de uma rota dentro de `app/`

Estrutura comum dentro de cada domínio:
- `actions/`     — Server Actions reaproveitadas por mais de uma rota
- `components/`  — peças de UI específicas do domínio
- `hooks/`       — hooks específicos do domínio
- `types/`       — tipos do domínio
- `validations/` — validação (Zod ou similar)
- `shells/`      — apenas quando o domínio envolve composição de layout

Regra de dependência: `features/` nunca importa de `app/`.

