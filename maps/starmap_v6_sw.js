/* Pythagoras Star Map v6 service worker (build 651e554ecb). Repeat visits load the engine and data from this cache.
   Versioned chunks (?v=build) are immutable: cache-first. The HTML page is network-first with a cached fallback (works offline). */
const V='sm6-651e554ecb',PRE=['starmap_v6.html','starmap_v6_engine.js?v=651e554ecb','starmap_v6_core.js?v=651e554ecb','starmap_v6_lazy.js?v=651e554ecb'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(PRE)).catch(()=>{}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('sm6-')&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(ca=>ca.put('starmap_v6.html',c));return res}).catch(()=>caches.match('starmap_v6.html')));return}
 if(u.searchParams.has('v')||/\/img\//.test(u.pathname)){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(ca=>ca.put(r,c))}return res})))}});
