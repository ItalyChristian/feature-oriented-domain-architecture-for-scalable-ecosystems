# features/

Cada subpasta aqui representa um domínio de negócio (ex: `auth`, `dashboard`, `settings`).

Um arquivo pertence a `features/<dominio>/` quando:
- Conhece regra de negócio (não é genérico o suficiente pra `shared/`)
- É reaproveitado por mais de uma rota dentro de `app/`

Estrutura comum dentro de cada domínio:
- `actions/`     — Server Actions reaproveitadas por mais de uma rota
- `components/`  — peças de UI específicas do domínio
- `hooks/`       — hooks específicos do domínio
- `styles/`      — tokens de design, estilos base
- `types/`       — tipos do domínio
- `validations/` — validação (Zod ou similar)

Se necessário pode incluir (para casos muito específicos): 
- `lib/`         — configuração/instância de bibliotecas de terceiros
- `providers/`   — Context providers agnósticos de negócio
- `shells/`      — apenas quando o domínio envolve composição de layout
- `utils/`       — funções puras, sem estado

Regra de dependência: `features/` nunca importa de `app/`.

