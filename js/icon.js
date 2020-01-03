function updateFavicon(e) {
    let type = e.matches ? 'light' : 'dark';
    document.querySelector('link[rel="shortcut icon"]').href = `icons/tab-${type}-16.png`;
    chrome.runtime.sendMessage({type: "update-icon"}); // Only works if this page is open, but still, better than nothing...
}

let mql = window.matchMedia('(prefers-color-scheme:dark)');

mql.onchange = updateFavicon;

updateFavicon(mql);
