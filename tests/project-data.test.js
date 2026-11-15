import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { getProject, projects } from "../js/project-data.js";

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

test("getProject resolves known IDs and safely rejects unknown IDs", () => {
  for (const project of projects) assert.equal(getProject(project.id), project);
  assert.equal(getProject("not-a-real-project"), null);
});

test("the home page focuses on Java exercises and the real project catalogue", () => {
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  const script = readFileSync(resolve(root, "js/landing.js"), "utf8");
  assert.match(html, /Learning Java/);
  assert.match(html, /complete source code/i);
  assert.match(html, /id="projects"/);
  assert.match(html, /js\/landing\.js/);
  assert.doesNotMatch(html, /id="method"|id="scope"|id="overview"/);
  assert.match(script, /from "\.\/project-data\.js"/);
  assert.match(script, /project\.id/);
});

test("CandidateManager validates removals against the current collection size", () => {
  const source = readFileSync(resolve(root, "projects/Intermediate/CandidateManager.java"), "utf8");
  assert.match(source, /candidateNumber < 1 \|\| candidateNumber > candidates\.size\(\)/);
  assert.match(source, /private static void removeCandidate/);
  assert.match(source, /private static int readInt/);
});

test("Vehicle models its data and provides a readable object representation", () => {
  const source = readFileSync(resolve(root, "projects/Intermediate/Vehicle.java"), "utf8");
  assert.match(source, /class VehicleInfo/);
  assert.match(source, /private final String name/);
  assert.match(source, /@Override\s+public String toString\(\)/);
  assert.match(source, /System\.out\.println\(vehicle\)/);
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
