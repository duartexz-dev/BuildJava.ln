import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { projects } from "../js/project-data.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("the project catalogue has unique IDs and a continuous sequence", () => {
  assert.ok(projects.length > 0);
  assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
  assert.equal(new Set(projects.map((project) => project.step)).size, projects.length);
  const orderedSteps = projects.map((project) => project.step).sort((a, b) => a - b);
  assert.deepEqual(orderedSteps, Array.from({ length: projects.length }, (_, index) => index + 1));
});

test("every project has complete metadata and existing source and guide files", () => {
  for (const project of projects) {
    assert.ok(project.name, "missing project name");
    assert.ok(project.description, project.id + " is missing a description");
    assert.ok(project.lesson, project.id + " is missing its learning goal");
    assert.ok(Array.isArray(project.concepts) && project.concepts.length > 0, project.id + " has no concepts");
    assert.ok(project.difficulty, project.id + " is missing difficulty");

    for (const relativePath of [project.javaPath, project.markdownPath]) {
      const absolutePath = resolve(root, relativePath);
      assert.ok(existsSync(absolutePath), project.id + " references missing file: " + relativePath);
      assert.ok(readFileSync(absolutePath, "utf8").trim().length > 0, relativePath + " is empty");
    }
  }
});

test("the project index is driven by the canonical catalogue", () => {
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  const script = readFileSync(resolve(root, "js/landing.js"), "utf8");

  assert.ok(html.includes("Learning Java"));
  assert.ok(html.includes('id="projects"'));
  assert.ok(html.includes('id="project-groups"'));
  assert.ok(html.includes('href="#projects"'));
  assert.ok(html.includes("js/landing.js"));
  assert.ok(script.includes('from "./project-data.js"'));
  assert.ok(script.includes('.filter((project) => project.difficulty === difficulty)'));
  assert.ok(script.includes("project.description"));
  assert.ok(script.includes("project.markdownPath"));
  assert.ok(script.includes("project.javaPath"));
  assert.ok(script.includes("repositoryFileUrl"));
  assert.equal(html.includes("project.html"), false);
  assert.equal(script.includes("project.html"), false);
});

test("the JSON file remains the only canonical project catalogue", () => {
  const catalogPath = resolve(root, "data/projects.json");
  const wrapperPath = resolve(root, "js/project-data.js");
  assert.ok(existsSync(catalogPath));
  assert.deepEqual(JSON.parse(readFileSync(catalogPath, "utf8")), projects);
  assert.match(readFileSync(wrapperPath, "utf8"), /data\/projects\.json/);
  assert.equal(existsSync(resolve(root, "js/code-notes.js")), false);
  assert.equal(existsSync(resolve(root, "js/lesson-parser.js")), false);
});

test("the website JavaScript does not fetch or render project files", () => {
  const script = readFileSync(resolve(root, "js/landing.js"), "utf8");
  assert.equal(script.includes("fetch("), false);
  assert.equal(script.includes("renderMarkdown"), false);
  assert.equal(script.includes("textContent = await"), false);
});

test("the README progress graphic matches the current catalogue size", () => {
  const target = 20;
  const percentage = Math.round((projects.length / target) * 100);
  const filledWidth = 656 * percentage / 100;
  const readme = readFileSync(resolve(root, "README.md"), "utf8");
  const svg = readFileSync(resolve(root, "assets/progress.svg"), "utf8");

  assert.ok(readme.includes("./assets/progress.svg"));
  assert.ok(readme.includes(`**${projects.length} exercises currently catalogued**`));
  assert.ok(svg.includes(`>${percentage}%</text>`));
  assert.ok(svg.includes(`width="${filledWidth}"`));
  assert.ok(svg.includes(`${projects.length} current Java exercises`));
  assert.ok(svg.includes(`Learning roadmap target: ${target}`));
});
