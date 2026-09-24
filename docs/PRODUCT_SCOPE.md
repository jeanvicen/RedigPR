# Escopo do produto — RedigPR

## 1. Propósito

Criar um ambiente digital que ensine estudantes a desenvolver a escrita argumentativa por etapas, com explicações acessíveis, prática orientada e feedback que ajude a entender por que melhorar uma ideia.

A IA poderá apoiar o processo no futuro, sem substituir a autoria do estudante nem a mediação pedagógica.

## 2. Fase atual: protótipo interativo no navegador

Esta etapa valida a direção visual e os fluxos básicos. Usa HTML, CSS e JavaScript nativos, sem frameworks, servidor próprio, conta de estudante ou chamadas externas.

### Áreas

- **Visão geral:** proposta de valor, atalhos e entrada para a prática.
- **Trilhas:** roteiros curtos para fundamentos, argumentação e conclusão.
- **Repertório:** referências demonstrativas, filtro por categoria e guia de conexão com argumentos.
- **Meus textos:** editor local para criar, retomar, editar e excluir rascunhos.
- **Meu progresso:** painel visual ilustrativo; os indicadores não medem atividades reais.

### Ações funcionais

- Os botões de navegação abrem as cinco áreas, atualizam o título e mantêm o estado selecionado.
- “Novo treino” e Ctrl/⌘ K abrem um seletor de foco e tema, seguido de um exercício curto para rascunhar uma tese, argumento, conclusão ou ideia livre.
- Os botões das trilhas mostram um roteiro contextual; a ação de praticar leva ao exercício correspondente.
- Os filtros do repertório exibem referências por categoria. Cada guia mostra uma estrutura para o estudante completar com suas próprias palavras.
- O editor permite criar, alterar e excluir rascunhos, sempre após ação explícita do estudante. Os textos ficam somente no `localStorage` do navegador e dispositivo em uso.
- Avisos e área do estudante explicam o estado demonstrativo e o armazenamento local.

O armazenamento local pode ser removido ao limpar os dados do navegador, não sincroniza entre dispositivos e não é um serviço de backup. O protótipo não envia rascunhos a qualquer servidor ou modelo.

### Limites e conteúdo demonstrativo

- Roteiros são apoios didáticos iniciais, não currículo completo nem material validado por docentes.
- Referências e temas são exemplos de interface; verificar a fonte original, o contexto e a pertinência antes de ensinar como repertório recomendado.
- O painel de progresso e a sequência de dias são ilustrações, não indicadores alimentados por atividade real.
- Não há nota, correção, sugestão gerada por IA, conta, sincronização nem garantia de desempenho em prova.

## 3. Diretrizes de experiência

- Ensinar o processo: interpretação do tema → tese → argumentos → repertório pertinente → proposta de intervenção → revisão.
- Fazer o feedback explicar o que funciona, o que melhorar e por quê, oferecendo um próximo passo claro.
- Tratar diferentes níveis de experiência com respeito, sem prometer nota ou aprovação.
- Manter textos sob controle do estudante e explicar claramente onde ficam armazenados e quando são enviados.
- Funcionar em celular, tablet e computador; preservar navegação por teclado, foco visível, tamanho de texto legível e suporte a `prefers-reduced-motion`.

## 4. Segurança e IA — decisões para uma fase futura

- A chave da Groq deve existir somente em ambiente seguro de servidor, nunca no bundle, em variável pública `VITE_*` ou no navegador.
- O navegador deverá conversar com uma API própria que valide entrada, autenticação, limites e autorização antes de chamar o provedor.
- Definir consentimento, retenção, exclusão, minimização de dados e tratamento dos textos antes de enviar qualquer redação a um modelo.
- Exibir feedback como sugestão educacional revisável; evitar apresentar estimativas de IA como nota oficial ou julgamento definitivo.
- Versionar prompts e testar qualidade, viés, alucinações e segurança antes de liberar para estudantes.

Esses itens são requisitos de planejamento, não funcionalidades existentes.

## 5. Critérios de aceite

- As cinco áreas abrem pela navegação, por atalhos contextuais e pelo histórico de navegação do navegador.
- Todos os botões visíveis têm ação e nome discernível; filtros e formulários podem ser usados por teclado.
- Criar, editar e excluir rascunhos atualiza a lista local somente após confirmação explícita.
- Rascunhos não aparecem em requisições de rede; não há chave ou credencial de IA no código cliente.
- Em larguras móveis, conteúdo e ações não provocam rolagem horizontal acidental.
- Textos informativos permanecem legíveis; animações não essenciais respeitam `prefers-reduced-motion`.
- Conteúdo e métricas ilustrativas não são confundidos com dados reais, avaliação oficial ou IA ativa.

## 6. Próximos marcos propostos

1. Validar os fluxos e a legibilidade com estudantes e docentes.
2. Especificar currículo, exemplos, fontes e rubrica de feedback.
3. Testar o editor e as necessidades de salvamento com estudantes antes de decidir sincronização.
4. Definir arquitetura de servidor, privacidade, autenticação e limites de uso.
5. Projetar e avaliar a integração segura com Groq antes de qualquer correção automatizada.
