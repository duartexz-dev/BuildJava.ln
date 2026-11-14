# BuildJava.ln

**A Java learning journey, built one project at a time.**

BuildJava.ln is a public learning log for practicing Java through small, documented programs. Its website presents the current projects as a single ascending 3D trail: each stop is a thematic island, and the staircase moves from simpler exercises toward projects that combine more concepts.

## The experience

- The landing page is the trail. There is no separate project catalogue or concept map.
- Each project has its own 3D scene built around its subject.
- Hovering an island reveals a short description and the concepts practiced.
- Selecting an island opens a study page with its Markdown guide beside the original Java source.
- The staircase alternates direction as it rises, so the order is both visual and pedagogical.

The scene is rendered with Three.js. The site pins the CDN import to version 0.187.0 and uses the browser's ES module import map. An internet connection is required for the Three.js module and web fonts.

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
├── .github/
│   ├── agents/                  # Project-specific Copilot agents
│   └── workflows/               # GitHub Pages and progress automation
├── assets/
│   └── progress.svg             # Generated learning progress graphic
├── js/
│   ├── projects.js               # Progress workflow's existing catalog data
│   ├── trail-data.js             # Data used by the 3D trail and study page
│   ├── trail-world.js            # Three.js scene and island interactions
│   └── project-study.js          # Markdown and Java study-page loader
├── projects/
│   ├── Beginner/                 # Beginner Java source files
│   ├── Intermediate/             # Intermediate Java source files
│   └── md/                       # Markdown guides
├── scripts/
│   └── update-progress.mjs       # Generates assets/progress.svg
├── styles/
│   ├── trail-world.css           # Landing page presentation
│   └── project-study.css         # Study page presentation
├── index.html                    # Single-page 3D trail
└── project.html                  # Individual project study page
\`\`\`

## Run locally

A local HTTP server is required for ES modules and file fetching. From the repository folder, run:

\`\`\`bash
python -m http.server 8000
\`\`\`

Then open http://localhost:8000 in a browser with WebGL support.

## Java projects

The Java source files live in the projects folder. Each trail stop points to its matching source file and Markdown guide. Keep both aligned when a project changes. The Vehicle guide was added alongside this trail because its source existed without a matching Markdown document.

## Progress graphic

The existing progress workflow and generator remain available. The generator reads js/projects.js and writes assets/progress.svg; this legacy progress data is not rendered as a project catalogue on the website.

Run the generator locally with:

\`\`\`bash
node scripts/update-progress.mjs
\`\`\`

## License

This project is distributed under the MIT License. See LICENSE.

---

_Learning in public, one island at a time._