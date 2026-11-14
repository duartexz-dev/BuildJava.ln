import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { getProject, projects } from "../js/trail-data.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("the trail has ten projects in a unique, continuous order", () => {
  assert.equal(projects.length, 10);
  assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
  assert.equal(new Set(projects.map((project) => project.step)).size, projects.length);
  assert.deepEqual(projects.map((project) => project.step), [1,2,3,4,5,6,7,8,9,10]);
});

test("every project has complete metadata and a unique visual theme", () => {
  assert.equal(new Set(projects.map((project) => project.theme)).size, projects.length);
  for (const project of projects) {
    assert.ok(project.name, "missing project name");
    assert.ok(project.description, project.id + " is missing a description");
    assert.ok(project.lesson, project.id + " is missing a lesson goal");
    assert.ok(Array.isArray(project.concepts) && project.concepts.length > 0, project.id + " has no concepts");
    assert.ok(project.difficulty, project.id + " is missing difficulty");
  }
});

test("each trail entry points to a non-empty Java source and Markdown guide", () => {
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
