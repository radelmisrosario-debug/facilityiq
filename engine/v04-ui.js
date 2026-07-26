
function fiqProblemOptions(asset, profile){
  const supported = facilityIqKnowledgeBase?.[profile] || {};
  return asset.problems
    .filter(problem => supported[problem.id])
    .map(problem => `<option value="${esc(problem.id)}">${esc(problem.name)}</option>`)
    .join("");
}

function fiqObservationMarkup(profile){
  return (facilityIqObservations[profile] || [])
    .map(([key,label]) => `<label class="evidence-option"><input type="checkbox" data-evidence="${esc(key)}"><span>${esc(label)}</span></label>`)
    .join("");
}

function fiqCollectObservations(){
  return Object.fromEntries(
    [...document.querySelectorAll("[data-evidence]")]
      .map(input => [input.dataset.evidence, input.checked])
  );
}

function fiqRenderRankings(rankings){
  if(!rankings.length){
    return `<div class="warning"><strong>No weighted model is available for this symptom yet.</strong> Continue with the guided troubleshooting tree.</div>`;
  }

  return `<div class="ranked-diagnoses">
    <div class="ranking-disclaimer">Relative ranking based on the entered evidence. The numbers are diagnostic scores, not statistically validated failure probabilities.</div>
    ${rankings.map((item,index)=>`
      <article class="ranked-cause">
        <div class="rank-head">
          <span class="rank-number">${index+1}</span>
          <div class="rank-title"><strong>${esc(item.title)}</strong><span>${item.evidenceCount} matching evidence item${item.evidenceCount===1?"":"s"}</span></div>
          <b>${item.relative}%</b>
        </div>
        <div class="score-track"><div style="width:${item.relative}%"></div></div>
        <p><strong>Recommended action:</strong> ${esc(item.action)}</p>
        <p class="reference"><strong>Reference:</strong> ${esc(item.reference)}</p>
      </article>`).join("")}
  </div>`;
}

function fiqRenderEngineering(calculations){
  if(!calculations.length) return "";
  return `<div class="engineering-results"><h3>Engineering calculations</h3>
    ${calculations.map(item=>`<div class="engineering-row"><div><strong>${esc(item.label)}</strong><small>${esc(item.formula)}</small></div><b>${esc(item.value)}</b></div>`).join("")}
  </div>`;
}

/* V04 override: weighted diagnosis + engineering calculations */
function renderDiagnosticPanel(asset){
  const profileName=profileForAsset(asset);
  if(!profileName)return "";
  const profile=diagnosticProfiles[profileName],saved=loadMeasurements(asset.id);
  const problemOptions=fiqProblemOptions(asset,profileName);
  const airflowField = profileName==="ahu" ? `<label class="measurement-field"><span>Measured airflow</span><div class="input-unit"><input inputmode="decimal" type="number" step="1" data-measure="airflow" value="${saved.airflow??""}" placeholder="—"><b>CFM</b></div></label>` : "";
  const boilerFlowField = profileName==="boiler" ? `<label class="measurement-field"><span>Hot-water flow</span><div class="input-unit"><input inputmode="decimal" type="number" step="0.1" data-measure="flow" value="${saved.flow??""}" placeholder="—"><b>GPM</b></div></label>` : "";

  return `<section class="diagnostic-panel v04-panel">
    <div class="diagnostic-heading">
      <div><span class="status">V04 CORE ENGINE</span><h3>Weighted Diagnosis and Engineering Analysis</h3>
      <p class="meta">Select a supported symptom, enter actual measurements, and mark confirmed field observations. The engine ranks likely causes and performs applicable engineering calculations.</p></div>
    </div>
    ${problemOptions ? `<label class="diagnosis-select"><span>Symptom to analyze</span><select id="weighted-problem">${problemOptions}</select></label>` : `<div class="warning">Weighted diagnosis rules for this asset type are under development. Measurement calculations remain available.</div>`}
    <div class="measurement-grid">${profile.fields.map(f=>`<label class="measurement-field"><span>${esc(f.label)}</span><div class="input-unit"><input inputmode="decimal" type="${f.type}" step="${f.step}" data-measure="${f.id}" value="${saved[f.id]??""}" placeholder="—"><b>${esc(f.unit)}</b></div></label>`).join("")}${airflowField}${boilerFlowField}</div>
    ${problemOptions ? `<details class="evidence-box"><summary>Confirmed field observations</summary><div class="evidence-grid">${fiqObservationMarkup(profileName)}</div></details>` : ""}
    <div class="button-row diagnostic-actions"><button id="analyze-readings" class="primary-button">Run Diagnostic Analysis</button><button id="clear-readings" class="secondary-button">Clear</button></div>
    <div id="diagnostic-output"></div>
  </section>`;
}

