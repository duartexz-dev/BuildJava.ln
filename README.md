# BuildJava.ln

<p align="center">
  <img src="https://img.shields.io/badge/Java-learning%20repository-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java learning repository" />
  <img src="https://img.shields.io/badge/exercises-10-315B48?style=flat-square" alt="10 Java exercises" />
  <img src="https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square" alt="MIT License" />
</p>

<p align="center">
  <strong>A Java-first learning journey built through practical projects, original source code, and study material.</strong>
</p>

<p align="center">
  <a href="https://duartexz-dev.github.io/BuildJava.ln/"><strong>Open the live website</strong></a>
  ·
  <a href="https://github.com/duartexz-dev/BuildJava.ln">Repository</a>
  ·
  <a href="https://github.com/duartexz-dev">GitHub profile</a>
  ·
  <a href="https://www.instagram.com/duarteeo.dev/">Instagram</a>
  ·
  <a href="https://www.youtube.com/@duarteeo-dev">YouTube</a>
</p>

---

## Learning progress

<p align="center">
  <strong>10 of 20 planned projects · 50%</strong><br />
  <code>██████████░░░░░░░░░░</code>
</p>

The current learning path contains ten practical Java exercises, with a working goal of twenty projects. The progress indicator tracks the catalogued exercises against that goal.

## Why I built this project

BuildJava.ln started as a way to turn my Java studies into something concrete. Instead of only following lessons or collecting disconnected examples, I wanted to practice each concept by building a small program, keeping the source code, and recording what I learned along the way.

The repository is both a learning space and a public record of that process. Its exercises move from Java fundamentals toward object-oriented programming, collections, and more structured console applications.

The goal is not to present beginner exercises as finished production software. The goal is to make progress visible, understand the code that I write, recognize its limitations, and improve it as my knowledge grows.

## What you will find here

- **10 Java exercises**, organized into Beginner and Intermediate levels.
- **Original Java source files**, kept as the primary work of the repository.
- **10 Markdown study guides**, each explaining the real implementation of its matching Java exercise.
- **A static website** for browsing the exercises and switching between source code and study material.
- **JavaSage**, a custom coding agent that automates repetitive repository tasks and helps keep new projects consistent.
- **Design agents**, coordinated by a design orchestrator to make interface changes more deliberate and easier to review.
- **Automated checks and GitHub Actions** for validating repository data, compiling Java files, running smoke tests, and publishing the website.

## Current Java exercises

| # | Project | Main concepts | Level |
| --- | --- | --- | --- |
| 01 | [TypeProfile](./projects/Beginner/TypeProfile.java) | Data types, Scanner, formatted output | Beginner |
| 02 | [WeekDay](./projects/Beginner/WeekDay.java) | switch, selection, input | Beginner |
| 03 | [Calculator](./projects/Beginner/Calculator.java) | Arithmetic, operators, switch | Beginner |
| 04 | [JoKenPo](./projects/Beginner/JoKenPo.java) | Random, conditions, loops | Beginner |
| 05 | [LoginIntermediary](./projects/Intermediate/LoginIntermediary.java) | String comparison, boolean logic, while | Intermediate |
| 06 | [bulletin](./projects/Intermediate/bulletin.java) | Classes, objects, constructors | Intermediate |
| 07 | [Vehicle](./projects/Intermediate/Vehicle.java) | Classes, objects, constructors, fields | Intermediate |
| 08 | [DeveloperProfile](./projects/Intermediate/DeveloperProfile.java) | Objects, ArrayList, enhanced for | Intermediate |
| 09 | [library](./projects/Intermediate/library.java) | ArrayList, input loop | Intermediate |
| 10 | [CandidateManager](./projects/Intermediate/CandidateManager.java) | ArrayList, switch, do-while, index handling | Intermediate |

## How the project is organized

One of the main design decisions was to keep the Java exercises separate from the website that presents them. Java is the actual learning content; HTML, CSS, and a small amount of JavaScript are only used to make that content easier to navigate.

### One catalog as the source of truth

All project information is stored in `data/projects.json`. The website does not maintain another hard-coded list of projects. Each entry contains its name, sequence, difficulty, description, concepts, and a `materials` array.

Every project has exactly two resources:

