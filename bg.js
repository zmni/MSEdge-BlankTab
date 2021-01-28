// Copied from https://github.com/einaregilsson/Redirector/blob/master/js/background.js

function isDarkMode() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function setIcon(image) {
    let data = {
        path: {},
    };

    for (let size of [16, 32, 48, 128]) {
        data.path[size] = `icons/${image}-${size}.png`;
    }

    chrome.browserAction.setIcon(data);
}

function updateIcon() {
    if (isDarkMode()) {
        setIcon("tab-light");
    } else {
        setIcon("tab-dark");
    }
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.message === "update-icon") {
        updateIcon();
    } else {
        return false;
    }
    // Tells the browser to keep sendResponse alive because we're sending
    // the response asynchronously.
    return true;
});

// 1st
updateIcon();

// Set dark/light icon...
chrome.runtime.onStartup.addListener(() => {
    updateIcon();
});
