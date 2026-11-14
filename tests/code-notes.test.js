import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { projects } from "../js/project-data.js";
import { parseGuidedWalkthrough } from "../js/lesson-parser.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readLesson(project) {
  const guidePath = resolve(root, project.markdownPath);
  assert.ok(existsSync(guidePath), project.id + " is missing its Markdown guide");
  return readFileSync(guidePath, "utf8");
}

test("every Java exercise stores its guided walkthrough in its own Markdown guide", () => {
  assert.equal(projects.length, 10);

  for (const project of projects) {
    const sections = parseGuidedWalkthrough(readLesson(project));
    assert.ok(sections.length >= 5, project.id + " needs at least five guided sections");

    for (const section of sections) {
      assert.ok(section.title, project.id + " has an unnamed walkthrough section");
      assert.ok(section.anchor, project.id + " has a section without a source anchor");
      assert.ok(section.explanation, project.id + " has an empty explanation");
      assert.ok(section.items.length > 0, project.id + " / " + section.title + " has no term explanations");
    }
  }
});

test("every Markdown source anchor exists in the Java file and follows source order", () => {
  for (const project of projects) {
    const source = readFileSync(resolve(root, project.javaPath), "utf8");
    const sections = parseGuidedWalkthrough(readLesson(project));
    let searchFrom = 0;

    for (const section of sections) {
      const anchorIndex = source.indexOf(section.anchor, searchFrom);
      assert.notEqual(anchorIndex, -1,
        project.id + " cannot find the ordered source anchor: " + section.anchor);
      searchFrom = anchorIndex + section.anchor.length;
    }
  }
});

test("CandidateManager explains return, break, void, and method parameters", () => {
  const project = projects.find((item) => item.id === "CandidateManager");
  const sections = parseGuidedWalkthrough(readLesson(project));
  const terms = sections.flatMap((section) => section.items.map((item) => item.term));

  for (const term of ["return value", "return;", "break", "void", "private", "static"]) {
    assert.ok(terms.includes(term), "CandidateManager is missing the term " + term);
  }
});

test("the study page loads the code and its explanation from the same Markdown guide", () => {
  const html = readFileSync(resolve(root, "project.html"), "utf8");
  const script = readFileSync(resolve(root, "js/project-study.js"), "utf8");
  const parser = readFileSync(resolve(root, "js/lesson-parser.js"), "utf8");

  assert.match(html, /id="study-flow"/);
  assert.match(html, /id="guided-code"/);
  assert.match(html, /id="code-explanation"/);
  assert.match(html, /id="explanation-index"/);
  assert.match(html, /id="previous-section"/);
  assert.match(html, /id="next-section"/);
  assert.match(html, /id="markdown-content"/);
  assert.match(script, /parseGuidedWalkthrough/);
  assert.match(script, /function renderGuidedCode/);
  assert.match(script, /function selectExplanation/);
  assert.match(script, /event.key === "Enter"/);
  assert.match(script, /role="button" tabindex="0"/);
  assert.doesNotMatch(script, /code-notes\.js|getCodeNotes/);
  assert.match(parser, /Guided code walkthrough/);
});
