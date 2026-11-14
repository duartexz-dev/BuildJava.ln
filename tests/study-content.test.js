import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { projects } from "../js/project-data.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const guideSections = [
  "Overview",
  "Learning goals",
  "Prerequisites",
  "Project and file structure",
  "Program execution",
  "Complete code walkthrough",
  "Key Java concepts in context",
  "Example execution",
  "Limitations and common mistakes",
  "Practice and extensions",
  "Summary and source"
];

test("every Java project has the same complete study-guide structure", () => {
  assert.equal(projects.length, 10);

  for (const project of projects) {
    const guidePath = resolve(root, project.markdownPath);
    assert.ok(existsSync(guidePath), project.id + " is missing its study guide");

    const guide = readFileSync(guidePath, "utf8");
    assert.match(guide, /^#\s+.+/m, project.id + " needs a title");

    let previousHeadingIndex = -1;
    guideSections.forEach((heading, index) => {
      const expression = new RegExp("^##\\s+" + (index + 1) + "\\.\\s+" + heading + "$", "m");
      const match = expression.exec(guide);
      assert.ok(match, project.id + " is missing guide section " + (index + 1) + ": " + heading);
      assert.ok(match.index > previousHeadingIndex, project.id + " has guide sections out of order");
      previousHeadingIndex = match.index;
    });

    assert.doesNotMatch(guide, /^##\s+Guided code walkthrough/m, project.id + " still has duplicated interface-only content");
    const sourceReference = "../" + project.javaPath.replace(/^projects\//, "");
    assert.ok(guide.includes(sourceReference), project.id + " guide must link to its exact Java source");
  }
});

test("the study page puts the complete Java source before the full study guide", () => {
  const html = readFileSync(resolve(root, "project.html"), "utf8");
  const script = readFileSync(resolve(root, "js/project-study.js"), "utf8");
  const styles = readFileSync(resolve(root, "styles/site.css"), "utf8");

  assert.ok(html.indexOf('class="source-panel"') < html.indexOf('class="guide-panel"'));
  assert.match(html, /class="java-source"/);
  assert.match(html, /id="java-source"/);
  assert.match(html, /id="markdown-content"/);
  assert.match(html, /id="copy-code"/);
  assert.match(script, /loadFile\(project\.javaPath\)/);
  assert.match(script, /loadFile\(project\.markdownPath\)/);
  assert.match(script, /renderMarkdown\(markdown\)/);
  assert.match(styles, /grid-template-columns:\s*minmax\(0, 1\.42fr\)\s+minmax\(300px, \.78fr\)/);
  assert.match(styles, /\.markdown-content[\s\S]*?font-size:\s*12px/);
  assert.doesNotMatch(html + script, /guided-code|explanation-index|selectExplanation|previous-section|next-section/);
});

test("the Java source remains larger than the website JavaScript layer", () => {
  const javaFiles = projects.map((project) => project.javaPath);
  const appScripts = ["js/landing.js", "js/project-data.js", "js/project-study.js"];

  const javaBytes = javaFiles.reduce((total, path) => {
    return total + readFileSync(resolve(root, path)).byteLength;
  }, 0);
  const javascriptBytes = appScripts.reduce((total, path) => {
    return total + readFileSync(resolve(root, path)).byteLength;
  }, 0);

  assert.ok(
    javaBytes > javascriptBytes,
    "Java source (" + javaBytes + " bytes) should remain larger than website JavaScript (" + javascriptBytes + " bytes)"
  );
});

test("each guide identifies the matching Java source filename", () => {
  for (const project of projects) {
    const guide = readFileSync(resolve(root, project.markdownPath), "utf8");
    const javaFilename = project.javaPath.split("/").pop();
    assert.ok(guide.includes(javaFilename), project.id + " guide should identify its Java file");
  }
});
