const app=document.getElementById("app");
const pageTitle=document.getElementById("page-title");
const homeButton=document.getElementById("home-button");

function getRoute(){const p=new URLSearchParams(location.search);return{asset:p.get("asset"),problem:p.get("problem"),step:p.get("step")}}
function setRoute(params){const u=new URL(location.href);u.search="";Object.entries(params).forEach(([k,v])=>{if(v)u.searchParams.set(k,v)});history.pushState({},"",u);render();window.scrollTo({top:0,behavior:"smooth"})}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function renderHome(){
  pageTitle.textContent="Troubleshooting Engine";
  homeButton.hidden=true;
  app.innerHTML=`<div class="toolbar"><input id="search" class="search" placeholder="Search asset, room, model, alarm, or symptom..." /></div><div id="asset-grid" class="card-grid"></div>`;
  const input=document.getElementById("search");
  const grid=document.getElementById("asset-grid");
  function draw(){
    const q=input.value.trim().toLowerCase();
    const list=Object.values(assets).filter(a=>[a.id,a.name,a.category,a.manufacturer,a.model,a.location,...a.problems.flatMap(p=>[p.name,p.description])].join(" ").toLowerCase().includes(q));
    grid.innerHTML=list.map(a=>`<button class="card" data-asset="${esc(a.id)}"><span class="asset-id">${esc(a.id)}</span><h2>${esc(a.name)}</h2><p class="meta">${esc(a.category)}<br>${esc(a.location)}</p></button>`).join("");
    grid.querySelectorAll("[data-asset]").forEach(b=>b.onclick=()=>setRoute({asset:b.dataset.asset}));
  }
  input.oninput=draw; draw();
}

function renderAsset(asset){
  pageTitle.textContent=asset.name;homeButton.hidden=false;
  const manual=asset.manual?`<a class="manual-button" href="${asset.manual}" target="_blank" rel="noopener">View Manual</a>`:`<span class="small-note">Manual not uploaded yet</span>`;
  app.innerHTML=`<div class="result-card asset-overview"><span class="status">${esc(asset.id)}</span><h2>${esc(asset.name)}</h2><p class="meta"><strong>Category:</strong> ${esc(asset.category)}<br><strong>Manufacturer:</strong> ${esc(asset.manufacturer)}<br><strong>Model:</strong> ${esc(asset.model)}<br><strong>Location:</strong> ${esc(asset.location)}</p>${manual}<div class="danger"><strong>Safety:</strong> These guides support trained personnel. They do not replace lockout/tagout, permits, site procedures, manufacturer instructions, or qualified service requirements.</div></div>
  <h3 class="section-title">Select the symptom</h3><div class="card-grid">${asset.problems.map(p=>`<button class="card symptom-card" data-problem="${esc(p.id)}"><span class="card-kicker">GUIDED DIAGNOSIS</span><h2>${esc(p.name)}</h2><p class="meta">${esc(p.description)}</p></button>`).join("")}</div>
  ${renderDiagnosticPanel(asset)}`;
  app.querySelectorAll("[data-problem]").forEach(b=>b.onclick=()=>{const p=asset.problems.find(x=>x.id===b.dataset.problem);clearSession(asset.id,p.id);setRoute({asset:asset.id,problem:p.id,step:p.startStep})});
  bindDiagnosticPanel(asset);
}
function renderStep(asset,problem,stepId){
  const s=steps[stepId];pageTitle.textContent=`${asset.id}: ${problem.name}`;homeButton.hidden=false;
  if(!s){app.innerHTML=`<div class="result-card"><h2>Step not found</h2></div>`;return}
  const data=readSession(asset.id,problem.id);
  if(s.type==="question"){
    const answered=data.answers.length;
    const progress=Math.min(90,Math.max(12,answered*22+12));
    app.innerHTML=`<div class="result-card question-card"><div class="step-topline"><span class="status">${esc(asset.id)}</span><span class="step-count">${answered+1} diagnostic check${answered===0?"":"s"}</span></div><div class="progress-track" aria-label="Diagnosis progress"><div class="progress-fill" style="width:${progress}%"></div></div><div class="progress-label">Guided troubleshooting</div><h2>${esc(s.text)}</h2><div class="warning"><strong>Safety:</strong> ${esc(s.safety)}</div><div class="button-row"><button id="yes" class="answer-button">Yes</button><button id="no" class="answer-button">No</button></div><button id="asset-back" class="text-button">Back to ${esc(asset.id)} symptoms</button></div>`;
    document.getElementById("yes").onclick=()=>{recordAnswer(asset,problem,stepId,s.text,"YES");setRoute({asset:asset.id,problem:problem.id,step:s.yes})};
    document.getElementById("no").onclick=()=>{recordAnswer(asset,problem,stepId,s.text,"NO");setRoute({asset:asset.id,problem:problem.id,step:s.no})};
    document.getElementById("asset-back").onclick=()=>setRoute({asset:asset.id});
  } else {
    const manual=asset.manual?`<a class="manual-button" href="${asset.manual}" target="_blank" rel="noopener">Open Manufacturer Manual</a>`:"";
    const checks=data.answers.length?`<div class="checks"><h3>Checks completed</h3>${data.answers.map(x=>`<div class="check-row"><span class="${x.answer==="YES"?"check-yes":"check-no"}">${esc(x.answer)}</span><p>${esc(x.question)}</p></div>`).join("")}</div>`:"";
    app.innerHTML=`<div class="result-card result-final"><div class="progress-track"><div class="progress-fill" style="width:100%"></div></div><span class="status">DIAGNOSTIC RESULT</span><h2>${esc(s.title)}</h2><p><strong>Likely cause:</strong><br>${esc(s.cause)}</p><p><strong>Recommended action:</strong><br>${esc(s.action)}</p><div class="warning"><strong>Safety:</strong> ${esc(s.safety)}</div>${checks}<div class="button-row"><button id="copy-summary" class="primary-button">Copy Troubleshooting Summary</button><button id="restart" class="secondary-button">Restart Guide</button></div><button id="back" class="text-button">Back to ${esc(asset.id)}</button><div class="manual-wrap">${manual}</div></div>`;
    document.getElementById("copy-summary").onclick=e=>copyText(troubleshootingSummary(asset,problem,s),e.currentTarget);
    document.getElementById("restart").onclick=()=>{clearSession(asset.id,problem.id);setRoute({asset:asset.id,problem:problem.id,step:problem.startStep})};
    document.getElementById("back").onclick=()=>setRoute({asset:asset.id});
  }
}
function render(){
  const r=getRoute();if(!r.asset)return renderHome();
  const a=assets[r.asset];if(!a)return renderHome();
  if(!r.problem||!r.step)return renderAsset(a);
  const p=a.problems.find(x=>x.id===r.problem);if(!p)return renderAsset(a);
  renderStep(a,p,r.step);
}
homeButton.onclick=()=>setRoute({});
addEventListener("popstate",render);
render();
