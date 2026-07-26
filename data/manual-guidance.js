function facilityIqManualStatus(asset){
  if(!asset.manual)return {label:"Manual not yet located",kind:"missing"};
  const note=String(asset.manualNote||"").toLowerCase();
  const family=note.includes("family")||note.includes("confirm")||note.includes("covering");
  return {label:family?"Model-family manual":"Manufacturer manual",kind:family?"family":"exact"};
}

function facilityIqManualGuidance(asset){
  const guidance=[];
  const category=String(asset.category||"").toLowerCase();
  const exhaustSystems=typeof facilityIqExhaustSystemsForAsset==="function"?facilityIqExhaustSystemsForAsset(asset.id):[];
  if(category.includes("air handling")){
    guidance.push("Confirm the space setpoint, room temperature, discharge-air temperature, fan status, and valve commands in Desigo before changing components.");
    guidance.push("Verify chilled-water supply temperature against the active plant setpoint and prove flow through the coil before diagnosing the cooling valve.");
    guidance.push("The AHU heating valve is normally open and the cooling valve is normally closed. Check Control-AC and the control-air dryer because low pneumatic pressure can create heating and loss of cooling at the same time.");
    guidance.push("Each served area has a dedicated CAV/VAV and every VAV has a heating valve; verify airflow, damper position, and terminal heating-valve position before condemning the AHU.");
  }else if(category.includes("chiller")){
    guidance.push("Record the active leaving-water setpoint, entering and leaving water temperatures, flow proof, pump status, ambient temperature, and the first active fault before resetting.");
    guidance.push("Prove water flow and inspect strainers, valves, and the dedicated pump before diagnosing a refrigeration fault. Refrigerant and sealed-circuit work requires qualified service.");
    if(asset.id==="503-Aircon-Tech-Chiller")guidance.push("This chiller is dedicated to the Room 503 dehumidification system; Room 503 is not served by AHU-02.");
  }else if(category.includes("exhaust fan")){
    guidance.push("Isolate power before inspecting the wheel, belts, bearings, guards, dampers, or duct. Confirm wheel rotation and motor current against the nameplate after safe restart.");
    guidance.push("Check dirty or obstructed ductwork, a closed damper, loose belts, incorrect rotation, wheel buildup, and bearing condition before changing fan speed.");
    exhaustSystems.forEach(system=>guidance.push(`${system.fans.join(" and ")} share ductwork for ${system.loads.join("; ")}. Check both fans, common static pressure, shared controls, and the affected branch or hood.`));
  }else if(category.includes("boiler")){
    guidance.push("Record the first lockout or flame-failure code before reset. Prove hot-water flow, pump operation, permissives, gas supply, ignition, and flame signal in the manufacturer sequence.");
    guidance.push("Do not bypass safeties or repeatedly reset a lockout. Gas-train, burner, and combustion adjustments require qualified personnel and combustion testing.");
  }else if(category.includes("pump")){
    guidance.push("Confirm the correct pump is enabled, valves are open, the loop is full and vented, and differential pressure or flow actually changes when the pump runs.");
    guidance.push("Check rotation, coupling, strainers, suction conditions, vibration, bearing temperature, and motor current before adjusting system balance.");
  }else if(category.includes("compressor")){
    guidance.push("Record receiver pressure, cut-in/cut-out behavior, motor current, oil condition, temperature, belt condition, unloader operation, and abnormal noise before repair.");
    if(asset.id==="Control-AC")guidance.push("This is the pneumatic source for AHU control valves; verify header and branch pressure through the Control Air Dryer.");
    if(asset.id.startsWith("House-AC-"))guidance.push("This compressor supplies laboratory air through its dedicated dryer and does not operate AHU pneumatic controls.");
  }else if(category.includes("air dryer")){
    guidance.push("Check inlet and outlet pressure, pressure drop, drain operation, separator condition, condenser cleanliness, airflow, and dew-point indication before replacing refrigeration components.");
    if(asset.id==="Control-AC-Air-Dryer")guidance.push("Loss of dry control air affects AHU pneumatic valves; verify the Control-AC header and downstream branches together.");
    if(asset.id.startsWith("House-AC-Air-Dryer-"))guidance.push("This dryer belongs to its matching House Air Compressor train and serves laboratory air, not AHU controls.");
  }else if(category.includes("roof top")||category.includes("packaged roof")){
    guidance.push("Record the controller or thermostat call and first fault before reset. Prove supply fan airflow, filters, belt, coil condition, economizer position, and safeties before diagnosing heating or refrigeration.");
    guidance.push("Use the complete unit nameplate, voltage, size, heat section, and refrigerant circuit when applying model-family procedures.");
  }else if(category.includes("mini-split")||category.includes("precision cooling")){
    guidance.push("Record the exact fault code or blink pattern before cycling power. Confirm mode, setpoint, indoor airflow, filter and coil condition, outdoor fan, and temperature split.");
    guidance.push("Inverter electrical and sealed-refrigerant work requires qualified service. Confirm the paired indoor/outdoor model combination before ordering parts.");
  }else if(category.includes("dehumidifier")){
    guidance.push("Record space humidity, process and reactivation temperatures, airflow, filter loading, heater status, wheel rotation, and active alarms.");
    guidance.push("Coordinate the Bry-Air unit with the dedicated Room 503 MultiAqua chiller; Room 503 is not an AHU-02 load.");
  }else if(category.includes("vacuum")){
    guidance.push("Verify oil level and condition, inlet isolation, leaks, separators, exhaust restriction, temperature, and motor current. Use only the oil and service interval specified for the installed pump.");
  }else if(category.includes("ups")){
    guidance.push("Record the local display status and event log before transfer or reset. Verify input, bypass, battery, output, load percentage, and ventilation.");
    guidance.push("The UPS has multiple energy sources. Follow the Eaton isolation and authorized-bypass procedure; internal service is for qualified personnel.");
  }else if(category.includes("generator")){
    guidance.push("Record the first controller fault before clearing it. Check emergency stop, battery voltage, charger, fuel, oil/coolant, start circuit, and ATS remote-start command.");
    guidance.push("After repair, prove automatic start, voltage/frequency stabilization, transfer, retransfer, and cooldown under the approved site test procedure.");
  }
  if(!guidance.length)guidance.push("Record the operating state, first alarm, commanded state, actual state, nameplate data, and verified electrical or process readings before replacing components.");
  if(!asset.manual)guidance.push("No reliable unit manual is attached. Confirm the full equipment and motor nameplates before ordering parts or applying model-specific settings.");
  return [...new Set(guidance)];
}

