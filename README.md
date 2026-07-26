# FacilityIQ V08 - Main Launch Page

## Room comfort lookup

FacilityIQ includes the AHU-to-room assignments for AHU-01, AHU-02, AHU-04,
AHU-05, and AHU-06. A chat request such as "Room 144 is too hot" first directs
the technician to verify setpoint, occupancy mode, temperature, and overrides
in Desigo, then links to the serving AHU and its troubleshooting guide.

AHU high-temperature diagnosis also verifies the active chilled-water setpoint,
actual chilled-water supply temperature, and pneumatic control-air availability.
The dedicated Control Air Compressor (`Control-AC`) and Control Air Dryer supply
the AHU pneumatic valves. Heating valves are normally open and cooling valves
are normally closed, so loss of control air is treated as a possible
simultaneous-heating and loss-of-cooling condition.

House Air Compressors 01–03 supply laboratory compressed air only. They are
modeled in a separate Laboratory Compressed-Air System and are not part of the
AHU pneumatic control circuit.

Room 503 is excluded from the AHU-02 room list. It is mapped to the dedicated
Bry-Air dehumidifier and 503 Aircon Tech chiller system instead.

Each AHU-served area is modeled with a dedicated CAV/VAV terminal, and every VAV
has a heating valve. Until the
terminal schedule is entered, FacilityIQ labels its exact type and tag as
unconfirmed. Room-comfort diagnosis checks the terminal airflow setpoint,
measured airflow, damper command/position, and inlet pressure before escalating
to the AHU and central utilities.

The terms "Room," "Lab," and "Laboratory" are accepted as equivalent location
aliases for every mapped area, including the dedicated Room/Lab 503 system.

## Complete evidence coverage

Every symptom listed for every asset is available in the evidence-analysis
dropdown. Hand-authored weighted engineering models are preserved. Symptoms
without a custom model are generated from their existing guided diagnostic
tree, using each yes/no branch as tri-state field evidence and each terminal
result as a ranked diagnostic outcome. Primary chilled-water pumps and the
emergency generator now have diagnostic profiles as well.

Operating-condition choices are equipment-specific. For example, vacuum pumps
use operating-under-load, isolated-test, warm-up, standby, and protection
states; cooling and heating calls appear only on relevant HVAC equipment.

Room and laboratory comfort troubleshooting includes both too-hot and too-cold
paths. The cold-space guide checks Desigo heating demand, the dedicated CAV/VAV
airflow and VAV heating-valve command, physical position, and temperature rise,
AHU sequence, hot-water setpoint and availability, control air, heating/cooling
valve positions, and heating-coil performance.

The chat can identify an asset and symptom in the same sentence, such as
"Boiler 03 is not firing," "House Air Compressor 02 will not build pressure,"
or "AHU-06 has low airflow," and start the matching guide directly.

## Faster field workflow

The evidence form now shows only measurements referenced by the selected
symptom. All other profile measurements remain available under a collapsed
optional-advanced section. Guide-derived symptoms can begin with observations
alone when no reading is required. Changing symptoms preserves values already
entered during the session. The first pass is capped at six prioritized
measurements and five high-value field checks; remaining evidence is revealed
only when needed.

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
