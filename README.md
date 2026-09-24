# RedigPR

**Escrita com direção.** Uma experiência de aprendizagem para ajudar estudantes a entender, planejar e escrever redações com mais clareza, repertório e segurança.

> **Estado atual:** protótipo responsivo com editor amplo de redação, rascunhos locais, roteiros de prática e configurações de acessibilidade. Não há conta, sincronização nem correção por IA ativa.

## Visão do produto

O RedigPR está sendo pensado como um ambiente de prática de redação, com foco em ensinar o processo — não apenas entregar uma nota. A experiência deverá ajudar o estudante a compreender o tema, formular uma tese, construir argumentos, usar repertório com pertinência e revisar o texto.

A assistente **KAZER**, planejada para usar a API da Groq, deverá exibir comentários e sugestões em uma lateral enquanto o estudante escreve. **A integração não está ligada nesta versão.** Quando chegar a hora, as chamadas deverão passar por um serviço de servidor; chaves e segredos nunca devem ser expostos no navegador.

## O que existe nesta etapa

- Painel inicial responsivo com uma identidade visual editorial e acolhedora.
- Cinco áreas navegáveis: Visão geral, Trilhas, Repertório, Meus textos e Meu progresso.
- Treino guiado no navegador para praticar tese, argumentação, conclusão ou uma ideia livre.
- Repertório enxuto, com busca por autor/obra/conceito, filtros por categoria e guias breves para conectar referências a argumentos.
- Editor dedicado e amplo, com roteiro lateral, contadores de palavras/caracteres, salvamento automático local durante a digitação, retomada de rascunhos e exportação `.txt`.
- Configurações funcionais de modo claro/escuro, tamanho de texto (padrão, grande ou bem grande) e redução de animações; preferências guardadas neste navegador.
- Prévia lateral da assistente KAZER com exemplo estático identificado como demonstração; nenhuma análise por IA ou chamada à Groq está ativa.
- Menu móvel, diálogos acessíveis, foco visível, ilustrações com animação CSS em perspectiva 3D e atalhos de teclado.
- Crédito visual “Uma iniciativa com apoio da KAZER” no rodapé e nas configurações.

Os temas, referências, métricas e roteiros são **conteúdo demonstrativo**, não material didático validado, avaliação oficial ou correção por IA. Rascunhos e preferências ficam apenas no `localStorage` deste navegador e dispositivo; nada é enviado a um servidor. O modo escuro, os tamanhos de texto e a redução de animações ajudam a adaptar a leitura a cada estudante.

A experiência pública da Redação Paraná serviu como referência de contexto institucional e acessibilidade: [página pública da plataforma](https://redacao.pr.gov.br/) e [orientação de acesso do Governo do Paraná](https://www.educacao.pr.gov.br/servicos/Educacao/Ensino-Fundamental/Acessar-a-plataforma-Redacao-Parana-qJ3gA7on), que documenta opções de contraste e ajuste de texto. Para reduzir ruído visual, o redesenho também considera o princípio de design minimalista da [Nielsen Norman Group](https://www.nngroup.com/articles/aesthetic-minimalist-design/). O editor autenticado da Redação Paraná não foi inspecionado nem reproduzido.

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
