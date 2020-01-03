// Copied from https://github.com/einaregilsson/Redirector/blob/master/js/background.js

function isDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function setIcon(image) {
    var data = {
        path: {}
    };

    for (let nr of [16,32,48,128]) {
        data.path[nr] = `icons/${image}-${nr}.png`;
    }

    chrome.browserAction.setIcon(data);
}

function updateIcon() {
    chrome.storage.local.get({disabled:false}, function() {
        if (isDarkMode()) {
            setIcon('tab-light');
        } else {
            setIcon('tab-dark');
        }
    });
}

chrome.storage.onChanged.addListener(function(changes) {
    if (changes.disabled) {
        updateIcon();
    }
});

chrome.runtime.onMessage.addListener(function(request) {
    if (request.type == 'update-icon') {
        updateIcon();
    } else {
        return false;
    }
    return true;
});

updateIcon();

chrome.runtime.onStartup.addListener(function () {
    updateIcon();

    // This doesn't work yet in Chrome, but we'll put it here anyway, in case it starts working...
    let darkModeMql = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMql.onchange = updateIcon;
});
