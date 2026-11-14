import { getProject } from "./trail-data.js";

const params = new URLSearchParams(window.location.search);
const project = getProject(params.get("project"));
const title = document.querySelector("#study-title");
const description = document.querySelector("#study-description");
const kicker = document.querySelector("#study-kicker");
const concepts = document.querySelector("#study-concepts");
const markdownContainer = document.querySelector("#markdown-content");
const javaSource = document.querySelector("#java-source");
const copyButton = document.querySelector("#copy-code");
const markdownLink = document.querySelector("#markdown-source-link");
const codePath = document.querySelector("#code-path");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const JAVA_KEYWORDS = new Set([
  "abstract","assert","boolean","break","byte","case","catch","char","class","const","continue",
  "default","do","double","else","enum","extends","final","finally","float","for","if","implements",
  "import","instanceof","int","interface","long","native","new","package","private","protected",
  "public","return","short","static","strictfp","super","switch","synchronized","this","throw",
  "throws","transient","try","void","volatile","while","true","false","null"
]);
const JAVA_TYPES = new Set([
  "String","Scanner","ArrayList","Integer","Double","Float","Character","Boolean","Object",
  "Random","Math","System","List","Map","Set"
]);
const JAVA_TOKEN_PATTERN = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|@[A-Za-z_$][\w$]*|\b[A-Za-z_$][\w$]*\b|\b\d+(?:\.\d+)?[fFdDlL]?\b/g;

function highlightJava(source) {
  let output = "";
  let cursor = 0;
  for (const match of String(source).matchAll(JAVA_TOKEN_PATTERN)) {
    const token = match[0];
    output += escapeHtml(source.slice(cursor, match.index));
    let tokenType = "";
    if (token.startsWith("//") || token.startsWith("/*")) tokenType = "comment";
    else if (token[0] === '"' || token[0] === "'") tokenType = "string";
    else if (token[0] === "@") tokenType = "annotation";
    else if (JAVA_KEYWORDS.has(token)) tokenType = "keyword";
    else if (JAVA_TYPES.has(token)) tokenType = "type";
    else if (/^\d/.test(token)) tokenType = "number";
    output += tokenType
      ? '<span class="tok-' + tokenType + '">' + escapeHtml(token) + "</span>"
      : escapeHtml(token);
    cursor = match.index + token.length;
  }
  return output + escapeHtml(source.slice(cursor));
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

if (!project) {
  document.title = "Project not found — BuildJava.ln";
  title.textContent = "Project not found";
  description.textContent = "This island could not be found on the current trail.";
  kicker.textContent = "NO MATCHING STOP";
  showError(markdownContainer, "Return to the trail and choose one of the available islands.");
  javaSource.textContent = "No source file is associated with this address.";
} else {
  document.title = project.name + " — BuildJava.ln";
  title.textContent = project.name;
  description.textContent = project.description;
  kicker.textContent = "STOP " + String(project.step).padStart(2, "0") + " / " + project.difficulty.toUpperCase();
  concepts.replaceChildren(...project.concepts.map((concept) => {
    const tag = document.createElement("span");
    tag.textContent = concept;
    return tag;
  }));
  markdownLink.href = "https://github.com/duartexz-dev/BuildJava.ln/blob/main/" + project.markdownPath;
  codePath.textContent = project.javaPath;
  document.querySelector("#code-heading").textContent = project.name + ".java";

  const markdownPromise = loadFile(project.markdownPath)
    .then((markdown) => {
      markdownContainer.innerHTML = renderMarkdown(markdown);
    })
    .catch((error) => showError(markdownContainer, "The guide could not be loaded. " + error.message));

  const sourcePromise = loadFile(project.javaPath)
    .then((source) => {
      javaSource.innerHTML = highlightJava(source);
      javaSource.classList.remove("loading-state");
      copyButton.disabled = false;
    })
    .catch((error) => {
      javaSource.textContent = "The Java source could not be loaded. " + error.message;
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
    copyButton.textContent = "Copied";
    window.setTimeout(() => {
      copyButton.textContent = "Copy code";
    }, 1600);
  } catch (error) {
    copyButton.textContent = "Copy unavailable";
    console.warn("Clipboard permission was unavailable.", error);
  }
});