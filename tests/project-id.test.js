import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const script = resolve(root, "scripts/project-id.sh");

function generateId(javaPath) {
  return spawnSync("bash", [script, javaPath], {
    cwd: root,
    encoding: "utf8"
  });
}

test("uses the public Java class name as the project ID", () => {
  const result = generateId("tests/fixtures/ProjectIdFixture.java");
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), "ProjectIdFixture");
});

test("adds a numeric suffix when the class name already exists", () => {
  const result = generateId("projects/Beginner/Calculator.java");
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), "Calculator2");
});

test("rejects non-Java paths and missing source files", () => {
  const wrongExtension = generateId("README.md");
  assert.notEqual(wrongExtension.status, 0);
  assert.match(wrongExtension.stderr, /Usage/);

  const missingFile = generateId("projects/Beginner/DoesNotExist.java");
  assert.notEqual(missingFile.status, 0);
  assert.match(missingFile.stderr, /not found/);
});
