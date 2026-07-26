const app=document.getElementById("app");
const pageTitle=document.getElementById("page-title");
const homeButton=document.getElementById("home-button");

function getRoute(){const p=new URLSearchParams(location.search);return{view:p.get("view"),system:p.get("system"),asset:p.get("asset"),problem:p.get("problem"),step:p.get("step")}}
function setRoute(params){const u=new URL(location.href);u.search="";Object.entries(params).forEach(([k,v])=>{if(v)u.searchParams.set(k,v)});history.pushState({},"",u);render();window.scrollTo({top:0,behavior:"smooth"})}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
const assetAlphabeticalCompare=(a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true,sensitivity:"base"})||a.id.localeCompare(b.id,undefined,{numeric:true,sensitivity:"base"});

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
    <button class="launch-card manual-launch" id="manual-button">
      <span class="launch-number">03</span><span class="launch-type">OPERATIONS REFERENCE</span>
      <h2>Facility Knowledge Base</h2>
      <p>Search operating sequences, system relationships, preventive-maintenance intervals, safety notes, and items that still need field verification.</p>
      <span class="launch-link">Explore knowledge base <b>→</b></span>
    </button>
    <button class="launch-card assistant-launch" id="assistant-button">
      <span class="launch-number">04</span><span class="launch-type">QUICK ANSWERS</span>
      <h2>Ask FacilityIQ</h2>
      <p>Ask which equipment serves a room, search facility knowledge, or describe an issue and open the matching troubleshooting guide.</p>
      <span class="launch-link">Ask a question <b>→</b></span>
    </button>
  </div>
  <p class="launch-safety"><strong>Work safely.</strong> FacilityIQ supports trained personnel and does not replace LOTO, permits, site procedures, or manufacturer instructions.</p>`;
  document.getElementById("assets-button").onclick=()=>setRoute({view:"assets"});
  document.getElementById("systems-button").onclick=()=>setRoute({view:"systems"});
  document.getElementById("assistant-button").onclick=()=>facilityIqChat.toggle(true);
  document.getElementById("manual-button").onclick=()=>setRoute({view:"manual"});
}

function renderOperationsManual(){
  pageTitle.textContent="Facility Knowledge Base";homeButton.hidden=false;
  const categories=["All",...new Set(facilityOperationsManual.sections.map(section=>section.category))];
  let activeCategory="All";
  app.innerHTML=`<div class="manual-hero result-card"><span class="status">FACILITY KNOWLEDGE</span><h2>Understand the system. Check the right things first.</h2><p>${esc(facilityOperationsManual.purpose)}</p></div>
  <section class="manual-controls" aria-label="Manual navigation">
    <label class="manual-search-label" for="manual-search">Search the manual</label>
    <input id="manual-search" class="search" placeholder="Try “chiller staging,” “fume hood,” “Room 503,” or “generator”" />
    <div class="manual-filters" role="group" aria-label="Filter manual by category">${categories.map(category=>`<button type="button" data-manual-category="${esc(category)}" class="${category==="All"?"active":""}">${esc(category)}</button>`).join("")}</div>
  </section>
  <div class="manual-layout"><aside class="manual-toc" aria-label="On this page"><strong>On this page</strong><nav id="manual-toc"></nav></aside><main id="manual-results" class="manual-results"></main></div>`;
  const input=document.getElementById("manual-search"),results=document.getElementById("manual-results"),toc=document.getElementById("manual-toc");
  function drawManual(){
    const query=input.value.trim().toLowerCase();
    const sections=facilityOperationsManual.sections.filter(section=>(activeCategory==="All"||section.category===activeCategory)&&[section.title,section.category,section.summary,...section.facts,...section.operations,section.safety,...section.verify].join(" ").toLowerCase().includes(query));
    toc.innerHTML=sections.map(section=>`<button type="button" data-manual-jump="${esc(section.id)}"><span>${esc(section.category)}</span>${esc(section.title)}</button>`).join("");
    results.innerHTML=sections.length?sections.map((section,index)=>`<article class="manual-section" id="manual-${esc(section.id)}"><div class="manual-section-head"><span>${esc(section.category)}</span><h3>${esc(section.title)}</h3><p>${esc(section.summary)}</p></div><div class="manual-section-body"><section><h4>System operation</h4><ul>${section.facts.map(item=>`<li>${esc(item)}</li>`).join("")}</ul></section><section><h4>Operating and field checks</h4><ol>${section.operations.map(item=>`<li>${esc(item)}</li>`).join("")}</ol></section><div class="manual-safety"><strong>Safety requirements</strong><p>${esc(section.safety)}</p></div>${section.verify.length?`<details class="manual-verify"${index===0?" open":""}><summary>Field verification and record control</summary><ul>${section.verify.map(item=>`<li>${esc(item)}</li>`).join("")}</ul></details>`:""}</div></article>`).join(""):`<div class="result-card manual-empty"><h2>No matching section</h2><p>Clear the category filter or try a shorter search such as “AHU,” “boiler,” “exhaust,” or “PM.”</p><button type="button" id="manual-clear" class="secondary-button">Clear filters</button></div>`;
    toc.querySelectorAll("[data-manual-jump]").forEach(button=>button.onclick=()=>document.getElementById(`manual-${button.dataset.manualJump}`)?.scrollIntoView({behavior:"smooth",block:"start"}));
    const clear=document.getElementById("manual-clear");if(clear)clear.onclick=()=>{activeCategory="All";input.value="";app.querySelectorAll("[data-manual-category]").forEach(button=>button.classList.toggle("active",button.dataset.manualCategory==="All"));drawManual()};
  }
  app.querySelectorAll("[data-manual-category]").forEach(button=>button.onclick=()=>{activeCategory=button.dataset.manualCategory;app.querySelectorAll("[data-manual-category]").forEach(item=>item.classList.toggle("active",item===button));drawManual()});
  input.oninput=drawManual;drawManual();
}

function renderAssetsHome(){
  pageTitle.textContent="Asset Troubleshooting";
  homeButton.hidden=false;
  app.innerHTML=`<div class="section-intro"><span class="status">EQUIPMENT</span><h2>Select the asset you want to troubleshoot</h2><p>Search by tag, equipment name, room, model, alarm, or symptom.</p></div><div class="toolbar"><input id="search" class="search" placeholder="Search asset, room, model, alarm, or symptom..." /></div><div id="asset-grid" class="card-grid"></div>`;
  const input=document.getElementById("search");
  const grid=document.getElementById("asset-grid");
  function draw(){
    const q=input.value.trim().toLowerCase();
    const list=Object.values(assets).filter(a=>[a.id,a.name,a.category,a.manufacturer,a.model,a.location,...facilityIqRoomsForAsset(a.id).flatMap(room=>[`room ${room}`,`lab ${room}`,`laboratory ${room}`]),...a.problems.flatMap(p=>[p.name,p.description])].join(" ").toLowerCase().includes(q)).sort(assetAlphabeticalCompare);
    grid.innerHTML=list.map(a=>{const manualStatus=facilityIqManualStatus(a);return `<article class="card asset-list-card" data-asset-card="${esc(a.id)}" role="link" tabindex="0" aria-label="Open ${esc(a.name)} troubleshooting"><span class="asset-id">${esc(a.id)}</span><h2><button type="button" class="asset-name-link" data-asset="${esc(a.id)}">${esc(a.name)}</button></h2><dl class="asset-details"><div><dt>Make</dt><dd>${esc(a.manufacturer||"To be confirmed")}</dd></div><div><dt>Model</dt><dd>${esc(a.model||"To be confirmed")}</dd></div><div><dt>Location</dt><dd>${esc(a.location||"To be confirmed")}</dd></div></dl><div class="asset-card-actions"><button type="button" class="primary-button" data-asset="${esc(a.id)}">Troubleshoot</button>${a.manual?`<a class="manual-button" href="${esc(a.manual)}" target="_blank" rel="noopener">Open manual</a>`:`<span class="manual-unavailable">${esc(manualStatus.label)}</span>`}</div>${a.manualNote?`<p class="small-note asset-manual-note">${esc(a.manualNote)}</p>`:""}</article>`}).join("");
    grid.querySelectorAll("[data-asset]").forEach(b=>b.onclick=()=>setRoute({asset:b.dataset.asset}));
    grid.querySelectorAll("[data-asset-card]").forEach(card=>{
      card.onclick=event=>{if(!event.target.closest("a,button"))setRoute({asset:card.dataset.assetCard})};
      card.onkeydown=event=>{if((event.key==="Enter"||event.key===" ")&&!event.target.closest("a,button")){event.preventDefault();setRoute({asset:card.dataset.assetCard})}};
    });
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
  const lines=system.links.map(([from,to,type="flow"])=>{const a=nodeById[from],b=nodeById[to];return `<line class="${esc(type)}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" marker-end="url(#arrow)"/>`}).join("");
  const loopPipes=(system.loopPipes||[]).map(pipe=>`<path class="${esc(pipe.type)}" d="${esc(pipe.d)}" marker-end="url(#arrow)"/>`).join("");
  const pipeLabels=(system.pipeLabels||[]).map(label=>`<span class="pipe-label ${esc(label.type)}" style="left:${label.x}%;top:${label.y}%">${esc(label.text)}</span>`).join("");
  const nodes=system.nodes.map(n=>`<button class="system-node ${esc(n.type)}" style="left:${n.x}%;top:${n.y}%" ${n.asset?`data-node-asset="${esc(n.asset)}"`:""}><strong>${esc(n.label)}</strong>${n.sub?`<span>${esc(n.sub)}</span>`:""}</button>`).join("");
  app.innerHTML=`<div class="result-card system-summary"><span class="status">INTERACTIVE SYSTEM</span><h2>${esc(system.name)}</h2><p>${esc(system.description)}</p><ul>${system.notes.map(n=>`<li>${esc(n)}</li>`).join("")}</ul></div><div class="system-map system-${esc(system.id)}"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z"></path></marker></defs>${loopPipes}${lines}</svg>${pipeLabels}${nodes}</div><section class="system-diagnostics"><h3>System-level troubleshooting</h3>${system.commonSymptoms.map(s=>`<details><summary>${esc(s.name)}</summary><ol>${s.checks.map(c=>`<li>${esc(c)}</li>`).join("")}</ol></details>`).join("")}</section>`;
  app.querySelectorAll("[data-node-asset]").forEach(b=>b.onclick=()=>setRoute({asset:b.dataset.nodeAsset}));
}
function renderAsset(asset){
  pageTitle.textContent=asset.name;homeButton.hidden=false;
  const manual=asset.manual?`<a class="manual-button" href="${asset.manual}" target="_blank" rel="noopener">View Manual</a>`:`<span class="small-note resource-unavailable">Manual not uploaded yet</span>`;
  const partsButton=facilityIqAssetPartsButtonMarkup(asset);
  const servedRooms=facilityIqRoomsForAsset(asset.id);
  const exhaustSystems=facilityIqExhaustSystemsForAsset(asset.id);
  const roomDescription=exhaustSystems.length?"These laboratories share ductwork and are exhausted by the listed fan pair.":"“Room” and “Lab” are interchangeable in FacilityIQ. Each listed AHU area has a dedicated CAV/VAV terminal, and every VAV has a heating valve. Terminal type and tag remain to be confirmed.";
  const roomList=servedRooms.length?`<div class="served-rooms"><strong>Rooms / labs served</strong><p>${esc(roomDescription)}</p><div>${servedRooms.map(room=>`<span>${esc(room)}</span>`).join("")}</div></div>`:"";
  const directSystems=Object.values(facilitySystems).filter(s=>s.nodes.some(n=>n.asset===asset.id));
  const inferredSystems=asset.category==="Air Handling Unit"?[facilitySystems.chilledWater,facilitySystems.hotWater,facilitySystems.controlAir]:[];
  const relatedSystems=[...new Map([...directSystems,...inferredSystems].filter(Boolean).map(system=>[system.id,system])).values()];
  const systemLinks=relatedSystems.length?`<div class="related-systems"><strong>Related systems</strong>${relatedSystems.map(s=>`<button class="text-button" data-related-system="${esc(s.id)}">${esc(s.name)}</button>`).join("")}</div>`:"";
  const houseDryerMatch=asset.id.match(/^House-AC-Air-Dryer-(0[1-3])$/);
  const controlsNote=asset.category==="Air Handling Unit"?`<div class="operating-note"><strong>AHU control relationships</strong><p>Cooling depends on chilled water at the active Desigo setpoint and pneumatic air from the dedicated Control Air Compressor and Control Air Dryer. The heating valve is normally open and the cooling valve is normally closed; loss of control air can create simultaneous heating and loss of cooling.</p></div>`:asset.id==="Control-AC"||asset.id==="Control-AC-Air-Dryer"?`<div class="operating-note"><strong>AHU control-air dependency</strong><p>This asset is part of the dedicated pneumatic control-air source for AHU valves. Low header or branch pressure can leave heating valves open and cooling valves closed.</p></div>`:houseDryerMatch?`<div class="operating-note"><strong>Dedicated laboratory air-dryer train</strong><p>This dryer is dedicated to House Air Compressor ${houseDryerMatch[1]}. ${esc(asset.serviceArea||"")} Check the compressor and dryer together when diagnosing low pressure, high pressure drop, wet air, or poor dew point. This train supplies laboratory air and does not control AHU valves.</p></div>`:asset.id.startsWith("House-AC-")?`<div class="operating-note"><strong>Laboratory compressed-air service</strong><p>${esc(asset.serviceArea||"This House Air Compressor supplies laboratory compressed-air demand through its matching dedicated air dryer")}. It does not supply pneumatic control air to the AHU valves.</p></div>`:asset.id.startsWith("BIO-VACP-")?`<div class="operating-note"><strong>Bio-side laboratory vacuum service</strong><p>BIO-VACP-01 and BIO-VACP-02 support the Bio-side laboratory vacuum header. Compare the common header and both pumps before treating a low-vacuum complaint as a single-pump failure.</p></div>`:exhaustSystems.length?`<div class="operating-note"><strong>Paired laboratory exhaust service</strong>${exhaustSystems.map(system=>`<p><strong>${esc(system.name)}:</strong> ${esc(system.fans.join(" and "))} work together on shared ductwork. ${esc(system.loads.join("; "))}. Diagnose both fans, common duct static, shared controls, and the affected local branch.</p>`).join("")}</div>`:"";
  app.innerHTML=`<div class="result-card asset-overview"><span class="status">${esc(asset.id)}</span><h2>${esc(asset.name)}</h2><p class="meta"><strong>Category:</strong> ${esc(asset.category)}<br><strong>Manufacturer:</strong> ${esc(asset.manufacturer)}<br><strong>Model:</strong> ${esc(asset.model)}${asset.serialNumber?`<br><strong>Serial:</strong> ${esc(asset.serialNumber)}`:""}<br><strong>Location:</strong> ${esc(asset.location)}${asset.serviceArea?`<br><strong>Serves:</strong> ${esc(asset.serviceArea)}`:""}</p><div class="asset-resource-actions">${manual}${partsButton}</div>${asset.manualNote?`<p class="small-note manual-note">${esc(asset.manualNote)}</p>`:""}${facilityIqAssetPartsMarkup(asset)}${systemLinks}${roomList}${controlsNote}<div class="danger"><strong>Safety:</strong> These guides support trained personnel. They do not replace lockout/tagout, permits, site procedures, manufacturer instructions, or qualified service requirements.</div></div>
  <div class="section-title unified-intro"><h3>Select the symptom</h3><p>Answer the short guided checks once. FacilityIQ will use those answers as evidence and provide ranked diagnostic ratings with the conclusion.</p></div><div class="card-grid">${asset.problems.map(p=>`<button class="card symptom-card" data-problem="${esc(p.id)}"><span class="card-kicker">GUIDED + EVIDENCE DIAGNOSIS</span><h2>${esc(p.name)}</h2><p class="meta">${esc(p.description)}</p></button>`).join("")}</div>`;
  app.querySelectorAll("[data-related-system]").forEach(b=>b.onclick=()=>setRoute({system:b.dataset.relatedSystem}));
  const partsToggle=document.getElementById("asset-parts-button");
  if(partsToggle)partsToggle.onclick=()=>{const panel=document.getElementById("asset-parts-panel"),open=panel.hidden;panel.hidden=!open;partsToggle.setAttribute("aria-expanded",String(open));partsToggle.textContent=open?"Hide Parts":`View Parts (${facilityIqPartsForAsset(asset.id).length})`;if(open)panel.scrollIntoView({behavior:"smooth",block:"nearest"})};
  app.querySelectorAll("[data-problem]").forEach(b=>b.onclick=()=>{const p=asset.problems.find(x=>x.id===b.dataset.problem);clearSession(asset.id,p.id);setRoute({asset:asset.id,problem:p.id,step:p.startStep})});
}

