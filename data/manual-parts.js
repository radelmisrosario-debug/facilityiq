const facilityIqManualPartTemplates={
  "Greenheck-G-GB-Roof-Exhaust.pdf":{page:"Parts List, manual page 10",parts:["Motor","Wheel","Belt","Motor pulley","Shaft pulley","Bearings","Vibration isolators","Birdguard"]},
  "Greenheck-USF-Fan.pdf":{page:"Parts List, manual pages 17–18",parts:["Motor","Wheel","Inlet cone","Disconnect switch","Motor cover","Bearings","V-belt drive components"]},
  "Greenheck-Tube-Axial-Fans-IOM.pdf":{page:"Parts List, manual page 4",parts:["Motor","Propeller","Belt set","Motor pulley","Shaft pulley","Shaft bearings","Butterfly dampers","Damper hinge rod","Bearing cover"]},
  "Breidert-DB-Blower.pdf":{page:"Parts List, manual page 7",parts:["Motor","Rubber isolators","Pivoting motor base","Bearings","Blower assembly","Driven sheave","Shaft","Belt set","Driver sheave","Outlet flange","Wheel"]},
  "Labconco-7180600-Blower.pdf":{page:"Blower Replacement Parts appendix, manual pages 49–59",parts:["Motor","Blower wheel","Drive belt","Bearings","Driver sheave","Driven sheave","Vibration isolators"]}
};

function facilityIqManualPartsForAsset(asset){
  if(!asset.manual||/^https?:/i.test(asset.manual))return [];
  const filename=asset.manual.split("/").pop(),template=facilityIqManualPartTemplates[filename];
  if(!template)return [];
  return template.parts.map(name=>({
    assets:[asset.id],name,
    description:`Listed for the ${asset.manufacturer} ${asset.model} equipment family in ${filename}, ${template.page}. Confirm the exact configuration and serial-number bill of material before ordering.`,
    type:name,partNumbers:"",unitCost:"",source:"manual",manual:asset.manual,
    searchContext:`${asset.manufacturer} ${asset.model} ${asset.serialNumber||""}`
  }));
}
