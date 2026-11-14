import { getProject, projects } from "./project-data.js";
import { getCodeNotes } from "./code-notes.js";

const params = new URLSearchParams(window.location.search);
const project = getProject(params.get("project"));
const title = document.querySelector("#study-title");
const description = document.querySelector("#study-description");
const studyFlow = document.querySelector("#study-flow");
const kicker = document.querySelector("#study-kicker");
const concepts = document.querySelector("#study-concepts");
const markdownContainer = document.querySelector("#markdown-content");
const javaSource = document.querySelector("#java-source");
const copyButton = document.querySelector("#copy-code");
const markdownLink = document.querySelector("#markdown-source-link");
const codePath = document.querySelector("#code-path");
const sourceFileLink = document.querySelector("#source-file-link");
const breadcrumb = document.querySelector("#study-breadcrumb");
const level = document.querySelector("#study-level");
const previousProject = document.querySelector("#previous-project");
const nextProject = document.querySelector("#next-project");
const guidedCode = document.querySelector("#guided-code");
const codeExplanation = document.querySelector("#code-explanation");
const explanationIndex = document.querySelector("#explanation-index");
const sectionCounter = document.querySelector("#section-counter");
const previousSection = document.querySelector("#previous-section");
const nextSection = document.querySelector("#next-section");
let currentSections = [];
let activeSectionIndex = 0;

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

  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (match, label, url) => {
    return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + "</a>";
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

function renderGuidedCode(source, notes) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");

  if (!notes || !Array.isArray(notes.sections) || notes.sections.length === 0) {
    guidedCode.innerHTML = '<p class="study-error">As explicações deste projeto ainda não estão disponíveis.</p>';
    return;
  }

  const starts = [];
  let searchFrom = 0;

  notes.sections.forEach((section) => {
    const anchorIndex = lines.findIndex((line, index) => index >= searchFrom && line.includes(section.anchor));
    if (anchorIndex === -1) {
      throw new Error("Trecho de referência não encontrado: " + section.anchor);
    }
    starts.push(anchorIndex);
    searchFrom = anchorIndex + 1;
  });

  currentSections = notes.sections.map((section, index) => {
    const firstLine = index === 0 ? 0 : starts[index];
    const lastLine = index < starts.length - 1 ? starts[index + 1] - 1 : lines.length - 1;
    return { ...section, firstLine, lastLine };
  });

  guidedCode.innerHTML = currentSections.map((section, index) => {
    const lineMarkup = lines.slice(section.firstLine, section.lastLine + 1).map((line, offset) => {
      const lineNumber = section.firstLine + offset + 1;
      const isComment = /^\s*(\/\/|\/\*|\*|\*\/)/.test(line);
      const className = isComment ? "source-line is-comment" : "source-line";
      return '<span class="' + className + '"><span class="line-number">' + lineNumber +
        '</span><span class="line-content">' + (line ? escapeHtml(line) : " ") + "</span></span>";
    }).join("");

    return '<button class="code-segment" type="button" data-section-index="' + index +
      '" aria-pressed="false"><span class="code-segment-heading"><b>' + escapeHtml(section.title) +
      '</b><small>LINHAS ' + (section.firstLine + 1) + "–" + (section.lastLine + 1) +
      '</small></span><pre><code>' + lineMarkup + "</code></pre></button>";
  }).join("");

  explanationIndex.innerHTML = currentSections.map((section, index) => {
    return '<button class="explanation-index-item" type="button" data-section-index="' + index +
      '" aria-current="false"><span>' + String(index + 1).padStart(2, "0") +
      '</span><b>' + escapeHtml(section.title) + '</b><small>LINHAS ' +
      (section.firstLine + 1) + "–" + (section.lastLine + 1) + "</small></button>";
  }).join("");

  activeSectionIndex = 0;
  selectExplanation(0, false);
}

