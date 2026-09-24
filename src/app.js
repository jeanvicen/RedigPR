const panelNames = {
  inicio: "Visão geral",
  trilhas: "Trilhas",
  repertorio: "Repertório",
  textos: "Meus textos",
  progresso: "Meu progresso",
};

const lessonData = {
  fundamentos: {
    kicker: "TRILHA 01 · PRIMEIROS PASSOS",
    title: "O esqueleto de uma boa redação",
    focus: "tese",
    steps: [
      "Leia o tema e delimite o problema que você quer discutir.",
      "Apresente seu ponto de vista em uma tese clara.",
      "Desenvolva argumentos e conecte cada referência à sua ideia.",
      "Conclua retomando a tese e propondo um próximo passo coerente.",
    ],
    takeaway: "Cada parágrafo precisa cumprir uma função e conversar com a tese.",
  },
  argumentacao: {
    kicker: "TRILHA 02 · DESENVOLVIMENTO",
    title: "Faça seu argumento avançar",
    focus: "argumento",
    steps: [
      "Comece o parágrafo com uma afirmação ligada à sua tese.",
      "Explique por que essa afirmação ajuda a entender o tema.",
      "Use uma referência relevante e explique a conexão — não deixe a citação sozinha.",
      "Feche o parágrafo mostrando como a ideia sustenta seu ponto de vista.",
    ],
    takeaway: "Argumentar é explicar uma relação, não apenas listar uma opinião ou referência.",
  },
  conclusao: {
    kicker: "TRILHA 03 · FECHAMENTO",
    title: "Conclua com uma proposta possível",
    focus: "conclusao",
    steps: [
      "Retome o problema sem copiar a introdução.",
      "Pense em quem pode agir e em uma ação concreta.",
      "Explique como a ação poderia acontecer e o que pretende alcançar.",
      "Confira se a proposta respeita as pessoas afetadas pelo problema.",
    ],
    takeaway: "Uma conclusão forte se conecta à discussão que você desenvolveu no texto.",
  },
};

const referenceData = {
  bauman: {
    kicker: "SOCIOLOGIA · GUIA DE CONEXÃO",
    title: "Zygmunt Bauman: da referência ao argumento",
    idea: "A ideia de modernidade líquida pode ajudar a pensar relações sociais que mudam com rapidez e seus efeitos na vida coletiva.",
    sentence: "A reflexão de Bauman sobre [ideia estudada] ajuda a compreender [recorte do tema], pois [explique a relação com seu argumento].",
  },
  evaristo: {
    kicker: "LITERATURA · GUIA DE CONEXÃO",
    title: "Conceição Evaristo: da leitura à reflexão",
    idea: "A escrevivência aproxima memória, identidade e experiências sociais. Escolha uma obra e confirme o contexto antes de usá-la.",
    sentence: "Na obra [título conferido], Conceição Evaristo aborda [ideia estudada], o que permite relacionar [recorte do tema] a [seu argumento].",
  },
  constituicao: {
    kicker: "CIDADANIA · GUIA DE CONEXÃO",
    title: "Constituição de 1988: direito e realidade",
    idea: "Direitos fundamentais podem servir de referência para discutir cidadania, acesso a direitos e políticas públicas.",
    sentence: "Embora a Constituição reconheça [direito específico], [recorte do problema] mostra um desafio para que esse direito seja efetivado.",
  },
};

const focusLabels = {
  tese: "Defender uma tese",
  argumento: "Desenvolver um argumento",
  conclusao: "Esboçar uma conclusão",
  livre: "Organizar uma ideia livre",
};

const promptTemplates = {
  tese: (topic) => `Leia o tema “${topic}”. Apresente seu ponto de vista e indique dois caminhos de argumentação.`,
  argumento: (topic) => `Pensando no tema “${topic}”, desenvolva uma afirmação e explique por que ela ajuda a compreender o problema.`,
  conclusao: (topic) => `Com base no tema “${topic}”, esboce uma ação, quem poderia realizá-la e o que ela pretende alcançar.`,
  livre: (topic) => `Escolha um recorte do tema “${topic}”, registre sua ideia principal e explique por que ela importa.`,
};

const topicOptions = [
  "Desafios para combater a evasão escolar",
  "Caminhos para ampliar o acesso à cultura",
  "Impactos da desinformação na sociedade",
];

