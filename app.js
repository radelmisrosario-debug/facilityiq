const sharedBoilerProblems = [
  {id:"will-not-fire",name:"Boiler Will Not Fire",description:"No burner operation during a call for heat.",startStep:"B-FIRE-001"},
  {id:"ignition-lockout",name:"Ignition Lockout or Flame Failure",description:"Ignition sequence starts but flame is not established or proven.",startStep:"B-IGN-001"},
  {id:"low-water-flow",name:"Low Water Flow / Flow Switch",description:"Flow switch, LWCO, or circulation condition prevents operation.",startStep:"B-FLOW-001"},
  {id:"high-limit",name:"High Temperature or Limit Trip",description:"Unit shuts down on high temperature or limit control.",startStep:"B-HIGH-001"},
  {id:"combustion-air",name:"Combustion Air or Draft Problem",description:"Blower, pressure switch, venting, or combustion airflow issue.",startStep:"B-AIR-001"}
];

const vacuumProblems = [
  {id:"low-vacuum",name:"Final Vacuum Not Reached",description:"The pump cannot achieve the expected final pressure.",startStep:"V-VAC-001"},
  {id:"low-capacity",name:"Low Suction Capacity",description:"The pump runs but moves less air than expected.",startStep:"V-CAP-001"},
  {id:"overheating",name:"Pump Overheating",description:"Pump temperature is higher than normal.",startStep:"V-HOT-001"},
  {id:"oil-mist",name:"Visible Oil Mist",description:"Oil mist is visible in the exhaust.",startStep:"V-OIL-001"},
  {id:"abnormal-noise",name:"Abnormal Noise",description:"Noise continues after normal cold-start warm-up.",startStep:"V-NOISE-001"},
  {id:"motor-trip",name:"Motor Protection Trip",description:"Pump shuts off on motor protection.",startStep:"V-MOTOR-001"}
];

const compressorProblems = [
  {id:"no-start",name:"Compressor Will Not Start",description:"The compressor does not run when commanded.",startStep:"C-START-001"},
  {id:"high-temp",name:"High Oil / Element Temperature",description:"High-temperature protection or red warning is active.",startStep:"C-HOT-001"},
  {id:"low-pressure",name:"Will Not Reach Working Pressure",description:"Compressor runs but system pressure remains low.",startStep:"C-PRESS-001"},
  {id:"oil-use",name:"Excessive Oil Consumption",description:"Oil level drops or oil carryover is suspected.",startStep:"C-OIL-001"}
];

const dryerProblems = [
  {id:"no-airflow",name:"No Air Through Dryer",description:"Compressed air does not pass through the dryer outlet.",startStep:"D-AIR-001"},
  {id:"wet-air",name:"Condensate in Air Piping",description:"Water is present downstream of the dryer.",startStep:"D-WET-001"},
  {id:"hot-compressor",name:"Refrigeration Compressor Very Hot",description:"Compressor head temperature exceeds normal condition.",startStep:"D-HOT-001"},
  {id:"no-start",name:"Dryer Motor Hums or Will Not Start",description:"The refrigeration compressor does not start normally.",startStep:"D-START-001"},
  {id:"noisy",name:"Dryer Compressor Very Noisy",description:"Abnormal mechanical noise is present.",startStep:"D-NOISE-001"}
];

const generatorProblems = [
  {id:"will-not-crank",name:"Engine Will Not Crank",description:"Starter does not turn the engine.",startStep:"G-CRANK-001"},
  {id:"shutdown",name:"Generator Shutdown / Fault Lamp",description:"Engine shut down because of a monitored fault.",startStep:"G-FAULT-001"},
  {id:"no-output",name:"No AC Output Voltage",description:"Engine runs but generator output is unavailable.",startStep:"G-AC-001"},
  {id:"no-remote-start",name:"No Automatic or Remote Start",description:"Starts locally but not from ATS or remote signal.",startStep:"G-REMOTE-001"}
];

const ahuProblems = [
  {id:"will-not-start",name:"Unit Will Not Start",description:"Supply fan does not operate when enabled.",startStep:"AHU-START-001"},
  {id:"high-space-temperature",name:"High Space Temperature",description:"Served space is warmer than required.",startStep:"AHU-TEMP-001"},
  {id:"low-airflow",name:"Low Airflow",description:"Airflow appears lower than normal.",startStep:"AHU-AIR-001"},
  {id:"high-sat",name:"High Supply Air Temperature",description:"Supply air is above its cooling setpoint.",startStep:"AHU-SAT-001"},
  {id:"vfd-fault",name:"VFD or Fan Fault",description:"Drive, motor, or fan has an abnormal condition.",startStep:"AHU-VFD-001"}
];

