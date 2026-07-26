const facilityOperationsManual = {
  title:"Facility Operations Manual",
  site:"Cambrex – Durham Site",
  purpose:"A searchable operating reference built from the facility documents and confirmed FacilityIQ relationships. Use it with approved SOPs, permits, LOTO, training, and manufacturer instructions.",
  sources:[
    {name:"Facility Operations Manual – Final",file:"manuals/operations/Facility_Operations_Manual_FINAL.docx",status:"Primary source"},
    {name:"Facilities prompts and draft notes",file:"manuals/operations/Ptompts.A.rtf",status:"Draft source; verify incomplete fields"},
    {name:"Topics",file:"manuals/operations/Topics.docx",status:"Source file contained no readable topic text"}
  ],
  sections:[
    {
      id:"desigo",title:"Building Automation System (Desigo)",category:"Controls",
      summary:"Desigo is the primary interface for building HVAC, utilities, exhaust, and space-control monitoring.",
      facts:["Controls air handlers, chillers, boilers, exhaust fans, unit heaters, temperature control, CAV/VAV systems, utility pumps, and most fume hoods.","Operators can review and trend points and, when authorized, adjust setpoints or overrides.","The source manual identifies Lab 400 fume hoods as an exception to normal Desigo fume-hood control; confirm the current local/control arrangement."],
      operations:["Record current value, setpoint, operating mode, command, feedback, alarm, schedule, and override before changing anything.","Use trends to compare demand, command, physical response, and system result rather than relying on a single snapshot.","Remove temporary overrides after testing and document approved changes."],
      safety:"Never use a software command or displayed feedback as proof that equipment is electrically or mechanically safe.",
      verify:["Confirm current point names, user permissions, alarm routing, and the Lab 400 control exception."]
    },
    {
      id:"ahu",title:"Air Handling Units",category:"HVAC",
      summary:"Building AHUs provide ventilation, temperature control, and airflow management through Desigo.",
      facts:["AHU-01, AHU-02, and AHU-04 are described as having outside-air-temperature-based return-fan setpoint control.","AHU-05 and AHU-06 are described as not using return-fan temperature-based control.","Cooling depends on the chilled-water plant. Pneumatic AHU heating and cooling valves depend on the dedicated Control Air Compressor and dryer.","AHU heating valves are normally open and cooling valves are normally closed."],
      operations:["For a space complaint, begin with occupancy, effective setpoint, sensor accuracy, serving terminal, airflow, damper response, and VAV heating-valve response.","For widespread warm conditions, check chilled-water supply versus active setpoint, secondary-loop DP, and common control-air pressure before investigating every AHU independently.","Verify return-fan reset logic against outside-air temperature for AHU-01, AHU-02, and AHU-04."],
      safety:"Follow LOTO and pressure/temperature precautions before accessing fans, coils, dampers, valves, or ductwork.",
      verify:["The source manual lists AHU-01 and AHU-02 in Mechanical Room 805 and AHU-04 in 804, while the current asset catalog lists AHU-01/02 in 804 and AHU-04 in 805. Confirm field labels before correcting the catalog.","Confirm the AHU zoning/layout drawing referenced by the source document."]
    },
    {
      id:"space-controls",title:"CAV / VAV Space Controls",category:"HVAC",
      summary:"Each controlled area has a thermostat associated with a dedicated CAV or VAV terminal.",
      facts:["VAV airflow modulates with demand.","Every VAV has a heating valve.","The source manual describes CAV airflow as constant with temperature controlled through reheat.","HWP-01 and HWP-02 distribute hot water to AHU coils and terminal reheat loads."],
      operations:["Compare room temperature with the effective heating and cooling setpoints and verify occupancy and overrides.","Compare terminal airflow setpoint with actual airflow and damper command with physical response.","For a VAV heating call, compare valve command with physical position and confirm discharge air warms above inlet air.","For overheating, verify the VAV heating valve closes and produces no unintended temperature rise."],
      safety:"Do not force a terminal damper or heating valve without reviewing ventilation, pressure, hot-water, and room-control requirements.",
      verify:["Record each room’s terminal type, tag, design/minimum airflow, Desigo points, and heating-valve details."]
    },
    {
      id:"chilled-water",title:"Chilled-Water System",category:"Plant",
      summary:"A primary-secondary chilled-water plant supplies the building AHU cooling coils.",
      facts:["The source manual identifies a 300-ton Trane chiller as primary and a 400-ton York chiller as secondary.","The York chiller is described as enabling when the Trane exceeds 95% capacity for more than 20 minutes.","Each chiller has a dedicated primary pump; secondary pumps distribute water to the AHUs.","Secondary-pump speed is controlled from chilled-water differential pressure."],
      operations:["Compare actual chilled-water supply temperature with the active Desigo setpoint.","Confirm the enabled chiller’s dedicated primary pump and proven evaporator flow.","Check secondary-pump lead/lag status, command, speed, differential pressure, valve lineup, strainers, and air binding.","When staging is suspected, trend Trane capacity and verify the 95%-for-20-minutes condition and York enable."],
      safety:"Follow electrical, refrigerant, rotating-equipment, and pressurized-water procedures. Do not bypass flow or freeze protection.",
      verify:["Confirm current chiller capacities and the approved staging sequence before using the documented 95%/20-minute value as an operating authority."]
    },
    {
      id:"hot-water",title:"Hot-Water System / Heating",category:"Plant",
      summary:"Four gas boilers and two DP-controlled hot-water pumps serve AHU and terminal heating loads.",
      facts:["HWP-01 and HWP-02 circulate hot water to AHUs and CAV/VAV reheat loads.","Pump speed is controlled by hot-water differential pressure.","The source manual describes three boilers as lead units and Boiler-04 as the lag boiler enabled when supply temperature drops."],
      operations:["Compare hot-water supply temperature with active setpoint and review boiler enable, firing, alarms, and lead/lag state.","Check HWP command, status, speed, loop DP, isolation valves, strainers, and distribution.","For one cold space, verify the local VAV heating valve and temperature rise before escalating to the plant."],
      safety:"Gas, combustion, flame-safeguard, hot-water, and electrical work requires qualified personnel and approved procedures.",
      verify:["Confirm the current boiler lead/lag rotation, Boiler-04 enable threshold, and mechanical-room assignments."]
    },
    {
      id:"lab-exhaust",title:"Paired Laboratory and Fume-Hood Exhaust",category:"Laboratory",
      summary:"Five pairs of roof fans share ductwork and serve grouped laboratory exhaust loads.",
      facts:["EF-10/11: all fume hoods in Labs 400 and 505.","EF-21/22: all fume hoods in Labs 430 and 440.","EF-25/26: all fume hoods in Labs 415 and 420 plus the sink exhaust in Lab 414.","EF-27/28: all fume hoods in Labs 450 and 460.","EF-30/31: Bio-side laboratory fume hoods and exhaust points.","The source manual describes duct-static control through Desigo with roof dampers modulating as pressure changes."],
      operations:["For a pair-wide complaint, check both fans’ enable, proof, speed, current, faults, rotation, and disconnects, then compare common duct static with setpoint.","If all connected points are affected, check shared controls, static sensor, roof/common dampers, common duct and discharge, make-up air, and simultaneous demand.","If one point is affected, check its hood/sink pickup, sash, alarm, airflow controller, branch damper, sensor, and branch duct.","Verify hood face velocity or approved containment performance before returning a hood to use."],
      safety:"Treat inadequate fume-hood capture as a laboratory safety condition. Follow hood-outage procedures and do not open contaminated ductwork without authorization and PPE.",
      verify:["Confirm the approved duct-static setpoints, damper fail positions, fan sequence, hood face-velocity setpoints, Lab 400 controls, and individual Bio-side lab assignments."]
    },
    {
      id:"fume-hoods",title:"Fume-Hood Controls",category:"Laboratory",
      summary:"Fume-hood containment is maintained through face-velocity control and a modulating damper above each hood.",
      facts:["The source manual states that face velocity is maintained at a defined setpoint.","Each hood uses a damper above the unit to modulate airflow.","Most hood control is described as integrated with Desigo, with Lab 400 noted as an exception."],
      operations:["Check sash position, hood alarm, face-velocity actual and setpoint, controller command, damper feedback, local sensor, branch static, and make-up air.","Compare a failing hood with a normal hood on the same paired fan system to separate local and common causes.","Change a face-velocity setpoint only under an approved containment/safety procedure."],
      safety:"Do not silence or bypass a hood alarm as a substitute for verified containment.",
      verify:["Confirm hood inventory, controller tags, approved face-velocity criteria, alarm routing, and pneumatic/electronic actuator type."]
    },
    {
      id:"room-503",title:"Room 503 Low-Humidity System",category:"Special Systems",
      summary:"Room 503 uses a dedicated Bry-Air dehumidifier and rooftop 503 chiller rather than AHU-02.",
      facts:["The Aircon Tech / MultiAqua chiller model is MAC-060HE-03 and provides dedicated cooling as the dehumidifier adds heat while removing moisture.","Draft notes identify the Bry-Air unit as model MP-900, located above the hallway ceiling in front of Lab 503.","The room terminal is identified in the draft as TEC-503.","The draft calls for quarterly preventive maintenance and operational checks on both components."],
      operations:["Check humidity and temperature actual versus setpoint, Bry-Air status, process and reactivation airflow, rotor rotation, reactivation heat, and alarms.","Verify the 503 chiller enable, leaving-water temperature, flow, cooling-valve response, and coil performance.","Use dew point or moisture-content measurements when evaluating dehumidification performance."],
      safety:"Follow electrical, refrigerant, hot-surface, rotating-equipment, and ceiling-access procedures.",
      verify:["Confirm Bry-Air model MP-900, terminal tag TEC-503, PM scope, and exact access location before finalizing the asset record."]
    },
    {
      id:"compressed-air",title:"Compressed-Air Systems",category:"Utilities",
      summary:"The facility has separate AHU pneumatic control air and laboratory compressed-air services.",
      facts:["The dedicated Control Air Compressor and dryer supply pneumatic control air to AHU heating and cooling valves.","House Air Compressors 01–03 supply laboratory compressed-air demand and do not control AHU valves.","Draft notes describe a low-pressure backup arrangement at approximately 30 PSI and mention pneumatic fume-hood actuators."],
      operations:["For AHU valve problems, check Control-AC, dryer, receiver/header pressure, regulators, isolation valves, tubing, branch pressure, and actuator response.","For low laboratory air pressure, check House Air Compressor status, receiver/header pressure, demand, drains, regulators, isolation valves, and leaks.","Keep AHU control-air and laboratory-air diagnoses separate unless an approved cross-connect/backup arrangement is confirmed."],
      safety:"Isolate and depressurize before pneumatic service. Do not defeat valve or damper fail-safe operation.",
      verify:["The draft’s compressor count/location and fume-hood actuator supply description conflict with previously confirmed system separation. Field-verify the 30-PSI backup valves, cross-connections, and fume-hood actuator air source before incorporating them into active troubleshooting logic."]
    },
    {
      id:"generator-ups",title:"Emergency Generator and UPS",category:"Critical Power",
      summary:"The generator supports selected critical loads while the UPS bridges outages and transfers to generator-backed power.",
      facts:["The source manual describes a Cummins 500 kW generator with a 1,200-gallon fuel tank.","Listed generator-supported loads include stability chambers, UPS systems, BAS, exhaust fans, and lighting.","The source states that boilers, chillers, and AHUs are not generator-supported.","The Eaton UPS is described as 200 kW with approximately 40 minutes of current runtime if the generator does not start."],
      operations:["During an outage, confirm UPS transfer to battery, generator start and stabilization, ATS transfer, UPS return to acceptable input, and battery recharge.","Prioritize supported critical loads and monitor UPS runtime, load, alarms, temperature, and battery condition.","Do not expect boilers, chillers, or AHUs to run on emergency power unless the electrical one-line confirms otherwise."],
      safety:"Generator, ATS, UPS, and distribution equipment contain lethal energy and may remain energized from multiple sources.",
      verify:["Confirm current generator rating/tank usable capacity, supported-load list, ATS lineup, UPS runtime test results, and one-line diagrams."]
    },
    {
      id:"rtu",title:"Roof-Top Units",category:"HVAC",
      summary:"Draft notes identify 16 gas-fired roof-top units serving office and support areas.",
      facts:["Most are described as serving Biology-side offices.","Chemistry-side RTUs are described as serving the break room, QA offices, 700 offices, and Q1 area.","Draft preventive maintenance frequency is every six months, including filters and operational checks."],
      operations:["For no cooling/heating, verify thermostat demand, schedule, power, safeties, fan, filters, airflow, gas heat or refrigeration sequence, and alarms.","Record each RTU tag, served area, manufacturer, model, capacity, thermostat, filter size, and control points."],
      safety:"Use roof fall protection, LOTO, gas, combustion, refrigerant, and electrical procedures.",
      verify:["The CSV now registers 16 tagged RTUs plus the Liebert Room 258 unit. Confirm each RTU’s served area, installed heat option, thermostat/Desigo points, refrigerant, filter size, and complete model suffix."]
    },
    {
      id:"fire-sprinkler",title:"Fire Alarm and Sprinkler Systems",category:"Life Safety",
      summary:"Draft notes describe an Edwards fire-alarm panel, two wet sprinkler systems, and one pre-action system.",
      facts:["The fire alarm is described as monitored by EverOn and serviced/tested by Cintas.","Draft PM frequency is every six months for fire-alarm functional testing.","The pre-action sprinkler system is described near shipping/receiving; wet systems are described near the rear FACP/generator/chiller area.","Draft sprinkler inspection frequencies include three quarterly visits, one annual inspection, and a five-year inspection."],
      operations:["Use only the posted panel instructions and approved impairment/testing process.","Coordinate monitoring bypass/offline status with the property-management and monitoring parties before authorized testing.","Restore every bypass and confirm normal panel status after testing."],
      safety:"Life-safety impairments and testing require authorized qualified personnel, notifications, fire-watch/impairment controls where required, and documented restoration.",
      verify:["Panel room and several system locations are blank or incomplete in the draft. Confirm vendor roles, monitoring path, exact inspection schedule, zones, valve locations, and current impairment procedure."]
    },
    {
      id:"access-control",title:"OnGuard Access Control",category:"Security",
      summary:"OnGuard manages personnel badge access and controlled-door status.",
      facts:["Functions described include adding/removing access, issuing badges, controlling doors, and authorized lock/unlock overrides."],
      operations:["Apply least-privilege access, document changes, protect credentials and badge stock, and verify temporary overrides are removed.","Escalate door hardware, life-safety egress, or integration faults through the approved security process."],
      safety:"Never override required egress, fire-door, or emergency-access behavior.",
      verify:["Confirm administrator roles, approval workflow, audit retention, emergency procedures, and system/vendor contacts."]
    }
  ]
};
