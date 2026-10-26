import fs from "node:fs";

const source = fs.readFileSync("js/projects.js", "utf8");

const statuses = [
    ...source.matchAll(
        /status\s*:\s*["'](planned|in-progress|completed)["']/g
    ),
].map((match) => match[1]);

const totalPlanned = 20;

const weights = {
    planned: 0,
    "in-progress": 0.5,
    completed: 1,
};

const progress = statuses.reduce(
    (total, status) => total + weights[status],
    0
);

const percentage = Math.min(
    100,
    Math.round((progress / totalPlanned) * 100)
);

const barWidth = 592;
const filledWidth = (barWidth * percentage) / 100;

const svg = `<svg xmlns="http://www.w3.org/2000/svg"
  width="640" height="112" viewBox="0 0 640 112"
  role="img" aria-labelledby="title desc">
  <title id="title">BuildJava.ln progress</title>
  <desc id="desc">${percentage}% progress toward 20 planned Java projects</desc>

  <rect width="640" height="112" rx="14" fill="#111318"/>
  <text x="24" y="30" fill="#F3F4F6"
    font-family="Arial, sans-serif" font-size="15"
    font-weight="700">BUILDJAVA.LN</text>
  <text x="616" y="30" fill="#D97706"
    font-family="Arial, sans-serif" font-size="14"
    font-weight="700" text-anchor="end">${percentage}%</text>

  <rect x="24" y="46" width="${barWidth}" height="12"
    rx="6" fill="#343741"/>
  <rect x="24" y="46" width="${filledWidth}" height="12"
    rx="6" fill="#D97706"/>

  <text x="24" y="83" fill="#A7AAB4"
    font-family="Arial, sans-serif" font-size="12">
    Java learning journey · ${statuses.length} tracked projects
  </text>
  <text x="616" y="83" fill="#A7AAB4"
    font-family="Arial, sans-serif" font-size="12"
    text-anchor="end">Target: ${totalPlanned}</text>
</svg>`;

fs.mkdirSync("assets", { recursive: true });
fs.writeFileSync("assets/progress.svg", svg);

console.log(`Progress bar updated: ${percentage}%`);