const defaultPreferences = { theme: "light", fontSize: "normal", reduceMotion: false };
const panels = [...document.querySelectorAll("[data-panel]")];
const viewButtons = [...document.querySelectorAll("[data-view]")];
const pageName = document.querySelector("#page-name");
const sidebar = document.querySelector("#sidebar");
const backdrop = document.querySelector(".mobile-backdrop");
const menuToggle = document.querySelector("[data-action='toggle-menu']");
const dialog = document.querySelector(".prototype-dialog");
const dialogContent = document.querySelector("#dialog-content");
const toast = document.querySelector(".toast");
const draftList = document.querySelector("#draft-list");
const emptyWriting = document.querySelector("#empty-writing");
const draftHeader = document.querySelector("#draft-header");
const textosOverview = document.querySelector("#textos-overview");
const writingWorkspace = document.querySelector("#writing-workspace");
const writingForm = document.querySelector("#full-writing-form");
const essayTitle = document.querySelector("#essay-title");
const essayBody = document.querySelector("#essay-body");
const editorSaveStatus = document.querySelector("#editor-save-status");
let toastTimer;
let saveTimer;
let currentView = "inicio";
let drafts = loadDrafts();
let preferences = loadPreferences();
let editorState = null;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function loadDrafts() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("redigpr.drafts.v1") || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter((draft) => draft && typeof draft.id === "string" && typeof draft.text === "string");
  } catch {
    return [];
  }
}

function persistDrafts(nextDrafts) {
  try {
    window.localStorage.setItem("redigpr.drafts.v1", JSON.stringify(nextDrafts));
    return true;
  } catch {
    showToast("Não consegui salvar neste navegador. Copie seu texto antes de sair.");
    return false;
  }
}

function loadPreferences() {
  try {
    const stored = JSON.parse(window.localStorage.getItem("redigpr.preferences.v1") || "{}");
    return {
      theme: stored.theme === "dark" ? "dark" : "light",
      fontSize: ["normal", "large", "xlarge"].includes(stored.fontSize) ? stored.fontSize : "normal",
      reduceMotion: stored.reduceMotion === true,
    };
  } catch {
    return { ...defaultPreferences };
  }
}

function savePreferences() {
  try {
    window.localStorage.setItem("redigpr.preferences.v1", JSON.stringify(preferences));
    return true;
  } catch {
    showToast("A preferência foi aplicada, mas não pôde ser guardada neste navegador.");
    return false;
  }
}

function applyPreferences() {
  const root = document.documentElement;
  root.dataset.theme = preferences.theme;
  root.dataset.fontSize = preferences.fontSize;
  root.dataset.reduceMotion = String(preferences.reduceMotion);
  document.querySelector('meta[name="theme-color"]').content = preferences.theme === "dark" ? "#151d18" : "#f5f4ee";
}

