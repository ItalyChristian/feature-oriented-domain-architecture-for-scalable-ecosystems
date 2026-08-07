# shared/

Tudo aqui é agnóstico de negócio — não sabe nada sobre domínio, usuário, ou regra de aplicação.

Se um componente, hook ou util "conhece" alguma regra de negócio, ele não pertence aqui — vai para `features/<dominio>/`.

Estrutura:
- `components/` — UI kit puro (Button, Input, Modal)
- `hooks/` — hooks genéricos (useDebounce, useMediaQuery)
- `utils/` — funções puras, sem estado
- `types/` — tipos genéricos, reaproveitáveis em qualquer contexto
- `styles/` — tokens de design, estilos base
- `assets/` — imagens, icones

Regra de dependência: `shared/` nunca importa de `features/` nem de `app/`.
