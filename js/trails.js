/*
 * BuildJava.ln — thematic trail renderer.
 * The canonical catalog stays in js/projects.js; categories are inferred
 * from each project's existing concepts and each project is assigned once.
 */
(() => {
  "use strict";

  const resources = window.BuildJavaProjectResources || {};
  const activeProjects = projects.filter((project) => (
    project.sourceAvailability !== "unavailable" && resources[project.name]
  ));

  const trailDefinitions = {
    fundamentals: {
      title: "Java foundations",
      description: "Start with values, input, output, and the basic building blocks of a Java program."
    },
    logic: {
      title: "Logic & control flow",
      description: "Practice decisions, comparisons, repetition, and the rules that guide program behavior."
    },
    oop: {
      title: "Object-oriented programming",
      description: "Represent related information with classes, objects, fields, and constructors."
    },
    collections: {
      title: "Collections",
      description: "Store, organize, search, and update groups of related values."
    }
  };

  const normalize = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  function classifyProject(project) {
    const concepts = new Set((project.concepts || []).map(normalize));

    // A class/object exercise belongs to OOP even when it also uses a list.
    if (
      concepts.has("classes and objects") ||
      concepts.has("constructors") ||
      concepts.has("fields")
    ) {
      return "oop";
    }

    if (concepts.has("arraylist") || concepts.has("list search") || concepts.has("list indexing")) {
      return "collections";
    }

    const logicConcepts = [
      "if/else conditions",
      "comparison operators",
      "switch statements",
      "while loops",
      "do-while loops",
      "for loops",
      "boolean logic",
      "boolean conditions",
      "logical operators",
      "conditional expressions",
      "random numbers",
      "arrays",
      "attempt limits",
      "score counters"
    ];

    if (logicConcepts.some((concept) => concepts.has(concept))) {
      return "logic";
    }

    return "fundamentals";
  }

  const categorizedProjects = activeProjects.map((project) => ({
    ...project,
    trailId: classifyProject(project)
  }));

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function updateTrailOverview() {
    document.querySelectorAll(".trail-overview-card[data-trail]").forEach((card) => {
      const trailId = card.dataset.trail;
      const items = categorizedProjects.filter((project) => project.trailId === trailId);
      const list = card.querySelector(".trail-project-list");
      const button = card.querySelector("[data-open-trail]");

      if (list) {
        list.textContent = items.length
          ? items.map((project) => project.name).join(" · ")
          : "No projects in this trail yet";
      }

      if (button) {
        button.disabled = items.length === 0;
        button.setAttribute("aria-label", items.length
          ? `Explore ${trailDefinitions[trailId].title}, ${items.length} projects`
          : `${trailDefinitions[trailId].title} has no projects yet`);
      }

      card.dataset.projectCount = String(items.length);
      card.hidden = !trailDefinitions[trailId];
    });
  }

  function createProjectPreview(project) {
    const preview = createElement("div", "trail-project-preview");
    const title = createElement("strong", "", project.name);
    const description = createElement("p", "", project.description || "Open this project to explore its source and lesson.");
    const concepts = createElement(
      "small",
      "",
      (project.concepts || []).slice(0, 4).join(" · ")
    );

    preview.append(title, description, concepts);
    return preview;
  }

  function createProjectNode(project, index) {
    const anchor = createElement("a", "trail-project-node");
    const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    anchor.href = `./project.html?project=${encodeURIComponent(project.name)}`;
    anchor.dataset.projectName = project.name;
    anchor.dataset.status = project.status || "planned";
    anchor.setAttribute("aria-label", `Open ${project.name} project study page`);

    const platform = createElement("span", "trail-project-platform");
    platform.setAttribute("aria-hidden", "true");

    const title = createElement("span", "trail-project-title", project.name);
    const meta = createElement(
      "span",
      "trail-project-meta",
      `${project.difficulty || "Level not set"} · ${String(project.status || "planned").replace(/-/g, " ")}`
    );

    anchor.append(platform, title, meta, createProjectPreview(project));
    anchor.dataset.projectSlug = slug;
    anchor.style.setProperty("--trail-step", String(index));
    return anchor;
  }

  function openTrail(trailId, trigger) {
    const definition = trailDefinitions[trailId];
    const explorer = document.getElementById("trail-explorer");
    const stage = document.getElementById("trail-explorer-stage");
    const title = document.getElementById("trail-explorer-title");
    const description = document.getElementById("trail-explorer-description");

    if (!definition || !explorer || !stage || !title || !description) return;

    const items = categorizedProjects.filter((project) => project.trailId === trailId);
    title.textContent = definition.title;
    description.textContent = definition.description;
    stage.replaceChildren();

    if (!items.length) {
      stage.append(createElement("p", "trail-explorer-placeholder", "No projects have been added to this trail yet."));
    } else {
      items.forEach((project, index) => stage.append(createProjectNode(project, index)));
    }

    explorer.hidden = false;
    explorer.dataset.activeTrail = trailId;
    explorer.setAttribute("aria-label", `${definition.title} project path`);

    document.querySelectorAll(".trail-overview-card").forEach((card) => {
      const active = card.dataset.trail === trailId;
      card.classList.toggle("is-active", active);
      if (active) card.setAttribute("aria-current", "true");
      else card.removeAttribute("aria-current");
    });

    window.setTimeout(() => {
      explorer.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
    }, 0);

    explorer.dataset.returnFocus = trigger?.dataset.openTrail || trailId;
  }

  function closeTrail() {
    const explorer = document.getElementById("trail-explorer");
    if (!explorer) return;

    const trailId = explorer.dataset.activeTrail;
    explorer.hidden = true;
    explorer.removeAttribute("data-active-trail");

    document.querySelectorAll(".trail-overview-card").forEach((card) => {
      card.classList.remove("is-active");
      card.removeAttribute("aria-current");
    });

    const trigger = document.querySelector(`[data-open-trail="${trailId}"]`);
    trigger?.focus();
  }

  document.querySelectorAll("[data-open-trail]").forEach((button) => {
    button.addEventListener("click", () => openTrail(button.dataset.openTrail, button));
  });

  document.getElementById("close-trail-explorer")?.addEventListener("click", closeTrail);

  updateTrailOverview();

  // Expose a read-only snapshot for timeline and project-page controllers.
  window.BuildJavaTrails = Object.freeze({
    definitions: trailDefinitions,
    projects: categorizedProjects,
    classifyProject
  });
})();
