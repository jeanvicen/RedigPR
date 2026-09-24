# Como contribuir

RedigPR está no estágio de protótipo visual. Contribuições devem respeitar o escopo atual e preservar a distinção entre telas demonstrativas e funcionalidades efetivamente implementadas.

## Antes de alterar

1. Leia o `README.md` e `docs/PRODUCT_SCOPE.md`.
2. Confirme que a mudança pertence ao estágio visual ou explique por que amplia o escopo.
3. Prefira uma alteração pequena, sem adicionar bibliotecas se HTML, CSS e JavaScript nativos forem suficientes.

## Padrões do projeto

- Use HTML semântico e rótulos acessíveis; não use elementos clicáveis sem nome ou estado discernível.
- Mantenha o estilo visual em `src/styles.css` e o comportamento local em `src/app.js`.
- Preserve suporte a teclado, foco visível, telas móveis e `prefers-reduced-motion`.
- Identifique conteúdo, números e interações fictícias; não apresente protótipos como funcionalidades ativas.
- Não inclua tokens, chaves de API, dados pessoais, redações reais ou credenciais nos arquivos e commits.
- Não envie textos de estudante a serviços externos. Chamadas à Groq dependem de uma futura API segura e de requisitos de privacidade definidos.

## Conferência local

Inicie `python3 -m http.server 4173` na raiz e verifique a navegação em desktop e em tela móvel. Teste os botões, o diálogo, o menu por teclado e toque; observe erros no console e confira o diff antes de propor a mudança.

## Commits e mudanças

Use mensagens diretas, preferencialmente no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`). Pull requests devem explicar o objetivo, o que mudou, como foi verificado e incluir capturas de tela quando houver alterações visuais.
