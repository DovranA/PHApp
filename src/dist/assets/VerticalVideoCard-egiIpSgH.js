import{u as w,ad as b,d as o,j as t,L as N,S as n}from"./index-BPfmdpj5.js";import{h as V}from"./index-CmJFHjED.js";const k=({image:p,count:d,date:h,title:x,id:c,userId:u})=>{const r=w(),j=b(),a=o(e=>e.profile),s=o(e=>e.search),i=o(e=>e.category),{startfrom:l,qr:v}=o(e=>e.siteOpt.pagOpt),y=()=>{var f,m;const e=j.pathname.split("/")[1];switch(console.log(e),e){case"user":(f=a==null?void 0:a.data)!=null&&f.data&&r(n({data:(m=a==null?void 0:a.data)==null?void 0:m.data,idx:c,startfrom:l,titleVideo:"user/videos",id:Number(u),limit:5}));break;case"search":s!=null&&s.data&&l!==void 0&&r(n({data:s==null?void 0:s.data,idx:c,titleVideo:"search/video",startfrom:l+7,qr:v,limit:5}));break;case"category":i!=null&&i.data&&r(n({data:i.data,idx:c,titleVideo:"category",startfrom:l,id:i.id,type:i.type}));break}};return t.jsx(N,{to:"/player",onClick:y,children:t.jsxs("div",{className:"min-w-48 h-[380px] flex flex-col justify-center items-center",children:[t.jsxs("div",{className:"flex flex-5 h-80 w-full relative justify-center items-center rounded-md overflow-hidden",children:[t.jsx("div",{className:"flex w-12 h-12 absolute overflow-hidden rounded-full opacity-90 bg-[#FFFFFF59] items-center justify-center z-[1]",children:t.jsx(V,{color:"#fff"})}),t.jsx("img",{className:" w-full h-full object-cover ",src:p,alt:x})]}),t.jsxs("div",{className:"flex-3 text-white flex flex-col w-full",children:[t.jsx("h2",{className:"font-bold h-12 mt-2",children:x}),t.jsxs("p",{className:"text-[12px] text-[#989898]",children:[d>=1e3?Math.round(d/1e3)+"k":d," views:"," ",h]})]})]})})};export{k as V};
