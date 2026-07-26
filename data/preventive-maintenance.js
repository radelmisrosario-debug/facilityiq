const facilityIqPmProfiles=[
  {match:a=>a.category==="Air Handling Unit",interval:"Monthly inspection · filters and condition by pressure drop/site schedule",safety:"Use LOTO before fan, belt, coil, damper, or filter-section access. Treat coils and piping as pressurized and temperature hazardous.",tasks:[
    ["Monthly","Review Desigo alarms, schedule, fan status, VFD speed, supply-air temperature, duct static, and filter differential pressure.","Record alarms, SAT, static pressure, VFD speed, and filter DP."],
    ["Monthly","Inspect filters, casing, access doors, seals, drain pan, condensate trap, coils, and visible leakage or corrosion.","Record filter condition and photograph leakage, corrosion, or biological growth."],
    ["Quarterly","Inspect fan wheel, shaft, bearings, vibration isolators, guards, belts, sheaves, alignment, and belt tension where installed.","Record vibration/noise, belt condition, and corrective work."],
    ["Quarterly","Stroke outdoor, return, and relief dampers; compare Desigo command with physical position.","Record command, feedback, and observed full travel."],
    ["Quarterly","Verify Control-AC branch pressure and stroke the normally-open heating and normally-closed cooling valves.","Record branch pressure, valve command/position, and coil temperature response."],
    ["Annually","Inspect electrical terminations, motor condition, safeties, sensors, tubing, insulation, and coil cleanliness under the approved shutdown procedure.","Record motor current, sensor comparison, safety test, and deficiencies."]
  ]},
  {match:a=>a.category.includes("Exhaust Fan"),interval:"Monthly visual inspection · quarterly drive/airflow inspection",safety:"Treat laboratory exhaust as potentially contaminated. Use LOTO and the required roof, duct, exposure-control, and PPE procedures.",tasks:[
    ["Monthly","Review enable, run proof, VFD status, speed, current, faults, common duct static, and abnormal noise or vibration.","Record speed, current, static pressure, alarms, and observed condition."],
    ["Monthly","Inspect discharge, weatherhood, guards, flexible connections, isolators, fasteners, corrosion, and visible buildup without opening contaminated ductwork.","Photograph damage, corrosion, buildup, or loose components."],
    ["Quarterly","With LOTO applied, inspect wheel/propeller, shaft, bearings, belts, sheaves, alignment, belt tension, and motor mounting.","Record belt identification, condition, tension/alignment findings, and bearing condition."],
    ["Quarterly","Verify rotation after safe restart and compare paired-fan operation and common static response.","Record both fan statuses, rotation, current, and static response."],
    ["Annually","Perform approved airflow/containment verification and inspect controls, sensors, dampers, actuators, and electrical connections.","Attach airflow results and list calibration or repair needs."]
  ]},
  {match:a=>a.category.includes("Boiler"),interval:"Monthly operating inspection · annual qualified combustion service",safety:"Gas-train, burner, flame-safeguard, venting, and combustion work requires qualified personnel. Do not bypass safeties.",tasks:[
    ["Monthly","Review firing history, lockouts, inlet/outlet water temperature, setpoint, pump/flow proof, and visible water or gas concerns.","Record temperatures, firing rate, alarms, and flow status."],
    ["Monthly","Inspect combustion-air intake, venting, condensate where applicable, burner area, wiring, and signs of soot, overheating, leakage, or corrosion.","Photograph abnormal deposits, leakage, or damaged venting."],
    ["Quarterly","Verify ignition sequence, flame signal, operating limits, flow proving, and approved interlocks without defeating safeguards.","Record flame signal and safety-test results."],
    ["Annually","Have qualified personnel clean and inspect burner and heat-transfer surfaces and service ignition, flame-sensing, gas-train, and combustion-air components per the attached manual.","Record replaced parts and cleaning findings."],
    ["Annually","Perform combustion analysis and verify input, draft, oxygen/carbon-dioxide, carbon-monoxide, and stack temperature against approved criteria.","Attach the combustion report and final settings."]
  ]},
  {match:a=>a.category.includes("Chiller")||a.category==="Precision Cooling System",interval:"Monthly operating inspection · seasonal/annual qualified refrigeration service",safety:"Refrigerant, high-voltage, rotating-fan, pressurized-water, and roof work requires qualified personnel and approved procedures.",tasks:[
    ["Monthly","Review first faults, enable, leaving-water or space setpoint, entering/leaving temperatures, flow proof, pump status, ambient temperature, and runtime.","Record temperatures, flow status, runtime, and alarms."],
    ["Monthly","Inspect condenser airflow, coil cleanliness, fan operation, refrigerant/oil leakage indicators, water leakage, insulation, and vibration.","Photograph fouling, leakage, damage, or corrosion."],
    ["Quarterly","Inspect/clean approved strainers and verify water flow, valves, pumps, freeze protection, and temperature-sensor agreement.","Record pressure/flow evidence and sensor comparison."],
    ["Seasonal","Clean condenser coils using the approved method and inspect fan blades, motors, guards, contactors, wiring, and controls.","Record coil condition, motor current, and electrical findings."],
    ["Annually","Have qualified refrigeration personnel evaluate operating pressures, superheat/subcooling where applicable, compressor current, safeties, charge condition, and sealed-circuit performance.","Attach the refrigeration service report."]
  ]},
  {match:a=>a.category.includes("Pump")&&!a.category.includes("Vacuum")&&!a.id.includes("VACP"),interval:"Monthly operating inspection · annual alignment and condition review",safety:"Use LOTO and isolate, drain, and depressurize the piping before seal, coupling, impeller, or internal service.",tasks:[
    ["Monthly","Record command, run proof, VFD speed, motor current, suction/discharge pressure or loop DP, and abnormal noise or vibration.","Record readings at a stable operating point."],
    ["Monthly","Inspect pump, seal, flanges, valves, supports, base, guards, and piping for leakage, corrosion, looseness, or strain.","Photograph leakage and record seal condition."],
    ["Quarterly","Inspect coupling or belt drive, alignment indicators, guards, bearings, lubrication requirements, and motor/pump temperature.","Record bearing temperatures and drive condition."],
    ["Quarterly","Verify rotation, lead/lag sequence, check-valve operation, strainers, isolation-valve position, and air removal.","Record sequence and differential-pressure response."],
    ["Annually","Perform approved alignment, vibration, electrical, and pump-performance checks and compare with the established baseline.","Attach vibration/alignment results and note performance change."]
  ]},
  {match:a=>a.category.includes("Vacuum Pump"),interval:"Weekly condition check · service by operating hours and attached manual",safety:"Isolate the vacuum header, apply LOTO, vent safely to atmosphere, allow hot surfaces to cool, and control process contamination.",tasks:[
    ["Weekly","Check oil level and appearance with the pump in the manual-specified condition; inspect for oil leakage and abnormal carryover.","Record oil level, color/condition, and leakage."],
    ["Weekly","Record header vacuum, pump runtime, operating temperature, motor current, noise, and vibration.","Compare readings with the paired pump and established baseline."],
    ["Monthly","Inspect inlet piping, isolation and non-return valves, inlet filter, gas ballast, exhaust path, separator housing, and cooling airflow.","Record restrictions, leakage, and filter condition."],
    ["By operating hours","Change approved vacuum-pump oil and service oil/exhaust filter elements at the installed model’s manual interval.","Record runtime, oil specification, quantity, and filter part numbers."],
    ["Annually / condition based","Inspect coupling, motor, electrical connections, seals, vanes, and internal condition only to the level authorized by the manual.","Record qualified-service findings and parts used."]
  ]},
  {match:a=>a.category.includes("Compressor"),interval:"Weekly condition check · service by operating hours and attached manual",safety:"Apply LOTO, isolate and fully depressurize the compressor/receiver, and allow hot oil and discharge components to cool.",tasks:[
    ["Weekly","Record receiver pressure, cut-in/cut-out or load/unload operation, runtime, motor current, temperature, oil level/condition, noise, and vibration.","Record readings and compare with the established baseline."],
    ["Weekly","Drain condensate where required and inspect the compressor, receiver, piping, relief devices, check valve, and connections for leakage or corrosion.","Record drain condition and identified leaks."],
    ["Monthly","Inspect intake filter, cooling surfaces, guards, belts, sheaves, alignment, tension, unloader, and room ventilation.","Record filter and drive condition."],
    ["By operating hours","Change approved lubricant and service intake, oil, and separator filters at the installed model’s manual interval.","Record runtime, lubricant specification, quantities, and part numbers."],
    ["Annually","Have qualified personnel test safeties, pressure switch/controller, relief protection, electrical condition, and delivered capacity.","Attach test results and deficiencies."]
  ]},
  {match:a=>a.category==="Refrigerated Air Dryer",interval:"Monthly inspection · annual qualified refrigeration review",safety:"Apply LOTO and depressurize before drain, separator, filter, or internal service. Refrigeration work requires qualified personnel.",tasks:[
    ["Monthly","Record inlet/outlet pressure, pressure drop, dew-point indication, alarms, inlet temperature, and ambient temperature.","Record stable readings and compare with the serving compressor train."],
    ["Monthly","Test the automatic condensate drain and inspect separator, drain tubing, filters, bypass, and visible air/refrigerant leakage.","Record drain test and pressure-drop findings."],
    ["Quarterly","Inspect and clean condenser airflow surfaces using the approved method; verify fan operation and unobstructed ventilation.","Record coil and fan condition."],
    ["Annually","Have qualified personnel inspect refrigeration compressor, fan, pressure controls, temperature sensors, filter-drier, wiring, and refrigerant condition.","Attach the service report and parts used."]
  ]},
  {match:a=>a.category.includes("Roof Top Unit"),interval:"Six-month preventive maintenance per facility operating guidance",safety:"Use roof-access and LOTO procedures. Gas heat, refrigerant circuits, energized testing, and rotating equipment require qualified personnel.",tasks:[
    ["Six months","Review thermostat/Desigo demand, schedule, alarms, heating/cooling stages, supply-air temperature, and fan operation.","Record modes, temperatures, alarms, and stage response."],
    ["Six months","Replace or service the correct air filters and inspect evaporator/condenser coils, drain pan, trap, insulation, casing, and weather seals.","Record filter sizes/quantities and photograph deficiencies."],
    ["Six months","Inspect fan wheel, motor, bearings, belts, sheaves, guards, alignment, tension, vibration, and motor current.","Record belt identification, current, and mechanical condition."],
    ["Six months","Stroke economizer/outdoor-air dampers and verify actuators, sensors, minimum position, and physical response.","Record command, position, and sensor comparison."],
    ["Six months","Verify the installed heating and cooling sequences, safeties, contactors, wiring, condenser fans, compressor condition, and refrigerant leakage indicators.","Record stage tests and deficiencies."],
    ["Annually","Qualified personnel inspect gas heat/combustion where installed and refrigeration performance using the complete unit model and heat-option data.","Attach service results and combustion/refrigeration readings."]
  ]},
  {match:a=>a.category.includes("Mini-Split"),interval:"Monthly filter/condition check · seasonal qualified service",safety:"Follow inverter electrical and refrigerant safe-work procedures. Confirm the paired indoor/outdoor model before component service.",tasks:[
    ["Monthly","Review mode, setpoint, fault history, room temperature, discharge temperature, fan operation, noise, and vibration.","Record temperatures and fault codes."],
    ["Monthly","Clean or replace approved indoor filters and inspect indoor coil, blower, louvers, drain pan, condensate line, and insulation.","Record filter and drain condition."],
    ["Seasonal","Inspect and clean approved outdoor coil surfaces; verify clearances, outdoor fan, mounting, piping, insulation, and leakage indicators.","Record coil/fan condition and line temperatures."],
    ["Annually","Qualified personnel verify thermistors, inverter/controller condition, electrical connections, refrigerant performance, and heating/defrost sequence where applicable.","Attach service findings."]
  ]},
  {match:a=>a.category.includes("Dehumidifier"),interval:"Quarterly preventive maintenance per facility operating guidance",safety:"Use LOTO before filter, blower, rotor, drive, or heater access. Reactivation sections may remain hot.",tasks:[
    ["Quarterly","Record room humidity/temperature, process and reactivation temperatures, airflow, alarms, and operating setpoints.","Record stable readings and dew point where available."],
    ["Quarterly","Inspect/replace process and reactivation filters and inspect both air paths, dampers, seals, ductwork, and leakage.","Record filter sizes and condition."],
    ["Quarterly","Inspect rotor rotation, drive motor, belt/chain, tension, sprockets/pulleys, bearings, seals, and abnormal noise.","Record drive and seal condition."],
    ["Quarterly","Verify process and reactivation fans, airflow proving, heater staging, safeties, and the dedicated Room 503 chiller response.","Record motor current, temperature rise, and safety operation."],
    ["Annually","Inspect electrical terminations, sensors, controls, rotor condition, and heater elements under the manufacturer procedure.","Attach qualified-service findings."]
  ]},
  {match:a=>a.category.includes("Generator"),interval:"Weekly readiness check · monthly exercise · annual qualified service",safety:"The generator and transfer system may start automatically and contain multiple lethal energy sources. Follow the approved disable, LOTO, fuel, battery, exhaust, and hot-surface procedures.",tasks:[
    ["Weekly","Check controller readiness, fuel level, oil, coolant, leaks, battery charger, block heater, emergency stop, and surrounding condition.","Record fuel percentage, fluid levels, charger voltage, and alarms."],
    ["Monthly","Perform the approved automatic exercise and verify start, voltage, frequency, oil pressure, coolant temperature, transfer logic where scheduled, and cooldown.","Record start time, stabilized readings, runtime, and faults."],
    ["Quarterly","Inspect starting batteries, terminals, cables, belts, hoses, radiator, air intake, exhaust, fuel system, and enclosure.","Record battery measurements and physical condition."],
    ["Annual / operating hours","Change engine oil and service oil, fuel, coolant, and air filters at the Cummins schedule; test coolant and fuel quality.","Record hours, specifications, quantities, and part numbers."],
    ["Annually","Perform qualified ATS/emergency-power testing and load testing under the approved site plan.","Attach test report and corrective actions."]
  ]},
  {match:a=>a.category.includes("UPS")||a.category.includes("Critical Power"),interval:"Monthly status review · annual qualified preventive maintenance",safety:"The UPS has stored energy and multiple AC/DC sources. Internal service and bypass operation require Eaton-qualified procedures and personnel.",tasks:[
    ["Monthly","Review status, active alarms, event log, input/bypass/output values, load percentage, battery state, runtime estimate, and room temperature.","Record display values and export significant events."],
    ["Monthly","Inspect ventilation, air filters, fans, clearances, cabinet condition, and signs of overheating, leakage, or unusual noise.","Record filter/fan condition and temperature."],
    ["Quarterly","Review battery trends, charger status, cell/block alarms, and environmental conditions without opening energized compartments.","Record available battery health indicators."],
    ["Annually","Have qualified personnel inspect batteries, capacitors, fans, filters, power connections, bypass/static switch, and internal event history.","Attach the service report and replacement forecast."],
    ["Annually","Perform an approved battery/runtime or capacity assessment coordinated with critical-load protection requirements.","Record test method, load, duration, and result."]
  ]}
];

