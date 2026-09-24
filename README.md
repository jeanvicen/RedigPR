# RedigPR

**Escrita com direção.** Uma experiência de aprendizagem para ajudar estudantes a entender, planejar e escrever redações com mais clareza, repertório e segurança.

> **Estado atual:** protótipo responsivo com interações locais. Inclui roteiros curtos de prática, exemplos guiados de repertório e rascunhos guardados neste navegador. Não há conta, sincronização, correção automática nem integração com IA.

## Visão do produto

O RedigPR está sendo pensado como um ambiente de prática de redação, com foco em ensinar o processo — não apenas entregar uma nota. A experiência deverá ajudar o estudante a compreender o tema, formular uma tese, construir argumentos, usar repertório com pertinência e revisar o texto.

A integração planejada com modelos da Groq deverá apoiar sugestões personalizadas e feedback formativo. **Ela não está implementada nesta versão.** Toda futura chamada à IA deverá passar por um serviço de servidor; chaves e segredos nunca devem ser expostos no navegador.

## O que existe nesta etapa

- Painel inicial responsivo com uma identidade visual editorial e acolhedora.
- Cinco áreas navegáveis: Visão geral, Trilhas, Repertório, Meus textos e Meu progresso.
- Treino guiado no navegador para praticar tese, argumentação, conclusão ou uma ideia livre.
- Roteiros didáticos curtos e filtros por categoria; exemplos de repertório abrem guias para conectar referência e argumento.
- Editor de rascunhos com criação, retomada, edição e exclusão. Os textos ficam no `localStorage` deste navegador e dispositivo; não há sincronização.
- Menu móvel, diálogo acessível, avisos, atalhos de teclado, foco visível e respeito à preferência por movimento reduzido.

Os temas, referências, métricas e feedbacks são **conteúdo demonstrativo**: não equivalem a material didático validado, avaliação oficial nem correção feita por IA. Rascunhos só são guardados localmente quando a pessoa escolhe salvar; nada é enviado a um servidor.

## Executar localmente

Não há dependências de instalação nesta etapa. Na raiz do repositório, inicie um servidor estático:

```bash
python3 -m http.server 4173
```

Abra `http://localhost:4173` no navegador. É necessário usar um servidor local porque os módulos JavaScript do navegador não funcionam corretamente em todas as configurações ao abrir o arquivo diretamente.

## Estrutura

```text
.
├── README.md
├── CONTRIBUTING.md
├── .editorconfig
├── .gitignore
├── favicon.svg
├── index.html
├── docs/
│   └── PRODUCT_SCOPE.md
└── src/
    ├── app.js
    ├── readability.css
    └── styles.css
```

- `index.html`: estrutura semântica das telas do protótipo.
- `src/styles.css` e `src/readability.css`: identidade visual, componentes, tipografia legível, animações e regras responsivas.
- `src/app.js`: navegação, exercícios e rascunhos locais; sem chamadas de rede.
- `docs/PRODUCT_SCOPE.md`: escopo, limites e próximos marcos de produto.

## Princípios de desenvolvimento

1. **Preservar o escopo:** manter os exercícios como apoio didático local; não apresentá-los como currículo validado, avaliação oficial ou IA ativa.
2. **Manter a interface honesta:** deixar dados fictícios e interações demonstrativas claramente identificados.
3. **Segurança desde o desenho:** nunca colocar tokens, chaves da Groq ou credenciais em HTML, JavaScript entregue ao navegador ou no histórico do Git.
4. **Acessibilidade e responsividade:** manter navegação por teclado, foco perceptível, semântica, contraste e adaptação a telas estreitas; oferecer alternativa a animações não essenciais.
5. **Mudanças pequenas e verificáveis:** revisar o diff, testar as telas principais em tamanhos diferentes e não incluir dependências sem necessidade.
6. **Histórico compreensível:** preferir mensagens de commit no padrão Conventional Commits, por exemplo `feat: adicionar painel demonstrativo` ou `docs: esclarecer escopo do protótipo`.

## Verificação antes de publicar

- Abrir o protótipo em desktop e em largura móvel.
- Percorrer cada botão e link, os filtros, o diálogo, os formulários e o menu usando teclado e toque.
- Criar, editar e excluir um rascunho de teste; conferir que o armazenamento é local e nenhuma requisição envia o texto.
- Conferir console do navegador, carregamento de assets e ausência de erros.
- Verificar se textos e estatísticas de demonstração continuam sinalizados.
- Conferir o diff e procurar segredos antes de enviar alterações.

## Próximas etapas — ainda não implementadas

1. Validar a proposta visual e os fluxos com estudantes e educadores.
2. Definir objetivos de aprendizagem, rubricas de avaliação e fontes confiáveis para o conteúdo.
3. Projetar a experiência de escrita e revisão com estados de salvamento explícitos.
4. Desenhar uma API de servidor para a integração Groq, com validação, limites de uso, proteção de dados e tratamento de erros.
5. Só então implementar autenticação, persistência, correção assistida e testes de ponta a ponta.

Consulte [`docs/PRODUCT_SCOPE.md`](docs/PRODUCT_SCOPE.md) para o recorte detalhado desta entrega.
