// Plátanos Nietos: guarda la app para abrir sin internet
var CACHE='platanos-v4.0d';
var FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-mask-192.png','icon-mask-512.png','apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n.indexOf('platanos-')===0&&n!==CACHE}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(CACHE).then(function(c){c.put('index.html',cp)});return res}).catch(function(){return caches.match('index.html')}));return}
 e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(res){if(res.ok&&new URL(r.url).origin===location.origin){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(r,cp)})}return res})}))});
