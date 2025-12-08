# Ceradon Architect Stack Hub

This repo is the front-door, static SPA hub for the Ceradon Architect tools, published via GitHub Pages at <https://nbschultz97.github.io/Ceradon-Architect/>. It links to the live module apps and explains the integrated planning workflow.

## Quick start
- Serve locally with any static file host (e.g., `python -m http.server 8000`) and open `http://localhost:8000`.
- Navigate with hash routes: `/#/home`, `/#/workflow`, `/#/tools`, `/#/mission`, `/#/demos`, `/#/docs`.
- Use the light/dark toggle in the nav to switch themes.

## Updating content
- **Theme tokens:** edit `assets/css/styles.css` (`:root` and `[data-theme="light"]`).
- **Routes & views:** sections live in `index.html`; routing is in `assets/js/app.js`.
- **Tools:** update the `toolData` array in `assets/js/app.js` to add or change tool cards.
- **Workflow modes:** adjust the `workflowModes` array in `assets/js/app.js`.
- **Demo stories:** edit the `demoStories` array in `assets/js/app.js`.
- **Mission Architect embed:** update the iframe/link URL in the `mission` section of `index.html`.

## Tool deep links
- Node Architect: <https://nbschultz97.github.io/Ceradon-Node-Architect/web/index.html>
- UxS Architect: <https://nbschultz97.github.io/Ceradon-UxS-Architect/web/>
- Mesh Architect: <https://nbschultz97.github.io/Ceradon-Mesh-Architect/>
- KitSmith: <https://nbschultz97.github.io/Ceradon-KitSmith/>
- Mission Architect: <https://nbschultz97.github.io/Mission-Architect/>

## Notes
- The site is fully static and GitHub Pages–compatible; no backend or build tooling is required.
- Mission Architect already exists as its own app and is integrated via links/iframe only.
