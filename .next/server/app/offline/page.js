(()=>{var e={};e.id=200,e.ids=[200],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5315:e=>{"use strict";e.exports=require("path")},7360:e=>{"use strict";e.exports=require("url")},3215:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>d}),r(3771),r(8295),r(5866);var n=r(3191),a=r(8716),s=r(7922),i=r.n(s),o=r(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let d=["",{children:["offline",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,3771)),"/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/offline/page.js"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,7026))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,8295)),"/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/layout.js"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,7026))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/offline/page.js"],p="/offline/page",u={require:r,loadChunk:()=>Promise.resolve()},m=new n.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/offline/page",pathname:"/offline",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},4476:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},657:()=>{},7910:(e,t,r)=>{Promise.resolve().then(r.bind(r,6822))},6822:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var n=r(326),a=r(7577),s=r(5047);function i(){let[e,t]=(0,a.useState)([]),[r,i]=(0,a.useState)(""),[o,l]=(0,a.useState)(!1),[d,c]=(0,a.useState)(!1),[p,u]=(0,a.useState)(!0),[m,x]=(0,a.useState)(!1),[h,g]=(0,a.useState)(null),[f,b]=(0,a.useState)(!1),j=(0,s.useRouter)(),y=r=>{let n=[...e];n.splice(r,1),t(n)},v=(r,n)=>{let a=[...e];a[r]={...a[r],giftIndex:parseInt(n)||0},t(a)},k=(e,t)=>{g(t),e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",t)},w=(r,n)=>{if(r.preventDefault(),null===h||h===n)return;let a=[...e],s=a[h];a.splice(h,1),a.splice(n,0,s),g(n),t(a)},S=()=>{g(null)};return o?(0,n.jsxs)("main",{children:[n.jsx("div",{className:"snow-container"}),n.jsx("h1",{children:"\uD83C\uDF84 FCY Secret Santa "}),(0,n.jsxs)("div",{className:"mode-selection",style:{marginBottom:"20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[n.jsx("span",{children:"Standard"}),(0,n.jsxs)("label",{className:"switch",children:[n.jsx("input",{type:"checkbox",checked:p,onChange:e=>u(e.target.checked)}),n.jsx("span",{className:"slider round"})]}),n.jsx("span",{children:"Randomize Gift"})]}),(0,n.jsxs)("div",{className:"mode-selection",style:{marginBottom:"20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[n.jsx("span",{children:"Single"}),(0,n.jsxs)("label",{className:"switch",children:[n.jsx("input",{type:"checkbox",checked:m,onChange:e=>x(e.target.checked)}),n.jsx("span",{className:"slider round"})]}),n.jsx("span",{children:"OTT Mode: Mix Source"})]}),(0,n.jsxs)("form",{className:"input-group",onSubmit:n=>{n&&n.preventDefault();let a=r.trim();if(""!==a){let r=e.length>0?Math.max(...e.map(e=>e.giftIndex)):0;t(e=>[...e,{name:a,giftIndex:r+1}]),i("")}},children:[n.jsx("input",{type:"text",value:r,onChange:e=>i(e.target.value),placeholder:"Enter participant name"}),n.jsx("button",{type:"submit",children:"Add"})]}),(0,n.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",maxWidth:"400px",margin:"0 auto",gap:"10px",flexWrap:"wrap"},children:[(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[(0,n.jsxs)("h3",{children:["Participants (",e.length,")"]}),p&&(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginLeft:"5px"},children:[n.jsx("span",{style:{fontSize:"0.7rem",opacity:.7,color:"#ffd700",textTransform:"uppercase",letterSpacing:"1px"},children:"Indices"}),(0,n.jsxs)("label",{className:"switch",style:{transform:"scale(0.7)"},children:[n.jsx("input",{type:"checkbox",checked:f,onChange:e=>b(e.target.checked)}),n.jsx("span",{className:"slider round"})]})]})]}),e.length>0&&n.jsx("button",{onClick:()=>{c(!0)},className:"remove-all-btn",children:"Remove All"})]}),n.jsx("ul",{children:e.map((e,t)=>(0,n.jsxs)("li",{draggable:!0,onDragStart:e=>k(e,t),onDragOver:e=>w(e,t),onDragEnd:S,className:h===t?"dragging":"",style:{wordBreak:"break-word",display:"flex",alignItems:"center",gap:"10px",cursor:"grab"},children:[n.jsx("span",{style:{color:"#ffd700",opacity:.5,fontSize:"0.8rem",cursor:"move"},children:"☰"}),n.jsx("span",{style:{flex:1},children:e.name}),p&&f&&(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[n.jsx("span",{style:{fontSize:"0.8rem",opacity:.7},children:"Gift #"}),n.jsx("input",{type:"number",value:e.giftIndex,onChange:e=>v(t,e.target.value),style:{width:"50px",padding:"2px 5px",background:"rgba(255,255,255,0.1)",border:"1px solid #ffd700",color:"#fff",borderRadius:"4px"}})]}),n.jsx("button",{onClick:()=>y(t),style:{padding:"4px 8px",background:"transparent",color:"#f8e3a1",border:"none",cursor:"pointer",flexShrink:0},children:"✕"})]},t))}),e.length>=2&&n.jsx("button",{className:"start-btn",onClick:()=>{if(e.length<2){alert("Need at least 2 participants");return}if(new Set(e.map(e=>e.name.toLowerCase().trim())).size!==e.length){alert("Each participant must have a unique name.");return}if(p&&new Set(e.map(e=>e.giftIndex)).size!==e.length){alert("Each participant must have a unique Gift #.");return}j.push("/results")},children:"Start Game ✨"}),d&&n.jsx("div",{className:"modal-overlay",children:(0,n.jsxs)("div",{className:"modal-content",children:[n.jsx("h3",{children:"Clear All Participants? \uD83C\uDF85"}),n.jsx("p",{children:"This will remove everyone from the list. Are you sure?"}),(0,n.jsxs)("div",{className:"modal-actions",children:[n.jsx("button",{className:"cancel-btn",onClick:()=>c(!1),children:"Cancel"}),n.jsx("button",{className:"confirm-btn",onClick:()=>{t([]),c(!1)},children:"Remove All"})]})]})}),n.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }
        .modal-content {
          background: #1a472a;
          padding: 2rem;
          border-radius: 20px;
          border: 2px solid #ffd700;
          text-align: center;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
          animation: modalAppear 0.3s ease-out;
        }
        @keyframes modalAppear {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .modal-content h3 {
          color: #ffd700;
          margin-top: 0;
        }
        .modal-content p {
          color: #f8e3a1;
          margin-bottom: 2rem;
        }
        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .modal-actions button {
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.2s;
        }
        .modal-actions button:hover {
          transform: scale(1.05);
        }
        .cancel-btn {
          background: transparent;
          color: #f8e3a1;
          border: 1px solid #f8e3a1;
        }
        .confirm-btn {
          background: #ff4d4d;
          color: white;
          border: none;
          box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
        }
        .remove-all-btn {
          background: transparent;
          color: #ff4d4d;
          border: 1px solid #ff4d4d;
          padding: 4px 12px;
          borderRadius: 20px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: background 0.2s;
        }
        .remove-all-btn:hover {
          background: rgba(255, 77, 77, 0.1);
        }
        
        li.dragging {
          opacity: 0.5;
          background: rgba(255, 215, 0, 0.1);
          border: 1px dashed #ffd700;
        }

        /* Toggle Switch */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.1);
          transition: .4s;
          border: 1px solid #ffd700;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 3px;
          bottom: 3px;
          background-color: #ffd700;
          transition: .4s;
        }
        input:checked + .slider {
          background-color: #1a472a;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        .slider.round {
          border-radius: 24px;
        }
        .slider.round:before {
          border-radius: 50%;
        }

        @media (max-width: 480px) {
          .input-group {
            flex-direction: column;
            width: 100%;
          }
          .input-group input {
            border-radius: 50px;
            margin-bottom: 0.5rem;
          }
          .input-group button {
            border-radius: 50px;
            width: 100%;
          }
          h1 {
            font-size: 1.8rem;
          }
        }
      `}})]}):null}},8295:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s,metadata:()=>a});var n=r(9510);r(5023);let a={title:"Secret Santa",description:"A simple Secret Santa application"};function s({children:e}){return n.jsx("html",{lang:"en",children:n.jsx("body",{children:e})})}},3771:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});let n=(0,r(8570).createProxy)(String.raw`/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/offline/page.js#default`)},7026:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var n=r(6621);let a=e=>[{type:"image/svg+xml",sizes:"any",url:(0,n.fillMetadataSegment)(".",e.params,"icon.svg")+"?465e94faf88034dd"}]},5023:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[948,471,339],()=>r(3215));module.exports=n})();