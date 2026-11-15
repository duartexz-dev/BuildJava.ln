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
  const steps = projects.map((project) => project.step).sort((a, b) => a - b);
  assert.deepEqual(steps, Array.from({ length: projects.length }, (_, index) => index + 1));
});

test("every project defines exactly two valid resources", () => {
  for (const project of projects) {
    assert.ok(project.name);
    assert.ok(project.description);
    assert.ok(project.lesson);
    assert.ok(Array.isArray(project.concepts) && project.concepts.length > 0);
    assert.ok(Array.isArray(project.materials), project.id + " needs a materials array");
    assert.deepEqual(project.materials.map((item) => item.id), ["code", "didactic"]);

    const [code, study] = project.materials;
    assert.equal(code.label, "Original code");
    assert.equal(code.type, "java");
    assert.ok(code.path.endsWith(".java"));
    assert.equal(study.label, "Study material");
    assert.equal(study.type, "markdown");
    assert.ok(study.path.endsWith(".md"));

    for (const resource of project.materials) {
      const path = resolve(root, resource.path);
      assert.ok(existsSync(path), project.id + " references missing resource " + resource.path);
      assert.ok(readFileSync(path, "utf8").trim().length > 0, resource.path + " is empty");
    }
  }
});

test("getProject resolves known IDs and safely rejects unknown IDs", () => {
  for (const project of projects) assert.equal(getProject(project.id), project);
  assert.equal(getProject("not-a-real-project"), null);
});

test("CandidateManager remains the original menu-driven do-while exercise", () => {
  const source = readFileSync(resolve(root, "projects/Intermediate/CandidateManager.java"), "utf8");
  assert.match(source, /boolean shouldContinue = false/);
  assert.match(source, /do\\s*\\{/);
  assert.match(source, /while \\(shouldContinue\\)/);
  assert.match(source, /candidates\\.remove\\(candidatePosition\\)/);
  assert.match(source, /shouldContinue = scanner\\.nextBoolean\\(\\)/);
  assert.doesNotMatch(source, /private static void removeCandidate|private static int readInt/);
});

test("Vehicle remains the original nested-class exercise", () => {
  const source = readFileSync(resolve(root, "projects/Intermediate/Vehicle.java"), "utf8");
  assert.match(source, /public static class vehicle/);
  assert.match(source, /public vehicle\\(String name, String mark, String color, int horses, int year\\)/);
  assert.match(source, /new vehicle\\(nameVehicle, markVehicle, colorVehicle, horsesPotence, yearVehicle\\)/);
  assert.doesNotMatch(source, /@Override\\s+public String toString\\(\\)/);
});

test("the JSON file remains the only canonical project catalogue", () => {
  const catalogPath = resolve(root, "data/projects.json");
  const wrapperPath = resolve(root, "js/project-data.js");
  assert.ok(existsSync(catalogPath));
  assert.deepEqual(JSON.parse(readFileSync(catalogPath, "utf8")), projects);
  assert.match(readFileSync(wrapperPath, "utf8"), /data\\/projects\\.json/);
  assert.equal(existsSync(resolve(root, "js/code-notes.js")), false);
  assert.equal(existsSync(resolve(root, "js/lesson-parser.js")), false);
});
