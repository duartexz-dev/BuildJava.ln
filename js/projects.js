const projects = [
  {
    name: "ReturnName",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Ask for a person's name and age, then display a message based on their age.",
    concepts: ["Scanner input", "Conditionals", "For loops", "Formatted output"],
    repoUrl: ""
  },
  {
    name: "DrivingCarWallet",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Check whether a person can legally drive based on their age and other conditions.",
    concepts: ["Scanner input", "Conditionals", "Logical operators"],
    repoUrl: ""
  },
  {
    name: "WeekDay",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Read a number from 1 to 7 and display the corresponding day of the week.",
    concepts: ["Scanner input", "Switch statements", "Conditional logic"],
    repoUrl: ""
  },
  {
    name: "Calculator",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Perform basic arithmetic operations on two numbers using a selected operator.",
    concepts: ["Scanner input", "Arithmetic operators", "Switch statements"],
    repoUrl: ""
  },
  {
    name: "loginSystem",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Validate an email and password, then allow or block access based on simple rules.",
    concepts: ["Scanner input", "Strings", "Conditionals", "Input validation"],
    repoUrl: ""
  },
  {
    name: "LoginIntermediary",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    description: "Validate login credentials and limit the user to three attempts.",
    concepts: ["Scanner input", "Strings", "While loops", "Boolean logic", "Attempt limits"],
    repoUrl: ""
  },
  {
    name: "bulletin",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    description: "Collect a student's grades in four subjects, calculate the average, and report whether they passed.",
    concepts: ["Scanner input", "Classes and objects", "Constructors", "Arithmetic operations", "Conditionals"],
    repoUrl: ""
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