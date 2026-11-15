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
  assert.ok(projects.length > 0);

  for (const project of projects) {
    const guidePath = resolve(root, project.markdownPath);
    assert.ok(existsSync(guidePath), project.id + " is missing its study guide");

    const guide = readFileSync(guidePath, "utf8");
    assert.ok(guide.startsWith("# "), project.id + " needs a title");

    let previousHeadingIndex = -1;
    guideSections.forEach((heading, index) => {
      const expectedHeading = "## " + (index + 1) + ". " + heading;
      const matchIndex = guide.indexOf(expectedHeading);
      assert.ok(matchIndex >= 0, project.id + " is missing guide section: " + expectedHeading);
      assert.ok(matchIndex > previousHeadingIndex, project.id + " has guide sections out of order");
      previousHeadingIndex = matchIndex;
    });

    assert.equal(guide.includes("## Guided code walkthrough"), false, project.id + " has duplicated interface-only content");
    const sourceReference = "../" + project.javaPath.replace(/^projects\//, "");
    assert.ok(guide.includes(sourceReference), project.id + " guide must link to its exact Java source");
  }
});

test("each project card contains its description and two direct GitHub file links", () => {
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  const script = readFileSync(resolve(root, "js/landing.js"), "utf8");
  const styles = readFileSync(resolve(root, "styles/site.css"), "utf8");

  assert.ok(html.includes('id="project-groups"'));
  assert.ok(script.includes("project.markdownPath"));
  assert.ok(script.includes("project.javaPath"));
  assert.ok(script.includes("repositoryFileUrl"));
  assert.ok(script.includes("Study guide"));
  assert.ok(script.includes("Java source"));
  assert.ok(script.includes("project-description"));
  assert.ok(script.includes("project-actions"));
  assert.ok(styles.includes(".project-card"));
  assert.ok(styles.includes(".project-actions"));
  assert.ok(styles.includes(".project-action-guide"));
  assert.ok(styles.includes(".project-action-source"));

  assert.equal(existsSync(resolve(root, "project.html")), false, "the site should not have a separate study page");
  assert.equal(existsSync(resolve(root, "js/project-study.js")), false, "the site should not render file contents");
});

test("JavaSage describes the two-link project index", () => {
  const agent = readFileSync(resolve(root, ".github/agents/JavaSage.agent.md"), "utf8");

  assert.ok(agent.includes("direct links to its Markdown guide and original Java source"));
  assert.ok(agent.includes("static Java project index"));
  assert.equal(agent.includes("project.html and js/project-study.js load"), false);
  assert.equal(agent.includes("copy-code action, and previous/next navigation"), false);
});

test("the Java source remains larger than the small website JavaScript layer", () => {
  const javaBytes = projects.reduce((total, project) => {
    return total + readFileSync(resolve(root, project.javaPath)).byteLength;
  }, 0);
  const javascriptBytes = ["js/landing.js", "js/project-data.js"].reduce((total, path) => {
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
