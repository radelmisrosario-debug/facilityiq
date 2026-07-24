
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
