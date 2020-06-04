// Set title
document.title = chrome.i18n.getMessage("tabTitle");

// Set favicon
function updateFavicon(e) {
    let type = e.matches ? "light" : "dark";
    document.querySelector('link[rel="shortcut icon"]').href = `icons/tab-${type}-16.png`;
    // send the message
    chrome.runtime.sendMessage({ message: "update-icon" }); // only works if this page is open, but still, better than nothing.
}
let darkModeMql = window.matchMedia("(prefers-color-scheme: dark)");
darkModeMql.addListener(updateFavicon);
darkModeMql.onchange = updateFavicon;
updateFavicon(darkModeMql);
