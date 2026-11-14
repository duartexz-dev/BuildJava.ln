# BuildJava.ln

**A Java learning log built around ten small projects.**

The website is a single 3D map of the current learning path. Each stop is a small thematic island, ordered from first console input to object-based programs and collections.

## Exploring the trail

The map is freely navigable; it is not tied to page scrolling.

- Left mouse drag rotates the camera.
- Right mouse drag moves the view.
- Mouse wheel zooms in and out.
- On touch screens, drag to rotate and use two fingers to move or zoom.
- Select an island or its label to open the project study.
- Hovering a stop shows a short description and the main concepts.
- Reset view returns to the initial camera position.

The 3D view uses Three.js 0.187.0 and its OrbitControls addon through an import map. A WebGL-capable browser and an internet connection for the CDN module and web fonts are required.

## Current trail

1. TypeProfile — data types and console input
2. WeekDay — switch selection
3. Calculator — arithmetic and operators
4. JoKenPo — random choices and repetition
5. LoginIntermediary — strings and boolean logic
6. bulletin — classes, objects, and averages
7. Vehicle — constructors and object attributes
8. DeveloperProfile — objects and ArrayList
9. library — collection operations
10. CandidateManager — search, removal, and menu-driven collections

The order is an editorial progression based on the current source and guides, not a claim that every topic is a strict prerequisite.

## Repository structure

\`\`\`text
BuildJava.ln/
├── .github/                      # Project agents and workflows
├── assets/                       # Generated progress graphic
├── js/
│   ├── projects.js               # Existing progress automation data
│   ├── trail-data.js             # Trail and study-page project data
│   ├── trail-world.js            # Three.js scene and camera controls
│   └── project-study.js          # Markdown and Java study loader
├── projects/
│   ├── Beginner/                 # Beginner Java source
│   ├── Intermediate/             # Intermediate Java source
│   └── md/                       # Project guides
├── scripts/                      # Progress graphic generator
├── styles/
│   ├── trail-world.css           # Landing page
│   └── project-study.css         # Study page
├── index.html                    # Interactive 3D trail
└── project.html                  # Project study page
\`\`\`

## Run locally

From the repository folder, run a local HTTP server:

\`\`\`bash
python -m http.server 8000
\`\`\`

Open http://localhost:8000 in a WebGL-capable browser. ES modules and project files are fetched over HTTP, so opening the HTML file directly is not supported.

## Java projects and guides

Each stop points to its Java source and Markdown guide. Keep both aligned when a project changes. The Vehicle guide was added because its source existed without a matching Markdown document.

## Progress graphic

The existing progress workflow remains available and continues to read \`js/projects.js\`. That legacy automation data is not rendered as a separate catalogue on the landing page.

Run the generator with:

\`\`\`bash
node scripts/update-progress.mjs
\`\`\`

## License

MIT. See \`LICENSE\`.

---

_Learning in public, through real projects._