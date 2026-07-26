const facilityOperationsManual = {
  title:"Facility Knowledge Base",
  site:"Cambrex – Durham Site",
  purpose:"Operating reference for facility systems, equipment relationships, normal sequences, field checks, and safety requirements. Use this guide with approved SOPs, permits, lockout/tagout (LOTO), training, and manufacturer instructions.",
  sections:[
    {
      id:"desigo",title:"Building Automation System (Desigo)",category:"Controls",
      summary:"Desigo is the building automation system used to see HVAC conditions, commands, alarms, schedules, and trends from one place.",
      facts:["Desigo controls air handlers, chillers, boilers, exhaust fans, unit heaters, temperature control, CAV/VAV systems, utility pumps, and most fume hoods.","Authorized operators can review trends and adjust approved setpoints or overrides.","Lab 400 fume hoods use a separate control arrangement from the standard Desigo fume-hood sequence."],
      operations:["Record current value, setpoint, operating mode, command, feedback, alarm, schedule, and override before changing anything.","Use trends to compare demand, command, physical response, and system result rather than relying on a single snapshot.","Remove temporary overrides after testing and document approved changes."],
      safety:"Never use a software command or displayed feedback as proof that equipment is electrically or mechanically safe.",
      verify:["Confirm current point names, user permissions, alarm routing, and the Lab 400 control exception."]
    },
    {
      id:"ahu",title:"Air Handling Units",category:"HVAC",
      summary:"The air handling units (AHUs) move and condition building air. Desigo commands the units, while chilled water, hot water, and pneumatic control air allow the coils and valves to respond.",
      facts:["AHU-01, AHU-02, and AHU-04 use outside-air-temperature-based return-fan setpoint control.","AHU-05 and AHU-06 do not use return-fan temperature reset.","Cooling depends on the chilled-water plant. Pneumatic AHU heating and cooling valves depend on the dedicated Control Air Compressor and dryer.","AHU heating valves are normally open and cooling valves are normally closed."],
      operations:["For a space complaint, begin with occupancy, effective setpoint, sensor accuracy, serving terminal, airflow, damper response, and VAV heating-valve response.","For widespread warm conditions, check chilled-water supply versus active setpoint, secondary-loop DP, and common control-air pressure before investigating every AHU independently.","Verify return-fan reset logic against outside-air temperature for AHU-01, AHU-02, and AHU-04."],
      safety:"Follow LOTO and pressure/temperature precautions before accessing fans, coils, dampers, valves, or ductwork.",
      verify:["Verify the field labels for AHU-01 and AHU-02 in Room 804, AHU-04 and AHU-05 in Room 805, and AHU-06 in Room 182.","Maintain a current AHU zoning and room-assignment drawing."]
    },
    {
      id:"space-controls",title:"CAV / VAV Space Controls",category:"HVAC",
      summary:"Each controlled room or laboratory has a thermostat and a dedicated terminal. A constant-air-volume (CAV) terminal maintains airflow; a variable-air-volume (VAV) terminal changes airflow with demand.",
      facts:["VAV means variable air volume: the terminal changes airflow to meet space demand.","Every VAV has a hot-water heating valve for reheat.","CAV means constant air volume: airflow stays generally constant while temperature is adjusted with reheat.","HWP-01 and HWP-02 distribute hot water to AHU coils and terminal reheat loads."],
      operations:["Compare room temperature with the effective heating and cooling setpoints and verify occupancy and overrides.","Compare terminal airflow setpoint with actual airflow and damper command with physical response.","For a VAV heating call, compare valve command with physical position and confirm discharge air warms above inlet air.","For overheating, verify the VAV heating valve closes and produces no unintended temperature rise."],
      safety:"Do not force a terminal damper or heating valve without reviewing ventilation, pressure, hot-water, and room-control requirements.",
      verify:["Record each room’s terminal type, tag, design/minimum airflow, Desigo points, and heating-valve details."]
    },
    {
      id:"chilled-water",title:"Chilled-Water System",category:"Plant",
      summary:"The chilled-water plant removes heat from the building. Each chiller has a dedicated primary pump, while the secondary pumps move chilled water through the building to AHU cooling coils.",
      facts:["The 300-ton Trane chiller is the primary unit and the 400-ton York chiller is the secondary unit.","The York chiller enables when Trane chiller capacity remains above 95% for more than 20 minutes.","Each chiller has a dedicated primary pump; secondary pumps distribute water to the AHUs.","Secondary-pump speed is controlled from chilled-water differential pressure (DP), the pressure difference between the supply and return sides of the loop."],
      operations:["Compare actual chilled-water supply temperature with the active Desigo setpoint.","Confirm the enabled chiller’s dedicated primary pump and proven evaporator flow.","Check secondary-pump lead/lag status, command, speed, differential pressure, valve lineup, strainers, and air binding.","When staging is suspected, trend Trane capacity and verify the 95%-for-20-minutes condition and York enable."],
      safety:"Follow electrical, refrigerant, rotating-equipment, and pressurized-water procedures. Do not bypass flow or freeze protection.",
      verify:["Confirm current chiller capacities and the approved staging sequence before using the documented 95%/20-minute value as an operating authority."]
    },
    {
      id:"hot-water",title:"Hot-Water System / Heating",category:"Plant",
      summary:"Four gas-fired boilers heat the closed hot-water loop. Two pumps maintain loop differential pressure and deliver hot water to AHU coils and room-terminal reheat valves.",
      facts:["HWP-01 and HWP-02 circulate hot water to AHUs and CAV/VAV reheat loads.","Pump speed is controlled by hot-water differential pressure.","Boilers 01–03 operate as lead units. Boiler-04 is the lag unit and enables when hot-water supply temperature drops below the staging threshold."],
      operations:["Compare hot-water supply temperature with active setpoint and review boiler enable, firing, alarms, and lead/lag state.","Check HWP command, status, speed, loop DP, isolation valves, strainers, and distribution.","For one cold space, verify the local VAV heating valve and temperature rise before escalating to the plant."],
      safety:"Gas, combustion, flame-safeguard, hot-water, and electrical work requires qualified personnel and approved procedures.",
      verify:["Confirm the current boiler lead/lag rotation, Boiler-04 enable threshold, and mechanical-room assignments."]
    },
    {
      id:"lab-exhaust",title:"Paired Laboratory and Fume-Hood Exhaust",category:"Laboratory",
      summary:"Five paired fan systems exhaust groups of fume hoods through shared ductwork. A problem affecting one hood is usually local; a problem affecting every hood on a pair usually points to the fans, common duct, static-pressure control, or make-up air.",
      facts:["EF-10/11: all fume hoods in Labs 400 and 505.","EF-21/22: all fume hoods in Labs 430 and 440.","EF-25/26: all fume hoods in Labs 415 and 420 plus the sink exhaust in Lab 414.","EF-27/28: all fume hoods in Labs 450 and 460.","EF-30/31: Bio-side laboratory fume hoods and exhaust points.","Desigo maintains duct static pressure by modulating the roof dampers as system pressure changes."],
      operations:["For a pair-wide complaint, check both fans’ enable, proof, speed, current, faults, rotation, and disconnects, then compare common duct static with setpoint.","If all connected points are affected, check shared controls, static sensor, roof/common dampers, common duct and discharge, make-up air, and simultaneous demand.","If one point is affected, check its hood/sink pickup, sash, alarm, airflow controller, branch damper, sensor, and branch duct.","Verify hood face velocity or approved containment performance before returning a hood to use."],
      safety:"Treat inadequate fume-hood capture as a laboratory safety condition. Follow hood-outage procedures and do not open contaminated ductwork without authorization and PPE.",
      verify:["Confirm the approved duct-static setpoints, damper fail positions, fan sequence, hood face-velocity setpoints, Lab 400 controls, and individual Bio-side lab assignments."]
    },
    {
      id:"fume-hoods",title:"Fume-Hood Controls",category:"Laboratory",
      summary:"A fume hood protects the user by drawing air inward through the sash opening. Face velocity is the speed of that inward air, and the hood damper modulates to maintain the approved value.",
      facts:["Each fume hood maintains its approved face-velocity setpoint.","A damper above each hood modulates airflow.","Most fume hoods are integrated with Desigo. Lab 400 uses a separate control arrangement."],
      operations:["Check sash position, hood alarm, face-velocity actual and setpoint, controller command, damper feedback, local sensor, branch static, and make-up air.","Compare a failing hood with a normal hood on the same paired fan system to separate local and common causes.","Change a face-velocity setpoint only under an approved containment/safety procedure."],
      safety:"Do not silence or bypass a hood alarm as a substitute for verified containment.",
      verify:["Confirm hood inventory, controller tags, approved face-velocity criteria, alarm routing, and pneumatic/electronic actuator type."]
    },
    {
      id:"room-503",title:"Room 503 Low-Humidity System",category:"Special Systems",
      summary:"Room/Lab 503 is not served by AHU-02. Its dedicated Bry-Air dehumidifier removes moisture, while the rooftop 503 chiller offsets heat added during dehumidification.",
      facts:["The Aircon Tech / MultiAqua MAC-060HE-03 chiller provides dedicated cooling as the dehumidifier adds heat while removing moisture.","The Bry-Air MP-900 is located above the hallway ceiling in front of Lab 503.","The Room 503 terminal is tagged TEC-503.","Perform preventive maintenance and operational checks on both components quarterly."],
      operations:["Check humidity and temperature actual versus setpoint, Bry-Air status, process and reactivation airflow, rotor rotation, reactivation heat, and alarms.","Verify the 503 chiller enable, leaving-water temperature, flow, cooling-valve response, and coil performance.","Use dew point or moisture-content measurements when evaluating dehumidification performance."],
      safety:"Follow electrical, refrigerant, hot-surface, rotating-equipment, and ceiling-access procedures.",
      verify:["Confirm Bry-Air model MP-900, terminal tag TEC-503, PM scope, and exact access location before finalizing the asset record."]
    },
    {
      id:"compressed-air",title:"Compressed-Air Systems",category:"Utilities",
      summary:"The facility has two different compressed-air systems. Control air operates AHU pneumatic valves. House air supplies laboratory users. Troubleshoot them as separate systems.",
      facts:["The dedicated Control Air Compressor and dryer supply pneumatic control air to AHU heating and cooling valves.","House Air Compressors 01–03 supply laboratory compressed-air demand and do not control AHU valves.","Each House Air Compressor has its own dedicated refrigerated air dryer: 01 to 01, 02 to 02, and 03 to 03.","A low-pressure backup arrangement is set near 30 PSI. Verify the valve lineup before relying on backup operation."],
      operations:["For AHU valve problems, check Control-AC, dryer, receiver/header pressure, regulators, isolation valves, tubing, branch pressure, and actuator response.","For low laboratory air pressure, check the active House Air Compressor and its dedicated air dryer, receiver/header pressure, pressure drop, demand, drains, regulators, isolation valves, and leaks.","For wet laboratory air, verify the serving dryer refrigeration circuit, condenser airflow, separator, automatic drain, filters, bypass position, and outlet dew point.","Keep AHU control-air and laboratory-air diagnoses separate unless an approved cross-connect/backup arrangement is confirmed."],
      safety:"Isolate and depressurize before pneumatic service. Do not defeat valve or damper fail-safe operation.",
      verify:["Verify the 30-PSI backup valves, cross-connections, and fume-hood actuator air source in the field. Keep control-air and house-air troubleshooting separate until the active valve lineup is confirmed."]
    },
    {
      id:"generator-ups",title:"Emergency Generator and UPS",category:"Critical Power",
      summary:"The UPS carries protected loads immediately when utility power fails. The emergency generator then starts and the transfer switches move approved loads to generator power.",
      facts:["The Cummins generator is rated 500 kW and uses a 1,200-gallon fuel tank.","Generator-supported loads include stability chambers, UPS systems, BAS, exhaust fans, and lighting.","Boilers, chillers, and AHUs are not generator-supported.","The Eaton UPS is rated 200 kW and currently provides approximately 40 minutes of runtime when the generator does not start."],
      operations:["During an outage, confirm UPS transfer to battery, generator start and stabilization, ATS transfer, UPS return to acceptable input, and battery recharge.","Prioritize supported critical loads and monitor UPS runtime, load, alarms, temperature, and battery condition.","Do not expect boilers, chillers, or AHUs to run on emergency power unless the electrical one-line confirms otherwise."],
      safety:"Generator, ATS, UPS, and distribution equipment contain lethal energy and may remain energized from multiple sources.",
      verify:["Confirm current generator rating/tank usable capacity, supported-load list, ATS lineup, UPS runtime test results, and one-line diagrams."]
    },
    {
      id:"rtu",title:"Roof-Top Units",category:"HVAC",
      summary:"Sixteen packaged roof-top units (RTUs) provide heating, cooling, and ventilation to office and support areas. The Room 258 Liebert is a separate precision-cooling unit.",
      facts:["Most RTUs serve Biology-side offices.","Chemistry-side RTUs serve the break room, QA offices, 700 offices, and Q1 area.","Perform filter service and operational preventive maintenance every six months."],
      operations:["For no cooling/heating, verify thermostat demand, schedule, power, safeties, fan, filters, airflow, gas heat or refrigeration sequence, and alarms.","Record each RTU tag, served area, manufacturer, model, capacity, thermostat, filter size, and control points."],
      safety:"Use roof fall protection, LOTO, gas, combustion, refrigerant, and electrical procedures.",
      verify:["The asset register includes 16 tagged RTUs plus the Liebert Room 258 unit. Maintain verified records for each RTU’s served area, installed heat option, thermostat or Desigo points, refrigerant, filter size, and complete model suffix."]
    },
    {
      id:"fire-sprinkler",title:"Fire Alarm and Sprinkler Systems",category:"Life Safety",
      summary:"The life-safety system includes an Edwards fire-alarm panel, two wet sprinkler systems, and one pre-action sprinkler system.",
      facts:["EverOn monitors the fire-alarm system; Cintas performs service and testing.","Perform fire-alarm functional testing every six months.","The pre-action sprinkler system serves the shipping/receiving area. Wet-system equipment is located near the rear FACP, generator, and chiller area.","The sprinkler inspection program includes three quarterly visits, one annual inspection, and a five-year inspection."],
      operations:["Use only the posted panel instructions and approved impairment/testing process.","Coordinate monitoring bypass/offline status with the property-management and monitoring parties before authorized testing.","Restore every bypass and confirm normal panel status after testing."],
      safety:"Life-safety impairments and testing require authorized qualified personnel, notifications, fire-watch/impairment controls where required, and documented restoration.",
      verify:["Maintain current records for the panel room, vendor roles, monitoring path, inspection schedule, zones, valve locations, and impairment procedure."]
    },
    {
      id:"access-control",title:"OnGuard Access Control",category:"Security",
      summary:"OnGuard manages personnel badge access and controlled-door status.",
      facts:["OnGuard adds or removes access, issues badges, monitors controlled doors, and applies authorized lock or unlock overrides."],
      operations:["Apply least-privilege access, document changes, protect credentials and badge stock, and verify temporary overrides are removed.","Escalate door hardware, life-safety egress, or integration faults through the approved security process."],
      safety:"Never override required egress, fire-door, or emergency-access behavior.",
      verify:["Confirm administrator roles, approval workflow, audit retention, emergency procedures, and system/vendor contacts."]
    }
  ]
};
