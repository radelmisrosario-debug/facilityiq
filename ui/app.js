const app=document.getElementById("app");
const pageTitle=document.getElementById("page-title");
const homeButton=document.getElementById("home-button");

function getRoute(){const p=new URLSearchParams(location.search);return{view:p.get("view"),system:p.get("system"),asset:p.get("asset"),problem:p.get("problem"),step:p.get("step")}}
function setRoute(params){const u=new URL(location.href);u.search="";Object.entries(params).forEach(([k,v])=>{if(v)u.searchParams.set(k,v)});history.pushState({},"",u);render();window.scrollTo({top:0,behavior:"smooth"})}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function renderHome(){
  pageTitle.textContent="How can FacilityIQ help?";
  homeButton.hidden=true;
  app.innerHTML=`<section class="launch-hero">
    <span class="status">FACILITY TROUBLESHOOTING</span>
    <h2>Choose where you want to start</h2>
    <p>Select an individual asset, review the connected plant system, or describe the issue to the FacilityIQ assistant.</p>
  </section>
  <div class="launch-grid">
    <button class="launch-card asset-launch" id="assets-button">
      <span class="launch-number">01</span><span class="launch-type">EQUIPMENT</span>
      <h2>Troubleshoot an Asset</h2>
      <p>Find a specific chiller, pump, AHU, boiler, UPS, fan, compressor, or other asset and follow its diagnostic guide.</p>
      <span class="launch-link">Browse assets <b>→</b></span>
    </button>
    <button class="launch-card system-launch" id="systems-button">
      <span class="launch-number">02</span><span class="launch-type">PLANT OVERVIEW</span>
      <h2>Troubleshoot the Plant System</h2>
      <p>Trace equipment relationships, review flow paths, and work through system-level symptoms and checks.</p>
      <span class="launch-link">Open plant systems <b>→</b></span>
    </button>
    <button class="launch-card assistant-launch" id="assistant-button">
      <span class="launch-number">03</span><span class="launch-type">GUIDED ASSISTANT</span>
      <h2>Ask FacilityIQ</h2>
      <p>Describe what the equipment is doing in your own words. FacilityIQ will match the asset and guide the next checks.</p>
      <span class="launch-link">Start a conversation <b>→</b></span>
    </button>
  </div>
  <p class="launch-safety"><strong>Work safely.</strong> FacilityIQ supports trained personnel and does not replace LOTO, permits, site procedures, or manufacturer instructions.</p>`;
  document.getElementById("assets-button").onclick=()=>setRoute({view:"assets"});
  document.getElementById("systems-button").onclick=()=>setRoute({view:"systems"});
  document.getElementById("assistant-button").onclick=()=>facilityIqChat.toggle(true);
}

function renderAssetsHome(){
  pageTitle.textContent="Asset Troubleshooting";
  homeButton.hidden=false;
  app.innerHTML=`<div class="section-intro"><span class="status">EQUIPMENT</span><h2>Select the asset you want to troubleshoot</h2><p>Search by tag, equipment name, room, model, alarm, or symptom.</p></div><div class="toolbar"><input id="search" class="search" placeholder="Search asset, room, model, alarm, or symptom..." /></div><div id="asset-grid" class="card-grid"></div>`;
  const input=document.getElementById("search");
  const grid=document.getElementById("asset-grid");
  function draw(){
    const q=input.value.trim().toLowerCase();
    const list=Object.values(assets).filter(a=>[a.id,a.name,a.category,a.manufacturer,a.model,a.location,...facilityIqRoomsForAsset(a.id).flatMap(room=>[`room ${room}`,`lab ${room}`,`laboratory ${room}`]),...a.problems.flatMap(p=>[p.name,p.description])].join(" ").toLowerCase().includes(q));
    grid.innerHTML=list.map(a=>`<button class="card" data-asset="${esc(a.id)}"><span class="asset-id">${esc(a.id)}</span><h2>${esc(a.name)}</h2><p class="meta">${esc(a.category)}<br>${esc(a.location)}</p></button>`).join("");
    grid.querySelectorAll("[data-asset]").forEach(b=>b.onclick=()=>setRoute({asset:b.dataset.asset}));
  }
  input.oninput=draw; draw();
}

