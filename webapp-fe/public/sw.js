if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const f=e=>n(e,t),r={module:{uri:t},exports:c,require:f};s[t]=Promise.all(a.map((e=>r[e]||f(e)))).then((e=>(i(...e),c)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"b9a270347ae2c341292ef4c843c1f272"},{url:"/_next/static/chunks/1827-2acd74f3ce4fb52b.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/2472-693fc469ee986938.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/2514-4583002fdffca3f4.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/3451-3047bfb5a214b3e1.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/3633-4a0675dd999d8611.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/3958-9bc5d59ba2a79718.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/413-0df15743a690c987.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/4239-cd3a4e49441e8238.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/4258-5c4cc006664e8677.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/477.6a2063e98e86a291.js",revision:"6a2063e98e86a291"},{url:"/_next/static/chunks/5771-45488b8149627311.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/7079-016b32ffbc944226.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/7747-adfc267f29d79ae5.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/8326-223560f6f6125f63.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/8409-6984bc3c458972a0.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/8449.9f94e183812cfc1b.js",revision:"9f94e183812cfc1b"},{url:"/_next/static/chunks/870fdd6f-68ffa7da95d82d90.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/9997-31f86c09184e8a56.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/aaea2bcf-2e780b7794e237f9.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/(landing)/layout-325ed1e3df73a0f1.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/(landing)/page-4c25dcb35d74c2fe.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/_not-found-23464f78dc962ceb.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/account/layout-1f25c45abef2d4e2.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/account/page-02d154b9d36d27ac.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/history/layout-0e2cb9845fc52199.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/history/page-b741d9cd3482b4b8.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/invest/%5Bid%5D/layout-cfc31ef2bc80f4d4.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/invest/%5Bid%5D/page-c7b17e3a1fe14f09.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/invest/layout-f0e8603b6af45f45.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/invest/page-c138ae783b25c6e4.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/layout-3b086634d4263b81.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/login/layout-45cdd02f5ff04e65.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/login/page-30ea816175a1aa5e.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/onboarding/layout-26ec41eff1019868.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/onboarding/page-07961bbda1a213bc.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/wallet/deposit/layout-cc15fd799b81ec51.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/wallet/deposit/page-e7b28fda6924a423.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/wallet/layout-0f044978b3b4463e.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/wallet/page-354540236f5b04f4.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/wallet/pay/layout-c78dc1660d4e5483.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/wallet/pay/page-5c5cc7e61c3c32eb.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/wallet/receive/layout-e2a91d0806f0713f.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/wallet/receive/page-d61047f22df3f5ed.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/wallet/withdraw/layout-c19d580807dc7e2a.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/app/wallet/withdraw/page-998c4c723e089a4a.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/d0f5a89a-dbda5127aaed422c.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/fd9d1056-c685fb3524f29d4e.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/framework-4498e84bb0ba1830.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/main-2eb2ebec799f4311.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/main-app-baf1cf3e207f7793.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/pages/_app-0a6f9986ee298e67.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/pages/_error-77acd5d276fadc61.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-406ed50f97b7ae23.js",revision:"qvb9r2nqswulepQfQJVBv"},{url:"/_next/static/css/36840340f3f01bb9.css",revision:"36840340f3f01bb9"},{url:"/_next/static/css/a00fa354d53ae14c.css",revision:"a00fa354d53ae14c"},{url:"/_next/static/media/0e9de718220fd659-s.woff2",revision:"2bfc3eb1e8664855c815c48d1a61584c"},{url:"/_next/static/media/137d2cb9eb456178-s.woff2",revision:"aed6ba2500570b43ebd52005268a67d7"},{url:"/_next/static/media/18450e7be31317cf-s.woff2",revision:"1abf13f87f04b0f04df32812e13d4854"},{url:"/_next/static/media/1cb6ed0b6d6c12d3-s.p.woff2",revision:"be4bfd9af0a7d9200e8ec5048553b600"},{url:"/_next/static/media/1deac19579f732db-s.woff2",revision:"de214031987633c84989ed5e50ba6e24"},{url:"/_next/static/media/203870744bd5f898-s.woff2",revision:"73455f1bf6a7f3c1253bc29850503419"},{url:"/_next/static/media/22a2f505234ea65d-s.p.woff2",revision:"4d0613b77a3a8c102fd9bcc35fee3405"},{url:"/_next/static/media/290ac9142d2f94fc-s.p.woff2",revision:"f5e3fc0855bcfe71d626a326a6eee4c7"},{url:"/_next/static/media/2cf8594f7cb93d53-s.p.woff2",revision:"6480a61fff58c9ff2194bc38272a521e"},{url:"/_next/static/media/3669c84725cae4c2-s.p.woff2",revision:"e4918399bf2296e1c2e468bfb37323be"},{url:"/_next/static/media/424923009adb2b2b-s.p.woff2",revision:"d45efad73a4c5cbc778bbd3fe9bee3b4"},{url:"/_next/static/media/4ca89330228eeb56-s.p.woff2",revision:"a18b987cc315e2aad2cf4af3849c6a00"},{url:"/_next/static/media/4e8bff9db48b9927-s.woff2",revision:"3446719c6826dd7661653b0ce64f40cd"},{url:"/_next/static/media/5854a0ee5fcd7e6f-s.woff2",revision:"e02453c4b81cdc556ee75441e819cacc"},{url:"/_next/static/media/6623f1ccba5fbd3b-s.woff2",revision:"3412bddbb6d8b9535966c33fc8613418"},{url:"/_next/static/media/6b06d7ec991c81d0-s.woff2",revision:"8a79ef7beeb9c4f45119ab2f44b2b06d"},{url:"/_next/static/media/726e0987cfc3e9e2-s.p.woff2",revision:"a703e2a90016dc932d62de2cc352f83d"},{url:"/_next/static/media/763d7c398439f42c-s.woff2",revision:"a55eb4427cc3f0b9c3b170936fe9ca05"},{url:"/_next/static/media/7760cd7f29e78e52-s.woff2",revision:"cf1b3374ec38cb8575901e0de70e4150"},{url:"/_next/static/media/77aee726b74c33a9-s.p.woff2",revision:"c3601d20424966dfa0548f73888d1f00"},{url:"/_next/static/media/9b63fbdf2406cb32-s.p.woff2",revision:"c5fb074b9ab99df1380c5fbde6e71404"},{url:"/_next/static/media/abd42f202d08c5a5-s.p.woff2",revision:"367aa8a70729765815ee6361c8f0c7b6"},{url:"/_next/static/media/aefb8833f916255f-s.p.woff2",revision:"410732cf00e4f3b14dafd8b3ecde3e0d"},{url:"/_next/static/media/c102c977e7b79c53-s.woff2",revision:"7333b7d26e06e9f5a387ce4eac707581"},{url:"/_next/static/media/dd91064896b504af-s.woff2",revision:"e55ba88febe2c6cd8694c2dbede36ded"},{url:"/_next/static/media/f610fca61f3bc8e0-s.p.woff2",revision:"6b94b1e7f2a2e76d84409f96556ae38c"},{url:"/_next/static/media/f7845884323285df-s.p.woff2",revision:"c5a351d087a8b860fdc42e00944ea0f7"},{url:"/_next/static/media/fc2df48905150edf-s.woff2",revision:"ffc22d6972feb0ae48c96b433661e8d9"},{url:"/_next/static/media/unify-wallet.1d04da44.png",revision:"af51865304f39aa59564dee5738044cf"},{url:"/_next/static/qvb9r2nqswulepQfQJVBv/_buildManifest.js",revision:"b9418b3f2fddb202e5112ea6e82c15fe"},{url:"/_next/static/qvb9r2nqswulepQfQJVBv/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icon.png",revision:"af51865304f39aa59564dee5738044cf"},{url:"/icon512_maskable.png",revision:"f15966befebf695f4802fc10c33ea4c1"},{url:"/icon512_rounded.png",revision:"bba12726a5b1c5c31b3bf21bef339cd4"},{url:"/manifest.json",revision:"45289643dac78588dce6dc1e92ce3fbc"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
