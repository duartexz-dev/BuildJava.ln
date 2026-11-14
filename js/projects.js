const focusLabels = {
  input: "Input & data types",
  output: "Output & formatting",
  decisions: "Conditionals & comparisons",
  loops: "Loops & repetition",
  selection: "Selection & switch",
  arithmetic: "Arithmetic & calculations",
  strings: "String handling",
  objects: "Classes & objects",
  collections: "Collections",
  boolean: "Boolean logic"
};

const projectAnchorId = (name) => `project-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

const projects = [
  {
    name: "TypeProfile",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    focus: ["input", "output"],
    codePreview: ['String name = scanner.nextLine();', 'int age = scanner.nextInt();', 'System.out.printf("Age: %d%n", age);'],
    description: "Create a personal profile in the console. The program asks for a name, age, height, driving status, and first initial, then prints the answers as a readable summary.",
    learningOutcomes: ["Choose a Java type for each kind of data: String, int, double, boolean, and char.", "Read different kinds of console input with Scanner.", "Use printf placeholders such as %s and %d, and %n to start a new line."],
    concepts: ["Scanner input", "Primitive data types", "Strings", "Formatted output", "Newline escape sequences"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Beginner/TypeProfile.java"
  },
  {
    name: "ReturnName",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    focus: ["input", "decisions", "loops", "output"],
    sourceAvailability: "unavailable",
    sourceAvailabilityNote: "This Java file was removed as obsolete in commit 73b0689. Its archived version demonstrates nextInt() followed by nextLine() and an if/else age check; it is not part of the current checkout.",
    codePreview: ['if (age >= 18) {', '    System.out.printf("%s, you are an adult!%n", name);', '}'],
    description: "Ask for a person's name and age, use 18 as the cutoff to decide whether they are an adult or a minor, and print three numbered progress messages for either result.",
    learningOutcomes: ["Read a full name and an integer age from the console.", "Use >= and if/else to choose between two outcomes.", "Repeat an action with a for loop and insert values into formatted output with printf."],
    concepts: ["Scanner input", "If/else conditions", "Comparison operators", "For loops", "Formatted output"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/ReturnName.java"
  },
  {
    name: "DrivingCarWallet",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    focus: ["input", "decisions", "output"],
    sourceAvailability: "unavailable",
    sourceAvailabilityNote: "This Java file was removed as obsolete in commit 73b0689. Its archived version demonstrates an if/else age check and a counted for loop; it is not part of the current checkout.",
    codePreview: ['int age = scanner.nextInt();', 'if (age >= 18) {', '    System.out.printf("Okay, %s. You can drive.%n", name);'],
    description: "Ask for a person's age and name, then print a personalized message indicating whether they meet this exercise's age threshold of 18. The example demonstrates a simple age check, not a complete legal eligibility check.",
    learningOutcomes: ["Read an integer and then a full line of text with Scanner.", "Consume the pending newline after nextInt() before reading the name with nextLine().", "Compare the age with >= and use if/else to print the matching message."],
    concepts: ["Scanner input", "If/else conditions", "Comparison operators", "Formatted output"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/DrivingCarWallet.java"
  },
  {
    name: "WeekDay",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    focus: ["input", "selection"],
    codePreview: ['switch (number) {', '    case 1:', '        System.out.println("Monday");'],
    description: "Convert a number from 1 to 7 into its weekday name. If the number does not match a day, the program prints an invalid-input message.",
    learningOutcomes: ["Read a numeric choice with Scanner.", "Use switch and case labels to select one result from several options.", "Handle unmatched values with default and end each traditional case with break."],
    concepts: ["Scanner input", "Switch statements", "Cases and default", "Integer input"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Beginner/WeekDay.java"
  }, {
    name: "Calculator",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    focus: ["input", "arithmetic", "selection", "output"],
    codePreview: ['switch (sign) {', '    case "+":', '        System.out.printf("%d + %d = %d%n", number1, number2, number1 + number2);'],
    description: "Read two whole numbers and an operator, then calculate their sum, difference, integer quotient, or product. The user enters x for multiplication, which the program performs with Java's * operator. Integer division discards any fractional part.",
    learningOutcomes: ["Apply +, -, *, and / to integer values and understand integer division.", "Use switch to choose a calculation based on a String operator.", "Format a calculation and its result with printf. Division by zero is not handled in this exercise."],
    concepts: ["Scanner input", "Integer arithmetic", "Arithmetic operators", "Switch statements", "Formatted output"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Beginner/Calculator.java"
  },
  {
    name: "LoginIntermediary",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    focus: ["input", "strings", "boolean", "loops", "decisions"],
    codePreview: ['while (attempts < 3 && !validLogin) {', '    validLogin = email.equals(CORRECT_EMAIL)', '            && password.equals(CORRECT_PASSWORD);', '    String result = validLogin', '            ? "Login successful"', '            : "Invalid credentials";', '    System.out.println(result);'],
    description: "Ask for an email and password, compare them with credentials stored in the source code, and allow up to three attempts. The program combines a loop, a login-state flag, and a conditional result message; hardcoded credentials are for practice only.",
    learningOutcomes: ["Compare String contents with equals() rather than ==.", "Combine an attempt limit with a boolean login state to control a while loop.", "Use ! to negate a boolean and ?: to choose between two messages.", "Recognize that hardcoded credentials are not appropriate for real authentication."],
    concepts: ["Scanner input", "String comparison", "While loops", "Boolean logic", "Conditional expressions", "Attempt limits"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Intermediate/LoginIntermediary.java"
  },
  {
    name: "bulletin",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    focus: ["input", "objects", "arithmetic", "decisions"],
    codePreview: ['Student student = new Student(name,', '        portugueseGrade, mathGrade,', '        englishGrade, historyGrade);', 'Double totalGrades = student.englishGrade', '        + student.historyGrade + student.mathGrade', '        + student.portugueseGrade;', 'Double averageGrade = totalGrades / 4;', 'boolean passed = averageGrade >= passingGradeThreshold;'],
    description: "Collect a student's name and grades in four subjects, group the values in a Student object, calculate the average, and report whether it reaches 60. The prompts request grades from 10 to 100, but the program does not validate that range.",
    learningOutcomes: ["Model related values with a class, fields, and a constructor.", "Create an object with new and read its fields.", "Add grades and divide by the number of subjects to calculate an average.", "Compare the average with a threshold and use a conditional expression to select a message."],
    concepts: ["Scanner input", "Classes and objects", "Constructors", "Fields", "Arithmetic", "Boolean comparisons", "Conditional expressions"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Intermediate/bulletin.java"
  },
  {
    name: "DeveloperProfile",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    focus: ["input", "objects", "collections", "loops"],
    codePreview: ['developerProfile profile =', '        new developerProfile(name, favoriteLanguage);', 'while (response.equalsIgnoreCase("true")) {', '    String projectName = scanner.nextLine();', '    profile.projects.add(projectName);', '    response = scanner.nextLine();', '}', 'for (String project : profile.projects) {', '    System.out.printf(" - %s%n", project);'],
    description: "Build a developer profile from a name, favorite language, and any number of project names. Ask whether to add another project, store each entry in an ArrayList, and print the completed profile.",
    learningOutcomes: ["Group profile data in a class and initialize its project list in a constructor.", "Use an ArrayList to store a collection that can grow as projects are added.", "Repeat prompts with while and compare answers without case sensitivity using equalsIgnoreCase().", "Visit and print each list item with an enhanced for loop."],
    concepts: ["Scanner input", "Classes and objects", "Constructors", "ArrayList", "While loops", "Enhanced for loops"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Intermediate/DeveloperProfile.java"
  },
  {
    name: "library",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    focus: ["input", "collections", "loops", "decisions", "output"],
    codePreview: ['ArrayList<String> books = new ArrayList<>();', 'do {', '    books.add(nameBook);', '    AddAgain = scanner.nextBoolean();', '} while (AddAgain == true);'],
    description: "Build a console book list by repeatedly reading book titles into an ArrayList. After each entry, ask whether to add another book and print the list; the do-while loop guarantees at least one title is entered.",
    learningOutcomes: ["Create an ArrayList<String> and append book titles with add().", "Use a do-while loop when an action must happen at least once.", "Read a boolean with Scanner and use it to decide whether to repeat.", "Consume the newline left by nextBoolean() before reading the next title with nextLine()."],
    concepts: ["Scanner input", "ArrayList", "Do-while loops", "Boolean conditions", "Formatted output"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Intermediate/library.java"
  },
  {
    name: "CandidateManager",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    focus: ["input", "output", "selection", "loops", "collections", "strings", "boolean"],
    codePreview: ['if (candidates.contains(nameSearch)) {', '    int position = candidates.indexOf(nameSearch);', '    System.out.printf("- %s [index %s]%n", nameSearch, position);', '} else {', '    System.out.println("Candidate not found.");', '}'],
    description: "Manage a console-based candidate list initialized with sample names. Add, list, search for, remove, and count candidates, then choose whether to continue using a menu loop.",
    learningOutcomes: ["Store and update names in an ArrayList.", "Use switch cases to route menu choices to different operations.", "Search a list with contains() and indexOf(), and remove an item using its position.", "Repeat a menu with a do-while loop and a boolean condition.", "Read menu choices, names, and removal positions with Scanner."],
    concepts: ["Scanner input", "ArrayList", "Switch statements", "Do-while loops", "For loops", "Boolean logic", "String comparison", "List search", "List indexing"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Intermediate/CandidateManager.java"
  },
  {
    name: "JoKenPo",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    focus: ["input", "decisions", "loops", "boolean", "output"],
    codePreview: ['String[] options = new String[3];', 'int computerChoice = random.nextInt(options.length);', 'if (userSelect == computerChoice) {', '    winsUser++;'],
    description: "Play Rock, Paper, Scissors against the computer. Enter 0 for Rock, 1 for Paper, or 2 for Scissors; the computer chooses randomly, the program reports the result and keeps win counts, then asks whether to play another round. The input is not validated.",
    learningOutcomes: ["Read a numeric choice from the console with Scanner.", "Store move names in a String array and use the numeric choices as array indexes.", "Generate a random valid array index with Random.nextInt(bound).", "Use comparisons and logical operators to determine the winner.", "Use a do-while loop and boolean input to repeat rounds while keeping score."],
    concepts: ["Scanner input", "Arrays", "Random numbers", "If/else conditions", "Comparison operators", "Logical operators", "Do-while loops", "Boolean conditions", "Score counters"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Beginner/JoKenPo.java",
    roadmapOrder: 6,
    documentationPath: "projects/md/JoKenPo.md"
  },
  {
    name: "Vehicle",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    focus: ["input", "objects", "output"],
    codePreview: ['int YearVehicle = scanner.nextInt();', 'String NameVehicle = scanner.nextLine();', 'vehicle vehicle = new vehicle(NameVehicle, MarkVehicle, ColorVehicle, HorsesPotence, YearVehicle);'],
    description: "Collect a vehicle's year, name, horsepower, brand, and color, then build an object with that data and print the final summary. The exercise demonstrates a simple data model and the console sequence used to gather the values.",
    learningOutcomes: ["Read numeric and textual input with Scanner in sequence.", "Model related values in an inner class and initialize them through a constructor.", "Store object data in fields and then print it back to the console.", "Recognize the newline-buffer issue created by calling nextInt() before a later nextLine()."],
    concepts: ["Scanner input", "Nested classes", "Constructors", "Object fields", "Formatted output", "Input buffering issues"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Intermediate/Vehicle.java",
    roadmapOrder: 7,
    documentationPath: ""
  }
];

const learningPathStages = [
  {
    title: "Read, store, and present values",
    projectNames: ["TypeProfile"],
    teaches: "Begin with console input and output: the guide moves through String, numeric, boolean, and char values, then formats a readable summary.",
    connection: "This gives later exercises a shared starting point: reading values before selecting what a program should do."
  },
  {
    title: "Choose an outcome",
    projectNames: ["WeekDay"],
    teaches: "WeekDay maps one integer to one of several named results with switch, case, break, and a default branch.",
    connection: "It makes selection explicit before Calculator uses switch to choose between arithmetic operations."
  },
  {
    title: "Apply operations to input",
    projectNames: ["Calculator"],
    teaches: "Calculator combines Scanner, integer arithmetic, switch selection, and formatted output; its guide calls out integer division and unhandled division by zero.",
    connection: "The exercise builds on reading and selection, then prepares the reader to follow more stateful conditional behavior."
  },
  {
    title: "Keep track of a decision",
    projectNames: ["LoginIntermediary"],
    teaches: "Its guide describes a while loop controlled by an attempt count and a boolean success flag, with String.equals() and a conditional expression.",
    connection: "The guide expects line input, if-style conditions, and loops. TypeProfile provides line input; the archived ReturnName source demonstrates if/else and a counted loop, but neither archived exercise is part of the current checkout."
  },
  {
    title: "Combine repetition, choices, and arrays",
    projectNames: ["JoKenPo"],
    teaches: "The guide and source show a do-while game loop, indexed String choices, a bounded random selection, comparisons, and win counters.",
    connection: "The guide expects if/else and basic comparisons; the archived ReturnName source demonstrates those ideas, while LoginIntermediary introduces a while loop. The array and random selection are new here. Its existing roadmapOrder is 6; the other catalog entries have no numbered positions."
  },
  {
    title: "Group related data in an object",
    projectNames: ["bulletin"],
    teaches: "The lesson guide introduces a Student object, fields, a constructor, arithmetic over four grades, and a threshold comparison.",
    connection: "It shifts from values handled in main to related values grouped in a class; the stated grade range is not validated by the program."
  },
  {
    title: "Build a collection",
    projectNames: ["library"],
    teaches: "The library guide practices ArrayList<String>, adding titles, and a do-while loop that runs at least once.",
    connection: "DeveloperProfile extends the collection idea by keeping project names inside a profile object and printing them with an enhanced for loop."
  },
  {
    title: "Model a profile with a collection",
    projectNames: ["DeveloperProfile"],
    teaches: "The guide connects a nested class and constructor with an ArrayList, a repeat-until-answer pattern, and an enhanced for loop.",
    connection: "Its stored profile collection gives a useful comparison point for the next project, which adds menu-driven list operations."
  },
  {
    title: "Operate on a collection",
    projectNames: ["CandidateManager"],
    teaches: "CandidateManager brings together an ArrayList, menu selection, loops, searching, indexing, addition, and removal.",
    connection: "The guide identifies it as a broader combination of list operations and menu flow; its documented removal edge cases remain part of the exercise."
  }
];

function LoadLearningPath() {
  const path = document.getElementById("learning-path-stages");
  if (!path) return;

  const pathSection = path.closest(".learning-path-section");
  pathSection?.addEventListener("click", (event) => {
    if (!event.target.closest('a[href^="#project-"]')) return;
    const listView = document.querySelector('[data-map-view="list"]');
    const mapPanel = document.getElementById("knowledge-map-panel");
    if (mapPanel && !mapPanel.hidden && listView) listView.click();
  });

  const projectsByName = new Map(projects.map((project) => [project.name, project]));
  path.replaceChildren();

  learningPathStages.forEach((stage, index) => {
    const item = document.createElement("li");
    item.className = "learning-path-stage";
    item.style.setProperty("--stage-index", String(index));
    const article = document.createElement("article");
    article.className = "path-stage-card";

    const header = document.createElement("div");
    header.className = "path-stage-header";
    const marker = document.createElement("span");
    marker.className = "path-stage-marker";
    marker.setAttribute("aria-hidden", "true");
    marker.textContent = String(index + 1).padStart(2, "0");
    const level = document.createElement("span");
    level.className = "path-stage-label";
    level.textContent = `Stage ${String(index + 1).padStart(2, "0")}`;
    header.append(marker, level);

    const heading = document.createElement("h3");
    heading.textContent = stage.title;
    const teaches = document.createElement("p");
    teaches.className = "path-stage-teaches";
    teaches.textContent = stage.teaches;
    const connection = document.createElement("p");
    connection.className = "path-stage-connection";
    const connectionLabel = document.createElement("span");
    connectionLabel.textContent = "How it connects";
    connection.append(connectionLabel, document.createTextNode(stage.connection));

    const projectLinks = document.createElement("ul");
    projectLinks.className = "path-stage-projects";
    stage.projectNames.forEach((projectName) => {
      const project = projectsByName.get(projectName);
      if (!project) return;
      const linkItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${projectAnchorId(project.name)}`;
      link.textContent = project.name;
      linkItem.append(link);
      if (project.sourceAvailability === "unavailable") {
        const status = document.createElement("span");
        status.className = "source-availability";
        status.textContent = "Source unavailable in this checkout";
        linkItem.append(status);
      }
      projectLinks.append(linkItem);
    });

    article.append(header, heading, teaches, connection, projectLinks);
    item.append(article);
    path.append(item);
  });
}