function bindDiagnosticPanel(asset){
  const analyze=document.getElementById("analyze-readings");
  if(!analyze)return;
  const profile=profileForAsset(asset);
  const collect=()=>Object.fromEntries([...document.querySelectorAll("[data-measure]")].map(x=>[x.dataset.measure,x.value]));

  analyze.onclick=()=>{
    const values=collect();
    const observations=fiqCollectObservations();
    saveMeasurements(asset.id,values);

    const indicators=diagnosticResults(profile,values);
    const calculations=fiqEngineeringCalculations(profile,values);
    const problemId=document.getElementById("weighted-problem")?.value;
    const rankings=problemId ? fiqRankFailures(profile,problemId,values,observations) : [];
    const target=document.getElementById("diagnostic-output");

    const indicatorHtml=indicators.length?`<div class="diagnostic-results"><h3>Calculated diagnostic indicators</h3>${indicators.map(x=>`<div class="indicator ${x.state}"><div><strong>${esc(x.label)}</strong><span>${esc(x.value)}</span></div><p>${esc(x.note)}</p></div>`).join("")}</div>`:"";
    const rankingHtml=problemId?`<div class="diagnostic-results"><h3>Ranked likely causes</h3>${fiqRenderRankings(rankings)}</div>`:"";

    target.innerHTML=`${fiqRenderEngineering(calculations)}${indicatorHtml}${rankingHtml}` || `<div class="warning"><strong>No result:</strong> Enter measurements or select available field evidence.</div>`;
    target.scrollIntoView({behavior:"smooth",block:"nearest"});
  };

  document.getElementById("clear-readings").onclick=()=>{
    document.querySelectorAll("[data-measure]").forEach(x=>x.value="");
    document.querySelectorAll("[data-evidence]").forEach(x=>x.checked=false);
    saveMeasurements(asset.id,{});
    document.getElementById("diagnostic-output").innerHTML="";
  };
}


/* ===== FacilityIQ V05 tri-state and evidence-quality UI overrides ===== */

function fiqObservationItems(profile,problemId){
  const labels=Object.fromEntries(facilityIqObservations[profile]||[]);
  const rules=(facilityIqKnowledgeBase?.[profile]?.[problemId]||[])
    .flatMap(failure=>failure.evidence||[])
    .filter(rule=>rule.kind==="observation");
  const weights={};
  rules.forEach(rule=>weights[rule.key]=Math.max(weights[rule.key]||0,rule.weight||0));
  const usedKeys=[...new Set(rules.map(rule=>rule.key))].sort((a,b)=>(weights[b]||0)-(weights[a]||0));
  return usedKeys.length?usedKeys.map(key=>[key,labels[key]||key]):(facilityIqObservations[profile]||[]);
}

function fiqObservationMarkup(profile,problemId,section="quick"){
  const observations=fiqObservationItems(profile,problemId);
  const selected=section==="quick"?observations.slice(0,5):observations.slice(5);
  return selected.map(([key,label])=>`
    <div class="evidence-option evidence-tristate" data-evidence-row="${esc(key)}">
      <span>${esc(label)}</span>
      <div class="tri-buttons" role="group" aria-label="${esc(label)}">
        <button type="button" data-evidence="${esc(key)}" data-state="yes">Yes</button>
        <button type="button" data-evidence="${esc(key)}" data-state="no">No</button>
        <button type="button" data-evidence="${esc(key)}" data-state="unknown" class="active">Unknown</button>
      </div>
    </div>`).join("");
}

function fiqCollectObservations(){
  const result={};
  document.querySelectorAll("[data-evidence-row]").forEach(row=>{
    const key=row.dataset.evidenceRow;
    result[key]=row.querySelector("[data-evidence].active")?.dataset.state||"unknown";
  });
  return result;
}

function fiqBindTriState(){
  document.querySelectorAll(".tri-buttons").forEach(group=>{
    group.querySelectorAll("button").forEach(button=>{
      button.onclick=()=>{
        group.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
        button.classList.add("active");
      };
    });
  });
}

function fiqFriendlyField(profile,key){
  const profileFields=diagnosticProfiles?.[profile]?.fields||[];
  const found=profileFields.find(f=>f.id===key);
  const extras={airflow:"Measured airflow",flow:"Water flow",ratedKw:"UPS rated capacity"};
  return found?.label||extras[key]||key;
}

