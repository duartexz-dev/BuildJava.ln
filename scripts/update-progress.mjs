import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectDataPath = path.join(projectRoot, "js", "projects.js");
const outputDirectory = path.join(projectRoot, "assets");
const outputPath = path.join(outputDirectory, "progress.svg");
const target = 10;
const weights = {
  planned: 0,
  "in-progress": 0.5,
  completed: 1,
};

function readProjects() {
  let source;
  try {
    source = fs.readFileSync(projectDataPath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Project data file was not found: ${projectDataPath}`);
    }
    throw error;
  }

  const match = source.match(
    /const\s+projects\s*=\s*([\s\S]*?);\s*function\s+LoadProjects\s*\(/
  );
  if (!match) {
    throw new Error(
      'Could not find the "projects" data array in js/projects.js before LoadProjects().'
    );
  }

  let projects;
  try {
    projects = vm.runInNewContext(`(${match[1]})`, Object.create(null), {
      timeout: 1000,
    });
  } catch (error) {
    throw new Error(`Could not parse project data in js/projects.js: ${error.message}`);
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    throw new Error("Project data in js/projects.js must be a non-empty array.");
  }

  projects.forEach((project, index) => {
    const label = `Project at index ${index}`;
    if (!project || typeof project !== "object" || Array.isArray(project)) {
      throw new Error(`${label} must be an object.`);
    }
    if (typeof project.name !== "string" || project.name.trim() === "") {
      throw new Error(`${label} must have a non-empty name.`);
    }
    if (!Object.hasOwn(weights, project.status)) {
      throw new Error(
        `Project "${project.name}" has invalid or missing status "${project.status}". ` +
        'Use "planned", "in-progress", or "completed".'
      );
    }
  });

  return projects;
}

function calculateProgress(projects) {
  const weightedProgress = projects.reduce(
    (total, project) => total + weights[project.status],
    0
  );
  return Math.min(100, Math.round((weightedProgress / target) * 1000) / 10);
}

function createSvg(projects, percentage) {
  const displayPercentage = Number.isInteger(percentage)
    ? String(percentage)
    : percentage.toFixed(1);
  const barWidth = 656;
  const filledWidth = (barWidth * percentage) / 100;
  const trackedCount = projects.length;

  return `<svg xmlns="http://www.w3.org/2000/svg"
  width="720" height="164" viewBox="0 0 720 164" role="img"
  aria-labelledby="progress-title progress-description">
  <title id="progress-title">BuildJava.ln learning roadmap progress: ${displayPercentage}%</title>
  <desc id="progress-description">${displayPercentage}% weighted progress across ${trackedCount} tracked mini projects, with a target of ${target} projects. Planned projects count as 0, in-progress projects as 0.5, and completed projects as 1.</desc>
  <defs>
    <linearGradient id="progress-accent" x1="0" x2="1">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="720" height="164" rx="18" fill="#111318"/>
  <text x="32" y="42" fill="#f3f4f6" font-family="Arial, sans-serif"
    font-size="20" font-weight="700">BuildJava.ln</text>
  <text x="688" y="42" fill="#f59e0b" font-family="Arial, sans-serif"
    font-size="24" font-weight="700" text-anchor="end">${displayPercentage}%</text>
  <rect x="32" y="66" width="${barWidth}" height="16" rx="8" fill="#343741"/>
  <rect x="32" y="66" width="${filledWidth}" height="16" rx="8"
    fill="url(#progress-accent)"/>
  <text x="32" y="123" fill="#b9bbc4" font-family="Arial, sans-serif"
    font-size="14">${trackedCount} tracked mini projects</text>
  <text x="688" y="123" fill="#b9bbc4" font-family="Arial, sans-serif"
    font-size="14" text-anchor="end">Learning roadmap target: ${target}</text>
</svg>
`;
}

const projects = readProjects();
const percentage = calculateProgress(projects);
const svg = createSvg(projects, percentage);
fs.mkdirSync(outputDirectory, { recursive: true });

let existingSvg;
try {
  existingSvg = fs.readFileSync(outputPath, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }
}

if (existingSvg === svg) {
  console.log("Progress SVG is already up to date.");
} else {
  fs.writeFileSync(outputPath, svg, "utf8");
  console.log(`Generated assets/progress.svg (${percentage}% weighted progress).`);
}
