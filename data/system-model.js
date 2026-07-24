const facilitySystems={
  chilledWater:{
    id:"chilledWater",name:"Site Chilled-Water System",description:"Primary-secondary chilled-water plant serving the building AHUs.",
    notes:[
      "The Trane and York chillers are the primary cooling sources for the site.",
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
      ["RETURN-HDR","TRANE-PCWP"],["RETURN-HDR","YORK-PCWP"],
      ["TRANE-PCWP","TRANE-CH-01"],["YORK-PCWP","YORK-CH-01"],
      ["TRANE-CH-01","PRIMARY-SUPPLY"],["YORK-CH-01","PRIMARY-SUPPLY"],
      ["PRIMARY-SUPPLY","SCWP-01"],["PRIMARY-SUPPLY","SCWP-02"],
      ["SCWP-01","AHU-LOADS"],["SCWP-02","AHU-LOADS"],["AHU-LOADS","RETURN-HDR"]
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
    notes:["HWP speed is controlled by the hot-water differential-pressure controller."],
    nodes:[
      {id:"BOILERS",label:"Boiler Plant",sub:"Boilers 01-04",type:"boiler",x:50,y:18},
      {id:"HW-SUPPLY",label:"Hot-Water Supply Header",type:"header",x:50,y:42},
      {id:"HWP-01",label:"HWP-01",sub:"DP-controlled VFD",type:"pump",asset:"HWP-01",x:38,y:65},
      {id:"HWP-02",label:"HWP-02",sub:"DP-controlled VFD",type:"pump",asset:"HWP-02",x:62,y:65},
      {id:"HEATING-LOADS",label:"AHU Heating Coils / Loads",type:"load",x:50,y:88}
    ],
    links:[["BOILERS","HW-SUPPLY"],["HW-SUPPLY","HWP-01"],["HW-SUPPLY","HWP-02"],["HWP-01","HEATING-LOADS"],["HWP-02","HEATING-LOADS"],["HEATING-LOADS","BOILERS"]],
    commonSymptoms:[{name:"Low hot-water DP",checks:["Verify DP transmitter against calibrated gauges.","Check HWP lead/lag status, command, VFD speed, and actual pump DP.","Confirm pump rotation, valve lineup, strainers, and available boiler supply temperature."]}]
  }
};
