const diagnosticProfiles = {
  chiller: {
    title:"Chiller Diagnostic Measurements",
    fields:[
      {id:"enteringWater",label:"Entering water temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"leavingWater",label:"Leaving water temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"suctionPressure",label:"Suction pressure",unit:"PSI",type:"number",step:"0.1"},
      {id:"headPressure",label:"Head pressure",unit:"PSI",type:"number",step:"0.1"},
      {id:"ambient",label:"Outdoor ambient temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"flow",label:"Chilled-water flow",unit:"GPM",type:"number",step:"0.1"},
      {id:"motorAmps",label:"Compressor operating current",unit:"A",type:"number",step:"0.1"},
      {id:"motorFla",label:"Compressor nameplate FLA",unit:"A",type:"number",step:"0.1"}
    ]
  },
  dehumidifier: {
    title:"Dehumidifier Diagnostic Measurements",
    fields:[
      {id:"enteringRh",label:"Entering process-air RH",unit:"% RH",type:"number",step:"0.1"},
      {id:"leavingRh",label:"Leaving process-air RH",unit:"% RH",type:"number",step:"0.1"},
      {id:"processInTemp",label:"Entering process-air temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"processOutTemp",label:"Leaving process-air temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"reactivationInTemp",label:"Entering reactivation-air temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"reactivationOutTemp",label:"Leaving reactivation-air temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"motorAmps",label:"Blower or rotor motor current",unit:"A",type:"number",step:"0.1"},
      {id:"motorFla",label:"Motor nameplate FLA",unit:"A",type:"number",step:"0.1"}
    ]
  },
  hydronic: {
    title:"Hydronic Pump Diagnostic Measurements",
    fields:[
      {id:"suctionPressure",label:"Pump suction pressure",unit:"PSI",type:"number",step:"0.1"},
      {id:"dischargePressure",label:"Pump discharge pressure",unit:"PSI",type:"number",step:"0.1"},
      {id:"speed",label:"VFD speed",unit:"Hz",type:"number",step:"0.1"},
      {id:"motorAmps",label:"Motor operating current",unit:"A",type:"number",step:"0.1"},
      {id:"motorFla",label:"Motor nameplate FLA",unit:"A",type:"number",step:"0.1"},
      {id:"supplyTemp",label:"Loop supply temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"returnTemp",label:"Loop return temperature",unit:"°F",type:"number",step:"0.1"}
    ]
  },
  airCompressor: {
    title:"Air Compressor Diagnostic Measurements",
    fields:[
      {id:"receiverPressure",label:"Receiver pressure",unit:"PSI",type:"number",step:"0.1"},
      {id:"cutIn",label:"Pressure-switch cut-in",unit:"PSI",type:"number",step:"0.1"},
      {id:"cutOut",label:"Pressure-switch cut-out",unit:"PSI",type:"number",step:"0.1"},
      {id:"dischargeTemp",label:"Discharge temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"motorAmps",label:"Motor operating current",unit:"A",type:"number",step:"0.1"},
      {id:"motorFla",label:"Motor nameplate FLA",unit:"A",type:"number",step:"0.1"},
      {id:"runMinutes",label:"Minutes running without reaching cut-out",unit:"min",type:"number",step:"1"}
    ]
  },
  ahu: {
    title:"Air Handler Diagnostic Measurements",
    fields:[
      {id:"returnAir",label:"Return-air temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"supplyAir",label:"Supply-air temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"mixedAir",label:"Mixed-air temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"roomTemperature",label:"Room temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"roomCoolingSetpoint",label:"Effective room cooling setpoint",unit:"°F",type:"number",step:"0.1"},
      {id:"roomHeatingSetpoint",label:"Effective room heating setpoint",unit:"°F",type:"number",step:"0.1"},
      {id:"terminalAirflow",label:"CAV/VAV measured airflow",unit:"CFM",type:"number",step:"1"},
      {id:"terminalAirflowSetpoint",label:"CAV/VAV airflow setpoint",unit:"CFM",type:"number",step:"1"},
      {id:"terminalDamperCommand",label:"Terminal damper command",unit:"%",type:"number",step:"1"},
      {id:"terminalDamperPosition",label:"Terminal damper position",unit:"%",type:"number",step:"1"},
      {id:"terminalHeatingValveCommand",label:"VAV heating-valve command",unit:"%",type:"number",step:"1"},
      {id:"terminalHeatingValvePosition",label:"VAV heating-valve physical position",unit:"%",type:"number",step:"1"},
      {id:"terminalInletTemp",label:"VAV inlet-air temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"terminalDischargeTemp",label:"VAV discharge-air temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"chilledWaterSupply",label:"Chilled-water supply temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"chilledWaterSetpoint",label:"Active chilled-water setpoint",unit:"°F",type:"number",step:"0.1"},
      {id:"hotWaterSupply",label:"Hot-water supply temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"hotWaterSetpoint",label:"Active hot-water setpoint",unit:"°F",type:"number",step:"0.1"},
      {id:"controlAirPressure",label:"Control-air pressure at AHU",unit:"PSI",type:"number",step:"0.1"},
      {id:"coolingValveCommand",label:"Cooling-valve command",unit:"%",type:"number",step:"1"},
      {id:"heatingValveCommand",label:"Heating-valve command",unit:"%",type:"number",step:"1"},
      {id:"coolingValvePosition",label:"Cooling-valve physical position",unit:"%",type:"number",step:"1"},
      {id:"heatingValvePosition",label:"Heating-valve physical position",unit:"%",type:"number",step:"1"},
      {id:"staticPressure",label:"Duct static pressure",unit:"in. w.c.",type:"number",step:"0.01"},
      {id:"speed",label:"Fan VFD speed",unit:"Hz",type:"number",step:"0.1"},
      {id:"motorAmps",label:"Fan motor current",unit:"A",type:"number",step:"0.1"},
      {id:"motorFla",label:"Motor nameplate FLA",unit:"A",type:"number",step:"0.1"}
    ]
  },
  fan: {
    title:"Exhaust Fan Diagnostic Measurements",
    fields:[
      {id:"speed",label:"Fan speed",unit:"Hz",type:"number",step:"0.1"},
      {id:"motorAmps",label:"Motor operating current",unit:"A",type:"number",step:"0.1"},
      {id:"motorFla",label:"Motor nameplate FLA",unit:"A",type:"number",step:"0.1"},
      {id:"vibration",label:"Overall vibration",unit:"in/s",type:"number",step:"0.001"},
      {id:"airflow",label:"Measured airflow",unit:"CFM",type:"number",step:"1"},
      {id:"ductStaticPressure",label:"Shared-duct static pressure",unit:"in. w.c.",type:"number",step:"0.01"},
      {id:"ductStaticSetpoint",label:"Shared-duct static setpoint",unit:"in. w.c.",type:"number",step:"0.01"},
      {id:"hoodFaceVelocity",label:"Affected hood face velocity",unit:"FPM",type:"number",step:"1"}
    ]
  },
  rtu: {
    title:"Roof-Top Unit Diagnostic Measurements",
    fields:[
      {id:"roomTemperature",label:"Room temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"roomSetpoint",label:"Effective room setpoint",unit:"Â°F",type:"number",step:"0.1"},
      {id:"returnAir",label:"Return-air temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"supplyAir",label:"Supply-air temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"outdoorAir",label:"Outdoor-air temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"staticPressure",label:"Supply static pressure",unit:"in. w.c.",type:"number",step:"0.01"},
      {id:"motorAmps",label:"Supply-fan motor current",unit:"A",type:"number",step:"0.1"},
      {id:"motorFla",label:"Supply-fan motor FLA",unit:"A",type:"number",step:"0.1"},
      {id:"compressorAmps",label:"Compressor current",unit:"A",type:"number",step:"0.1"},
      {id:"dischargeTemp",label:"Compressor discharge temperature",unit:"Â°F",type:"number",step:"0.1"}
    ]
  },
  miniSplit: {
    title:"Mini-Split / Precision Cooling Measurements",
    fields:[
      {id:"roomTemperature",label:"Room temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"roomSetpoint",label:"Controller setpoint",unit:"Â°F",type:"number",step:"0.1"},
      {id:"returnAir",label:"Indoor return-air temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"supplyAir",label:"Indoor discharge-air temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"outdoorAir",label:"Outdoor-air temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"suctionLineTemp",label:"Suction-line temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"liquidLineTemp",label:"Liquid-line temperature",unit:"Â°F",type:"number",step:"0.1"},
      {id:"compressorAmps",label:"Compressor operating current",unit:"A",type:"number",step:"0.1"}
    ]
  },
  boiler: {
    title:"Boiler Diagnostic Measurements",
    fields:[
      {id:"supplyTemp",label:"Hot-water supply temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"returnTemp",label:"Hot-water return temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"inletPressure",label:"Gas inlet pressure",unit:"in. w.c.",type:"number",step:"0.01"},
      {id:"outletPressure",label:"Gas manifold pressure",unit:"in. w.c.",type:"number",step:"0.01"},
      {id:"flameSignal",label:"Flame signal",unit:"µA",type:"number",step:"0.1"},
      {id:"loopPressure",label:"Hydronic loop pressure",unit:"PSI",type:"number",step:"0.1"}
    ]
  },
  ups: {
    title:"UPS Diagnostic Measurements",
    fields:[
      {id:"loadKw",label:"UPS load",unit:"kW",type:"number",step:"0.1"},
      {id:"ratedKw",label:"UPS rated capacity",unit:"kW",type:"number",step:"0.1"},
      {id:"inputVoltage",label:"Input voltage",unit:"V",type:"number",step:"0.1"},
      {id:"outputVoltage",label:"Output voltage",unit:"V",type:"number",step:"0.1"},
      {id:"batteryVoltage",label:"Battery string voltage",unit:"VDC",type:"number",step:"0.1"},
      {id:"runtime",label:"Estimated runtime",unit:"min",type:"number",step:"1"},
      {id:"roomTemp",label:"UPS room temperature",unit:"°F",type:"number",step:"0.1"}
    ]
  },

  dryer: {
    title:"Compressed-Air Dryer Diagnostic Measurements",
    fields:[
      {id:"inletPressure",label:"Dryer inlet pressure",unit:"PSI",type:"number",step:"0.1"},
      {id:"outletPressure",label:"Dryer outlet pressure",unit:"PSI",type:"number",step:"0.1"},
      {id:"dewPoint",label:"Pressure dew point",unit:"°F",type:"number",step:"0.1"},
      {id:"roomTemp",label:"Mechanical-room temperature",unit:"°F",type:"number",step:"0.1"},
      {id:"motorAmps",label:"Refrigeration compressor current",unit:"A",type:"number",step:"0.1"},
      {id:"motorFla",label:"Compressor nameplate FLA",unit:"A",type:"number",step:"0.1"}
    ]
  },
  generator: {
    title:"Emergency Generator Diagnostic Measurements",
    fields:[
      {id:"batteryVoltage",label:"Starting-battery voltage",unit:"VDC",type:"number",step:"0.1"},
      {id:"engineSpeed",label:"Engine speed",unit:"RPM",type:"number",step:"1"},
      {id:"outputVoltage",label:"Generator output voltage",unit:"VAC",type:"number",step:"1"},
      {id:"outputFrequency",label:"Generator output frequency",unit:"Hz",type:"number",step:"0.1"},
      {id:"oilPressure",label:"Engine oil pressure",unit:"PSI",type:"number",step:"0.1"},
      {id:"coolantTemperature",label:"Coolant temperature",unit:"°F",type:"number",step:"0.1"}
    ]
  },
  vacuum: {
    title:"Vacuum Pump Diagnostic Measurements",
    fields:[
      {id:"vacuum",label:"Measured vacuum",unit:"inHg",type:"number",step:"0.1"},
      {id:"targetVacuum",label:"Expected vacuum",unit:"inHg",type:"number",step:"0.1"},
      {id:"motorAmps",label:"Motor operating current",unit:"A",type:"number",step:"0.1"},
      {id:"motorFla",label:"Motor nameplate FLA",unit:"A",type:"number",step:"0.1"},
      {id:"pumpTemp",label:"Pump surface temperature",unit:"°F",type:"number",step:"0.1"}
    ]
  }
};

function profileForAsset(asset){
  const c=(asset.category+" "+asset.name).toLowerCase();
  if(c.includes("chiller")) return "chiller";
  if(c.includes("dehumid")) return "dehumidifier";
  if(c.includes("chilled water pump")||c.includes("chilled-water pump")||c.includes("hot water loop pump")) return "hydronic";
  if(c.includes("air dryer")||c.includes("dryer")) return "dryer";
  if(c.includes("air compressor")||c.includes("compressor")) return "airCompressor";
  if(c.includes("air handling")||asset.id.startsWith("AHU")) return "ahu";
  if(c.includes("exhaust fan")||asset.id.startsWith("EF-")) return "fan";
  if(c.includes("roof top unit")||asset.id.startsWith("RTU-")) return "rtu";
  if(c.includes("mini-split")||c.includes("precision cooling")||asset.id==="Liebert-258") return "miniSplit";
  if(c.includes("boiler")) return "boiler";
  if(c.includes("ups")) return "ups";
  if(c.includes("vacuum")) return "vacuum";
  if(c.includes("generator")) return "generator";
  return null;
}

function sessionKey(assetId,problemId){return `facilityiq:v03:${assetId}:${problemId}`}
function readSession(assetId,problemId){
  try{return JSON.parse(sessionStorage.getItem(sessionKey(assetId,problemId))||'{"answers":[],"measurements":{}}')}
  catch{return {answers:[],measurements:{}}}
}
function writeSession(assetId,problemId,data){sessionStorage.setItem(sessionKey(assetId,problemId),JSON.stringify(data))}
function clearSession(assetId,problemId){sessionStorage.removeItem(sessionKey(assetId,problemId))}
function recordAnswer(asset,problem,stepId,question,answer){
  const data=readSession(asset.id,problem.id);
  const existing=data.answers.findIndex(x=>x.stepId===stepId);
  const row={stepId,question,answer};
  if(existing>=0)data.answers=data.answers.slice(0,existing).concat(row);
  else data.answers.push(row);
  writeSession(asset.id,problem.id,data);
}
function saveMeasurements(assetId,values){
  const key=`facilityiq:v03:measurements:${assetId}`;
  sessionStorage.setItem(key,JSON.stringify(values));
}
function loadMeasurements(assetId){
  try{return JSON.parse(sessionStorage.getItem(`facilityiq:v03:measurements:${assetId}`)||"{}")}catch{return {}}
}
function n(v){const x=Number(v);return Number.isFinite(x)?x:null}
function fmt(v,d=1){return Number(v).toFixed(d).replace(/\.0$/,"")}
function diagnosticResults(profile,values){
  const r=[];
  const a=n(values.motorAmps), fla=n(values.motorFla);
  if(a!==null&&fla!==null&&fla>0){
    const pct=a/fla*100;
    r.push({label:"Motor load",value:`${fmt(pct)}% of FLA`,state:pct>100?"high":pct<30?"low":"normal",
      note:pct>100?"Current exceeds nameplate FLA. Investigate overload, mechanical binding, voltage, or operating point.":pct<30?"Low current may indicate light load, low flow, unloaded operation, belt/coupling slip, or inaccurate readings.":"Operating current is below nameplate FLA."});
  }
  if(profile==="hydronic"){
    const s=n(values.suctionPressure),d=n(values.dischargePressure);
    if(s!==null&&d!==null){
      const dp=d-s;
      r.push({label:"Pump differential pressure",value:`${fmt(dp)} PSI`,state:dp<=0?"high":"info",
        note:dp<=0?"Discharge pressure is not above suction pressure. Verify rotation, valves, gauges, priming, coupling, and flow.":"Compare this DP with the approved design/setpoint and pump curve."});
    }
    const st=n(values.supplyTemp),rt=n(values.returnTemp);
    if(st!==null&&rt!==null){
      const dt=Math.abs(rt-st);
      r.push({label:"Loop ΔT",value:`${fmt(dt)}°F`,state:"info",note:"Use the sign and expected sequence for the specific hot-water or chilled-water loop; compare with current load and design."});
    }
  }
  if(profile==="chiller"){
    const e=n(values.enteringWater),l=n(values.leavingWater);
    if(e!==null&&l!==null){
      const dt=e-l;
      r.push({label:"Evaporator water ΔT",value:`${fmt(dt)}°F`,state:dt<=0?"high":"info",
        note:dt<=0?"Leaving water is not colder than entering water. Verify sensor locations, compressor operation, water flow, and cooling call.":"Compare ΔT with water flow and current cooling load."});
    }
    const flow=n(values.flow);
    if(flow!==null){
      r.push({label:"Recorded water flow",value:`${fmt(flow)} GPM`,state:flow<6.5?"high":flow>14.4?"high":"normal",
        note:flow<6.5?"Below the manual's approximate minimum for MAC-060HE-03. Correct flow before compressor operation.":flow>14.4?"Above the manual's approximate maximum for MAC-060HE-03. Verify measurement and balance.":"Within the manual's approximate 6.5–14.4 GPM range."});
    }
    const hp=n(values.headPressure),sp=n(values.suctionPressure);
    if(hp!==null&&sp!==null)r.push({label:"Compression differential",value:`${fmt(hp-sp)} PSI`,state:"info",note:"Interpret with R407C saturation temperatures, ambient conditions, water temperatures, superheat, and subcooling. Pressure alone is not a diagnosis."});
  }
  if(profile==="ahu"){
    const ra=n(values.returnAir),sa=n(values.supplyAir);
    if(ra!==null&&sa!==null){
      const split=ra-sa;
      r.push({label:"Air temperature split",value:`${fmt(split)}°F`,state:split<=0?"high":"info",
        note:split<=0?"Supply air is not cooler than return air. Check mode, sensors, coil valve, chilled-water flow, and heating command.":"Compare with outside-air percentage, humidity load, SAT setpoint, and coil performance."});
    }
    const chw=n(values.chilledWaterSupply),chwSetpoint=n(values.chilledWaterSetpoint);
    if(chw!==null&&chwSetpoint!==null){
      const deviation=chw-chwSetpoint;
      r.push({label:"Chilled-water setpoint deviation",value:`${fmt(deviation)}°F`,state:deviation>2?"high":deviation>1?"caution":"normal",
        note:deviation>2?"Supply water is more than 2°F above the active setpoint. Check the Desigo plant setpoint, enabled chiller and PCWP, secondary pumps, loop DP, and distribution before blaming the AHU coil.":"Compare the remaining cooling performance with valve position, water flow, coil condition, and load."});
    }
    const controlAir=n(values.controlAirPressure);
    if(controlAir!==null)r.push({label:"Recorded control-air pressure",value:`${fmt(controlAir)} PSI`,state:"info",
      note:"Compare with the approved site operating range at both the header and AHU branch. Low air can leave the heating valve open and cooling valve closed."});
    const coolingCommand=n(values.coolingValveCommand),heatingCommand=n(values.heatingValveCommand);
    if(coolingCommand!==null||heatingCommand!==null)r.push({label:"Pneumatic valve commands",value:`Cooling ${coolingCommand===null?"—":fmt(coolingCommand)+"%"} · Heating ${heatingCommand===null?"—":fmt(heatingCommand)+"%"}`,state:"info",
      note:"Compare Desigo commands with physical valve stem/linkage positions. Cooling is normally closed; heating is normally open on loss of control air."});
    const roomTemp=n(values.roomTemperature),roomSetpoint=n(values.roomCoolingSetpoint);
    if(roomTemp!==null&&roomSetpoint!==null){
      const deviation=roomTemp-roomSetpoint;
      r.push({label:"Room cooling deviation",value:`${fmt(deviation)}°F`,state:deviation>2?"high":deviation>0?"caution":"normal",
        note:deviation>0?"Room temperature is above the entered effective cooling setpoint. Confirm occupancy, overrides, and sensor accuracy before escalating.":"The entered room temperature is not above its effective cooling setpoint."});
    }
    const roomHeatingSetpoint=n(values.roomHeatingSetpoint);
    if(roomTemp!==null&&roomHeatingSetpoint!==null){
      const heatingDeficit=roomHeatingSetpoint-roomTemp;
      r.push({label:"Room heating deficit",value:`${fmt(heatingDeficit)}°F`,state:heatingDeficit>2?"high":heatingDeficit>0?"caution":"normal",
        note:heatingDeficit>0?"Room temperature is below the entered effective heating setpoint. Confirm occupancy, overrides, terminal operation, and sensor accuracy.":"The entered room temperature is not below its effective heating setpoint."});
    }
    const hotWaterSupply=n(values.hotWaterSupply),hotWaterSetpoint=n(values.hotWaterSetpoint);
    if(hotWaterSupply!==null&&hotWaterSetpoint!==null){
      const hotWaterDeficit=hotWaterSetpoint-hotWaterSupply;
      r.push({label:"Hot-water setpoint deficit",value:`${fmt(hotWaterDeficit)}°F`,state:hotWaterDeficit>5?"high":hotWaterDeficit>2?"caution":"normal",
        note:hotWaterDeficit>2?"Hot-water supply is below the entered active setpoint. Check Desigo reset logic, enabled boilers, HWP status, loop DP, and distribution.":"Hot-water supply is reasonably close to the entered setpoint."});
    }
    const terminalFlow=n(values.terminalAirflow),terminalFlowSetpoint=n(values.terminalAirflowSetpoint);
    if(terminalFlow!==null&&terminalFlowSetpoint!==null&&terminalFlowSetpoint>0){
      const delivered=terminalFlow/terminalFlowSetpoint*100;
      r.push({label:"Terminal airflow delivery",value:`${fmt(delivered)}% of setpoint`,state:delivered<80?"high":delivered<95?"caution":"normal",
        note:delivered<95?"Check CAV/VAV damper command and position, primary-air inlet pressure, airflow sensor and pickup, actuator/linkage, and downstream restriction.":"Measured terminal airflow is close to or above the entered setpoint."});
    }
    const damperCommand=n(values.terminalDamperCommand),damperPosition=n(values.terminalDamperPosition);
    if(damperCommand!==null&&damperPosition!==null){
      const error=Math.abs(damperCommand-damperPosition);
      r.push({label:"Terminal damper tracking error",value:`${fmt(error)} percentage points`,state:error>20?"high":error>10?"caution":"normal",
        note:error>10?"Command and position differ. Verify whether position is true feedback, then inspect the actuator, linkage, controls, and damper movement.":"Entered command and position are tracking reasonably closely."});
    }
    const terminalHeatingCommand=n(values.terminalHeatingValveCommand),terminalHeatingPosition=n(values.terminalHeatingValvePosition);
    if(terminalHeatingCommand!==null&&terminalHeatingPosition!==null){
      const error=Math.abs(terminalHeatingCommand-terminalHeatingPosition);
      r.push({label:"VAV heating-valve tracking error",value:`${fmt(error)} percentage points`,state:error>20?"high":error>10?"caution":"normal",
        note:error>10?"VAV heating-valve command and physical position differ. Inspect the actuator, linkage, valve stroke, and controls.":"Entered VAV heating-valve command and position are tracking."});
    }
    const terminalInletTemp=n(values.terminalInletTemp),terminalDischargeTemp=n(values.terminalDischargeTemp);
    if(terminalInletTemp!==null&&terminalDischargeTemp!==null){
      const rise=terminalDischargeTemp-terminalInletTemp;
      r.push({label:"VAV discharge-air temperature rise",value:`${fmt(rise)}Â°F`,state:rise<2&&terminalHeatingCommand!==null&&terminalHeatingCommand>=50?"high":rise>5&&terminalHeatingCommand!==null&&terminalHeatingCommand<=10?"high":"info",
        note:rise<2&&terminalHeatingCommand!==null&&terminalHeatingCommand>=50?"Heating is commanded but there is little temperature rise. Check valve position, hot-water availability, coil airflow, and sensor accuracy.":rise>5&&terminalHeatingCommand!==null&&terminalHeatingCommand<=10?"The VAV is adding heat with little or no heating command. Check for valve leakage, failed closure, linkage, and sensor accuracy.":"Use the temperature rise with heating demand, valve command, and physical position to evaluate VAV heat."});
    }
    const coolingPosition=n(values.coolingValvePosition),heatingPosition=n(values.heatingValvePosition);
    if(coolingCommand!==null&&coolingPosition!==null){
      const error=Math.abs(coolingCommand-coolingPosition);
      r.push({label:"Cooling-valve tracking error",value:`${fmt(error)} percentage points`,state:error>20?"high":error>10?"caution":"normal",
        note:error>10?"Cooling-valve command and physical position differ. Check control air, actuator/positioner, linkage, and valve stroke.":"Cooling-valve command and entered position are tracking."});
    }
    if(heatingCommand!==null&&heatingPosition!==null){
      const error=Math.abs(heatingCommand-heatingPosition);
      r.push({label:"Heating-valve tracking error",value:`${fmt(error)} percentage points`,state:error>20?"high":error>10?"caution":"normal",
        note:error>10?"Heating-valve command and physical position differ. Check control air, actuator/positioner, linkage, and valve stroke.":"Heating-valve command and entered position are tracking."});
    }
  }
  if(profile==="dehumidifier"){
    const er=n(values.enteringRh),lr=n(values.leavingRh);
    if(er!==null&&lr!==null){
      const drop=er-lr;
      r.push({label:"Process-air RH reduction",value:`${fmt(drop)} percentage points`,state:drop<=0?"high":"info",
        note:drop<=0?"Leaving RH is not lower. Verify rotor rotation, reactivation heat, airflow direction, filters, seals, and sensor accuracy.":"Use dew point or grains of moisture for a complete performance evaluation because RH changes with temperature."});
    }
    const ri=n(values.reactivationInTemp),ro=n(values.reactivationOutTemp);
    if(ri!==null&&ro!==null)r.push({label:"Reactivation temperature rise",value:`${fmt(ro-ri)}°F`,state:ro<=ri?"high":"info",note:ro<=ri?"No positive reactivation temperature rise was recorded. Check airflow proving, heater stages, limits, and sensors.":"Compare with the manufacturer's startup and operating data."});
  }
  if(profile==="airCompressor"){
    const p=n(values.receiverPressure),ci=n(values.cutIn),co=n(values.cutOut);
    if(p!==null&&ci!==null&&co!==null){
      const state=p<ci?"below cut-in":p>=co?"at/above cut-out":"between cut-in and cut-out";
      r.push({label:"Pressure-switch state",value:state,state:"info",note:p<ci?"The compressor should normally be called to run, subject to safeties and controls.":p>=co?"The compressor should normally be stopped or unloaded.":"Operating state depends on whether pressure is rising or falling and on switch differential."});
    }
  }
  if(profile==="boiler"){
    const st=n(values.supplyTemp),rt=n(values.returnTemp);
    if(st!==null&&rt!==null)r.push({label:"Boiler loop ΔT",value:`${fmt(st-rt)}°F`,state:st<=rt?"high":"info",note:st<=rt?"Supply is not warmer than return. Verify firing, sensor location, pump flow, and mixing.":"Compare against firing rate, design flow, and current load."});
  }
  if(profile==="ups"){
    const load=n(values.loadKw),rated=n(values.ratedKw);
    if(load!==null&&rated!==null&&rated>0){
      const pct=load/rated*100;
      r.push({label:"UPS load",value:`${fmt(pct)}%`,state:pct>100?"high":pct>80?"caution":"normal",note:pct>100?"Recorded load exceeds rating. Reduce load and verify readings immediately.":pct>80?"High loading reduces margin and battery runtime. Review critical load and redundancy.":"Load is below 80% of entered rating."});
    }
  }
  if(profile==="vacuum"){
    const v=n(values.vacuum),t=n(values.targetVacuum);
    if(v!==null&&t!==null)r.push({label:"Vacuum deviation",value:`${fmt(t-v)} inHg from target`,state:v<t?"caution":"normal",note:v<t?"Measured vacuum is below the entered target. Check open users, leaks, gas ballast, oil, filters, valves, and pump condition.":"Measured vacuum meets or exceeds the entered target."});
  }
  return r;
}
function renderDiagnosticPanel(asset){
  const profileName=profileForAsset(asset);
  if(!profileName)return "";
  const profile=diagnosticProfiles[profileName],saved=loadMeasurements(asset.id);
  return `<section class="diagnostic-panel"><div class="diagnostic-heading"><div><span class="status">MEASUREMENTS</span><h3>${esc(profile.title)}</h3><p class="meta">Enter actual readings. FacilityIQ calculates relationships and flags conditions that should be investigated. It does not replace equipment limits or manufacturer procedures.</p></div></div>
  <div class="measurement-grid">${profile.fields.map(f=>`<label class="measurement-field"><span>${esc(f.label)}</span><div class="input-unit"><input inputmode="decimal" type="${f.type}" step="${f.step}" data-measure="${f.id}" value="${saved[f.id]??""}" placeholder="—"><b>${esc(f.unit)}</b></div></label>`).join("")}</div>
  <div class="button-row diagnostic-actions"><button id="analyze-readings" class="primary-button">Analyze Readings</button><button id="clear-readings" class="secondary-button">Clear</button></div>
  <div id="diagnostic-output"></div></section>`;
}
function bindDiagnosticPanel(asset){
  const analyze=document.getElementById("analyze-readings");
  if(!analyze)return;
  const profile=profileForAsset(asset);
  const collect=()=>Object.fromEntries([...document.querySelectorAll("[data-measure]")].map(x=>[x.dataset.measure,x.value]));
  analyze.onclick=()=>{
    const values=collect();saveMeasurements(asset.id,values);
    const results=diagnosticResults(profile,values);
    const target=document.getElementById("diagnostic-output");
    target.innerHTML=results.length?`<div class="diagnostic-results"><h3>Calculated diagnostic indicators</h3>${results.map(x=>`<div class="indicator ${x.state}"><div><strong>${esc(x.label)}</strong><span>${esc(x.value)}</span></div><p>${esc(x.note)}</p></div>`).join("")}</div>`:`<div class="warning"><strong>No calculation available:</strong> Enter a related pair of readings, such as suction and discharge pressure, entering and leaving temperature, or operating amps and FLA.</div>`;
    target.scrollIntoView({behavior:"smooth",block:"nearest"});
  };
  document.getElementById("clear-readings").onclick=()=>{
    document.querySelectorAll("[data-measure]").forEach(x=>x.value="");
    saveMeasurements(asset.id,{});
    document.getElementById("diagnostic-output").innerHTML="";
  };
}
function troubleshootingSummary(asset,problem,result){
  const data=readSession(asset.id,problem.id);
  const checks=data.answers.length?data.answers.map(x=>`${x.answer}: ${x.question}`).join("\n"):"No guided checks were recorded.";
  return `FacilityIQ Troubleshooting Summary
Asset: ${asset.id} — ${asset.name}
Location: ${asset.location}
Problem: ${problem.name}
Result: ${result.title}

Checks completed:
${checks}

Likely cause:
${result.cause}

Recommended action:
${result.action}

Safety:
${result.safety}`;
}
function copyText(text,button){
  const done=()=>{const old=button.textContent;button.textContent="Copied";setTimeout(()=>button.textContent=old,1400)};
  if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(text).then(done);
  else{const t=document.createElement("textarea");t.value=text;document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();done()}
}
