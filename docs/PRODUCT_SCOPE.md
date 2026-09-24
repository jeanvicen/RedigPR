# Escopo do produto — RedigPR

## 1. Propósito

Criar um ambiente simples e acolhedor para ajudar estudantes a desenvolver a escrita argumentativa por etapas, com explicações acessíveis, prática orientada e espaço confortável para produzir textos.

A experiência visual de referência inclui princípios públicos de acesso e legibilidade associados à Redação Paraná. A área de escrita autenticada da plataforma não foi inspecionada nem copiada. As telas, temas, exemplos e métricas deste projeto são demonstrativos.

## 2. Fase atual: protótipo interativo no navegador

Esta etapa valida a direção visual e fluxos básicos. Usa HTML, CSS e JavaScript nativos, sem frameworks, servidor próprio, conta de estudante ou chamadas externas.

### Áreas

- **Visão geral:** proposta, atalhos e entrada para a prática.
- **Trilhas:** roteiros didáticos curtos sobre fundamentos, argumentação e conclusão.
- **Repertório:** biblioteca enxuta com busca por autor/obra/conceito, filtros por categoria e guias breves de conexão com argumentos.
- **Meus textos:** editor de redação amplo, exercícios guiados e rascunhos locais.
- **Meu progresso:** painel visual ilustrativo; os indicadores não medem atividades reais.

### Ações funcionais

- Os botões de navegação abrem as cinco áreas, atualizam o título e mantêm o estado selecionado.
- “Novo treino” e Ctrl/⌘ K abrem um seletor de foco e tema; ao iniciar, o estudante chega ao editor amplo com um enunciado contextual.
- Os roteiros das trilhas mostram uma explicação contextual; “Praticar esta etapa” abre um exercício relacionado.
- A busca do repertório aceita autor, obra e conceito; os filtros por categoria refinam a lista. Cada guia apresenta uma estrutura breve para o estudante completar com suas palavras.
- O editor permite criar, retomar, alterar e excluir rascunhos; conta palavras e caracteres, salva alterações localmente durante a digitação e exporta o texto em `.txt`.
- O modo claro/escuro, três tamanhos de texto e a opção de reduzir animações podem ser configurados e persistem localmente.
- O painel lateral da KAZER mostra uma prévia fixa, identificada como exemplo estático; não simula análise nem chama a Groq.
- Ações de configuração, exportação, navegação, exercícios e guias têm efeitos no protótipo; avisos, estatísticas e conteúdos demonstrativos permanecem identificados como tais.

Rascunhos e preferências são armazenados apenas no `localStorage` do navegador e dispositivo em uso. O armazenamento pode ser apagado ao limpar os dados do navegador, não sincroniza entre dispositivos e não é backup. Não há envio de redações para qualquer servidor ou modelo, e **Groq não está conectada**.

## 3. Limites e conteúdo demonstrativo

- Roteiros são apoios didáticos iniciais, não currículo completo ou material validado por docentes.
- Temas e referências são exemplos de interface; a fonte original, o contexto e a pertinência devem ser conferidos.
- O painel de progresso e indicadores de atividade são ilustrações, não dados reais.
- Não há nota, correção, sugestão gerada por IA, conta, sincronização nem garantia de desempenho em prova.
- A indicação “Uma iniciativa com apoio da KAZER” é um crédito visual do protótipo; não implica patrocínio formal ou relação comercial.

## 4. Diretrizes de experiência

- Ensinar o processo: interpretação do tema → tese → argumentos → repertório pertinente → proposta de intervenção → revisão.
- Deixar clara a próxima ação e manter controles úteis, com rótulos discerníveis e fluxos simples.
- Usar texto legível e espaço generoso para escrever, sem exigir que o estudante siga uma fórmula rígida.
- Manter navegação por teclado, foco visível, semântica, contraste, controles de tamanho de texto e funcionamento em celular, tablet e computador.
- Oferecer redução de movimento e respeitar `prefers-reduced-motion`.
- Preservar autoria e explicar onde os textos ficam armazenados e quando seriam enviados.

## 5. Segurança e IA — decisões para fase futura

- A chave da Groq deve existir apenas em ambiente seguro de servidor, nunca no código cliente, em variável pública ou no histórico do Git.
- O navegador deverá conversar com uma API própria que valide entrada, autenticação, limites e autorização antes de chamar o provedor.
- Definir consentimento, retenção, exclusão, minimização de dados e tratamento dos textos antes de qualquer envio de redação a um modelo.
- Integrar a KAZER como painel lateral que transmita sugestões formativas conforme o estudante escreve; qualquer revisão automática deverá ter consentimento explícito, evitar uma chamada por tecla e ser interrompível.
- Exibir feedback como sugestão educacional revisável, sem apresentá-lo como nota oficial ou julgamento definitivo.
- Versionar prompts e testar qualidade, viés, alucinações e segurança antes de liberar para estudantes.

Esses itens são requisitos de planejamento, não funcionalidades existentes. Até a integração segura ser implementada, o assistente deve continuar claramente identificado como planejado e inativo.

## 6. Critérios de aceite

- As cinco áreas abrem pela navegação, por atalhos contextuais e pelo histórico de navegação do navegador.
- Todos os botões visíveis têm ação e nome discernível; filtros e formulários podem ser usados por teclado.
- Exercício guiado abre o editor amplo; rascunhos podem ser salvos automaticamente, retomados, atualizados e excluídos.
- Preferências visuais aplicam-se imediatamente, persistem após recarregar a página e podem ser restauradas.
- Exportação baixa um `.txt` local, sem transmitir o texto.
- Rascunhos não aparecem em requisições de rede; não há chave ou credencial de IA no código cliente.
- Em telas móveis, conteúdo e ações não provocam rolagem horizontal acidental e o editor permanece utilizável.
- Textos informativos permanecem legíveis; animações não essenciais respeitam a preferência de movimento reduzido.
- Conteúdo e métricas demonstrativas não são confundidos com dados reais, avaliação oficial ou IA ativa.

## 7. Próximos marcos propostos

1. Validar fluxos, legibilidade e controles de acessibilidade com estudantes e docentes.
2. Especificar currículo, exemplos, fontes e critérios para feedback.
3. Testar necessidades de salvamento e recuperação antes de decidir sincronização.
4. Definir arquitetura de servidor, privacidade, autenticação e limites de uso.
5. Projetar e avaliar a integração segura com Groq antes de qualquer correção automatizada.
