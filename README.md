# BuildJava.ln

![Java](https://img.shields.io/badge/Java-learning%20repository-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Exercises](https://img.shields.io/badge/exercises-10-315B48?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)

**A Java-first record of learning through practical exercises, original source code, and careful explanations.**

[Open the website](https://duartexz-dev.github.io/BuildJava.ln/) · [GitHub profile](https://github.com/duartexz-dev) · [Instagram](https://www.instagram.com/duarteeo.dev/) · [YouTube](https://www.youtube.com/@duarteeo-dev)

<p align="center">
  <strong>10 of 20 planned projects · 50%</strong><br />
  <code>██████████░░░░░░░░░░</code>
</p>

The progress indicator tracks the ten currently catalogued Java exercises against the twenty-project learning goal.

## Purpose

BuildJava.ln is a learning repository centered on Java. The programs are the main work; the website is deliberately limited to a simple index that makes each exercise easy to find.

The site does not host a separate lesson page or display the contents of Java and Markdown files. Each project appears as a card with a short description and two direct links:
- **Study guide** — opens the project's Markdown file on GitHub.
- **Java source** — opens the original `.java` implementation on GitHub.

This is a record of practical learning, not a claim that the exercises are production-ready applications. Each guide describes what the source actually does, including its current limitations.

## Current Java exercises

| # | Project | Main concepts | Level |
| --- | --- | --- | --- |
| 01 | [TypeProfile](./projects/Beginner/TypeProfile.java) | Data types, Scanner, formatted output | Beginner |
| 02 | [WeekDay](./projects/Beginner/WeekDay.java) | switch, selection, input | Beginner |
| 03 | [Calculator](./projects/Beginner/Calculator.java) | Arithmetic, operators, switch | Beginner |
| 04 | [JoKenPo](./projects/Beginner/JoKenPo.java) | Random, conditions, loops | Beginner |
| 05 | [LoginIntermediary](./projects/Intermediate/LoginIntermediary.java) | String comparison, boolean logic, while | Intermediate |
| 06 | [bulletin](./projects/Intermediate/bulletin.java) | Classes, objects, constructors | Intermediate |
| 07 | [Vehicle](./projects/Intermediate/Vehicle.java) | Object state, constructors, toString | Intermediate |
| 08 | [DeveloperProfile](./projects/Intermediate/DeveloperProfile.java) | Objects, ArrayList, enhanced for | Intermediate |
| 09 | [library](./projects/Intermediate/library.java) | ArrayList, input loop | Intermediate |
| 10 | [CandidateManager](./projects/Intermediate/CandidateManager.java) | Methods, collections, menu flow | Intermediate |

## How each project is taught

Every exercise has one Markdown guide in `projects/md/`. The guide follows the same learning structure:

1. **Overview and learning goals** — what the program does and what the reader should understand.
2. **Prerequisites and structure** — the minimum background, package, imports, classes, and related files.
3. **Program execution** — the real path from `main` through the methods and branches.
4. **Complete code walkthrough** — meaningful statements explained in source order.
5. **Java concepts in context** — why each concept is used in this implementation.
6. **Example execution** — a realistic interaction based on the actual program.
7. **Limitations and common mistakes** — existing constraints or defects, separated from possible improvements.
8. **Practice and extensions** — small next steps that build on the concepts already present.
9. **Summary and source** — a concise recap and a link to the original Java file.

Explanations must describe what the source actually does. They must not invent features, validation, output, or behavior that has not been implemented.

## Add the next Java project

Use the **Adicionar projeto** mode in the JavaSage agent. It reads the complete Java file from the workspace, generates a unique ID with:

```bash
bash scripts/project-id.sh path/to/Project.java
```

JavaSage then adds one entry to `data/projects.json` and creates one complete Markdown study guide in `projects/md/`. The landing page automatically creates a new card from the catalogue and adds its two direct links. No new interface code or separate project page is required.

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

Requirements: Node.js 22 or later for repository checks, plus Python or another local HTTP server.

```bash
git clone https://github.com/duartexz-dev/BuildJava.ln.git
cd BuildJava.ln
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). The page reads the local project catalogue; its two project links open the corresponding files on GitHub.

## Automated validation

Run:

```bash
npm run check
npm test
```

GitHub Actions also compiles every Java source file and runs smoke tests for selected CandidateManager and Vehicle behaviors.

The tests protect important repository structure and selected behaviors. They are not a substitute for comprehensive unit tests of every Java method.

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
│   └── landing.js              # Renders project cards and direct file links
├── projects/
│   ├── Beginner/               # Four introductory Java exercises
│   ├── Intermediate/           # Six combined and object-oriented exercises
│   └── md/                     # One complete study guide per exercise
├── scripts/
│   └── project-id.sh           # Generates unique project IDs
├── styles/
│   └── site.css                # Landing page and project-card styles
├── tests/
│   ├── project-data.test.js    # Catalogue and project-index checks
│   ├── study-content.test.js   # Guide structure and direct-link checks
│   ├── test_project_id.py      # Project ID generator tests
│   └── fixtures/
│       └── ProjectIdFixture.java
├── index.html
└── package.json
```

## Technology

| Technology | Role |
| --- | --- |
| Java | Main learning content and console exercises |
| Markdown | Study guides and code explanations |
| HTML and CSS | Accessible project index and cards |
| JavaScript | Reads the project catalogue and creates the cards |
| Node.js and Python | Repository validation tests |
| GitHub Actions | Compilation, smoke tests, and deployment |

The website is static and has no backend, database, frontend framework, or runtime AI dependency. Google Fonts provide the typography and fall back to system fonts when unavailable.

## Learning principles

- Keep Java code as the central deliverable.
- Give every project a short, accurate description and two direct resource links.
- Keep the website small; the Java and Markdown files are the actual learning material.
- Explain the actual implementation, including limitations.
- Improve the source as understanding grows, without hiding the learning process.

## License

This project is distributed under the MIT License. See [LICENSE](./LICENSE).
