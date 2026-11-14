/*
 * BuildJava.ln — project development timeline.
 * Dates come from the first commit for each current Java source path.
 */
(() => {
  "use strict";

  const resources = window.BuildJavaProjectResources || {};
  const timeline = document.getElementById("project-timeline");
  if (!timeline || typeof projects === "undefined") return;

  const entries = projects
    .filter((project) => project.sourceAvailability !== "unavailable" && resources[project.name])
    .map((project) => {
      const resource = resources[project.name];
      const dateValue = resource.dateOverride || resource.firstCommitAt;
      const date = new Date(dateValue);

      return {
        project,
        resource,
        date,
        validDate: Number.isFinite(date.getTime())
      };
    })
    .filter((entry) => entry.validDate)
    .sort((first, second) => (
      first.date - second.date || first.project.name.localeCompare(second.project.name)
    ));

  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  });

  function createEntry({ project, resource, date }) {
    const article = document.createElement("article");
    article.className = "timeline-entry";

    const time = document.createElement("time");
    time.className = "timeline-date";
    time.dateTime = date.toISOString();
    time.textContent = formatter.format(date);

    const copy = document.createElement("div");
    const title = document.createElement("h3");
    const titleLink = document.createElement("a");
    titleLink.href = `./project.html?project=${encodeURIComponent(project.name)}`;
    titleLink.textContent = project.name;
    title.append(titleLink);

    const description = document.createElement("p");
    description.textContent = project.description || "Java practice project.";

    const source = document.createElement("a");
    source.className = "timeline-commit-link";
    source.href = resource.firstCommitUrl;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    source.textContent = "First recorded source commit";
    source.setAttribute("aria-label", `Open the first recorded source commit for ${project.name}`);

    copy.append(title, description, source);
    article.append(time, copy);
    return article;
  }

  if (!entries.length) {
    timeline.replaceChildren();
    const message = document.createElement("p");
    message.className = "timeline-pending";
    message.textContent = "No source-backed project dates are available yet.";
    timeline.append(message);
    return;
  }

  timeline.replaceChildren(...entries.map(createEntry));

  const note = document.createElement("p");
  note.className = "timeline-source-note";
  note.textContent = "Dates use the first Git commit found for each current Java source path. To correct a date, set dateOverride for that project in js/project-resources.js.";
  timeline.after(note);
})();
