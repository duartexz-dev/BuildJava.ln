# BuildJava.ln

![Java Learning Journey](https://img.shields.io/badge/Java%20Learning%20Journey-7856FF?style=for-the-badge&logo=openjdk&logoColor=white)
![20 planned projects](https://img.shields.io/badge/Projects-20-4388FF?style=for-the-badge)
![Project status](https://img.shields.io/badge/Status-In%20Progress-F45EA8?style=for-the-badge)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Learn Java by building real projects.**
A practical learning platform documenting a three-month journey through 20 Java projects — from programming fundamentals to object-oriented programming and beyond.

[🔗 Live demo](#) · [About](#about) · [Features](#features) · [Learning path](#learning-path) · [Getting started](#getting-started) · [Contributing](#contributing)

<!-- 📸 Add a screenshot or GIF of the site here — it's the single best thing you can add to this README -->
<!-- ![Preview](docs/preview.png) -->

---

## About

**BuildJava.ln** is a personal learning project built around one simple idea: the best way to learn programming is to practice, experiment, and build.

The repository combines a responsive web interface with a roadmap of 20 hands-on Java projects planned across three months. Each project is designed to introduce programming concepts progressively, provide practical exercises, and make the learning process easier to follow.

This is an evolving learning project, not a collection of finished tutorials. Project statuses reflect actual progress, and new content is added as the work is completed.

## Features

- **Interactive project catalog** — browse projects as cards that reveal details on hover/focus.
- **Plain JavaScript data model** — `js/projects.js` holds a simple array you extend as you build.
- **Personalized appearance** — light / near-black dark mode, with blue, pink, monochrome, or custom accent colors.
- **Subtle animations** — scroll reveals and transitions, respecting reduced-motion preferences.
- **Responsive design** — works across desktop, tablet, and mobile.
- **GitHub integration** — project cards link to their source folder once it exists.
- **GitHub Pages ready** — a workflow is already configured for static deployment.

## Tech stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![Java](https://img.shields.io/badge/Java-F7DF1E?style=flat-square&logo=openjdk&logoColor=black)

The interface uses HTML, CSS, Bootstrap 5, Bootstrap Icons, and vanilla JavaScript — no build step, framework, backend, or account system is required to run it locally.

## Learning path

| Stage | Focus | Examples |
|:---|:---|:---|
| 01 — Fundamentals | Variables, data types, operators, I/O | Developer Profile, Calculator |
| 02 — Logic | Conditions, loops, methods, arrays | Number Guessing Game, Java Quiz |
| 03 — Collections | Lists, searching, data manipulation | Task Manager, Contact Book |
| 04 — Object-oriented programming | Classes, objects, encapsulation, relationships | Bank Account Simulator, Library Management |
| 05 — Data and persistence | Files, CSV, error handling | Note Keeper, CSV Finance Tracker |
| 06 — Applications | HTTP requests, GUIs, integration | Java API Explorer, Pomodoro Desktop |

> **Progress matters more than deadlines.** All projects start as `planned`. A project is marked `completed` only once implementation and documentation are ready.

## Getting started

### Requirements

- A modern web browser.
- An internet connection (for Bootstrap, Bootstrap Icons, and Google Fonts).
- Git, if you want to clone the repository.
- (Optional) VS Code + Live Server extension.

### Run locally

```bash
git clone https://github.com/duartexz-dev/BuildJava.ln.git
cd BuildJava.ln
```

Open `index.html` in your browser, or use the Live Server extension in VS Code. No install or build step is needed.

## Project structure

```
BuildJava.ln/
├── index.html
├── styles/
│   └── style.css
├── js/
│   ├── app.js
│   └── projects.js
├── projects/
│   └── [java project folders]
├── .github/
│   └── workflows/
│       └── pages.yml
├── README.md
└── LICENSE
```

## Customize the catalog

Project data lives in `js/projects.js` as a plain array:

```js
const projects = [
  {
    name: "Contact Book",
    type: "Collections",
    difficulty: "Beginner",
    description: "Store and search a list of contacts.",
    concepts: ["ArrayList", "Input validation"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/tree/main/projects/contact-book"
  }
];
```

Add one object per project as you build it. Keep `status` (`planned` / `in-progress` / `completed`) accurate so the page reflects real progress.

## Connect project source code

Once a project folder exists under `projects/`, point the repo config near the top of `js/projects.js` to this repository:

```js
window.BUILDJAVA_CONFIG = {
  repoBaseUrl: "https://github.com/duartexz-dev/BuildJava.ln",
  githubProfileUrl: "https://github.com/duartexz-dev",
  repoBranch: "main"
};
```

Make sure folder names in the catalog match the directories committed to GitHub — only enable source links for paths that actually exist.

## Deploy with GitHub Pages

1. Push to the `main` branch.
2. Open **Settings → Pages** in the repository.
3. Select **GitHub Actions** as the deployment source.
4. Check the **Actions** tab for the workflow result.
5. Open the URL shown in **Settings → Pages** once the deploy succeeds.

## Roadmap

- [ ] Finish and document the 6 Fundamentals projects
- [ ] Add real screenshots/GIF to this README
- [ ] Wire `projects.js` to the actual `projects/` folders
- [ ] Add a live demo link once Pages is deployed
- [ ] Add search/filter UI for the catalog

## Contributing

This is primarily a personal learning journey, but suggestions and constructive feedback are welcome. You can help by:

- Reporting bugs or accessibility issues.
- Suggesting improvements to the learning path.
- Improving explanations and project documentation.
- Sharing ideas for additional exercises.

Keep suggestions beginner-friendly, practical, and focused on learning by building.

## License

This project is licensed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

**Built one project at a time.**
Learning Java through practice, experimentation, and continuous improvement — made by [@duartexz-dev](https://github.com/duartexz-dev).