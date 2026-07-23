const ahuProblems = [
  {
    id: "will-not-start",
    name: "Unit Will Not Start",
    description: "Supply fan does not operate when the unit should be enabled.",
    startStep: "AHU-START-001"
  },
  {
    id: "high-space-temperature",
    name: "High Space Temperature",
    description: "The served area is warmer than the required temperature.",
    startStep: "AHU-TEMP-001"
  },
  {
    id: "low-airflow",
    name: "Low Airflow",
    description: "Airflow at diffusers or through the unit appears lower than normal.",
    startStep: "AHU-AIR-001"
  },
  {
    id: "high-supply-air-temperature",
    name: "High Supply Air Temperature",
    description: "Supply air temperature is above the expected cooling setpoint.",
    startStep: "AHU-SAT-001"
  },
  {
    id: "vfd-or-fan-fault",
    name: "VFD or Fan Fault",
    description: "The VFD, motor, or fan has an active fault or abnormal condition.",
    startStep: "AHU-VFD-001"
  }
];

const assets = {
  "AHU-01": {
    id: "AHU-01",
    name: "Air Handling Unit 01",
    category: "Air Handling Unit",
    manufacturer: "To be entered",
    model: "To be entered",
    location: "Room 804",
    problems: ahuProblems
  },
  "AHU-02": {
    id: "AHU-02",
    name: "Air Handling Unit 02",
    category: "Air Handling Unit",
    manufacturer: "To be entered",
    model: "To be entered",
    location: "Room 804",
    problems: ahuProblems
  },
  "AHU-04": {
    id: "AHU-04",
    name: "Air Handling Unit 04",
    category: "Air Handling Unit",
    manufacturer: "To be entered",
    model: "To be entered",
    location: "Room 805",
    problems: ahuProblems
  },
  "AHU-05": {
    id: "AHU-05",
    name: "Air Handling Unit 05",
    category: "Air Handling Unit",
    manufacturer: "To be entered",
    model: "To be entered",
    location: "Location to be confirmed",
    problems: ahuProblems
  },
  "AHU-06": {
    id: "AHU-06",
    name: "Air Handling Unit 06",
    category: "Air Handling Unit",
    manufacturer: "To be entered",
    model: "To be entered",
    location: "Room 192",
    problems: ahuProblems
  }
};

