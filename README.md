# BuilderJava.ln — Learn Java by building

A small, responsive landing page for a public learning project: 20 Java projects planned over 12 weeks, with practical exercises and notes aimed at beginners.

The site is built with HTML, CSS, Bootstrap 5, Bootstrap Icons, and vanilla JavaScript. It is intentionally a front-end catalogue: Java programs are run locally, not inside the browser.

## What's included

- A distinct violet, black, white, blue, and pink visual system.
- Light/dark mode and four accent palettes (Violet, Blue, Pink, Black & white), saved locally in the browser.
- Twenty project cards generated from `js/projects.js`.
- Hovering or focusing a project's number badge expands its details; click/touch also works.
- Project descriptions, estimated time, concepts, planned status, and optional learning challenges.
- Search plus combined topic, difficulty, and status filters.
- A detail modal for each project's objective and extra challenges.
- Progress counts derived from project status, rather than a hardcoded achievement.
- Scroll reveal, subtle hover motion, responsive layouts, and reduced-motion support.
- GitHub Pages workflow; no build step, framework, backend, or account is required.

## Run locally

Open `index.html` in a browser. Bootstrap, Bootstrap Icons, and Google Fonts load from CDNs, so those assets need an internet connection. Alternatively, use VS Code with Live Server.

## Update the project catalogue

Edit `js/projects.js`. Each entry describes its name, category, difficulty, status, time estimate, concepts, summary, objective, challenges, and intended folder.

Allowed status values:

- `planned`
- `in-progress`
- `completed`

Change a project's status only after the work matches that status. The page calculates the progress count from these values.

## Connect real source-code folders

The catalogue does not fabricate source links. Once the repository and project folders exist, update the configuration near the top of `js/projects.js`:

```js
window.EXERCISM_JAVA_CONFIG = {
  repoBaseUrl: "https://github.com/duartexz-dev/BuilderJava.ln",
  githubProfileUrl: "https://github.com/duartexz-dev",
  repoBranch: "main",
};
```

Make sure the `folder` values on project entries match the directories you publish. The source buttons will then link to the matching folder on GitHub.

## Publish with GitHub Pages

1. Put these files at the root of your repository.
2. Push `.github/workflows/pages.yml` to the `main` branch.
3. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the build and deployment source if needed.
4. Push a commit. After the workflow succeeds, GitHub Pages will show the public site URL in repository settings.

## Structure

```text
.
├── index.html
├── styles/style.css
├── js/app.js
├── js/projects.js
├── README.md
├── LICENSE
└── .github/workflows/pages.yml
```

## License

MIT. See `LICENSE`.