function fiqGuidedObservations(data){
  return Object.fromEntries((data.answers||[]).map(answer=>[`guided:${answer.stepId}`,answer.answer==="YES"?"yes":"no"]));
}

function fiqDiagnosticWords(text){
  const ignored=new Set(["the","and","for","with","from","this","that","into","not","are","was","has","have","present","problem","issue","failure"]);
  return new Set(String(text||"").toLowerCase().replace(/[^a-z0-9]+/g," ").split(" ").filter(word=>word.length>2&&!ignored.has(word)));
}

function fiqDiagnosticOverlap(a,b){
  const left=fiqDiagnosticWords(a),right=fiqDiagnosticWords(b);
  return [...left].filter(word=>right.has(word)).length;
}

function fiqInferResultEvidence(profile,problemId,result){
  const text=`${result?.title||""} ${result?.cause||""}`;
  return Object.fromEntries(fiqObservationItems(profile,problemId).filter(([,label])=>fiqDiagnosticOverlap(text,label)>=2).map(([key])=>[key,"yes"]));
}

function fiqKnownReadingCount(values){
  return Object.values(values||{}).filter(value=>value!==""&&value!==null&&value!==undefined&&Number.isFinite(Number(value))).length;
}

function fiqUnifiedAnalysis(asset,problem,data,result){
  const profile=profileForAsset(asset);
  const measurements=loadMeasurements(asset.id);
  const inferred=profile?fiqInferResultEvidence(profile,problem.id,result):{};
  const observations={...inferred,...(data.evidence||{}),...fiqGuidedObservations(data)};
  const modeledRankings=profile?fiqRankFailuresV05(profile,problem.id,measurements,observations):[];
  const quality=profile?fiqEvidenceQuality(profile,problem.id,measurements,observations):{completeness:0,nextEvidence:[]};
  const contradictions=profile?fiqDetectContradictions(profile,measurements,observations):[];
  const readingCount=fiqKnownReadingCount(measurements);
  const score=Math.max(45,Math.min(95,55+(data.answers||[]).length*9+Math.min(15,readingCount*3)-contradictions.length*5));
  const label=score>=85?"Strong":score>=70?"Supported":"Preliminary";
  const guidedRanking=result?{title:result.title,action:result.action,reference:`Guided path completed for ${problem.name}. Rating reflects the recorded checks and readings.`,evidenceCount:(data.answers||[]).length,contradictionCount:contradictions.length,relative:score}:null;
  const evidenceBacked=modeledRankings.filter(item=>(item.evidenceCount>0||item.contradictionCount>0)&&fiqDiagnosticOverlap(item.title,result?.title)<2).slice(0,2);
  const rankings=[guidedRanking,...evidenceBacked].filter(Boolean);
  return {profile,measurements,observations,rankings,quality,contradictions,score,label,readingCount};
}

