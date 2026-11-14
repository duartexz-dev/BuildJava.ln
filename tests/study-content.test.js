import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { projects } from "../js/project-data.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("every Java project has one complete study guide", () => {
  assert.equal(projects.length, 10);

  for (const project of projects) {
    const guidePath = resolve(root, project.markdownPath);
    assert.ok(existsSync(guidePath), project.id + " is missing its study guide");

    const guide = readFileSync(guidePath, "utf8");
    assert.match(guide, /^#\s+.+/m, project.id + " needs a title");
    assert.match(guide, /^##\s+(?:\d+\.\s+)?Learning goals/m, project.id + " needs learning goals");
    assert.match(guide, /^##\s+\d+\.\s+Complete code walkthrough/m, project.id + " needs a complete code walkthrough");
    assert.match(guide, /^##\s+\d+\.\s+Key Java concepts in context/m, project.id + " needs context-specific Java concepts");
    assert.match(guide, /^##\s+\d+\.\s+Limitations and common mistakes/m, project.id + " needs limitations");
    assert.match(guide, /^##\s+\d+\.\s+Practice and extensions/m, project.id + " needs practice activities");
    assert.doesNotMatch(guide, /^##\s+Guided code walkthrough/m, project.id + " still has duplicated interface-only content");
  }
});

test("the study page puts complete Java source beside its full guide", () => {
  const html = readFileSync(resolve(root, "project.html"), "utf8");
  const script = readFileSync(resolve(root, "js/project-study.js"), "utf8");

  assert.match(html, /class="java-source"/);
  assert.match(html, /id="java-source"/);
  assert.match(html, /id="markdown-content"/);
  assert.match(html, /id="copy-code"/);
  assert.match(script, /loadFile\(project\.javaPath\)/);
  assert.match(script, /loadFile\(project\.markdownPath\)/);
  assert.match(script, /renderMarkdown\(markdown\)/);
  assert.doesNotMatch(html + script, /guided-code|explanation-index|selectExplanation|previous-section|next-section/);
});

test("each Markdown guide identifies the matching Java source", () => {
  for (const project of projects) {
    const guide = readFileSync(resolve(root, project.markdownPath), "utf8");
    const javaFilename = project.javaPath.split("/").pop();
    assert.ok(guide.includes(javaFilename), project.id + " guide should identify its Java file");
  }
});
