chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return {
        cancel: fb_offline(details.url)
    };
}, {
    urls: ["<all_urls>"]
}, ["blocking"]);
var last_active = unseen = true;
chrome.storage.sync.get(['last_active', 'unseen'], function(items) {
    last_active = items.last_active == 'true';
    unseen = items.unseen == 'true';
});
chrome.storage.onChanged.addListener(function(changes, namespace) {
    chrome.storage.sync.get(['last_active', 'unseen'], function(items) {
        last_active = items.last_active == 'true';
        unseen = items.unseen == 'true';
    });
});

function fb_offline(domain) {
	console.log(last_active)
    if (last_active) {
        if (domain.search(/\d-edge-chat\.facebook/i) >= 0) return true
    }
    if (unseen) {
        if (domain.search(/facebook\.com\/ajax\/mercury\/change_read_status\.php/i) >= 0) return true
    }
    return false
}