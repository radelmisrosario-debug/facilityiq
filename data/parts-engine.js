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

function facilityIqPartInventoryText(part){
  const available=part.available!==""?Number(part.available):null;
  const ordered=part.ordered!==""?Number(part.ordered):null;
  const minimum=part.minimum!==""?Number(part.minimum):null;
  const items=[];
  if(Number.isFinite(available))items.push(`${available} available`);
  if(Number.isFinite(ordered)&&ordered)items.push(`${ordered} ordered`);
  if(Number.isFinite(minimum))items.push(`minimum ${minimum}`);
  return items.join(" · ")||"Inventory quantity not recorded";
}

function facilityIqPartCardMarkup(part){
  const direct=/^https?:\/\//i.test(part.barcode||"")?`<a href="${esc(part.barcode)}" target="_blank" rel="noopener">Supplier link</a>`:"";
  const details=[part.type,part.partNumbers,part.location,part.unitCost?`$${Number(part.unitCost).toFixed(2)}`:""].filter(Boolean).map(esc).join(" · ");
  return `<article class="inventory-part"><div><span class="asset-id">PART ${esc(part.id)}</span><h4>${esc(part.name||part.type||"Unnamed part")}</h4><p>${esc(part.description||"No description recorded.")}</p><small>${details}</small><strong>${esc(facilityIqPartInventoryText(part))}</strong></div><div class="inventory-part-actions"><a class="manual-button" href="${esc(part.url)}" target="_blank" rel="noopener">Open in MaintainX</a>${direct}</div></article>`;
}

function facilityIqAssetPartsMarkup(asset){
  const parts=facilityIqPartsForAsset(asset.id);
  if(!parts.length)return "";
  return `<details class="asset-parts"><summary>Associated replacement parts (${parts.length})</summary><p class="small-note">Inventory associations imported from the facility parts list. Confirm the installed component and specifications before use.</p><div class="inventory-parts">${parts.map(facilityIqPartCardMarkup).join("")}</div></details>`;
}
