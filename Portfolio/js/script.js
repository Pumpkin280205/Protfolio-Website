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

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
});

document.getElementById("year").textContent = new Date().getFullYear();

// Active nav link: the section crossing a thin band near the viewport middle is "current".
const navAnchors = [...navLinks.querySelectorAll("a")];
const sectionEls = [...document.querySelectorAll("main section[id]")];

function setActive(id) {
    navAnchors.forEach((a) => {
        const current = a.getAttribute("href") === `#${id}`;
        a.classList.toggle("active", current);
        if (current) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
    });
}

// At the very bottom (or on a window tall enough to show the whole page) the middle band
// can't reach the last section, so force the last link active.
function atPageBottom() {
    return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
}

const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !atPageBottom()) setActive(entry.target.id);
    });
}, { rootMargin: "-40% 0px -55% 0px" });
sectionEls.forEach((s) => spy.observe(s));

function checkBottom() {
    if (atPageBottom()) setActive(sectionEls[sectionEls.length - 1].id);
}
window.addEventListener("scroll", checkBottom, { passive: true });
window.addEventListener("resize", checkBottom);
checkBottom();

// Scroll reveal: skipped entirely for reduced-motion users, so content is never hidden.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const reveal = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll("main section:not(#home)").forEach((s) => {
        s.classList.add("reveal");
        reveal.observe(s);
    });
}

// Contact form: validate with friendly messages, then open the visitor's email app (mailto).
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const messages = {
    name: { valueMissing: "Please enter your name." },
    email: {
        valueMissing: "Please enter your email address.",
        typeMismatch: "That doesn't look like an email address, e.g. name@example.com.",
    },
    message: { valueMissing: "Please write a message." },
};

function checkField(field) {
    const error = document.getElementById(`${field.id}-error`);
    const key = Object.keys(messages[field.id]).find((k) => field.validity[k]);
    error.textContent = key ? messages[field.id][key] : "";
    field.setAttribute("aria-invalid", Boolean(key));
    return !key;
}

const fields = [...form.querySelectorAll("input, textarea")];
fields.forEach((f) => f.addEventListener("input", () => f.getAttribute("aria-invalid") === "true" && checkField(f)));

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "";
    const invalid = fields.filter((f) => !checkField(f));
    if (invalid.length) {
        invalid[0].focus();
        return;
    }
    const body = `From: ${form.elements.name.value} (${form.elements.email.value})\n\n${form.elements.message.value}`;
    window.location.href = `mailto:anjor.misser@gmail.com?subject=${encodeURIComponent("Portfolio message from " + form.elements.name.value)}&body=${encodeURIComponent(body)}`;
    formStatus.textContent = "Your email app should open with the message ready. If nothing opens, your message is still here: copy it, or email anjor.misser@gmail.com directly.";
});
