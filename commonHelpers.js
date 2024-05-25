import{a as w,i as d}from"./assets/vendor-54d287f0.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const v=t=>t.reduce((i,{tags:a,webformatURL:r,largeImageURL:e,likes:s,views:c,comments:y,downloads:L})=>i+`<li class="photo-container">
        <a href=${e} class="card-link js-card-link">
            <img class="photo" src="${r}" alt="${a}">
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
      </li>`,""),b="43980055-7b6f3c9bb35f6313f62cf8461",P="https://pixabay.com/api/",S=async(t,i=1,a=15)=>{const r=new URLSearchParams({key:b,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:a,page:i});try{return(await w.get(`${P}/?${r}`)).data}catch{throw new Error("Sorry, something went wrong with the API request.")}},h=document.querySelector(".gallery"),q=document.querySelector(".search-form"),n=document.querySelector(".loader"),o=document.querySelector(".btn");let p="",l=1,f=15,m=0,u=null;async function g(){try{const t=await S(p,l);if(m=Math.ceil(t.totalHits/f),t.hits.length===0&&l===1){d.error({position:"topRight",timeout:2e3,message:"Sorry, there are no images matching your search query. Please try again!"}),o.classList.add("is-hidden"),n.classList.add("is-hidden");return}const i=h.getBoundingClientRect().height;h.insertAdjacentHTML("beforeend",v(t.hits));const r=h.getBoundingClientRect().height-i;window.scrollBy({top:r,behavior:"smooth"}),u?u.refresh():u=new SimpleLightbox(".gallery a",{captionsData:"alt",captionsDelay:250}),l>=m||t.hits.length<f?(o.classList.add("is-hidden"),d.error({position:"topRight",timeout:2e3,message:"We are sorry, but you have reached the end of search results."})):o.classList.remove("is-hidden"),n.classList.add("is-hidden")}catch(t){d.error({position:"topRight",timeout:2e3,message:"Sorry, something went wrong. Please try again!"}),console.log(t),n.classList.add("is-hidden"),o.classList.remove("is-hidden")}}async function R(t){if(t.preventDefault(),p=t.target.elements.searchKeyword.value.trim(),h.innerHTML="",l=1,o.classList.add("is-hidden"),n.classList.remove("is-hidden"),p===""){d.error({position:"topRight",timeout:2e3,message:"Please enter a search query!"}),n.classList.add("is-hidden");return}await g(),t.target.reset()}async function $(){l+=1,o.classList.add("is-hidden"),n.classList.remove("is-hidden"),await g()}q.addEventListener("submit",R);o.addEventListener("click",$);
//# sourceMappingURL=commonHelpers.js.map