function renderUnifiedDiagnosis(asset,problem,result,data){
  const analysis=fiqUnifiedAnalysis(asset,problem,data,result);
  if(!analysis.profile)return "";
  const sections=fiqMeasurementSections(analysis.profile,problem.id,analysis.measurements);
  const observationCount=fiqObservationItems(analysis.profile,problem.id).length;
  const alternatives=analysis.rankings.slice(0,3);
  return `<section class="unified-diagnosis">
    <div class="unified-rating ${analysis.label.toLowerCase()}">
      <div><span class="status">DIAGNOSTIC SUPPORT RATING</span><h3>${analysis.label} support for this conclusion</h3><p>The rating reflects ${data.answers.length} guided check${data.answers.length===1?"":"s"}${analysis.readingCount?` and ${analysis.readingCount} recorded reading${analysis.readingCount===1?"":"s"}`:""}. It is an evidence-quality score, not the probability that a component has failed.</p></div>
      <strong>${analysis.score}<small>/100</small></strong>
    </div>
    ${analysis.contradictions.length?`<div class="contradictions"><strong>Resolve conflicting evidence</strong>${analysis.contradictions.map(item=>`<p>${esc(item)}</p>`).join("")}</div>`:""}
    <div class="diagnostic-results unified-rankings"><h3>Ranked likely causes</h3>${fiqRenderRankings(alternatives)}</div>
    <details class="unified-evidence-editor">
      <summary>Improve the rating with optional field evidence</summary>
      <p class="meta">Add only readings or observations you can verify. Your guided answers are already included automatically.</p>
      <div class="quick-measurements"><div class="quick-heading"><strong>Highest-value readings</strong><span>${sections.quickCount} relevant field${sections.quickCount===1?"":"s"}</span></div><div class="measurement-grid">${sections.quick}</div></div>
      ${sections.advancedCount?`<details class="advanced-measurements"><summary>Other available readings (${sections.advancedCount})</summary><div class="measurement-grid">${sections.advanced}</div></details>`:""}
      <div class="evidence-box"><div class="evidence-editor-heading"><strong>Confirm field observations</strong><span>Yes / No / Unknown</span></div><div class="evidence-grid">${fiqObservationMarkup(analysis.profile,problem.id,"quick")}</div></div>
      ${observationCount>5?`<details class="evidence-box"><summary>Additional observations (${observationCount-5})</summary><div class="evidence-grid">${fiqObservationMarkup(analysis.profile,problem.id,"advanced")}</div></details>`:""}
      <div class="button-row diagnostic-actions"><button type="button" id="update-unified-rating" class="primary-button">Update Ratings</button><button type="button" id="clear-unified-evidence" class="secondary-button">Clear Added Evidence</button></div>
    </details>
  </section>`;
}

