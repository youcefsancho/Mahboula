const C='sancha-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','icon.svg','manifest.json'])))});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.headers.has('range'))return;
e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(C).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))))});
