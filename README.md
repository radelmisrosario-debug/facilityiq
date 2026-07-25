# FacilityIQ V08 - Main Launch Page

## Room comfort lookup

FacilityIQ includes the AHU-to-room assignments for AHU-01, AHU-02, AHU-04,
AHU-05, and AHU-06. A chat request such as "Room 144 is too hot" first directs
the technician to verify setpoint, occupancy mode, temperature, and overrides
in Desigo, then links to the serving AHU and its troubleshooting guide.

AHU high-temperature diagnosis also verifies the active chilled-water setpoint,
actual chilled-water supply temperature, and pneumatic control-air availability.
The House Air Compressors are modeled as the source for the AHU pneumatic
valves. Heating valves are normally open and cooling valves are normally closed,
so loss of control air is treated as a possible simultaneous-heating and
loss-of-cooling condition.

Room 503 is excluded from the AHU-02 room list. It is mapped to the dedicated
Bry-Air dehumidifier and 503 Aircon Tech chiller system instead.

Each AHU-served area is modeled with a dedicated CAV/VAV terminal. Until the
terminal schedule is entered, FacilityIQ labels its exact type and tag as
unconfirmed. Room-comfort diagnosis checks the terminal airflow setpoint,
measured airflow, damper command/position, and inlet pressure before escalating
to the AHU and central utilities.

The terms "Room," "Lab," and "Laboratory" are accepted as equivalent location
aliases for every mapped area, including the dedicated Room/Lab 503 system.

V08 introduces a dedicated home screen with three clear starting points:

- Troubleshoot an individual asset
- Troubleshoot the connected plant system
- Ask FacilityIQ in a guided conversation

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
