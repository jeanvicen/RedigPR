# Como contribuir

RedigPR está no estágio de protótipo interativo no navegador. Contribuições devem preservar a distinção entre conteúdo demonstrativo e material validado, e entre a proposta de assistência por IA e uma integração realmente ativa.

## Antes de alterar

1. Leia o `README.md` e `docs/PRODUCT_SCOPE.md`.
2. Confirme que a mudança pertence ao estágio visual/funcional local ou explique por que amplia o escopo.
3. Prefira mudanças pequenas e dependências nativas quando forem suficientes.

## Padrões do projeto

- Use HTML semântico, rótulos acessíveis e estados discerníveis.
- Mantenha estilos em `src/styles.css`/`src/readability.css` e comportamentos locais em `src/app.js`.
- Preserve navegação por teclado, foco visível, contraste, legibilidade em telas estreitas e suporte a `prefers-reduced-motion`.
- Não remova as configurações de modo claro/escuro, tamanho de texto ou redução de movimento.
- Rascunhos e preferências ficam no `localStorage` deste dispositivo; não adicione sincronização implícita ou envio de redações pela rede.
- Identifique temas, referências, estatísticas e feedbacks ilustrativos; não apresente conteúdo como currículo validado, nota oficial ou recurso de IA ativo.
- Groq não está conectada. Não inclua tokens, chaves, dados pessoais, redações reais ou credenciais em arquivos e commits. Qualquer integração futura requer uma API segura e decisões de privacidade aprovadas.
- Preserve a identificação honesta do assistente como planejado/inativo até que exista integração real.

## Conferência antes de enviar

Sirva a raiz do projeto localmente com `python3 -m http.server 4173` e valide em navegador. Percorra navegação, menu, filtros, diálogos, exercícios e formulários. Teste configuração, criação/edição/retomada/exclusão de um rascunho, salvamento após sair do editor, contadores e exportação `.txt`. Confira também largura móvel, foco por teclado, persistência de preferências, console, requisições de rede e ausência de dados de teste no armazenamento. Remova qualquer rascunho sintético criado durante a verificação.

## Commits e mudanças

Use mensagens diretas, preferencialmente no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`). Pull requests devem explicar objetivo, arquivos alterados, verificações realizadas e comportamentos ainda não validados; inclua capturas quando houver alterações visuais.