const assets = {
  "AHU-01":{id:"AHU-01",name:"Air Handling Unit 01",category:"Air Handling Unit",manufacturer:"To be confirmed",model:"To be confirmed",location:"Room 804",manual:null,problems:ahuProblems},
  "AHU-02":{id:"AHU-02",name:"Air Handling Unit 02",category:"Air Handling Unit",manufacturer:"To be confirmed",model:"To be confirmed",location:"Room 804",manual:null,problems:ahuProblems},
  "AHU-04":{id:"AHU-04",name:"Air Handling Unit 04",category:"Air Handling Unit",manufacturer:"To be confirmed",model:"To be confirmed",location:"Room 805",manual:null,problems:ahuProblems},
  "AHU-05":{id:"AHU-05",name:"Air Handling Unit 05",category:"Air Handling Unit",manufacturer:"To be confirmed",model:"To be confirmed",location:"Location to be confirmed",manual:null,problems:ahuProblems},
  "AHU-06":{id:"AHU-06",name:"Air Handling Unit 06",category:"Air Handling Unit",manufacturer:"To be confirmed",model:"To be confirmed",location:"Room 192",manual:null,problems:ahuProblems},

  "Boiler-01":{id:"Boiler-01",name:"Hydronic Boiler 01",category:"Hydronic Boiler",manufacturer:"Lochinvar",model:"399,999–2,070,000 Btu/hr family",location:"Room 805",manual:"manuals/Boiler-01.pdf",problems:sharedBoilerProblems},
  "Boiler-02":{id:"Boiler-02",name:"Copper-Fin II Boiler 02",category:"Hydronic Boiler",manufacturer:"Lochinvar",model:"Copper-Fin II 402–2072",location:"Room 805",manual:"manuals/Boiler-02.pdf",problems:sharedBoilerProblems},
  "Boiler-03":{id:"Boiler-03",name:"Hydronic Boiler 03",category:"Hydronic Boiler",manufacturer:"Lochinvar",model:"399,999–2,070,000 Btu/hr family",location:"Room 805",manual:"manuals/Boiler-03.pdf",problems:sharedBoilerProblems},
  "Boiler-04":{id:"Boiler-04",name:"Raytherm Boiler 04",category:"Hydronic Boiler",manufacturer:"Raypak",model:"Raytherm 133–4001",location:"Room 805",manual:"manuals/Boiler-04.pdf",problems:sharedBoilerProblems},

  "CHEM-VACP-01":{id:"CHEM-VACP-01",name:"Chemistry Vacuum Pump 01",category:"Rotary Vane Vacuum Pump",manufacturer:"Elmo Rietschle / Gardner Denver",model:"V-VC 202 / 303",location:"Room 805",manual:"manuals/CHEM-VACP-01.pdf",problems:vacuumProblems},
  "CHEM-VACP-02":{id:"CHEM-VACP-02",name:"Chemistry Vacuum Pump 02",category:"Rotary Vane Vacuum Pump",manufacturer:"Elmo Rietschle / Gardner Denver",model:"V-VC 202 / 303",location:"Room 805",manual:"manuals/CHEM-VACP-02.pdf",problems:vacuumProblems},

  "Control-AC":{id:"Control-AC",name:"Control Air Compressor",category:"Rotary Screw Compressor",manufacturer:"To be confirmed",model:"3–10 HP / 2.2–7.5 kW family",location:"Room 805",manual:"manuals/Control-AC.pdf",problems:compressorProblems},
  "Control-AC-Air-Dryer":{id:"Control-AC-Air-Dryer",name:"Control Air Dryer",category:"Refrigerated Air Dryer",manufacturer:"To be confirmed",model:"DXR0010N–DXR0030N",location:"Room 805",manual:"manuals/Control-AC-Air-Dryer.pdf",problems:dryerProblems},
  "Cummins-Generator":{id:"Cummins-Generator",name:"Emergency Generator",category:"Standby Generator",manufacturer:"Cummins Power Generation",model:"DFEB / DFEC / DFFB family",location:"Exterior",manual:"manuals/Cummins-Generator.pdf",problems:generatorProblems}
};

