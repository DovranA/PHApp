import{d as i,u as m,r as c,a8 as d,j as o}from"./index-BPfmdpj5.js";import{S as l,M as f}from"./Swiper-DA3l1HRU.js";import{C as u}from"./CardConatiner-BodIkh0m.js";import{h as x}from"./moment-C5S46NFB.js";import{P as h}from"./Pagination-CaY8LbTr.js";import{H as j}from"./HorizontalVideoCard-bgk5dKnV.js";import"./swiper-DiBAr92Y.js";import"./autoplay-DOEdHaJN.js";import"./motion-D6_1TIaT.js";import"./index-CZFE0WBW.js";import"./index-C_UYdc-g.js";import"./index-CmJFHjED.js";import"./index-nw_7Qdlw.js";import"./index-B7zPDZd5.js";const P=()=>{const{data:a,total:s}=i(t=>t.lenta),{startfrom:n,limit:r}=i(t=>t.siteOpt.pagOpt),{video_page_banner:e}=i(t=>t.siteOpt.banner),p=m();return c.useEffect(()=>{p(d({startfrom:n,limit:r}))},[,n,r]),o.jsxs("div",{className:"flex flex-col pb-10",children:[o.jsx(l,{banner:e}),o.jsxs(f,{children:[o.jsx(u,{title:"Lenta",count:s,children:a==null?void 0:a.map(t=>o.jsx(j,{count:t.view_count,date:x(t.posted_at).fromNow(),image:t.thumbnail,id:t.id,pinned:t.pinned},t.id))}),r&&s>r&&o.jsx(h,{total:s})]})]})};export{P as default};
