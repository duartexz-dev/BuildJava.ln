import projects from "../data/projects.json" with { type: "json" };

export { projects };

export function getProject(id) {
  return projects.find((project) => project.id === id) || null;
}
