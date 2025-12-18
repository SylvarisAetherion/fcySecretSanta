(()=>{var e={};e.id=87,e.ids=[87],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5315:e=>{"use strict";e.exports=require("path")},7360:e=>{"use strict";e.exports=require("url")},3651:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>c,routeModule:()=>u,tree:()=>d}),t(4813),t(8295),t(5866);var s=t(3191),a=t(8716),n=t(7922),i=t.n(n),o=t(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);t.d(r,l);let d=["",{children:["results",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,4813)),"/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/results/page.js"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,7026))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,8295)),"/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/layout.js"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,7026))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/results/page.js"],m="/results/page",p={require:t,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/results/page",pathname:"/results",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},4476:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,2994,23)),Promise.resolve().then(t.t.bind(t,6114,23)),Promise.resolve().then(t.t.bind(t,9727,23)),Promise.resolve().then(t.t.bind(t,9671,23)),Promise.resolve().then(t.t.bind(t,1868,23)),Promise.resolve().then(t.t.bind(t,4759,23))},657:()=>{},8292:(e,r,t)=>{Promise.resolve().then(t.bind(t,2308))},2308:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>i});var s=t(326),a=t(7577),n=t(5047);function i(){let[e,r]=(0,a.useState)([]),[t,i]=(0,a.useState)(-1),[o,l]=(0,a.useState)(!0),[d,c]=(0,a.useState)(!1),[m,p]=(0,a.useState)(null),[u,g]=(0,a.useState)(!0),x=(0,n.useRouter)(),f=t===e.length-1;return(0,s.jsxs)("main",{children:[s.jsx("div",{className:"snow-container"}),s.jsx("h1",{children:"Secret Santa Reveal \uD83C\uDF85"}),o?(0,s.jsxs)("div",{style:{textAlign:"center",padding:"40px"},children:[s.jsx("h2",{style:{animation:"pulse 1.5s infinite"},children:"Preparing the gifts... \uD83C\uDF81✨"}),s.jsx("style",{dangerouslySetInnerHTML:{__html:`
            @keyframes pulse {
              0% { opacity: 0.5; }
              50% { opacity: 1; }
              100% { opacity: 0.5; }
            }
          `}})]}):(0,s.jsxs)("div",{className:"reveal-container",children:[t>=0&&e[t]&&(0,s.jsxs)("div",{className:`pair-card ${d?"shuffling-gift":"fade-in"}`,children:[u&&(0,s.jsxs)("div",{className:`gift-number ${d?"animating":""}`,children:["Gift #",m]}),(0,s.jsxs)("div",{className:"names",children:[(0,s.jsxs)("div",{className:"person",children:[s.jsx("span",{className:"label",children:"Gifter"}),s.jsx("strong",{className:"name",children:e[t].giver})]}),s.jsx("div",{className:"arrow",children:"➔"}),(0,s.jsxs)("div",{className:"person",children:[s.jsx("span",{className:"label",children:"Receiver"}),s.jsx("strong",{className:"name",children:e[t].receiver})]})]})]}),s.jsx("div",{className:"controls",children:f?(0,s.jsxs)("div",{className:"end-message",children:[s.jsx("p",{children:"All gifts have been assigned! \uD83C\uDF85"}),(0,s.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center"},children:[s.jsx("button",{className:"next-btn",onClick:()=>x.push("/summary"),children:"View Final List \uD83D\uDCCB"}),s.jsx("button",{className:"back-btn",onClick:()=>x.push("/"),children:"⬅️ Start Over"})]})]}):(0,s.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center"},children:[s.jsx("button",{className:"next-btn",onClick:()=>{if(t<e.length-1&&!d){let r=t+1;if(!u){i(r);return}i(r),c(!0);let s=0,a=setInterval(()=>{p(Math.floor(Math.random()*e.length)+1),++s>12&&(clearInterval(a),p(e[r].giftNumber),c(!1))},60)}},disabled:d,children:d?"Choosing... \uD83C\uDFB2":"Next Pair \uD83C\uDF81"}),s.jsx("button",{className:"reset-btn",onClick:()=>x.push("/"),children:"Reset & Go Back ⬅️"})]})})]}),s.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .reveal-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          margin-top: 2rem;
        }
        .pair-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2.5rem;
          border-radius: 20px;
          border: 2px solid #ffd700;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
          text-align: center;
          width: 100%;
          box-sizing: border-box;
        }
        .gift-number {
          font-size: 1.5rem;
          color: #ffd700;
          margin-bottom: 1.5rem;
          font-weight: bold;
          text-transform: uppercase;
        }
        .names {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .names {
            flex-direction: column;
            gap: 1.5rem;
          }
          .arrow {
            transform: rotate(90deg);
          }
          .name {
            font-size: 1.5rem;
          }
          .pair-card {
            padding: 1.5rem;
          }
        }
        .person {
          display: flex;
          flex-direction: column;
          word-break: break-word;
          max-width: 100%;
        }
        .label {
          font-size: 0.8rem;
          text-transform: uppercase;
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }
        .name {
          font-size: 1.8rem;
          color: #fff;
        }
        .arrow {
          font-size: 2rem;
          color: #ff4d4d;
        }
        .controls {
          margin-top: 1rem;
        }
        .next-btn {
          background: #ff4d4d;
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
          box-shadow: 0 4px 15px rgba(255, 77, 77, 0.4);
        }
        .next-btn:hover {
          background: #ff3333;
          transform: scale(1.05);
        }
        .reset-btn {
          background: transparent;
          color: #f8e3a1;
          border: 1px solid #f8e3a1;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: opacity 0.2s;
          margin-top: 0.5rem;
        }
        .reset-btn:hover {
          opacity: 0.8;
          background: rgba(248, 227, 161, 0.1);
        }
        .end-message {
          text-align: center;
        }
        .next-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .shuffling-gift {
          border-color: #ffd700;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        }
        .gift-number.animating {
          animation: shake 0.1s infinite;
          color: #ff4d4d;
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          25% { transform: translate(-1px, -1px) rotate(-1deg); }
          50% { transform: translate(-1px, 1px) rotate(1deg); }
          75% { transform: translate(1px, -1px) rotate(0deg); }
          100% { transform: translate(1px, 1px) rotate(1deg); }
        }
        .fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}})]})}},8295:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n,metadata:()=>a});var s=t(9510);t(5023);let a={title:"Secret Santa",description:"A simple Secret Santa application"};function n({children:e}){return s.jsx("html",{lang:"en",children:s.jsx("body",{children:e})})}},4813:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(8570).createProxy)(String.raw`/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/results/page.js#default`)},7026:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a});var s=t(6621);let a=e=>[{type:"image/svg+xml",sizes:"any",url:(0,s.fillMetadataSegment)(".",e.params,"icon.svg")+"?465e94faf88034dd"}]},5023:()=>{}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[948,471,339],()=>t(3651));module.exports=s})();