function closeMenu() {
  sidebar.classList.remove("is-open");
  backdrop.classList.remove("is-visible");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

function openMenu() {
  sidebar.classList.add("is-open");
  backdrop.classList.add("is-visible");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Fechar menu");
  sidebar.querySelector("[aria-current='page']")?.focus();
}

function closeWritingWorkspace() {
  writingWorkspace.hidden = true;
  textosOverview.hidden = false;
  editorState = null;
  window.clearTimeout(saveTimer);
}

function showView(name, { updateHistory = true } = {}) {
  if (!panelNames[name]) return;

  if (!writingWorkspace.hidden) {
    window.clearTimeout(saveTimer);
    const hasText = essayBody.value.trim().length > 0;
    if (hasText && !saveCurrentDraft({ showMessage: false })) return;
    closeWritingWorkspace();
  }

  for (const panel of panels) {
    const isCurrent = panel.dataset.panel === name;
    panel.hidden = !isCurrent;
    panel.classList.toggle("is-visible", isCurrent);
  }

  for (const button of viewButtons) {
    const isCurrent = button.dataset.view === name;
    button.classList.toggle("is-active", isCurrent);
    if (isCurrent) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  }

  currentView = name;
  pageName.textContent = panelNames[name];
  document.title = `${panelNames[name]} · RedigPR`;
  closeMenu();
  if (dialog.open) dialog.close();
  if (updateHistory) {
    const target = name === "inicio" ? `${location.pathname}${location.search}` : `#${name}`;
    if (location.hash !== (name === "inicio" ? "" : `#${name}`)) history.pushState({ view: name }, "", target);
  }
  const reduced = preferences.reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

function showDialog(kicker, title, body, { focus = null } = {}) {
  dialogContent.innerHTML = `<p class="eyebrow eyebrow-muted">${escapeHTML(kicker)}</p><h2 id="dialog-title">${escapeHTML(title)}</h2><div class="dialog-copy">${body}</div>`;
  if (!dialog.open) dialog.showModal();
  window.requestAnimationFrame(() => {
    const focusTarget = focus ? dialog.querySelector(focus) : dialog.querySelector("input, select, textarea, button:not(.dialog-close)");
    focusTarget?.focus();
  });
}

function openPracticeSetup(selectedFocus = "tese") {
  const options = Object.entries(focusLabels).map(([value, label]) =>
    `<option value="${value}"${value === selectedFocus ? " selected" : ""}>${escapeHTML(label)}</option>`
  ).join("");
  const topics = topicOptions.map((topic) => `<option value="${escapeHTML(topic)}">${escapeHTML(topic)}</option>`).join("");
  showDialog("TREINO GUIADO · SEU RITMO", "Escolha seu próximo passo.", `
    <p>Selecione um foco e um tema. O editor abre em seguida, com bastante espaço para escrever.</p>
    <form class="dialog-form" id="practice-setup">
      <label for="practice-focus">O que quer praticar?</label>
      <select id="practice-focus" name="focus">${options}</select>
      <label for="practice-topic">Tema para começar</label>
      <select id="practice-topic" name="topic">${topics}</select>
      <p class="form-hint">Temas de demonstração — adapte o recorte e confira as informações antes de usar numa redação.</p>
      <div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Agora não</button><button class="button button-dark" type="submit">Abrir editor <span aria-hidden="true">→</span></button></div>
    </form>`, { focus: "#practice-focus" });
}

function openLesson(lessonKey) {
  const lesson = lessonData[lessonKey] || lessonData.fundamentos;
  const steps = lesson.steps.map((step) => `<li>${escapeHTML(step)}</li>`).join("");
  showDialog(lesson.kicker, lesson.title, `
    <p>Use este roteiro como apoio, não como fórmula pronta. Tente explicar cada ideia com suas próprias palavras.</p>
    <ol class="lesson-steps">${steps}</ol>
    <div class="lesson-takeaway"><strong>Para levar com você</strong><p>${escapeHTML(lesson.takeaway)}</p></div>
    <div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Fechar</button><button class="button button-dark" type="button" data-action="start-practice" data-focus="${lesson.focus}">Praticar esta etapa <span aria-hidden="true">→</span></button></div>`);
}

function openReference(referenceKey) {
  const reference = referenceData[referenceKey];
  if (!reference) return;
  showDialog(reference.kicker, reference.title, `
    <p>${escapeHTML(reference.idea)}</p>
    <div class="lesson-takeaway"><strong>Complete com suas palavras</strong><blockquote>${escapeHTML(reference.sentence)}</blockquote></div>
    <p class="form-hint">Guia de escrita ilustrativo, não uma citação literal. Confira a obra ou a fonte original antes de usar a referência.</p>
    <div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Voltar ao repertório</button><button class="button button-dark" type="button" data-action="start-practice" data-focus="argumento">Usar num exercício <span aria-hidden="true">→</span></button></div>`);
}

function openWritingEditor(draftId = "", exercise = null) {
  const draft = drafts.find((item) => item.id === draftId);
  if (!writingWorkspace.hidden) {
    window.clearTimeout(saveTimer);
    if (essayBody.value.trim() && !saveCurrentDraft({ showMessage: false })) return;
    closeWritingWorkspace();
  }
  if (currentView !== "textos") showView("textos");
  if (dialog.open) dialog.close();
  editorState = { draftId: draft?.id || "", exercise };
  textosOverview.hidden = true;
  writingWorkspace.hidden = false;
  document.querySelector("#page-name").textContent = "Escrever redação";
  document.title = "Escrever redação · RedigPR";
  document.querySelector("#writing-title").textContent = draft ? "Continue desenvolvendo sua ideia." : "Escreva no seu ritmo.";
  document.querySelector("#exercise-banner").hidden = !exercise;
  document.querySelector("#exercise-prompt").textContent = exercise ? promptTemplates[exercise.focus](exercise.topic) : "";
  essayTitle.value = draft?.title || (exercise ? `${focusLabels[exercise.focus]} · ${exercise.topic}` : "");
  essayBody.value = draft?.text || "";
  editorSaveStatus.textContent = draft ? `Rascunho salvo · ${formatTime(draft.updatedAt)}` : "Comece quando quiser — salve só neste dispositivo.";
  updateEditorCounts();
  window.scrollTo({ top: 0, behavior: preferences.reduceMotion ? "auto" : "smooth" });
  window.requestAnimationFrame(() => essayBody.focus());
}

function formatTime(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.valueOf())) return "neste dispositivo";
  return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(date);
}

