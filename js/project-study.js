import { getProject, projects } from "./project-data.js";

const project = getProject(new URLSearchParams(window.location.search).get("project"));

const title = document.querySelector("#study-title");
const description = document.querySelector("#study-description");
const studyFlow = document.querySelector("#study-flow");
const kicker = document.querySelector("#study-kicker");
const concepts = document.querySelector("#study-concepts");
const level = document.querySelector("#study-level");
const breadcrumb = document.querySelector("#study-breadcrumb");

const resourceOptions = document.querySelector("#resource-options");
const resourceTitle = document.querySelector("#resource-title");
const resourceDescription = document.querySelector("#resource-description");
const resourceLink = document.querySelector("#resource-source-link");
const resourceContent = document.querySelector("#resource-content");
const copyButton = document.querySelector("#copy-code");

const previousProject = document.querySelector("#previous-project");
const nextProject = document.querySelector("#next-project");

const loadedResources = new Map();
let activeResource = null;
let markdownBasePath = "./";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInline(value) {
  const savedCode = [];
  const codeTick = String.fromCharCode(96);
  const codePattern = new RegExp(codeTick + "([^" + codeTick + "]+)" + codeTick, "g");
  let html = escapeHtml(value);

  html = html.replace(codePattern, (match, code) => {
    const token = "@@INLINE_CODE_" + savedCode.length + "@@";
    savedCode.push("<code>" + code + "</code>");
    return token;
  });

  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, url) => {
    if (!/^(https?:\/\/|mailto:|#)/i.test(url) && /^[a-z][a-z0-9+.-]*:/i.test(url)) return label;
    const href = /^(https?:\/\/|mailto:|#)/i.test(url) ? url : markdownBasePath + url;
    return '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer">' + label + "</a>";
  });

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  return html.replace(/@@INLINE_CODE_(\d+)@@/g, (match, index) => savedCode[Number(index)] || "");
}

function splitTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const output = [];
  let paragraph = [];
  let listType = null;
  let codeBlock = false;
  let codeLines = [];
  let quoteLines = [];
  const fence = String.fromCharCode(96).repeat(3);

  function flushParagraph() {
    if (paragraph.length) {
      output.push("<p>" + paragraph.map(renderInline).join(" ") + "</p>");
      paragraph = [];
    }
  }

  function closeList() {
    if (listType) {
      output.push("</" + listType + ">");
      listType = null;
    }
  }

  function flushQuote() {
    if (quoteLines.length) {
      output.push("<blockquote>" + quoteLines.map((line) => "<p>" + renderInline(line) + "</p>").join("") + "</blockquote>");
      quoteLines = [];
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.startsWith(fence)) {
      flushParagraph();
      closeList();
      flushQuote();
      if (codeBlock) {
        output.push("<pre><code>" + escapeHtml(codeLines.join("\n")) + "</code></pre>");
        codeLines = [];
        codeBlock = false;
      } else {
        codeBlock = true;
      }
      continue;
    }

    if (codeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      closeList();
      flushQuote();
      continue;
    }

    if (trimmed.startsWith("|") && index + 1 < lines.length && /^\|?[\s:|-]+\|?$/.test(lines[index + 1].trim())) {
      flushParagraph();
      closeList();
      flushQuote();
      const headers = splitTableRow(line);
      index += 1;
      const rows = [];
      while (index + 1 < lines.length && lines[index + 1].trim().startsWith("|")) {
        index += 1;
        rows.push(splitTableRow(lines[index]));
      }
      const headerHtml = headers.map((cell) => "<th>" + renderInline(cell) + "</th>").join("");
      const rowsHtml = rows.map((row) => {
        return "<tr>" + headers.map((header, column) => "<td>" + renderInline(row[column] || "") + "</td>").join("") + "</tr>";
      }).join("");
      output.push("<table><thead><tr>" + headerHtml + "</tr></thead><tbody>" + rowsHtml + "</tbody></table>");
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      flushQuote();
      const headingLevel = heading[1].length;
      output.push("<h" + headingLevel + ">" + renderInline(heading[2]) + "</h" + headingLevel + ">");
      continue;
    }

    if (/^([-*_])\1\1+$/.test(trimmed)) {
      flushParagraph();
      closeList();
      flushQuote();
      output.push("<hr>");
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      closeList();
      quoteLines.push(trimmed.replace(/^>\s?/, ""));
      continue;
    }

    const unordered = trimmed.match(/^[-*+]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      flushQuote();
      const nextType = unordered ? "ul" : "ol";
      if (listType !== nextType) {
        closeList();
        listType = nextType;
        output.push("<" + listType + ">");
      }
      output.push("<li>" + renderInline((unordered || ordered)[1]) + "</li>");
      continue;
    }

    closeList();
    flushQuote();
    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();
  flushQuote();
  if (codeBlock) output.push("<pre><code>" + escapeHtml(codeLines.join("\n")) + "</code></pre>");
  return output.join("\n");
}

async function loadFile(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error("Could not load " + path + " (HTTP " + response.status + ").");
  }
  return response.text();
}

function showError(message) {
  resourceContent.replaceChildren();
  const error = document.createElement("p");
  error.className = "study-error";
  error.textContent = message;
  resourceContent.append(error);
}