function fiqFriendlyEvidence(profile,item){
  if(item.kind==="measurement")return fiqFriendlyField(profile,item.key);
  const label=Object.fromEntries(facilityIqObservations[profile]||[])[item.key]||item.key;
  return `Verify: ${label}`;
}

function fiqOperatingModes(profile){
  const modes={
    ahu:["Cooling call","Heating call","Occupied ventilation","Unoccupied","Startup","Stopped","Unknown"],
    chiller:["Enabled — cooling","Running under load","Startup","Standby","Stopped on alarm","Unknown"],
    hydronic:["Running — lead","Running — lag","Manual operation","Startup","Commanded off","Stopped on fault","Unknown"],
    airCompressor:["Loaded","Unloaded","Pressure satisfied / standby","Startup","Stopped on fault","Unknown"],
    dehumidifier:["Dehumidification enabled","Running under moisture load","Startup","Standby","Stopped on alarm","Unknown"],
    fan:["Commanded on","Running","Startup","Commanded off","Stopped on fault","Unknown"],
    boiler:["Call for heat","Ignition sequence","Firing","Setpoint satisfied / standby","Stopped on limit or fault","Unknown"],
    ups:["Normal online","On battery","Static bypass","Maintenance bypass","Battery test","Startup / transfer","Unknown"],
    vacuum:["Operating under load","Isolated pump test","Startup / warm-up","Standby","Stopped on protection","Unknown"],
    dryer:["Air flowing through dryer","No air demand","Refrigeration running","Startup","Bypass selected","Stopped on fault","Unknown"],
    generator:["Standby / automatic","Remote start received","Cranking","Running unloaded","Running under load","Cooldown","Shutdown / fault","Unknown"]
  };
  return modes[profile]||["Running","Startup","Standby","Stopped","Unknown"];
}

function fiqOperatingModeOptions(profile,savedMode){
  const modes=fiqOperatingModes(profile);
  const selected=modes.includes(savedMode)?savedMode:"Unknown";
  return modes.map(mode=>`<option${mode===selected?" selected":""}>${esc(mode)}</option>`).join("");
}

function fiqMeasurementCatalog(profile){
  const fields=[...(diagnosticProfiles?.[profile]?.fields||[])];
  if(profile==="ahu")fields.push({id:"airflow",label:"Measured AHU airflow",unit:"CFM",type:"number",step:"1"});
  if(profile==="boiler")fields.push({id:"flow",label:"Hot-water flow",unit:"GPM",type:"number",step:"0.1"});
  return fields;
}

function fiqSymptomMeasurementKeys(profile,problemId){
  const failures=facilityIqKnowledgeBase?.[profile]?.[problemId]||[];
  const priority={};
  failures.forEach(failure=>{
    (failure.required||[]).forEach(key=>priority[key]=Math.max(priority[key]||0,25));
    (failure.evidence||[]).filter(rule=>rule.kind==="measurement").forEach(rule=>{
      priority[rule.key]=Math.max(priority[rule.key]||0,rule.weight||0);
      if(rule.other)priority[rule.other]=Math.max(priority[rule.other]||0,rule.weight||0);
    });
  });
  return Object.keys(priority).sort((a,b)=>priority[b]-priority[a]).slice(0,6);
}

function fiqMeasurementFieldsMarkup(fields,saved){
  return fields.map(field=>`<label class="measurement-field"><span>${esc(field.label)}</span><div class="input-unit"><input inputmode="decimal" type="${field.type}" step="${field.step}" data-measure="${field.id}" value="${saved[field.id]??""}" placeholder="—"><b>${esc(field.unit)}</b></div></label>`).join("");
}

function fiqMeasurementSections(profile,problemId,saved){
  const catalog=fiqMeasurementCatalog(profile);
  const quickKeys=fiqSymptomMeasurementKeys(profile,problemId);
  const quick=catalog.filter(field=>quickKeys.includes(field.id));
  const advanced=catalog.filter(field=>!quickKeys.includes(field.id));
  return {
    quick:quick.length?fiqMeasurementFieldsMarkup(quick,saved):`<p class="quick-empty">No readings are required for the first-pass analysis. Classify the short field-observation list below.</p>`,
    advanced:fiqMeasurementFieldsMarkup(advanced,saved),
    quickCount:quick.length,
    advancedCount:advanced.length
  };
}