const steps = {
  // Boiler
  "B-FIRE-001":{type:"question",text:"Is there a valid call for heat and power at the boiler?",safety:"Gas-fired boiler troubleshooting must be performed by qualified personnel.",yes:"B-FIRE-002",no:"B-FIRE-R01"},
  "B-FIRE-002":{type:"question",text:"Are all safety limits and water-flow permissives satisfied?",safety:"Do not bypass high limits, low-water cutoffs, flow switches, or flame safeguards.",yes:"B-FIRE-003",no:"B-FIRE-R02"},
  "B-FIRE-003":{type:"question",text:"Does the combustion-air blower start?",safety:"Keep panels and guards in place while equipment is energized.",yes:"B-FIRE-004",no:"B-FIRE-R03"},
  "B-FIRE-004":{type:"question",text:"Does the ignition sequence proceed to spark or hot-surface-igniter operation?",safety:"High voltage and fuel gas are present. Qualified technicians only.",yes:"B-IGN-002",no:"B-FIRE-R04"},
  "B-FIRE-R01":{type:"result",title:"No call for heat or control power",cause:"Possible schedule, thermostat/controller, disconnect, line-voltage, transformer, or wiring issue.",action:"Verify the call for heat, main power, control transformer output, controller output, and wiring.",safety:"De-energize before opening electrical compartments."},
  "B-FIRE-R02":{type:"result",title:"Safety or flow permissive is open",cause:"Possible high limit, low-water cutoff, flow switch, pressure switch, or other interlock condition.",action:"Identify the open device and correct the actual water-flow, temperature, pressure, or safety condition before reset.",safety:"Never jumper or bypass boiler safety devices."},
  "B-FIRE-R03":{type:"result",title:"Combustion-air blower does not operate",cause:"Possible relay, ignition-module output, fan motor, wiring, fuse, or power issue.",action:"Verify blower command, voltage, relay operation, wiring continuity, and motor condition.",safety:"Qualified electrical service only."},
  "B-FIRE-R04":{type:"result",title:"Ignition device does not energize",cause:"Possible ignition module, igniter, spark cable, fuse, grounding, or wiring failure.",action:"Follow the manual ignition checkout. Verify module output and inspect the igniter/spark circuit.",safety:"Do not test ignition circuits unless qualified for high-voltage and gas-fired equipment service."},

  "B-IGN-001":{type:"question",text:"Does the blower complete pre-purge and prove the air-pressure switch?",safety:"Do not bypass the air-pressure switch.",yes:"B-IGN-002",no:"B-IGN-R01"},
  "B-IGN-002":{type:"question",text:"Does the pilot or main burner establish flame?",safety:"If gas odor is present, stop immediately, do not operate switches, evacuate, and follow the site gas emergency procedure.",yes:"B-IGN-003",no:"B-IGN-R02"},
  "B-IGN-003":{type:"question",text:"Is flame proven and stable after ignition?",safety:"Observe through the approved viewing point only.",yes:"B-IGN-R04",no:"B-IGN-R03"},
  "B-IGN-R01":{type:"result",title:"Combustion-air proving failure",cause:"Possible blocked intake/vent, dirty combustion-air filter, incorrect differential pressure, weak blower, pressure-switch problem, or down-draft.",action:"Inspect intake and venting, clean filters and heat-transfer passages, verify blower operation, and test pressure-switch settings per the manual.",safety:"Do not bypass combustion-air proving."},
  "B-IGN-R02":{type:"result",title:"No flame established",cause:"Possible closed gas valve, inadequate inlet/manifold pressure, blocked pilot/orifice, failed gas valve, ignition failure, or incorrect wiring.",action:"Verify manual gas valves, static and dynamic gas pressure, gas-valve voltage, ignition source, pilot/orifice condition, and approved grounding.",safety:"Fuel-gas work must be performed by qualified personnel."},
  "B-IGN-R03":{type:"result",title:"Flame is not being proven",cause:"Possible dirty flame rod, weak/unstable flame, poor grounding, damaged insulator, inadequate flame signal, or ignition-module fault.",action:"Clean and inspect the flame-sensing assembly, verify flame coverage and grounding, measure flame signal per the manual, and correct gas/draft conditions.",safety:"Shut off gas and power before servicing flame components."},
  "B-IGN-R04":{type:"result",title:"Ignition sequence is operating normally",cause:"The observed ignition sequence completed and flame remained proven.",action:"If nuisance lockouts continue, trend supply voltage, gas pressure, draft, airflow switch state, flame signal, and operating temperature.",safety:"Do not repeatedly reset unexplained lockouts."},

  "B-FLOW-001":{type:"question",text:"Is the system circulation pump running?",safety:"Do not operate the boiler without proven water flow.",yes:"B-FLOW-002",no:"B-FLOW-R01"},
  "B-FLOW-002":{type:"question",text:"Are isolation valves open and system pressure adequate?",safety:"Use caution around hot, pressurized hydronic piping.",yes:"B-FLOW-003",no:"B-FLOW-R02"},
  "B-FLOW-003":{type:"question",text:"Is the flow switch or low-water cutoff still indicating a fault?",safety:"Do not bypass either device.",yes:"B-FLOW-R03",no:"B-FLOW-R04"},
  "B-FLOW-R01":{type:"result",title:"Circulation pump not operating",cause:"Possible pump power, starter, control, seized pump, or command issue.",action:"Restore pump operation and verify required boiler flow before enabling firing.",safety:"Apply lockout/tagout before pump service."},
  "B-FLOW-R02":{type:"result",title:"Hydronic path is restricted or under-pressurized",cause:"Possible closed valve, air-bound loop, clogged strainer, low fill pressure, or incorrect balancing.",action:"Correct valve position, vent air, inspect strainers, restore pressure, and verify design flow.",safety:"Depressurize before opening strainers or piping."},
  "B-FLOW-R03":{type:"result",title:"Flow switch or LWCO remains open",cause:"Actual low flow/low water, failed switch, wiring issue, or improper setpoint/installation.",action:"Measure actual flow and water level, inspect device wiring and operation, and repair or replace only after confirming the underlying condition.",safety:"Never defeat low-water or flow protection."},
  "B-FLOW-R04":{type:"result",title:"Water-flow permissive is satisfied",cause:"The circulation and water-level interlocks appear normal.",action:"Continue with ignition or temperature troubleshooting.",safety:"Maintain minimum required boiler flow during firing."},

  "B-HIGH-001":{type:"question",text:"Is adequate water flow confirmed through the heat exchanger?",safety:"Hot water and surfaces can cause severe burns.",yes:"B-HIGH-002",no:"B-HIGH-R01"},
  "B-HIGH-002":{type:"question",text:"Are the operating and high-limit temperature sensors reading accurately?",safety:"Use a calibrated reference instrument.",yes:"B-HIGH-003",no:"B-HIGH-R02"},
  "B-HIGH-003":{type:"question",text:"Is the burner shutting down when the call for heat ends or the setpoint is satisfied?",safety:"Do not continue operating a boiler that fails to shut down properly.",yes:"B-HIGH-R04",no:"B-HIGH-R03"},
  "B-HIGH-R01":{type:"result",title:"Low flow causing temperature rise",cause:"Pump failure, air, restriction, closed valve, or insufficient flow may be causing rapid heat-exchanger temperature rise.",action:"Restore required flow and inspect the heat exchanger for scale or restriction.",safety:"Do not reset the limit until flow is verified."},
  "B-HIGH-R02":{type:"result",title:"Temperature-sensing error",cause:"Sensor, wiring, placement, calibration, or control input may be inaccurate.",action:"Compare with a calibrated instrument and repair or replace the affected sensor or wiring.",safety:"Follow site calibration and change-control requirements."},
  "B-HIGH-R03":{type:"result",title:"Burner does not shut down correctly",cause:"Possible controller, thermostat, wiring, gas-valve, or relay failure.",action:"Shut the boiler down and inspect the control circuit and gas-valve closure function.",safety:"Do not leave the boiler in service."},
  "B-HIGH-R04":{type:"result",title:"Likely load, setpoint, or heat-transfer issue",cause:"Possible excessive setpoint, poor water-side heat transfer, scale, or system control problem.",action:"Review setpoints, reset logic, return temperature, water chemistry, and heat-exchanger condition.",safety:"Use manufacturer-approved cleaning methods."},

  "B-AIR-001":{type:"question",text:"Are the combustion-air intake and vent paths clear?",safety:"Turn the appliance off before internal vent inspection.",yes:"B-AIR-002",no:"B-AIR-R01"},
  "B-AIR-002":{type:"question",text:"Is the combustion-air filter clean and properly installed?",safety:"Use approved replacement filter size and type.",yes:"B-AIR-003",no:"B-AIR-R02"},
  "B-AIR-003":{type:"question",text:"Does the air-pressure switch prove steadily without bouncing?",safety:"Do not adjust pressure settings without the manual and proper instruments.",yes:"B-AIR-R04",no:"B-AIR-R03"},
  "B-AIR-R01":{type:"result",title:"Combustion-air or vent restriction",cause:"Blocked intake, blocked vent, poor vent installation, exhaust-fan interaction, or down-draft may be preventing safe combustion.",action:"Clear and inspect the full air/vent path and verify draft against the manual.",safety:"Keep the boiler off until safe venting is confirmed."},
  "B-AIR-R02":{type:"result",title:"Dirty combustion-air filter",cause:"A restricted filter reduces combustion airflow and may create pressure-switch or ignition faults.",action:"Replace or clean the filter as permitted, then verify airflow and ignition.",safety:"Use the specified filter and maintain panel seals."},
  "B-AIR-R03":{type:"result",title:"Unstable air-pressure proving",cause:"Possible marginal draft, dirty burners/heat exchanger, pressure-switch tubing issue, weak blower, or incorrect adjustment.",action:"Inspect tubing, blower, burners, heat exchanger, intake, vent, and differential pressure.",safety:"Combustion setup requires qualified personnel and calibrated instruments."},
  "B-AIR-R04":{type:"result",title:"Combustion airflow appears normal",cause:"Airflow proving is stable and the intake/vent path appears clear.",action:"Continue with ignition, gas-pressure, or flame-signal troubleshooting.",safety:"Maintain all factory safeties."},

  // Vacuum pump
  "V-VAC-001":{type:"question",text:"Is there a leak on the suction side or in the connected system?",safety:"Isolate the process before opening vacuum piping.",yes:"V-VAC-R01",no:"V-VAC-002"},
  "V-VAC-002":{type:"question",text:"Is the oil correct and in serviceable condition?",safety:"Pump surfaces and oil may be hot.",yes:"V-VAC-R03",no:"V-VAC-R02"},
  "V-VAC-R01":{type:"result",title:"Suction-side leak",cause:"Leaking pipework, fittings, valves, hoses, or process connections can prevent final vacuum.",action:"Leak-check the suction pipework and tighten or repair defective connections.",safety:"Depressurize and isolate before repair."},
  "V-VAC-R02":{type:"result",title:"Incorrect or degraded oil",cause:"Incorrect viscosity or contaminated oil can reduce final vacuum.",action:"Use the manufacturer-specified oil viscosity and perform the approved oil service.",safety:"Allow the pump to cool and follow oil disposal requirements."},
  "V-VAC-R03":{type:"result",title:"Internal service may be required",cause:"If leaks and oil condition are acceptable, internal wear, valve issues, or contamination may be present.",action:"Inspect permitted maintenance items and contact authorized Elmo Rietschle service if the fault remains.",safety:"Internal repair should be performed by authorized personnel."},

  "V-CAP-001":{type:"question",text:"Is the suction pipe too long, too narrow, or restricted?",safety:"Do not modify piping while the pump is operating.",yes:"V-CAP-R01",no:"V-CAP-002"},
  "V-CAP-002":{type:"question",text:"Is the intake filter dirty?",safety:"Lock out the pump before opening the intake assembly.",yes:"V-CAP-R02",no:"V-CAP-R03"},
  "V-CAP-R01":{type:"result",title:"Suction piping restriction",cause:"Long, narrow, kinked, or obstructed piping reduces suction capacity.",action:"Correct the piping size, length, routing, and restrictions according to the manual.",safety:"Prevent process contamination during piping work."},
  "V-CAP-R02":{type:"result",title:"Dirty intake filter",cause:"A loaded intake filter restricts pump capacity.",action:"Clean or replace the intake filter using the manual procedure.",safety:"Use lockout/tagout and control contamination."},
  "V-CAP-R03":{type:"result",title:"Check system leaks and pump condition",cause:"Leaks, valve issues, internal wear, or process demand may exceed pump capacity.",action:"Leak-check the system, verify valve positions, and compare actual demand with pump rating.",safety:"Contact authorized service for internal repair."},

  "V-HOT-001":{type:"question",text:"Are ambient or intake temperatures too high, or are ventilation openings obstructed?",safety:"Pump surfaces may exceed 70°C.",yes:"V-HOT-R01",no:"V-HOT-002"},
  "V-HOT-002":{type:"question",text:"Is exhaust backpressure high or are oil-separator elements dirty?",safety:"Do not operate with a blocked exhaust.",yes:"V-HOT-R02",no:"V-HOT-R03"},
  "V-HOT-R01":{type:"result",title:"Cooling-air or temperature problem",cause:"High ambient/intake temperature or blocked ventilation can overheat the pump.",action:"Improve room ventilation, clear ventilation slots, and restore acceptable intake conditions.",safety:"Avoid contact with hot surfaces."},
  "V-HOT-R02":{type:"result",title:"Exhaust restriction or separator loading",cause:"High exhaust backpressure or dirty oil-separator elements increases operating temperature.",action:"Inspect exhaust piping and replace separator elements per the manual.",safety:"Shut down and cool the pump before service."},
  "V-HOT-R03":{type:"result",title:"Check oil viscosity and internal condition",cause:"Oil that is too viscous or internal mechanical problems may create excess heat.",action:"Verify specified oil viscosity and contact authorized service if overheating persists.",safety:"Do not continue operation with unexplained overheating."},

  "V-OIL-001":{type:"question",text:"Are the air-oil separator elements correctly seated with O-rings installed?",safety:"Lock out and cool the pump before inspection.",yes:"V-OIL-002",no:"V-OIL-R01"},
  "V-OIL-002":{type:"question",text:"Are the separator elements dirty or is exhaust backpressure high?",safety:"Prevent oil-aerosol exposure.",yes:"V-OIL-R02",no:"V-OIL-R03"},
  "V-OIL-R01":{type:"result",title:"Separator installation problem",cause:"Incorrectly seated separator elements or missing O-rings allow visible oil mist.",action:"Correct element seating and install the required seals.",safety:"Follow the manual replacement procedure."},
  "V-OIL-R02":{type:"result",title:"Dirty separator or restricted exhaust",cause:"Loaded separator elements or high exhaust backpressure can carry oil into the exhaust.",action:"Replace separator elements and inspect the exhaust hose or pipe for restriction.",safety:"Collect and dispose of oil-contaminated materials properly."},
  "V-OIL-R03":{type:"result",title:"Check oil type and operating temperature",cause:"Unsuitable oil or excessive intake/ambient temperature may contribute to oil mist.",action:"Verify approved oil and operating conditions.",safety:"Avoid inhalation of oil aerosols."},

  "V-NOISE-001":{type:"question",text:"Does the noise disappear within about two minutes after a cold start?",safety:"Use hearing protection near a running pump.",yes:"V-NOISE-R01",no:"V-NOISE-002"},
  "V-NOISE-002":{type:"question",text:"Is the vacuum-adjustment valve vibrating or is the oil/pump unusually cold?",safety:"Do not touch hot or moving components.",yes:"V-NOISE-R02",no:"V-NOISE-R03"},
  "V-NOISE-R01":{type:"result",title:"Normal cold-start blade noise",cause:"The manual notes that brief hammering noise can be normal when cold if it disappears as operating temperature rises.",action:"Observe the warm-up. Investigate only if the noise continues or worsens.",safety:"Keep guards installed."},
  "V-NOISE-R02":{type:"result",title:"Valve vibration or cold/high-viscosity condition",cause:"A vibrating vacuum valve, cold pump/oil, or excessive oil viscosity can create abnormal noise.",action:"Verify ambient temperature and oil specification; replace the vibrating valve if confirmed.",safety:"Valve replacement requires shutdown and isolation."},
  "V-NOISE-R03":{type:"result",title:"Possible internal wear or damaged blades",cause:"Pump housing chatter marks or damaged blades may require factory repair.",action:"Stop the pump and contact Elmo Rietschle or an authorized workshop.",safety:"Do not continue operating with severe internal noise."},

  "V-MOTOR-001":{type:"question",text:"Do supply voltage, frequency, and motor connections match the nameplate?",safety:"Qualified electrician only.",yes:"V-MOTOR-002",no:"V-MOTOR-R01"},
  "V-MOTOR-002":{type:"question",text:"Are the pump/oil cold, separators dirty, or exhaust backpressure high?",safety:"Lock out before service.",yes:"V-MOTOR-R02",no:"V-MOTOR-R03"},
  "V-MOTOR-R01":{type:"result",title:"Electrical supply or protection-setting issue",cause:"Incorrect voltage/frequency, terminal-board connection, or motor-protection setting may cause trips.",action:"Have a qualified electrician verify supply, wiring, and delayed overload protection.",safety:"Do not repeatedly reset the motor protector."},
  "V-MOTOR-R02":{type:"result",title:"High starting or operating load",cause:"Cold/high-viscosity oil, dirty separators, or high exhaust backpressure can overload the motor.",action:"Correct oil, temperature, separator, and exhaust conditions.",safety:"Allow the pump to cool before service."},
  "V-MOTOR-R03":{type:"result",title:"Possible motor or internal mechanical fault",cause:"If external causes are absent, motor or pump damage may be present.",action:"Contact qualified electrical and authorized pump service personnel.",safety:"Keep the unit locked out."},

  // Compressor
  "C-START-001":{type:"question",text:"Is electrical power available at the compressor?",safety:"Qualified electrical personnel only inside energized equipment.",yes:"C-START-002",no:"C-START-R01"},
  "C-START-002":{type:"question",text:"Is the red protection LED or fault pictograph active?",safety:"Record the indication before resetting.",yes:"C-START-R02",no:"C-START-R03"},
  "C-START-R01":{type:"result",title:"No power or control fuse open",cause:"Loss of incoming power or an interrupted transformer-protection fuse can prevent startup.",action:"Check the supply line and replace only with the same fuse type and rating after finding the cause.",safety:"Lock out before fuse replacement."},
  "C-START-R02":{type:"result",title:"Active protection condition",cause:"Possible incorrect phase sequence, motor protection trip, or element-outlet temperature switch trip.",action:"Verify phase sequence, motor condition, room ventilation, cooling radiator cleanliness, and oil level.",safety:"Do not repeatedly reset a protection trip."},
  "C-START-R03":{type:"result",title:"Control or start circuit problem",cause:"Possible command, emergency stop, remote-control state, starter, or internal control issue.",action:"Verify local/remote status, emergency stop, control mode, and starter circuit using the wiring diagram.",safety:"Qualified service only."},

  "C-HOT-001":{type:"question",text:"Is the compressor-room temperature high or ventilation inadequate?",safety:"Hot oil and surfaces can cause burns.",yes:"C-HOT-R01",no:"C-HOT-002"},
  "C-HOT-002":{type:"question",text:"Is the cooling radiator dirty or oil level low?",safety:"Lock out before cleaning or adding oil.",yes:"C-HOT-R02",no:"C-HOT-R03"},
  "C-HOT-R01":{type:"result",title:"Compressor-room ventilation problem",cause:"High ambient temperature or poor ventilation can trip element-outlet or oil-temperature protection.",action:"Improve room ventilation and keep cooling-air paths unobstructed.",safety:"Do not operate above rated ambient conditions."},
  "C-HOT-R02":{type:"result",title:"Cooling radiator or oil-level issue",cause:"A dirty radiator or low oil level reduces cooling and lubrication.",action:"Clean the radiator and restore oil to the correct level with the approved lubricant.",safety:"Depressurize and cool before service."},
  "C-HOT-R03":{type:"result",title:"Further cooling or internal diagnosis required",cause:"Possible thermostat, fan, oil circuit, internal restriction, or mechanical problem.",action:"Stop the compressor and have skilled personnel perform the manual's advanced checks.",safety:"Do not bypass the 120°C safety thermostat."},

  "C-PRESS-001":{type:"question",text:"Is facility air consumption higher than the compressor capacity?",safety:"Do not exceed equipment pressure ratings.",yes:"C-PRESS-R01",no:"C-PRESS-002"},
  "C-PRESS-002":{type:"question",text:"Does the discharge or unload solenoid remain open?",safety:"Electrical and pneumatic diagnosis requires trained personnel.",yes:"C-PRESS-R02",no:"C-PRESS-R03"},
  "C-PRESS-R01":{type:"result",title:"Demand exceeds compressor output",cause:"System leaks or excessive connected demand can prevent working pressure.",action:"Isolate leaks and nonessential demand, then compare measured output with compressor rating.",safety:"Repair piping only after isolation and depressurization."},
  "C-PRESS-R02":{type:"result",title:"Discharge electrovalve/control issue",cause:"The discharge electrovalve may remain open because of an electrical or valve problem.",action:"Have authorized personnel inspect the valve and control circuit using the wiring diagram.",safety:"Depressurize before valve service."},
  "C-PRESS-R03":{type:"result",title:"Possible intake, belt, or compressor-element issue",cause:"A restricted intake, slipping belt, control setting, or compressor-element wear may reduce output.",action:"Inspect routine-maintenance components and escalate internal repairs to authorized service.",safety:"Lock out and depressurize before inspection."},

  "C-OIL-001":{type:"question",text:"Is the oil level above the specified range?",safety:"Check only according to the manual's shutdown and depressurization procedure.",yes:"C-OIL-R01",no:"C-OIL-002"},
  "C-OIL-002":{type:"question",text:"Is the oil-separating filter due for replacement or suspected damaged?",safety:"Separator service is for skilled personnel.",yes:"C-OIL-R02",no:"C-OIL-R03"},
  "C-OIL-R01":{type:"result",title:"Oil level too high",cause:"Overfilling can increase oil carryover and consumption.",action:"Correct the oil level using the approved procedure and lubricant.",safety:"Depressurize before opening the oil system."},
  "C-OIL-R02":{type:"result",title:"Oil-separating filter deteriorated",cause:"A deteriorated separator can allow excessive oil carryover.",action:"Replace the oil-separating filter according to the manual.",safety:"Authorized skilled personnel only."},
  "C-OIL-R03":{type:"result",title:"Check for leaks and operating conditions",cause:"External leakage, unsuitable oil, temperature, or internal wear may cause oil loss.",action:"Inspect for leaks and verify lubricant and operating conditions; escalate if unresolved.",safety:"Do not operate with low oil."},

  // Dryer
  "D-AIR-001":{type:"question",text:"Are the internal air passages or evaporator piping frozen?",safety:"Disconnect power and discharge residual pressure before service.",yes:"D-AIR-R01",no:"D-AIR-R02"},
  "D-AIR-R01":{type:"result",title:"Internal freezing",cause:"Hot-gas bypass failure/out-of-calibration or low room temperature may allow ice to block the evaporator piping.",action:"Stop the dryer, allow thawing, verify room temperature, and have licensed personnel check the hot-gas bypass system.",safety:"Refrigerant work requires licensed personnel."},
  "D-AIR-R02":{type:"result",title:"Further air-path diagnosis required",cause:"A closed valve, piping restriction, or internal obstruction may be present.",action:"Verify external valves and piping; contact authorized service for internal diagnosis.",safety:"Depressurize before opening the air system."},

  "D-WET-001":{type:"question",text:"Is the condensate drain or separator dirty or not operating?",safety:"Condensate may contain oil and must be disposed of properly.",yes:"D-WET-R01",no:"D-WET-002"},
  "D-WET-002":{type:"question",text:"Is airflow, room temperature, or inlet-air temperature outside the dryer rating?",safety:"Do not exceed rated pressure, flow, or temperature.",yes:"D-WET-R02",no:"D-WET-003"},
  "D-WET-003":{type:"question",text:"Is the condenser dirty or condenser fan not operating correctly?",safety:"Lock out before removing panels.",yes:"D-WET-R03",no:"D-WET-R04"},
  "D-WET-R01":{type:"result",title:"Condensate drain or separator problem",cause:"A dirty drain filter, failed electronic drain, or separator issue can send water downstream.",action:"Clean the drain filter and have trained personnel verify drain operation.",safety:"Disconnect power and release pressure first."},
  "D-WET-R02":{type:"result",title:"Dryer operating outside rating",cause:"Excessive flow, high room temperature, or high inlet-air temperature can overwhelm the dryer.",action:"Reduce load or restore inlet and ambient conditions to the rated range.",safety:"Do not bypass dryer protections."},
  "D-WET-R03":{type:"result",title:"Condenser cooling problem",cause:"A dirty condenser or failed fan reduces refrigeration capacity.",action:"Clean condenser fins with compressed air only; have licensed personnel verify fan operation.",safety:"Do not use water or solvents on condenser fins."},
  "D-WET-R04":{type:"result",title:"Refrigeration diagnosis required",cause:"Possible refrigerant charge, hot-gas bypass, compressor, or internal refrigeration fault.",action:"Contact licensed refrigeration service.",safety:"Do not open the refrigerant circuit."},

  "D-HOT-001":{type:"question",text:"Is the dryer overloaded or condenser airflow poor?",safety:"Hot compressor surfaces can cause burns.",yes:"D-HOT-R01",no:"D-HOT-R02"},
  "D-HOT-R01":{type:"result",title:"Load or condenser condition causing heat",cause:"Excess flow, high ambient/inlet temperature, dirty condenser, or fan failure can overheat the compressor head.",action:"Correct load and temperature conditions, clean the condenser, and verify the fan.",safety:"Lock out before cleaning."},
  "D-HOT-R02":{type:"result",title:"Possible refrigerant-charge problem",cause:"Low charge or refrigerant leakage can cause poor cooling and high compressor temperature.",action:"Have licensed refrigeration personnel leak-check and charge the system.",safety:"Licensed refrigeration service only."},

  "D-START-001":{type:"question",text:"Was the dryer restarted immediately after shutdown without pressure equalization time?",safety:"Do not cycle the compressor repeatedly.",yes:"D-START-R01",no:"D-START-002"},
  "D-START-002":{type:"question",text:"Is line voltage low or unstable?",safety:"Qualified electrical personnel only.",yes:"D-START-R02",no:"D-START-R03"},
  "D-START-R01":{type:"result",title:"Insufficient pressure-equalization time",cause:"Immediate restart can prevent the refrigeration compressor from starting.",action:"Wait several minutes before restarting.",safety:"Do not repeatedly attempt starts."},
  "D-START-R02":{type:"result",title:"Low line voltage",cause:"Voltage below requirements can cause humming and failure to start.",action:"Have qualified personnel verify supply voltage and electrical connections.",safety:"De-energize before electrical service."},
  "D-START-R03":{type:"result",title:"Starting components or motor fault",cause:"Starting relay, capacitor, overload, or compressor motor may be defective.",action:"Contact authorized licensed service.",safety:"Electrical and refrigerant work is restricted to qualified personnel."},

  "D-NOISE-001":{type:"result",title:"Internal mechanical service required",cause:"Very loud compressor noise may indicate internal mechanical or valve problems.",action:"Stop the dryer and contact an authorized service provider.",safety:"Do not continue operating with severe mechanical noise."},

  // Generator
  "G-CRANK-001":{type:"question",text:"Is a fault lamp active or the emergency-stop button engaged?",safety:"Disable automatic starting before troubleshooting.",yes:"G-CRANK-R01",no:"G-CRANK-002"},
  "G-CRANK-002":{type:"question",text:"Are battery cables clean/tight and is the starting battery charged?",safety:"Disconnect the charger and negative battery cable before battery service.",yes:"G-CRANK-R03",no:"G-CRANK-R02"},
  "G-CRANK-R01":{type:"result",title:"Fault or emergency stop preventing crank",cause:"An active shutdown or engaged emergency stop can inhibit starting.",action:"Correct the fault; pull out the emergency stop if engaged, move the switch to STOP, and reset according to the manual.",safety:"Do not reset before identifying the shutdown cause."},
  "G-CRANK-R02":{type:"result",title:"Battery or cable problem",cause:"Loose/corroded connections or a discharged/defective battery can prevent cranking.",action:"Clean and tighten connections, then recharge or replace the battery as needed.",safety:"Observe battery, arc-flash, and polarity precautions."},
  "G-CRANK-R03":{type:"result",title:"Control or starting-system fault",cause:"Possible starter, solenoid, control relay, wiring, or engine-control problem.",action:"Contact an authorized generator service center.",safety:"Keep automatic start disabled until service is complete."},

  "G-FAULT-001":{type:"question",text:"Which general condition is indicated: low oil pressure, high coolant temperature, overspeed, overcrank, or another fault?",safety:"Do not open control or output boxes while the set is running.",yes:"G-FAULT-002",no:"G-FAULT-R04"},
  "G-FAULT-002":{type:"question",text:"Have the basic fluid level, cooling-air path, fuel supply, and visible leak checks been completed?",safety:"Allow the engine to cool before opening the cooling system.",yes:"G-FAULT-R02",no:"G-FAULT-R01"},
  "G-FAULT-R01":{type:"result",title:"Complete safe prestart fault checks",cause:"Low oil, low coolant, blocked radiator, fuel issue, or visible leakage may explain the fault.",action:"With the set disabled and cooled, inspect levels, leaks, radiator airflow, fuel supply, and obvious mechanical conditions.",safety:"Never remove a hot radiator cap."},
  "G-FAULT-R02":{type:"result",title:"Fault requires condition-specific correction",cause:"The control has detected an abnormal engine or generator condition.",action:"Correct the confirmed cause, move the switch to STOP, use Reset/Lamp Test, verify all lamps, and restart only when safe.",safety:"Qualified service is required for electrical, fuel, speed, or sensor diagnosis."},
  "G-FAULT-R04":{type:"result",title:"Unidentified Fault 1 / Fault 2 or false indication",cause:"Optional fault inputs or a sensor/monitor-board fault may be involved.",action:"Review the installation's fault assignment and contact authorized service if gauges are normal but the fault remains.",safety:"Do not bypass fault inputs."},

  "G-AC-001":{type:"question",text:"Is the optional line circuit breaker or field breaker tripped?",safety:"Generator output circuits contain lethal voltage.",yes:"G-AC-R01",no:"G-AC-R02"},
  "G-AC-R01":{type:"result",title:"Generator breaker tripped",cause:"Overload, short circuit, or voltage-build-up fault may have opened the breaker.",action:"Remove the load, identify and correct the overload or fault, then reset only when safe.",safety:"Qualified electrical personnel only."},
  "G-AC-R02":{type:"result",title:"Generator or regulator service required",cause:"Possible excitation, voltage-regulator, generator, sensing, or control fault.",action:"Contact authorized Cummins generator service.",safety:"Keep covers installed and do not work energized."},

  "G-REMOTE-001":{type:"question",text:"Is the Run/Stop/Remote switch in REMOTE and is the remote circuit breaker reset?",safety:"Automatic start can occur without warning.",yes:"G-REMOTE-R02",no:"G-REMOTE-R01"},
  "G-REMOTE-R01":{type:"result",title:"Remote mode or remote breaker condition",cause:"The set will not start remotely unless the switch is in REMOTE and the remote circuit is available.",action:"Place the switch in REMOTE and reset the remote breaker after confirming safe conditions.",safety:"Warn personnel before enabling remote start."},
  "G-REMOTE-R02":{type:"result",title:"ATS or remote-control diagnosis required",cause:"The remote start signal, wiring, ATS contact, or generator input may be faulty.",action:"Verify the remote-start signal and wiring with qualified personnel.",safety:"Disable automatic starting before opening controls."},

  // Compact AHU flows retained
  "AHU-START-001":{type:"question",text:"Is the AHU scheduled and enabled in the BAS?",safety:"Do not bypass schedules, safeties, or interlocks without authorization.",yes:"AHU-START-002",no:"AHU-START-R01"},
  "AHU-START-002":{type:"question",text:"Is there an active alarm or safety interlock?",safety:"Record the alarm before resetting.",yes:"AHU-START-R02",no:"AHU-START-R03"},
  "AHU-START-R01":{type:"result",title:"AHU not enabled",cause:"Outside schedule or disabled in BAS.",action:"Verify schedule, enable status, and approved operating requirements.",safety:"Confirm it was not intentionally disabled."},
  "AHU-START-R02":{type:"result",title:"Safety interlock preventing operation",cause:"Smoke, freezestat, high static, fire alarm, or another interlock may be open.",action:"Correct the underlying condition before reset.",safety:"Never bypass life-safety interlocks."},
  "AHU-START-R03":{type:"result",title:"Check VFD, starter, power, and run command",cause:"Possible drive, starter, motor, wiring, or control-command issue.",action:"Verify power, run command, fault status, and mechanical condition.",safety:"Qualified personnel only."},

  "AHU-TEMP-001":{type:"question",text:"Is the AHU running and supplying air?",safety:"Observe rotating-equipment hazards.",yes:"AHU-TEMP-002",no:"AHU-TEMP-R01"},
  "AHU-TEMP-002":{type:"question",text:"Is supply-air temperature at the expected cooling setpoint?",safety:"Use a calibrated reference.",yes:"AHU-TEMP-R02",no:"AHU-TEMP-R03"},
  "AHU-TEMP-R01":{type:"result",title:"AHU not operating",cause:"The served space cannot cool without airflow.",action:"Use the Unit Will Not Start guide.",safety:"Do not bypass safeties."},
  "AHU-TEMP-R02":{type:"result",title:"Check zone airflow, load, and sensor accuracy",cause:"Cooling air is available, but distribution, load, or sensor issues may exist.",action:"Verify zone airflow, VAV operation, heat load, pressure relationship, and sensor accuracy.",safety:"Do not alter controlled pressure relationships without approval."},
  "AHU-TEMP-R03":{type:"result",title:"Supply air too warm",cause:"Possible chilled-water, valve, coil, economizer, or setpoint issue.",action:"Inspect valve command, chilled-water flow, coil condition, and control sequence.",safety:"Use lockout/tagout before internal inspection."},

  "AHU-AIR-001":{type:"question",text:"Is the supply fan running?",safety:"Keep clear of rotating components.",yes:"AHU-AIR-002",no:"AHU-AIR-R01"},
  "AHU-AIR-002":{type:"question",text:"Are filters dirty or differential pressure high?",safety:"Use appropriate filter-handling precautions.",yes:"AHU-AIR-R02",no:"AHU-AIR-R03"},
  "AHU-AIR-R01":{type:"result",title:"Supply fan not operating",cause:"No fan airflow.",action:"Use the Unit Will Not Start guide.",safety:"Do not bypass protective devices."},
  "AHU-AIR-R02":{type:"result",title:"Filter restriction",cause:"Loaded filters increase resistance.",action:"Replace filters and verify differential pressure.",safety:"Use approved disposal procedures."},
  "AHU-AIR-R03":{type:"result",title:"Check fan speed, dampers, VAVs, coil, and duct path",cause:"Drive speed, dampers, terminal units, or restrictions may be limiting airflow.",action:"Verify VFD feedback, static pressure, dampers, and duct condition.",safety:"Lock out before internal inspection."},

  "AHU-SAT-001":{type:"question",text:"Is the cooling valve commanded open?",safety:"Verify sequence before forcing outputs.",yes:"AHU-SAT-002",no:"AHU-SAT-R01"},
  "AHU-SAT-002":{type:"question",text:"Is chilled-water flow available through the coil?",safety:"Use caution around pressurized piping.",yes:"AHU-SAT-R02",no:"AHU-SAT-R03"},
  "AHU-SAT-R01":{type:"result",title:"No cooling command",cause:"Setpoint, mode, economizer, or control-loop issue.",action:"Review the sequence and control outputs.",safety:"Do not force valves without reviewing freeze/humidity risks."},
  "AHU-SAT-R02":{type:"result",title:"Check coil cleanliness, water temperature, outside-air load, and SAT sensor",cause:"Flow exists but heat transfer or measurement may be inadequate.",action:"Inspect coil and verify entering/leaving water and air temperatures.",safety:"Lock out before coil access."},
  "AHU-SAT-R03":{type:"result",title:"Insufficient chilled-water flow",cause:"Closed valve, failed actuator, strainer, air, or pump DP issue.",action:"Verify valve position, pump DP, strainer condition, and venting.",safety:"Depressurize before opening piping."},

  "AHU-VFD-001":{type:"question",text:"Is an active VFD fault code displayed?",safety:"Record the code before resetting.",yes:"AHU-VFD-R01",no:"AHU-VFD-R02"},
  "AHU-VFD-R01":{type:"result",title:"Active VFD fault",cause:"Possible overload, input power, overvoltage, undervoltage, ground fault, or communication issue.",action:"Use the VFD manufacturer's exact fault procedure and inspect the fan/motor load.",safety:"Wait the specified DC-bus discharge time before opening the drive."},
  "AHU-VFD-R02":{type:"result",title:"Check noise, vibration, current, belts, bearings, and command stability",cause:"A mechanical or intermittent control issue may exist without an active fault.",action:"Trend command, feedback, current, and inspect mechanical components.",safety:"Lock out before mechanical inspection."}
};

