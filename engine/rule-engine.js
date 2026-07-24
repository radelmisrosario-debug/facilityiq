
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