function renderSystemsHome(){
  pageTitle.textContent="Plant Systems";homeButton.hidden=false;
  app.innerHTML=`<div class="system-intro result-card"><span class="status">V06 PLANT MODEL</span><h2>Interactive equipment relationships</h2><p>Open a system to trace flow, identify upstream/downstream equipment, and use system-level troubleshooting checks.</p></div><div class="card-grid">${Object.values(facilitySystems).map(s=>`<button class="card" data-system="${esc(s.id)}"><span class="card-kicker">SYSTEM MAP</span><h2>${esc(s.name)}</h2><p class="meta">${esc(s.description)}</p></button>`).join("")}</div>`;
  app.querySelectorAll("[data-system]").forEach(b=>b.onclick=()=>setRoute({system:b.dataset.system}));
}
function renderSystem(system){
  pageTitle.textContent=system.name;homeButton.hidden=false;
  const nodeById=Object.fromEntries(system.nodes.map(n=>[n.id,n]));
  const lines=system.links.map(([from,to])=>{const a=nodeById[from],b=nodeById[to];return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" marker-end="url(#arrow)"/>`}).join("");
  const nodes=system.nodes.map(n=>`<button class="system-node ${esc(n.type)}" style="left:${n.x}%;top:${n.y}%" ${n.asset?`data-node-asset="${esc(n.asset)}"`:""}><strong>${esc(n.label)}</strong>${n.sub?`<span>${esc(n.sub)}</span>`:""}</button>`).join("");
  app.innerHTML=`<div class="result-card system-summary"><span class="status">INTERACTIVE SYSTEM</span><h2>${esc(system.name)}</h2><p>${esc(system.description)}</p><ul>${system.notes.map(n=>`<li>${esc(n)}</li>`).join("")}</ul></div><div class="system-map"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z"></path></marker></defs>${lines}</svg>${nodes}</div><section class="system-diagnostics"><h3>System-level troubleshooting</h3>${system.commonSymptoms.map(s=>`<details><summary>${esc(s.name)}</summary><ol>${s.checks.map(c=>`<li>${esc(c)}</li>`).join("")}</ol></details>`).join("")}</section>`;
  app.querySelectorAll("[data-node-asset]").forEach(b=>b.onclick=()=>setRoute({asset:b.dataset.nodeAsset}));
}
function renderAsset(asset){
  pageTitle.textContent=asset.name;homeButton.hidden=false;
  const manual=asset.manual?`<a class="manual-button" href="${asset.manual}" target="_blank" rel="noopener">View Manual</a>`:`<span class="small-note">Manual not uploaded yet</span>`;
  const servedRooms=facilityIqRoomsForAsset(asset.id);
  const roomList=servedRooms.length?`<div class="served-rooms"><strong>Rooms / labs served</strong><p>“Room” and “Lab” are interchangeable in FacilityIQ. Each listed AHU area has a dedicated CAV/VAV terminal; terminal type and tag remain to be confirmed.</p><div>${servedRooms.map(room=>`<span>${esc(room)}</span>`).join("")}</div></div>`:"";
  const directSystems=Object.values(facilitySystems).filter(s=>s.nodes.some(n=>n.asset===asset.id));
  const inferredSystems=asset.category==="Air Handling Unit"?[facilitySystems.chilledWater,facilitySystems.hotWater,facilitySystems.controlAir]:[];
  const relatedSystems=[...new Map([...directSystems,...inferredSystems].filter(Boolean).map(system=>[system.id,system])).values()];
  const systemLinks=relatedSystems.length?`<div class="related-systems"><strong>Related systems</strong>${relatedSystems.map(s=>`<button class="text-button" data-related-system="${esc(s.id)}">${esc(s.name)}</button>`).join("")}</div>`:"";
  const controlsNote=asset.category==="Air Handling Unit"?`<div class="operating-note"><strong>AHU control relationships</strong><p>Cooling depends on chilled water at the active Desigo setpoint and pneumatic air from the dedicated Control Air Compressor and Control Air Dryer. The heating valve is normally open and the cooling valve is normally closed; loss of control air can create simultaneous heating and loss of cooling.</p></div>`:asset.id==="Control-AC"||asset.id==="Control-AC-Air-Dryer"?`<div class="operating-note"><strong>AHU control-air dependency</strong><p>This asset is part of the dedicated pneumatic control-air source for AHU valves. Low header or branch pressure can leave heating valves open and cooling valves closed.</p></div>`:asset.id.startsWith("House-AC-")?`<div class="operating-note"><strong>Laboratory compressed-air service</strong><p>This House Air Compressor supplies laboratory compressed-air demand. It does not supply pneumatic control air to the AHU valves.</p></div>`:"";
  app.innerHTML=`<div class="result-card asset-overview"><span class="status">${esc(asset.id)}</span><h2>${esc(asset.name)}</h2><p class="meta"><strong>Category:</strong> ${esc(asset.category)}<br><strong>Manufacturer:</strong> ${esc(asset.manufacturer)}<br><strong>Model:</strong> ${esc(asset.model)}<br><strong>Location:</strong> ${esc(asset.location)}</p>${manual}${systemLinks}${roomList}${controlsNote}<div class="danger"><strong>Safety:</strong> These guides support trained personnel. They do not replace lockout/tagout, permits, site procedures, manufacturer instructions, or qualified service requirements.</div></div>
  <h3 class="section-title">Select the symptom</h3><div class="card-grid">${asset.problems.map(p=>`<button class="card symptom-card" data-problem="${esc(p.id)}"><span class="card-kicker">GUIDED DIAGNOSIS</span><h2>${esc(p.name)}</h2><p class="meta">${esc(p.description)}</p></button>`).join("")}</div>
  ${renderDiagnosticPanel(asset)}`;
  app.querySelectorAll("[data-related-system]").forEach(b=>b.onclick=()=>setRoute({system:b.dataset.relatedSystem}));
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
  const r=getRoute();if(r.system){const s=facilitySystems[r.system];return s?renderSystem(s):renderSystemsHome();}if(r.view==="systems")return renderSystemsHome();if(r.view==="assets")return renderAssetsHome();if(!r.asset)return renderHome();
  const a=assets[r.asset];if(!a)return renderHome();
  if(!r.problem||!r.step)return renderAsset(a);
  const p=a.problems.find(x=>x.id===r.problem);if(!p)return renderAsset(a);
  renderStep(a,p,r.step);
}
homeButton.onclick=()=>setRoute({});
addEventListener("popstate",render);
render();