const app=document.getElementById("app");
const pageTitle=document.getElementById("page-title");
const homeButton=document.getElementById("home-button");

function getRoute(){const p=new URLSearchParams(location.search);return{asset:p.get("asset"),problem:p.get("problem"),step:p.get("step")}}
function setRoute(params){const u=new URL(location.href);u.search="";Object.entries(params).forEach(([k,v])=>{if(v)u.searchParams.set(k,v)});history.pushState({},"",u);render()}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function renderHome(){
  pageTitle.textContent="Asset Troubleshooting";
  homeButton.hidden=true;
  app.innerHTML=`<div class="toolbar"><input id="search" class="search" placeholder="Search asset, room, category, manufacturer..." /></div><div id="asset-grid" class="card-grid"></div>`;
  const input=document.getElementById("search");
  const grid=document.getElementById("asset-grid");
  function draw(){
    const q=input.value.trim().toLowerCase();
    const list=Object.values(assets).filter(a=>[a.id,a.name,a.category,a.manufacturer,a.model,a.location].join(" ").toLowerCase().includes(q));
    grid.innerHTML=list.map(a=>`<button class="card" data-asset="${esc(a.id)}"><span class="asset-id">${esc(a.id)}</span><h2>${esc(a.name)}</h2><p class="meta">${esc(a.category)}<br>${esc(a.location)}</p></button>`).join("");
    grid.querySelectorAll("[data-asset]").forEach(b=>b.onclick=()=>setRoute({asset:b.dataset.asset}));
  }
  input.oninput=draw; draw();
}