function renderDrafts() {
  if (!draftList) return;
  draftList.replaceChildren();
  const hasDrafts = drafts.length > 0;
  emptyWriting.hidden = hasDrafts;
  draftHeader.hidden = !hasDrafts;
  document.querySelector("#draft-count").textContent = String(drafts.length);

  for (const draft of drafts) {
    const card = document.createElement("article");
    card.className = "draft-card";
    const copy = document.createElement("div");
    copy.className = "draft-card-copy";
    const meta = document.createElement("span");
    meta.className = "card-kicker";
    const updated = draft.updatedAt ? new Date(draft.updatedAt) : null;
    const dateText = updated && !Number.isNaN(updated.valueOf())
      ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(updated)
      : "data não disponível";
    meta.textContent = `ATUALIZADO · ${dateText}`;
    const title = document.createElement("h3");
    title.textContent = draft.title || "Rascunho sem título";
    const excerpt = document.createElement("p");
    excerpt.textContent = draft.text.length > 180 ? `${draft.text.slice(0, 180)}…` : draft.text;
    copy.append(meta, title, excerpt);
    const actions = document.createElement("div");
    actions.className = "draft-card-actions";
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "button button-outline";
    editButton.dataset.action = "edit-draft";
    editButton.dataset.draftId = draft.id;
    editButton.textContent = "Continuar escrevendo";
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-draft";
    deleteButton.dataset.action = "delete-draft";
    deleteButton.dataset.draftId = draft.id;
    deleteButton.textContent = "Excluir";
    actions.append(editButton, deleteButton);
    card.append(copy, actions);
    draftList.append(card);
  }
}

function updateEditorCounts() {
  const text = essayBody.value;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  document.querySelector("#editor-word-count").textContent = `${words} ${words === 1 ? "palavra" : "palavras"}`;
  document.querySelector("#editor-char-count").textContent = `${text.length.toLocaleString("pt-BR")} caracteres`;
}

function saveCurrentDraft({ showMessage = true } = {}) {
  if (!editorState) return false;
  const text = essayBody.value;
  if (!text.trim()) {
    editorSaveStatus.textContent = "Escreva uma parte do texto antes de salvar.";
    if (showMessage) showToast("Escreva alguma coisa antes de salvar o rascunho.");
    return false;
  }

  const now = new Date().toISOString();
  const existing = drafts.find((draft) => draft.id === editorState.draftId);
  const inferredTitle = essayTitle.value.trim() || text.trim().split(/\s+/).slice(0, 7).join(" ");
  const savedDraft = {
    id: existing?.id || (window.crypto?.randomUUID ? window.crypto.randomUUID() : `draft-${Date.now()}-${Math.random().toString(16).slice(2)}`),
    title: inferredTitle,
    text,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
  const nextDrafts = existing
    ? drafts.map((draft) => draft.id === existing.id ? savedDraft : draft)
    : [savedDraft, ...drafts];
  if (!persistDrafts(nextDrafts)) {
    editorSaveStatus.textContent = "Não foi possível salvar. Copie o texto antes de sair.";
    return false;
  }

  drafts = nextDrafts;
  editorState.draftId = savedDraft.id;
  essayTitle.value = savedDraft.title;
  editorSaveStatus.textContent = `Salvo neste dispositivo · ${formatTime(savedDraft.updatedAt)}`;
  renderDrafts();
  if (showMessage) showToast("Rascunho salvo neste dispositivo.");
  return true;
}

function scheduleEditorSave() {
  updateEditorCounts();
  if (!essayBody.value.trim()) {
    editorSaveStatus.textContent = "Seu texto ainda está vazio. Nada foi salvo.";
    window.clearTimeout(saveTimer);
    return;
  }
  editorSaveStatus.textContent = "Alterações não salvas";
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => saveCurrentDraft({ showMessage: false }), 900);
}