function facilityIqManualContextMarkup(asset,title="Manual and facility repair checks"){
  const status=facilityIqManualStatus(asset);
  const link=asset.manual?`<a class="manual-button compact-manual-button" href="${esc(asset.manual)}" target="_blank" rel="noopener">Open ${esc(status.label)}</a>`:`<span class="manual-unavailable">${esc(status.label)}</span>`;
  const note=asset.manualNote?`<p class="small-note">${esc(asset.manualNote)}</p>`:"";
  return `<section class="manual-context"><div class="manual-context-head"><div><span class="card-kicker">MANUAL-BACKED REFERENCE</span><h3>${esc(title)}</h3></div>${link}</div>${note}<ul>${facilityIqManualGuidance(asset).map(item=>`<li>${esc(item)}</li>`).join("")}</ul></section>`;
}

const facilityIqReplacementComponents=[
  ["compressor",/\bcompressor\b/i],["heat exchanger",/\bheat exchanger\b/i],["control board",/\b(control board|controller|circuit board|pcb)\b/i],
  ["flame sensor",/\bflame sensor\b/i],["igniter",/\b(igniter|ignition electrode|spark electrode)\b/i],["gas valve",/\bgas valve\b/i],
  ["pressure switch",/\bpressure switch\b/i],["flow switch",/\bflow switch\b/i],["temperature sensor",/\b(temperature sensor|thermistor|temperature probe)\b/i],
  ["pressure sensor",/\b(pressure sensor|pressure transducer)\b/i],["actuator",/\bactuator\b/i],["control valve",/\b(control valve|cooling valve|heating valve)\b/i],
  ["contactor",/\bcontactor\b/i],["overload",/\boverload\b/i],["fuse",/\bfuse\b/i],["battery",/\bbatter(y|ies)\b/i],
  ["motor",/\bmotor\b/i],["VFD",/\b(vfd|variable frequency drive)\b/i],["fan wheel",/\b(fan wheel|blower wheel|impeller|propeller)\b/i],
  ["bearing",/\bbearing\b/i],["belt",/\b(belt|belts)\b/i],["filter",/\b(filter|filters)\b/i],["drain valve",/\b(drain valve|automatic drain|condensate drain)\b/i],
  ["pump",/\bpump\b/i],["damper",/\bdamper\b/i],["relay",/\brelay\b/i]
];

