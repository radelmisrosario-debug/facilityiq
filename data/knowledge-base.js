
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
    "high-space-temperature": [
      {
        id:"room-control",
        title:"Room setpoint, occupancy, override, or sensor issue",
        base:12,
        required:["roomTemperature","roomCoolingSetpoint"],
        evidence:[
          {kind:"observation",key:"roomNotOccupied",weight:34},
          {kind:"observation",key:"setpointOverrideActive",weight:45},
          {kind:"observation",key:"roomSensorMismatch",weight:48},
          {kind:"measurement",key:"roomTemperature",op:"<=",other:"roomCoolingSetpoint",weight:35}
        ],
        action:"Verify effective heating/cooling setpoints, occupancy, schedule, overrides, and the room sensor in Desigo before changing equipment operation.",
        reference:"Use the approved room-control sequence and site change-control process."
      },
      {
        id:"terminal-airflow",
        title:"Room terminal airflow or VAV heating valve is causing overheating",
        base:18,
        required:["terminalAirflow","terminalAirflowSetpoint"],
        evidence:[
          {kind:"observation",key:"terminalAirflowLow",weight:52},
          {kind:"observation",key:"terminalDamperNotResponding",weight:46},
          {kind:"observation",key:"terminalInletPressureLow",weight:32},
          {kind:"observation",key:"terminalSensorMismatch",weight:34},
          {kind:"observation",key:"terminalHeatingValveNotClosing",weight:52},
          {kind:"observation",key:"terminalUnexpectedHeat",weight:44},
          {kind:"measurement",key:"terminalDischargeTemp",op:">",other:"terminalInletTemp",weight:28},
          {kind:"measurement",key:"terminalAirflow",op:"<",other:"terminalAirflowSetpoint",weight:30}
        ],
        action:"Compare airflow setpoint with measured airflow and damper command with position. If it is a VAV, compare heating-valve command with physical position and inlet with discharge temperature; verify valve closure, hot-water flow, actuator/linkage, inlet static pressure, sensor tubing, flow pickup, and downstream path.",
        reference:"Each served room has a dedicated CAV/VAV terminal; every VAV has a heating valve. Exact terminal type and tag remain to be confirmed."
      },
      {
        id:"chilled-water-plant",
        title:"Chilled-water temperature or distribution problem",
        base:16,
        required:["chilledWaterSupply","chilledWaterSetpoint"],
        evidence:[
          {kind:"observation",key:"chilledWaterAboveSetpoint",weight:55},
          {kind:"observation",key:"lowLoopDp",weight:38},
          {kind:"observation",key:"multipleAhusWarm",weight:32},
          {kind:"measurement",key:"chilledWaterSupply",op:">",other:"chilledWaterSetpoint",weight:35}
        ],
        action:"Verify the active Desigo chilled-water setpoint, actual supply temperature, enabled chiller and PCWP, SCWP status, loop DP, and distribution path.",
        reference:"Use the Site Chilled-Water System relationship and approved plant sequence."
      },
      {
        id:"control-air-valves",
        title:"Control-air or pneumatic valve response problem",
        base:15,
        required:["controlAirPressure"],
        evidence:[
          {kind:"observation",key:"controlAirLow",weight:58},
          {kind:"observation",key:"coolingValveNotOpening",weight:48},
          {kind:"observation",key:"heatingValveNotClosing",weight:48},
          {kind:"observation",key:"multipleAhusWarm",weight:20}
        ],
        action:"Check the dedicated Control Air Compressor, Control Air Dryer, header and AHU branch pressure, regulators and leaks; then compare valve commands with physical positions.",
        reference:"Heating valves are normally open and cooling valves normally closed on loss of control air."
      },
      {
        id:"ahu-airflow-coil",
        title:"AHU airflow, coil, or heat-transfer problem",
        base:13,
        required:["returnAir","supplyAir"],
        evidence:[
          {kind:"observation",key:"filterDirty",weight:35},
          {kind:"observation",key:"coilDirty",weight:35},
          {kind:"observation",key:"coilAirBound",weight:38},
          {kind:"observation",key:"lowAirflow",weight:38},
          {kind:"observation",key:"outsideDamperOpen",weight:18}
        ],
        action:"Verify fan/VFD operation, static pressure, filters, coil face, outside-air load, chilled-water flow, strainer, venting, and sensor accuracy.",
        reference:"Compare supply-air response with the AHU sequence and measured water/air conditions."
      }
    ],
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
    ["roomNotOccupied","Room is not in the expected occupied mode"],
    ["setpointOverrideActive","An incorrect or unexpected room setpoint override is active"],
    ["roomSensorMismatch","Room sensor disagrees with a calibrated reference"],
    ["terminalAirflowLow","CAV/VAV measured airflow is below its airflow setpoint"],
    ["terminalDamperNotResponding","Terminal damper command does not match physical position or response"],
    ["terminalInletPressureLow","Primary-air static pressure at the terminal inlet is inadequate"],
    ["terminalSensorMismatch","Terminal airflow sensor disagrees with field verification"],
    ["terminalHeatingValveNotClosing","VAV heating valve is commanded closed but is open, leaking, or still adding heat"],
    ["terminalHeatingValveNotOpening","VAV heating valve is commanded open but does not physically open"],
    ["terminalReheatNoTemperatureRise","VAV has heating demand but discharge air does not warm above inlet air"],
    ["terminalUnexpectedHeat","VAV discharge air is warmer than inlet air without a heating call"],
    ["chilledWaterAboveSetpoint","Actual chilled-water supply temperature is above the active setpoint"],
    ["lowLoopDp","Chilled-water loop differential pressure is low"],
    ["multipleAhusWarm","Multiple AHUs or areas are warm at the same time"],
    ["controlAirLow","Control-air pressure is below the approved site range"],
    ["coolingValveNotOpening","Normally-closed cooling valve is commanded open but not physically opening"],
    ["heatingValveNotClosing","Normally-open heating valve is commanded closed but not physically closing"],
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