function renderAsset(asset){
  pageTitle.textContent=asset.name;homeButton.hidden=false;
  const manual=asset.manual?`<a class="manual-button" href="${asset.manual}" target="_blank" rel="noopener">View Manual</a>`:`<span class="small-note">Manual not uploaded yet</span>`;
  app.innerHTML=`<div class="result-card"><span class="status">${esc(asset.id)}</span><h2>${esc(asset.name)}</h2><p class="meta"><strong>Category:</strong> ${esc(asset.category)}<br><strong>Manufacturer:</strong> ${esc(asset.manufacturer)}<br><strong>Model:</strong> ${esc(asset.model)}<br><strong>Location:</strong> ${esc(asset.location)}</p>${manual}<div class="danger"><strong>Safety:</strong> These guides support trained personnel. They do not replace lockout/tagout, permits, site procedures, manufacturer instructions, or qualified service requirements.</div></div><h3 class="section-title">Select the problem</h3><div class="card-grid">${asset.problems.map(p=>`<button class="card" data-problem="${esc(p.id)}"><h2>${esc(p.name)}</h2><p class="meta">${esc(p.description)}</p></button>`).join("")}</div>`;
  app.querySelectorAll("[data-problem]").forEach(b=>b.onclick=()=>{const p=asset.problems.find(x=>x.id===b.dataset.problem);setRoute({asset:asset.id,problem:p.id,step:p.startStep})});
}

