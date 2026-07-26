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