/* ===== FacilityIQ V05 diagnostic coverage ===== */

const facilityIqAssetRanges = {
  "503-Aircon-Tech-Chiller": {
    flow:{label:"Chilled-water flow",min:6.5,max:14.4,unit:"GPM",source:"Manufacturer operating range"}
  },
  "UPS-01": {
    ratedKw:{label:"UPS rated capacity",target:200,unit:"kW",source:"Configured site asset data"},
    loadPct:{label:"Recommended operating margin",max:80,unit:"%",source:"FacilityIQ screening threshold"}
  },
  "SCWP-01": {
    dp:{label:"Pump differential pressure",target:12.5,tolerance:2.5,unit:"PSI",source:"Configured site control target"}
  },
  "SCWP-02": {
    dp:{label:"Pump differential pressure",target:12.5,tolerance:2.5,unit:"PSI",source:"Configured site control target"}
  },
  "HWP-01": {
    dp:{label:"Pump differential pressure",target:12.5,tolerance:2.5,unit:"PSI",source:"Configured site control target"}
  },
  "HWP-02": {
    dp:{label:"Pump differential pressure",target:12.5,tolerance:2.5,unit:"PSI",source:"Configured site control target"}
  }
};

Object.assign(facilityIqKnowledgeBase, {
  boiler: {
    "will-not-fire": [
      {id:"no-call",title:"No valid call for heat",base:18,evidence:[
        {kind:"observation",key:"heatCallAbsent",weight:55},
        {kind:"observation",key:"enableAbsent",weight:38},
        {kind:"measurement",key:"supplyTemp",op:">=",value:150,weight:10}
      ],required:["supplyTemp"],action:"Verify BAS enable, operating mode, setpoint, interlocks, and local/remote selector before opening the burner circuit.",reference:"Confirm the approved sequence of operation."},
      {id:"safety-open",title:"Safety or limit circuit is open",base:16,evidence:[
        {kind:"observation",key:"limitOpen",weight:52},
        {kind:"observation",key:"lowWaterOpen",weight:46},
        {kind:"observation",key:"flowNotProven",weight:42}
      ],required:["loopPressure"],action:"Identify the open safety. Correct the underlying water-flow, pressure, temperature, or limit condition; never bypass a safety.",reference:"Use the boiler safety-circuit schematic."},
      {id:"power-control",title:"Power or control-circuit failure",base:12,evidence:[
        {kind:"observation",key:"displayOff",weight:55},
        {kind:"observation",key:"controlFuseOpen",weight:45},
        {kind:"observation",key:"disconnectOff",weight:42}
      ],action:"Verify disconnect, breakers, control transformer, fuses, and control voltage using qualified electrical procedures.",reference:"Follow lockout/tagout and electrical safe-work requirements."}
    ],
    "ignition-lockout": [
      {id:"gas-supply",title:"Gas supply or gas-valve problem",base:18,evidence:[
        {kind:"observation",key:"gasValveClosed",weight:55},
        {kind:"measurement",key:"inletPressure",op:"<",value:3.5,weight:38},
        {kind:"observation",key:"gasValveNotOpening",weight:40}
      ],required:["inletPressure"],action:"Verify approved gas supply pressure, manual valve position, regulator condition, and gas-valve command. Use qualified combustion personnel.",reference:"Compare readings with the exact burner data plate and manual."},
      {id:"ignition",title:"Igniter or ignition-transformer failure",base:16,evidence:[
        {kind:"observation",key:"noSpark",weight:60},
        {kind:"observation",key:"igniterDamaged",weight:45}
      ],action:"Inspect ignition components, wiring, gap, grounding, and transformer output using the manufacturer procedure.",reference:"Do not test ignition circuits outside approved methods."},
      {id:"flame-proving",title:"Flame is present but not proven",base:15,evidence:[
        {kind:"observation",key:"flameVisible",weight:30},
        {kind:"measurement",key:"flameSignal",op:"<",value:2,weight:50},
        {kind:"observation",key:"poorGround",weight:35}
      ],required:["flameSignal"],action:"Clean and position the flame sensor, verify burner grounding and polarity, and compare flame signal with the manufacturer minimum.",reference:"Use the flame-control manual."}
    ],
    "low-water-flow": [
      {id:"pump-flow",title:"Circulation pump or valve problem",base:18,evidence:[
        {kind:"observation",key:"pumpNotRunning",weight:55},
        {kind:"observation",key:"valveClosed",weight:42},
        {kind:"observation",key:"flowNotProven",weight:35}
      ],required:["loopPressure"],action:"Verify pump command, rotation, valve lineup, strainers, and flow-switch operation.",reference:"Restore verified flow before firing."},
      {id:"air-low-pressure",title:"Air binding or low loop pressure",base:14,evidence:[
        {kind:"observation",key:"gurgling",weight:42},
        {kind:"measurement",key:"loopPressure",op:"<",value:10,weight:32},
        {kind:"observation",key:"recentDrainFill",weight:28}
      ],required:["loopPressure"],action:"Verify fill pressure and expansion system, then vent the loop and boiler using approved procedures.",reference:"Do not operate a hot-water boiler without adequate circulation."}
    ],
    "high-limit": [
      {id:"low-flow-overheat",title:"Low flow causing rapid temperature rise",base:20,evidence:[
        {kind:"observation",key:"flowNotProven",weight:42},
        {kind:"observation",key:"pumpNotRunning",weight:45},
        {kind:"measurement",key:"supplyTemp",op:">=",value:190,weight:30}
      ],required:["supplyTemp","returnTemp"],action:"Verify circulation, valves, pump speed, strainers, and air removal before resetting the limit.",reference:"Investigate the cause before reset."},
      {id:"sensor-limit",title:"Temperature sensor or limit-control error",base:10,evidence:[
        {kind:"observation",key:"sensorMismatch",weight:55},
        {kind:"observation",key:"intermittentTrip",weight:22}
      ],required:["supplyTemp"],action:"Compare controller and limit readings with a calibrated instrument and inspect sensor placement and wiring.",reference:"Do not raise limit settings to mask a control problem."}
    ],
    "combustion-air": [
      {id:"blocked-vent",title:"Blocked intake or exhaust vent",base:18,evidence:[
        {kind:"observation",key:"ventBlocked",weight:62},
        {kind:"observation",key:"pressureSwitchOpen",weight:35}
      ],action:"Inspect intake and exhaust termination, condensate drainage, vent joints, and obstructions.",reference:"Shut down unsafe venting conditions."},
      {id:"blower-switch",title:"Combustion blower or pressure-switch problem",base:15,evidence:[
        {kind:"observation",key:"blowerNotRunning",weight:58},
        {kind:"observation",key:"pressureSwitchOpen",weight:42},
        {kind:"observation",key:"tubingBlocked",weight:35}
      ],action:"Verify blower voltage/current, wheel condition, pressure tubing, ports, and switch operation.",reference:"Do not jumper the pressure switch."}
    ]
  },

  ups: {
    "on-battery": [
      {id:"utility-input",title:"Utility input is absent or outside tolerance",base:22,evidence:[
        {kind:"observation",key:"utilityAbsent",weight:60},
        {kind:"observation",key:"inputBreakerOpen",weight:45},
        {kind:"measurement",key:"inputVoltage",op:"<",value:400,weight:28}
      ],required:["inputVoltage"],action:"Verify upstream utility, breakers, transfer equipment, and UPS input readings. Restore source only after the cause is known.",reference:"Use the UPS input specifications and one-line diagram."},
      {id:"input-sensing",title:"Input sensing or control fault",base:10,evidence:[
        {kind:"observation",key:"externalVoltageNormal",weight:30},
        {kind:"observation",key:"upsReportsBadInput",weight:45}
      ],required:["inputVoltage"],action:"Compare UPS-reported voltage/frequency with a calibrated instrument and inspect input sensing and configuration.",reference:"Qualified UPS service may be required."}
    ],
    "bypass": [
      {id:"overload-bypass",title:"Load exceeds inverter capacity",base:18,evidence:[
        {kind:"measurement",key:"loadKw",op:">",other:"ratedKw",weight:60},
        {kind:"observation",key:"overloadAlarm",weight:45}
      ],required:["loadKw","ratedKw"],action:"Reduce noncritical load and verify phase balance and configured rating.",reference:"Do not exceed the UPS continuous rating."},
      {id:"inverter-fault",title:"Inverter fault or protective transfer",base:14,evidence:[
        {kind:"observation",key:"inverterAlarm",weight:55},
        {kind:"observation",key:"manualBypassSelected",value:false,weight:10}
      ],action:"Record alarm codes and operating state. Follow the manufacturer recovery procedure or contact qualified UPS service.",reference:"Do not operate internal bypass devices without authorization."}
    ],
    "battery-alarm": [
      {id:"aged-battery",title:"Battery capacity degradation",base:18,evidence:[
        {kind:"observation",key:"batteryOld",weight:40},
        {kind:"measurement",key:"runtime",op:"<",value:20,weight:35},
        {kind:"observation",key:"failedBatteryTest",weight:50}
      ],required:["runtime","batteryVoltage"],action:"Review battery-test results, age, impedance/conductance, temperature, and individual block readings.",reference:"Battery work requires the correct PPE and qualified personnel."},
      {id:"battery-temperature",title:"Battery or room temperature problem",base:12,evidence:[
        {kind:"measurement",key:"roomTemp",op:">=",value:80,weight:35},
        {kind:"observation",key:"batteryHot",weight:55}
      ],required:["roomTemp"],action:"Correct cooling and inspect for swollen, leaking, or overheated batteries. Escalate unsafe battery conditions.",reference:"Follow battery manufacturer temperature limits."}
    ],
    "overload": [
      {id:"true-overload",title:"Connected load exceeds capacity",base:22,evidence:[
        {kind:"measurement",key:"loadKw",op:">",other:"ratedKw",weight:65},
        {kind:"observation",key:"recentLoadAdded",weight:32}
      ],required:["loadKw","ratedKw"],action:"Identify and remove noncritical or recently added load; verify phase loading and rating.",reference:"Maintain operating margin for step loads and redundancy."},
      {id:"measurement-config",title:"Metering or rating configuration error",base:8,evidence:[
        {kind:"observation",key:"externalMeterMismatch",weight:52},
        {kind:"observation",key:"ratingConfiguredWrong",weight:42}
      ],action:"Compare UPS metering with a calibrated external measurement and verify configuration.",reference:"Configuration changes require authorization."}
    ],
    "high-temperature": [
      {id:"room-cooling",title:"UPS room cooling or airflow failure",base:20,evidence:[
        {kind:"measurement",key:"roomTemp",op:">=",value:80,weight:45},
        {kind:"observation",key:"coolingFailed",weight:55},
        {kind:"observation",key:"filterBlocked",weight:28}
      ],required:["roomTemp"],action:"Restore room cooling and clear approved airflow paths. Monitor load and battery temperature.",reference:"Follow UPS derating and shutdown guidance."}
    ],
    "no-output": [
      {id:"output-breaker",title:"Output breaker or downstream distribution open",base:18,evidence:[
        {kind:"observation",key:"outputBreakerOpen",weight:60},
        {kind:"measurement",key:"outputVoltage",op:"<",value:50,weight:30}
      ],required:["outputVoltage"],action:"Determine why the breaker opened before resetting; inspect downstream faults and loading.",reference:"Use qualified electrical troubleshooting."},
      {id:"ups-shutdown",title:"UPS is shut down or latched on fault",base:15,evidence:[
        {kind:"observation",key:"upsOff",weight:55},
        {kind:"observation",key:"criticalAlarm",weight:45}
      ],action:"Record all alarm codes and follow the manufacturer restart or service procedure.",reference:"Do not repeatedly restart into an unresolved fault."}
    ],
    "communication": [
      {id:"network-path",title:"Network, gateway, or addressing problem",base:18,evidence:[
        {kind:"observation",key:"networkLinkDown",weight:55},
        {kind:"observation",key:"pingFails",weight:42},
        {kind:"observation",key:"otherDevicesOffline",weight:28}
      ],action:"Verify link, switch port, addressing, gateway, VLAN, and protocol settings.",reference:"Coordinate network changes with site IT/OT controls."}
    ]
  },

  vacuum: {
    "low-vacuum": [
      {id:"open-user-leak",title:"Open user, valve, or system leak",base:22,evidence:[
        {kind:"observation",key:"openVacuumUser",weight:60},
        {kind:"observation",key:"audibleLeak",weight:48},
        {kind:"measurement",key:"vacuum",op:"<",other:"targetVacuum",weight:20}
      ],required:["vacuum","targetVacuum"],action:"Isolate branches, close unused users, and leak-test the system from the pump outward.",reference:"Verify system isolation before condemning the pump."},
      {id:"gas-ballast",title:"Gas ballast open or incorrectly set",base:18,evidence:[
        {kind:"observation",key:"gasBallastOpen",weight:65},
        {kind:"measurement",key:"vacuum",op:"<",other:"targetVacuum",weight:18}
      ],required:["vacuum","targetVacuum"],action:"Set the gas ballast according to the process and manufacturer instructions; retest final vacuum.",reference:"An open gas ballast intentionally reduces final vacuum."},
      {id:"oil-filter-wear",title:"Oil condition, filter restriction, or internal wear",base:12,evidence:[
        {kind:"observation",key:"oilLowDirty",weight:42},
        {kind:"observation",key:"filterRestricted",weight:35},
        {kind:"observation",key:"isolatedPumpStillLow",weight:45}
      ],required:["vacuum"],action:"Check oil level/type/condition, filters, seals, and isolated-pump performance before internal service.",reference:"Use the exact pump oil and maintenance procedure."}
    ],
    "low-capacity": [
      {id:"inlet-restriction",title:"Restricted inlet filter or piping",base:18,evidence:[
        {kind:"observation",key:"filterRestricted",weight:52},
        {kind:"observation",key:"valveRestricted",weight:45}
      ],action:"Inspect inlet filters, traps, valves, and piping restrictions.",reference:"Depressurize/isolate before opening components."},
      {id:"belt-coupling-wear",title:"Drive slip or internal wear",base:10,evidence:[
        {kind:"observation",key:"driveSlipping",weight:58},
        {kind:"measurement",key:"motorAmps",op:"lowRelativeTo",other:"motorFla",value:0.5,weight:20}
      ],required:["motorAmps","motorFla"],action:"Lock out and inspect belts/couplings, rotation, vanes, valves, and internal clearances.",reference:"Use manufacturer service limits."}
    ],
    "overheating": [
      {id:"cooling-air",title:"Restricted cooling airflow or high ambient",base:18,evidence:[
        {kind:"observation",key:"coolingBlocked",weight:55},
        {kind:"measurement",key:"pumpTemp",op:">=",value:180,weight:28}
      ],required:["pumpTemp"],action:"Clear cooling paths, verify fan operation, and check room temperature.",reference:"Compare pump temperature with the manufacturer limit."},
      {id:"oil-load",title:"Oil, exhaust restriction, or excessive load",base:14,evidence:[
        {kind:"observation",key:"oilLowDirty",weight:40},
        {kind:"observation",key:"exhaustRestricted",weight:48},
        {kind:"observation",key:"continuousHighLoad",weight:28}
      ],action:"Correct oil level/condition, inspect exhaust filters, and eliminate system leaks or continuous high load.",reference:"Allow safe cooling before service."}
    ],
    "oil-mist": [
      {id:"exhaust-filter",title:"Saturated or damaged exhaust separator",base:20,evidence:[
        {kind:"observation",key:"filterRestricted",weight:28},
        {kind:"observation",key:"separatorDamaged",weight:62}
      ],action:"Inspect and replace the approved exhaust separator; verify oil level and exhaust backpressure.",reference:"Use approved parts and disposal procedures."}
    ],
    "abnormal-noise": [
      {id:"bearing-drive",title:"Bearing, coupling, or drive problem",base:16,evidence:[
        {kind:"observation",key:"grindingNoise",weight:52},
        {kind:"observation",key:"driveSlipping",weight:38},
        {kind:"observation",key:"vibration",weight:30}
      ],action:"Lock out and inspect bearings, alignment, coupling/belt, mounts, and rotation.",reference:"Do not continue operating with severe mechanical noise."},
      {id:"liquid-ingestion",title:"Liquid carryover or process contamination",base:12,evidence:[
        {kind:"observation",key:"liquidAtInlet",weight:62},
        {kind:"observation",key:"knockingNoise",weight:38}
      ],action:"Stop the pump, isolate the source, inspect traps/separators, and follow the manufacturer recovery procedure.",reference:"Liquid ingestion can cause major pump damage."}
    ],
    "motor-trip": [
      {id:"electrical-overload",title:"Electrical overload or phase problem",base:18,evidence:[
        {kind:"measurement",key:"motorAmps",op:">",other:"motorFla",weight:60},
        {kind:"observation",key:"phaseImbalance",weight:42}
      ],required:["motorAmps","motorFla"],action:"Verify voltage, phase balance, current on all phases, overload settings, and motor condition.",reference:"Qualified electrical work only."},
      {id:"mechanical-binding",title:"Pump is mechanically binding or overloaded",base:14,evidence:[
        {kind:"observation",key:"shaftHardToTurn",weight:58},
        {kind:"observation",key:"grindingNoise",weight:30}
      ],action:"Lock out and inspect shaft rotation, bearings, internal contact, and process load.",reference:"Do not repeatedly reset the overload."}
    ]
  },

  fan: {
    "will-not-start": [
      {id:"power-command",title:"No power or start command",base:20,evidence:[
        {kind:"observation",key:"startCommandAbsent",weight:48},
        {kind:"observation",key:"disconnectOff",weight:45},
        {kind:"observation",key:"breakerOpen",weight:42}
      ],action:"Verify BAS/start command, disconnect, breaker, control power, safeties, and local selector.",reference:"Follow electrical safe-work requirements."},
      {id:"vfd-motor",title:"VFD fault or motor problem",base:15,evidence:[
        {kind:"observation",key:"vfdFault",weight:55},
        {kind:"observation",key:"motorHums",weight:30},
        {kind:"measurement",key:"motorAmps",op:">",other:"motorFla",weight:40}
      ],required:["motorAmps","motorFla"],action:"Record the VFD fault, verify output/current, inspect motor and driven equipment, and correct the cause before reset.",reference:"Do not megger a motor through a connected VFD."}
    ],
    "low-airflow": [
      {id:"rotation-damper",title:"Wrong rotation or closed damper",base:20,evidence:[
        {kind:"observation",key:"wrongRotation",weight:60},
        {kind:"observation",key:"damperClosed",weight:50},
        {kind:"measurement",key:"airflow",op:"present",weight:5}
      ],required:["airflow","speed"],action:"Verify rotation, damper position, fan speed, and system valve/damper lineup.",reference:"Compare airflow with the approved balance report."},
      {id:"belt-wheel-duct",title:"Belt slip, dirty wheel, or duct restriction",base:16,evidence:[
        {kind:"observation",key:"beltSlipping",weight:48},
        {kind:"observation",key:"wheelDirty",weight:42},
        {kind:"observation",key:"ductRestricted",weight:38}
      ],action:"Lock out and inspect belts/couplings, wheel condition, filters, screens, and duct restrictions.",reference:"Restore guards before operation."}
    ],
    "vibration": [
      {id:"imbalance",title:"Wheel imbalance or buildup",base:20,evidence:[
        {kind:"observation",key:"wheelDirty",weight:45},
        {kind:"observation",key:"wheelDamaged",weight:55},
        {kind:"measurement",key:"vibration",op:">=",value:0.3,weight:25}
      ],required:["vibration"],action:"Lock out, clean and inspect the wheel, verify balance, and inspect for cracks or missing weights.",reference:"Use site vibration limits and manufacturer guidance."},
      {id:"bearing-alignment",title:"Bearing, alignment, or mounting problem",base:16,evidence:[
        {kind:"observation",key:"bearingNoise",weight:45},
        {kind:"observation",key:"looseMount",weight:42},
        {kind:"observation",key:"misaligned",weight:38}
      ],action:"Inspect bearings, alignment, sheaves/coupling, base, isolators, and fasteners.",reference:"Do not operate severe vibration conditions."}
    ],
    "noise": [
      {id:"mechanical-contact",title:"Mechanical contact, bearing, or belt problem",base:18,evidence:[
        {kind:"observation",key:"bearingNoise",weight:42},
        {kind:"observation",key:"beltSlipping",weight:38},
        {kind:"observation",key:"wheelRubbing",weight:55}
      ],action:"Lock out and inspect wheel clearance, bearings, belt/coupling, guards, and loose components.",reference:"Correct contact before restart."}
    ],
    "motor-trip": [
      {id:"overload-binding",title:"Motor overload or mechanical binding",base:20,evidence:[
        {kind:"measurement",key:"motorAmps",op:">",other:"motorFla",weight:60},
        {kind:"observation",key:"wheelRubbing",weight:45},
        {kind:"observation",key:"bearingSeized",weight:50}
      ],required:["motorAmps","motorFla"],action:"Verify current on all phases, fan free rotation, bearings, wheel clearance, overload settings, and airflow operating point.",reference:"Do not repeatedly reset an overload."}
    ],
    "water": [
      {id:"roof-curb-drain",title:"Roof curb, flashing, or drain-path leak",base:18,evidence:[
        {kind:"observation",key:"rainRelated",weight:55},
        {kind:"observation",key:"curbSealFailed",weight:48},
        {kind:"observation",key:"drainBlocked",weight:42}
      ],action:"Inspect roof flashing, curb seal, drain paths, penetrations, and housing seams. Coordinate roof repairs appropriately.",reference:"Protect the building and electrical equipment from water intrusion."}
    ]
  },

  dryer: {
    "no-airflow": [
      {id:"valve-blockage",title:"Closed valve or severe restriction",base:20,evidence:[
        {kind:"observation",key:"valveClosed",weight:58},
        {kind:"observation",key:"filterRestricted",weight:48}
      ],action:"Verify inlet/outlet bypass lineup, filters, and piping restrictions.",reference:"Depressurize before servicing filters."},
      {id:"compressor-off",title:"Upstream compressor is not supplying air",base:18,evidence:[
        {kind:"observation",key:"compressorOff",weight:62},
        {kind:"observation",key:"inletPressureLow",weight:42}
      ],action:"Restore upstream compressed-air supply and verify dryer permissives.",reference:"Do not diagnose the dryer without confirmed inlet conditions."}
    ],
    "wet-air": [
      {id:"drain-separator",title:"Condensate drain or separator failure",base:20,evidence:[
        {kind:"observation",key:"drainNotCycling",weight:55},
        {kind:"observation",key:"waterDownstream",weight:45}
      ],action:"Inspect separator, drain valve, strainer, tubing, and drain discharge.",reference:"Isolate and depressurize before drain service."},
      {id:"refrigeration-capacity",title:"Refrigeration circuit not removing moisture",base:15,evidence:[
        {kind:"observation",key:"refrigerationNotRunning",weight:55},
        {kind:"observation",key:"dewPointHigh",weight:40},
        {kind:"observation",key:"condenserDirty",weight:28}
      ],action:"Verify refrigeration compressor, condenser airflow, evaporator condition, and controls.",reference:"Qualified refrigeration service may be required."}
    ],
    "hot-compressor": [
      {id:"condenser-airflow",title:"Dirty condenser or inadequate cooling airflow",base:20,evidence:[
        {kind:"observation",key:"condenserDirty",weight:55},
        {kind:"observation",key:"coolingFanOff",weight:52},
        {kind:"observation",key:"roomHot",weight:25}
      ],action:"Clean condenser surfaces, verify fan operation, and correct room ventilation.",reference:"Allow safe cooling before service."}
    ],
    "no-start": [
      {id:"power-control",title:"Power, control, or high-pressure safety open",base:18,evidence:[
        {kind:"observation",key:"disconnectOff",weight:42},
        {kind:"observation",key:"controlFuseOpen",weight:45},
        {kind:"observation",key:"safetyOpen",weight:48}
      ],action:"Verify power, control voltage, safeties, and temperature/dew-point demand.",reference:"Do not bypass refrigeration safeties."}
    ],
    "noisy": [
      {id:"fan-compressor-mount",title:"Fan, compressor, or mounting problem",base:18,evidence:[
        {kind:"observation",key:"fanRubbing",weight:52},
        {kind:"observation",key:"mountLoose",weight:45},
        {kind:"observation",key:"compressorNoise",weight:38}
      ],action:"Isolate and inspect fan clearance, compressor mounts, piping contact, and panels.",reference:"Escalate severe compressor noise."}
    ]
  }
});

