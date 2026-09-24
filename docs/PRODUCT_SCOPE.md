# Escopo do produto — RedigPR

## 1. Propósito

Criar um ambiente digital de aprendizagem que ajude estudantes a desenvolver a escrita argumentativa por etapas, com explicações acessíveis, prática orientada e feedback que ensine o motivo de cada sugestão.

A IA é uma possibilidade de apoio ao processo, não um substituto para a autoria do estudante nem para a mediação pedagógica.

## 2. Fase atual: protótipo visual

Esta entrega valida a direção de interface e o mapa inicial do produto. Usa HTML, CSS e JavaScript nativos, sem dependências de terceiros, servidor, autenticação, banco de dados ou chamadas externas.

### Telas desenhadas

- **Visão geral:** entrada do estudante, proposta de valor, atalhos e prévia de uma trilha.
- **Trilhas:** organização visual de fundamentos, argumentação e conclusão.
- **Repertório:** exemplos de referências organizadas por categoria, sem alegação de curadoria didática já concluída.
- **Meus textos:** estado vazio que antecipa o futuro caderno de escrita.
- **Meu progresso:** prévia ilustrativa de acompanhamento, não vinculada a atividade real.

### Interações disponíveis

Navegação local entre telas, abertura e fechamento do menu móvel e do diálogo demonstrativo, aviso temporário e atalho Ctrl/⌘ K. Essas interações existem para apresentar a interface; não iniciam uma aula, salvam texto, registram progresso, filtram referências ou chamam uma IA.

### Fora do escopo desta entrega

- Conteúdo didático completo ou orientação oficial sobre critérios de exame.
- Editor de redação, persistência, conta de estudante ou sincronização.
- Nota, correção, geração de argumentos ou sugestão produzida por IA.
- Integração com a Groq, proxy de servidor, cobrança ou analytics.
- Alegação de que as referências e citações de exemplo estão verificadas ou recomendadas para qualquer tema.

Todo dado demonstrativo deve permanecer rotulado como tal. Exemplos de repertório são apenas texto de interface; antes de virarem material de estudo, suas informações precisam ser verificadas e contextualizadas.

## 3. Diretrizes de experiência

- Ensinar o processo: interpretação do tema → tese → argumentos → repertório pertinente → proposta de intervenção → revisão.
- Fazer o feedback explicar o que funciona, o que melhorar e por que, oferecendo um próximo passo claro.
- Tratar diferentes níveis de experiência com linguagem respeitosa e sem prometer nota ou aprovação.
- Manter textos e rascunhos sob controle do estudante, com transparência sobre armazenamento e uso de dados.
- Funcionar bem em celular, tablet e computador, com alternativas por teclado e respeito à redução de movimento.

## 4. Segurança e IA — decisões para uma fase futura

- A chave da Groq deve existir somente em ambiente seguro de servidor, nunca no bundle, em variável `VITE_*` pública ou no navegador.
- O navegador deverá conversar com uma API própria que valide entrada, autenticação, limites e autorização antes de chamar o provedor.
- Definir consentimento, retenção, exclusão, minimização de dados e tratamento dos textos antes de enviar qualquer redação a um modelo.
- Exibir feedback como sugestão educacional revisável; evitar apresentar estimativas de IA como nota oficial ou julgamento definitivo.
- Registrar versões dos prompts e testar a qualidade, viés, alucinações e segurança das saídas antes de liberar para estudantes.

Esses itens são requisitos de planejamento, não funcionalidades existentes.

## 5. Critérios de aceite visual

- As cinco telas previstas podem ser abertas pela navegação e cada estado tem título identificável.
- O menu e o layout se adaptam a telas móveis, sem rolagem horizontal acidental.
- Links e botões têm finalidade discernível, foco visível e interação por teclado.
- Animações não essenciais respeitam `prefers-reduced-motion`.
- Conteúdo fictício, estados vazios e funcionalidades futuras não são confundidos com serviços ativos.
- A aplicação é carregada sem frameworks ou chamadas de rede externas nesta fase.

## 6. Próximos marcos propostos

1. Revisar a interface com estudantes e docentes e ajustar navegação e linguagem.
2. Especificar currículo, exemplos, fontes e rubrica de feedback.
3. Desenhar protótipos do editor, orientação por etapa e revisão assistida.
4. Definir arquitetura de servidor, privacidade, autenticação e limites de uso.
5. Implementar e testar uma funcionalidade vertical por vez, começando por uma prática de redação sem nota automática.
