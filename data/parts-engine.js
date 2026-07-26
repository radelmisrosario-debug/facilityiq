function facilityIqNormalizePartAssetId(value){
  const normalized=String(value||"").trim();
  const aliases={
    "503-Aircon Tech Chiller":"503-Aircon-Tech-Chiller",
    "House-AC-Air Dryer-01":"House-AC-Air-Dryer-01"
  };
  return aliases[normalized]||normalized;
}

function facilityIqPartsForAsset(assetId){
  return facilityIqPartsCatalog.filter(part=>part.assets.some(value=>facilityIqNormalizePartAssetId(value)===assetId));
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
  const query=[part.name,part.type,part.partNumbers,part.description].filter(Boolean).join(" ");
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function facilityIqPartCardMarkup(part){
  const price=part.unitCost?`Price: $${Number(part.unitCost).toFixed(2)}`:"Price not recorded";
  return `<article class="inventory-part"><div><span class="asset-id">FACILITY PART</span><h4>${esc(part.name||part.type||"Unnamed part")}</h4><p>${esc(part.description||"No description recorded.")}</p><strong>${esc(price)}</strong></div><div class="inventory-part-actions"><a class="manual-button" href="${esc(facilityIqPartSearchUrl(part))}" target="_blank" rel="noopener">Search part on Google</a></div></article>`;
}

function facilityIqAssetPartsMarkup(asset){
  const parts=facilityIqPartsForAsset(asset.id);
  if(!parts.length)return "";
  return `<details class="asset-parts"><summary>Associated replacement parts (${parts.length})</summary><p class="small-note">Parts associated with this asset. Confirm the installed component and specifications before use.</p><div class="inventory-parts">${parts.map(facilityIqPartCardMarkup).join("")}</div></details>`;
}
