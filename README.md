# FacilityIQ — Manual-Based Troubleshooting

This version includes:

- AHU-01, AHU-02, AHU-04, AHU-05, AHU-06
- Boiler-01 through Boiler-04
- CHEM-VACP-01 and CHEM-VACP-02
- Control-AC
- Control-AC-Air-Dryer
- Cummins-Generator
- Search
- Direct QR-code asset links
- A View Manual button for every uploaded manual
- Troubleshooting flows based on the uploaded manufacturer manuals

## Deploy through GitHub and Cloudflare Pages

1. Extract this ZIP.
2. Copy all files and the `manuals` folder into your local `facilityiq` GitHub repository.
3. In GitHub Desktop, enter a summary such as `Add manuals and equipment guides`.
4. Click `Commit to main`.
5. Click `Push origin`.
6. Cloudflare Pages should deploy automatically.

## Important

The `manuals` folder must be uploaded with the website. Do not upload only the three main files.

## Direct links for QR codes

Examples:

- `https://YOUR-SITE.pages.dev/?asset=Boiler-01`
- `https://YOUR-SITE.pages.dev/?asset=CHEM-VACP-01`
- `https://YOUR-SITE.pages.dev/?asset=Control-AC`
- `https://YOUR-SITE.pages.dev/?asset=Control-AC-Air-Dryer`
- `https://YOUR-SITE.pages.dev/?asset=Cummins-Generator`

## Remaining data to confirm

- Exact nameplate model and serial number for each asset
- AHU-05 location
- AHU manuals