const steps = {
  // UNIT WILL NOT START
  "AHU-START-001": {
    type: "question",
    text: "Is the AHU scheduled and enabled in the BAS?",
    safety: "Do not bypass schedules, safeties, or interlocks without authorization.",
    yes: "AHU-START-002",
    no: "AHU-START-R01"
  },
  "AHU-START-002": {
    type: "question",
    text: "Is there an active alarm or safety interlock?",
    safety: "Record the alarm before resetting. Do not repeatedly reset an unidentified fault.",
    yes: "AHU-START-R02",
    no: "AHU-START-003"
  },
  "AHU-START-003": {
    type: "question",
    text: "Is the VFD or motor starter powered?",
    safety: "Electrical checks must be performed by qualified personnel using required PPE.",
    yes: "AHU-START-004",
    no: "AHU-START-R03"
  },
  "AHU-START-004": {
    type: "question",
    text: "Is a run command present at the VFD or starter?",
    safety: "Do not jumper or bypass controls during this check.",
    yes: "AHU-START-R04",
    no: "AHU-START-R05"
  },
  "AHU-START-R01": {
    type: "result",
    title: "AHU not enabled",
    cause: "The unit is outside its operating schedule or has been disabled in the BAS.",
    action: "Verify occupancy schedule, operator override, enable status, and approved operating requirements.",
    safety: "Confirm the unit was not intentionally disabled for maintenance or safety."
  },
  "AHU-START-R02": {
    type: "result",
    title: "Alarm or safety interlock preventing operation",
    cause: "A smoke detector, freezestat, high-static switch, low-temperature limit, fire alarm, or other interlock may be open.",
    action: "Identify the exact alarm or open interlock, correct the underlying condition, and reset only after the cause is understood.",
    safety: "Never bypass life-safety or equipment-protection interlocks."
  },
  "AHU-START-R03": {
    type: "result",
    title: "No power at VFD or starter",
    cause: "Possible open disconnect, tripped breaker, blown fuse, control transformer issue, or upstream power loss.",
    action: "Inspect the electrical distribution and restore power only after determining why it was lost.",
    safety: "Qualified electrical personnel only. Apply lockout/tagout as required."
  },
  "AHU-START-R04": {
    type: "result",
    title: "Run command present but fan does not start",
    cause: "Possible VFD fault, starter fault, overload, failed motor, broken belt, seized fan, or mechanical obstruction.",
    action: "Record fault codes, inspect the drive train, verify motor current and rotation, and correct the confirmed failure.",
    safety: "Lock out the unit before inspecting belts, sheaves, bearings, or fan components."
  },
  "AHU-START-R05": {
    type: "result",
    title: "No run command at VFD or starter",
    cause: "Possible BAS output, relay, wiring, permissive, or control-sequence problem.",
    action: "Check the BAS command, control relay, wiring continuity, and all required permissives.",
    safety: "Do not force outputs without an approved troubleshooting plan."
  },

  // HIGH SPACE TEMPERATURE
  "AHU-TEMP-001": {
    type: "question",
    text: "Is the AHU currently running?",
    safety: "Observe all rotating-equipment and electrical hazards.",
    yes: "AHU-TEMP-002",
    no: "AHU-TEMP-R01"
  },
  "AHU-TEMP-002": {
    type: "question",
    text: "Is the supply air temperature at or below its expected cooling setpoint?",
    safety: "Use verified sensors or calibrated instruments when comparing temperatures.",
    yes: "AHU-TEMP-003",
    no: "AHU-TEMP-R02"
  },
  "AHU-TEMP-003": {
    type: "question",
    text: "Is airflow to the affected area normal?",
    safety: "Do not remove access panels while the fan is operating unless the procedure allows it.",
    yes: "AHU-TEMP-004",
    no: "AHU-TEMP-R03"
  },
  "AHU-TEMP-004": {
    type: "question",
    text: "Is the zone temperature sensor reading accurately?",
    safety: "Compare against a calibrated reference and document the result.",
    yes: "AHU-TEMP-R04",
    no: "AHU-TEMP-R05"
  },
  "AHU-TEMP-R01": {
    type: "result",
    title: "AHU not operating",
    cause: "The space cannot cool because the serving AHU is off or unavailable.",
    action: "Use the Unit Will Not Start guide and restore normal AHU operation.",
    safety: "Do not bypass safeties or interlocks."
  },
  "AHU-TEMP-R02": {
    type: "result",
    title: "Supply air is too warm",
    cause: "Possible chilled-water flow issue, valve problem, coil fouling, low cooling capacity, incorrect setpoint, or outside-air load.",
    action: "Use the High Supply Air Temperature guide and inspect cooling-water flow, valve command, coil condition, and setpoints.",
    safety: "Observe pressure, temperature, and chemical-treatment hazards."
  },
  "AHU-TEMP-R03": {
    type: "result",
    title: "Insufficient airflow to the space",
    cause: "Possible dirty filters, closed damper, VAV issue, fan-speed problem, duct restriction, or high system resistance.",
    action: "Use the Low Airflow guide and verify filters, fan speed, dampers, static pressure, and terminal-unit operation.",
    safety: "Lock out equipment before internal inspection."
  },
  "AHU-TEMP-R04": {
    type: "result",
    title: "Zone load or distribution issue",
    cause: "The AHU is providing acceptable air temperature and airflow, but the zone load may exceed capacity or air distribution may be inadequate.",
    action: "Check heat-generating equipment, doors, occupancy, exhaust imbalance, diffuser placement, and zone airflow requirements.",
    safety: "Do not change pressure relationships in controlled spaces without approval."
  },
  "AHU-TEMP-R05": {
    type: "result",
    title: "Zone sensor error",
    cause: "The BAS may be controlling from an inaccurate, poorly located, or failed temperature sensor.",
    action: "Calibrate, repair, or replace the sensor and verify the displayed value after correction.",
    safety: "Follow site calibration and change-control requirements."
  },

  // LOW AIRFLOW
  "AHU-AIR-001": {
    type: "question",
    text: "Is the supply fan running?",
    safety: "Keep clear of rotating components and follow lockout/tagout requirements.",
    yes: "AHU-AIR-002",
    no: "AHU-AIR-R01"
  },
  "AHU-AIR-002": {
    type: "question",
    text: "Are the filters visibly dirty or is filter differential pressure high?",
    safety: "Use appropriate respiratory and contamination-control precautions when handling filters.",
    yes: "AHU-AIR-R02",
    no: "AHU-AIR-003"
  },
  "AHU-AIR-003": {
    type: "question",
    text: "Is the fan operating at the expected speed or frequency?",
    safety: "Do not increase fan speed beyond approved limits.",
    yes: "AHU-AIR-004",
    no: "AHU-AIR-R03"
  },
  "AHU-AIR-004": {
    type: "question",
    text: "Are major dampers and terminal units open as commanded?",
    safety: "Do not force dampers that affect laboratory pressure or life-safety sequences.",
    yes: "AHU-AIR-R04",
    no: "AHU-AIR-R05"
  },
  "AHU-AIR-R01": {
    type: "result",
    title: "Supply fan not operating",
    cause: "The AHU cannot provide airflow because the supply fan is stopped.",
    action: "Use the Unit Will Not Start guide.",
    safety: "Do not bypass protective devices."
  },
  "AHU-AIR-R02": {
    type: "result",
    title: "Filter restriction",
    cause: "Dirty or loaded filters are increasing resistance and reducing airflow.",
    action: "Replace filters, inspect frames and seals, then verify differential pressure and airflow.",
    safety: "Use approved filter-handling and disposal procedures."
  },
  "AHU-AIR-R03": {
    type: "result",
    title: "Fan speed below requirement",
    cause: "Possible incorrect VFD command, speed limit, static-pressure reset, belt issue, or drive problem.",
    action: "Verify VFD command and feedback, speed limits, belts, sheaves, and static-pressure control.",
    safety: "Do not exceed fan, motor, or duct pressure ratings."
  },
  "AHU-AIR-R04": {
    type: "result",
    title: "Possible duct or system restriction",
    cause: "Potential blocked coil, collapsed liner, closed fire/smoke damper, duct obstruction, or incorrect balancing.",
    action: "Inspect coil differential pressure, duct path, fire/smoke dampers, and balancing data.",
    safety: "Coordinate any inspection of fire/smoke dampers with EHS and life-safety requirements."
  },
  "AHU-AIR-R05": {
    type: "result",
    title: "Damper or terminal-unit issue",
    cause: "A commanded damper, VAV box, or terminal device may be closed, failed, or incorrectly controlled.",
    action: "Verify command, feedback, actuator linkage, air supply, and control sequence.",
    safety: "Do not alter critical room pressure relationships without approval."
  },

  // HIGH SUPPLY AIR TEMPERATURE
  "AHU-SAT-001": {
    type: "question",
    text: "Is the cooling valve commanded open?",
    safety: "Verify the sequence before changing any control output.",
    yes: "AHU-SAT-002",
    no: "AHU-SAT-R01"
  },
  "AHU-SAT-002": {
    type: "question",
    text: "Is chilled-water flow available through the coil?",
    safety: "Use caution around pressurized water and hot or cold surfaces.",
    yes: "AHU-SAT-003",
    no: "AHU-SAT-R02"
  },
  "AHU-SAT-003": {
    type: "question",
    text: "Is the cooling coil dirty, blocked, or showing poor heat transfer?",
    safety: "Lock out the fan before opening access sections.",
    yes: "AHU-SAT-R03",
    no: "AHU-SAT-004"
  },
  "AHU-SAT-004": {
    type: "question",
    text: "Is the supply-air temperature sensor accurate?",
    safety: "Compare against a calibrated reference.",
    yes: "AHU-SAT-R04",
    no: "AHU-SAT-R05"
  },
  "AHU-SAT-R01": {
    type: "result",
    title: "Cooling valve not being commanded open",
    cause: "Possible satisfied or incorrect setpoint, economizer logic, failed control loop, schedule, or BAS sequence issue.",
    action: "Review setpoints, occupancy mode, economizer logic, control-loop output, and sequence of operation.",
    safety: "Do not force the valve without confirming freeze and humidity-control risks."
  },
  "AHU-SAT-R02": {
    type: "result",
    title: "Insufficient chilled-water flow",
    cause: "Possible closed isolation valve, failed control valve, air-bound coil, low pump differential pressure, strainer restriction, or balancing issue.",
    action: "Verify valve position, pump operation, differential pressure, strainer condition, and coil venting.",
    safety: "Depressurize and isolate piping before opening strainers or vents."
  },
  "AHU-SAT-R03": {
    type: "result",
    title: "Cooling coil heat-transfer problem",
    cause: "Dirt, biological growth, blocked fins, damaged fins, or internal fouling may be reducing cooling capacity.",
    action: "Clean and inspect the coil using an approved method, then verify leaving-air temperature and pressure drop.",
    safety: "Follow chemical, respiratory, and lockout/tagout requirements."
  },
  "AHU-SAT-R04": {
    type: "result",
    title: "Cooling capacity or load issue",
    cause: "The system may have insufficient chilled-water temperature, excessive outside-air load, high entering-air temperature, or inadequate coil capacity.",
    action: "Check entering water temperature, chilled-water supply temperature, outside-air percentage, mixed-air conditions, and design load.",
    safety: "Do not reduce required ventilation below approved minimums."
  },
  "AHU-SAT-R05": {
    type: "result",
    title: "Supply-air temperature sensor error",
    cause: "The sensor may be failed, out of calibration, or installed in an unrepresentative location.",
    action: "Calibrate, repair, or replace the sensor and verify the BAS reading.",
    safety: "Follow calibration and change-control procedures."
  },

  // VFD OR FAN FAULT
  "AHU-VFD-001": {
    type: "question",
    text: "Is an active VFD fault code displayed?",
    safety: "Record the exact fault code before resetting the drive.",
    yes: "AHU-VFD-002",
    no: "AHU-VFD-003"
  },
  "AHU-VFD-002": {
    type: "question",
    text: "Does the fault indicate overcurrent, overload, or motor protection?",
    safety: "Do not repeatedly reset an overcurrent or overload fault.",
    yes: "AHU-VFD-R01",
    no: "AHU-VFD-R02"
  },
  "AHU-VFD-003": {
    type: "question",
    text: "Is the fan making abnormal noise or vibration?",
    safety: "Do not operate equipment with severe vibration or contact between rotating and stationary parts.",
    yes: "AHU-VFD-R03",
    no: "AHU-VFD-004"
  },
  "AHU-VFD-004": {
    type: "question",
    text: "Is motor current abnormal compared with normal operation?",
    safety: "Current measurements must be taken by qualified personnel.",
    yes: "AHU-VFD-R04",
    no: "AHU-VFD-R05"
  },
  "AHU-VFD-R01": {
    type: "result",
    title: "Overcurrent or overload condition",
    cause: "Possible seized bearing, belt misalignment, fan obstruction, motor problem, incorrect acceleration, or excessive static pressure.",
    action: "Lock out the unit and inspect the fan, bearings, belts, motor, and system resistance before resetting.",
    safety: "Do not repeatedly reset the VFD until the mechanical or electrical cause is identified."
  },
  "AHU-VFD-R02": {
    type: "result",
    title: "Other VFD fault",
    cause: "Possible input-power fault, phase issue, overvoltage, undervoltage, communication loss, ground fault, or internal drive failure.",
    action: "Record the code and follow the exact VFD manufacturer troubleshooting procedure.",
    safety: "Wait the manufacturer-specified discharge time before opening the VFD enclosure."
  },
  "AHU-VFD-R03": {
    type: "result",
    title: "Mechanical fan problem",
    cause: "Possible bearing wear, wheel imbalance, loose components, rubbing, belt issue, or shaft misalignment.",
    action: "Lock out the unit and inspect the fan assembly, bearings, belts, sheaves, mounts, and clearances.",
    safety: "Do not continue operation with severe vibration or rubbing."
  },
  "AHU-VFD-R04": {
    type: "result",
    title: "Abnormal motor loading",
    cause: "Possible mechanical drag, incorrect voltage, winding issue, excessive airflow demand, or fan operating outside its intended range.",
    action: "Compare phase currents and voltage, inspect the mechanical drive, and verify operating static pressure and fan speed.",
    safety: "Electrical measurements must be performed by qualified personnel."
  },
  "AHU-VFD-R05": {
    type: "result",
    title: "Intermittent or controls-related issue",
    cause: "Possible unstable command signal, communication problem, incorrect minimum/maximum speed, or intermittent permissive.",
    action: "Trend command, feedback, current, fault history, and control permissives to identify the condition.",
    safety: "Do not bypass controls while the unit is unattended."
  }
};

