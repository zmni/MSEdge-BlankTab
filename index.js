// Set title
document.title = chrome.i18n.getMessage("tabTitle");

// Set favicon
function updateFavicon(e) {
    let color = e.matches ? "light" : "dark";
    document.querySelector('link[rel="icon"]').href = `icons/tab-${color}.ico`;
    // notify icon updated, only works if newtab page is open.
    chrome.runtime.sendMessage({ message: "update-icon" });
}
const darkModeMQL = window.matchMedia("(prefers-color-scheme: dark)");
darkModeMQL.onchange = updateFavicon;
updateFavicon(darkModeMQL);
