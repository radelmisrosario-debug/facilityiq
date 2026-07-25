/*
  Builds weighted evidence coverage from existing guided diagnostic trees.
  Hand-authored knowledge-base models always take precedence.
*/
(function buildCompleteEvidenceCoverage(){
  const generatedSymptoms=[];

  function addObservation(profile,key,label){
    facilityIqObservations[profile] ||= [];
    if(!facilityIqObservations[profile].some(([existing])=>existing===key)){
      facilityIqObservations[profile].push([key,label]);
    }
  }

  function modelFromGuide(profile,problem){
    const results=[];
    const visited=new Set();

    function walk(stepId,path){
      const visitKey=`${stepId}|${path.map(item=>`${item.key}:${item.value}`).join(",")}`;
      if(visited.has(visitKey))return;
      visited.add(visitKey);
      const step=steps[stepId];
      if(!step)return;

      if(step.type==="question"){
        const key=`guided:${stepId}`;
        addObservation(profile,key,step.text);
        walk(step.yes,[...path,{key,value:true}]);
        walk(step.no,[...path,{key,value:false}]);
        return;
      }

      results.push({
        id:`guided-${String(stepId).toLowerCase()}`,
        title:step.title,
        base:10,
        evidence:path.map((item,index)=>({
          kind:"observation",
          key:item.key,
          value:item.value,
          weight:18+index*6
        })),
        action:step.action,
        reference:`Guided path: ${problem.name}. ${step.cause}`
      });
    }

    walk(problem.startStep,[]);
    return results;
  }

  for(const asset of Object.values(assets)){
    const profile=profileForAsset(asset);
    if(!profile)continue;
    facilityIqKnowledgeBase[profile] ||= {};
    facilityIqObservations[profile] ||= [];

    for(const problem of asset.problems){
      if(facilityIqKnowledgeBase[profile][problem.id]?.length)continue;
      const generated=modelFromGuide(profile,problem);
      if(!generated.length)continue;
      facilityIqKnowledgeBase[profile][problem.id]=generated;
      generatedSymptoms.push(`${profile}:${problem.id}`);
    }
  }

  globalThis.facilityIqCoverageSummary={
    generatedSymptoms,
    coveredAssets:Object.values(assets).filter(asset=>profileForAsset(asset)).length
  };
})();
