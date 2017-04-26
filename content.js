var j = document.createElement('script');
j.src = chrome.extension.getURL('jquery-3.1.1.min.js');
(document.head || document.documentElement).appendChild(j);

var o = document.createElement('script');
o.src = chrome.extension.getURL('openpgp.min.js');
(document.head || document.documentElement).appendChild(o);

var g = document.createElement('script');
g.src = chrome.extension.getURL('inboxsdk.js');
(document.head || document.documentElement).appendChild(g);

var s = document.createElement('script');
s.src = chrome.extension.getURL('main.js');
(document.head || document.documentElement).appendChild(s);

var p = document.createElement('script');
p.src = chrome.extension.getURL('pgp.js');
(document.head || document.documentElement).appendChild(p);
