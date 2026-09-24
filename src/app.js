const panelNames = {
  inicio: "Visão geral",
  trilhas: "Trilhas",
  repertorio: "Repertório",
  textos: "Meus textos",
  progresso: "Meu progresso",
};

const panels = [...document.querySelectorAll("[data-panel]")];
const viewButtons = [...document.querySelectorAll("[data-view]")];
const pageName = document.querySelector("#page-name");
const sidebar = document.querySelector("#sidebar");
const backdrop = document.querySelector(".mobile-backdrop");
const menuToggle = document.querySelector("[data-action='toggle-menu']");
const dialog = document.querySelector(".prototype-dialog");
const toast = document.querySelector(".toast");
let toastTimer;

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
}

function showView(name) {
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

  pageName.textContent = panelNames[name];
  document.title = `${panelNames[name]} · RedigPR`;
  closeMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function openPrototypeDialog() {
  if (!dialog.open) dialog.showModal();
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
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;

  switch (action) {
    case "toggle-menu":
      sidebar.classList.contains("is-open") ? closeMenu() : openMenu();
      break;
    case "close-menu":
      closeMenu();
      break;
    case "new-session":
    case "open-lesson":
    case "coming-soon":
      openPrototypeDialog();
      break;
    case "close-dialog":
      dialog.close();
      break;
    case "notifications":
      showToast("Nesta etapa, os avisos são apenas demonstrativos.");
      break;
    case "profile":
      showToast("A área do estudante fará parte de uma próxima etapa.");
      break;
    case "explore-trails":
      showView("trilhas");
      break;
    default:
      break;
  }
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openPrototypeDialog();
  }
  if (event.key === "Escape") closeMenu();
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
