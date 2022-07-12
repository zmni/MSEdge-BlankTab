// Set title
document.title = chrome.i18n.getMessage("tabTitle");

// Set favicon
function updateFavicon(e) {
    const color = e.matches ? "light" : "dark";
    document.querySelector('link[rel="icon"]').href = `icons/favicons/${color}.ico`;
}
const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
darkMode.addEventListener("change", updateFavicon);
updateFavicon(darkMode);
