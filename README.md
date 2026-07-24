# FacilityIQ V04 — Core Diagnostic Engine

V04 begins the transition from a single-file troubleshooting website to a modular, data-driven diagnostic platform.

## Core architecture

- `data/catalog.js` — existing assets, symptoms, and guided troubleshooting steps
- `data/knowledge-base.js` — reusable weighted failure definitions and field observations
- `engine/diagnostics.js` — measurement profiles, session tracking, and diagnostic indicators
- `engine/rule-engine.js` — universal evidence scoring and engineering calculations
- `engine/v04-ui.js` — weighted-diagnosis interface
- `ui/app.js` — routing, search, asset pages, and guided troubleshooting UI
- `manuals/` — existing manufacturer manuals

## New V04 capabilities

- Weighted failure ranking for selected chiller, hydronic-pump, AHU, air-compressor, and dehumidifier symptoms
- Confirmed field-observation inputs
- Engineering calculations:
  - Chilled-water ΔT, BTU/hr, and tons
  - Pump differential pressure and feet of head
  - AHU air-temperature split and sensible BTU/hr when CFM is entered
  - Boiler ΔT and heat transfer when GPM is entered
  - Motor loading as a percentage of nameplate FLA
  - UPS load percentage
- Existing V03 guided troubleshooting trees, manuals, search, direct asset links, and work-order summaries remain intact

## Important limitation

The displayed ranking percentages are relative evidence scores. They are not statistically validated probabilities. Manufacturer operating limits, site procedures, calibrated measurements, and qualified judgment remain controlling.

## Deployment

Upload the contents of the `FacilityIQ_V04_Core` folder to the root of the GitHub repository or Cloudflare Pages project. No build command is required.
