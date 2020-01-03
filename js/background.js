chrome.runtime.onMessage.addListener(function (request) {
    if (request.scheme == "dark") {
        chrome.browserAction.setIcon({
            path: {
                "128": "icons/tab-light-128.png",
                "48": "icons/tab-light-48.png",
                "32": "icons/tab-light-32.png",
                "16": "icons/tab-light-16.png"
            }
        });
    }
});
