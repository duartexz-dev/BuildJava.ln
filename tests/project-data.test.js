import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { getProject, projects } from "../js/project-data.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("the project set has ten entries in a unique, continuous order", () => {
  assert.equal(projects.length, 10);
  assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
  assert.equal(new Set(projects.map((project) => project.step)).size, projects.length);
  assert.deepEqual(projects.map((project) => project.step), [1,2,3,4,5,6,7,8,9,10]);
});

test("every project has complete learning metadata", () => {
  for (const project of projects) {
    assert.ok(project.name, "missing project name");
    assert.ok(project.description, project.id + " is missing a description");
    assert.ok(project.lesson, project.id + " is missing a lesson goal");
    assert.ok(Array.isArray(project.concepts) && project.concepts.length > 0, project.id + " has no concepts");
    assert.ok(project.difficulty, project.id + " is missing difficulty");
  }
});

test("each project points to a non-empty Java source and Markdown guide", () => {
  for (const project of projects) {
    for (const relativePath of [project.javaPath, project.markdownPath]) {
      const absolutePath = resolve(root, relativePath);
      assert.ok(existsSync(absolutePath), project.id + " references missing file: " + relativePath);
      assert.ok(readFileSync(absolutePath, "utf8").trim().length > 0, relativePath + " is empty");
    }
  }
});

test("getProject resolves known ids and safely rejects unknown ids", () => {
  for (const project of projects) assert.equal(getProject(project.id), project);
  assert.equal(getProject("not-a-real-project"), null);
});

test("the landing page explains the repository and loads its real project data", () => {
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  const landingScript = readFileSync(resolve(root, "js/landing.js"), "utf8");
  assert.match(html, /Learning Java/);
  assert.match(html, /practical programming exercises/);
  assert.match(html, /styles\\/site\\.css/);
  assert.match(html, /js\/landing\.js/);
  assert.match(html, /id="project-groups"/);
  assert.match(landingScript, /from "\.\/project-data\.js"/);
  assert.match(landingScript, /project\.id/);
  assert.doesNotMatch(html, /trail-world|three\.module\.js|<canvas/i);
});

test("the study page presents the guide and Java source with responsive styling", () => {
  const html = readFileSync(resolve(root, "project.html"), "utf8");
  assert.match(html, /styles\\/site\\.css/);
  assert.match(html, /project-study\.js/);
  assert.match(html, /id="markdown-content"/);
  assert.match(html, /id="java-source"/);
  assert.match(html, /id="source-file-link"/);
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