| Resource ID | Purpose | Type |
| --- | --- | --- |
| `code` | The original Java file | `java` |
| `didactic` | The matching study guide | `markdown` |

For example:

```json
{
  "id": "CandidateManager",
  "materials": [
    {
      "id": "code",
      "label": "Original code",
      "type": "java",
      "path": "projects/Intermediate/CandidateManager.java"
    },
    {
      "id": "didactic",
      "label": "Study material",
      "type": "markdown",
      "path": "projects/md/CandidateManager.md"
    }
  ]
}
```

The resource options on a project page are generated from this array. That means a new project can follow the same structure without creating another pair of custom interface panels or duplicating project information in JavaScript.

### Keep the original code and the explanation separate

The Java file is the source of truth. The website loads and displays that file as it exists in the repository; it does not reconstruct, reformat, or rewrite the code.

The study guide lives in a separate Markdown file and explains the actual implementation. It can describe limitations, bugs, and missing validation instead of pretending that the program already has features it does not have.

This separation keeps the learning material useful without changing the code being studied.

### A simpler study experience

A project page has one resource viewer. The options are generated from the selected project's `materials` array, and the selected resource is loaded into the same content area.

- **Original code** displays the Java source and provides a copy action.
- **Study material** displays the corresponding Markdown guide.
- The project navigation lets the reader move between exercises.

The site is static: it does not need a backend, database, frontend framework, or AI API at runtime.

## How JavaSage automates the workflow

As the repository grew, adding a project manually meant repeating several steps: checking the existing catalog, choosing an ID, updating metadata, writing a study guide, and verifying that every path matched.

I created **JavaSage** to centralize those repetitive tasks. Instead of treating every new exercise as a one-off change, the agent follows a defined workflow and the same repository rules every time.

JavaSage offers four main modes:

### 1. Add a project

When a new Java exercise is ready, JavaSage:

1. Reads the complete Java source from the workspace.
2. Runs `scripts/project-id.sh` to generate a unique project ID.
3. Inspects the catalog and assigns the next sequence number.
4. Adds one project entry to `data/projects.json`.
5. Creates a Markdown study guide in `projects/md/`.
6. Connects the original Java file and the guide through the two-entry `materials` array.
7. Checks that the explanation and examples match the actual source.

The Java source is read as the original work and is not silently refactored, reformatted, or replaced during registration.

### 2. Update project information

This mode is for correcting project metadata, such as its description, learning goal, concepts, difficulty, or resource paths. It does not create another catalog or rewrite the Java exercise.

### 3. Update study material

When an exercise changes or its explanation needs improvement, JavaSage reads the real Java source and updates only the matching Markdown guide. The guide must explain the implementation in source order and include its real limitations.

The original Java file remains read-only in this mode. This avoids a common documentation problem: changing the explanation and accidentally changing the code that the learner is supposed to understand.

### 4. Create a new design

The design workflow is also coordinated through agents. Instead of asking several designers to edit the same interface at once, JavaSage hands the task to the **Design Orchestrator**.

The orchestrator first understands the product, audience, requested scope, protected features, and visual goals. It then prepares a design brief, proposes a visual direction and palette for approval, and selects the specialist that best matches the task.

After implementation, the workflow passes through:

1. **Design QA/Repair** — checks the result and repairs evidenced interface problems within the approved scope.
2. **Design Security Auditor** — performs an independent, read-only review of security and privacy concerns.

This makes design changes more structured: there is a discovery phase, an explicit approval step, a focused implementation, and separate review stages. The orchestrator selects the relevant specialist instead of automatically invoking every designer.

### Design specialists

The repository includes focused agent profiles for:

- **Minimalism** — restrained layouts and clear hierarchy.
- **Maximalism** — expressive visual composition.
- **Glassmorphism** — translucent layers and depth.
- **Neumorphism** — tactile surfaces and controls.
- **Neobrutalism** — strong geometry, borders, and contrast.
- **Editorial design** — typography, grids, and reading rhythm.
- **Motion graphics** — animated graphic and typographic elements.
- **Motion design** — interaction feedback, transitions, and microinteractions.

The Design Orchestrator coordinates these specialists with the QA/Repair and Security Auditor profiles. The specialist is selected according to the approved brief; the workflow is not meant to apply every visual style at once.

