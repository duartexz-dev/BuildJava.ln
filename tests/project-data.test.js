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

test("the landing page is a plain introduction without CSS or a 3D scene", () => {
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  assert.match(html, /What is BuildJava\.ln/);
  assert.match(html, /learning repository/);
  assert.match(html, /project\.html\?project=TypeProfile/);
  assert.doesNotMatch(html, /stylesheet|<style|<script|trail-world|three\.module\.js|<canvas/i);
});

test("the study page uses no stylesheet and keeps a Java source code block", () => {
  const html = readFileSync(resolve(root, "project.html"), "utf8");
  assert.doesNotMatch(html, /stylesheet|<style/i);
  assert.match(html, /id="java-source"/);
  assert.match(html, /project-study\.js/);
});