function facilityIqReplacementPart(asset,result){
  const text=`${result?.title||""} ${result?.cause||""} ${result?.action||""}`;
  if(!/\b(replace|replacement|failed|burned|open winding|shorted|seized|broken|worn|damaged)\b/i.test(text))return null;
  const component=facilityIqReplacementComponents.find(([,pattern])=>pattern.test(text))?.[0];
  if(!component)return null;
  const exactPart=asset.parts?.[component]||null;
  const query=[asset.manufacturer,asset.model,asset.serialNumber,component,"replacement part"].filter(Boolean).join(" ");
  const officialLookup=String(asset.manufacturer||"").toLowerCase().includes("greenheck")?"https://www.greenheck.com/shop/parts":
    String(asset.manufacturer||"").toLowerCase().includes("trane")?"https://www.trane.com/commercial/north-america/us/en/parts-supplies.html":
    String(asset.manufacturer||"").toLowerCase().includes("mitsubishi")?"https://www.mitsubishitechinfo.ca/":null;
  const inventoryParts=typeof facilityIqPartsForAsset==="function"?facilityIqPartsForAsset(asset.id).filter(part=>facilityIqPartMatchesComponent(part,component)):[];
  return {
    component,
    exactPart,
    inventoryParts,
    searchUrl:`https://www.google.com/search?q=${encodeURIComponent(query)}`,
    officialLookup,
    query
  };
}

function facilityIqReplacementPartMarkup(asset,result){
  const part=facilityIqReplacementPart(asset,result);
  if(!part)return "";
  const inventory=part.inventoryParts.length?`<div class="matched-inventory"><h4>Matched facility inventory</h4>${part.inventoryParts.map(facilityIqPartCardMarkup).join("")}</div>`:"";
  return `<section class="parts-planning"><span class="card-kicker">PARTS PLANNING</span><h3>Candidate replacement: ${esc(part.component)}</h3>${inventory}<p><strong>Search specification:</strong> ${esc(part.query)}</p>${part.exactPart?`<p><strong>Verified catalog part:</strong> ${esc(part.exactPart.partNumber)}</p><a class="manual-button" href="${esc(part.exactPart.url)}" target="_blank" rel="noopener">Open exact part</a>`:`<p class="small-note">${part.inventoryParts.length?"Use the associated inventory part when its specifications match the removed component.":"No matching inventory part is associated with this asset."} Verify the installed component before ordering or installation.</p><div class="parts-actions"><a class="manual-button" href="${esc(part.searchUrl)}" target="_blank" rel="noopener">Search this part specification</a>${part.officialLookup?`<a class="secondary-button parts-link" href="${esc(part.officialLookup)}" target="_blank" rel="noopener">Open OEM parts lookup</a>`:""}${asset.manual?`<a class="secondary-button parts-link" href="${esc(asset.manual)}" target="_blank" rel="noopener">Check parts in manual</a>`:""}</div>`}<ul><li>Match the full asset model and serial number.</li><li>Match the removed part number, voltage, phase, ratings, dimensions, connections, rotation, and revision as applicable.</li><li>Confirm supersession and compatibility with the OEM or authorized supplier before purchase.</li></ul></section>`;
}

function facilityIqReplacementPartSummary(asset,result){
  const part=facilityIqReplacementPart(asset,result);
  if(!part)return "No replacement part was specifically indicated by this diagnostic result.";
  return `Candidate replacement: ${part.component}
Matched facility inventory:
${part.inventoryParts.length?part.inventoryParts.map(item=>`- ${item.name||item.type} (${item.unitCost?`$${Number(item.unitCost).toFixed(2)}`:"price not recorded"}): ${facilityIqPartSearchUrl(item)}`).join("\n"):"No associated part match for this component."}
Search specification: ${part.query}
Part search: ${part.searchUrl}
${part.officialLookup?`OEM parts lookup: ${part.officialLookup}\n`:""}${asset.manual?`Asset manual: ${new URL(asset.manual,location.href).href}\n`:""}Exact part number: ${part.exactPart?.partNumber||"Not verified — match the installed part, full model, serial number, ratings, connections, and revision before ordering."}`;
}
