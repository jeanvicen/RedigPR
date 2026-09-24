# RedigPR

**Escrita com direção.** Uma experiência de aprendizagem para ajudar estudantes a entender, planejar e escrever redações com mais clareza, repertório e segurança.

> **Estado atual:** protótipo visual da primeira etapa. O projeto apresenta telas e navegação demonstrativas; ainda não oferece aulas completas, salvamento de textos, correção automática nem integração com IA.

## Visão do produto

O RedigPR está sendo pensado como um ambiente de prática de redação, com foco em ensinar o processo — não apenas entregar uma nota. A experiência deverá ajudar o estudante a compreender o tema, formular uma tese, construir argumentos, usar repertório com pertinência e revisar o texto.

A integração planejada com modelos da Groq deverá apoiar sugestões personalizadas e feedback formativo. **Ela não está implementada nesta versão.** Toda futura chamada à IA deverá passar por um serviço de servidor; chaves e segredos nunca devem ser expostos no navegador.

## O que existe nesta etapa

- Painel inicial responsivo com uma identidade visual editorial e acolhedora.
- Navegação demonstrativa entre Visão geral, Trilhas, Repertório, Meus textos e Meu progresso.
- Elementos interativos de protótipo, incluindo menu móvel, aviso, diálogo e atalho de teclado.
- Conteúdo e métricas explicitamente identificados como exemplos ilustrativos.
- HTML semântico, estilos adaptáveis, foco visível, suporte a teclado e respeito à preferência por movimento reduzido.

Os textos, referências, trilhas, percentuais e indicadores são **conteúdo de demonstração**, não material didático validado nem dados reais de estudante. Nenhuma redação é enviada, corrigida ou armazenada.

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
    └── styles.css
```

- `index.html`: estrutura semântica das telas do protótipo.
- `src/styles.css`: tokens visuais, componentes, animações e regras responsivas.
- `src/app.js`: navegação e interações locais, sem chamadas de rede.
- `docs/PRODUCT_SCOPE.md`: escopo, limites e próximos marcos de produto.

## Princípios de desenvolvimento

1. **Preservar o escopo:** nesta primeira fase, trabalhar a experiência visual; não simular como prontas funcionalidades de ensino, persistência ou IA.
2. **Manter a interface honesta:** deixar dados fictícios e interações demonstrativas claramente identificados.
3. **Segurança desde o desenho:** nunca colocar tokens, chaves da Groq ou credenciais em HTML, JavaScript entregue ao navegador ou no histórico do Git.
4. **Acessibilidade e responsividade:** manter navegação por teclado, foco perceptível, semântica, contraste e adaptação a telas estreitas; oferecer alternativa a animações não essenciais.
5. **Mudanças pequenas e verificáveis:** revisar o diff, testar as telas principais em tamanhos diferentes e não incluir dependências sem necessidade.
6. **Histórico compreensível:** preferir mensagens de commit no padrão Conventional Commits, por exemplo `feat: adicionar painel demonstrativo` ou `docs: esclarecer escopo do protótipo`.

## Verificação antes de publicar

- Abrir o protótipo em desktop e em largura móvel.
- Percorrer os links, a navegação, o diálogo e o menu usando teclado e toque.
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
