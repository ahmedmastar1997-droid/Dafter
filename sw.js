const VERSION='1.2.0',CACHE='gradebook-'+VERSION,FILES=['./','index.html','manifest.json','icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'}))))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=CACHE&&x.startsWith('gradebook-')).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data=='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!='GET'||u.origin!=location.origin||u.pathname.endsWith('version.json'))return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).catch(()=>caches.match('index.html'))))});
