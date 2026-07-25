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

const facilityIqRoomTerminals = Object.fromEntries(
  [...new Set(Object.values(facilityIqRoomAssignments).flat())]
    .map(room => [room,{room,type:"CAV/VAV",tag:null,status:"Type and tag to be confirmed"}])
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
  return [...new Set([...ahuRooms,...dedicatedRooms])];
}