function bindUnifiedDiagnosis(asset,problem){
  const update=document.getElementById("update-unified-rating");
  if(!update)return;
  const data=readSession(asset.id,problem.id);
  const guided=fiqGuidedObservations(data);
  const step=steps[getRoute().step];
  const inferred=fiqInferResultEvidence(profileForAsset(asset),problem.id,step);
  const savedEvidence={...inferred,...(data.evidence||{}),...guided};
  fiqBindTriState();
  document.querySelectorAll("[data-evidence-row]").forEach(row=>{
    const state=savedEvidence[row.dataset.evidenceRow]||"unknown";
    row.querySelectorAll("[data-evidence]").forEach(button=>button.classList.toggle("active",button.dataset.state===state));
  });
  update.onclick=()=>{
    const measurements={...loadMeasurements(asset.id),...Object.fromEntries([...document.querySelectorAll("[data-measure]")].map(input=>[input.dataset.measure,input.value]))};
    saveMeasurements(asset.id,measurements);
    data.evidence=Object.fromEntries(Object.entries(fiqCollectObservations()).filter(([,state])=>state!=="unknown"));
    writeSession(asset.id,problem.id,data);
    render();
    document.querySelector(".unified-diagnosis")?.scrollIntoView({behavior:"smooth",block:"start"});
  };
  document.getElementById("clear-unified-evidence").onclick=()=>{
    saveMeasurements(asset.id,{});
    data.evidence={};
    writeSession(asset.id,problem.id,data);
    render();
    document.querySelector(".unified-diagnosis")?.scrollIntoView({behavior:"smooth",block:"start"});
  };
}

