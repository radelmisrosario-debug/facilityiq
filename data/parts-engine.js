function facilityIqNormalizePartAssetId(value){
  const normalized=String(value||"").trim();
  const aliases={
    "503-Aircon Tech Chiller":"503-Aircon-Tech-Chiller",
    "House-AC-Air Dryer-01":"House-AC-Air-Dryer-01"
  };
  return aliases[normalized]||normalized;
}

function facilityIqPartsForAsset(assetId){
  const asset=assets[assetId];
  const listed=facilityIqPartsCatalog.filter(part=>part.assets.some(value=>facilityIqNormalizePartAssetId(value)===assetId)).map(part=>({...part,source:"facility"}));
  const manual=asset&&typeof facilityIqManualPartsForAsset==="function"?facilityIqManualPartsForAsset(asset):[];
  const listedText=listed.map(part=>`${part.type} ${part.name} ${part.description}`.toLowerCase()).join(" ");
  const additional=manual.filter(part=>!listedText.includes(part.name.toLowerCase()));
  return [...listed,...additional];
}

function facilityIqPartMatchesComponent(part,component){
  const text=`${part.type} ${part.name} ${part.description}`.toLowerCase();
  const aliases={
    belt:["belt"],motor:["motor"],filter:["filter","element"],fuse:["fuse"],contactor:["contactor"],
    bearing:["bearing"],relay:["relay"],battery:["battery"],sensor:["sensor","transducer","probe"],
    "temperature sensor":["sensor","thermistor","probe"],"pressure sensor":["sensor","transducer"],
    "flame sensor":["flame sensor"],igniter:["igniter","electrode"],oil:["oil"]
  };
  return (aliases[component]||[component]).some(term=>text.includes(term));
}

function facilityIqInventoryPartsForResult(asset,result){
  const detected=facilityIqReplacementPart(asset,result);
  if(!detected)return [];
  return facilityIqPartsForAsset(asset.id).filter(part=>facilityIqPartMatchesComponent(part,detected.component));
}

function facilityIqPartSearchUrl(part){
  const query=(part.source==="manual"?[part.searchContext,part.name,"replacement part"]:[part.name,part.type,part.partNumbers,part.description]).filter(Boolean).join(" ");
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function facilityIqPartCardMarkup(part){
  const price=part.unitCost?`Price: $${Number(part.unitCost).toFixed(2)}`:"Price not recorded";
  const source=part.source==="manual"?"MANUAL-LISTED PART":"FACILITY PART";
  return `<article class="inventory-part ${part.source==="manual"?"manual-listed-part":""}"><div><span class="asset-id">${source}</span><h4>${esc(part.name||part.type||"Unnamed part")}</h4><p>${esc(part.description||"No description recorded.")}</p><strong>${esc(price)}</strong></div><div class="inventory-part-actions"><a class="manual-button" href="${esc(facilityIqPartSearchUrl(part))}" target="_blank" rel="noopener">Search part on Google</a>${part.source==="manual"&&part.manual?`<a class="secondary-button parts-link" href="${esc(part.manual)}" target="_blank" rel="noopener">View source manual</a>`:""}</div></article>`;
}

function facilityIqAssetPartsMarkup(asset){
  const parts=facilityIqPartsForAsset(asset.id);
  if(!parts.length)return "";
  return `<section id="asset-parts-panel" class="asset-parts" hidden><div class="asset-parts-heading"><h3>Associated replacement parts</h3><span>${parts.length} part record${parts.length===1?"":"s"}</span></div><p class="small-note">Facility parts come from your supplied list. Manual-listed parts come from manufacturer parts diagrams and require exact model, configuration, and serial verification. Prices are shown only when supplied.</p><div class="inventory-parts">${parts.map(facilityIqPartCardMarkup).join("")}</div></section>`;
}

function facilityIqAssetPartsButtonMarkup(asset){
  const count=facilityIqPartsForAsset(asset.id).length;
  return count?`<button type="button" id="asset-parts-button" class="parts-button" aria-expanded="false" aria-controls="asset-parts-panel">View Parts (${count})</button>`:"";
}
