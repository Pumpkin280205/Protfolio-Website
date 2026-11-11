const menuButton = document.querySelector(".hamburger-button");
const navLinks = document.querySelector(".nav-links");

function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", open);
}

menuButton.addEventListener("click", () => {
    setMenu(!navLinks.classList.contains("open"));
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

const themeButton = document.querySelector(".theme-button");
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function readTheme() {
    try {
        const saved = localStorage.getItem("theme");
        return saved === "light" || saved === "dark" ? saved : null;
    } catch {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem("theme", theme);
    } catch {
        // storage blocked: the toggle still works for this visit
    }
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.setAttribute("aria-pressed", theme === "dark");
}

applyTheme(readTheme() ?? (darkQuery.matches ? "dark" : "light"));

themeButton.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
});