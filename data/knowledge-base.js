
/*
  FacilityIQ V04 weighted troubleshooting knowledge base.
  Scores are relative evidence weights, not statistical probabilities.
*/
const facilityIqKnowledgeBase = {
  chiller: {
    "high-pressure": [
      {
        id:"dirty-condenser",
        title:"Dirty or restricted condenser coil",
        base:18,
        evidence:[
          {kind:"observation",key:"coilDirty",weight:48},
          {kind:"observation",key:"airRecirculation",weight:28},
          {kind:"measurement",key:"headPressure",op:">=",value:300,weight:22},
          {kind:"measurement",key:"ambient",op:">=",value:90,weight:10},
          {kind:"observation",key:"fansRunning",value:true,weight:7}
        ],
        action:"Inspect and clean the condenser coil, remove debris, and eliminate hot-air recirculation. Verify airflow after cleaning.",
        reference:"Use the chiller manual’s condenser-airflow and maintenance sections."
      },
      {
        id:"fan-problem",
        title:"Condenser fan failure or incorrect rotation",
        base:16,
        evidence:[
          {kind:"observation",key:"fansNotRunning",weight:55},
          {kind:"observation",key:"fanWrongRotation",weight:48},
          {kind:"observation",key:"fanNoise",weight:20},
          {kind:"measurement",key:"headPressure",op:">=",value:300,weight:18}
        ],
        action:"Verify fan command, voltage, current, rotation, blade condition, contactor/VFD operation, and motor overload status.",
        reference:"Use the fan wiring and condenser-fan troubleshooting sections."
      },
      {
        id:"overcharge-noncondensables",
        title:"Refrigerant overcharge or non-condensables",
        base:8,
        evidence:[
          {kind:"measurement",key:"headPressure",op:">=",value:330,weight:30},
          {kind:"observation",key:"coilClean",weight:16},
          {kind:"observation",key:"fansRunning",weight:14},
          {kind:"observation",key:"highSubcooling",weight:32}
        ],
        action:"Have qualified refrigeration personnel verify charge, subcooling, condenser approach, and the presence of non-condensables.",
        reference:"Refrigerant diagnosis must follow the manufacturer’s R407C procedures."
      },
      {
        id:"sensor-control",
        title:"Pressure sensor or control fault",
        base:6,
        evidence:[
          {kind:"observation",key:"gaugeMismatch",weight:55},
          {kind:"observation",key:"intermittentAlarm",weight:16},
          {kind:"measurement",key:"headPressure",op:"<",value:250,weight:18}
        ],
        action:"Compare the controller pressure value with a calibrated gauge and inspect transducer wiring and scaling.",
        reference:"Use the controller I/O and pressure-transducer information."
      }
    ],
    "low-flow": [
      {
        id:"strainer-restriction",
        title:"Dirty strainer or closed/restricted valve",
        base:20,
        evidence:[
          {kind:"observation",key:"strainerDirty",weight:52},
          {kind:"observation",key:"valveNotOpen",weight:45},
          {kind:"measurement",key:"flow",op:"<",value:6.5,weight:25},
          {kind:"observation",key:"pumpRunning",weight:8}
        ],
        action:"Verify valve lineup, isolate safely, inspect/clean the strainer, restore flow, and confirm the flow switch.",
        reference:"MAC-060HE-03 approximate water-flow range: 6.5–14.4 GPM."
      },
      {
        id:"air-binding",
        title:"Air binding or inadequate system venting",
        base:14,
        evidence:[
          {kind:"observation",key:"gurgling",weight:45},
          {kind:"observation",key:"recentDrainFill",weight:32},
          {kind:"measurement",key:"flow",op:"<",value:6.5,weight:20},
          {kind:"observation",key:"pumpRunning",weight:8}
        ],
        action:"Vent high points and the pump, verify system fill pressure, and confirm the pump remains primed.",
        reference:"Follow approved hydronic filling and venting procedures."
      },
      {
        id:"pump-rotation-coupling",
        title:"Pump rotation, coupling, or impeller problem",
        base:10,
        evidence:[
          {kind:"observation",key:"wrongRotation",weight:50},
          {kind:"observation",key:"couplingFailed",weight:50},
          {kind:"measurement",key:"flow",op:"<",value:6.5,weight:20},
          {kind:"measurement",key:"motorAmps",op:"lowRelativeTo",other:"motorFla",value:0.4,weight:18}
        ],
        action:"Lock out the pump and verify rotation, coupling integrity, impeller condition, and shaft operation.",
        reference:"Use the pump and motor manufacturer procedures."
      }
    ],
    "not-cooling": [
      {
        id:"low-flow-capacity",
        title:"Insufficient chilled-water flow",
        base:18,
        evidence:[
          {kind:"measurement",key:"flow",op:"<",value:6.5,weight:38},
          {kind:"observation",key:"flowAlarm",weight:45},
          {kind:"observation",key:"strainerDirty",weight:28}
        ],
        action:"Restore approved water flow before evaluating refrigerant capacity.",
        reference:"Check flow switch, pump, strainer, valves, and venting."
      },
      {
        id:"high-load-airflow",
        title:"High ambient load or restricted condenser airflow",
        base:14,
        evidence:[
          {kind:"measurement",key:"ambient",op:">=",value:95,weight:20},
          {kind:"observation",key:"coilDirty",weight:38},
          {kind:"observation",key:"airRecirculation",weight:26},
          {kind:"measurement",key:"headPressure",op:">=",value:300,weight:18}
        ],
        action:"Correct condenser airflow and compare the actual load with chiller capacity.",
        reference:"Review installation clearances and operating envelope."
      },
      {
        id:"refrigerant-capacity",
        title:"Refrigerant circuit capacity problem",
        base:9,
        evidence:[
          {kind:"measurement",key:"enteringWater",op:"present",weight:4},
          {kind:"measurement",key:"leavingWater",op:"present",weight:4},
          {kind:"measurement",key:"suctionPressure",op:"present",weight:8},
          {kind:"observation",key:"lowSuction",weight:28},
          {kind:"observation",key:"superheatAbnormal",weight:28}
        ],
        action:"Have qualified refrigeration personnel evaluate superheat, subcooling, charge, expansion device, and compressor performance.",
        reference:"Pressure readings alone are not sufficient for diagnosis."
      }
    ]
  },

  hydronic: {
    "low-dp": [
      {
        id:"air-bound",
        title:"Pump or system is air bound",
        base:18,
        evidence:[
          {kind:"observation",key:"gurgling",weight:45},
          {kind:"observation",key:"recentDrainFill",weight:30},
          {kind:"measurement",key:"dischargePressure",op:"near",other:"suctionPressure",value:3,weight:28},
          {kind:"measurement",key:"motorAmps",op:"lowRelativeTo",other:"motorFla",value:0.5,weight:16}
        ],
        action:"Vent the pump and high points, confirm system fill pressure, and verify automatic air vents.",
        reference:"Follow site hydronic filling and venting procedures."
      },
      {
        id:"wrong-rotation",
        title:"Incorrect pump rotation",
        base:12,
        evidence:[
          {kind:"observation",key:"wrongRotation",weight:62},
          {kind:"measurement",key:"dischargePressure",op:"near",other:"suctionPressure",value:3,weight:24},
          {kind:"measurement",key:"speed",op:">=",value:50,weight:8}
        ],
        action:"Lock out and verify motor rotation against the pump arrow; correct phase rotation through qualified electrical work.",
        reference:"Do not reverse phases while energized."
      },
      {
        id:"valve-strainer",
        title:"Closed valve or restricted strainer",
        base:15,
        evidence:[
          {kind:"observation",key:"valveNotOpen",weight:52},
          {kind:"observation",key:"strainerDirty",weight:48},
          {kind:"measurement",key:"dischargePressure",op:"near",other:"suctionPressure",value:4,weight:18}
        ],
        action:"Verify valve position and inspect the strainer using approved isolation and depressurization.",
        reference:"Confirm the full system valve lineup."
      },
      {
        id:"coupling-impeller",
        title:"Failed coupling or damaged impeller",
        base:8,
        evidence:[
          {kind:"observation",key:"couplingFailed",weight:58},
          {kind:"observation",key:"mechanicalNoise",weight:24},
          {kind:"measurement",key:"motorAmps",op:"lowRelativeTo",other:"motorFla",value:0.45,weight:20},
          {kind:"measurement",key:"dischargePressure",op:"near",other:"suctionPressure",value:3,weight:18}
        ],
        action:"Lock out, inspect coupling and shaft, and inspect the impeller if external checks do not restore head.",
        reference:"Use pump disassembly instructions."
      }
    ],
    "cavitation": [
      {
        id:"low-suction-pressure",
        title:"Low suction pressure or inadequate system pressure",
        base:22,
        evidence:[
          {kind:"measurement",key:"suctionPressure",op:"<",value:5,weight:38},
          {kind:"observation",key:"gravelNoise",weight:40},
          {kind:"observation",key:"vibration",weight:20}
        ],
        action:"Verify expansion-tank charge, fill pressure, suction valve position, and available static head.",
        reference:"Compare suction conditions with pump NPSH requirements."
      },
      {
        id:"suction-restriction",
        title:"Suction restriction",
        base:18,
        evidence:[
          {kind:"observation",key:"strainerDirty",weight:48},
          {kind:"observation",key:"suctionValveRestricted",weight:48},
          {kind:"observation",key:"gravelNoise",weight:25}
        ],
        action:"Inspect the suction valve, strainer, piping restrictions, and temporary strainers.",
        reference:"Depressurize before opening hydronic components."
      },
      {
        id:"air-entrainment",
        title:"Air entrainment",
        base:15,
        evidence:[
          {kind:"observation",key:"gurgling",weight:40},
          {kind:"observation",key:"recentDrainFill",weight:25},
          {kind:"observation",key:"visibleAir",weight:45}
        ],
        action:"Locate the air-entry source, vent the system, and verify fill and expansion controls.",
        reference:"Persistent air indicates an unresolved system condition."
      }
    ]
  },

  ahu: {
    "not-cooling": [
      {
        id:"no-chilled-water",
        title:"Insufficient chilled-water flow through the coil",
        base:20,
        evidence:[
          {kind:"observation",key:"valveCommandOpen",weight:10},
          {kind:"observation",key:"valveNotOpen",weight:48},
          {kind:"observation",key:"coilAirBound",weight:38},
          {kind:"measurement",key:"returnAir",op:"present",weight:4},
          {kind:"measurement",key:"supplyAir",op:"present",weight:4}
        ],
        action:"Verify valve command and position, coil isolation valves, strainer, pump operation, and coil venting.",
        reference:"Compare CHW supply/return temperatures and coil differential pressure."
      },
      {
        id:"dirty-coil-filter",
        title:"Dirty filter or coil airflow restriction",
        base:16,
        evidence:[
          {kind:"observation",key:"filterDirty",weight:45},
          {kind:"observation",key:"coilDirty",weight:38},
          {kind:"observation",key:"lowAirflow",weight:30},
          {kind:"measurement",key:"speed",op:">=",value:50,weight:8}
        ],
        action:"Inspect filters and coil face, clean as approved, and verify fan airflow and static pressure.",
        reference:"Maintain coil and filter pressure-drop limits."
      },
      {
        id:"sensor-mixing",
        title:"Sensor error or excessive warm-air mixing",
        base:9,
        evidence:[
          {kind:"observation",key:"sensorMismatch",weight:52},
          {kind:"observation",key:"outsideDamperOpen",weight:22},
          {kind:"measurement",key:"mixedAir",op:">",other:"returnAir",weight:18}
        ],
        action:"Compare BAS sensors with calibrated instruments and inspect outside/return-air damper operation.",
        reference:"Verify mixed-air low-limit and economizer sequences."
      }
    ]
  },

  airCompressor: {
    "low-pressure": [
      {
        id:"system-leak",
        title:"Large compressed-air leak or open demand",
        base:22,
        evidence:[
          {kind:"observation",key:"audibleLeak",weight:52},
          {kind:"observation",key:"openDrain",weight:42},
          {kind:"measurement",key:"runMinutes",op:">=",value:10,weight:16}
        ],
        action:"Isolate major users, inspect drains and piping, repair leaks, and retest pressure recovery.",
        reference:"Use approved leak-detection practices."
      },
      {
        id:"intake-filter-valve",
        title:"Restricted intake or inlet/unloader valve problem",
        base:16,
        evidence:[
          {kind:"observation",key:"intakeDirty",weight:46},
          {kind:"observation",key:"unloaderStuck",weight:46},
          {kind:"measurement",key:"motorAmps",op:"lowRelativeTo",other:"motorFla",value:0.55,weight:18}
        ],
        action:"Inspect the intake filter, inlet valve, unloader mechanism, and control tubing.",
        reference:"Lock out and relieve pressure before service."
      },
      {
        id:"internal-wear",
        title:"Compressor internal wear or valve leakage",
        base:8,
        evidence:[
          {kind:"observation",key:"mechanicalNoise",weight:25},
          {kind:"observation",key:"highOilUse",weight:20},
          {kind:"measurement",key:"runMinutes",op:">=",value:15,weight:20},
          {kind:"observation",key:"externalLeaksAbsent",weight:14}
        ],
        action:"Perform manufacturer capacity checks and inspect valves, rings, or compression elements as applicable.",
        reference:"Use the exact compressor model service procedure."
      }
    ]
  },

  dehumidifier: {
    "high-humidity": [
      {
        id:"reactivation-heat",
        title:"Inadequate reactivation heat",
        base:20,
        evidence:[
          {kind:"observation",key:"heaterNotOn",weight:55},
          {kind:"observation",key:"heaterLimitOpen",weight:40},
          {kind:"measurement",key:"reactivationOutTemp",op:"<=",other:"reactivationInTemp",weight:34}
        ],
        action:"Verify reactivation airflow first, then heater stages, contactors, limits, voltage, and current.",
        reference:"Never bypass heater airflow or temperature safeties."
      },
      {
        id:"rotor-drive",
        title:"Desiccant rotor not rotating correctly",
        base:18,
        evidence:[
          {kind:"observation",key:"rotorStopped",weight:62},
          {kind:"observation",key:"beltSlipping",weight:48},
          {kind:"observation",key:"rotorNoise",weight:18}
        ],
        action:"Inspect rotor drive motor, belt/chain, sprockets, seals, and rotor clearance.",
        reference:"Lock out before accessing the rotor drive."
      },
      {
        id:"airflow-bypass",
        title:"Airflow restriction or bypass leakage",
        base:16,
        evidence:[
          {kind:"observation",key:"filterDirty",weight:42},
          {kind:"observation",key:"damperClosed",weight:40},
          {kind:"observation",key:"sealLeak",weight:36},
          {kind:"measurement",key:"leavingRh",op:">=",value:50,weight:12}
        ],
        action:"Verify process and reactivation airflow, filter condition, dampers, duct leakage, and rotor seals.",
        reference:"RH should be interpreted with temperature or dew point."
      },
      {
        id:"excess-load",
        title:"Moisture load exceeds available capacity",
        base:9,
        evidence:[
          {kind:"observation",key:"doorsOpen",weight:30},
          {kind:"observation",key:"newMoistureSource",weight:40},
          {kind:"observation",key:"unitOperatingNormally",weight:16}
        ],
        action:"Identify infiltration or process moisture sources and compare the load with unit capacity.",
        reference:"Confirm space pressure and door discipline."
      }
    ]
  }
};

