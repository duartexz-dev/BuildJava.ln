import test from "node:test";
import assert from "node:assert/strict";
import { generateProjectId } from "../scripts/project-id.mjs";

test("uses the public Java class name as the project ID", () => {
  assert.equal(
    generateProjectId("projects/Beginner/ReadingTracker.java", "public class ReadingTracker {}", []),
    "ReadingTracker"
  );
});

test("falls back to the filename when no public class is declared", () => {
  assert.equal(
    generateProjectId("projects/Beginner/book-library.java", "class BookLibrary {}", []),
    "book-library"
  );
});

test("creates a unique suffix when the generated ID already exists", () => {
  assert.equal(
    generateProjectId("projects/Beginner/Vehicle.java", "public class Vehicle {}", ["Vehicle", "Vehicle2"]),
    "Vehicle3"
  );
});

test("rejects non-Java paths and empty source files", () => {
  assert.throws(() => generateProjectId("projects/README.md", "content", []), /\.java/);
  assert.throws(() => generateProjectId("projects/Empty.java", "  ", []), /non-empty/);
});
