import { projects } from "./project-data.js";

const projectGroups = document.querySelector("#project-groups");

const groupDescriptions = {
  Beginner: "Core syntax, console input, selection, and repetition.",
  Intermediate: "Larger exercises that combine concepts, objects, and collections."
};

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const top = document.createElement("div");
  top.className = "project-card-top";

  const number = document.createElement("span");
  number.textContent = "PROJECT " + String(project.step).padStart(2, "0");

  const level = document.createElement("span");
  level.className = "project-level";
  level.textContent = project.difficulty.toUpperCase();

  top.append(number, level);

  const title = document.createElement("h4");
  title.textContent = project.name;

  const description = document.createElement("p");
  description.textContent = project.description;

  const tags = document.createElement("div");
  tags.className = "project-tags";
  tags.setAttribute("aria-label", "Concepts practiced");

  project.concepts.slice(0, 3).forEach((concept) => {
    const tag = document.createElement("span");
    tag.textContent = concept;
    tags.append(tag);
  });

  const link = document.createElement("a");
  link.className = "project-open";
  link.href = "./project.html?project=" + encodeURIComponent(project.id);
  link.append(document.createTextNode("Open guide and Java source"));

  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  link.append(arrow);

  card.append(top, title, description, tags, link);
  return card;
}

function renderProjects() {
  if (!projectGroups) return;

  projectGroups.replaceChildren();

  const difficulties = ["Beginner", "Intermediate"];

  difficulties.forEach((difficulty) => {
    const groupProjects = projects
      .filter((project) => project.difficulty === difficulty)
      .sort((first, second) => first.step - second.step);

    if (groupProjects.length === 0) return;

    const section = document.createElement("section");
    section.className = "project-group";
    section.setAttribute("aria-label", difficulty + " exercises");

    const heading = document.createElement("div");
    heading.className = "project-group-heading";

    const title = document.createElement("h3");
    title.textContent = difficulty === "Beginner" ? "Foundations" : "Intermediate practice";

    const summary = document.createElement("p");
    summary.textContent = String(groupProjects.length).padStart(2, "0") +
      " EXERCISES / " + difficulty.toUpperCase();

    heading.append(title, summary);

    const grid = document.createElement("div");
    grid.className = "project-grid";

    groupProjects.forEach((project) => grid.append(createProjectCard(project)));

    const description = document.createElement("p");
    description.className = "group-description";
    description.textContent = groupDescriptions[difficulty];

    section.append(heading, description, grid);
    projectGroups.append(section);
  });
}

renderProjects();
