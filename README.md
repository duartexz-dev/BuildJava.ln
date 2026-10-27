# BuildJava.ln

![Learning roadmap progress](./assets/progress.svg)
![Java](https://img.shields.io/badge/Java-learning%20log-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Frontend](https://img.shields.io/badge/frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-3776AB?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

**Learn Java by building, documenting, and improving small projects.**

BuildJava.ln is a public learning log for practicing Java through small programs. The repository combines Java exercises with a lightweight website that organizes each exercise, the concepts it practices, and the next steps in the learning process.

This is a work in progress, not a finished course or a collection of production-ready applications. The catalog and roadmap can change as the code, understanding, and documentation improve. A planned exercise is an idea to explore; it should not be mistaken for completed code or a separate published repository.

## Contents

- [About](#about)
- [Project principles](#project-principles)
- [Progress indicator](#progress-indicator)
- [Technologies](#technologies)
- [Repository structure](#repository-structure)
- [Run the website locally](#run-the-website-locally)
- [Java exercise files](#java-exercise-files)
- [How the project catalog works](#how-the-project-catalog-works)
- [Automation and GitHub Pages](#automation-and-github-pages)
- [Learning direction](#learning-direction)
- [Feedback](#feedback)
- [License](#license)

## About

The purpose of BuildJava.ln is to make the learning process visible and easier to follow. Each exercise is an opportunity to practice a concept, run the code, notice what can be improved, and record the result.

The website is part of that practice. It uses standard web technologies to present the exercise catalog and provide ways to explore relationships between concepts. The website does not need a backend or database for its current functionality.

## Project principles

- **Practice before polish.** Exercises are built to develop understanding, not to claim production readiness.
- **Explain the learning goal.** Descriptions and concept tags should help readers understand what an exercise is intended to practice.
- **Keep progress honest.** A roadmap item is not complete just because it has been planned or added to the catalog.
- **Improve in small steps.** Code, accessibility, validation, and documentation can be refined over time.

## Progress indicator

The progress graphic at the top of this README is generated from the catalog in `js/projects.js` by `scripts/update-progress.mjs`. It is a weighted indicator of the learning roadmap, not a measure of time spent, lines of code, course completion, or the number of separate GitHub repositories.

The generator uses the project statuses and the target configured in the script. Its current status weights are:

| Status        | Weight | Meaning                                                      |
| ------------- | -----: | ------------------------------------------------------------ |
| `planned`     |      0 | Listed as a future exercise; implementation has not started. |
| `in-progress` |    0.5 | Work is underway or the exercise is being improved.          |
| `completed`   |      1 | The exercise is implemented, run or tested, and documented.  |

The weighted total is compared with the configured roadmap target, and the result is capped at 100%. The graphic also reports how many exercises are currently tracked in the catalog. For the exact target and calculation, see `scripts/update-progress.mjs`; the script is the source of truth for those values.

To regenerate the graphic locally, use Node.js:

```bash
node scripts/update-progress.mjs
```

The progress workflow can run automatically when the catalog or generator changes on `main`, and it can also be started manually from the **Actions** tab. It commits the SVG only when the generated file changes.

## Technologies

| Technology      | Role in the repository                                      |
| --------------- | ----------------------------------------------------------- |
| Java            | Language used for the practice exercises.                   |
| HTML5           | Website structure.                                          |
| CSS3            | Layout, responsive styles, themes, and visual presentation. |
| JavaScript      | Project catalog, rendering, and browser interactions.       |
| Bootstrap 5     | Layout utilities and responsive components.                 |
| Bootstrap Icons | Interface icons.                                            |
| Node.js         | Runs the progress graphic generator.                        |
| Git and GitHub  | Version control, source hosting, and automation.            |
| GitHub Pages    | Static website deployment.                                  |

The website loads Bootstrap, Bootstrap Icons, and web fonts from external CDNs. Those resources require an internet connection. Viewing the website does not require installing packages or running a build command.

## Repository structure

```text
BuildJava.ln/
├── .github/
│   └── workflows/
│       ├── pages.yml                 # Deploys the static website
│       └── update-progress.yml       # Regenerates the progress graphic
├── assets/
│   └── progress.svg                  # Generated learning progress graphic
├── js/
│   ├── app.js                        # Theme and accent settings
│   ├── knowledge-map.js              # Interactive concept map
│   └── projects.js                   # Catalog data and card rendering
├── projects/                         # Java practice exercises
├── scripts/
│   └── update-progress.mjs           # Generates assets/progress.svg
├── styles/
│   ├── knowledge-map.css             # Concept map styles
│   └── style.css                     # Main website styles
├── index.html                        # Website entry point
├── LICENSE
└── README.md
```

## Run the website locally

### Requirements

- A modern web browser.
- Git, if you want to clone the repository.
- Optional: Visual Studio Code with the Live Server extension.

### Steps

```bash
git clone https://github.com/duartexz-dev/BuildJava.ln.git
cd BuildJava.ln
```

Open `index.html` in a browser, or open the folder in VS Code and start it with Live Server. No dependency installation is needed to view the current static website.

### Running the Java exercises

The Java source files are stored in `projects/`. Use a JDK compatible with the source code, open an exercise in your Java editor, and run its main class. Exercises are independent practice programs; check each file for its class name, input requirements, and implementation before running it. The code and instructions for an exercise should be kept aligned as it changes.

## How the project catalog works

The website reads its catalog data from `js/projects.js`. Each entry describes an exercise and includes fields for its name, status, type, difficulty, description, concepts, and repository URL.

A catalog entry follows this general shape:

```js
{
  name: "ExampleExercise",
  status: "planned",
  type: "Fundamentals",
  difficulty: "Beginner",
  description: "Describe the problem the exercise is intended to solve.",
  concepts: ["Input", "Conditionals"],
  repoUrl: ""
}
```

Use one of the supported status values: `planned`, `in-progress`, or `completed`. Set `repoUrl` only when there is a real destination to link to; an empty value means a repository link is not available. Keep each description and concept list consistent with the actual exercise.

The **Knowledge map** view compares the concepts attached to catalog entries and visualizes their relationships. It also supports searching by project or concept and filtering by difficulty. These connections represent shared tags in the catalog; they are not a claim that the exercises depend on one another in code.

Appearance preferences, including the color theme and accent selection, are stored in the current browser through `localStorage`. They are local preferences, not user accounts or server-side settings.

## Automation and GitHub Pages

The repository contains two GitHub Actions workflows:

- **`pages.yml`** publishes the static website to GitHub Pages when changes are pushed to `main`; it can also be started manually.
- **`update-progress.yml`** runs the progress generator when relevant catalog or generator files change, or when manually started. If the SVG changes, the workflow attempts to commit the updated file.

To inspect a workflow run, open the repository's **Actions** tab and select the run. A successful deployment means the publishing workflow completed; it does not automatically verify every link, card, exercise, or visual detail.

If the progress workflow cannot push its generated file, check **Settings → Actions → General → Workflow permissions** and any branch protection rules. The workflow uses GitHub's provided token, so a personal access token should not be added just for this task.

To find the published website URL, open **Settings → Pages** in the repository. The configured publishing source and URL shown there are the source of truth if deployment settings change.

## Learning direction

The learning path is intentionally flexible rather than tied to a calendar. As the exercises evolve, useful areas to work on include:

- Strengthening fundamentals such as input, output, operators, conditions, and loops.
- Practicing methods, arrays, classes, objects, and other object-oriented programming concepts.
- Improving input validation, naming, code organization, and error handling.
- Adding clear run instructions and useful explanations to exercises.
- Introducing more structured tests and more involved exercises when the underlying concepts are understood.

These are learning priorities, not claims that every item is already implemented. The catalog and source files show the current state of the work.

## Feedback

Constructive feedback, issue reports, and beginner-friendly suggestions are welcome. When reporting a problem, include the file or section involved and the steps needed to reproduce it when possible.

## License

This project is distributed under the MIT License. See [LICENSE](./LICENSE) for the license text.

---

_Learning in public, one improvement at a time._
