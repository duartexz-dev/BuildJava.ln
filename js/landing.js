import { projects } from "./project-data.js";

const projectGroups = document.querySelector("#project-groups");
const repositoryFileUrl = "https://github.com/duartexz-dev/BuildJava.ln/blob/main/";

const groupSettings = {
  Beginner: {
    title: "Foundations",
    description: "The first steps: syntax, input, decisions, and repetition."
  },
  Intermediate: {
    title: "Intermediate practice",
    description: "Combining concepts through objects, collections, and larger program flows."
  }
};

function createFileLink(label, path, variant) {
  const link = document.createElement("a");
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");

  link.className = "project-action " + variant;
  link.href = repositoryFileUrl + encodedPath;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;

  return link;
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const metadata = document.createElement("div");
  metadata.className = "project-card-meta";

  const number = document.createElement("span");
  number.textContent = "PROJECT " + String(project.step).padStart(2, "0");

  const level = document.createElement("span");
  level.className = "project-level";
  level.textContent = project.difficulty.toUpperCase();

  metadata.append(number, level);

  const title = document.createElement("h3");
  title.textContent = project.name;

  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = project.description;

  const actions = document.createElement("div");
  actions.className = "project-actions";
  actions.append(
    createFileLink("Study guide ↗", project.markdownPath, "project-action-guide"),
    createFileLink("Java source ↗", project.javaPath, "project-action-source")
  );

  card.append(metadata, title, description, actions);
  return card;
}

function renderProjects() {
  if (!projectGroups) return;

  projectGroups.replaceChildren();

  ["Beginner", "Intermediate"].forEach((difficulty) => {
    const groupProjects = projects
      .filter((project) => project.difficulty === difficulty)
      .sort((first, second) => first.step - second.step);

    if (groupProjects.length === 0) return;

    const settings = groupSettings[difficulty];
    const section = document.createElement("section");
    section.className = "project-group";
    section.setAttribute("aria-label", difficulty + " Java exercises");

    const heading = document.createElement("div");
    heading.className = "project-group-heading";

    const headingText = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = settings.title;

    const description = document.createElement("p");
    description.textContent = settings.description;
    headingText.append(title, description);

    const count = document.createElement("span");
    count.className = "project-group-count";
    count.textContent = String(groupProjects.length).padStart(2, "0") + " PROJECTS";

    heading.append(headingText, count);

    const grid = document.createElement("div");
    grid.className = "project-grid";

    groupProjects.forEach((project) => grid.append(createProjectCard(project)));

    section.append(heading, grid);
    projectGroups.append(section);
  });
}

renderProjects();