function LoadProjects() {
  let ProjectsBase = document.getElementById("projects-list");
  if (!ProjectsBase) return;

  const activeProjects = projects.filter((project) => project.sourceAvailability !== "unavailable");

  for (let counter = 0; counter < activeProjects.length; counter++) {
    const project = activeProjects[counter];
    ProjectsBase.innerHTML += `<div class="col-sm-6 col-lg-4 project-entry">
  <article class="project-card" id="${projectAnchorId(project.name)}">
    <div class="project-card-top">
      <div class="project-title-group">
        <span class="project-type">${project.type}</span>
        <h3>${project.name}</h3>
      </div>

      <div class="project-labels">
        <span class="project-difficulty" data-level="${project.difficulty.toLowerCase()}">${project.difficulty}</span>
        <span class="project-status">${project.status.replace(/-/g, " ")}</span>
      </div>
    </div>

    <p class="project-summary">${project.description}</p>
    <div class="project-focus-list" role="group" aria-label="Learning focus">
      ${project.focus.map((focus) => `<span class="project-focus-tag">${focusLabels[focus]}</span>`).join("")}
    </div>
    ${project.sourceAvailability === "unavailable"
      ? `<p class="source-availability-note" role="note"><i class="bi bi-exclamation-circle" aria-hidden="true"></i>${project.sourceAvailabilityNote}</p>`
      : ""}
    <figure class="project-code-preview" data-level="${project.difficulty.toLowerCase()}">
      <figcaption><span>Code preview</span><span>${project.difficulty} · ${project.sourceAvailability === "unavailable" ? "catalog excerpt; source not verified" : "illustrative excerpt"}</span></figcaption>
      <pre aria-label="${project.difficulty} level code example"><code>${project.codePreview.map((line) => `<span class="project-code-line">${line}</span>`).join("")}</code></pre>
    </figure>
    <a class="project-study-link" href="./project.html?project=${encodeURIComponent(project.name)}">
      Open project study <i class="bi bi-arrow-up-right" aria-hidden="true"></i>
    </a>

    <details class="project-disclosure">
      <summary>Explore what this project teaches</summary>

      <div class="project-card-details">
        <h4>What this project teaches</h4>
        <ul class="project-learning-outcomes">
          ${project.learningOutcomes.map((outcome) => `<li>${outcome}</li>`).join("")}
        </ul>

        <h4>Concepts practiced</h4>
        <ul class="project-concepts">
          ${project.concepts.map((concept) => `<li>${concept}</li>`).join("")}
        </ul>

        ${project.sourceAvailability === "unavailable"
        ? `<p class="source-availability-note" role="note">${project.sourceAvailabilityNote}</p>`
        : ""}
        ${project.repoUrl
        ? `<a class="project-repository-link" href="${project.repoUrl}" target="_blank" rel="noreferrer">Open repository</a>`
        : `<span class="source-unavailable">Repository not available yet</span>`}
        ${project.documentationPath
        ? `<a class="project-repository-link" href="./${project.documentationPath}">Read lesson guide</a>`
        : ""}
      </div>
    </details>
  </article>
</div>`;
  }
}

