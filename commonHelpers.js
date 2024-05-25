import{a as w,i as h}from"./assets/vendor-54d287f0.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const v=t=>t.reduce((i,{tags:r,webformatURL:o,largeImageURL:e,likes:s,views:c,comments:y,downloads:L})=>i+`<li class="photo-container">
        <a href=${e} class="card-link js-card-link">
            <img class="photo" src="${o}" alt="${r}">
        </a>
        <div class="info">
            <div class="info-item">
                <span class="title">Likes</span>
                <span class="info">${s}</span>
            </div>
            <div class="info-item">
                <span class="title">Views</span>
                <span class="info">${c}</span>
            </div>
            <div class="info-item">
                <span class="title">Comments</span>
                <span class="info">${y}</span>
            </div>
            <div class="info-item">
                <span class="title">Downloads</span>
                <span class="info">${L}</span>
            </div>
        </div>
      </li>`,""),b="43980055-7b6f3c9bb35f6313f62cf8461",P="https://pixabay.com/api/",S=async(t,i=1,r=15)=>{const o=new URLSearchParams({key:b,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:r,page:i});try{return(await w.get(`${P}/?${o}`)).data}catch{throw new Error("Sorry, something went wrong with the API request.")}},d=document.querySelector(".gallery"),q=document.querySelector(".search-form"),a=document.querySelector(".loader"),n=document.querySelector(".btn");let u="",l=1,p=15,f=0,m=null;async function g(){try{const t=await S(u,l);if(f=Math.ceil(t.totalHits/p),t.hits.length===0&&l===1){h.error({position:"topRight",timeout:2e3,message:"Sorry, there are no images matching your search query. Please try again!"}),n.classList.add("is-hidden"),a.classList.add("is-hidden");return}const i=d.getBoundingClientRect().height;d.insertAdjacentHTML("beforeend",v(t.hits));const o=d.getBoundingClientRect().height-i;window.scrollBy({top:o,behavior:"smooth"}),m||(m=new SimpleLightbox(".gallery a",{captionsData:"alt",captionsDelay:250})),l>=f||t.hits.length<p?n.classList.add("is-hidden"):n.classList.remove("is-hidden"),a.classList.add("is-hidden")}catch(t){h.error({position:"topRight",timeout:2e3,message:"Sorry, something went wrong. Please try again!"}),console.log(t),a.classList.add("is-hidden"),n.classList.remove("is-hidden")}}async function $(t){if(t.preventDefault(),u=t.target.elements.searchKeyword.value.trim(),d.innerHTML="",l=1,n.classList.add("is-hidden"),a.classList.remove("is-hidden"),u===""){h.error({position:"topRight",timeout:2e3,message:"Please enter a search query!"}),a.classList.add("is-hidden");return}await g(),t.target.reset()}async function R(){l+=1,n.classList.add("is-hidden"),a.classList.remove("is-hidden"),await g()}q.addEventListener("submit",$);n.addEventListener("click",R);
//# sourceMappingURL=commonHelpers.js.map
