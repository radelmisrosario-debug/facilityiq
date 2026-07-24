
function fiqNumber(value){
  if(value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function fiqRuleMatches(rule, measurements, observations){
  if(rule.kind === "observation"){
    const actual = Boolean(observations[rule.key]);
    return rule.value === undefined ? actual : actual === rule.value;
  }

  const actual = fiqNumber(measurements[rule.key]);
  if(rule.op === "present") return actual !== null;
  if(actual === null) return false;

  const other = rule.other ? fiqNumber(measurements[rule.other]) : null;
  switch(rule.op){
    case ">": return rule.other ? other !== null && actual > other : actual > rule.value;
    case ">=": return actual >= rule.value;
    case "<": return actual < rule.value;
    case "<=": return rule.other ? other !== null && actual <= other : actual <= rule.value;
    case "near": return other !== null && Math.abs(actual - other) <= rule.value;
    case "lowRelativeTo": return other !== null && other > 0 && actual / other < rule.value;
    default: return false;
  }
}

function fiqRankFailures(profile, problemId, measurements, observations){
  const rules = facilityIqKnowledgeBase?.[profile]?.[problemId] || [];
  const ranked = rules.map(failure => {
    let score = failure.base || 0;
    const matched = [];
    let availableWeight = failure.base || 0;

    for(const rule of failure.evidence || []){
      availableWeight += rule.weight || 0;
      if(fiqRuleMatches(rule, measurements, observations)){
        score += rule.weight || 0;
        matched.push(rule);
      }
    }

    return {
      ...failure,
      rawScore: score,
      evidenceCount: matched.length,
      confidence: availableWeight ? Math.min(99, Math.round(score / availableWeight * 100)) : 0
    };
  });

  ranked.sort((a,b) => b.rawScore - a.rawScore);
  const max = ranked[0]?.rawScore || 1;
  return ranked.map(item => ({
    ...item,
    relative: Math.max(1, Math.round(item.rawScore / max * 100))
  }));
}

function fiqEngineeringCalculations(profile, values){
  const results = [];
  const n = fiqNumber;

  const amps = n(values.motorAmps);
  const fla = n(values.motorFla);
  if(amps !== null && fla !== null && fla > 0){
    results.push({
      label:"Motor load",
      value:`${(amps/fla*100).toFixed(1)}% of FLA`,
      formula:"Operating amps ÷ nameplate FLA × 100"
    });
  }

  if(profile === "chiller"){
    const ewt=n(values.enteringWater), lwt=n(values.leavingWater), gpm=n(values.flow);
    if(ewt!==null && lwt!==null){
      const dt=ewt-lwt;
      results.push({label:"Chilled-water ΔT",value:`${dt.toFixed(1)}°F`,formula:"Entering water − leaving water"});
      if(gpm!==null && gpm>=0){
        const btuh=500*gpm*dt;
        results.push({label:"Estimated cooling",value:`${Math.round(btuh).toLocaleString()} BTU/hr`,formula:"500 × GPM × ΔT"});
        results.push({label:"Estimated cooling",value:`${(btuh/12000).toFixed(1)} tons`,formula:"BTU/hr ÷ 12,000"});
      }
    }
  }

  if(profile === "hydronic"){
    const suction=n(values.suctionPressure), discharge=n(values.dischargePressure);
    if(suction!==null && discharge!==null){
      const dp=discharge-suction;
      results.push({label:"Pump differential pressure",value:`${dp.toFixed(1)} PSI`,formula:"Discharge − suction"});
      results.push({label:"Estimated pump head",value:`${(dp*2.31).toFixed(1)} ft of water`,formula:"Differential PSI × 2.31"});
    }
  }

  if(profile === "ahu"){
    const ra=n(values.returnAir), sa=n(values.supplyAir), cfm=n(values.airflow);
    if(ra!==null && sa!==null){
      const dt=ra-sa;
      results.push({label:"Air temperature split",value:`${dt.toFixed(1)}°F`,formula:"Return air − supply air"});
      if(cfm!==null && cfm>=0){
        const btuh=1.08*cfm*dt;
        results.push({label:"Estimated sensible cooling",value:`${Math.round(btuh).toLocaleString()} BTU/hr`,formula:"1.08 × CFM × ΔT"});
      }
    }
  }

  if(profile === "boiler"){
    const supply=n(values.supplyTemp), ret=n(values.returnTemp), gpm=n(values.flow);
    if(supply!==null && ret!==null){
      const dt=supply-ret;
      results.push({label:"Hot-water ΔT",value:`${dt.toFixed(1)}°F`,formula:"Supply − return"});
      if(gpm!==null && gpm>=0){
        const btuh=500*gpm*dt;
        results.push({label:"Estimated heat transfer",value:`${Math.round(btuh).toLocaleString()} BTU/hr`,formula:"500 × GPM × ΔT"});
      }
    }
  }

  if(profile === "ups"){
    const load=n(values.loadKw), rated=n(values.ratedKw);
    if(load!==null && rated!==null && rated>0){
      results.push({label:"UPS loading",value:`${(load/rated*100).toFixed(1)}%`,formula:"Load kW ÷ rated kW × 100"});
    }
  }

  return results;
}


/* ===== FacilityIQ V05 evidence-quality engine ===== */

function fiqObservationState(observations,key){
  return observations?.[key] || "unknown";
}

function fiqRuleMatchesV05(rule, measurements, observations){
  if(rule.kind === "observation"){
    const state = fiqObservationState(observations,rule.key);
    if(state === "unknown") return false;
    const actual = state === "yes";
    return rule.value === undefined ? actual : actual === rule.value;
  }
  return fiqRuleMatches(rule, measurements, observations);
}

function fiqEvidenceQuality(profile, problemId, measurements, observations){
  const failures = facilityIqKnowledgeBase?.[profile]?.[problemId] || [];
  const required = [...new Set(failures.flatMap(f=>f.required||[]))];
  const missing = required.filter(key=>fiqNumber(measurements[key])===null);

  const observationRules = [...new Set(
    failures.flatMap(f=>f.evidence||[])
      .filter(r=>r.kind==="observation")
      .map(r=>r.key)
  )];
  const knownObservations = observationRules.filter(key=>fiqObservationState(observations,key)!=="unknown").length;

  const measurementRules = [...new Set(
    failures.flatMap(f=>f.evidence||[])
      .filter(r=>r.kind==="measurement")
      .map(r=>r.key)
  )];
  const knownMeasurements = measurementRules.filter(key=>fiqNumber(measurements[key])!==null).length;

  const available = observationRules.length + measurementRules.length;
  const known = knownObservations + knownMeasurements;
  const completeness = available ? Math.round(known/available*100) : 0;

  return {required,missing,completeness,known,available};
}

function fiqRankFailuresV05(profile, problemId, measurements, observations){
  const failures = facilityIqKnowledgeBase?.[profile]?.[problemId] || [];
  const ranked = failures.map(failure=>{
    let score=failure.base||0;
    let possible=failure.base||0;
    const matched=[];
    const contradicted=[];

    for(const rule of failure.evidence||[]){
      possible += rule.weight||0;
      if(fiqRuleMatchesV05(rule,measurements,observations)){
        score += rule.weight||0;
        matched.push(rule);
      } else if(rule.kind==="observation"){
        const state=fiqObservationState(observations,rule.key);
        if(state!=="unknown"){
          const expected=rule.value===undefined?true:rule.value;
          const actual=state==="yes";
          if(actual!==expected) contradicted.push(rule);
        }
      }
    }

    return {
      ...failure,
      rawScore:score,
      evidenceCount:matched.length,
      contradictionCount:contradicted.length,
      confidence:possible?Math.min(99,Math.round(score/possible*100)):0
    };
  });

  ranked.sort((a,b)=>b.rawScore-a.rawScore);
  const max=ranked[0]?.rawScore||1;
  return ranked.map(item=>({...item,relative:Math.max(1,Math.round(item.rawScore/max*100))}));
}

function fiqDetectContradictions(profile, measurements, observations){
  const issues=[];
  const n=fiqNumber;
  const yes=key=>fiqObservationState(observations,key)==="yes";
  const no=key=>fiqObservationState(observations,key)==="no";

  if(yes("fansRunning") && yes("fansNotRunning"))
    issues.push("Condenser fans are marked both running and not running.");
  if(yes("coilDirty") && yes("coilClean"))
    issues.push("The condenser/coil is marked both dirty and confirmed clean.");
  if(yes("manualBypassSelected") && yes("inverterAlarm")===false && no("manualBypassSelected")===false){
    // no-op placeholder; direct contradictions are handled by tri-state.
  }

  const amps=n(measurements.motorAmps), speed=n(measurements.speed);
  if(speed!==null && speed>=20 && amps!==null && amps===0)
    issues.push("Speed indicates the motor is commanded to run, but measured current is 0 A.");
  if(yes("pumpNotRunning") && speed!==null && speed>=20)
    issues.push("The pump is marked not running, but VFD speed is entered above 20 Hz.");
  if(yes("blowerNotRunning") && n(measurements.flameSignal)>0)
    issues.push("A flame signal is entered while the combustion blower is marked not running.");
  if(profile==="ups" && n(measurements.outputVoltage)>100 && yes("outputBreakerOpen"))
    issues.push("Output voltage is present while the UPS output breaker is marked open.");
  if(profile==="vacuum" && n(measurements.vacuum)>=n(measurements.targetVacuum) && yes("isolatedPumpStillLow"))
    issues.push("Measured vacuum meets target while isolated-pump performance is marked low.");
  if(profile==="dehumidifier" && n(measurements.leavingRh)<n(measurements.enteringRh) && yes("heaterNotOn") && yes("rotorStopped"))
    issues.push("RH reduction is recorded while both reactivation heat and rotor operation are marked unavailable; verify readings and operating state.");

  return issues;
}

function fiqAssetRangeResults(asset,profile,values){
  const config=facilityIqAssetRanges?.[asset.id];
  if(!config)return [];
  const results=[];
  const n=fiqNumber;

  if(config.flow && n(values.flow)!==null){
    const value=n(values.flow);
    const state=value<config.flow.min?"low":value>config.flow.max?"high":"normal";
    results.push({label:config.flow.label,value:`${value} ${config.flow.unit}`,state,
      expected:`Expected ${config.flow.min}–${config.flow.max} ${config.flow.unit}`,source:config.flow.source});
  }

  if(config.ratedKw && n(values.ratedKw)!==null){
    const value=n(values.ratedKw);
    results.push({label:config.ratedKw.label,value:`${value} ${config.ratedKw.unit}`,
      state:Math.abs(value-config.ratedKw.target)>1?"caution":"normal",
      expected:`Configured value ${config.ratedKw.target} ${config.ratedKw.unit}`,source:config.ratedKw.source});
  }

  if(config.loadPct && n(values.loadKw)!==null && n(values.ratedKw)>0){
    const pct=n(values.loadKw)/n(values.ratedKw)*100;
    results.push({label:"UPS load",value:`${pct.toFixed(1)}%`,state:pct>100?"high":pct>config.loadPct.max?"caution":"normal",
      expected:`Screening target ≤ ${config.loadPct.max}%`,source:config.loadPct.source});
  }

  if(config.dp && n(values.suctionPressure)!==null && n(values.dischargePressure)!==null){
    const dp=n(values.dischargePressure)-n(values.suctionPressure);
    const low=config.dp.target-config.dp.tolerance, high=config.dp.target+config.dp.tolerance;
    results.push({label:config.dp.label,value:`${dp.toFixed(1)} ${config.dp.unit}`,state:dp<low?"low":dp>high?"high":"normal",
      expected:`Configured target ${config.dp.target} ± ${config.dp.tolerance} ${config.dp.unit}`,source:config.dp.source});
  }

  return results;
}
