(() => {
  const projectData = projects;
  const viewButtons = [...document.querySelectorAll("[data-map-view]")];
  const projectList = document.getElementById("projects-list");
  const mapPanel = document.getElementById("knowledge-map-panel");
  const filters = document.querySelector("[data-map-filters]");
  const searchInput = document.getElementById("knowledge-map-search");
  const difficultyFilter = document.getElementById("knowledge-map-difficulty");
  const svg = document.querySelector("[data-map-svg]");
  const canvas = document.querySelector("[data-map-canvas]");
  const card = document.querySelector("[data-map-card]");
  const count = document.querySelector("[data-map-count]");
  const svgNamespace = "http://www.w3.org/2000/svg";
  const levelColors = {
    beginner: "#26966b",
    basic: "#3478f6",
    intermediate: "#7856ff",
    advanced: "#e58a19",
    challenge: "#dc4b55",
  };
  const nodeElements = [];
  const edges = [];
  const positions = [];
  let selectedIndex = -1;
  let closeTimer;
  let lastPointerType = "";
  let dragState = null;
  let suppressClickIndex = -1;
  let layoutFrame = 0;

  const normalize = (value) => String(value).trim().toLocaleLowerCase();
  const getLevel = (difficulty) => {
    const level = normalize(difficulty);
    if (level.includes("beginner") || level.includes("fundamental")) return "beginner";
    if (level.includes("basic")) return "basic";
    if (level.includes("intermediate")) return "intermediate";
    if (level.includes("advanced")) return "advanced";
    if (level.includes("challenge") || level.includes("complex")) return "challenge";
    return "unmapped";
  };
  const getConcepts = (project) => Array.isArray(project.concepts) ? project.concepts : [];
  const makeSvgElement = (name, attributes = {}) => {
    const element = document.createElementNS(svgNamespace, name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  };

  function addDifficultyOptions() {
    const levels = [...new Set(projectData.map((project) => project.difficulty).filter(Boolean))];
    levels.forEach((level) => {
      const option = document.createElement("option");
      option.value = level;
      option.textContent = level;
      difficultyFilter.append(option);
    });
  }

  function getSharedConcepts(first, second) {
    const secondConcepts = new Set(getConcepts(second).map(normalize));
    return getConcepts(first).filter((concept) => secondConcepts.has(normalize(concept)));
  }

  function layoutGraph() {
    const width = Math.max(canvas.clientWidth, 320);
    const height = Math.max(460, Math.ceil(projectData.length / 2) * 145 + 80);
    if (positions.length === 0) {
      const radiusX = width < 460 ? 0.23 : 0.34;
      const radiusY = 0.37;
      projectData.forEach((project, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI * 2) / projectData.length;
        positions.push({
          x: 0.5 + Math.cos(angle) * radiusX,
          y: 0.5 + Math.sin(angle) * radiusY,
        });
      });
    }

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.style.height = `${height}px`;
    svg.setAttribute("aria-label", `Map of ${projectData.length} Java projects and their shared concepts`);
    positions.forEach((position) => {
      position.x = Math.max(55 / width, Math.min(1 - 55 / width, position.x));
      position.y = Math.max(48 / height, Math.min(1 - 55 / height, position.y));
    });
    edges.forEach(({ element, from, to }) => {
      const startX = positions[from].x * width;
      const startY = positions[from].y * height;
      const endX = positions[to].x * width;
      const endY = positions[to].y * height;
      const bend = (from + to) % 2 === 0 ? 0.12 : -0.12;
      const controlX = (startX + endX) / 2 - (endY - startY) * bend;
      const controlY = (startY + endY) / 2 + (endX - startX) * bend;
      element.setAttribute("d", `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`);
    });
    nodeElements.forEach((node, index) => {
      node.setAttribute(
        "transform",
        `translate(${positions[index].x * width} ${positions[index].y * height})`
      );
    });
    if (!card.hidden && selectedIndex >= 0) positionCard(nodeElements[selectedIndex]);
  }

  function moveNodeToPointer(event, index) {
    const svgPoint = svg.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;
    const point = svgPoint.matrixTransform(svg.getScreenCTM().inverse());
    const [, , width, height] = svg.getAttribute("viewBox").split(" ").map(Number);
    const nextX = Math.max(55, Math.min(width - 55, point.x));
    const nextY = Math.max(48, Math.min(height - 55, point.y));
    const distance = Math.hypot(
      event.clientX - dragState.startClientX,
      event.clientY - dragState.startClientY
    );

    if (!dragState.moved && distance < 4) return;
    dragState.moved = true;
    nodeElements[index].classList.add("is-dragging");
    suppressClickIndex = index;
    positions[index] = { x: nextX / width, y: nextY / height };
    scheduleGraphLayout();
  }

  function scheduleGraphLayout() {
    if (layoutFrame) return;
    layoutFrame = window.requestAnimationFrame(() => {
      layoutFrame = 0;
      layoutGraph();
    });
  }

  function buildGraph() {
    const relationships = [];
    projectData.forEach((project, firstIndex) => {
      for (let secondIndex = firstIndex + 1; secondIndex < projectData.length; secondIndex += 1) {
        const sharedConcepts = getSharedConcepts(project, projectData[secondIndex]);
        if (sharedConcepts.length) {
          relationships.push({ from: firstIndex, to: secondIndex, sharedConcepts });
        }
      }
    });
    relationships.sort((first, second) => (
      second.sharedConcepts.length - first.sharedConcepts.length ||
      first.from - second.from ||
      first.to - second.to
    ));
    const connections = [];
    const connected = new Set(projectData.length ? [0] : []);
    while (connected.size < projectData.length) {
      const nextConnection = relationships.find(({ from, to }) => (
        connected.has(from) !== connected.has(to)
      ));
      if (!nextConnection) break;
      connections.push(nextConnection);
      connected.add(nextConnection.from);
      connected.add(nextConnection.to);
    }
    const connectionKeys = new Set(
      connections.map(({ from, to }) => `${from}-${to}`)
    );
    relationships.forEach((relationship) => {
      const key = `${relationship.from}-${relationship.to}`;
      if (relationship.sharedConcepts.length > 1 && !connectionKeys.has(key)) {
        connections.push(relationship);
        connectionKeys.add(key);
      }
    });

    connections.forEach(({ from, to, sharedConcepts }) => {
      const path = makeSvgElement("path", {
        class: `knowledge-map-edge${sharedConcepts.length > 1 ? " is-strong" : ""}`,
        "data-from": from,
        "data-to": to,
      });
      const title = makeSvgElement("title");
      title.textContent = `Shared concepts: ${sharedConcepts.join(", ")}`;
      path.append(title);
      svg.append(path);
      edges.push({ element: path, from, to });
    });

    projectData.forEach((project, index) => {
      const group = makeSvgElement("g", {
        class: "knowledge-map-node",
        tabindex: "0",
        role: "button",
        "aria-label": `${project.name}, ${project.type}, ${project.difficulty}. Select for details. Drag to move, or use arrow keys.`,
        "data-index": index,
      });
      const title = makeSvgElement("title");
      title.textContent = `${project.name} — ${project.difficulty}`;
      const ring = makeSvgElement("circle", {
        class: "knowledge-map-node-ring",
        r: 19,
      });
      const nodeColor = levelColors[getLevel(project.difficulty)] || "#7c8798";
      const core = makeSvgElement("circle", {
        class: "knowledge-map-node-core",
        r: 9,
        fill: nodeColor,
        style: `color: ${nodeColor}`,
      });
      const label = makeSvgElement("text", {
        class: "knowledge-map-node-label",
        y: 34,
      });
      label.textContent = project.name;
      group.append(title, ring, core, label);
      group.addEventListener("pointerdown", (event) => {
        lastPointerType = event.pointerType;
        if (event.button !== undefined && event.button !== 0) return;
        dragState = {
          index,
          startClientX: event.clientX,
          startClientY: event.clientY,
          moved: false,
        };
        suppressClickIndex = -1;
        group.setPointerCapture(event.pointerId);
        event.preventDefault();
      });
      group.addEventListener("pointermove", (event) => {
        if (dragState?.index === index) moveNodeToPointer(event, index);
      });
      group.addEventListener("pointerup", (event) => {
        if (dragState?.index !== index) return;
        if (dragState.moved || event.pointerType === "touch") {
          suppressClickIndex = index;
          if (event.pointerType === "touch" && !dragState.moved) {
            selectNode(index, group);
          }
        }
        if (dragState.moved) {
          if (layoutFrame) {
            window.cancelAnimationFrame(layoutFrame);
            layoutFrame = 0;
            layoutGraph();
          }
          group.classList.remove("is-dragging");
        }
        dragState = null;
        if (group.hasPointerCapture(event.pointerId)) group.releasePointerCapture(event.pointerId);
      });
      group.addEventListener("pointercancel", () => {
        if (dragState?.index === index) {
          dragState = null;
          group.classList.remove("is-dragging");
        }
      });
      group.addEventListener("pointerenter", (event) => {
        if (event.pointerType !== "touch") openCard(index, group);
      });
      group.addEventListener("pointerleave", (event) => {
        if (event.pointerType !== "touch") scheduleClose();
      });
      group.addEventListener("focus", () => {
        if (lastPointerType !== "touch") openCard(index, group);
      });
      group.addEventListener("blur", scheduleClose);
      group.addEventListener("click", (event) => {
        event.stopPropagation();
        if (suppressClickIndex === index && event.detail > 0) {
          suppressClickIndex = -1;
          return;
        }
        if (event.detail === 0 || lastPointerType === "mouse" || lastPointerType === "pen") {
          openCard(index, group);
        } else {
          selectNode(index, group);
        }
      });
      group.addEventListener("keydown", (event) => {
        const arrowOffsets = {
          ArrowUp: [0, -18],
          ArrowDown: [0, 18],
          ArrowLeft: [-18, 0],
          ArrowRight: [18, 0],
        };
        if (arrowOffsets[event.key]) {
          event.preventDefault();
          const [offsetX, offsetY] = arrowOffsets[event.key];
          const [, , width, height] = svg.getAttribute("viewBox").split(" ").map(Number);
          positions[index] = {
            x: Math.max(55 / width, Math.min(1 - 55 / width, positions[index].x + offsetX / width)),
            y: Math.max(48 / height, Math.min(1 - 55 / height, positions[index].y + offsetY / height)),
          };
          layoutGraph();
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openCard(index, group);
        } else if (event.key === "Escape") {
          closeCard();
          group.focus();
        }
      });
      svg.append(group);
      nodeElements.push(group);
    });

    svg.addEventListener("click", (event) => {
      if (event.target === svg) closeCard();
    });
    card.addEventListener("pointerenter", () => clearTimeout(closeTimer));
    card.addEventListener("pointerleave", scheduleClose);
    card.addEventListener("focusout", (event) => {
      if (!card.contains(event.relatedTarget)) scheduleClose();
    });
    card.addEventListener("click", (event) => event.stopPropagation());
    card.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeCard();
    });
    layoutGraph();
  }

  function positionCard(node) {
    const canvasRect = canvas.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const margin = 10;
    let left = nodeRect.left - canvasRect.left + nodeRect.width / 2 + 14;
    let top = nodeRect.top - canvasRect.top - 18;
    if (left + cardRect.width > canvas.clientWidth - margin) {
      left = nodeRect.left - canvasRect.left - cardRect.width - 14;
    }
    if (left < margin) left = margin;
    if (top + cardRect.height > canvas.clientHeight - margin) {
      top = canvas.clientHeight - cardRect.height - margin;
    }
    if (top < margin) top = margin;
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }

  function appendSectionTitle(container, text) {
    const heading = document.createElement("h5");
    heading.textContent = text;
    container.append(heading);
  }

  function renderCard(index) {
    const project = projectData[index];
    const header = document.createElement("div");
    header.className = "knowledge-map-card-header";
    const title = document.createElement("h4");
    title.textContent = project.name;
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "knowledge-map-card-close";
    closeButton.setAttribute("aria-label", "Close project details");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", closeCard);
    header.append(title, closeButton);

    const meta = document.createElement("p");
    meta.className = "knowledge-map-card-meta";
    const status = typeof project.status === "string"
      ? project.status.replace(/-/g, " ")
      : "";
    meta.textContent = [project.type, project.difficulty, status].filter(Boolean).join(" · ");
    const description = document.createElement("p");
    description.textContent = project.description;
    card.replaceChildren(header, meta, description);

    const concepts = getConcepts(project);
    if (concepts.length) {
      appendSectionTitle(card, "Concepts practiced");
      const list = document.createElement("ul");
      list.className = "knowledge-map-concepts";
      concepts.forEach((concept) => {
        const item = document.createElement("li");
        item.textContent = concept;
        list.append(item);
      });
      card.append(list);
    }

    const related = projectData
      .map((other, otherIndex) => ({
        project: other,
        concepts: otherIndex === index ? [] : getSharedConcepts(project, other),
      }))
      .filter((entry) => entry.concepts.length);
    appendSectionTitle(card, "Related projects and shared concepts");
    if (related.length) {
      const list = document.createElement("ul");
      related.forEach((entry) => {
        const item = document.createElement("li");
        item.textContent = `${entry.project.name} — ${entry.concepts.join(", ")}`;
        list.append(item);
      });
      card.append(list);
    } else {
      const none = document.createElement("p");
      none.textContent = "No shared concepts listed in the catalog.";
      card.append(none);
    }

    appendSectionTitle(card, "Repository");
    const repoUrl = validRepositoryUrl(project.repoUrl);
    if (repoUrl) {
      const link = document.createElement("a");
      link.href = repoUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Open repository";
      card.append(link);
    } else {
      const unavailable = document.createElement("span");
      unavailable.className = "knowledge-map-repository";
      unavailable.textContent = "Repository not available yet";
      card.append(unavailable);
    }
  }

  function validRepositoryUrl(value) {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
    } catch {
      return "";
    }
  }

  function updateSelection(index) {
    selectedIndex = index;
    nodeElements.forEach((node, nodeIndex) => {
      const hasEdge = edges.some((edge) => (
        (edge.from === index && edge.to === nodeIndex) ||
        (edge.to === index && edge.from === nodeIndex)
      ));
      const isRelated = nodeIndex === index || hasEdge;
      node.classList.toggle("is-selected", nodeIndex === index);
      node.classList.toggle("is-dimmed", index >= 0 && !isRelated);
    });
    edges.forEach(({ element, from, to }) => {
      const highlighted = index >= 0 && (from === index || to === index);
      element.classList.toggle("is-highlighted", highlighted);
      element.classList.toggle("is-dimmed", index >= 0 && !highlighted);
    });
  }

  function openCard(index, node) {
    clearTimeout(closeTimer);
    renderCard(index);
    card.hidden = false;
    positionCard(node);
    updateSelection(index);
  }

  function selectNode(index, node) {
    if (selectedIndex === index && !card.hidden) {
      closeCard();
      return;
    }
    openCard(index, node);
  }

  function closeCard() {
    clearTimeout(closeTimer);
    card.hidden = true;
    updateSelection(-1);
  }

  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      if (!card.matches(":hover") && !card.contains(document.activeElement)) closeCard();
    }, 180);
  }

  function updateFilters() {
    const query = normalize(searchInput.value);
    const difficulty = difficultyFilter.value;
    let visibleCount = 0;
    projectData.forEach((project, index) => {
      const matchesQuery = normalize(`${project.name} ${getConcepts(project).join(" ")}`)
        .includes(query);
      const matchesDifficulty = difficulty === "all" || project.difficulty === difficulty;
      const visible = matchesQuery && matchesDifficulty;
      nodeElements[index].classList.toggle("is-filtered", !visible);
      if (visible) visibleCount += 1;
    });
    edges.forEach(({ element, from, to }) => {
      const fromVisible = !nodeElements[from].classList.contains("is-filtered");
      const toVisible = !nodeElements[to].classList.contains("is-filtered");
      element.style.display = fromVisible && toVisible ? "" : "none";
    });
    count.textContent = `${visibleCount} of ${projectData.length} projects`;
    if (selectedIndex >= 0 && nodeElements[selectedIndex].classList.contains("is-filtered")) {
      closeCard();
    }
  }

  function setView(view) {
    const showMap = view === "map";
    mapPanel.hidden = !showMap;
    projectList.hidden = showMap;
    filters.hidden = !showMap;
    viewButtons.forEach((button) => {
      const active = button.dataset.mapView === view;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (!showMap) closeCard();
    else {
      if (nodeElements.length === 0 && projectData.length) buildGraph();
      layoutGraph();
      updateFilters();
    }
  }

  addDifficultyOptions();
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.mapView));
  });
  searchInput.addEventListener("input", updateFilters);
  difficultyFilter.addEventListener("change", updateFilters);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab" || event.key === "Enter" || event.key === " ") {
      lastPointerType = "keyboard";
    }
  });
  window.addEventListener("resize", scheduleGraphLayout);
  setView("list");
})();