Object.assign(facilityIqObservations, {
  boiler: [
    ["heatCallAbsent","No call for heat is present"],
    ["enableAbsent","BAS or remote enable is absent"],
    ["limitOpen","A temperature or safety limit is open"],
    ["lowWaterOpen","Low-water cutoff is open"],
    ["flowNotProven","Water flow is not proven"],
    ["displayOff","Boiler display/control is off"],
    ["controlFuseOpen","Control fuse is open"],
    ["disconnectOff","Disconnect or breaker is off"],
    ["gasValveClosed","Manual gas valve is closed"],
    ["gasValveNotOpening","Automatic gas valve is not opening"],
    ["noSpark","No ignition spark is present"],
    ["igniterDamaged","Igniter is damaged or incorrectly gapped"],
    ["flameVisible","Flame is visible during the trial"],
    ["poorGround","Burner grounding or polarity is suspect"],
    ["pumpNotRunning","Circulation pump is not running"],
    ["valveClosed","A required hydronic valve is closed"],
    ["gurgling","Air or gurgling is present"],
    ["recentDrainFill","Loop was recently drained or filled"],
    ["sensorMismatch","Temperature reading disagrees with a calibrated instrument"],
    ["intermittentTrip","High-limit trip is intermittent"],
    ["ventBlocked","Combustion intake or exhaust is blocked"],
    ["pressureSwitchOpen","Combustion pressure switch remains open"],
    ["blowerNotRunning","Combustion blower is not running"],
    ["tubingBlocked","Pressure-switch tubing or port is blocked"]
  ],
  ups: [
    ["utilityAbsent","Utility input is absent"],
    ["inputBreakerOpen","UPS input breaker is open"],
    ["externalVoltageNormal","External input voltage is normal"],
    ["upsReportsBadInput","UPS reports unacceptable input"],
    ["overloadAlarm","UPS overload alarm is active"],
    ["inverterAlarm","Inverter alarm is active"],
    ["manualBypassSelected","Manual bypass is selected"],
    ["batteryOld","Battery age is near or beyond expected service life"],
    ["failedBatteryTest","Battery test failed"],
    ["batteryHot","Battery is hot, swollen, or abnormal"],
    ["recentLoadAdded","A significant load was recently added"],
    ["externalMeterMismatch","External meter disagrees with UPS load"],
    ["ratingConfiguredWrong","Configured UPS rating appears incorrect"],
    ["coolingFailed","UPS room cooling has failed"],
    ["filterBlocked","UPS airflow path or filter is blocked"],
    ["outputBreakerOpen","UPS output breaker is open"],
    ["upsOff","UPS is shut down"],
    ["criticalAlarm","A critical UPS alarm is active"],
    ["networkLinkDown","UPS network link is down"],
    ["pingFails","UPS network address does not respond"],
    ["otherDevicesOffline","Other devices on the same network are offline"]
  ],
  vacuum: [
    ["openVacuumUser","An unused vacuum user or valve is open"],
    ["audibleLeak","A vacuum leak is audible or confirmed"],
    ["gasBallastOpen","Gas ballast is open"],
    ["oilLowDirty","Oil is low, dirty, or incorrect"],
    ["filterRestricted","Inlet or exhaust filter is restricted"],
    ["isolatedPumpStillLow","Pump still cannot reach vacuum when isolated"],
    ["valveRestricted","An inlet valve or trap is restricted"],
    ["driveSlipping","Belt or coupling is slipping"],
    ["coolingBlocked","Cooling airflow is blocked"],
    ["exhaustRestricted","Exhaust path or separator is restricted"],
    ["continuousHighLoad","Pump is continuously exposed to high gas load"],
    ["separatorDamaged","Exhaust separator is damaged or saturated"],
    ["grindingNoise","Grinding or bearing noise is present"],
    ["vibration","Excessive vibration is present"],
    ["liquidAtInlet","Liquid has reached the pump inlet"],
    ["knockingNoise","Knocking noise is present"],
    ["phaseImbalance","Voltage/current phase imbalance is present"],
    ["shaftHardToTurn","Pump shaft is difficult to turn when safely isolated"]
  ],
  fan: [
    ["startCommandAbsent","Start command is absent"],
    ["disconnectOff","Disconnect is off"],
    ["breakerOpen","Breaker or overload is open"],
    ["vfdFault","VFD fault is active"],
    ["motorHums","Motor hums but does not rotate"],
    ["wrongRotation","Fan rotation is incorrect"],
    ["damperClosed","Damper is closed or not opening"],
    ["beltSlipping","Belt or coupling is slipping"],
    ["wheelDirty","Fan wheel is dirty or has buildup"],
    ["ductRestricted","Duct, screen, or discharge is restricted"],
    ["wheelDamaged","Fan wheel is damaged"],
    ["bearingNoise","Bearing noise is present"],
    ["looseMount","Base, curb, or mount is loose"],
    ["misaligned","Sheaves, coupling, or shaft are misaligned"],
    ["wheelRubbing","Fan wheel is rubbing"],
    ["bearingSeized","Bearing or shaft is binding"],
    ["rainRelated","Water entry occurs during rain"],
    ["curbSealFailed","Roof curb or flashing seal appears failed"],
    ["drainBlocked","Housing or roof drain path is blocked"]
  ],
  dryer: [
    ["valveClosed","Dryer isolation or bypass valve lineup is incorrect"],
    ["filterRestricted","Dryer filter is restricted"],
    ["compressorOff","Upstream air compressor is off"],
    ["inletPressureLow","Dryer inlet pressure is low"],
    ["drainNotCycling","Condensate drain is not cycling"],
    ["waterDownstream","Liquid water is present downstream"],
    ["refrigerationNotRunning","Dryer refrigeration compressor is not running"],
    ["dewPointHigh","Pressure dew point is high"],
    ["condenserDirty","Condenser is dirty"],
    ["coolingFanOff","Condenser fan is not running"],
    ["roomHot","Mechanical room temperature is high"],
    ["disconnectOff","Disconnect or breaker is off"],
    ["controlFuseOpen","Control fuse is open"],
    ["safetyOpen","A refrigeration safety is open"],
    ["fanRubbing","Cooling fan is rubbing"],
    ["mountLoose","Compressor or panel mount is loose"],
    ["compressorNoise","Refrigeration compressor noise is abnormal"]
  ]
});