function facilityIqPmProfile(asset){
  const profile=facilityIqPmProfiles.find(item=>item.match(asset))||{
    interval:"Monthly condition inspection · manufacturer schedule for service",
    safety:"Apply the approved LOTO, isolation, PPE, and manufacturer procedures before maintenance.",
    tasks:[
      ["Monthly","Review operating state, alarms, commands, feedback, leaks, noise, vibration, temperature, and visible condition.","Record baseline readings and photograph deficiencies."],
      ["Quarterly","Inspect mechanical, electrical, control, safety, mounting, guarding, and connection condition.","Record deficiencies and corrective actions."],
      ["Annually","Perform manufacturer-specified qualified service using the complete model and serial number.","Attach the service report and parts used."]
    ]
  };
  const status=facilityIqManualStatus(asset);
  return {...profile,source:asset.manual?`${status.label} attached to this asset`:"Facility maintenance baseline; manufacturer manual not yet attached"};
}

function facilityIqPmStorageKey(assetId){return `facilityIqPmV1:${assetId}`}
function facilityIqReadPm(assetId){try{return JSON.parse(localStorage.getItem(facilityIqPmStorageKey(assetId))||"{}")}catch(_){return {}}}
function facilityIqWritePm(assetId,data){try{localStorage.setItem(facilityIqPmStorageKey(assetId),JSON.stringify(data))}catch(_){}}

