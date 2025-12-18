(()=>{var e={};e.id=931,e.ids=[931],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5315:e=>{"use strict";e.exports=require("path")},7360:e=>{"use strict";e.exports=require("url")},4922:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>c,routeModule:()=>u,tree:()=>l}),t(1838),t(8295),t(5866);var n=t(3191),s=t(8716),a=t(7922),i=t.n(a),o=t(5231),d={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);t.d(r,d);let l=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,1838)),"/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/page.js"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,7026))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,8295)),"/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/layout.js"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,7026))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/page.js"],m="/page",p={require:t,loadChunk:()=>Promise.resolve()},u=new n.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},4476:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,2994,23)),Promise.resolve().then(t.t.bind(t,6114,23)),Promise.resolve().then(t.t.bind(t,9727,23)),Promise.resolve().then(t.t.bind(t,9671,23)),Promise.resolve().then(t.t.bind(t,1868,23)),Promise.resolve().then(t.t.bind(t,4759,23))},657:()=>{},8144:(e,r,t)=>{Promise.resolve().then(t.bind(t,6777))},6777:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a});var n=t(326),s=t(5047);function a(){let e=(0,s.useRouter)();return(0,n.jsxs)("main",{children:[n.jsx("div",{className:"snow-container"}),n.jsx("h1",{children:"\uD83C\uDF84 FCY Secret Santa"}),(0,n.jsxs)("div",{className:"mode-container fade-in",children:[n.jsx("p",{className:"description",children:"Choose how you want to play this year!"}),(0,n.jsxs)("div",{className:"selection-grid",children:[(0,n.jsxs)("div",{className:"mode-card",onClick:()=>e.push("/offline"),children:[n.jsx("div",{className:"icon",children:"\uD83C\uDFE0"}),n.jsx("h3",{children:"Offline Mode"}),n.jsx("p",{children:"Perfect for when everyone is together. Manage participants on one device."}),n.jsx("button",{className:"select-btn",children:"Start Offline"})]}),(0,n.jsxs)("div",{className:"mode-card",onClick:()=>e.push("/online"),children:[n.jsx("div",{className:"icon",children:"\uD83C\uDF10"}),n.jsx("h3",{children:"Online Mode"}),n.jsx("p",{children:"Join from your own device! Create a room and invite your friends."}),n.jsx("button",{className:"select-btn",children:"Go Online"})]})]})]}),n.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .mode-container {
          text-align: center;
          margin-top: 2rem;
        }
        .description {
          color: #f8e3a1;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        .selection-grid {
          display: flex;
          gap: 1.5rem;
          flex-direction: column;
        }
        .mode-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 20px;
          border: 2px solid #ffd700;
          cursor: pointer;
          transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .mode-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }
        .mode-card .icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        .mode-card h3 {
          margin: 0;
          color: #ffd700;
        }
        .mode-card p {
          font-size: 0.9rem;
          color: #fff;
          opacity: 0.8;
          margin: 0;
          line-height: 1.4;
        }
        .select-btn {
          margin-top: 10px;
          pointer-events: none; /* Let the card click handle it */
        }
        @media (min-width: 600px) {
          .selection-grid {
            flex-direction: row;
          }
          .mode-card {
            flex: 1;
          }
        }
      `}})]})}},8295:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a,metadata:()=>s});var n=t(9510);t(5023);let s={title:"Secret Santa",description:"A simple Secret Santa application"};function a({children:e}){return n.jsx("html",{lang:"en",children:n.jsx("body",{children:e})})}},1838:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n});let n=(0,t(8570).createProxy)(String.raw`/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/page.js#default`)},7026:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});var n=t(6621);let s=e=>[{type:"image/svg+xml",sizes:"any",url:(0,n.fillMetadataSegment)(".",e.params,"icon.svg")+"?465e94faf88034dd"}]},5023:()=>{}};var r=require("../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),n=r.X(0,[948,471,339],()=>t(4922));module.exports=n})();