/*
 * BuildJava.ln — dedicated project study controller.
 * Loads the checked-in Markdown guide and original Java source for one project.
 */
(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const requestedName = params.get("project");
  const project = typeof projects === "undefined"
    ? null
    : projects.find((entry) => entry.name === requestedName && entry.sourceAvailability !== "unavailable");
  const resources = window.BuildJavaProjectResources || {};
  const resource = project ? resources[project.name] : null;

  const elements = {
    title: document.getElementById("project-study-title"),
    breadcrumb: document.getElementById("project-breadcrumb-current"),
    description: document.getElementById("project-study-description"),
    difficulty: document.getElementById("project-study-difficulty"),
    status: document.getElementById("project-study-status"),
    javaLink: document.getElementById("project-java-link"),
    markdownLink: document.getElementById("project-markdown-link"),
    lessonLink: document.getElementById("lesson-source-link"),
    javaPath: document.getElementById("java-file-path"),
    lesson: document.getElementById("lesson-content"),
    code: document.getElementById("java-code"),
    copyButton: document.getElementById("copy-java-code")
  };

  const htmlEscape = (value) => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  function resolveMarkdownLink(rawUrl) {
    const url = String(rawUrl || "").trim();

    if (/^(https?:|mailto:|#)/i.test(url)) return url;
    if (/^(javascript:|data:|vbscript:)/i.test(url)) return "";
    if (url.startsWith("../") || url.startsWith("./")) return `./projects/md/${url}`;
    return "";
  }

  function renderInlineMarkdown(source) {
    let text = htmlEscape(source);
    const codeTokens = [];

    text = text.replace(/`([^`]+)`/g, (_, code) => {
      const token = `@@INLINE_CODE_${codeTokens.length}@@`;
      codeTokens.push(`<code>${code}</code>`);
      return token;
    });

    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, escapedUrl) => {
      const rawUrl = escapedUrl
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"');
      const safeUrl = resolveMarkdownLink(rawUrl);
      if (!safeUrl) return label;
      const external = /^https?:/i.test(safeUrl);
      return `<a href="${htmlEscape(safeUrl)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`;
    });

    text = text
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/__([^_]+)__/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/_([^_]+)_/g, "<em>$1</em>");

    codeTokens.forEach((html, index) => {
      text = text.replace(`@@INLINE_CODE_${index}@@`, html);
    });

    return text;
  }

  function parseTableRows(lines) {
    return lines
      .filter((line) => !/^\s*\|?\s*:?-{3,}/.test(line))
      .map((line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim()));
  }

  function renderMarkdown(markdown) {
    const lines = String(markdown || "").replace(/\r\n?/g, "\n").split("\n");
    const output = [];
    let paragraph = [];
    let listType = "";
    let codeLines = [];
    let inCode = false;

    const flushParagraph = () => {
      if (!paragraph.length) return;
      output.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    };

    const closeList = () => {
      if (!listType) return;
      output.push(`</${listType}>`);
      listType = "";
    };

    const openList = (type) => {
      if (listType === type) return;
      closeList();
      listType = type;
      output.push(`<${type}>`);
    };

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];

      if (inCode) {
        if (/^\s*```/.test(line)) {
          output.push(`<pre><code>${htmlEscape(codeLines.join("\n"))}</code></pre>`);
          codeLines = [];
          inCode = false;
        } else {
          codeLines.push(line);
        }
        continue;
      }

      if (/^\s*```/.test(line)) {
        flushParagraph();
        closeList();
        inCode = true;
        continue;
      }

      if (!line.trim()) {
        flushParagraph();
        closeList();
        continue;
      }

      if (/^\s*\|.*\|\s*$/.test(line)) {
        flushParagraph();
        closeList();
        const tableLines = [line];
        while (index + 1 < lines.length && /^\s*\|.*\|\s*$/.test(lines[index + 1])) {
          tableLines.push(lines[++index]);
        }
        const rows = parseTableRows(tableLines);
        if (rows.length) {
          const [header, ...body] = rows;
          const head = header.map((cell) => `<th scope="col">${renderInlineMarkdown(cell)}</th>`).join("");
          const bodyRows = body.map((row) => `<tr>${header.map((_, cellIndex) => `<td>${renderInlineMarkdown(row[cellIndex] || "")}</td>`).join("")}</tr>`).join("");
          output.push(`<div class="markdown-table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${bodyRows}</tbody></table></div>`);
        }
        continue;
      }

      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        flushParagraph();
        closeList();
        const level = heading[1].length;
        output.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
        continue;
      }

      if (/^\s*(---+|___+|\*\*\*+)\s*$/.test(line)) {
        flushParagraph();
        closeList();
        output.push("<hr>");
        continue;
      }

      const unordered = line.match(/^\s*[-*+]\s+(.+)$/);
      if (unordered) {
        flushParagraph();
        openList("ul");
        output.push(`<li>${renderInlineMarkdown(unordered[1])}</li>`);
        continue;
      }

      const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
      if (ordered) {
        flushParagraph();
        openList("ol");
        output.push(`<li>${renderInlineMarkdown(ordered[1])}</li>`);
        continue;
      }

      const quote = line.match(/^\s*>\s?(.+)$/);
      if (quote) {
        flushParagraph();
        closeList();
        output.push(`<blockquote><p>${renderInlineMarkdown(quote[1])}</p></blockquote>`);
        continue;
      }

      paragraph.push(line.trim());
    }

    flushParagraph();
    closeList();

    if (inCode && codeLines.length) {
      output.push(`<pre><code>${htmlEscape(codeLines.join("\n"))}</code></pre>`);
    }

    return output.join("\n");
  }

  function showLoadError(target, message) {
    if (!target) return;
    target.replaceChildren();
    const error = document.createElement("p");
    error.className = "study-error";
    error.textContent = message;
    target.append(error);
  }

  function showNotFound() {
    document.title = "Project not found — BuildJava.ln";
    if (elements.title) elements.title.textContent = "Project not found";
    if (elements.breadcrumb) elements.breadcrumb.textContent = "Unknown project";
    if (elements.description) {
      elements.description.textContent = "This project is not part of the active BuildJava.ln catalog.";
    }
    showLoadError(elements.lesson, "Choose an active project from the learning trails or the project catalog.");
    if (elements.code) elements.code.textContent = "No source file is available for this project.";
    if (elements.copyButton) elements.copyButton.disabled = true;
  }

  async function loadProject() {
    if (!project || !resource) {
      showNotFound();
      return;
    }

    document.title = `${project.name} — BuildJava.ln`;
    if (elements.title) elements.title.textContent = project.name;
    if (elements.breadcrumb) elements.breadcrumb.textContent = project.name;
    if (elements.description) elements.description.textContent = project.description || "";
    if (elements.difficulty) elements.difficulty.textContent = project.difficulty || "Difficulty not set";
    if (elements.status) {
      elements.status.textContent = String(project.status || "planned").replace(/-/g, " ");
      elements.status.dataset.status = project.status || "planned";
    }

    const javaUrl = `./${resource.javaPath}`;
    const markdownUrl = `./${resource.markdownPath}`;

    [
      [elements.javaLink, javaUrl],
      [elements.markdownLink, markdownUrl],
      [elements.lessonLink, markdownUrl]
    ].forEach(([link, url]) => {
      if (link) link.href = url;
    });

    if (elements.javaPath) elements.javaPath.textContent = resource.javaPath;

    const [markdownResult, javaResult] = await Promise.allSettled([
      fetch(markdownUrl, { headers: { Accept: "text/plain" } }),
      fetch(javaUrl, { headers: { Accept: "text/plain" } })
    ]);

    if (markdownResult.status === "fulfilled" && markdownResult.value.ok) {
      const markdown = await markdownResult.value.text();
      if (elements.lesson) {
        elements.lesson.innerHTML = renderMarkdown(markdown);
      }
    } else {
      showLoadError(elements.lesson, "The Markdown guide could not be loaded from the repository.");
    }

    if (javaResult.status === "fulfilled" && javaResult.value.ok) {
      const source = await javaResult.value.text();
      if (elements.code) elements.code.textContent = source;
      if (elements.copyButton) elements.copyButton.disabled = false;
    } else {
      if (elements.code) elements.code.textContent = "The original Java source could not be loaded from the repository.";
      if (elements.copyButton) elements.copyButton.disabled = true;
    }
  }

  elements.copyButton?.addEventListener("click", async () => {
    const source = elements.code?.textContent || "";
    if (!source || elements.copyButton.disabled) return;

    const label = elements.copyButton.querySelector("span");
    try {
      await navigator.clipboard.writeText(source);
      if (label) label.textContent = "Copied";
      elements.copyButton.setAttribute("aria-label", "Java source copied to clipboard");
    } catch (error) {
      if (label) label.textContent = "Copy unavailable";
      elements.copyButton.setAttribute("aria-label", "Clipboard access is unavailable in this browser");
    }
  });

  loadProject().catch((error) => {
    console.error("Could not load the project study page.", error);
    showLoadError(elements.lesson, "An unexpected error occurred while loading this project.");
  });
})();
