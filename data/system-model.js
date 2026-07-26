const facilitySystems={
  chilledWater:{
    id:"chilledWater",name:"Site Chilled-Water System",description:"Primary-secondary chilled-water plant serving the building AHUs.",
    notes:[
      "The Trane and York chillers are the primary cooling sources for the site.",
      "The Trane chiller is rated 300 tons and the York chiller is rated 400 tons; verify current nameplates.",
      "The York enables after Trane capacity remains above 95% for more than 20 minutes; verify the active approved sequence in Desigo.",
      "Each chiller has a dedicated primary chilled-water pump (PCWP).",
      "The secondary chilled-water pumps (SCWP) supply the building AHUs.",
      "SCWP speed is controlled by the chilled-water differential-pressure controller.",
      "The 503 chiller is a separate dedicated cooling system serving the Bry-Air dehumidifier."
    ],
    nodes:[
      {id:"RETURN-HDR",label:"Building CHW Return Header",type:"header",x:50,y:8},
      {id:"TRANE-PCWP",label:"Trane PCWP",sub:"Marathon 2T5TTDBA4026AN",type:"pump",asset:"TRANE-PCWP",x:24,y:24},
      {id:"YORK-PCWP",label:"York PCWP",sub:"Marathon 2T5TTDBA4026AN",type:"pump",asset:"YORK-PCWP",x:76,y:24},
      {id:"TRANE-CH-01",label:"Trane Chiller",sub:"RTAF310",type:"chiller",asset:"TRANE-CH-01",x:24,y:43},
      {id:"YORK-CH-01",label:"York Chiller",sub:"YVAA0443",type:"chiller",asset:"YORK-CH-01",x:76,y:43},
      {id:"PRIMARY-SUPPLY",label:"Primary CHW Supply / Common Pipe",type:"header",x:50,y:60},
      {id:"SCWP-01",label:"SCWP-01",sub:"DP-controlled VFD",type:"pump",asset:"SCWP-01",x:38,y:76},
      {id:"SCWP-02",label:"SCWP-02",sub:"DP-controlled VFD",type:"pump",asset:"SCWP-02",x:62,y:76},
      {id:"AHU-LOADS",label:"Building AHUs",sub:"Cooling coils / distribution loop",type:"load",x:50,y:93}
    ],
    links:[
      ["RETURN-HDR","TRANE-PCWP","return"],["RETURN-HDR","YORK-PCWP","return"],
      ["TRANE-PCWP","TRANE-CH-01","return"],["YORK-PCWP","YORK-CH-01","return"],
      ["TRANE-CH-01","PRIMARY-SUPPLY","supply"],["YORK-CH-01","PRIMARY-SUPPLY","supply"],
      ["PRIMARY-SUPPLY","SCWP-01","supply"],["PRIMARY-SUPPLY","SCWP-02","supply"],
      ["SCWP-01","AHU-LOADS","supply"],["SCWP-02","AHU-LOADS","supply"]
    ],
    loopPipes:[{type:"return",d:"M 50 93 H 94 V 8 H 50"}],
    pipeLabels:[
      {text:"CHILLED-WATER SUPPLY",type:"supply",x:20,y:68},
      {text:"CHILLED-WATER RETURN",type:"return",x:87,y:52},
      {text:"CLOSED DISTRIBUTION LOOP",type:"loop",x:21,y:90}
    ],
    commonSymptoms:[
      {name:"Multiple AHUs are warm",checks:["Verify leaving chilled-water temperature from the operating chiller(s).","Confirm the dedicated PCWP for each enabled chiller is running and flow is proven.","Compare secondary-loop DP with setpoint.","Check SCWP command, VFD speed, and pump differential pressure.","Evaluate common-pipe mixing and primary-versus-secondary flow balance."]},
      {name:"Low building chilled-water DP",checks:["Verify DP transmitter reading against calibrated gauges.","Check SCWP enable, lead/lag status, VFD command, and actual speed.","Confirm pump rotation, isolation valves, strainers, and mechanical condition.","Check for excessive open control valves or unusual demand."]},
      {name:"One chiller has low evaporator flow",checks:["Focus on that chiller's dedicated PCWP.","Verify evaporator isolation valves and strainer condition.","Check air binding, flow switch, pump rotation, and motor loading.","Do not treat the SCWP as the primary cause of isolated evaporator-flow loss."]}
    ]
  },
  processCooling:{
    id:"processCooling",name:"503 / Bry-Air Dedicated Cooling",description:"Dedicated chilled-water relationship for dehumidification in Room 503.",
    notes:["The 503 chiller works with the Bry-Air dehumidifier and is separate from the main Trane/York site cooling plant."],
    nodes:[
      {id:"503-Aircon-Tech-Chiller",label:"503 Chiller",sub:"MultiAqua MAC-060HE-03",type:"chiller",asset:"503-Aircon-Tech-Chiller",x:50,y:20},
      {id:"503-LOOP",label:"Dedicated CHW Loop",type:"header",x:50,y:50},
      {id:"Bry-Air-DEHU",label:"Bry-Air Dehumidifier",sub:"Room 503",type:"load",asset:"Bry-Air-DEHU",x:50,y:80}
    ],
    links:[["503-Aircon-Tech-Chiller","503-LOOP"],["503-LOOP","Bry-Air-DEHU"],["Bry-Air-DEHU","503-Aircon-Tech-Chiller"]],
    commonSymptoms:[{name:"Bry-Air humidity is high",checks:["Verify 503 chiller operation and leaving-water temperature.","Confirm dedicated-loop water flow and valve position.","Check Bry-Air cooling coil, strainer, air binding, and entering/leaving-water temperatures.","Then evaluate rotor, reactivation heat, process airflow, and seals."]}]
  },
  hotWater:{
    id:"hotWater",name:"Hot-Water Distribution System",description:"Boiler plant and DP-controlled hot-water distribution pumps.",
    notes:["HWP speed is controlled by the hot-water differential-pressure controller.","HWP-01 and HWP-02 distribute hot water to AHU coils and CAV/VAV reheat loads.","Boilers 01–03 are lead units. Boiler-04 enables as the lag boiler when supply temperature drops below the staging threshold."],
    nodes:[
      {id:"BOILERS",label:"Boiler Plant",sub:"Boilers 01-04",type:"boiler",x:50,y:18},
      {id:"HW-SUPPLY",label:"Hot-Water Supply Header",type:"header",x:50,y:42},
      {id:"HWP-01",label:"HWP-01",sub:"DP-controlled VFD",type:"pump",asset:"HWP-01",x:38,y:65},
      {id:"HWP-02",label:"HWP-02",sub:"DP-controlled VFD",type:"pump",asset:"HWP-02",x:62,y:65},
      {id:"HEATING-LOADS",label:"AHU Heating Coils / Loads",type:"load",x:50,y:88}
    ],
    links:[["BOILERS","HW-SUPPLY","supply"],["HW-SUPPLY","HWP-01","supply"],["HW-SUPPLY","HWP-02","supply"],["HWP-01","HEATING-LOADS","supply"],["HWP-02","HEATING-LOADS","supply"]],
    loopPipes:[{type:"return",d:"M 50 88 H 92 V 18 H 50"}],
    pipeLabels:[
      {text:"HOT-WATER SUPPLY",type:"supply",x:20,y:57},
      {text:"HOT-WATER RETURN",type:"return",x:86,y:50},
      {text:"CLOSED HEATING LOOP",type:"loop",x:22,y:86}
    ],
    commonSymptoms:[{name:"Low hot-water DP",checks:["Verify DP transmitter against calibrated gauges.","Check HWP lead/lag status, command, VFD speed, and actual pump DP.","Confirm pump rotation, valve lineup, strainers, and available boiler supply temperature."]}]
  },
  controlAir:{
    id:"controlAir",name:"Pneumatic Control-Air System",description:"Dedicated control-air compressor, dryer, and distribution serving AHU heating/cooling valves and pneumatic fume-hood damper actuators.",
    notes:[
      "Control-AC is the dedicated source for AHU pneumatic valve control air and pneumatic fume-hood damper actuators.",
      "The Control Air Dryer conditions control air before it reaches the distribution header.",
      "House Air Compressors 01–03 do not supply the AHU controls; they serve laboratory compressed-air demand.",
      "AHU heating valves are normally open; AHU cooling valves are normally closed.",
      "Loss of control air can open AHU heating while closing AHU cooling and can prevent fume-hood dampers from maintaining commanded airflow."
    ],
    nodes:[
      {id:"Control-AC",label:"Control Air Compressor",sub:"Control-AC · Room 805",type:"pump",asset:"Control-AC",x:50,y:15},
      {id:"Control-AC-Air-Dryer",label:"Control Air Dryer",sub:"Control-AC-Air-Dryer · Room 805",type:"load",asset:"Control-AC-Air-Dryer",x:50,y:36},
      {id:"AIR-HEADER",label:"Control-Air Header",sub:"Receiver / filters / regulators",type:"header",x:50,y:58},
      {id:"AHU-PNEUMATICS",label:"AHU Valves + Hood Actuators",sub:"AHU heating NO · cooling NC · pneumatic hood dampers",type:"load",x:50,y:82}
    ],
    links:[["Control-AC","Control-AC-Air-Dryer"],["Control-AC-Air-Dryer","AIR-HEADER"],["AIR-HEADER","AHU-PNEUMATICS"]],
    commonSymptoms:[
      {name:"One AHU has a valve-control problem",checks:["Compare Desigo valve command with physical valve position.","Measure control-air pressure at the AHU branch and actuator.","Inspect local regulator, tubing, transducer/positioner, actuator, linkage, and valve stroke.","Remember that heating fails open and cooling fails closed when control air is lost."]},
      {name:"Multiple AHUs are warm or heating unexpectedly",checks:["Check common control-air header pressure and Control-AC status first.","Verify Control-AC-Air-Dryer operation, receiver pressure, filters, regulators, isolation valves, and header leaks.","Confirm branch pressures at an affected AHU.","After air is restored, verify heating valves drive closed and cooling valves can drive open."]}
    ]
  },
  labAir:{
    id:"labAir",name:"Laboratory Compressed-Air System",description:"Three House Air Compressor and dedicated air-dryer trains: 01 and 02 serve Chemistry-side laboratory air; 03 serves Bio-side laboratory air.",
    notes:[
      "House Air Compressors 01 and 02 supply the Chemistry-side laboratories.",
      "House Air Compressor 03 supplies the Bio-side laboratories.",
      "Each House Air Compressor has a dedicated refrigerated air dryer: Compressor 01 to Dryer 01, Compressor 02 to Dryer 02, and Compressor 03 to Dryer 03.",
      "This system is separate from the dedicated AHU pneumatic control-air system.",
      "A laboratory air-pressure complaint should be diagnosed here, not at Control-AC."
    ],
    nodes:[
      {id:"House-AC-01",label:"House Air Compressor 01",sub:"Chemistry side · Room 805",type:"pump",asset:"House-AC-01",x:18,y:14},
      {id:"House-AC-02",label:"House Air Compressor 02",sub:"Chemistry side · Room 805",type:"pump",asset:"House-AC-02",x:50,y:14},
      {id:"House-AC-03",label:"House Air Compressor 03",sub:"Bio-side · Room 182",type:"pump",asset:"House-AC-03",x:82,y:14},
      {id:"House-AC-Air-Dryer-01",label:"House Air Dryer 01",sub:"Atlas Copco FX 7 · Room 805",type:"load",asset:"House-AC-Air-Dryer-01",x:18,y:39},
      {id:"House-AC-Air-Dryer-02",label:"House Air Dryer 02",sub:"Nano DXR0105N · Room 805",type:"load",asset:"House-AC-Air-Dryer-02",x:50,y:39},
      {id:"House-AC-Air-Dryer-03",label:"House Air Dryer 03",sub:"Speedaire 3YA50A · Room 182",type:"load",asset:"House-AC-Air-Dryer-03",x:82,y:39},
      {id:"LAB-AIR-HEADER",label:"Laboratory Air Header",sub:"Receivers / distribution / regulators",type:"header",x:50,y:66},
      {id:"LAB-AIR-USERS",label:"Laboratory Air Users",sub:"Chemistry: AC-01/02 · Bio: AC-03",type:"load",x:50,y:88}
    ],
    links:[["House-AC-01","House-AC-Air-Dryer-01"],["House-AC-Air-Dryer-01","LAB-AIR-HEADER"],["House-AC-02","House-AC-Air-Dryer-02"],["House-AC-Air-Dryer-02","LAB-AIR-HEADER"],["House-AC-03","House-AC-Air-Dryer-03"],["House-AC-Air-Dryer-03","LAB-AIR-HEADER"],["LAB-AIR-HEADER","LAB-AIR-USERS"]],
    commonSymptoms:[
      {name:"Low laboratory air pressure",checks:["Identify the affected side first: House-AC-01/02 serve Chemistry; House-AC-03 serves Bio.","Check laboratory header pressure and demand.","Verify the serving House Air Compressor status, cut-in/cut-out operation, receiver pressure, and capacity.","Check its dedicated air dryer for an isolation, restriction, freeze-up, blocked filter, failed drain, or high pressure drop.","Inspect open drains, large users, regulators, isolation valves, and distribution leaks.","Do not troubleshoot Control-AC for a laboratory compressed-air pressure complaint."]},
      {name:"Water or high dew point in laboratory air",checks:["Identify which compressor/dryer train is serving the header.","Verify the dedicated dryer is powered, enabled, and operating without alarm.","Check inlet temperature and pressure, condenser airflow, separator and automatic drain operation, filters, bypass position, and outlet dew point.","Confirm House Air Dryer 01 is paired with Compressor 01, Dryer 02 with Compressor 02, and Dryer 03 with Compressor 03."]},
      {name:"One laboratory has low air pressure",checks:["Compare local lab pressure with the main laboratory air header.","Check the local isolation valve, regulator, filter, hose, branch piping, and connected demand.","If header pressure is also low, continue at the House Air Compressors."]}
    ]
  },
  laboratoryExhaust:{
    id:"laboratoryExhaust",name:"Paired Laboratory Exhaust Systems",description:"Paired roof exhaust fans serving shared fume-hood and laboratory exhaust duct systems.",
    notes:[
      "EF-10 and EF-11 serve all fume hoods in Labs 400 and 505.",
      "EF-21 and EF-22 serve all fume hoods in Labs 430 and 440.",
      "EF-25 and EF-26 serve all fume hoods in Labs 415 and 420 plus the sink exhaust in Lab 414.",
      "EF-27 and EF-28 serve all fume hoods in Labs 450 and 460.",
      "EF-30 and EF-31 serve all Bio-side laboratory fume hoods and laboratory exhaust points.",
      "All laboratories are single-pass: AHUs supply conditioned air and the laboratory exhaust systems discharge it outdoors.",
      "Siemens-controlled fume hoods are visible in Desigo; authorized operators can review airflow and adjust approved setpoints. Their damper actuators are pneumatic and depend on Control-AC.",
      "Each pair shares ductwork; assess both fans and the common duct before isolating the complaint to one fan."
      ,"The source operations manual describes Desigo duct-static control with roof dampers modulating as system pressure changes."
    ],
    nodes:[
      {id:"EF-10",label:"EF-10",sub:"Paired with EF-11",type:"fan",asset:"EF-10",x:12,y:12},
      {id:"EF-11",label:"EF-11",sub:"Paired with EF-10",type:"fan",asset:"EF-11",x:30,y:12},
      {id:"EXH-400-505",label:"Labs 400 / 505",sub:"All fume hoods",type:"load",x:21,y:30},
      {id:"EF-21",label:"EF-21",sub:"Paired with EF-22",type:"fan",asset:"EF-21",x:42,y:12},
      {id:"EF-22",label:"EF-22",sub:"Paired with EF-21",type:"fan",asset:"EF-22",x:60,y:12},
      {id:"EXH-430-440",label:"Labs 430 / 440",sub:"All fume hoods",type:"load",x:51,y:30},
      {id:"EF-25",label:"EF-25",sub:"Paired with EF-26",type:"fan",asset:"EF-25",x:72,y:12},
      {id:"EF-26",label:"EF-26",sub:"Paired with EF-25",type:"fan",asset:"EF-26",x:90,y:12},
      {id:"EXH-414-420",label:"Labs 414 / 415 / 420",sub:"Fume hoods + Lab 414 sink",type:"load",x:81,y:30},
      {id:"EF-27",label:"EF-27",sub:"Paired with EF-28",type:"fan",asset:"EF-27",x:27,y:58},
      {id:"EF-28",label:"EF-28",sub:"Paired with EF-27",type:"fan",asset:"EF-28",x:45,y:58},
      {id:"EXH-450-460",label:"Labs 450 / 460",sub:"All fume hoods",type:"load",x:36,y:78},
      {id:"EF-30",label:"EF-30",sub:"Paired with EF-31",type:"fan",asset:"EF-30",x:57,y:58},
      {id:"EF-31",label:"EF-31",sub:"Paired with EF-30",type:"fan",asset:"EF-31",x:75,y:58},
      {id:"EXH-BIO",label:"Bio-side",sub:"All laboratory fume hoods and exhaust",type:"load",x:66,y:78}
    ],
    links:[
      ["EXH-400-505","EF-10"],["EXH-400-505","EF-11"],
      ["EXH-430-440","EF-21"],["EXH-430-440","EF-22"],
      ["EXH-414-420","EF-25"],["EXH-414-420","EF-26"],
      ["EXH-450-460","EF-27"],["EXH-450-460","EF-28"],
      ["EXH-BIO","EF-30"],["EXH-BIO","EF-31"]
    ],
    commonSymptoms:[
      {name:"One fan in a pair is not running",checks:["Treat the pair as one exhaust system and check both fans’ commands, proof, speed, current, and faults.","Verify the shared enable, lead/lag or parallel sequence, permissives, emergency interlocks, and each fan’s disconnect.","Do not assume one running fan maintains safe hood capture; verify common duct static, hood alarms, face velocity, and laboratory pressure."]},
      {name:"All hoods on one pair have low exhaust",checks:["Confirm both paired fans are proven at the expected speed and rotation.","Compare common duct static pressure with setpoint and verify the sensor.","Inspect both wheels, common dampers, shared duct and discharge for restriction or recirculation.","Check laboratory make-up air and simultaneous hood demand, then verify representative hood performance."]},
      {name:"Only one hood, sink, or branch has low exhaust",checks:["Compare the affected point with another point on the same fan pair.","Check the local hood sash, alarm, airflow controller, branch damper, sensor, grille or sink pickup, and branch duct.","Confirm common duct static remains normal while evaluating the local branch."]}
    ]
  }
};
