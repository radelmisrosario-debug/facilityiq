const facilityIqChat = (() => {
  const storageKey = "facilityIqChatV1";
  const state = { open:false, messages:[], asset:null, problem:null, stepId:null };
  const clean = value => String(value || "").toLowerCase()
    .replace(/won['’]?t/g,"will not").replace(/can['’]?t/g,"cannot")
    .replace(/isn['’]?t/g,"is not").replace(/doesn['’]?t/g,"does not")
    .replace(/firing/g,"fire").replace(/starting/g,"start").replace(/running/g,"run")
    .replace(/cooling/g,"cool").replace(/heating/g,"heat")
    .replace(/tripped|tripping|\btrips\b/g,"trip").replace(/leaking/g,"leak")
    .replace(/overheating/g,"overheat").replace(/vibrating/g,"vibration")
    .replace(/[^a-z0-9]+/g, " ").trim();
  const safe = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const words = value => clean(value).split(" ").filter(word => word.length > 1);

  function score(query, text) {
    const q=clean(query), target=clean(text);
    if(!q) return 0;
    let total=target.includes(q)?12:0;
    words(query).forEach(word => total += target.split(" ").includes(word)?4:target.includes(word)?1:0);
    return total;
  }
  function assetText(asset){return [asset.id,asset.name,asset.category,asset.manufacturer,asset.model,asset.location,...facilityIqRoomsForAsset(asset.id).flatMap(room=>[`room ${room}`,`lab ${room}`,`laboratory ${room}`])].join(" ")}
  function assetMatches(query){return Object.values(assets).map(asset=>({asset,score:score(query,assetText(asset))})).filter(x=>x.score).sort((a,b)=>b.score-a.score).slice(0,4)}
  function symptomOnlyQuery(query,asset){
    const assetWords=new Set(words(assetText(asset)));
    const ignored=new Set(["is","the","a","an","has","have","with","it","and","on","at","in","does"]);
    return words(query).filter(word=>!assetWords.has(word)&&!ignored.has(word)).join(" ");
  }
  function problemMatches(query,asset){
    const symptomQuery=symptomOnlyQuery(query,asset);
    if(!symptomQuery)return [];
    return asset.problems.map(problem=>({problem,score:score(symptomQuery,`${problem.id} ${problem.name} ${problem.description}`)})).filter(x=>x.score).sort((a,b)=>b.score-a.score);
  }
  function globalProblemMatches(query){return Object.values(assets).flatMap(asset=>problemMatches(query,asset).map(x=>({asset,...x}))).sort((a,b)=>b.score-a.score).slice(0,6)}
  function save(){try{localStorage.setItem(storageKey,JSON.stringify({messages:state.messages.slice(-40),assetId:state.asset?.id,problemId:state.problem?.id,stepId:state.stepId}))}catch(_){}}
  function restore(){try{const x=JSON.parse(localStorage.getItem(storageKey)||"null");if(!x)return;state.messages=Array.isArray(x.messages)?x.messages:[];state.asset=x.assetId?assets[x.assetId]:null;state.problem=state.asset?.problems.find(p=>p.id===x.problemId)||null;state.stepId=x.stepId||null}catch(_){}}

  function message(role,text,extra={}){state.messages.push({role,text,...extra});save();draw()}
  function problemActions(asset){return asset.problems.map(problem=>({label:problem.name,action:"problem",value:`${asset.id}|${problem.id}`}))}
  function chooseProblem(asset,problem){state.asset=asset;state.problem=problem;state.stepId=problem.startStep;save();presentStep()}
  function roomComfortRequest(query){
    const roomMatch=query.match(/\b(?:room|lab|laboratory)\s*#?\s*([0-9]{3}[a-z]?)\b/i);
    const comfortMatch=query.match(/\b(too\s+hot|hot|warm|too\s+cold|cold|freezing|temperature|temp|uncomfortable|too\s+humid|humid|humidity)\b/i);
    if(!roomMatch||!comfortMatch)return null;
    const room=roomMatch[1].toUpperCase(),condition=/humid/i.test(comfortMatch[1])?"humid":/cold|freezing/i.test(comfortMatch[1])?"cold":/hot|warm/i.test(comfortMatch[1])?"hot":"temperature concern";
    return {room,condition,terminal:facilityIqTerminalForRoom(room),ahus:facilityIqAhusForRoom(room),dedicatedEquipment:facilityIqDedicatedEquipmentForRoom(room)};
  }
  function handleRoomComfort(request){
    if(request.dedicatedEquipment.length){
      const dehumidifier=request.dedicatedEquipment.find(asset=>asset.id==="Bry-Air-DEHU");
      const chiller=request.dedicatedEquipment.find(asset=>asset.id==="503-Aircon-Tech-Chiller");
      const issue=request.condition==="humid"?"a humidity complaint":`a ${request.condition} condition`;
      return message("assistant",`Room ${request.room} has ${issue}. It is not assigned to AHU-02. This room is served by the dedicated Bry-Air dehumidifier and 503 Aircon Tech chiller cooling loop.\n\nCheck the Bry-Air operating status, humidity setpoint and measured humidity, process and reactivation airflow, rotor operation, and reactivation heat. Then verify the 503 chiller is enabled, leaving-water temperature is at its approved setpoint, and dedicated-loop flow and cooling-valve position are available.`,{
        eyebrow:"Dedicated Room 503 system",
        actions:[
          ...(dehumidifier?[{label:"Open Bry-Air dehumidifier",action:"asset-page",value:dehumidifier.id}]:[]),
          ...(request.condition==="humid"&&dehumidifier?[{label:"Start high-humidity checks",action:"problem",value:`${dehumidifier.id}|high-humidity`}]:[]),
          ...(chiller?[{label:"Open 503 chiller",action:"asset-page",value:chiller.id}]:[]),
          {label:"Open dedicated system",action:"system-page",value:"processCooling"}
        ]
      });
    }
    if(!request.ahus.length)return message("assistant",`I don’t have a serving AHU assignment for Room ${request.room} yet. Verify the room number, then browse the equipment list or ask your controls operator.`,{eyebrow:"Room lookup",actions:[{label:"Browse equipment",action:"browse"}]});
    const names=request.ahus.map(asset=>asset.id).join(" and ");
    const conditionText=request.condition==="temperature concern"?"has a temperature concern":`is too ${request.condition}`;
    const coldGuidance=`Room ${request.room} ${conditionText}. First, check Desigo for the current temperature, effective heating setpoint, occupancy mode, schedule, and overrides.\n\nNext, identify the dedicated terminal as CAV or VAV and compare airflow setpoint with measured airflow, damper command with position, and primary-air inlet pressure. Every VAV has a heating valve: when there is heating demand, compare its valve command with physical position, verify hot-water availability, and confirm that discharge air warms above inlet air. The exact terminal type and tag still need confirmation.\n\nRoom ${request.room} is served by ${names}. If the AHU sequence calls for heating, compare the active hot-water setpoint with actual supply temperature and verify HWP status and loop differential pressure. Check pressure from the dedicated Control Air Compressor and dryer, then confirm the AHU’s normally-open heating valve physically opens and normally-closed cooling valve fully closes.\n\nContinue with AHU supply-air temperature, heating-coil flow and temperature change, infiltration, and sensor accuracy.`;
    const hotGuidance=`Room ${request.room} ${conditionText}. First, check the room in Desigo: confirm the current temperature, occupied/unoccupied mode, effective heating and cooling setpoints, and whether a temporary setpoint override is active.\n\nNext, identify the room terminal as CAV or VAV. Compare airflow setpoint with measured airflow, damper command with position, and primary-air inlet pressure. Every VAV has a heating valve: confirm it is commanded closed, physically closed, and not producing an unexpected discharge-air temperature rise. The terminal type and tag still need to be confirmed.\n\nRoom ${request.room} is served by ${names}. If the terminal is receiving warm air, compare the active chilled-water setpoint with actual chilled-water supply temperature. Then verify pressure from the dedicated Control Air Compressor and Control Air Dryer at the AHU branch: the AHU heating valve is normally open and cooling valve is normally closed, so loss of control air can leave heating open while cooling stays closed. House Air Compressors 01–03 serve laboratory compressed air and are not part of this AHU control circuit.\n\nContinue with AHU supply-air temperature, fan/VFD status, valve command versus physical position, and coil water flow.`;
    message("assistant",request.condition==="cold"?coldGuidance:hotGuidance,{
      eyebrow:"Room comfort troubleshooting",
      detail:request.ahus.length>1?"This room appears on more than one AHU assignment. Confirm the active serving unit in Desigo or the current controls graphics before troubleshooting equipment.":"",
      actions:request.ahus.flatMap(asset=>[
        {label:`Open ${asset.id}`,action:"asset-page",value:asset.id},
        ...(request.condition==="hot"?[{label:`Start ${asset.id} high-temperature checks`,action:"problem",value:`${asset.id}|high-space-temperature`}]:[]),
        ...(request.condition==="cold"?[{label:`Start ${asset.id} too-cold checks`,action:"problem",value:`${asset.id}|low-space-temperature`}]:[])
      ])
    });
  }
  function presentStep(){
    const step=steps[state.stepId];
    if(!step)return message("assistant","I can’t find the next check. Open the equipment page to continue.",{actions:[{label:`Open ${state.asset.id}`,action:"asset-page",value:state.asset.id}]});
    if(step.type==="question")return message("assistant",step.text,{eyebrow:`${state.asset.id} · ${state.problem.name}`,safety:step.safety,actions:[{label:"Yes",action:"answer",value:"yes"},{label:"No",action:"answer",value:"no"},{label:"Not sure",action:"unsure"}]});
    message("assistant",step.title,{eyebrow:"Likely finding",detail:`Likely cause: ${step.cause}\n\nRecommended action: ${step.action}`,safety:step.safety,actions:[{label:`Open ${state.asset.id} guide`,action:"guide"},...(state.asset.manual?[{label:"Open manual",action:"manual"}]:[]),{label:"Start over",action:"reset"}]});
  }
  function submit(raw){
    const query=raw.trim();if(!query)return;message("user",query);
    const roomRequest=roomComfortRequest(query);if(roomRequest)return handleRoomComfort(roomRequest);
    const equipment=assetMatches(query), current=state.asset?problemMatches(query,state.asset):[], issues=globalProblemMatches(query);
    if(state.asset&&current[0]?.score>=4)return message("assistant",`That sounds closest to “${current[0].problem.name}” for ${state.asset.id}. I’ll begin with a safe first check.`,{actions:[{label:"Start checks",action:"problem",value:`${state.asset.id}|${current[0].problem.id}`}]});
    if(equipment.length){
      if(equipment[0].score>=8||equipment.length===1){
        state.asset=equipment[0].asset;state.problem=null;state.stepId=null;
        const inferredProblem=problemMatches(query,state.asset)[0];
        if(inferredProblem?.score>=4){
          message("assistant",`I identified ${state.asset.id}, ${state.asset.name}, and matched the issue to “${inferredProblem.problem.name}.” I’ll begin with the first safe check.`,{eyebrow:"Asset and symptom identified"});
          return chooseProblem(state.asset,inferredProblem.problem);
        }
        return message("assistant",`I found ${state.asset.id}, ${state.asset.name}, in ${state.asset.location}. What is it doing, and is there an alarm or fault code?`,{eyebrow:"Equipment identified",actions:problemActions(state.asset)})
      }
      return message("assistant","I found a few possible assets. Which one are you working on?",{actions:equipment.map(x=>({label:`${x.asset.id} · ${x.asset.name}`,action:"asset",value:x.asset.id}))});
    }
    if(issues.length)return message("assistant","That issue appears in several equipment guides. Select the asset that matches what you’re working on.",{actions:issues.map(x=>({label:`${x.asset.id} · ${x.problem.name}`,action:"problem",value:`${x.asset.id}|${x.problem.id}`}))});
    message("assistant","I couldn’t confidently match that yet. Include the equipment tag or name and the symptom—for example, “AHU-01 has low airflow” or “York chiller will not start.”",{actions:[{label:"Browse equipment",action:"browse"}]});
  }
  function act(action,value){
    if(action==="answer"){const step=steps[state.stepId];if(!step||step.type!=="question")return;message("user",value==="yes"?"Yes":"No");state.stepId=step[value];save();return presentStep()}
    if(action==="unsure"){const step=steps[state.stepId];return message("assistant",`Verify this condition before continuing: ${step.text} I won’t assume an answer because it could send the diagnosis down the wrong path.`,{safety:step.safety,actions:[{label:"Yes",action:"answer",value:"yes"},{label:"No",action:"answer",value:"no"}]})}
    if(action==="reset")return reset();
    if(action==="browse"){toggle(false);setRoute({view:"assets"});return document.getElementById("search")?.focus()}
    if(action==="asset"){const asset=assets[value];if(!asset)return;state.asset=asset;state.problem=null;message("user",`${asset.id} · ${asset.name}`);return message("assistant",`What problem are you seeing on ${asset.id}?`,{actions:problemActions(asset)})}
    if(action==="problem"){const [assetId,problemId]=value.split("|"),asset=assets[assetId],problem=asset?.problems.find(p=>p.id===problemId);if(!problem)return;message("user",problem.name);return chooseProblem(asset,problem)}
    if(action==="asset-page"){toggle(false);return setRoute({asset:value})}
    if(action==="system-page"){toggle(false);return setRoute({system:value})}
    if(action==="guide"){toggle(false);clearSession(state.asset.id,state.problem.id);return setRoute({asset:state.asset.id,problem:state.problem.id,step:state.problem.startStep})}
    if(action==="manual"&&state.asset?.manual)window.open(state.asset.manual,"_blank","noopener");
  }
  function markup(item){
    const body=[item.text,item.detail].filter(Boolean).map(block=>block.split("\n\n").map(line=>`<p>${safe(line)}</p>`).join("")).join("");
    const actions=item.actions?.length?`<div class="chat-actions">${item.actions.map(x=>`<button type="button" data-chat-action="${safe(x.action)}" data-chat-value="${safe(x.value||"")}">${safe(x.label)}</button>`).join("")}</div>`:"";
    const examples=item.examples?.length?`<div class="chat-examples">${item.examples.map(x=>`<button type="button" data-chat-example="${safe(x)}">${safe(x)}</button>`).join("")}</div>`:"";
    return `<article class="chat-message ${item.role}">${item.eyebrow?`<span>${safe(item.eyebrow)}</span>`:""}<div class="chat-bubble">${body}${item.safety?`<div class="chat-safety"><strong>Safety:</strong> ${safe(item.safety)}</div>`:""}</div>${actions}${examples}</article>`;
  }
  function draw(){const log=document.getElementById("chat-log");if(!log)return;log.innerHTML=state.messages.map(markup).join("");log.scrollTop=log.scrollHeight}
  function reset(){state.messages=[];state.asset=null;state.problem=null;state.stepId=null;try{localStorage.removeItem(storageKey)}catch(_){}message("assistant","Tell me which equipment you’re working on and what it is doing. You can use an asset tag, room, model, alarm, or symptom.",{eyebrow:"FacilityIQ assistant",examples:["AHU-01 has low airflow","York chiller will not start","UPS is on bypass"]})}
  function toggle(force){state.open=typeof force==="boolean"?force:!state.open;const panel=document.getElementById("chat-panel"),launcher=document.getElementById("chat-launcher");panel.hidden=!state.open;launcher.setAttribute("aria-expanded",String(state.open));launcher.querySelector(".chat-launcher-label").textContent=state.open?"Close":"Ask FacilityIQ";if(state.open){draw();setTimeout(()=>document.getElementById("chat-input")?.focus(),0)}}
  function mount(){
    document.body.insertAdjacentHTML("beforeend",`<button id="chat-launcher" class="chat-launcher" type="button" aria-controls="chat-panel" aria-expanded="false"><span class="chat-launcher-icon" aria-hidden="true">?</span><span class="chat-launcher-label">Ask FacilityIQ</span></button><section id="chat-panel" class="chat-panel" aria-label="FacilityIQ troubleshooting assistant" hidden><header class="chat-header"><div><span>ONLINE · ON-DEVICE</span><h2>Troubleshooting Assistant</h2></div><div class="chat-header-actions"><button id="chat-reset" type="button">New</button><button id="chat-close" type="button" aria-label="Close assistant">×</button></div></header><div id="chat-log" class="chat-log" role="log" aria-live="polite"></div><form id="chat-form" class="chat-form"><label for="chat-input">Describe the equipment issue</label><div><textarea id="chat-input" rows="2" placeholder="Example: AHU-01 has low airflow"></textarea><button type="submit">Send</button></div><small>Guidance for trained personnel. Follow site procedures, LOTO, and manufacturer instructions.</small></form></section>`);
    document.getElementById("chat-launcher").onclick=()=>toggle();document.getElementById("chat-close").onclick=()=>toggle(false);document.getElementById("chat-reset").onclick=reset;
    document.getElementById("chat-form").onsubmit=event=>{event.preventDefault();const input=document.getElementById("chat-input"),query=input.value;input.value="";submit(query)};
    document.getElementById("chat-input").onkeydown=event=>{if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();event.currentTarget.form.requestSubmit()}};
    document.getElementById("chat-log").onclick=event=>{const button=event.target.closest("[data-chat-action]"),example=event.target.closest("[data-chat-example]");if(button)act(button.dataset.chatAction,button.dataset.chatValue);if(example){document.getElementById("chat-input").value=example.dataset.chatExample;document.getElementById("chat-form").requestSubmit()}};
  }
  restore();mount();if(!state.messages.length)reset();
  return {toggle,reset};
})();
