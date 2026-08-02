const SHELL='cet-study-shell-v12';
const RUNTIME='cet-study-runtime-v12';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg','./vocab-data.js','./exam-data.js','./cet6-exam-data.js','./data/questions.js','./data/extra_questions.js','./data/practice-data.js','./data/full-mock-data.js','./config.js','./vendor/pdf.min.js','./vendor/pdf.worker.min.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(SHELL).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>![SHELL,RUNTIME,'cet-study-cet4-resources-v1','cet-study-cet4-resources-v2','cet-study-cet6-resources-v2'].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin) return;
  if(url.pathname.includes('/resources/')){
    e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{ const copy=r.clone(); caches.open(RUNTIME).then(c=>c.put(e.request,copy)); return r; }).catch(()=>hit)));
  } else {
    e.respondWith(fetch(e.request).then(r=>{ const copy=r.clone(); caches.open(RUNTIME).then(c=>c.put(e.request,copy)); return r; }).catch(()=>caches.match(e.request)));
  }
});