function facilityIqPreventiveMaintenanceMarkup(asset){
  const profile=facilityIqPmProfile(asset),saved=facilityIqReadPm(asset.id),completed=profile.tasks.filter((_,index)=>saved[index]).length;
  const manual=asset.manual?`<a class="manual-button" href="${esc(asset.manual)}" target="_blank" rel="noopener">Open source manual</a>`:`<span class="manual-unavailable">Manual not yet attached</span>`;
  return `<section class="pm-workspace">
    <div class="pm-hero"><div><span class="status">PREVENTIVE MAINTENANCE</span><h2>${esc(asset.id)} maintenance checklist</h2><p><strong>Typical schedule:</strong> ${esc(profile.interval)}</p><p><strong>Source:</strong> ${esc(profile.source)}</p></div><div class="pm-progress"><strong id="pm-progress-count">${completed}/${profile.tasks.length}</strong><span>checks complete</span></div></div>
    <div class="warning"><strong>Safety:</strong> ${esc(profile.safety)}</div>
    <div class="pm-actions">${manual}<button type="button" id="copy-pm-summary" class="secondary-button">Copy PM Summary</button><button type="button" id="clear-pm-checklist" class="text-button">Clear checklist</button></div>
    <p class="small-note">Intervals shown combine attached-manual maintenance topics with verified facility guidance where available. The complete installed model, serial number, operating hours, environment, and approved site program control the final interval.</p>
    <div class="pm-checklist">${profile.tasks.map((task,index)=>`<label class="pm-task ${saved[index]?"complete":""}"><input type="checkbox" data-pm-task="${index}" ${saved[index]?"checked":""}/><span class="pm-frequency">${esc(task[0])}</span><span class="pm-task-copy"><strong>${esc(task[1])}</strong><small>Evidence: ${esc(task[2])}</small></span></label>`).join("")}</div>
  </section>`;
}

function facilityIqPmSummary(asset){
  const profile=facilityIqPmProfile(asset),saved=facilityIqReadPm(asset.id);
  return `${asset.id} — ${asset.name}
Preventive Maintenance
Typical schedule: ${profile.interval}
Source: ${profile.source}

${profile.tasks.map((task,index)=>`${saved[index]?"[COMPLETE]":"[OPEN]"} ${task[0]} — ${task[1]}\nEvidence: ${task[2]}`).join("\n\n")}

Manual: ${asset.manual?new URL(asset.manual,location.href).href:"Not attached"}
Verify the installed model, serial number, operating hours, site procedures, and manufacturer requirements before maintenance.`;
}
