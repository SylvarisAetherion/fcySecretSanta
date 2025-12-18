(()=>{var e={};e.id=666,e.ids=[666],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5315:e=>{"use strict";e.exports=require("path")},7360:e=>{"use strict";e.exports=require("url")},9:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>a.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>d,routeModule:()=>h,tree:()=>c}),s(4756),s(8295),s(5866);var r=s(3191),i=s(8716),n=s(7922),a=s.n(n),o=s(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let c=["",{children:["online",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,4756)),"/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/online/page.js"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,7026))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,8295)),"/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/layout.js"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,7026))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/online/page.js"],p="/online/page",m={require:s,loadChunk:()=>Promise.resolve()},h=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/online/page",pathname:"/online",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},4476:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,2994,23)),Promise.resolve().then(s.t.bind(s,6114,23)),Promise.resolve().then(s.t.bind(s,9727,23)),Promise.resolve().then(s.t.bind(s,9671,23)),Promise.resolve().then(s.t.bind(s,1868,23)),Promise.resolve().then(s.t.bind(s,4759,23))},657:()=>{},1974:(e,t,s)=>{Promise.resolve().then(s.bind(s,7716))},7716:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(326),i=s(7577),n=s(5047);function a(){let[e,t]=(0,i.useState)([]),[s,a]=(0,i.useState)(null),[o,l]=(0,i.useState)(null),[c,d]=(0,i.useState)(!1),[p,m]=(0,i.useState)(!0),[h,x]=(0,i.useState)(""),[u,g]=(0,i.useState)(""),[f,j]=(0,i.useState)(!0),[y,b]=(0,i.useState)(!0),[v,S]=(0,i.useState)(!1),[N,P]=(0,i.useState)(!1),w=(0,n.useRouter)(),k=async e=>{if(e.preventDefault(),!u){alert("Please enter your name first!");return}let t=await fetch("/api/rooms",{method:"POST",body:JSON.stringify({action:"create",roomName:h||`${u}'s Room`,isRandomMode:y,isOttMode:v})}),s=await t.json();a(s),d(!0),localStorage.setItem(`host_${s.id}`,"true"),f&&await _(s.id,u)},_=async(e,t)=>{let s=await fetch("/api/rooms",{method:"POST",body:JSON.stringify({action:"join",roomId:e,participantName:t||u})}),r=await s.json();if(r.error){alert(r.error);return}a(r.room),l(r.participant),localStorage.setItem(`participant_${e}`,JSON.stringify(r.participant))},C=async()=>{if(!s?.participants||s.participants.length<2){alert("Need at least 2 participants");return}P(!0);try{let e=await fetch("/api/rooms",{method:"POST",body:JSON.stringify({action:"start",roomId:s.id})}),t=await e.json();t.error?(alert(t.error),P(!1)):w.push(`/results?mode=online&roomId=${s.id}`)}catch(e){console.error(e),alert("Failed to start game"),P(!1)}},I=async()=>{if(s)try{await fetch("/api/rooms",{method:"POST",body:JSON.stringify({action:"leave",roomId:s.id,participantId:o?.id,isHost:c})})}catch(e){console.error("Failed to leave room",e)}a(null),l(null),d(!1)};return p?(0,r.jsxs)("main",{children:[r.jsx("div",{className:"snow-container"}),r.jsx("h1",{children:"Loading Rooms... ❄️"})]}):s?(0,r.jsxs)("main",{children:[r.jsx("div",{className:"snow-container"}),(0,r.jsxs)("h1",{children:["\uD83C\uDF84 Room: ",s.name]}),(0,r.jsxs)("div",{className:"room-info",style:{textAlign:"center",marginBottom:"20px"},children:[(0,r.jsxs)("p",{children:["Room ID: ",r.jsx("strong",{children:s.id})]}),r.jsx("p",{children:"Share this ID with your friends!"})]}),(0,r.jsxs)("div",{className:"participants-list",children:[(0,r.jsxs)("h3",{children:["Participants (",s.participants?.length||0,")"]}),r.jsx("ul",{children:s.participants?.map((e,t)=>r.jsxs("li",{children:[r.jsx("span",{children:e.name}),r.jsxs("span",{className:"gift-tag",children:["Gift #",e.giftIndex]})]},e.id))})]}),c?r.jsx("div",{className:"controls",style:{marginTop:"20px"},children:r.jsx("button",{className:"start-btn",onClick:C,disabled:N,children:N?"Starting... ✨":"Start Game ✨"})}):r.jsx("p",{style:{textAlign:"center",fontStyle:"italic",opacity:.8},children:"Waiting for the host to start the game..."}),r.jsx("button",{className:"back-btn",onClick:I,children:"Leave Room"}),r.jsx("style",{dangerouslySetInnerHTML:{__html:`
          .gift-tag {
            font-size: 0.8rem;
            color: #ffd700;
            background: rgba(255,215,0,0.1);
            padding: 2px 8px;
            border-radius: 10px;
          }
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}})]}):(0,r.jsxs)("main",{children:[r.jsx("div",{className:"snow-container"}),r.jsx("h1",{children:"\uD83C\uDF10 Online Secret Santa"}),(0,r.jsxs)("div",{className:"online-container fade-in",children:[(0,r.jsxs)("div",{className:"global-name-input",style:{marginBottom:"2rem"},children:[r.jsx("h3",{children:"Enter your name to join or create a room:"}),r.jsx("input",{type:"text",placeholder:"Your Name",value:u,onChange:e=>g(e.target.value)})]}),e.length>0?(0,r.jsxs)("div",{className:"rooms-section",children:[r.jsx("h3",{children:"Active Rooms"}),r.jsx("div",{className:"room-grid",children:e.map(e=>(0,r.jsxs)("div",{className:"room-card",children:[(0,r.jsxs)("div",{children:[r.jsx("strong",{children:e.name}),(0,r.jsxs)("p",{children:[e.participantCount," participants • ",e.isStarted?"Started":"Waiting"]})]}),!e.isStarted&&(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[r.jsx("span",{style:{fontSize:"0.8rem",opacity:.8},children:"Join"}),(0,r.jsxs)("label",{className:"switch",style:{transform:"scale(0.8)"},children:[r.jsx("input",{type:"checkbox",onChange:t=>{if(t.target.checked){if(!u){alert("Please enter your name first!"),t.target.checked=!1;return}_(e.id,u)}}}),r.jsx("span",{className:"slider round"})]})]})]},e.id))})]}):r.jsx("div",{className:"no-rooms",children:r.jsx("p",{children:"No active rooms found. Be the first to create one!"})}),r.jsx("hr",{style:{margin:"2rem 0",opacity:.2}}),(0,r.jsxs)("form",{className:"create-room-form",onSubmit:k,children:[r.jsx("h3",{children:"Create a New Room"}),r.jsx("input",{type:"text",placeholder:"Room Name (Optional)",value:h,onChange:e=>x(e.target.value)}),(0,r.jsxs)("div",{className:"mode-selection",style:{margin:"15px 0",display:"flex",flexDirection:"column",gap:"15px"},children:[(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[r.jsx("span",{style:{minWidth:"80px",textAlign:"right",fontSize:"0.9rem"},children:"Host Only"}),(0,r.jsxs)("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",checked:f,onChange:e=>j(e.target.checked),id:"host-role"}),r.jsx("span",{className:"slider round"})]}),r.jsx("span",{style:{minWidth:"150px",textAlign:"left",fontSize:"0.9rem"},children:"I am also a participant"})]}),(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[r.jsx("span",{style:{minWidth:"80px",textAlign:"right",fontSize:"0.9rem"},children:"Standard"}),(0,r.jsxs)("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",checked:y,onChange:e=>b(e.target.checked)}),r.jsx("span",{className:"slider round"})]}),r.jsx("span",{style:{minWidth:"150px",textAlign:"left",fontSize:"0.9rem"},children:"Randomize Gift"})]}),(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[r.jsx("span",{style:{minWidth:"80px",textAlign:"right",fontSize:"0.9rem"},children:"Single"}),(0,r.jsxs)("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",checked:v,onChange:e=>S(e.target.checked)}),r.jsx("span",{className:"slider round"})]}),r.jsx("span",{style:{minWidth:"150px",textAlign:"left",fontSize:"0.9rem"},children:"Mix Source"})]})]}),r.jsx("button",{type:"submit",className:"start-btn",children:"Create & Join Room \uD83C\uDF85"})]})]}),r.jsx("button",{className:"back-btn",onClick:()=>w.push("/"),children:"⬅️ Back to Home"}),r.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .room-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .room-card {
          background: rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 12px;
          border: 1px solid rgba(255,215,0,0.3);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .room-card p {
          margin: 0;
          font-size: 0.8rem;
          opacity: 0.7;
        }
        .create-room-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .create-room-form input[type="text"] {
          width: 100%;
          box-sizing: border-box;
        }
        /* Toggle Switch Styles (copied for consistency) */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        .switch input {
          opacity: 0; width: 0; height: 0;
        }
        .slider {
          position: absolute; cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(255,255,255,0.1);
          transition: .4s; border: 1px solid #ffd700;
        }
        .slider:before {
          position: absolute; content: "";
          height: 16px; width: 16px; left: 3px; bottom: 3px;
          background-color: #ffd700; transition: .4s;
        }
        input:checked + .slider { background-color: #1a472a; }
        input:checked + .slider:before { transform: translateX(26px); }
        .slider.round { border-radius: 24px; }
        .slider.round:before { border-radius: 50%; }
      `}})]})}},8295:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n,metadata:()=>i});var r=s(9510);s(5023);let i={title:"Secret Santa",description:"A simple Secret Santa application"};function n({children:e}){return r.jsx("html",{lang:"en",children:r.jsx("body",{children:e})})}},4756:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(8570).createProxy)(String.raw`/Users/nguyenhoangdung/WebstormProjects/secretsanta/src/app/online/page.js#default`)},7026:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});var r=s(6621);let i=e=>[{type:"image/svg+xml",sizes:"any",url:(0,r.fillMetadataSegment)(".",e.params,"icon.svg")+"?465e94faf88034dd"}]},5023:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[948,471,339],()=>s(9));module.exports=r})();