(() => {
  const projectData = projects;
  const viewButtons = [...document.querySelectorAll("[data-map-view]")];
  const actionButtons = [...document.querySelectorAll("[data-map-action]")];
  const projectList = document.getElementById("projects-list");
  const mapPanel = document.getElementById("knowledge-map-panel");
  const filters = document.querySelector("[data-map-filters]");
  const searchInput = document.getElementById("knowledge-map-search");
  const difficultyFilter = document.getElementById("knowledge-map-difficulty");
  const statusFilter = document.getElementById("knowledge-map-status");
  const categoryFilter = document.getElementById("knowledge-map-category");
  const svg = document.querySelector("[data-map-svg]");
  const canvas = document.querySelector("[data-map-canvas]");
  const card = document.querySelector("[data-map-card]");
  const count = document.querySelector("[data-map-count]");
  const svgNamespace = "http://www.w3.org/2000/svg";
  const positionStorageKey = "buildjava.knowledge-map.positions.v1";
  const levelColors = {
    beginner: "#55c78d",
    basic: "#60a5fa",
    intermediate: "#a78bfa",
    advanced: "#fbbf24",
    challenge: "#fb7185",
  };
  const nodeElements = [];
  const edges = [];
  const positions = [];
  const activePointers = new Map();
  let graphLayer;
  let selectedIndex = -1;
  let lastPointerType = "";
  let gesture = null;
  let suppressClickIndex = -1;
  let renderFrame = 0;
  let simulationFrame = 0;
  let simulationAlpha = 0;
  let simulationSteps = 0;
  let graphWidth = 0;
  let graphHeight = 0;
  let transform = { x: 0, y: 0, scale: 1 };
  let connectionsVisible = true;

  const normalize = (value) => String(value ?? "").trim().toLocaleLowerCase();
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
  const getStatus = (project) => typeof project.status === "string" ? project.status : "";
  const getCategory = (project) => (
    typeof project.type === "string" ? project.type : (project.category || "")
  );
  const makeSvgElement = (name, attributes = {}) => {
    const element = document.createElementNS(svgNamespace, name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function populateOptions(select, values) {
    [...new Set(values.filter(Boolean))].sort((first, second) => (
      first.localeCompare(second, undefined, { sensitivity: "base" })
    )).forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value.replace(/-/g, " ");
      select.append(option);
    });
  }

  function getSharedConcepts(first, second) {
    const secondConcepts = new Set(getConcepts(second).map(normalize));
    return getConcepts(first).filter((concept) => secondConcepts.has(normalize(concept)));
  }

  function getCanvasPoint(event) {
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return { x: graphWidth / 2, y: graphHeight / 2 };
    }
    return {
      x: (event.clientX - rect.left) * graphWidth / rect.width,
      y: (event.clientY - rect.top) * graphHeight / rect.height,
    };
  }

  function getGraphPoint(event) {
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const matrix = graphLayer.getScreenCTM();
    return matrix ? point.matrixTransform(matrix.inverse()) : { x: 0, y: 0 };
  }

  function clampTransform(x, y, scale) {
    const horizontalLimit = graphWidth * 0.45;
    const verticalLimit = graphHeight * 0.45;
    transform = {
      x: clamp(x, graphWidth * (1 - scale) - horizontalLimit, horizontalLimit),
      y: clamp(y, graphHeight * (1 - scale) - verticalLimit, verticalLimit),
      scale,
    };
  }

  function applyTransform({ animate = false } = {}) {
    if (!graphLayer) return;
    if (animate && !reducedMotion) {
      graphLayer.classList.add("is-view-transitioning");
      window.setTimeout(() => graphLayer.classList.remove("is-view-transitioning"), 260);
    }
    graphLayer.setAttribute(
      "transform",
      `translate(${transform.x} ${transform.y}) scale(${transform.scale})`
    );
    if (!card.hidden && selectedIndex >= 0) positionCard(nodeElements[selectedIndex]);
  }

  function getNodeBounds(indices = projectData.map((_, index) => index)) {
    const visible = indices.filter((index) => positions[index]);
    if (!visible.length) {
      return { minX: graphWidth / 2, maxX: graphWidth / 2, minY: graphHeight / 2, maxY: graphHeight / 2 };
    }
    return visible.reduce((bounds, index) => {
      const position = positions[index];
      return {
        minX: Math.min(bounds.minX, position.x - position.radius),
        maxX: Math.max(bounds.maxX, position.x + position.radius),
        minY: Math.min(bounds.minY, position.y - position.radius),
        maxY: Math.max(bounds.maxY, position.y + position.radius),
      };
    }, { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
  }

  function centerGraph({ animate = true } = {}) {
    if (!positions.length) return;
    const bounds = getNodeBounds();
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    clampTransform(
      graphWidth / 2 - centerX * transform.scale,
      graphHeight / 2 - centerY * transform.scale,
      transform.scale
    );
    applyTransform({ animate });
  }

  function fitGraph({ animate = true } = {}) {
    if (!positions.length) return;
    const visible = positions.map((_, index) => index).filter((index) => (
      !nodeElements[index].classList.contains("is-filtered")
    ));
    const bounds = getNodeBounds(visible.length ? visible : undefined);
    const width = Math.max(bounds.maxX - bounds.minX, 1);
    const height = Math.max(bounds.maxY - bounds.minY, 1);
    const scale = clamp(Math.min((graphWidth - 64) / width, (graphHeight - 64) / height), 0.4, 2.4);
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    clampTransform(
      graphWidth / 2 - centerX * scale,
      graphHeight / 2 - centerY * scale,
      scale
    );
    applyTransform({ animate });
  }

  function drawGraph() {
    if (!graphLayer) return;
    edges.forEach(({ element, from, to }) => {
      const start = positions[from];
      const end = positions[to];
      element.setAttribute("d", `M ${start.x} ${start.y} L ${end.x} ${end.y}`);
    });
    nodeElements.forEach((node, index) => {
      const position = positions[index];
      node.setAttribute("transform", `translate(${position.x} ${position.y})`);
    });
    applyTransform();
  }

  function scheduleDraw() {
    if (renderFrame) return;
    renderFrame = window.requestAnimationFrame(() => {
      renderFrame = 0;
      drawGraph();
    });
  }

  function createInitialPositions(width, height) {
    let saved = {};
    try {
      const raw = window.localStorage.getItem(positionStorageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) saved = parsed;
        else console.error("Saved Knowledge Map positions are invalid.");
      }
    } catch (error) {
      console.error("Could not read saved Knowledge Map positions.", error);
    }

    const spread = Math.min(width, height) * 0.35;
    projectData.forEach((project, index) => {
      const savedPosition = saved[project.name];
      const hasSavedPosition = savedPosition &&
        Number.isFinite(savedPosition.x) && Number.isFinite(savedPosition.y) &&
        savedPosition.x >= 0 && savedPosition.x <= 1 &&
        savedPosition.y >= 0 && savedPosition.y <= 1;
      const angle = index * 2.399963229728653 + ((index * 37) % 17) / 17;
      const radius = spread * Math.sqrt((index + 0.5) / Math.max(projectData.length, 1));
      const x = hasSavedPosition ? savedPosition.x * width : width / 2 + Math.cos(angle) * radius;
      const y = hasSavedPosition ? savedPosition.y * height : height / 2 + Math.sin(angle) * radius;
      positions.push({
        x: clamp(x, 32, width - 32),
        y: clamp(y, 38, height - 38),
        vx: 0,
        vy: 0,
        radius: 9,
        pinned: Boolean(hasSavedPosition),
      });
    });
  }

  function buildGraph() {
    if (nodeElements.length || !projectData.length) return;
    graphWidth = Math.max(canvas.clientWidth, 320);
    graphHeight = Math.max(canvas.clientHeight, 360);
    svg.setAttribute("viewBox", `0 0 ${graphWidth} ${graphHeight}`);
    svg.setAttribute("aria-label", `Map of ${projectData.length} Java projects and their shared concepts`);

    const conceptFrequency = new Map();
    projectData.forEach((project) => {
      new Set(getConcepts(project).map(normalize)).forEach((concept) => {
        conceptFrequency.set(concept, (conceptFrequency.get(concept) || 0) + 1);
      });
    });
    const commonConceptThreshold = Math.max(3, Math.ceil(projectData.length * 0.5));

    const edgesLayer = makeSvgElement("g", { "aria-hidden": "true" });
    const nodesLayer = makeSvgElement("g");
    graphLayer = makeSvgElement("g", { class: "knowledge-map-graph-layer" });
    graphLayer.append(edgesLayer, nodesLayer);
    svg.replaceChildren(graphLayer);

    projectData.forEach((project, firstIndex) => {
      for (let secondIndex = firstIndex + 1; secondIndex < projectData.length; secondIndex += 1) {
        const sharedConcepts = getSharedConcepts(project, projectData[secondIndex]).filter((concept) => (
          conceptFrequency.get(normalize(concept)) < commonConceptThreshold
        ));
        if (!sharedConcepts.length) continue;
        const weight = sharedConcepts.reduce((sum, concept) => (
          sum + 1 / Math.log2(1 + conceptFrequency.get(normalize(concept)))
        ), 0);
        const strength = weight / sharedConcepts.length;
        const element = makeSvgElement("path", {
          class: "knowledge-map-edge",
          "data-strength": strength.toFixed(3),
          "aria-label": `${project.name} and ${projectData[secondIndex].name} share ${sharedConcepts.join(", ")}`,
        });
        element.style.setProperty("--edge-opacity", String(clamp(0.24 + strength * 0.55, 0.28, 0.82)));
        const title = makeSvgElement("title");
        title.textContent = `Shared concepts: ${sharedConcepts.join(", ")}`;
        element.append(title);
        edgesLayer.append(element);
        edges.push({ element, from: firstIndex, to: secondIndex, sharedConcepts, strength });
      }
    });

    const degree = projectData.map(() => 0);
    edges.forEach(({ from, to, strength }) => {
      degree[from] += strength;
      degree[to] += strength;
    });
    createInitialPositions(graphWidth, graphHeight);

    projectData.forEach((project, index) => {
      const level = getLevel(project.difficulty);
      const radius = clamp(9 + Math.sqrt(degree[index]) * 2.2, 9, 15);
      positions[index].radius = radius;
      const node = makeSvgElement("g", {
        class: "knowledge-map-node",
        role: "button",
        tabindex: "0",
        "aria-label": `${project.name}, ${project.difficulty || "difficulty not specified"}`,
        "data-level": level,
        "data-project-index": index,
      });
      const circle = makeSvgElement("circle", {
        class: "knowledge-map-node-core",
        r: radius,
        fill: levelColors[level] || "#94a3b8",
      });
      const label = makeSvgElement("text", {
        class: "knowledge-map-node-label",
        y: radius + 15,
        "text-anchor": "middle",
      });
      label.textContent = project.name;
      const title = makeSvgElement("title");
      title.textContent = `${project.name} — ${project.difficulty || "Difficulty not specified"}`;
      node.append(circle, label, title);
      nodesLayer.append(node);
      nodeElements.push(node);

      node.addEventListener("pointerdown", (event) => startNodeDrag(event, index));
      node.addEventListener("click", () => {
        if (suppressClickIndex === index) {
          suppressClickIndex = -1;
          return;
        }
        selectNode(index, node);
      });
      node.addEventListener("pointerenter", (event) => {
        lastPointerType = event.pointerType;
        if (event.pointerType === "mouse") updateSelection(index);
      });
      node.addEventListener("focus", () => {
        if (lastPointerType === "keyboard") openCard(index, node);
      });
      node.addEventListener("keydown", (event) => handleNodeKeydown(event, index, node));
    });

    layoutGraph();
    if (positions.some((position) => !position.pinned)) startSimulation(1);
    else drawGraph();
  }

  function layoutGraph() {
    if (!graphLayer || !canvas.clientWidth) return;
    const width = Math.max(canvas.clientWidth, 320);
    const height = Math.max(canvas.clientHeight, 360);
    if (width !== graphWidth || height !== graphHeight) {
      const oldWidth = graphWidth;
      const oldHeight = graphHeight;
      graphWidth = width;
      graphHeight = height;
      positions.forEach((position) => {
        position.x = oldWidth ? position.x * width / oldWidth : width / 2;
        position.y = oldHeight ? position.y * height / oldHeight : height / 2;
        position.vx = 0;
        position.vy = 0;
      });
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      transform.x = width / 2 - (width / 2 - transform.x) * width / oldWidth;
      transform.y = height / 2 - (height / 2 - transform.y) * height / oldHeight;
      if (positions.length) startSimulation(0.45);
    }
    drawGraph();
  }

  function simulationTick() {
    const alpha = simulationAlpha;
    const centerX = graphWidth / 2;
    const centerY = graphHeight / 2;
    positions.forEach((position, index) => {
      if (position.pinned) return;
      position.vx += (centerX - position.x) * 0.00055 * alpha;
      position.vy += (centerY - position.y) * 0.00055 * alpha;
      edges.forEach((edge) => {
        if (edge.from !== index && edge.to !== index) return;
        const other = positions[edge.from === index ? edge.to : edge.from];
        const dx = other.x - position.x;
        const dy = other.y - position.y;
        const distance = Math.max(Math.hypot(dx, dy), 0.01);
        const target = 132 - edge.strength * 28;
        const pull = (distance - target) * 0.0009 * edge.strength * alpha;
        position.vx += dx / distance * pull;
        position.vy += dy / distance * pull;
      });
    });

    for (let first = 0; first < positions.length; first += 1) {
      for (let second = first + 1; second < positions.length; second += 1) {
        const a = positions[first];
        const b = positions[second];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let distance = Math.hypot(dx, dy);
        if (distance < 0.01) {
          dx = (second - first) * 0.1;
          dy = 0.1;
          distance = Math.hypot(dx, dy);
        }
        const minDistance = a.radius + b.radius + 22;
        const overlap = Math.max(minDistance - distance, 0);
        const repulsion = (250 / (distance * distance) + overlap * 0.018) * alpha;
        const forceX = dx / distance * repulsion;
        const forceY = dy / distance * repulsion;
        if (!a.pinned) {
          a.vx -= forceX;
          a.vy -= forceY;
        }
        if (!b.pinned) {
          b.vx += forceX;
          b.vy += forceY;
        }
      }
    }

    positions.forEach((position) => {
      if (position.pinned) return;
      position.vx *= 0.82;
      position.vy *= 0.82;
      position.vx = clamp(position.vx, -5, 5);
      position.vy = clamp(position.vy, -5, 5);
      position.x = clamp(position.x + position.vx, 28, graphWidth - 28);
      position.y = clamp(position.y + position.vy, 32, graphHeight - 32);
    });
    simulationAlpha *= 0.972;
    simulationSteps += 1;
  }

  function startSimulation(alpha = 1, onComplete) {
    if (simulationFrame) window.cancelAnimationFrame(simulationFrame);
    simulationFrame = 0;
    simulationAlpha = alpha;
    simulationSteps = 0;
    if (positions.every((position) => position.pinned)) {
      drawGraph();
      if (onComplete) onComplete();
      return;
    }
    if (reducedMotion) {
      while (simulationAlpha > 0.025 && simulationSteps < 240) simulationTick();
      drawGraph();
      if (onComplete) onComplete();
      return;
    }
    const animate = () => {
      simulationTick();
      drawGraph();
      if (simulationAlpha > 0.025 && simulationSteps < 240) {
        simulationFrame = window.requestAnimationFrame(animate);
      } else {
        simulationFrame = 0;
        drawGraph();
        if (onComplete) onComplete();
      }
    };
    simulationFrame = window.requestAnimationFrame(animate);
  }

  function persistPositions() {
    const saved = {};
    projectData.forEach((project, index) => {
      saved[project.name] = {
        x: positions[index].x / graphWidth,
        y: positions[index].y / graphHeight,
      };
    });
    try {
      window.localStorage.setItem(positionStorageKey, JSON.stringify(saved));
    } catch (error) {
      console.error("Could not save Knowledge Map positions.", error);
    }
  }

  function startNodeDrag(event, index) {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    lastPointerType = event.pointerType;
    gesture = {
      kind: "node",
      index,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startPosition: { x: positions[index].x, y: positions[index].y },
      wasPinned: positions[index].pinned,
      moved: false,
    };
    positions[index].pinned = true;
    svg.setPointerCapture(event.pointerId);
  }

  function startCanvasGesture(event) {
    if (event.target.closest && event.target.closest(".knowledge-map-node")) return;
    if (event.button !== undefined && event.button !== 0) return;
    lastPointerType = event.pointerType;
    activePointers.set(event.pointerId, getCanvasPoint(event));
    svg.setPointerCapture(event.pointerId);
    if (activePointers.size === 1) {
      const point = activePointers.get(event.pointerId);
      gesture = {
        kind: "pan",
        pointerId: event.pointerId,
        startPoint: point,
        startX: transform.x,
        startY: transform.y,
      };
    } else if (activePointers.size === 2) {
      const [first, second] = [...activePointers.values()];
      const center = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
      gesture = {
        kind: "pinch",
        startDistance: Math.max(Math.hypot(second.x - first.x, second.y - first.y), 1),
        startScale: transform.scale,
        worldX: (center.x - transform.x) / transform.scale,
        worldY: (center.y - transform.y) / transform.scale,
      };
    }
    event.preventDefault();
  }

  function moveGesture(event) {
    if (gesture?.kind === "node" && gesture.index >= 0) {
      const distance = Math.hypot(
        event.clientX - gesture.startClientX,
        event.clientY - gesture.startClientY
      );
      if (!gesture.moved && distance < 4) return;
      gesture.moved = true;
      const point = getGraphPoint(event);
      const position = positions[gesture.index];
      position.x = clamp(point.x, position.radius + 8, graphWidth - position.radius - 8);
      position.y = clamp(point.y, position.radius + 8, graphHeight - position.radius - 8);
      nodeElements[gesture.index].classList.add("is-dragging");
      scheduleDraw();
      return;
    }

    if (!activePointers.has(event.pointerId)) return;
    activePointers.set(event.pointerId, getCanvasPoint(event));
    if (gesture?.kind === "pinch" && activePointers.size >= 2) {
      const [first, second] = [...activePointers.values()];
      const centerX = (first.x + second.x) / 2;
      const centerY = (first.y + second.y) / 2;
      const distance = Math.max(Math.hypot(second.x - first.x, second.y - first.y), 1);
      const scale = clamp(gesture.startScale * distance / gesture.startDistance, 0.4, 2.4);
      clampTransform(centerX - gesture.worldX * scale, centerY - gesture.worldY * scale, scale);
      scheduleDraw();
    } else if (gesture?.kind === "pan") {
      const point = activePointers.get(event.pointerId);
      clampTransform(
        gesture.startX + point.x - gesture.startPoint.x,
        gesture.startY + point.y - gesture.startPoint.y,
        transform.scale
      );
      scheduleDraw();
    }
  }

  function endGesture(event) {
    if (gesture?.kind === "node") {
      const current = gesture;
      nodeElements[current.index].classList.remove("is-dragging");
      if (current.moved) {
        suppressClickIndex = current.index;
        window.setTimeout(() => {
          if (suppressClickIndex === current.index) suppressClickIndex = -1;
        }, 0);
        startSimulation(0.25, persistPositions);
      } else {
        positions[current.index].pinned = current.wasPinned;
      }
      gesture = null;
    } else if (activePointers.has(event.pointerId)) {
      activePointers.delete(event.pointerId);
      if (activePointers.size === 1) {
        const [pointerId, point] = [...activePointers.entries()][0];
        gesture = {
          kind: "pan",
          pointerId,
          startPoint: point,
          startX: transform.x,
          startY: transform.y,
        };
      } else if (!activePointers.size) {
        gesture = null;
      }
    }
    if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
  }

  function zoomAt(point, scale) {
    const nextScale = clamp(scale, 0.4, 2.4);
    const worldX = (point.x - transform.x) / transform.scale;
    const worldY = (point.y - transform.y) / transform.scale;
    clampTransform(point.x - worldX * nextScale, point.y - worldY * nextScale, nextScale);
    scheduleDraw();
  }

  function positionCard(node) {
    if (window.matchMedia("(max-width: 640px)").matches) return;
    const canvasRect = canvas.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const margin = 12;
    let left = nodeRect.right - canvasRect.left + margin;
    if (left + cardRect.width > canvasRect.width - margin) {
      left = nodeRect.left - canvasRect.left - cardRect.width - margin;
    }
    left = clamp(left, margin, Math.max(margin, canvasRect.width - cardRect.width - margin));
    const top = clamp(
      nodeRect.top - canvasRect.top + nodeRect.height / 2 - cardRect.height / 2,
      margin,
      Math.max(margin, canvasRect.height - cardRect.height - margin)
    );
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
    const status = getStatus(project).replace(/-/g, " ");
    meta.textContent = [getCategory(project), project.difficulty, status].filter(Boolean).join(" · ");
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

    const related = edges.filter((edge) => edge.from === index || edge.to === index);
    appendSectionTitle(card, "Related projects and shared concepts");
    if (related.length) {
      const list = document.createElement("ul");
      related.forEach((edge) => {
        const relatedIndex = edge.from === index ? edge.to : edge.from;
        const item = document.createElement("li");
        item.textContent = `${projectData[relatedIndex].name} — ${edge.sharedConcepts.join(", ")}`;
        list.append(item);
      });
      card.append(list);
    } else {
      const none = document.createElement("p");
      none.textContent = "No distinctive shared concepts are represented in this project network.";
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
    renderCard(index);
    card.hidden = false;
    positionCard(node);
    updateSelection(index);
  }

  function selectNode(index, node) {
    if (selectedIndex === index && !card.hidden) closeCard();
    else openCard(index, node);
  }

  function closeCard() {
    card.hidden = true;
    updateSelection(-1);
  }

  function handleNodeKeydown(event, index, node) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      suppressClickIndex = index;
      window.setTimeout(() => {
        if (suppressClickIndex === index) suppressClickIndex = -1;
      }, 0);
      openCard(index, node);
      return;
    }
    if (event.key === "Escape") {
      closeCard();
      return;
    }
    const offsets = {
      ArrowLeft: [-12, 0],
      ArrowRight: [12, 0],
      ArrowUp: [0, -12],
      ArrowDown: [0, 12],
    };
    if (offsets[event.key]) {
      event.preventDefault();
      positions[index].x = clamp(positions[index].x + offsets[event.key][0], 24, graphWidth - 24);
      positions[index].y = clamp(positions[index].y + offsets[event.key][1], 28, graphHeight - 28);
      positions[index].pinned = true;
      scheduleDraw();
      persistPositions();
    }
  }

  function updateFilters() {
    const query = normalize(searchInput.value);
    const difficulty = difficultyFilter.value;
    const status = statusFilter.value;
    const category = categoryFilter.value;
    let visibleCount = 0;
    projectData.forEach((project, index) => {
      const searchable = normalize(`${project.name} ${getConcepts(project).join(" ")}`);
      const matchesQuery = searchable.includes(query);
      const matchesDifficulty = difficulty === "all" || project.difficulty === difficulty;
      const matchesStatus = status === "all" || getStatus(project) === status;
      const matchesCategory = category === "all" || getCategory(project) === category;
      const visible = matchesQuery && matchesDifficulty && matchesStatus && matchesCategory;
      nodeElements[index].classList.toggle("is-filtered", !visible);
      if (visible) visibleCount += 1;
    });
    edges.forEach(({ element, from, to }) => {
      const visible = !nodeElements[from].classList.contains("is-filtered") &&
        !nodeElements[to].classList.contains("is-filtered");
      element.style.display = visible && connectionsVisible ? "" : "none";
    });
    count.textContent = `${visibleCount} of ${projectData.length} projects`;
    if (selectedIndex >= 0 && nodeElements[selectedIndex].classList.contains("is-filtered")) closeCard();
  }

  function restoreOriginalLayout() {
    try {
      window.localStorage.removeItem(positionStorageKey);
    } catch (error) {
      console.error("Could not clear saved Knowledge Map positions.", error);
    }
    searchInput.value = "";
    difficultyFilter.value = "all";
    statusFilter.value = "all";
    categoryFilter.value = "all";
    connectionsVisible = true;
    const edgeButton = actionButtons.find((button) => button.dataset.mapAction === "edges");
    if (edgeButton) {
      edgeButton.setAttribute("aria-pressed", "true");
      edgeButton.setAttribute("aria-label", "Hide graph connections");
    }
    positions.forEach((position, index) => {
      const angle = index * 2.399963229728653 + ((index * 37) % 17) / 17;
      const radius = Math.min(graphWidth, graphHeight) * 0.35 *
        Math.sqrt((index + 0.5) / Math.max(projectData.length, 1));
      position.x = graphWidth / 2 + Math.cos(angle) * radius;
      position.y = graphHeight / 2 + Math.sin(angle) * radius;
      position.vx = 0;
      position.vy = 0;
      position.pinned = false;
    });
    closeCard();
    updateFilters();
    clampTransform(0, 0, 1);
    startSimulation(1);
    window.setTimeout(() => fitGraph(), reducedMotion ? 0 : 280);
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
      if (!nodeElements.length) buildGraph();
      layoutGraph();
      updateFilters();
      fitGraph({ animate: false });
    }
  }

  populateOptions(difficultyFilter, projectData.map((project) => project.difficulty));
  populateOptions(statusFilter, projectData.map(getStatus));
  populateOptions(categoryFilter, projectData.map(getCategory));
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.mapView));
  });
  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switch (button.dataset.mapAction) {
        case "center":
          centerGraph();
          break;
        case "fit":
          fitGraph();
          break;
        case "edges":
          connectionsVisible = !connectionsVisible;
          button.setAttribute("aria-pressed", String(connectionsVisible));
          button.setAttribute(
            "aria-label",
            connectionsVisible ? "Hide graph connections" : "Show graph connections"
          );
          updateFilters();
          break;
        case "reset":
          restoreOriginalLayout();
          break;
        default:
          break;
      }
    });
  });
  [searchInput, difficultyFilter, statusFilter, categoryFilter].forEach((control) => {
    control.addEventListener(control === searchInput ? "input" : "change", updateFilters);
  });
  svg.addEventListener("pointerdown", startCanvasGesture);
  svg.addEventListener("pointermove", moveGesture);
  svg.addEventListener("pointerup", endGesture);
  svg.addEventListener("pointercancel", endGesture);
  svg.addEventListener("wheel", (event) => {
    event.preventDefault();
    const point = getCanvasPoint(event);
    zoomAt(point, transform.scale * Math.exp(-event.deltaY * 0.0012));
  }, { passive: false });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab" || event.key === "Enter" || event.key === " ") {
      lastPointerType = "keyboard";
    }
    if (event.key === "Escape" && !card.hidden) closeCard();
  });
  if ("ResizeObserver" in window) {
    new ResizeObserver(layoutGraph).observe(canvas);
  } else {
    window.addEventListener("resize", layoutGraph);
  }
  setView("list");
})();
