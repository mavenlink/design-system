const INTEGRITY_CHECKSUM="02f4ad4a2797f85668baf196e553d929",bypassHeaderName="x-msw-bypass",activeClientIds=new Set;async function resolveMainClient(e){const t=await self.clients.get(e.clientId);if("top-level"===t.frameType)return t;return(await self.clients.matchAll()).filter((e=>"visible"===e.visibilityState)).find((e=>activeClientIds.has(e.id)))}async function handleRequest(e,t){const s=await resolveMainClient(e),r=await getResponse(e,s,t);return s&&activeClientIds.has(s.id)&&async function(){const e=r.clone();sendToClient(s,{type:"RESPONSE",payload:{requestId:t,type:e.type,ok:e.ok,status:e.status,statusText:e.statusText,body:null===e.body?null:await e.text(),headers:serializeHeaders(e.headers),redirected:e.redirected}})}(),r}async function getResponse(e,t,s){const{request:r}=e,n=r.clone(),getOriginalResponse=()=>fetch(n);if(!t)return getOriginalResponse();if(!activeClientIds.has(t.id))return await getOriginalResponse();if("true"===n.headers.get("x-msw-bypass")){const e=serializeHeaders(n.headers);delete e["x-msw-bypass"];const t=new Request(n,{headers:new Headers(e)});return fetch(t)}const a=serializeHeaders(r.headers),i=await r.text(),o=await sendToClient(t,{type:"REQUEST",payload:{id:s,url:r.url,method:r.method,headers:a,cache:r.cache,mode:r.mode,credentials:r.credentials,destination:r.destination,integrity:r.integrity,redirect:r.redirect,referrer:r.referrer,referrerPolicy:r.referrerPolicy,body:i,bodyUsed:r.bodyUsed,keepalive:r.keepalive}});switch(o.type){case"MOCK_SUCCESS":return delayPromise((()=>respondWithMock(o)),o.payload.delay);case"MOCK_NOT_FOUND":return getOriginalResponse();case"NETWORK_ERROR":{const{name:e,message:t}=o.payload,s=new Error(t);throw s.name=e,s}case"INTERNAL_ERROR":{const e=JSON.parse(o.payload.body);return console.error(`[MSW] Uncaught exception in the request handler for "%s %s":\n\n${e.location}\n\nThis exception has been gracefully handled as a 500 response, however, it's strongly recommended to resolve this error, as it indicates a mistake in your code. If you wish to mock an error response, please see this guide: https://mswjs.io/docs/recipes/mocking-error-responses`,r.method,r.url),respondWithMock(o)}}return getOriginalResponse()}function serializeHeaders(e){const t={};return e.forEach(((e,s)=>{t[s]=t[s]?[].concat(t[s]).concat(e):e})),t}function sendToClient(e,t){return new Promise(((s,r)=>{const n=new MessageChannel;n.port1.onmessage=e=>{if(e.data&&e.data.error)return r(e.data.error);s(e.data)},e.postMessage(JSON.stringify(t),[n.port2])}))}function delayPromise(e,t){return new Promise((s=>{setTimeout((()=>s(e())),t)}))}function respondWithMock(e){return new Response(e.payload.body,{...e.payload,headers:e.payload.headers})}function uuidv4(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){const t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}self.addEventListener("install",(function(){return self.skipWaiting()})),self.addEventListener("activate",(async function(e){return self.clients.claim()})),self.addEventListener("message",(async function(e){const t=e.source.id;if(!t||!self.clients)return;const s=await self.clients.get(t);if(!s)return;const r=await self.clients.matchAll();switch(e.data){case"KEEPALIVE_REQUEST":sendToClient(s,{type:"KEEPALIVE_RESPONSE"});break;case"INTEGRITY_CHECK_REQUEST":sendToClient(s,{type:"INTEGRITY_CHECK_RESPONSE",payload:INTEGRITY_CHECKSUM});break;case"MOCK_ACTIVATE":activeClientIds.add(t),sendToClient(s,{type:"MOCKING_ENABLED",payload:!0});break;case"MOCK_DEACTIVATE":activeClientIds.delete(t);break;case"CLIENT_CLOSED":activeClientIds.delete(t);0===r.filter((e=>e.id!==t)).length&&self.registration.unregister();break}})),self.addEventListener("fetch",(function(e){const{request:t}=e;if((t.headers.get("accept")||"").includes("text/event-stream"))return;if("navigate"===t.mode)return;if("only-if-cached"===t.cache&&"same-origin"!==t.mode)return;if(0===activeClientIds.size)return;const s=uuidv4();return e.respondWith(handleRequest(e,s).catch((e=>{"NetworkError"!==e.name?console.error('[MSW] Caught an exception from the "%s %s" request (%s). This is probably not a problem with Mock Service Worker. There is likely an additional logging output above.',t.method,t.url,`${e.name}: ${e.message}`):console.warn('[MSW] Successfully emulated a network error for the "%s %s" request.',t.method,t.url)})))}));