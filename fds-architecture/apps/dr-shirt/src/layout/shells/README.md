# layout/shells/

Componentes de composição — orquestram as peças de `../components/` para formar a estrutura completa de uma área da aplicação.

Exemplo: `PrivateShell.tsx` combina Header + Sidebar + Footer para as rotas autenticadas.

Shells raramente contêm lógica de negócio própria — eles compõem, não implementam.
