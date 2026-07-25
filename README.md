# FacilityIQ V07 - Troubleshooting Assistant

V07 adds an on-device conversational assistant that correlates a technician's
question with the equipment catalog, symptoms, locations, models, manuals, and
guided diagnostic trees. It requires no API key or external service and keeps
recent conversation state in the browser.

V06 adds an interactive plant model built around the site's actual hydronic relationships.

## Site-specific chilled-water structure

- Trane RTAF310 primary site chiller
- York YVAA0443 primary site chiller
- Dedicated Marathon 2T5TTDBA4026AN PCWP for each chiller
- SCWP-01 and SCWP-02 supply the building AHUs and are controlled by chilled-water differential pressure
- HWP-01 and HWP-02 are controlled by hot-water differential pressure
- 503 chiller is a separate dedicated cooling relationship for the Bry-Air dehumidifier

## Added

- Interactive chilled-water, hot-water, and 503/Bry-Air diagrams
- Clickable equipment nodes
- Upstream/downstream system relationships
- System-level troubleshooting checks
- Trane and York manuals embedded
- Site-specific chiller and PCWP asset records

Diagnostic content supports qualified personnel and does not replace site procedures, LOTO, permits, calibrated measurements, or manufacturer instructions.
