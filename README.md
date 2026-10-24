# BuilderJava.ln

<p align="center">
  <img src="https://img.shields.io/badge/Java-Learning%20Journey-7856FF?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java Learning Journey">
  <img src="https://img.shields.io/badge/Projects-20-4388FF?style=for-the-badge" alt="20 planned projects">
  <img src="https://img.shields.io/badge/Status-In%20Progress-F45EA8?style=for-the-badge" alt="Project status">
</p>

<p align="center">
  <strong>Learn Java by building real projects.</strong>
  <br>
  A practical learning platform documenting a three-month journey through 20 Java projects — from programming fundamentals to object-oriented programming and beyond.
</p>

<p align="center">
  <a href="#about">About</a> ·
  <a href="#features">Features</a> ·
  <a href="#learning-path">Learning path</a> ·
  <a href="#getting-started">Getting started</a> ·
  <a href="#contributing">Contributing</a>
</p>

---

## About

**BuilderJava.ln** is a personal learning project built around one simple idea: the best way to learn programming is to practice, experiment, and build.

The repository combines a responsive web interface with a roadmap of 20 hands-on Java projects planned across three months. Each project is designed to introduce programming concepts progressively, provide practical exercises, and make the learning process easier to follow.

This is an evolving learning project, not a collection of finished tutorials. Project statuses reflect actual progress, and new content will be added as the work is completed.

## Features

- **Project card example** — one sample card reveals its specifications on hover or keyboard focus.
- **Plain JavaScript data model** — `js/projects.js` contains a regular array to use as a reference.
- **Personalized appearance** — switch between light and near-black dark modes, choose blue, pink, or monochrome accents, or select a custom color.
- **Subtle animations** — scroll reveals and interface transitions, with support for reduced-motion preferences.
- **Responsive design** — layouts adapted for desktop, tablet, and mobile.
- **GitHub integration** — connect project cards to their source code as folders become available.
- **GitHub Pages support** — workflow prepared for static site deployment.

## Tech stack

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat-square&logo=bootstrap&logoColor=white" alt="Bootstrap 5">
    <img src="https://img.shields.io/badge/Java-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="Java">
</p>

The interface uses HTML, CSS, Bootstrap 5, Bootstrap Icons, and vanilla JavaScript.

There is no JavaScript build step, frontend framework, backend, or account system required to run the website locally.

## Learning path

The catalog contains 20 planned project entries organized around a gradual increase in difficulty.

| Stage | Focus | Examples |
|:--|:--|:--|
| 01 — Fundamentals | Variables, data types, operators, and input/output | Developer Profile, Calculator |
| 02 — Logic | Conditions, loops, methods, and arrays | Number Guessing Game, Java Quiz |
| 03 — Collections | Lists, searching, and data manipulation | Task Manager, Contact Book |
| 04 — Object-oriented programming | Classes, objects, encapsulation, and relationships | Bank Account Simulator, Library Management |
| 05 — Data and persistence | Files, CSV, and error handling | Note Keeper, CSV Finance Tracker |
| 06 — Applications | HTTP requests, graphical interfaces, and integration | Java API Explorer, Pomodoro Desktop |

> **Progress matters more than deadlines.** All projects begin with the `planned` status. A project should only be marked as completed when its implementation and documentation are ready.

## Getting started

### Requirements

- A modern web browser.
- An internet connection for external resources such as Bootstrap, Bootstrap Icons, and Google Fonts.
- Git, if you want to clone the repository.
- Visual Studio Code with Live Server is optional.

### Run locally

Clone the repository:

```bash
git clone https://github.com/duartexz-dev/BuilderJava.ln.git
```

Enter the project directory:

```bash
cd BuilderJava.ln
```

Open `index.html` in your browser, or use the Live Server extension in VS Code.

No package installation or compilation is necessary.

## Project structure

```text
BuilderJava.ln/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── projects.js
├── projects/
│   └── [project directories]
├── .github/
│   └── workflows/
│       └── pages.yml
├── README.md
└── LICENSE
```

The `projects/` directory is where the Java project source folders can be added as the learning journey progresses.

## Customize the catalog

Project information is maintained in:

```text
js/projects.js
```

`js/projects.js` has a regular array with one sample object. Add objects there as needed; no search or automatic card generation is included.

```javascript
const projects = [
  {
    name: "Contact Book",
    type: "Collections",
    difficulty: "Beginner",
    description: "Store and search a list of contacts.",
    concepts: ["ArrayList", "Input validation"],
    repoUrl: "https://github.com/your-name/your-repository"
  }
];
```

The sample card is written directly in `index.html`, so edit its markup separately when building your own catalog.

## Connect project source code

Once the project folders exist, configure the repository information near the top of `js/projects.js`:

```javascript
window.EXERCISM_JAVA_CONFIG = {
  repoBaseUrl: "https://github.com/duartexz-dev/BuilderJava.ln",
  githubProfileUrl: "https://github.com/duartexz-dev",
  repoBranch: "main"
};
```

Make sure the folder names defined in the catalog match the directories committed to GitHub. Source links should only be enabled for paths that actually exist.

## Deploy with GitHub Pages

The repository includes a workflow at `.github/workflows/pages.yml`.

1. Push the website files to the `main` branch.
2. Open **Settings → Pages** in the GitHub repository.
3. Select **GitHub Actions** as the deployment source.
4. Check the **Actions** tab for the workflow result.
5. After a successful deployment, open the URL shown in the repository's Pages settings.

The workflow deploys the static website; no server or database is required.

## Contributing

This repository is primarily a personal learning journey, but suggestions and constructive feedback are welcome.

You can help by:

- Reporting bugs or accessibility issues.
- Suggesting improvements to the learning path.
- Improving explanations and project documentation.
- Sharing ideas for additional exercises.

Keep suggestions beginner-friendly, practical, and focused on learning by building.

## License

This project is licensed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<p align="center">
  <strong>Built one project at a time.</strong>
  <br>
  <sub>Learning Java through practice, experimentation, and continuous improvement.</sub>
</p>