## How a study guide is structured

Every Java study guide follows the same eleven sections:

1. **Overview** — what the program does.
2. **Learning goals** — what the exercise helps practice.
3. **Prerequisites** — concepts needed to understand the source.
4. **Project and file structure** — packages, imports, classes, and related files.
5. **Program execution** — the real execution path.
6. **Complete code walkthrough** — the source explained in order.
7. **Key Java concepts in context** — why each language feature is used.
8. **Example execution** — input and output consistent with the source.
9. **Limitations and common mistakes** — current constraints and defects.
10. **Practice and extensions** — suggestions for further learning.
11. **Summary and source** — a recap and a link to the original Java file.

The explanation follows the code that exists, not an imagined or improved version of it.

## Technology

| Technology | Role |
| --- | --- |
| Java | Main learning content and console exercises |
| Markdown | Study guides and code explanations |
| HTML | Page structure |
| CSS | Responsive layout and visual presentation |
| JavaScript | Loads the project catalog and selected resource |
| Python | Repository integrity tests and project ID support |
| Node.js | JavaScript syntax checks |
| GitHub Actions | Validation, compilation, smoke tests, and deployment |

The website has no backend, database, frontend framework, or runtime AI dependency.

## Run a Java exercise

Requirements: Java 21 or later.

Compile and run CandidateManager:

```bash
javac -d out projects/Intermediate/CandidateManager.java
java -cp out Intermediate.CandidateManager
```

Compile and run Calculator:

```bash
javac -d out projects/Beginner/Calculator.java
java -cp out Calculator
```

## Run the website locally

Requirements: Node.js 22 or later for syntax checks, Python 3 for repository tests and a local HTTP server.

```bash
git clone https://github.com/duartexz-dev/BuildJava.ln.git
cd BuildJava.ln
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). The study page loads Java and Markdown files through HTTP requests, so opening the HTML file directly from the file system is not supported.

## Automated validation

Run the local checks:

```bash
npm run check
npm test
```

GitHub Actions also:

- Checks JavaScript syntax and repository integrity.
- Verifies the catalog, resource paths, and study-guide structure.
- Compiles every Java exercise.
- Runs smoke tests for selected CandidateManager and Vehicle behavior.
- Deploys the static website after successful validation on the main branch.

These checks protect repository consistency and selected behaviors. They are not a substitute for comprehensive unit tests of every Java method.

## Repository structure

```text
BuildJava.ln/
├── .github/
│   ├── agents/                 # JavaSage and design-agent instructions
│   └── workflows/
│       └── pages.yml           # Validation, compilation, and deployment
├── data/
│   └── projects.json           # Canonical project catalog
├── js/
│   ├── project-data.js         # Catalog adapter
│   ├── landing.js              # Renders the project index
│   └── project-study.js        # Loads the selected project resource
├── projects/
│   ├── Beginner/               # Introductory Java exercises
│   ├── Intermediate/           # Intermediate Java exercises
│   └── md/                     # One study guide per exercise
├── scripts/
│   └── project-id.sh           # Generates unique project IDs
├── styles/
│   └── site.css                # Shared responsive styles
├── tests/
│   ├── test_project_id.py      # Project ID helper tests
│   ├── test_repository.py      # Catalog, resources, guides, and Java-first checks
│   └── fixtures/
│       └── ProjectIdFixture.java
├── index.html
├── project.html
└── package.json
```

## Learning principles

- Keep Java as the central part of the repository.
- Build practical exercises instead of collecting disconnected examples.
- Keep original source code separate from its study material.
- Explain what the program actually does, including its limitations.
- Automate repetitive work without hiding how the repository is structured.
- Preserve working features when improving the design.
- Treat each project as part of an ongoing learning process.

## About

This project is developed as a personal Java learning journey.

- [GitHub — duartexz-dev](https://github.com/duartexz-dev)
- [Instagram — @duarteeo.dev](https://www.instagram.com/duarteeo.dev/)
- [YouTube — duarteeo-dev](https://www.youtube.com/@duarteeo-dev)

**Website:** [duartexz-dev.github.io/BuildJava.ln](https://duartexz-dev.github.io/BuildJava.ln/)

## License

This project is distributed under the MIT License. See [LICENSE](./LICENSE).