function renderProjectsNavigation(index) {
  const previous = projects[index - 1];
  const next = projects[index + 1];

  if (previous) {
    previousProject.href = "./project.html?project=" + encodeURIComponent(previous.id);
    previousProject.querySelector("b").textContent = previous.name;
  } else {
    previousProject.href = "./index.html#projects";
    previousProject.querySelector("b").textContent = "All projects";
  }

  if (next) {
    nextProject.href = "./project.html?project=" + encodeURIComponent(next.id);
    nextProject.querySelector("b").textContent = next.name;
  } else {
    nextProject.href = "./index.html#projects";
    nextProject.querySelector("b").textContent = "All projects";
  }
}

function renderResource(resource, content) {
  resourceContent.replaceChildren();

  if (resource.type === "java") {
    const pre = document.createElement("pre");
    pre.className = "java-source";
    pre.setAttribute("aria-label", "Original Java source code");

    const code = document.createElement("code");
    code.textContent = content;
    pre.append(code);
    resourceContent.append(pre);
    return;
  }

  if (resource.type === "markdown") {
    markdownBasePath = "./" + resource.path.slice(0, resource.path.lastIndexOf("/") + 1);
    const guide = document.createElement("article");
    guide.className = "markdown-content";
    guide.innerHTML = renderMarkdown(content);
    resourceContent.append(guide);
    return;
  }

  throw new Error("Unsupported resource type: " + resource.type);
}

async function selectResource(resourceId) {
  const resource = project.materials.find((item) => item.id === resourceId);
  if (!resource) {
    showError("This project resource is not registered correctly.");
    return;
  }

  activeResource = resource;
  resourceOptions.querySelectorAll("button").forEach((button) => {
    const selected = button.dataset.resourceId === resource.id;
    button.setAttribute("aria-pressed", String(selected));
  });

  resourceTitle.textContent = resource.label;
  resourceDescription.textContent = resource.type === "java"
    ? "The exact original Java source file stored in this repository."
    : "The study guide explains the original Java implementation without replacing or rewriting it.";

  resourceLink.href = "https://github.com/duartexz-dev/BuildJava.ln/blob/main/" + resource.path;
  resourceLink.textContent = "Open on GitHub ↗";
  copyButton.hidden = resource.type !== "java";
  copyButton.disabled = resource.type !== "java";

  const cached = loadedResources.get(resource.path);
  if (cached !== undefined) {
    try {
      renderResource(resource, cached);
      if (resource.type === "java") copyButton.disabled = false;
    } catch (error) {
      showError("Could not render this resource. " + error.message);
    }
    return;
  }

  resourceContent.innerHTML = '<p class="resource-loading">Loading ' + escapeHtml(resource.label.toLowerCase()) + "…</p>";

  try {
    const content = await loadFile(resource.path);
    loadedResources.set(resource.path, content);
    renderResource(resource, content);
    if (resource.type === "java") copyButton.disabled = false;
  } catch (error) {
    showError("The selected resource could not be loaded. " + error.message);
  }
}

function renderResourceOptions() {
  resourceOptions.replaceChildren();

  project.materials.forEach((resource) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "resource-tab";
    button.dataset.resourceId = resource.id;
    button.textContent = resource.label;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => selectResource(resource.id));
    resourceOptions.append(button);
  });
}

if (!project) {
  document.title = "Project not found — BuildJava.ln";
  title.textContent = "Project not found";
  description.textContent = "This exercise is not registered in the project catalogue.";
  studyFlow.textContent = "";
  kicker.textContent = "PROJECT NOT FOUND";
  breadcrumb.textContent = "Not found";
  concepts.textContent = "";
  level.textContent = "NO RESULT";
  resourceTitle.textContent = "No project selected";
  resourceDescription.textContent = "Return to the project index and choose an available exercise.";
  showError("No project resources are associated with this address.");
  copyButton.hidden = true;
  previousProject.href = "./index.html#projects";
  nextProject.href = "./index.html#projects";
} else {
  document.title = project.name + " — BuildJava.ln";
  title.textContent = project.name;
  description.textContent = project.description;
  studyFlow.textContent = project.lesson || "";
  kicker.textContent = "PROJECT " + String(project.step).padStart(2, "0") + " / " + project.difficulty.toUpperCase();
  breadcrumb.textContent = project.name;
  concepts.textContent = project.concepts.join(" · ");
  level.textContent = "LEVEL " + project.difficulty.toUpperCase();

  renderProjectsNavigation(projects.findIndex((item) => item.id === project.id));

  const materialsAreValid = Array.isArray(project.materials) &&
    project.materials.some((item) => item.id === "code" && item.type === "java") &&
    project.materials.some((item) => item.id === "didactic" && item.type === "markdown");

  if (!materialsAreValid) {
    showError("This project must define an original Java code resource and a study material resource.");
    resourceTitle.textContent = "Project resources are incomplete";
    resourceDescription.textContent = "Check the materials array in data/projects.json.";
    copyButton.hidden = true;
  } else {
    renderResourceOptions();
    selectResource("code");
  }
}

copyButton.addEventListener("click", async () => {
  if (!activeResource || activeResource.type !== "java" || copyButton.disabled) return;
  const source = loadedResources.get(activeResource.path);
  if (!source) return;

  try {
    await navigator.clipboard.writeText(source);
    copyButton.textContent = "Copied";
    window.setTimeout(() => {
      copyButton.textContent = "Copy original code";
    }, 1600);
  } catch (error) {
    copyButton.textContent = "Copy unavailable";
    console.warn("Clipboard permission was unavailable.", error);
  }
});