function fiqQualityMarkup(profile,quality,contradictions){
  const level=quality.completeness>=65?"strong":quality.completeness>=35?"moderate":"limited";
  return `<section class="quality-panel ${level}">
    <div class="quality-head"><div><span class="status">EVIDENCE QUALITY</span><h3>${level[0].toUpperCase()+level.slice(1)} diagnostic evidence</h3></div><b>${quality.completeness}% complete</b></div>
    <div class="quality-track"><div style="width:${quality.completeness}%"></div></div>
    ${quality.nextEvidence?.length?`<div class="next-tests"><strong>Highest-value next checks</strong><ol>${quality.nextEvidence.map(item=>`<li>${esc(fiqFriendlyEvidence(profile,item))}</li>`).join("")}</ol></div>`:`<p class="quality-ok">All modeled evidence for this symptom has been classified.</p>`}
    ${contradictions.length?`<div class="contradictions"><strong>Conflicting evidence detected</strong>${contradictions.map(x=>`<p>${esc(x)}</p>`).join("")}</div>`:""}
  </section>`;
}

function fiqRangeMarkup(results){
  if(!results.length)return "";
  return `<section class="range-results"><h3>Asset-specific operating comparison</h3>${results.map(r=>`
    <div class="range-row ${r.state}">
      <div><strong>${esc(r.label)}</strong><span>${esc(r.expected)}</span><small>${esc(r.source)}</small></div>
      <b>${esc(r.value)}</b>
    </div>`).join("")}</section>`;
}

function fiqRenderRankings(rankings){
  if(!rankings.length)return `<div class="warning"><strong>No weighted model is available for this symptom yet.</strong> Continue with the guided troubleshooting tree.</div>`;
  return `<div class="ranked-diagnoses">
    <div class="ranking-disclaimer">Relative diagnostic ranking based on entered evidence. Scores are not statistically validated probabilities. Guide-derived models use the asset’s existing approved yes/no diagnostic path.</div>
    ${rankings.map((item,index)=>`
      <article class="ranked-cause">
        <div class="rank-head">
          <span class="rank-number">${index+1}</span>
          <div class="rank-title"><strong>${esc(item.title)}</strong><span>${item.evidenceCount} supporting · ${item.contradictionCount||0} contradicting evidence item${(item.evidenceCount+(item.contradictionCount||0))===1?"":"s"}</span></div>
          <b>${item.relative}%</b>
        </div>
        <div class="score-track"><div style="width:${item.relative}%"></div></div>
        <p><strong>Recommended action:</strong> ${esc(item.action)}</p>
        <p class="reference"><strong>Reference:</strong> ${esc(item.reference)}</p>
      </article>`).join("")}
  </div>`;
}

function renderDiagnosticPanel(asset){
  const profileName=profileForAsset(asset);
  if(!profileName)return "";
  const profile=diagnosticProfiles[profileName],saved=loadMeasurements(asset.id);
  const problemOptions=fiqProblemOptions(asset,profileName);
  const defaultProblem=asset.problems.find(problem=>facilityIqKnowledgeBase?.[profileName]?.[problem.id])?.id||"";
  const measurementSections=fiqMeasurementSections(profileName,defaultProblem,saved);
  const observationCount=fiqObservationItems(profileName,defaultProblem).length;

  return `<section class="diagnostic-panel v04-panel">
    <div class="diagnostic-heading"><div><span class="status">V05 EVIDENCE ENGINE</span><h3>Diagnostic Coverage and Evidence Quality</h3>
    <p class="meta">Choose a symptom, enter only the quick readings you already have, and classify the short field-observation list. Advanced readings are optional.</p></div></div>
    ${problemOptions?`<label class="diagnosis-select"><span>Symptom to analyze</span><select id="weighted-problem">${problemOptions}</select></label>`:`<div class="warning">A weighted model has not yet been configured for this asset profile. Engineering calculations remain available.</div>`}
    <div class="evidence-context"><label><span>Operating condition</span><select id="evidence-mode" data-measure="evidenceMode">${fiqOperatingModeOptions(profileName,saved.evidenceMode)}</select></label><label><span>Observation time</span><input id="evidence-time" data-measure="observedAt" type="datetime-local" value="${esc(saved.observedAt||"")}"></label></div>
    <div class="quick-measurements"><div class="quick-heading"><strong>Quick readings</strong><span id="quick-count">${measurementSections.quickCount} relevant field${measurementSections.quickCount===1?"":"s"}</span></div><div id="quick-measurement-grid" class="measurement-grid">${measurementSections.quick}</div></div>
    <details class="advanced-measurements"><summary>Optional advanced readings <span id="advanced-count">(${measurementSections.advancedCount})</span></summary><div id="advanced-measurement-grid" class="measurement-grid">${measurementSections.advanced}</div></details>
    ${problemOptions?`<details class="evidence-box" open><summary>Quick field checks — Yes / No / Unknown</summary><div id="evidence-grid" class="evidence-grid">${fiqObservationMarkup(profileName,defaultProblem,"quick")}</div></details>
    <details id="advanced-evidence-box" class="evidence-box" ${observationCount<=5?"hidden":""}><summary>Additional field checks <span id="advanced-evidence-count">(${Math.max(0,observationCount-5)})</span></summary><div id="advanced-evidence-grid" class="evidence-grid">${fiqObservationMarkup(profileName,defaultProblem,"advanced")}</div></details>`:""}
    <div class="button-row diagnostic-actions"><button id="analyze-readings" class="primary-button">Run Diagnostic Analysis</button><button id="clear-readings" class="secondary-button">Clear</button></div>
    <div id="diagnostic-output"></div>
  </section>`;
}

