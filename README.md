# FacilityIQ V05 — Diagnostic Coverage and Evidence Quality

V05 expands the modular diagnostic engine while keeping FacilityIQ focused solely on troubleshooting.

## Added

- Weighted diagnostic models for boilers, UPS systems, vacuum pumps, exhaust fans, and compressed-air dryers
- Existing weighted models retained for chillers, pumps, AHUs, air compressors, and dehumidifiers
- Three-state field evidence: Yes, No, or Unknown
- Evidence-completeness score
- Recommended next measurements
- Contradiction detection for conflicting measurements and observations
- Asset-specific operating comparisons for configured equipment
- Existing guided trees, manuals, search, engineering calculations, and copyable troubleshooting summaries remain intact

## Important

Diagnostic rankings are relative evidence scores, not statistically validated failure probabilities. Asset-specific limits must be confirmed against approved site data, nameplates, manuals, commissioning records, and calibrated instruments.

## Deployment

Upload the contents of `FacilityIQ_V05_Evidence_Quality` to the website repository root. No build command is required.
