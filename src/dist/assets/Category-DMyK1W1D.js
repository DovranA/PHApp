import{u as d,j as t,s as x,d as n,r as m,ac as u}from"./index-BPfmdpj5.js";import{V as f}from"./VerticalVideoCard-egiIpSgH.js";import{C as h}from"./CardConatiner-BodIkh0m.js";import{S as g,M as b}from"./Swiper-DA3l1HRU.js";import{h as j}from"./moment-C5S46NFB.js";import"./index-CmJFHjED.js";import"./index-CZFE0WBW.js";import"./swiper-DiBAr92Y.js";import"./autoplay-DOEdHaJN.js";import"./motion-D6_1TIaT.js";const p=({active:o,name:r,id:s,type:a})=>{const i=d();return t.jsx("button",{onClick:()=>i(x({id:s,type:a})),className:`py-2  rounded-lg px-3   font-semibold whitespace-nowrap ${o?"bg-white text-black":"bg-[#282828] text-white"}`,children:r})},C=()=>{const{subCat:o,id:r,catinfo:s}=n(a=>a.category);return t.jsxs("div",{className:"flex flex-col px-10 pt-10 text-white gap-5",children:[t.jsx("h2",{className:"text-2xl",children:s.name}),t.jsxs("div",{className:"flex gap-4 overflow-x-auto",children:[t.jsx(p,{id:s.id,name:"All",active:s.id===r,type:"category"}),o.map(a=>t.jsx(p,{id:a.id,name:a.name,active:a.id===r,type:"sub"},a.id))]})]})},V=()=>{const o=d(),{data:r,id:s,type:a}=n(e=>e.category),{startfrom:i,limit:c}=n(e=>e.siteOpt.pagOpt),{category_page_banner:l}=n(e=>e.siteOpt.banner);return m.useEffect(()=>{o(u({type:a,id:s,startfrom:i,limit:c}))},[,a,i,s,c]),t.jsxs(t.Fragment,{children:[t.jsx(g,{banner:l}),t.jsx(C,{}),t.jsx(b,{children:t.jsx(h,{children:r&&r.map(e=>t.jsx(f,{id:e.id,count:e.view_count,date:j(e.posted_at).fromNow(),title:e.description.slice(0,10)+"...",image:e.thumbnail},e.id))})})]})};export{V as default};
