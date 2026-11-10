# shared/

Tudo aqui é agnóstico de negócio — não sabe nada sobre domínio, usuário, ou regra de aplicação.

Se um componente, hook ou util "conhece" alguma regra de negócio, ele não pertence aqui — vai para `features/<dominio>/`.

Estrutura:
- `assets/`      — imagens, icones
- `components/`  — UI kit puro (Button, Input, Modal)
- `hooks/`       — hooks genéricos (useDebounce, useMediaQuery)
- `lib/`         — configuração/instância de bibliotecas de terceiros
- `providers/`   — Context providers agnósticos de negócio
- `styles/`      — tokens de design, estilos base
- `types/`       — tipos genéricos, reaproveitáveis em qualquer contexto
- `utils/`       — funções puras, sem estado
- `validations/` — validação (Zod ou similar)

Regra de dependência: `shared/` nunca importa de `features/` nem de `app/`.
