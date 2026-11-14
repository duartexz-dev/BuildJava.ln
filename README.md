# BuildJava.ln

![Java](https://img.shields.io/badge/Java-learning%20repository-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Exercises](https://img.shields.io/badge/exercises-10-315B48?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)

**A practical record of learning Java through small programs, study notes, and continuous improvement.**

[Open the project website](https://duartexz-dev.github.io/BuildJava.ln/) · [Browse the Java source](./projects/)

## What this repository is

BuildJava.ln is a Java-first learning repository. Each exercise focuses on a concrete programming task and keeps three things together:

1. The problem being practiced.
2. A study guide explaining the relevant concepts and program flow.
3. The Java source code that implements the exercise.

The projects move from core language fundamentals into object-oriented programming and collections. The repository is a record of learning, not a claim that these console exercises are production-ready applications.

## Current exercises

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
| 10 | [CandidateManager](./projects/Intermediate/CandidateManager.java) | Methods, collections, validation, menu flow | Intermediate |

Every entry has a companion guide in [projects/md](./projects/md/). The guides cover learning goals, execution flow, concepts, examples, limitations, and possible extensions.

## How to explore an exercise

The [website](https://duartexz-dev.github.io/BuildJava.ln/) is a small index for the repository. Open any exercise to read its Markdown guide next to the Java implementation.

The study page also links directly to both source files on GitHub. The project data is maintained in one place so the overview and study pages use the same project names, descriptions, levels, and paths.

## What the exercises demonstrate

**Java fundamentals:** console input, primitive types, strings, formatted output, arithmetic, selection, loops, and random values.

**Object-oriented programming:** classes, attributes, constructors, object creation, encapsulation, and object representation.

**Collections and program structure:** ArrayList, iteration, methods, menu-driven programs, and validation of user input.

## Technology

| Technology | Purpose |
| --- | --- |
| Java | Main learning content and console exercises |
| HTML and CSS | Accessible project overview and study layout |
| JavaScript | Project catalogue, Markdown rendering, and source display |
| Node.js | JavaScript syntax checks and repository integrity tests |
| GitHub Actions | Java compilation, smoke tests, and GitHub Pages deployment |

The website has no backend, database, framework, or third-party runtime package dependency. Google Fonts are used for the presentation and fall back to local system fonts if unavailable.

## Run locally

Requirements: Java 21 or later, Node.js 22 or later for repository checks, and a local HTTP server to view the website.

Clone the repository:

    git clone https://github.com/duartexz-dev/BuildJava.ln.git
    cd BuildJava.ln

Compile and run an individual exercise:

    javac -d out projects/Intermediate/CandidateManager.java
    java -cp out Intermediate.CandidateManager

Another example:

    javac -d out projects/Beginner/Calculator.java
    java -cp out Calculator

Start a local server for the website:

    python -m http.server 8000

Open http://localhost:8000 in a browser. The study page fetches the Markdown and Java files, so opening the HTML files directly from the file system is not supported.

## Automated checks

Run the JavaScript checks:

    npm run check
    npm test

The GitHub Actions workflow also:

- Compiles every Java source file.
- Runs smoke tests for CandidateManager removal validation and Vehicle object output.
- Checks project metadata and the existence of all referenced source and guide files.
- Deploys the static website after the checks pass on the main branch.

These checks establish that the sources compile and selected behaviors work. They do not imply that every exercise has comprehensive automated test coverage.

## Repository structure

    BuildJava.ln/
    ├── .github/
    │   ├── agents/                 # Personal learning and workflow agents
    │   └── workflows/
    │       └── pages.yml           # Validation and GitHub Pages deployment
    ├── js/
    │   ├── project-data.js         # Single source for exercise metadata
    │   ├── landing.js              # Project overview rendering
    │   └── project-study.js        # Guide and source loading
    ├── projects/
    │   ├── Beginner/               # Four introductory Java exercises
    │   ├── Intermediate/           # Six combined and object-oriented exercises
    │   └── md/                     # Ten Markdown study guides
    ├── styles/
    │   ├── landing.css             # Project overview styling
    │   └── study.css               # Exercise study-page styling
    ├── tests/
    │   └── project-data.test.js    # Data, file, page, and source checks
    ├── index.html
    ├── project.html
    └── package.json

## Learning principles

- Build small programs to practice specific concepts.
- Keep explanations connected to the actual source code.
- Record limitations instead of hiding them.
- Improve the implementation as understanding grows.

## License

This project is distributed under the MIT License. See [LICENSE](./LICENSE).
