(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[28],{3170:(e,t,l)=>{"use strict";l.d(t,{A:()=>s});var a=l(5155);let s=e=>{let{message:t,onConfirm:l,onCancel:s,isOpen:n}=e;return n?(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center",children:(0,a.jsxs)("div",{className:"bg-white p-6 rounded shadow-lg w-96",children:[(0,a.jsx)("h2",{className:"text-lg font-bold mb-4",children:"Confirm Action"}),(0,a.jsx)("p",{className:"mb-6",children:t}),(0,a.jsxs)("div",{className:"flex justify-end gap-4",children:[(0,a.jsx)("button",{onClick:s,className:"bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition",children:"Cancel"}),(0,a.jsx)("button",{onClick:l,className:"bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition",children:"Confirm"})]})]})}):null}},9899:(e,t,l)=>{"use strict";let a;l.d(t,{A:()=>i});var s=l(5155),n=l(2115);l(8413);let r=e=>{let{isOpen:t,onClose:r,onSelect:i}=e,d=(0,n.useRef)(null),[c,o]=(0,n.useState)(null);return((0,n.useEffect)(()=>{if(t)return l.e(761).then(l.t.bind(l,8741,23)).then(e=>{a=e,null!==d.current&&(d.current.remove(),d.current=null),d.current=a.map("location-map").setView([51.505,-.09],13),a.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"\xa9 OpenStreetMap contributors"}).addTo(d.current),d.current.on("click",e=>{let{lat:t,lng:l}=e.latlng;c&&c.remove(),o(a.marker([t,l]).addTo(d.current)),i({latitude:t,longitude:l}),r()})}),()=>{d.current&&(d.current.remove(),d.current=null)}},[t]),t)?(0,s.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4",children:(0,s.jsxs)("div",{className:"bg-white p-4 rounded shadow-lg w-full max-w-2xl h-auto relative",children:[(0,s.jsx)("h2",{className:"text-lg font-bold mb-2",children:"Click on the map to select a location"}),(0,s.jsx)("div",{id:"location-map",className:"w-full h-72 border border-gray-300 rounded"}),(0,s.jsx)("button",{className:"absolute top-2 right-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition",onClick:r,children:"Close"})]})}):null},i=e=>{let{event:t,onSubmit:l,onClose:a}=e,i=!!t,[d,c]=(0,n.useState)((null==t?void 0:t.title)||""),[o,u]=(0,n.useState)((null==t?void 0:t.type)||""),[x,p]=(0,n.useState)(t?new Date(null==t?void 0:t.date).toISOString().split("T")[0]:""),[h,b]=(0,n.useState)((null==t?void 0:t.capacity)||0),[m,g]=(0,n.useState)((null==t?void 0:t.locationName)||""),[y,j]=(0,n.useState)((null==t?void 0:t.location)?{latitude:t.location.latitude,longitude:t.location.longitude}:null),[N,v]=(0,n.useState)(!1),f=d&&o&&x&&h&&m&&y,w=async e=>{e.preventDefault(),await l({title:d,type:o,date:x,capacity:h,locationName:m,location:y}),a()};return(0,s.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center",children:(0,s.jsxs)("div",{className:"bg-white p-6 rounded shadow-lg w-96",children:[(0,s.jsx)("h2",{className:"text-xl font-bold mb-4",children:i?"Edit Event":"Add Event"}),(0,s.jsxs)("form",{onSubmit:w,children:[(0,s.jsxs)("label",{className:"block text-gray-700",children:["Title ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"text",value:d,onChange:e=>c(e.target.value),required:!0,className:"w-full p-2 border border-gray-300 rounded mt-1"}),(0,s.jsxs)("label",{className:"block text-gray-700 mt-3",children:["Type ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"text",value:o,onChange:e=>u(e.target.value),required:!0,className:"w-full p-2 border border-gray-300 rounded mt-1"}),(0,s.jsxs)("label",{className:"block text-gray-700 mt-3",children:["Date ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"date",value:x,onChange:e=>p(e.target.value),required:!0,className:"w-full p-2 border border-gray-300 rounded mt-1"}),(0,s.jsxs)("label",{className:"block text-gray-700 mt-3",children:["Capacity ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"number",value:h,onChange:e=>b(e.target.value),required:!0,className:"w-full p-2 border border-gray-300 rounded mt-1"}),(0,s.jsxs)("label",{className:"block text-gray-700 mt-3",children:["Location name ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"text",value:m,onChange:e=>g(e.target.value),required:!0,className:"w-full p-2 border border-gray-300 rounded mt-1"}),(0,s.jsxs)("label",{className:"block text-gray-700 mt-3",children:["Location ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("button",{type:"button",className:"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full",onClick:()=>v(!0),children:"Select Location on Map"}),y&&(0,s.jsx)("div",{className:"mt-2 text-gray-600",children:(0,s.jsxs)("span",{className:"text-sm",children:["Selected Location: ",y.latitude.toFixed(6),", ",y.longitude.toFixed(6)]})}),(0,s.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,s.jsx)("button",{type:"submit",disabled:!f,className:"px-4 py-2 rounded text-white transition ".concat(f?"bg-green-500 hover:bg-green-700":"bg-gray-400 cursor-not-allowed"),children:i?"Save Changes":"Add Event"}),(0,s.jsx)("button",{type:"button",onClick:a,className:"bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition",children:"Cancel"})]})]}),N&&(0,s.jsx)(r,{isOpen:N,onClose:()=>v(!1),onSelect:e=>j(e)})]})})}},9695:(e,t,l)=>{"use strict";l.d(t,{A:()=>r});var a=l(5155),s=l(2115),n=l(9899);let r=e=>{let{events:t,onDelete:l,onEditSubmit:r,onDetails:i,onCancel:d,buttonTypes:c}=e,[o,u]=(0,s.useState)(null);return(0,a.jsxs)("div",{className:"overflow-x-auto",children:[(0,a.jsxs)("table",{className:"min-w-full border border-gray-200 shadow-lg bg-white",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{className:"bg-gray-800 text-white",children:[(0,a.jsx)("th",{className:"px-6 py-3 text-left",children:"Title"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left",children:"Type"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left",children:"Date"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left",children:"Location"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left",children:"Capacity"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left",children:"Actions"})]})}),(0,a.jsx)("tbody",{children:t.map(e=>(0,a.jsxs)("tr",{className:"border-b hover:bg-gray-100",children:[(0,a.jsx)("td",{className:"px-6 py-4",children:e.title}),(0,a.jsx)("td",{className:"px-6 py-4",children:e.type}),(0,a.jsx)("td",{className:"px-6 py-4",children:new Date(e.date).toLocaleDateString()}),(0,a.jsx)("td",{className:"px-6 py-4",children:e.locationName}),(0,a.jsx)("td",{className:"px-6 py-4",children:e.capacity}),(0,a.jsxs)("td",{className:"px-6 py-4 flex gap-2",children:[(null==c?void 0:c.edit)&&(0,a.jsx)("button",{onClick:()=>u(e),className:"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition",children:"Edit"}),(null==c?void 0:c.delete)&&(0,a.jsx)("button",{onClick:()=>l(e.id),className:"bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition",children:"Delete"}),(null==c?void 0:c.details)&&(0,a.jsx)("button",{onClick:()=>i(e),className:"bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition",children:"Details"}),(null==c?void 0:c.cancel)&&(0,a.jsx)("button",{onClick:()=>d(e.id),className:"bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition",children:"Cancel"})]})]},e.id))})]}),o&&(0,a.jsx)(n.A,{event:o,onSubmit:e=>r(e,o.id),onClose:()=>u(null)})]})}},7406:(e,t,l)=>{"use strict";l.d(t,{y:()=>a});let a=(0,l(9904).Wp)({apiKey:"AIzaSyCJComwtLEjdXjxSl37KmOH9tU6zM5hkQQ",authDomain:"solentsocial-55341.firebaseapp.com",projectId:"solentsocial-55341",storageBucket:"solentsocial-55341.firebasestorage.app",messagingSenderId:"194148932525",appId:"1:194148932525:web:5407bfdc6a8211af2c9f24"})},6046:(e,t,l)=>{"use strict";var a=l(6658);l.o(a,"useRouter")&&l.d(t,{useRouter:function(){return a.useRouter}})},8413:()=>{}}]);