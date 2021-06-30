const INTEGRITY_CHECKSUM="dc3d39c97ba52ee7fff0d667f7bc098c",bypassHeaderName="x-msw-bypass";let clients={};function serializeHeaders(e){const s={};return e.forEach(((e,t)=>{s[t]=s[t]?[].concat(s[t]).concat(e):e})),s}function sendToClient(e,s){return new Promise(((t,r)=>{const n=new MessageChannel;n.port1.onmessage=e=>{e.data&&e.data.error?r(e.data.error):t(e.data)},e.postMessage(JSON.stringify(s),[n.port2])}))}function createResponse(e){return new Response(e.payload.body,{...e.payload,headers:e.payload.headers})}function ensureKeys(e,s){return Object.keys(s).reduce(((t,r)=>(e.includes(r)&&(t[r]=s[r]),t)),{})}function uuidv4(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){const s=16*Math.random()|0;return("x"==e?s:3&s|8).toString(16)}))}self.addEventListener("install",(function(){return self.skipWaiting()})),self.addEventListener("activate",(async function(e){return self.clients.claim()})),self.addEventListener("message",(async function(e){const s=e.source.id;if(!s||!self.clients)return;const t=await self.clients.get(s);if(!t)return;const r=await self.clients.matchAll(),n=r.map((e=>e.id));switch(e.data){case"KEEPALIVE_REQUEST":sendToClient(t,{type:"KEEPALIVE_RESPONSE"});break;case"INTEGRITY_CHECK_REQUEST":sendToClient(t,{type:"INTEGRITY_CHECK_RESPONSE",payload:INTEGRITY_CHECKSUM});break;case"MOCK_ACTIVATE":clients=ensureKeys(n,clients),clients[s]=!0,sendToClient(t,{type:"MOCKING_ENABLED",payload:!0});break;case"MOCK_DEACTIVATE":clients=ensureKeys(n,clients),clients[s]=!1;break;case"CLIENT_CLOSED":0===r.filter((e=>e.id!==s)).length&&self.registration.unregister();break}})),self.addEventListener("fetch",(function(e){const{clientId:s,request:t}=e,r=uuidv4(),n=t.clone(),getOriginalResponse=()=>fetch(n);"navigate"!==t.mode&&clients[s]&&("only-if-cached"===t.cache&&"same-origin"!==t.mode||e.respondWith(new Promise((async(e,a)=>{const o=await self.clients.get(s);if(!o)return e(getOriginalResponse());if("true"===n.headers.get("x-msw-bypass")){const s=serializeHeaders(n.headers);delete s["x-msw-bypass"];const t=new Request(n,{headers:new Headers(s)});return e(fetch(t))}const i=serializeHeaders(t.headers),c=await t.text(),d=await sendToClient(o,{type:"REQUEST",payload:{id:r,url:t.url,method:t.method,headers:i,cache:t.cache,mode:t.mode,credentials:t.credentials,destination:t.destination,integrity:t.integrity,redirect:t.redirect,referrer:t.referrer,referrerPolicy:t.referrerPolicy,body:c,bodyUsed:t.bodyUsed,keepalive:t.keepalive}});switch(d.type){case"MOCK_SUCCESS":setTimeout(e.bind(this,createResponse(d)),d.payload.delay);break;case"MOCK_NOT_FOUND":return e(getOriginalResponse());case"NETWORK_ERROR":{const{name:e,message:s}=d.payload,t=new Error(s);return t.name=e,a(t)}case"INTERNAL_ERROR":{const s=JSON.parse(d.payload.body);return console.error(`[MSW] Request handler function for "%s %s" has thrown the following exception:\n\n${s.errorType}: ${s.message}\n(see more detailed error stack trace in the mocked response body)\n\nThis exception has been gracefully handled as a 500 response, however, it's strongly recommended to resolve this error.\nIf you wish to mock an error response, please refer to this guide: https://mswjs.io/docs/recipes/mocking-error-responses  `,t.method,t.url),e(createResponse(d))}}})).then((async e=>{const t=await self.clients.get(s),n=e.clone();return sendToClient(t,{type:"RESPONSE",payload:{requestId:r,type:n.type,ok:n.ok,status:n.status,statusText:n.statusText,body:null===n.body?null:await n.text(),headers:serializeHeaders(n.headers),redirected:n.redirected}}),e})).catch((e=>{console.error('[MSW] Failed to mock a "%s" request to "%s": %s',t.method,t.url,e)}))))}));