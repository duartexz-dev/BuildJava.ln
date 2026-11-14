import { getProject, projects } from "./project-data.js";

const params = new URLSearchParams(window.location.search);
const project = getProject(params.get("project"));

const title = document.querySelector("#study-title");
const description = document.querySelector("#study-description");
const studyFlow = document.querySelector("#study-flow");
const kicker = document.querySelector("#study-kicker");
const concepts = document.querySelector("#study-concepts");
const level = document.querySelector("#study-level");
const breadcrumb = document.querySelector("#study-breadcrumb");

const javaCode = document.querySelector("#java-source");
const copyButton = document.querySelector("#copy-code");
const sourceLink = document.querySelector("#source-file-link");
const markdownLink = document.querySelector("#markdown-source-link");
const codePath = document.querySelector("#code-path");
const markdownContainer = document.querySelector("#markdown-content");

const previousProject = document.querySelector("#previous-project");
const nextProject = document.querySelector("#next-project");

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
      const level = heading[1].length;
      output.push("<h" + level + ">" + renderInline(heading[2]) + "</h" + level + ">");
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

function showError(container, message) {
  container.innerHTML = '<p class="study-error">' + escapeHtml(message) + "</p>";
}

function setProjectNavigation(index) {
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

if (!project) {
  document.title = "Project not found — BuildJava.ln";
  title.textContent = "Project not found";
  description.textContent = "This exercise is not registered in the project catalogue.";
  studyFlow.textContent = "";
  kicker.textContent = "PROJECT NOT FOUND";
  breadcrumb.textContent = "Not found";
  concepts.textContent = "";
  level.textContent = "NO RESULT";
  showError(javaCode, "No Java source is associated with this address.");
  showError(markdownContainer, "Return to the home page and choose an available Java exercise.");
  copyButton.disabled = true;
  previousProject.href = "./index.html#projects";
  nextProject.href = "./index.html#projects";
} else {
  const projectIndex = projects.findIndex((item) => item.id === project.id);

  document.title = project.name + " — BuildJava.ln";
  title.textContent = project.name;
  description.textContent = project.description;
  studyFlow.textContent = project.lesson || "";
  kicker.textContent = "PROJECT " + String(project.step).padStart(2, "0") + " / " + project.difficulty.toUpperCase();
  breadcrumb.textContent = project.name;
  concepts.textContent = project.concepts.join(" · ");
  level.textContent = "LEVEL " + project.difficulty.toUpperCase();
  codePath.textContent = project.javaPath;

  sourceLink.href = "https://github.com/duartexz-dev/BuildJava.ln/blob/main/" + project.javaPath;
  markdownLink.href = "https://github.com/duartexz-dev/BuildJava.ln/blob/main/" + project.markdownPath;
  markdownBasePath = "./" + project.markdownPath.slice(0, project.markdownPath.lastIndexOf("/") + 1);
  setProjectNavigation(projectIndex);

  loadFile(project.javaPath)
    .then((source) => {
      javaCode.textContent = source;
      copyButton.disabled = false;
    })
    .catch((error) => {
      showError(javaCode, "The Java source could not be loaded. " + error.message);
      copyButton.disabled = true;
    });

  loadFile(project.markdownPath)
    .then((markdown) => {
      markdownContainer.innerHTML = renderMarkdown(markdown);
    })
    .catch((error) => {
      showError(markdownContainer, "The study guide could not be loaded. " + error.message);
    });
}

copyButton.addEventListener("click", async () => {
  const source = javaCode.textContent;
  if (!source || copyButton.disabled) return;

  try {
    await navigator.clipboard.writeText(source);
    copyButton.textContent = "Copied";
    window.setTimeout(() => {
      copyButton.textContent = "Copy Java";
    }, 1600);
  } catch (error) {
    copyButton.textContent = "Copy unavailable";
    console.warn("Clipboard permission was unavailable.", error);
  }
});