function exportCurrentDraft() {
  const text = essayBody.value.trim();
  if (!text) {
    showToast("Escreva alguma parte da redação antes de baixar o arquivo.");
    return;
  }
  const title = essayTitle.value.trim() || "Minha redação";
  const content = `${title}\n\n${text}`;
  const file = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.toLocaleLowerCase("pt-BR").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "redacao"}.txt`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("Arquivo .txt baixado no seu dispositivo.");
}

function confirmDeleteDraft(draftId) {
  const draft = drafts.find((item) => item.id === draftId);
  if (!draft) return;
  showDialog("REMOVER RASCUNHO", "Quer excluir este texto?", `
    <p>“${escapeHTML(draft.title)}” será removido do armazenamento deste navegador. Esta ação não pode ser desfeita.</p>
    <div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Manter rascunho</button><button class="button button-danger" type="button" data-action="confirm-delete" data-draft-id="${escapeHTML(draft.id)}">Excluir rascunho</button></div>`);
}

function deleteDraft(draftId) {
  const nextDrafts = drafts.filter((draft) => draft.id !== draftId);
  if (nextDrafts.length === drafts.length) return;
  if (!persistDrafts(nextDrafts)) return;
  drafts = nextDrafts;
  renderDrafts();
  dialog.close();
  showToast("Rascunho excluído.");
}

function updateReferenceFilter(category) {
  const cards = [...document.querySelectorAll(".reference-card[data-category]")];
  let visibleCount = 0;
  for (const card of cards) {
    const visible = category === "todos" || card.dataset.category === category;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  }
  for (const button of document.querySelectorAll("[data-filter]")) {
    const active = button.dataset.filter === category;
    button.classList.toggle("selected", active);
    button.setAttribute("aria-pressed", String(active));
  }
  document.querySelector("#filter-empty").hidden = visibleCount > 0;
  document.querySelector(".reference-grid").hidden = visibleCount === 0;
}

function openProfile() {
  showDialog("ÁREA DO ESTUDANTE · MODO LOCAL", "Seu espaço de escrita.", `
    <p>Este protótipo não tem cadastro. Seus rascunhos ficam no armazenamento deste navegador${drafts.length ? `; você tem ${drafts.length} ${drafts.length === 1 ? "rascunho" : "rascunhos"}` : " e só aparecem neste dispositivo"}.</p>
    <div class="dialog-actions"><button class="button button-outline" type="button" data-action="settings">Configurar leitura</button><button class="button button-dark" type="button" data-go="textos">Abrir meus textos <span aria-hidden="true">→</span></button></div>`);
}

function openNotifications() {
  showDialog("AVISOS", "Tudo em dia por aqui.", `
    <p>Você não tem avisos novos. Quando esta área evoluir, ela poderá reunir lembretes de prática e novidades importantes.</p>
    <div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Fechar</button><button class="button button-dark" type="button" data-action="new-session">Começar um treino <span aria-hidden="true">→</span></button></div>`);
}

function openAiInfo() {
  showDialog("ASSISTENTE DE ESCRITA · GROQ", "Ajuda para pensar melhor, não para escrever por você.", `
    <p>A proposta é que a IA ajude a revisar uma tese, explorar caminhos de argumento e dar sugestões explicadas. A integração segura com a Groq ainda não está conectada; por enquanto, este painel não lê nem envia seu texto.</p>
    <div class="lesson-takeaway"><strong>Quando estiver disponível</strong><p>Você poderá revisar cada sugestão e decidir se faz sentido para a sua redação. A autoria continua sendo sua.</p></div>
    <div class="dialog-actions"><button class="button button-dark" type="button" data-action="close-dialog">Entendi</button></div>`);
}

function openSettings() {
  const checked = (value) => preferences.theme === value ? "checked" : "";
  showDialog("PERSONALIZE SUA EXPERIÊNCIA", "Deixe o espaço mais confortável.", `
    <form class="settings-form" id="settings-form">
      <fieldset class="settings-fieldset"><legend>Modo de exibição</legend><label class="settings-choice"><input type="radio" name="theme" value="light" ${checked("light")}><span>Claro</span></label><label class="settings-choice"><input type="radio" name="theme" value="dark" ${checked("dark")}><span>Escuro</span></label></fieldset>
      <label class="settings-label" for="font-size-setting">Tamanho das letras</label>
      <select class="settings-select" id="font-size-setting" name="fontSize"><option value="normal" ${preferences.fontSize === "normal" ? "selected" : ""}>Padrão</option><option value="large" ${preferences.fontSize === "large" ? "selected" : ""}>Grande</option><option value="xlarge" ${preferences.fontSize === "xlarge" ? "selected" : ""}>Bem grande</option></select>
      <label class="settings-toggle"><input type="checkbox" name="reduceMotion" ${preferences.reduceMotion ? "checked" : ""}><span>Reduzir animações</span></label>
      <section class="settings-feature"><span class="card-kicker">ASSISTENTE DE ESCRITA</span><h3>IA por Groq</h3><p>Planejada para sugerir caminhos e explicar melhorias. Ainda não conectada; nada é enviado para IA nesta versão.</p><button class="text-link" type="button" data-action="ai-info">Ver como funcionará <span aria-hidden="true">→</span></button></section>
      <section class="settings-credit"><span class="settings-credit-mark" aria-hidden="true">K</span><div><span class="card-kicker">APOIO AO PROJETO</span><strong>KAZER</strong><p>Uma iniciativa RedigPR com apoio da KAZER.</p></div></section>
      <div class="dialog-actions"><button class="button button-outline" type="button" data-action="reset-settings">Restaurar padrão</button><button class="button button-dark" type="button" data-action="close-dialog">Concluir</button></div>
    </form>`, { focus: "input[name='theme']" });
}

function resetSettings() {
  preferences = { ...defaultPreferences };
  applyPreferences();
  savePreferences();
  openSettings();
  showToast("Preferências restauradas.");
}

applyPreferences();

for (const button of viewButtons) {
  button.addEventListener("click", () => showView(button.dataset.view));
}

for (const link of document.querySelectorAll("[data-view-link]")) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showView(link.dataset.viewLink);
  });
}

for (const link of document.querySelectorAll("[data-go]")) {
  link.addEventListener("click", () => showView(link.dataset.go));
}

document.addEventListener("click", (event) => {
  const control = event.target.closest("[data-action], [data-filter]");
  if (!control) return;

  if (control.matches("[data-filter]")) {
    updateReferenceFilter(control.dataset.filter);
    return;
  }

  switch (control.dataset.action) {
    case "toggle-menu":
      sidebar.classList.contains("is-open") ? closeMenu() : openMenu();
      break;
    case "close-menu":
      closeMenu();
      break;
    case "new-session":
      openPracticeSetup();
      break;
    case "open-lesson":
      openLesson(control.dataset.lesson || "fundamentos");
      break;
    case "start-practice":
      openPracticeSetup(control.dataset.focus || "tese");
      break;
    case "reference-detail":
      openReference(control.dataset.reference);
      break;
    case "create-text":
      openWritingEditor();
      break;
    case "edit-draft":
      openWritingEditor(control.dataset.draftId);
      break;
    case "delete-draft":
      confirmDeleteDraft(control.dataset.draftId);
      break;
    case "confirm-delete":
      deleteDraft(control.dataset.draftId);
      break;
    case "close-dialog":
      dialog.close();
      break;
    case "notifications":
      openNotifications();
      break;
    case "profile":
      openProfile();
      break;
    case "settings":
      openSettings();
      break;
    case "reset-settings":
      resetSettings();
      break;
    case "ai-info":
      openAiInfo();
      break;
    case "explore-trails":
      showView("trilhas");
      break;
    case "back-to-texts":
      if (essayBody.value.trim()) saveCurrentDraft({ showMessage: false });
      if (!essayBody.value.trim() || editorState?.draftId) showView("textos");
      break;
    case "export-draft":
      exportCurrentDraft();
      break;
    default:
      break;
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (form.id === "practice-setup") {
    event.preventDefault();
    const context = { focus: form.elements.focus.value, topic: form.elements.topic.value };
    openWritingEditor("", context);
    return;
  }

  if (form.id === "full-writing-form") {
    event.preventDefault();
    saveCurrentDraft();
  }
});

document.addEventListener("input", (event) => {
  if (!writingWorkspace.hidden && (event.target === essayBody || event.target === essayTitle)) {
    scheduleEditorSave();
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (target.form?.id !== "settings-form") return;
  if (target.name === "theme") preferences.theme = target.value;
  if (target.name === "fontSize") preferences.fontSize = target.value;
  if (target.name === "reduceMotion") preferences.reduceMotion = target.checked;
  applyPreferences();
  savePreferences();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openPracticeSetup();
  }
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("popstate", () => {
  const requestedView = location.hash.slice(1) || "inicio";
  showView(requestedView, { updateHistory: false });
});

const dateLabel = document.querySelector("#current-date");
if (dateLabel) {
  const today = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date());
  dateLabel.textContent = today.toLocaleUpperCase("pt-BR");
}

renderDrafts();
showView(panelNames[location.hash.slice(1)] ? location.hash.slice(1) : "inicio", { updateHistory: false });
