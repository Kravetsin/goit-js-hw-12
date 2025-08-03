import{S as d,a as f,i as l}from"./assets/vendor-B4hrrHhy.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const g=new d(".gallery a",{captionsData:"alt",captionDelay:250}),a=document.querySelector(".loader");function m(s){const o=document.querySelector(".gallery"),n=s.map(t=>`
    <li class="gallery__item">
      <a class="gallery__link" href="${t.largeImageURL}">
        <img class="gallery__image" src="${t.webformatURL}" alt="${t.tags}" />
      </a>
      <div class="image__info">
        <p><strong>Likes:</strong> ${t.likes}</p>
        <p><strong>Views:</strong> ${t.views}</p>
        <p><strong>Comments:</strong> ${t.comments}</p>
        <p><strong>Downloads:</strong> ${t.downloads}</p>
      </div>
    </li>
  `).join("");o.insertAdjacentHTML("beforeend",n),g.refresh()}function p(){const s=document.querySelector(".gallery");s.innerHTML=""}function y(){a&&a.classList.remove("hidden")}function h(){a&&a.classList.add("hidden")}function L(s,o=1){const t="https://pixabay.com/api/?key="+"51218817-9c6b1fab233f845d5e532ac94"+"&q="+encodeURIComponent(s)+"&per_page=9&image_type=photo&orientation=horizontal&safesearch=true";return f.get(t).then(e=>e.data).catch(e=>(console.log(e),[]))}const u=document.querySelector(".form"),c=u.elements["search-text"];u.addEventListener("submit",s=>{s.preventDefault();const o=c.value.trim();if(!o){l.warning({title:"Warning",message:"Please enter a search term!"});return}y(),p(),L(o).then(n=>{if(n.hits.length===0){l.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}m(n.hits),c.value=""}).catch(n=>{l.error({title:"Error",message:"Something went wrong. Please try again later."}),console.error(n)}).finally(()=>{h()})});
//# sourceMappingURL=index.js.map
