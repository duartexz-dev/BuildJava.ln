# BuildJava.ln

![Learning roadmap progress](./assets/progress.svg)
![Java](https://img.shields.io/badge/Java-learning%20log-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Frontend](https://img.shields.io/badge/frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-3776AB?style=flat-square)
![Three.js](https://img.shields.io/badge/3D-Three.js-111111?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

**A Java learning log explored through a free-roaming 3D trail.**

BuildJava.ln documents the process of learning Java through small, practical projects. Each project has its own themed island in a single 3D environment. Open an island to read its study guide beside the original Java source.

This is a learning project, not a finished course or a collection of production-ready applications. Exercises, explanations, and the trail itself can evolve as the underlying understanding improves.

## The experience

The landing page is intentionally centered on one interactive 3D trail rather than a dashboard or a permanent project-card catalogue.

- Each island has a theme connected to the program it represents.
- The islands are connected by a rising path of steps.
- The camera can rotate, pan, and zoom freely; movement is not tied to page scrolling.
- Selecting an island opens its guide and Java source.
- The study page keeps explanation and implementation visible side by side on larger screens.
- If WebGL is unavailable, direct links to all study pages remain available.

### Controls

| Action | Desktop | Touch |
| --- | --- | --- |
| Rotate | Drag with the primary mouse button | One-finger drag |
| Pan | Right-drag | Two-finger drag |
| Zoom | Mouse wheel | Pinch |
| Select | Hover or click an island | Tap an island |
| Keyboard navigation | Focus the canvas, use arrow keys, then Enter | Not applicable |
| Reset | Select Reset view | Select Reset view |

The scene respects the operating system's reduced-motion preference. Three.js and the font files are loaded from external CDNs, so the 3D website requires an internet connection.

## Projects on the current trail

1. **TypeProfile** — Java data types and console input.
2. **WeekDay** — selection with switch.
3. **Calculator** — arithmetic and operators.
4. **JoKenPo** — random choices, conditions, and repetition.
5. **LoginIntermediary** — strings, boolean logic, and limited attempts.
6. **bulletin** — classes, objects, and averages.
7. **Vehicle** — constructors and object attributes.
8. **DeveloperProfile** — objects and ArrayList.
9. **library** — collection operations.
10. **CandidateManager** — searching, removing, and menu-driven collections.

The order represents the current teaching progression. It is not a claim that every topic is a strict prerequisite for the next one.

## Technologies

| Technology | Role |
| --- | --- |
| Java | Language used for the practice projects. |
| HTML and CSS | Page structure, layout, and responsive presentation. |
| JavaScript | Project data, 3D interactions, and study-page behavior. |
| Three.js | 3D scene, camera, lighting, meshes, and interaction. |
| Node.js | Syntax checks, automated tests, and progress graphic generation. |
| Git and GitHub | Version control, source hosting, and automation. |
| GitHub Actions | Quality checks and static-site deployment. |
| GitHub Pages | Hosting for the static website. |

The current site does not require a backend, database, or runtime package installation. The package scripts use Node.js built-in tools only.

## Repository structure

    BuildJava.ln/
    ├── .github/
    │   ├── agents/                 # Project and design workflow agents
    │   └── workflows/
    │       ├── pages.yml           # Checks, tests, and GitHub Pages deployment
    │       └── update-progress.yml # Regenerates the progress graphic
    ├── assets/
    │   └── progress.svg            # Generated learning progress graphic
    ├── js/
    │   ├── trail-data.js           # The ten projects and their study paths
    │   ├── trail-world.js          # Three.js scene and camera interactions
    │   ├── project-study.js        # Guide rendering and Java source display
    │   └── projects.js             # Existing progress workflow data
    ├── projects/
    │   ├── Beginner/               # Beginner Java source files
    │   ├── Intermediate/            # Intermediate Java source files
    │   └── md/                     # Project study guides
    ├── scripts/
    │   └── update-progress.mjs     # Progress SVG generator
    ├── styles/
    │   ├── trail-world.css         # Landing page styles
    │   └── project-study.css       # Study page styles
    ├── tests/
    │   └── trail-data.test.js      # Project and file-integrity tests
    ├── index.html                  # 3D trail landing page
    ├── project.html                # Guide and Java source page
    └── package.json                # Node.js validation commands

## Run locally

Requirements: a modern browser, Node.js 22 or later for checks, and an internet connection for the Three.js module and remote fonts.

Clone the repository and start a local HTTP server:

    git clone https://github.com/duartexz-dev/BuildJava.ln.git
    cd BuildJava.ln
    python -m http.server 8000

Open http://localhost:8000 in the browser. ES modules and project files are fetched over HTTP, so opening index.html directly from the file system is not supported.

## Quality checks

No third-party Node.js packages are required.

Run the syntax checks:

    npm run check

Run the automated tests:

    npm test

The tests verify the trail's project count and ordering, unique IDs and themes, required project metadata, and the existence of each referenced Java source and Markdown guide.

The GitHub Pages workflow runs these checks for pull requests and before publishing changes from main. A passing workflow verifies these automated checks; it does not replace manual browser, accessibility, or visual testing.

## Progress indicator

The progress graphic at the top of this README is generated from js/projects.js by scripts/update-progress.mjs. It represents the weighted status of the learning roadmap; it is not a measure of time spent, lines of code, course completion, or the number of separate repositories.

The progress workflow runs when its source files change on main, or when manually started. It commits the SVG only when the generated file changes.

## Learning principles

- **Practice before polish.** The exercises exist to build understanding, not to claim production readiness.
- **Keep the record honest.** A planned exercise is not a completed exercise.
- **Explain the learning goal.** Each guide should describe what the program practices and how its implementation works.
- **Improve in small steps.** Source code, accessibility, validation, and documentation should be refined as the project grows.

## Feedback

Constructive feedback, issue reports, and beginner-friendly suggestions are welcome. When reporting a problem, include the file or section involved and the steps needed to reproduce it when possible.

## License

This project is distributed under the MIT License. See LICENSE for the license text.

---

_Learning in public, one improvement at a time._
