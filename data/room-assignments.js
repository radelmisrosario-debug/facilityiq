const facilityIqRoomAssignments = {
  "AHU-01":["306","304","301","201","203","204","205","206","207","207A","208","209","210","211","212","213","214","215","216"],
  "AHU-02":["264","263","262","261","402","403","404","405","400","505","500","502","600","602","603","604","406","407"],
  "AHU-04":["408","413","414","415","420","421","422","423","424","425","426","470","471","472","473","474","475","476"],
  "AHU-05":["450","460","440","430","451","452","461","462","441","442","443","431","432"],
  "AHU-06":["205","204","202","203","180","194","152","173","174","175","170","171","153","178","177","131","142","143","144","145","146","147"]
};

const facilityIqDedicatedRoomEquipment = {
  "503":["Bry-Air-DEHU","503-Aircon-Tech-Chiller"]
};

const facilityIqExhaustSystems = {
  "LAB-EXH-400-505":{id:"LAB-EXH-400-505",name:"Labs 400 / 505 Fume-Hood Exhaust",fans:["EF-10","EF-11"],rooms:["400","505"],loads:["All fume hoods in Lab 400","All fume hoods in Lab 505"]},
  "LAB-EXH-430-440":{id:"LAB-EXH-430-440",name:"Labs 430 / 440 Fume-Hood Exhaust",fans:["EF-21","EF-22"],rooms:["430","440"],loads:["All fume hoods in Lab 430","All fume hoods in Lab 440"]},
  "LAB-EXH-414-415-420":{id:"LAB-EXH-414-415-420",name:"Labs 414 / 415 / 420 Exhaust",fans:["EF-25","EF-26"],rooms:["414","415","420"],loads:["Sink exhaust in Lab 414","All fume hoods in Lab 415","All fume hoods in Lab 420"]},
  "LAB-EXH-450-460":{id:"LAB-EXH-450-460",name:"Labs 450 / 460 Fume-Hood Exhaust",fans:["EF-27","EF-28"],rooms:["450","460"],loads:["All fume hoods in Lab 450","All fume hoods in Lab 460"]},
  "BIO-EXHAUST":{id:"BIO-EXHAUST",name:"Bio-Side Laboratory Exhaust",fans:["EF-30","EF-31"],rooms:[],area:"Bio-side",loads:["All Bio-side laboratory fume hoods and laboratory exhaust points"]}
};

const facilityIqRoomTerminals = Object.fromEntries(
  [...new Set(Object.values(facilityIqRoomAssignments).flat())]
    .map(room => [room,{
      room,
      type:"CAV/VAV",
      tag:null,
      heatingValve:"Present on every VAV terminal",
      status:"Terminal type and tag to be confirmed; every confirmed VAV has a heating valve"
    }])
);

function facilityIqAhusForRoom(room) {
  const normalized = String(room || "").trim().toUpperCase();
  return Object.entries(facilityIqRoomAssignments)
    .filter(([,rooms]) => rooms.includes(normalized))
    .map(([assetId]) => assets[assetId])
    .filter(Boolean);
}

function facilityIqDedicatedEquipmentForRoom(room) {
  const normalized = String(room || "").trim().toUpperCase();
  return (facilityIqDedicatedRoomEquipment[normalized] || [])
    .map(assetId => assets[assetId])
    .filter(Boolean);
}

function facilityIqTerminalForRoom(room) {
  return facilityIqRoomTerminals[String(room || "").trim().toUpperCase()] || null;
}

function facilityIqRoomsForAsset(assetId) {
  const ahuRooms = facilityIqRoomAssignments[assetId] || [];
  const dedicatedRooms = Object.entries(facilityIqDedicatedRoomEquipment)
    .filter(([,assetIds]) => assetIds.includes(assetId))
    .map(([room]) => room);
  const exhaustRooms = Object.values(facilityIqExhaustSystems)
    .filter(system => system.fans.includes(assetId))
    .flatMap(system => system.rooms);
  return [...new Set([...ahuRooms,...dedicatedRooms,...exhaustRooms])];
}

function facilityIqExhaustSystemsForAsset(assetId) {
  return Object.values(facilityIqExhaustSystems).filter(system => system.fans.includes(assetId));
}

function facilityIqExhaustSystemsForRoom(room) {
  const normalized = String(room || "").trim().toUpperCase();
  return Object.values(facilityIqExhaustSystems).filter(system => system.rooms.includes(normalized));
}
