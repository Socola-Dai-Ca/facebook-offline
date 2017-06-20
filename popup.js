var last_active = document.getElementById('last-active')
var unseen = document.getElementById('unseen')

chrome.storage.sync.get(['last_active', 'unseen'], function(items) {
    last_active.checked = items.last_active == 'true';
    unseen.checked = items.unseen  == 'true';
});

last_active.addEventListener("change", function(){
	if (last_active.checked)
  		chrome.storage.sync.set({'last_active': 'true'}, function() {
        })
  	else
  		chrome.storage.sync.set({'last_active': 'false'})
});


unseen.addEventListener("change", function(){
    if (unseen.checked)
        chrome.storage.sync.set({'unseen': 'true'})
    else
        chrome.storage.sync.set({'unseen': 'false'})
});