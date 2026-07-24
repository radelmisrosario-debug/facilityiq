# FacilityIQ Core Architecture

## Adding a weighted failure model

1. Open `data/knowledge-base.js`.
2. Select the asset profile, such as `chiller` or `hydronic`.
3. Add a symptom key matching the problem ID in `data/catalog.js`.
4. Add failure candidates with:
   - `base`
   - evidence rules
   - recommended action
   - reference
5. Add any new checkbox evidence to `facilityIqObservations`.

## Evidence operators

- `>=`, `>`, `<`, `<=`
- `present`
- `near` another measurement within a tolerance
- `lowRelativeTo` another measurement, such as operating amps compared with FLA

## Design direction

The rule engine is intentionally independent of specific HTML pages. Additional equipment classes can reuse the same scoring function by adding structured knowledge-base entries.