const app = document.getElementById("app");
const pageTitle = document.getElementById("page-title");
const homeButton = document.getElementById("home-button");

function getRoute() {
  const params = new URLSearchParams(window.location.search);
  return {
    asset: params.get("asset"),
    problem: params.get("problem"),
    step: params.get("step")
  };
}

function setRoute(params) {
  const url = new URL(window.location.href);
  url.search = "";
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  history.pushState({}, "", url);
  render();
}

function renderHome() {
  pageTitle.textContent = "AHU Troubleshooting";
  homeButton.hidden = true;

  app.innerHTML = `
    <div class="card-grid">
      ${Object.values(assets).map(asset => `
        <button class="card" data-asset="${asset.id}">
          <span class="asset-id">${asset.id}</span>
          <h2>${asset.name}</h2>
          <p class="meta">${asset.location}</p>
        </button>
      `).join("")}
    </div>
  `;

  document.querySelectorAll("[data-asset]").forEach(button => {
    button.addEventListener("click", () => setRoute({ asset: button.dataset.asset }));
  });
}

function renderAsset(asset) {
  pageTitle.textContent = asset.name;
  homeButton.hidden = false;

  app.innerHTML = `
    <div class="result-card">
      <span class="status">${asset.id}</span>
      <h2>${asset.name}</h2>
      <p class="meta">
        <strong>Location:</strong> ${asset.location}<br>
        <strong>Manufacturer:</strong> ${asset.manufacturer}<br>
        <strong>Model:</strong> ${asset.model}
      </p>
    </div>

    <h3 style="margin-top:24px;">Select the problem</h3>
    <div class="card-grid">
      ${asset.problems.map(problem => `
        <button class="card" data-problem="${problem.id}">
          <h2>${problem.name}</h2>
          <p class="meta">${problem.description}</p>
        </button>
      `).join("")}
    </div>
  `;

  document.querySelectorAll("[data-problem]").forEach(button => {
    button.addEventListener("click", () => {
      const problem = asset.problems.find(item => item.id === button.dataset.problem);
      setRoute({ asset: asset.id, problem: problem.id, step: problem.startStep });
    });
  });
}