function selectExplanation(index, scrollToCode = true) {
  if (!currentSections.length) return;
  activeSectionIndex = Math.max(0, Math.min(index, currentSections.length - 1));
  const section = currentSections[activeSectionIndex];

  sectionCounter.textContent = "TRECHO " + (activeSectionIndex + 1) + " / " + currentSections.length;
  const items = (section.items || []).map((item) => {
    return "<li><code>" + escapeHtml(item.term) + "</code><span>" +
      escapeHtml(item.meaning) + "</span></li>";
  }).join("");

  codeExplanation.innerHTML =
    '<p class="explanation-flow">TRECHO SELECIONADO</p>' +
    "<h3>" + escapeHtml(section.title) + "</h3>" +
    "<p>" + escapeHtml(section.explanation) + "</p>" +
    (items ? '<div class="term-list-title">ELEMENTOS DESTE TRECHO</div><ul class="term-list">' + items + "</ul>" : "");

  guidedCode.querySelectorAll(".code-segment").forEach((button, buttonIndex) => {
    const selected = buttonIndex === activeSectionIndex;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  explanationIndex.querySelectorAll(".explanation-index-item").forEach((button, buttonIndex) => {
    button.classList.toggle("is-active", buttonIndex === activeSectionIndex);
    button.setAttribute("aria-current", buttonIndex === activeSectionIndex ? "step" : "false");
  });

  previousSection.disabled = activeSectionIndex === 0;
  nextSection.disabled = activeSectionIndex === currentSections.length - 1;

  if (scrollToCode) {
    const activeCode = guidedCode.querySelector('[data-section-index="' + activeSectionIndex + '"]');
    activeCode?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

guidedCode.addEventListener("click", (event) => {
  const button = event.target.closest("[data-section-index]");
  if (button) selectExplanation(Number(button.dataset.sectionIndex), false);
});

explanationIndex.addEventListener("click", (event) => {
  const button = event.target.closest("[data-section-index]");
  if (button) {
    selectExplanation(Number(button.dataset.sectionIndex));
    guidedCode.querySelector('[data-section-index="' + activeSectionIndex + '"]')?.focus();
  }
});

previousSection.addEventListener("click", () => selectExplanation(activeSectionIndex - 1));
nextSection.addEventListener("click", () => selectExplanation(activeSectionIndex + 1));

if (!project) {
  document.title = "Projeto não encontrado — BuildJava.ln";
  title.textContent = "Projeto não encontrado";
  description.textContent = "Este exercício não foi encontrado no catálogo.";
  studyFlow.textContent = "";
  kicker.textContent = "PROJETO NÃO ENCONTRADO";
  breadcrumb.textContent = "Não encontrado";
  level.textContent = "SEM RESULTADO";
  previousProject.href = "./index.html#projects";
  nextProject.href = "./index.html#projects";
  showError(markdownContainer, "Return to the home page and open an available exercise.");
  javaSource.textContent = "No source file is associated with this address.";
} else {
  document.title = project.name + " — BuildJava.ln";
  title.textContent = project.name;
  const lessonNotes = getCodeNotes(project.id);
  description.textContent = lessonNotes?.purpose || project.description;
  studyFlow.textContent = lessonNotes?.flow || "";
  kicker.textContent = "PROJETO " + String(project.step).padStart(2, "0") + " / " + project.difficulty.toUpperCase();
  breadcrumb.textContent = project.name;
  concepts.textContent = project.concepts.join(" · ");
  level.textContent = "NÍVEL " + project.difficulty.toUpperCase() + " / EXERCÍCIO";
  markdownLink.href = "https://github.com/duartexz-dev/BuildJava.ln/blob/main/" + project.markdownPath;
  sourceFileLink.href = "https://github.com/duartexz-dev/BuildJava.ln/blob/main/" + project.javaPath;
  codePath.textContent = project.javaPath;

  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const previous = projects[projectIndex - 1];
  const next = projects[projectIndex + 1];

  if (previous) {
    previousProject.href = "./project.html?project=" + encodeURIComponent(previous.id);
    previousProject.querySelector("b").textContent = previous.name;
  } else {
    previousProject.href = "./index.html#projects";
    previousProject.querySelector("b").textContent = "Todos os projetos";
  }

  if (next) {
    nextProject.href = "./project.html?project=" + encodeURIComponent(next.id);
    nextProject.querySelector("b").textContent = next.name;
  } else {
    nextProject.href = "./index.html#projects";
    nextProject.querySelector("b").textContent = "Todos os projetos";
  }

  const markdownPromise = loadFile(project.markdownPath)
    .then((markdown) => {
      markdownContainer.innerHTML = renderMarkdown(markdown);
    })
    .catch((error) => showError(markdownContainer, "The guide could not be loaded. " + error.message));

  const sourcePromise = loadFile(project.javaPath)
    .then((source) => {
      javaSource.textContent = source;
      renderGuidedCode(source, getCodeNotes(project.id));
      copyButton.disabled = false;
    })
    .catch((error) => {
      javaSource.textContent = "O código Java não pôde ser carregado. " + error.message;
      showError(guidedCode, javaSource.textContent);
    });

  Promise.all([markdownPromise, sourcePromise]).catch((error) => {
    console.error("Project study loading failed.", error);
  });
}

copyButton.addEventListener("click", async () => {
  const source = javaSource.textContent;
  if (!source || copyButton.disabled) return;

  try {
    await navigator.clipboard.writeText(source);
    copyButton.textContent = "Copiado";
    window.setTimeout(() => {
      copyButton.textContent = "Copiar código";
    }, 1600);
  } catch (error) {
    copyButton.textContent = "Cópia indisponível";
    console.warn("Clipboard permission was unavailable.", error);
  }
});