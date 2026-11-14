import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { projects } from "../js/project-data.js";
import { codeNotes, getCodeNotes } from "../js/code-notes.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("every Java exercise has a complete guided walkthrough", () => {
  assert.equal(Object.keys(codeNotes).length, projects.length);

  for (const project of projects) {
    const notes = getCodeNotes(project.id);
    assert.ok(notes, project.id + " has no code walkthrough");
    assert.ok(notes.purpose, project.id + " is missing its purpose");
    assert.ok(notes.flow, project.id + " is missing its execution flow");
    assert.ok(Array.isArray(notes.sections) && notes.sections.length >= 5,
      project.id + " needs at least five explanation sections");
  }
});

test("every explanation anchor exists in source and follows the code order", () => {
  for (const project of projects) {
    const source = readFileSync(resolve(root, project.javaPath), "utf8");
    const notes = getCodeNotes(project.id);
    let searchFrom = 0;

    for (const section of notes.sections) {
      assert.ok(section.title, project.id + " has an unnamed explanation section");
      assert.ok(section.explanation, project.id + " has an empty explanation");
      assert.ok(Array.isArray(section.items) && section.items.length > 0,
        project.id + " / " + section.title + " has no term explanations");

      const anchorIndex = source.indexOf(section.anchor, searchFrom);
      assert.notEqual(anchorIndex, -1,
        project.id + " cannot find the ordered source anchor: " + section.anchor);

      searchFrom = anchorIndex + section.anchor.length;
    }
  }
});

test("the CandidateManager lesson distinguishes return, break, and void", () => {
  const notes = getCodeNotes("CandidateManager");
  const terms = notes.sections.flatMap((section) => section.items.map((item) => item.term));

  assert.ok(terms.includes("return value"));
  assert.ok(terms.includes("return;"));
  assert.ok(terms.includes("break"));
  assert.ok(terms.includes("void"));
  assert.ok(terms.includes("private"));
  assert.ok(terms.includes("static"));
});

test("the study page connects the selectable code, explanation index, and full guide", () => {
  const html = readFileSync(resolve(root, "project.html"), "utf8");
  const script = readFileSync(resolve(root, "js/project-study.js"), "utf8");

  assert.match(html, /id="study-flow"/);
  assert.match(html, /id="guided-code"/);
  assert.match(html, /id="code-explanation"/);
  assert.match(html, /id="explanation-index"/);
  assert.match(html, /id="previous-section"/);
  assert.match(html, /id="next-section"/);
  assert.match(html, /id="markdown-content"/);
  assert.match(script, /getCodeNotes\(project\.id\)/);
  assert.match(script, /function renderGuidedCode/);
  assert.match(script, /function selectExplanation/);
  assert.match(script, /event.key === "Enter"/);
  assert.match(script, /role="button" tabindex="0"/);
});