function renderStep(asset, problem, stepId) {
  pageTitle.textContent = `${asset.id}: ${problem.name}`;
  homeButton.hidden = false;

  const step = steps[stepId];
  if (!step) {
    app.innerHTML = `<div class="result-card"><h2>Step not found</h2></div>`;
    return;
  }

  if (step.type === "question") {
    app.innerHTML = `
      <div class="result-card">
        <span class="status">${asset.id}</span>
        <h2>${step.text}</h2>
        <div class="warning"><strong>Safety:</strong> ${step.safety}</div>
        <div class="button-row">
          <button class="answer-button" id="yes-button">Yes</button>
          <button class="answer-button" id="no-button">No</button>
        </div>
      </div>
    `;

    document.getElementById("yes-button").addEventListener("click", () => {
      setRoute({ asset: asset.id, problem: problem.id, step: step.yes });
    });
    document.getElementById("no-button").addEventListener("click", () => {
      setRoute({ asset: asset.id, problem: problem.id, step: step.no });
    });
  } else {
    app.innerHTML = `
      <div class="result-card">
        <span class="status">RESULT</span>
        <h2>${step.title}</h2>
        <p><strong>Likely cause:</strong><br>${step.cause}</p>
        <p><strong>Recommended action:</strong><br>${step.action}</p>
        <div class="warning"><strong>Safety:</strong> ${step.safety}</div>
        <div class="button-row">
          <button class="primary-button" id="restart-button">Restart guide</button>
          <button class="secondary-button" id="asset-button">Back to asset</button>
        </div>
      </div>
    `;

    document.getElementById("restart-button").addEventListener("click", () => {
      setRoute({ asset: asset.id, problem: problem.id, step: problem.startStep });
    });
    document.getElementById("asset-button").addEventListener("click", () => {
      setRoute({ asset: asset.id });
    });
  }
}

function render() {
  const route = getRoute();

  if (!route.asset) return renderHome();

  const asset = assets[route.asset];
  if (!asset) return renderHome();

  if (!route.problem || !route.step) return renderAsset(asset);

  const problem = asset.problems.find(item => item.id === route.problem);
  if (!problem) return renderAsset(asset);

  renderStep(asset, problem, route.step);
}

homeButton.addEventListener("click", () => setRoute({}));
window.addEventListener("popstate", render);
render();
