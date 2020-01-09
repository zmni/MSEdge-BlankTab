// Copied from https://github.com/einaregilsson/Redirector/blob/master/js/background.js

function isDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function setIcon(image) {
    var data = {
        path: {}
    };

    for (let size of [16, 32, 48, 64, 128]) {
        data.path[size] = `icons/${image}-${size}.png`;
    }

    chrome.browserAction.setIcon(data);
}

function updateIcon() {
    chrome.storage.local.get({ disabled: false }, function () {
        if (isDarkMode()) {
            setIcon('tab-light');
        } else {
            setIcon('tab-dark');
        }
    });
}

// Monitor changes in data, and setup everything again.
chrome.storage.onChanged.addListener(function (changes) {
    if (changes.disabled) {
        updateIcon();
    }
});

chrome.runtime.onMessage.addListener(function (request) {
    if (request.type == 'update-icon') {
        updateIcon();
    } else {
        return false;
    }
    // This tells the browser to keep sendResponse alive because we're sending
    // the response asynchronously.
    return true;
});

// 1st time setup
updateIcon();

chrome.runtime.onStartup.addListener(function () {
    updateIcon(); // Set dark/light icon...

    // This doesn't work yet in Chrome, but we'll put it here anyway, in case it starts working...
    let darkModeMql = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMql.onchange = updateIcon;
});
