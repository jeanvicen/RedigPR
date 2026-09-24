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

const topicOptions = [
  "Desafios para combater a evasão escolar",
  "Caminhos para ampliar o acesso à cultura",
  "Impactos da desinformação na sociedade",
];

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
let toastTimer;
let currentView = "inicio";
let drafts = loadDrafts();

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
    showToast("Não consegui guardar neste navegador. Copie seu texto antes de sair.");
    return false;
  }
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

function showView(name, { updateHistory = true } = {}) {
  if (!panelNames[name]) return;

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
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  showDialog("TREINO GUIADO · RASCUNHO LOCAL", "Escolha seu próximo passo.", `
    <p>Selecione um foco e um tema. Vou abrir uma atividade curta para você praticar — sem nota automática ou envio para IA.</p>
    <form class="dialog-form" id="practice-setup">
      <label for="practice-focus">O que quer praticar?</label>
      <select id="practice-focus" name="focus">${options}</select>
      <label for="practice-topic">Tema para começar</label>
      <select id="practice-topic" name="topic">${topics}</select>
      <p class="form-hint">Temas demonstrativos: adapte o recorte e confira informações antes de usar em uma redação.</p>
      <div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Agora não</button><button class="button button-dark" type="submit">Abrir exercício <span aria-hidden="true">→</span></button></div>
    </form>`, { focus: "#practice-focus" });
}

function openExercise(focus, topic) {
  const prompts = {
    tese: `Leia o tema “${topic}”. Escreva uma frase que apresente seu ponto de vista e indique dois caminhos de argumentação.`,
    argumento: `Pensando no tema “${topic}”, escreva uma afirmação e explique por que ela ajuda a compreender o problema.`,
    conclusao: `Com base no tema “${topic}”, esboce uma ação, quem poderia realizá-la e o que ela pretende alcançar.`,
    livre: `Escolha um recorte do tema “${topic}” e registre sua ideia principal. Depois, explique por que ela importa.`,
  };
  const safeTopic = escapeHTML(topic);
  showDialog("EXERCÍCIO · SEM CORREÇÃO AUTOMÁTICA", focusLabels[focus] || focusLabels.livre, `
    <p>${escapeHTML(prompts[focus] || prompts.livre)}</p>
    <form class="dialog-form" id="practice-response" data-focus="${escapeHTML(focus)}" data-topic="${safeTopic}">
      <label for="practice-answer">Seu rascunho</label>
      <textarea id="practice-answer" name="text" rows="6" maxlength="1200" required placeholder="Escreva com suas palavras. Uma primeira versão não precisa ficar perfeita."></textarea>
      <div class="form-meta"><span>Até 1.200 caracteres</span><span id="practice-counter">0 / 1.200</span></div>
      <p class="form-hint">Seu texto só será guardado neste navegador se você escolher salvá-lo. Nenhuma IA vai avaliá-lo.</p>
      <div class="dialog-actions"><button class="button button-outline" type="button" data-action="back-to-setup" data-focus="${escapeHTML(focus)}">Voltar</button><button class="button button-dark" type="submit">Guardar rascunho <span aria-hidden="true">→</span></button></div>
    </form>`, { focus: "#practice-answer" });
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

function openTextEditor(draftId = "") {
  const draft = drafts.find((item) => item.id === draftId);
  showDialog(draft ? "RASCUNHO · EDIÇÃO LOCAL" : "NOVO RASCUNHO · SOMENTE NESTE NAVEGADOR", draft ? "Continue desenvolvendo sua ideia." : "Comece pela ideia que importa.", `
    <form class="dialog-form" id="writing-form">
      <label for="draft-title-input">Título do rascunho</label>
      <input id="draft-title-input" name="title" maxlength="90" placeholder="Opcional · Ex.: Acesso à cultura nas cidades" />
      <label for="draft-text-input">Seu texto</label>
      <textarea id="draft-text-input" name="text" rows="9" maxlength="10000" required placeholder="Organize suas ideias aqui. Você poderá revisar e continuar depois."></textarea>
      <p class="form-hint">O rascunho fica salvo neste navegador e neste dispositivo. Não há conta, sincronização nem envio para IA.</p>
      <div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Cancelar</button><button class="button button-dark" type="submit">Salvar neste navegador <span aria-hidden="true">→</span></button></div>
    </form>`, { focus: "#draft-title-input" });
  const form = dialog.querySelector("#writing-form");
  form.dataset.draftId = draft?.id || "";
  if (draft) {
    form.elements.title.value = draft.title;
    form.elements.text.value = draft.text;
  }
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

function saveDraft({ title, text, id = "" }) {
  const trimmedText = text.trim();
  if (!trimmedText) return;
  const now = new Date().toISOString();
  const existing = drafts.find((draft) => draft.id === id);
  const inferredTitle = title.trim() || trimmedText.split(/\s+/).slice(0, 7).join(" ");
  const nextDraft = {
    id: existing?.id || (window.crypto?.randomUUID ? window.crypto.randomUUID() : `draft-${Date.now()}-${Math.random().toString(16).slice(2)}`),
    title: inferredTitle,
    text: trimmedText,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
  const nextDrafts = existing ? drafts.map((draft) => draft.id === existing.id ? nextDraft : draft) : [nextDraft, ...drafts];
  if (!persistDrafts(nextDrafts)) return;
  drafts = nextDrafts;
  renderDrafts();
  dialog.close();
  showView("textos");
  showToast("Rascunho guardado neste navegador. Você pode continuar quando quiser.");
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
    <div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Fechar</button><button class="button button-dark" type="button" data-go="textos">Abrir meus textos <span aria-hidden="true">→</span></button></div>`);
}

function openNotifications() {
  showDialog("AVISOS", "Tudo em dia por aqui.", `
    <p>Você não tem avisos novos. Quando esta área evoluir, ela poderá reunir lembretes de prática e novidades importantes.</p>
    <div class="dialog-actions"><button class="button button-outline" type="button" data-action="close-dialog">Fechar</button><button class="button button-dark" type="button" data-action="new-session">Começar um treino <span aria-hidden="true">→</span></button></div>`);
}

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
    case "back-to-setup": {
      const selectedFocus = control.dataset.focus || "tese";
      openPracticeSetup(selectedFocus);
      break;
    }
    case "reference-detail":
      openReference(control.dataset.reference);
      break;
    case "create-text":
      openTextEditor();
      break;
    case "edit-draft":
      openTextEditor(control.dataset.draftId);
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
    case "explore-trails":
      showView("trilhas");
      break;
    default:
      break;
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (form.id === "practice-setup") {
    event.preventDefault();
    openExercise(form.elements.focus.value, form.elements.topic.value);
    return;
  }

  if (form.id === "practice-response") {
    event.preventDefault();
    const topic = form.dataset.topic;
    const focus = focusLabels[form.dataset.focus] || "Treino de redação";
    saveDraft({ title: `${focus} · ${topic}`, text: form.elements.text.value });
    return;
  }

  if (form.id === "writing-form") {
    event.preventDefault();
    saveDraft({ title: form.elements.title.value, text: form.elements.text.value, id: form.dataset.draftId });
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "practice-answer") {
    document.querySelector("#practice-counter").textContent = `${event.target.value.length} / 1.200`;
  }
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
