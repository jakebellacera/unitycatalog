const m={},h=new Set,c=new WeakSet;let u=!0,g,d=!1;function p(t){d||(d=!0,u??=!1,g??="hover",b(),y(),w(),L())}function b(){for(const t of["touchstart","mousedown"])document.addEventListener(t,e=>{r(e.target,"tap")&&l(e.target.href,{ignoreSlowConnection:!0})},{passive:!0})}function y(){let t;document.body.addEventListener("focusin",a=>{r(a.target,"hover")&&e(a)},{passive:!0}),document.body.addEventListener("focusout",n,{passive:!0}),f(()=>{for(const a of document.getElementsByTagName("a"))c.has(a)||r(a,"hover")&&(c.add(a),a.addEventListener("mouseenter",e,{passive:!0}),a.addEventListener("mouseleave",n,{passive:!0}))});function e(a){const o=a.target.href;t&&clearTimeout(t),t=setTimeout(()=>{l(o)},80)}function n(){t&&(clearTimeout(t),t=0)}}function w(){let t;f(()=>{for(const e of document.getElementsByTagName("a"))c.has(e)||r(e,"viewport")&&(c.add(e),t??=S(),t.observe(e))})}function S(){const t=new WeakMap;return new IntersectionObserver((e,n)=>{for(const a of e){const o=a.target,i=t.get(o);a.isIntersecting?(i&&clearTimeout(i),t.set(o,setTimeout(()=>{n.unobserve(o),t.delete(o),l(o.href)},300))):i&&(clearTimeout(i),t.delete(o))}})}function L(){f(()=>{for(const t of document.getElementsByTagName("a"))r(t,"load")&&l(t.href)})}function l(t,e){t=t.replace(/#.*/,"");const n=e?.ignoreSlowConnection??!1;if(k(t,n))if(h.add(t),document.createElement("link").relList?.supports?.("prefetch")&&e?.with!=="fetch"){const a=document.createElement("link");a.rel="prefetch",a.setAttribute("href",t),document.head.append(a)}else{const a=new Headers;for(const[o,i]of Object.entries(m))a.set(o,i);fetch(t,{priority:"low",headers:a})}}function k(t,e){if(!navigator.onLine||!e&&v())return!1;try{const n=new URL(t,location.href);return location.origin===n.origin&&(location.pathname!==n.pathname||location.search!==n.search)&&!h.has(t)}catch{}return!1}function r(t,e){if(t?.tagName!=="A")return!1;const n=t.dataset.astroPrefetch;return n==="false"?!1:e==="tap"&&(n!=null||u)&&v()?!0:n==null&&u||n===""?e===g:n===e}function v(){if("connection"in navigator){const t=navigator.connection;return t.saveData||/2g/.test(t.effectiveType)}return!1}function f(t){t();let e=!1;document.addEventListener("astro:page-load",()=>{if(!e){e=!0;return}t()})}document.addEventListener("DOMContentLoaded",async function(){console.log("GitHub stats script loaded");const t=document.querySelector(".sl-flex.social-icons")||document.querySelector('[class*="social"]')||document.querySelector(".sl-header__actions");if(t){console.log("Social container found, fetching GitHub data");try{const n=await(await fetch("https://api.github.com/repos/unitycatalog/unitycatalog")).json(),a=s=>s>=1e3?(s/1e3).toFixed(1)+"k":s.toString();let o="v0.3.0";try{o=(await(await fetch("https://api.github.com/repos/unitycatalog/unitycatalog/releases/latest")).json()).tag_name||o}catch{console.log("Could not fetch latest release, using fallback version")}const i=document.createElement("div");i.innerHTML=`
                  <div class="github-stats">
                    <a href="https://github.com/unitycatalog/unitycatalog" title="Go to repository" class="github-link">
                      <div class="github-info">
                        <ul class="github-facts">
                          <li class="github-fact github-fact--version">${o}</li>
                          <li class="github-fact github-fact--stars">${a(n.stargazers_count)}</li>
                          <li class="github-fact github-fact--forks">${a(n.forks_count)}</li>
                        </ul>
                      </div>
                    </a>
                  </div>
                `,i.className="github-stats-container",t.appendChild(i),console.log("GitHub stats added with live data")}catch{console.log("Failed to fetch GitHub data, using fallback");const n=document.createElement("div");n.innerHTML=`
                  <div class="github-stats">
                    <a href="https://github.com/unitycatalog/unitycatalog" title="Go to repository" class="github-link">
                      <div class="github-info">
                        <ul class="github-facts">
                          <li class="github-fact github-fact--version">v0.3.0</li>
                          <li class="github-fact github-fact--stars">3.1k</li>
                          <li class="github-fact github-fact--forks">523</li>
                        </ul>
                      </div>
                    </a>
                  </div>
                `,n.className="github-stats-container",t.appendChild(n)}}else console.log("Social container not found")});p();
