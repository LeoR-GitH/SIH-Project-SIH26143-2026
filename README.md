# Bharat Navy AI: Maritime Forensic Platform (frontend prototype)

Smart India Hackathon 2026 · Problem Statement 26143 · Team STARK X (ID 156633)
Oil Spill Detection and Responsible Vessel Identification Using Satellite + AIS

A static, dependency-free dashboard prototype that shows the intended workflow:
detect the slick, reconstruct its origin, correlate vessels, validate candidates, report.

## What it shows

- Satellite basemap of the Arabian Sea off Mumbai (`assets/mumbai-coast.jpg`)
- Oil slick, drift particles, hindcast origin zone and +3/+6/+12 h forecast, driven by a time slider
- Ranked candidate vessels (spatial, temporal and counterfactual scores) with AIS/CSN/VTS track gap recovery
- Simulated SAR / EO / mask view of the detected slick
- Five-stage analysis pipeline and a generated investigation report
- Government-portal styling, text-size controls, keyboard navigation, light and dark themes

## Data notice

The slick, vessel tracks and CSN/VTS feeds are **simulated**. Overlay positions are geo-referenced approximately
from the image scale bar. This is not an official Government of India website.

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on GitHub Pages

1. Push this folder to your repository.
2. Settings > Pages > Build and deployment > Deploy from a branch > `main` / root.
3. The site is served at `https://<user>.github.io/<repo>/`.

## Project layout

```
index.html            page structure
css/style.css         styles and light/dark theme tokens
js/app.js             map overlays, drift/vessel simulation, table, pipeline, report, SAR canvas
assets/mumbai-coast.jpg   satellite basemap
```

## Connecting the real backend

`js/app.js` holds the demo constants (`O` origin, `V` drift vector, `VS` vessels). Replace them with responses from
the FastAPI service (OpenDrift hindcast, fused AIS + CSN + VTS tracks, ranking scores). In the React + Leaflet
frontend, the same overlays can sit on a live imagery tile layer.