const facilityIqObservations = {
  chiller: [
    ["coilDirty","Condenser coil is visibly dirty or blocked"],
    ["coilClean","Condenser coil is confirmed clean"],
    ["airRecirculation","Hot condenser discharge air is recirculating"],
    ["fansRunning","All condenser fans are running"],
    ["fansNotRunning","One or more condenser fans are not running"],
    ["fanWrongRotation","Fan rotation is incorrect"],
    ["fanNoise","Fan has abnormal noise or vibration"],
    ["highSubcooling","Subcooling is unusually high"],
    ["gaugeMismatch","Controller pressure disagrees with a calibrated gauge"],
    ["intermittentAlarm","Alarm is intermittent"],
    ["strainerDirty","Water strainer is dirty or restricted"],
    ["valveNotOpen","A water valve is closed or not fully open"],
    ["gurgling","Air or gurgling is heard in the water circuit"],
    ["recentDrainFill","System was recently drained or refilled"],
    ["pumpRunning","Water pump is running"],
    ["wrongRotation","Pump rotation is incorrect"],
    ["couplingFailed","Pump coupling is failed or slipping"],
    ["flowAlarm","Flow alarm or flow switch is not proven"],
    ["lowSuction","Suction pressure appears low"],
    ["superheatAbnormal","Superheat appears abnormal"]
  ],
  hydronic: [
    ["gurgling","Gurgling or air noise is present"],
    ["recentDrainFill","Loop was recently drained or refilled"],
    ["wrongRotation","Pump rotation is incorrect"],
    ["valveNotOpen","A required valve is closed or restricted"],
    ["strainerDirty","Strainer is dirty or restricted"],
    ["couplingFailed","Coupling is damaged or slipping"],
    ["mechanicalNoise","Mechanical grinding or abnormal noise is present"],
    ["gravelNoise","Gravel-like cavitation noise is present"],
    ["vibration","Excessive vibration is present"],
    ["suctionValveRestricted","Suction valve is restricted"],
    ["visibleAir","Air is visible at vents or sight points"]
  ],
  ahu: [
    ["valveCommandOpen","Cooling-valve command is open"],
    ["valveNotOpen","Cooling valve is not physically opening"],
    ["coilAirBound","Cooling coil appears air bound"],
    ["filterDirty","Filters are dirty"],
    ["coilDirty","Coil face is dirty or restricted"],
    ["lowAirflow","Airflow is low"],
    ["sensorMismatch","BAS sensor disagrees with a calibrated instrument"],
    ["outsideDamperOpen","Outside-air damper is excessively open"]
  ],
  airCompressor: [
    ["audibleLeak","A major compressed-air leak is audible"],
    ["openDrain","A drain or blowdown valve is open"],
    ["intakeDirty","Intake filter is dirty"],
    ["unloaderStuck","Unloader or inlet valve appears stuck"],
    ["mechanicalNoise","Abnormal mechanical noise is present"],
    ["highOilUse","Oil consumption or carryover is high"],
    ["externalLeaksAbsent","No significant external system leak was found"]
  ],
  dehumidifier: [
    ["heaterNotOn","Reactivation heater is not operating"],
    ["heaterLimitOpen","Heater high-limit or airflow safety is open"],
    ["rotorStopped","Desiccant rotor is stopped or intermittent"],
    ["beltSlipping","Rotor drive belt or chain is slipping"],
    ["rotorNoise","Rotor or drive has abnormal noise"],
    ["filterDirty","Process or reactivation filters are dirty"],
    ["damperClosed","A process or reactivation damper is closed"],
    ["sealLeak","Rotor seals or casing have bypass leakage"],
    ["doorsOpen","Doors are frequently open"],
    ["newMoistureSource","A new moisture source or infiltration is present"],
    ["unitOperatingNormally","Heat, rotor, and airflow appear normal"]
  ]
};
