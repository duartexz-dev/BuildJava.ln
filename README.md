# BuildJava.ln

![Java](https://img.shields.io/badge/Java-learning%20repository-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Exercises](https://img.shields.io/badge/exercises-10-315B48?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)

**A Java-first record of learning through practical exercises, source code, and careful explanations.**

[Open the website](https://duartexz-dev.github.io/BuildJava.ln/) · [Browse the Java source](./projects/)

## Purpose

BuildJava.ln is a learning repository centered on Java. The programs are the main work; the website exists only to make the source code and its explanations easier to explore.

This is a record of practical learning, not a claim that the exercises are production-ready applications. Each project should make clear what was built, which Java concepts it practices, how the current implementation behaves, and what could be improved next.

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

## How each project is taught

Open a project on the [website](https://duartexz-dev.github.io/BuildJava.ln/) and choose between **Original code** and **Study material**. Both options are generated from that project's `materials` array. The original Java file is displayed as-is; the guide explains that exact implementation, including its real limitations.

Every guide follows the same eleven-section learning structure:

1. **Overview** — what the program does.
2. **Learning goals** — what the learner should understand.
3. **Prerequisites** — the concepts needed before reading the code.
4. **Project and file structure** — the source file, package, imports, and related classes.
5. **Program execution** — the actual path through the program.
6. **Complete code walkthrough** — the implementation explained in source order.
7. **Key Java concepts in context** — why each language feature is used here.
8. **Example execution** — input and output that match the source.
9. **Limitations and common mistakes** — real defects and constraints.
10. **Practice and extensions** — exercises that build on the existing code.
11. **Summary and source** — a recap and the exact Java file link.

Explanations must describe what the source actually does. They must not invent features, validation, output, or behavior that has not been implemented.

## Add the next Java project

Use the **Adicionar projeto** mode in the JavaSage agent. It reads the complete Java file from the workspace, generates a unique ID with:

```bash
bash scripts/project-id.sh path/to/Project.java
```

JavaSage then adds one entry to `data/projects.json` with a `materials` array containing the exact Java source and one Markdown study guide. The original Java file is never rewritten. The guide must follow the same structure used by the existing projects and explain the source as it exists. The source is not copied into JavaScript, and the published website does not call an AI service.

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

Requirements: Node.js 22 or later for JavaScript syntax checks, Python 3 for repository tests and a local HTTP server.

```bash
git clone https://github.com/duartexz-dev/BuildJava.ln.git
cd BuildJava.ln
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). The study page loads Java and Markdown files with HTTP requests, so opening the HTML file directly from the file system is not supported.

## Automated validation

Run the syntax checks and repository tests:

```bash
npm run check
npm test
```

Repository checks run in Python so the JavaScript test files do not increase the JavaScript code footprint.

GitHub Actions also compiles every Java source file, runs smoke tests for selected CandidateManager and Vehicle behaviors, checks repository data and study-guide structure, and deploys GitHub Pages after successful validation on the main branch.

The Python tests protect the catalogue, the two resources for every project, study-guide structure, preservation of the original CandidateManager and Vehicle exercises, and the Java-over-JavaScript line-count target. They are not a substitute for comprehensive unit tests of every Java method.

## Repository structure

```text
BuildJava.ln/
├── .github/
│   ├── agents/                 # JavaSage and design workflow instructions
│   └── workflows/
│       └── pages.yml           # Validation, Java compilation, and deployment
├── data/
│   └── projects.json           # Canonical project catalogue
├── js/
│   ├── project-data.js         # Small JSON catalogue adapter
│   ├── landing.js              # Renders the project index
│   └── project-study.js        # Loads the selected project resource
├── projects/
│   ├── Beginner/               # Four introductory Java exercises
│   ├── Intermediate/           # Six combined and object-oriented exercises
│   └── md/                     # One complete study guide per exercise
├── scripts/
│   └── project-id.sh           # Generates unique project IDs
├── styles/
│   └── site.css                # Shared, responsive presentation
├── tests/
│   ├── test_project_id.py      # Project ID generator tests
│   ├── test_repository.py      # Catalogue, resources, guides, and Java-first checks
│   └── fixtures/
│       └── ProjectIdFixture.java
├── index.html
├── project.html
└── package.json
```

## Technology

| Technology | Role |
| --- | --- |
| Java | Main learning content and console exercises |
| Markdown | Study guides and code explanations |
| HTML and CSS | Accessible project index and study layout |
| JavaScript | Generates resource options from the project data and displays the selected source or guide |
| Node.js | JavaScript syntax checks |
| Python | Repository integrity and project ID tests |
| GitHub Actions | Compilation, smoke tests, and deployment |

The website is static and has no backend, database, frontend framework, or runtime AI dependency. Google Fonts provide the typography and fall back to system fonts when unavailable.

## Learning principles

- Keep Java code as the central deliverable.
- Prefer a small working program over unnecessary interface complexity.
- Explain the actual implementation in source order.
- Make weaknesses visible instead of describing them as completed features.
- Give every new project the same documentation and validation standard.
- Improve the source as understanding grows, without hiding the learning process.

## License

This project is distributed under the MIT License. See [LICENSE](./LICENSE).