function renderStep(asset,problem,stepId){
  const s=steps[stepId];pageTitle.textContent=`${asset.id}: ${problem.name}`;homeButton.hidden=false;
  if(!s){app.innerHTML=`<div class="result-card"><h2>Step not found</h2></div>`;return}
  const data=readSession(asset.id,problem.id);
  if(s.type==="question"){
    const answered=data.answers.length;
    const progress=Math.min(90,Math.max(12,answered*22+12));
    app.innerHTML=`<div class="result-card question-card"><div class="step-topline"><span class="status">${esc(asset.id)}</span><span class="step-count">${answered+1} diagnostic check${answered===0?"":"s"}</span></div><div class="progress-track" aria-label="Diagnosis progress"><div class="progress-fill" style="width:${progress}%"></div></div><div class="progress-label">Guided troubleshooting</div><h2>${esc(s.text)}</h2><div class="warning"><strong>Safety:</strong> ${esc(s.safety)}</div><details class="question-reference"><summary>View manual and facility checks</summary>${facilityIqManualContextMarkup(asset,"Checks that apply to this asset")}</details><div class="button-row"><button id="yes" class="answer-button">Yes</button><button id="no" class="answer-button">No</button></div><button id="asset-back" class="text-button">Back to ${esc(asset.id)} symptoms</button></div>`;
    document.getElementById("yes").onclick=()=>{recordAnswer(asset,problem,stepId,s.text,"YES");setRoute({asset:asset.id,problem:problem.id,step:s.yes})};
    document.getElementById("no").onclick=()=>{recordAnswer(asset,problem,stepId,s.text,"NO");setRoute({asset:asset.id,problem:problem.id,step:s.no})};
    document.getElementById("asset-back").onclick=()=>setRoute({asset:asset.id});
  } else {
    const manual=asset.manual?`<a class="manual-button" href="${asset.manual}" target="_blank" rel="noopener">Open Manufacturer Manual</a>`:"";
    const checks=data.answers.length?`<div class="checks"><h3>Checks completed</h3>${data.answers.map(x=>`<div class="check-row"><span class="${x.answer==="YES"?"check-yes":"check-no"}">${esc(x.answer)}</span><p>${esc(x.question)}</p></div>`).join("")}</div>`:"";
    app.innerHTML=`<div class="result-card result-final"><div class="progress-track"><div class="progress-fill" style="width:100%"></div></div><span class="status">GUIDED DIAGNOSTIC RESULT</span><h2>${esc(s.title)}</h2><p><strong>Likely cause:</strong><br>${esc(s.cause)}</p><p><strong>Recommended action:</strong><br>${esc(s.action)}</p><div class="warning"><strong>Safety:</strong> ${esc(s.safety)}</div>${facilityIqReplacementPartMarkup(asset,s)}${facilityIqManualContextMarkup(asset,"Repair planning for this result")}${checks}${renderUnifiedDiagnosis(asset,problem,s,data)}<div class="button-row"><button id="copy-summary" class="primary-button">Copy Troubleshooting Summary</button><button id="restart" class="secondary-button">Restart Guide</button></div><button id="back" class="text-button">Back to ${esc(asset.id)}</button><div class="manual-wrap">${manual}</div></div>`;
    bindUnifiedDiagnosis(asset,problem);
    document.getElementById("copy-summary").onclick=e=>copyText(troubleshootingSummary(asset,problem,s),e.currentTarget);
    document.getElementById("restart").onclick=()=>{clearSession(asset.id,problem.id);setRoute({asset:asset.id,problem:problem.id,step:problem.startStep})};
    document.getElementById("back").onclick=()=>setRoute({asset:asset.id});
  }
}
function render(){
  const r=getRoute();if(r.system){const s=facilitySystems[r.system];return s?renderSystem(s):renderSystemsHome();}if(r.view==="manual")return renderOperationsManual();if(r.view==="systems")return renderSystemsHome();if(r.view==="assets")return renderAssetsHome();if(!r.asset)return renderHome();
  const a=assets[r.asset];if(!a)return renderHome();
  if(!r.problem||!r.step)return renderAsset(a);
  const p=a.problems.find(x=>x.id===r.problem);if(!p)return renderAsset(a);
  renderStep(a,p,r.step);
}
homeButton.onclick=()=>setRoute({});
const cornerMenuButton=document.getElementById("corner-menu-button");
const cornerMenuList=document.getElementById("corner-menu-list");
function closeCornerMenu(){cornerMenuList.hidden=true;cornerMenuButton.setAttribute("aria-expanded","false")}
cornerMenuButton.onclick=()=>{const open=cornerMenuList.hidden;cornerMenuList.hidden=!open;cornerMenuButton.setAttribute("aria-expanded",String(open))};
cornerMenuList.onclick=event=>{
  const target=event.target.closest("[data-corner-nav]");if(!target)return;
  closeCornerMenu();
  const destination=target.dataset.cornerNav;
  if(destination==="home")return setRoute({});
  if(destination==="assets")return setRoute({view:"assets"});
  if(destination==="systems")return setRoute({view:"systems"});
  if(destination==="manual")return setRoute({view:"manual"});
  if(destination==="ask")return facilityIqChat.toggle(true);
};
document.addEventListener("click",event=>{if(!event.target.closest(".corner-menu"))closeCornerMenu()});
addEventListener("popstate",render);
render();
