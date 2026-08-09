# features/layout/

Domínio responsável pela composição visual das telas (não confundir com `layout.tsx` do App Router, que apenas consome o que está aqui).

- `shells/` — composição: monta a estrutura completa da página, combinando as peças de `components/`
- `components/` — peças atômicas de layout (Header, Sidebar, Footer, Nav)

Um `layout.tsx` dentro de `app/` deve apenas importar um shell e renderizá-lo — nenhuma lógica de composição deve existir em `app/`.
