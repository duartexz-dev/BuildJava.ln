const projects = [
  {
    name: "ReturnName",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Ask for a name and age, then print a short adult-or-minor message using conditionals and a loop.",
    concepts: ["Scanner input", "Conditionals", "For loops", "Formatted output"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/ReturnName.java"
  },
  {
    name: "DrivingCarWallet",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Check whether a user can legally drive based on age and a simple name-based greeting.",
    concepts: ["Scanner input", "Conditionals", "Logical operators"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/DrivingCarWallet.java"
  },
  {
    name: "WeekDay",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Read a number from 1 to 7 and print the matching weekday with a switch statement.",
    concepts: ["Scanner input", "Switch statements", "Conditional logic"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/WeekDay.java"
  },
  {
    name: "Calculator",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Use two numbers and one operator to calculate a result for add, subtract, divide, or multiply.",
    concepts: ["Scanner input", "Arithmetic operators", "Switch statements"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Calculator.java"
  },
  {
    name: "loginSystem",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Validate an email and password against basic rules and limit the number of failed attempts.",
    concepts: ["Scanner input", "Strings", "Conditionals", "Input validation"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/loginSystem.java"
  },
  {
    name: "LoginIntermediary",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    description: "Prompt for a hardcoded email and password, then stop after three failed attempts.",
    concepts: ["Scanner input", "Strings", "While loops", "Boolean logic", "Attempt limits"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/LoginIntermediary.java"
  },
  {
    name: "bulletin",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    description: "Collect four subject grades, calculate the average, and report whether the student passed.",
    concepts: ["Scanner input", "Classes and objects", "Constructors", "Arithmetic operations", "Conditionals"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/bulletin.java"
  },
  {
    name: "DeveloperProfile",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    description: "Create a developer profile and use an ArrayList and a loop to collect and display multiple projects.",
    concepts: ["Scanner input", "Classes and objects", "Constructors", "ArrayList", "While loops"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/DeveloperProfile.java"
  }
];
function LoadProjects() {
  let ProjectsBase = document.getElementById("projects-list");
  for (let counter = 0; counter < projects.length; counter++) {
    ProjectsBase.innerHTML += `<div class="col-sm-6 col-lg-4">
  <div class="project-card">
    <div class="project-card-top">
      <div class="project-title-group">
        <span class="project-type">${projects[counter].type}</span>
        <h3>${projects[counter].name}</h3>
      </div>

      <span class="project-difficulty">${projects[counter].difficulty}</span>
    </div>

    <details class="project-disclosure">
      <summary>See more</summary>

      <div class="project-card-details">
        <p>${projects[counter].description}</p>

        <ul class="project-concepts">
          ${projects[counter].concepts.map((concept) => `<li>${concept}</li>`).join("")}
        </ul>

        ${projects[counter].repoUrl
        ? `<a class="project-repository-link" href="${projects[counter].repoUrl}" target="_blank" rel="noreferrer">Open repository</a>`
        : `<span class="source-unavailable">Repository not available yet</span>`}
      </div>
    </details>
  </div>
</div>`;
  }
}

LoadProjects();