# FacilityIQ V03 — Troubleshooting Engine

V03 preserves every asset, manual, and troubleshooting tree from V02. It remains focused solely on equipment troubleshooting.

## Added in V03

- Measurement-based diagnostic panels tailored to chillers, pumps, AHUs, exhaust fans, boilers, UPS systems, dehumidifiers, vacuum pumps, and air compressors.
- Automatic calculations for:
  - Hydronic differential pressure
  - Water and air temperature differences
  - Motor loading as a percentage of nameplate FLA
  - Chiller water-flow range check for the MultiAqua MAC-060HE-03
  - Dehumidifier RH reduction and reactivation temperature rise
  - UPS load percentage
  - Compressor pressure-switch operating state
  - Vacuum deviation from target
- Guided troubleshooting progress indicator.
- Captured Yes/No diagnostic path.
- Final troubleshooting summary with one-tap copy for MaintainX, email, or work-order documentation.
- Direct asset URLs remain supported using `?asset=ASSET-ID`, making the site ready for QR-code labels.
- No technician notes, history, scheduling, inventory, or CMMS features were added.

## Deployment

Extract the ZIP and upload the contents of the `FacilityIQ_V03_Troubleshooting` folder to the root of the website repository. Replace the previous files. No build command is required.

## Important

Calculated indicators are screening aids, not equipment operating limits. Always compare readings with the asset nameplate, approved site setpoints, manufacturer manual, and applicable safety procedures.