LoadProjects();
LoadLearningPath();

function LoadRoadmap() {
  const roadmap = document.getElementById("roadmap-levels");
  if (!roadmap) return;

  const difficultyOrder = ["beginner", "basic", "intermediate", "advanced", "challenge"];
  const groups = new Map();
  const activeProjects = projects.filter((project) => project.sourceAvailability !== "unavailable");
  activeProjects.forEach((project) => {
    const level = project.difficulty || "Difficulty not specified";
    if (!groups.has(level)) groups.set(level, []);
    groups.get(level).push(project);
  });

  const orderedGroups = [...groups.entries()].sort(([first], [second]) => {
    const firstOrder = difficultyOrder.indexOf(first.toLowerCase());
    const secondOrder = difficultyOrder.indexOf(second.toLowerCase());
    if (firstOrder !== secondOrder) {
      return (firstOrder < 0 ? difficultyOrder.length : firstOrder)
        - (secondOrder < 0 ? difficultyOrder.length : secondOrder);
    }
    return first.localeCompare(second, undefined, { sensitivity: "base" });
  });

  roadmap.replaceChildren();
  orderedGroups.forEach(([difficulty, groupProjects], index) => {
    const column = document.createElement("div");
    column.className = "col-lg-6";

    const section = document.createElement("section");
    section.className = `roadmap-card roadmap-level-card${index % 2 ? " roadmap-card-blue" : ""}`;
    section.setAttribute("aria-label", `${difficulty} projects`);

    const header = document.createElement("div");
    header.className = "roadmap-top";
    const number = document.createElement("span");
    number.className = "roadmap-number";
    number.textContent = "LEVEL";
    const count = document.createElement("span");
    count.className = "roadmap-weeks";
    count.textContent = `${groupProjects.length} ${groupProjects.length === 1 ? "project" : "projects"}`;
    header.append(number, count);

    const title = document.createElement("h3");
    title.textContent = difficulty;
    const explanation = document.createElement("p");
    explanation.className = "roadmap-group-note";
    explanation.textContent = "Catalog difficulty label. Items below retain their catalog order; no prerequisite order is specified.";

    const list = document.createElement("ul");
    list.className = "roadmap-project-list";
    groupProjects.forEach((project) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${projectAnchorId(project.name)}`;
      link.textContent = project.name;
      link.dataset.roadmapProject = "";
      const type = document.createElement("span");
      type.className = "roadmap-project-type";
      type.textContent = project.type;
      const focus = document.createElement("span");
      focus.className = "roadmap-project-focus";
      focus.textContent = `Topics: ${project.focus.map((topic) => focusLabels[topic]).join(", ")}`;
      item.append(link, type, focus);
      if (project.sourceAvailability === "unavailable") {
        const source = document.createElement("span");
        source.className = "roadmap-source-status";
        source.textContent = "Java source unavailable in this checkout";
        item.append(source);
      }
      list.append(item);
    });

    section.append(header, title, explanation, list);
    column.append(section);
    roadmap.append(column);
  });

  const orderedProjects = activeProjects.filter((project) => Number.isInteger(project.roadmapOrder));
  const note = document.getElementById("roadmap-note");
  if (note && orderedProjects.length !== activeProjects.length) {
    note.textContent = `${orderedProjects.length} of ${activeProjects.length} active projects have a catalog roadmapOrder. This grouping uses difficulty instead; it does not fill in missing positions.`;
  }

  roadmap.addEventListener("click", (event) => {
    if (!event.target.closest("[data-roadmap-project]")) return;
    const listView = document.querySelector('[data-map-view="list"]');
    const mapPanel = document.getElementById("knowledge-map-panel");
    if (mapPanel && !mapPanel.hidden && listView) listView.click();
  });
}

LoadRoadmap();