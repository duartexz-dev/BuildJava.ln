import { readFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../js/project-data.js";

export function generateProjectId(javaPath, source, existingIds = []) {
  if (extname(javaPath).toLowerCase() !== ".java") {
    throw new TypeError("A project ID can only be generated from a .java file.");
  }
  if (typeof source !== "string" || source.trim() === "") {
    throw new TypeError("The Java source must be a non-empty string.");
  }

  const declaredClass = source.match(
    /\bpublic\s+(?:(?:abstract|final|sealed|non-sealed)\s+)*(?:class|record|enum)\s+([A-Za-z_$][\w$]*)/
  );
  const baseId = declaredClass?.[1] || basename(javaPath, extname(javaPath));
  const usedIds = new Set(existingIds);

  if (!usedIds.has(baseId)) return baseId;

  let suffix = 2;
  while (usedIds.has(baseId + suffix)) suffix += 1;
  return baseId + suffix;
}

function run() {
  const javaPath = process.argv[2];
  if (!javaPath) {
    console.error("Usage: node scripts/project-id.mjs path/to/Project.java");
    process.exitCode = 1;
    return;
  }

  try {
    const absolutePath = resolve(javaPath);
    const source = readFileSync(absolutePath, "utf8");
    const existingIds = projects.map((project) => project.id);
    console.log(generateProjectId(javaPath, source, existingIds));
  } catch (error) {
    console.error("Could not generate a project ID:", error.message);
    process.exitCode = 1;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  run();
}