function bindDiagnosticPanel(asset){
  const analyze=document.getElementById("analyze-readings");
  if(!analyze)return;
  const profile=profileForAsset(asset);
  fiqBindTriState();
  const collect=()=>Object.fromEntries([...document.querySelectorAll("[data-measure]")].map(x=>[x.dataset.measure,x.value]));
  const problemSelect=document.getElementById("weighted-problem");
  if(problemSelect)problemSelect.onchange=()=>{
    Object.assign(saved,collect());
    const sections=fiqMeasurementSections(profile,problemSelect.value,saved);
    document.getElementById("quick-measurement-grid").innerHTML=sections.quick;
    document.getElementById("advanced-measurement-grid").innerHTML=sections.advanced;
    document.getElementById("quick-count").textContent=`${sections.quickCount} relevant field${sections.quickCount===1?"":"s"}`;
    document.getElementById("advanced-count").textContent=`(${sections.advancedCount})`;
    const observationCount=fiqObservationItems(profile,problemSelect.value).length;
    const grid=document.getElementById("evidence-grid");
    grid.innerHTML=fiqObservationMarkup(profile,problemSelect.value,"quick");
    document.getElementById("advanced-evidence-grid").innerHTML=fiqObservationMarkup(profile,problemSelect.value,"advanced");
    document.getElementById("advanced-evidence-count").textContent=`(${Math.max(0,observationCount-5)})`;
    document.getElementById("advanced-evidence-box").hidden=observationCount<=5;
    fiqBindTriState();
  };

  analyze.onclick=()=>{
    const values=collect(),observations=fiqCollectObservations();
    saveMeasurements(asset.id,values);
    const problemId=document.getElementById("weighted-problem")?.value;
    const indicators=diagnosticResults(profile,values);
    const calculations=fiqEngineeringCalculations(profile,values);
    const rankings=problemId?fiqRankFailuresV05(profile,problemId,values,observations):[];
    const quality=problemId?fiqEvidenceQuality(profile,problemId,values,observations):{missing:[],completeness:0};
    const contradictions=fiqDetectContradictions(profile,values,observations);
    const rangeResults=fiqAssetRangeResults(asset,profile,values);
    const target=document.getElementById("diagnostic-output");

    const qualityHtml=problemId?fiqQualityMarkup(profile,quality,contradictions):"";
    const rangeHtml=fiqRangeMarkup(rangeResults);
    const indicatorHtml=indicators.length?`<div class="diagnostic-results"><h3>Calculated diagnostic indicators</h3>${indicators.map(x=>`<div class="indicator ${x.state}"><div><strong>${esc(x.label)}</strong><span>${esc(x.value)}</span></div><p>${esc(x.note)}</p></div>`).join("")}</div>`:"";
    const rankingHtml=problemId?`<div class="diagnostic-results"><h3>Ranked likely causes</h3>${fiqRenderRankings(rankings)}</div>`:"";

    target.innerHTML=`${qualityHtml}${rangeHtml}${fiqRenderEngineering(calculations)}${indicatorHtml}${rankingHtml}`||`<div class="warning"><strong>No result:</strong> Enter measurements or classify field evidence.</div>`;
    target.scrollIntoView({behavior:"smooth",block:"nearest"});
  };

  document.getElementById("clear-readings").onclick=()=>{
    document.querySelectorAll("[data-measure]").forEach(x=>x.value="");
    document.querySelectorAll(".tri-buttons").forEach(group=>{
      group.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.state==="unknown"));
    });
    saveMeasurements(asset.id,{});
    document.getElementById("diagnostic-output").innerHTML="";
  };
}
