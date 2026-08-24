# layout/

Domínio responsável pela composição visual das tela.

- `shells/` — composição: monta a estrutura completa da página, combinando as peças de `components/`
- `components/` — peças atômicas de layout (Header, Sidebar, Footer, Nav)

Um `layout.tsx` dentro de `app/` deve apenas importar um shell e renderizá-lo — nenhuma lógica de composição deve existir em `app/`.
