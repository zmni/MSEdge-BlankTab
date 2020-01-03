document.addEventListener('DOMContentLoaded', function () {
    document.getElementsByTagName('title')[0].textContent = chrome.i18n.getMessage('tabTitle');
});