function renderStep(asset,problem,stepId){
  const s=steps[stepId];pageTitle.textContent=`${asset.id}: ${problem.name}`;homeButton.hidden=false;
  if(!s){app.innerHTML=`<div class="result-card"><h2>Step not found</h2></div>`;return}
  if(s.type==="question"){
    app.innerHTML=`<div class="result-card"><span class="status">${esc(asset.id)}</span><h2>${esc(s.text)}</h2><div class="warning"><strong>Safety:</strong> ${esc(s.safety)}</div><div class="button-row"><button id="yes" class="answer-button">Yes</button><button id="no" class="answer-button">No</button></div></div>`;
    document.getElementById("yes").onclick=()=>setRoute({asset:asset.id,problem:problem.id,step:s.yes});
    document.getElementById("no").onclick=()=>setRoute({asset:asset.id,problem:problem.id,step:s.no});
  } else {
    const manual=asset.manual?`<a class="manual-button" href="${asset.manual}" target="_blank" rel="noopener">Open Manufacturer Manual</a>`:"";
    app.innerHTML=`<div class="result-card"><span class="status">RESULT</span><h2>${esc(s.title)}</h2><p><strong>Likely cause:</strong><br>${esc(s.cause)}</p><p><strong>Recommended action:</strong><br>${esc(s.action)}</p><div class="warning"><strong>Safety:</strong> ${esc(s.safety)}</div><div class="button-row"><button id="restart" class="primary-button">Restart Guide</button><button id="back" class="secondary-button">Back to Asset</button></div><div style="margin-top:14px">${manual}</div></div>`;
    document.getElementById("restart").onclick=()=>setRoute({asset:asset.id,problem:problem.id,step:problem.startStep});
    document.getElementById("back").onclick=()=>setRoute({asset:asset.id});
  }
}

function render(){
  const r=getRoute();if(!r.asset)return renderHome();
  const a=assets[r.asset];if(!a)return renderHome();
  if(!r.problem||!r.step)return renderAsset(a);
  const p=a.problems.find(x=>x.id===r.problem);if(!p)return renderAsset(a);
  renderStep(a,p,r.step);
}
homeButton.onclick=()=>setRoute({});
addEventListener("popstate",render);
render();
