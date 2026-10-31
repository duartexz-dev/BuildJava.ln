const projects = [
  {
    name: "TypeProfile",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Build a simple console profile by asking for a name, age, height, driving status, and first initial, then printing the answers in a formatted summary.",
    learningOutcomes: ["Read text, whole numbers, decimal numbers, true/false values, and a single character with Scanner.", "Use printf placeholders to display values and newline characters to format output."],
    concepts: ["Scanner input", "Primitive data types", "Strings", "Formatted output", "Newline escape sequences"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Beginner/TypeProfile.java"
  },
  {
    name: "ReturnName",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Ask for a name and age, classify the person as an adult or a minor using an age check, and print three numbered progress messages.",
    learningOutcomes: ["Read text and numbers from the console.", "Use an if/else condition and a comparison operator to choose a result.", "Repeat numbered output with a for loop and format values with printf."],
    concepts: ["Scanner input", "If/else conditions", "Comparison operators", "For loops", "Formatted output"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/ReturnName.java"
  },
  {
    name: "DrivingCarWallet",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Collect a person's age and name, then display a personalized message saying whether they meet the program's fixed age threshold of 18.",
    learningOutcomes: ["Read a number and then a full line of text from the console.", "Use an if/else condition to compare an age with a fixed threshold.", "Format a personalized result with printf."],
    concepts: ["Scanner input", "If/else conditions", "Comparison operators", "Formatted output"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/DrivingCarWallet.java"
  },
  {
    name: "WeekDay",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Ask for a number from 1 to 7 and print the corresponding weekday; values outside that range produce an invalid-number message.",
    learningOutcomes: ["Use switch cases to map numeric choices to text.", "Handle unsupported values with a default case.", "Read an integer choice from the console."],
    concepts: ["Scanner input", "Switch statements", "Cases and default", "Integer input"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/WeekDay.java"
  },
  {
    name: "Calculator",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Read two whole numbers and an operator, then calculate their sum, difference, quotient, or product. Division uses integer arithmetic, so any fractional part is discarded.",
    learningOutcomes: ["Use +, -, /, and * arithmetic operators with integer values.", "Choose an operation with a switch statement and handle unsupported choices.", "Read user input and display a formatted calculation."],
    concepts: ["Scanner input", "Integer arithmetic", "Arithmetic operators", "Switch statements", "Formatted output"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/Beginner/Calculator.java"
  },
  {
    name: "loginSystem",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    description: "Prompt for an email and password, accept the input when the email contains an @ and the password has at least eight characters, and stop after three failed attempts.",
    learningOutcomes: ["Check simple text rules with String methods such as contains and length.", "Combine conditions with the && operator.", "Repeat prompts with a while loop and track failed attempts."],
    concepts: ["Scanner input", "Strings", "String methods", "Boolean logic", "While loops", "Attempt limits"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/loginSystem.java"
  },
  {
    name: "LoginIntermediary",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    description: "Compare entered credentials with email and password values stored in the program, allow up to three attempts, and report whether the login matches.",
    learningOutcomes: ["Compare strings with equals.", "Control repetition with a while loop, an attempt counter, and a boolean flag.", "Use a conditional expression to choose a result message. The sample credentials are hardcoded for practice, not suitable for real authentication."],
    concepts: ["Scanner input", "String comparison", "While loops", "Boolean logic", "Conditional expressions", "Attempt limits"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/LoginIntermediary.java"
  },
  {
    name: "bulletin",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    description: "Create a student record from a name and four subject grades, calculate the average, and compare it with a passing threshold of 60.",
    learningOutcomes: ["Group a student's data in a class and initialize it with a constructor.", "Calculate an average from several values.", "Use a boolean comparison and a conditional expression to select the result message. The program expects grades from 10 to 100 but does not validate that range."],
    concepts: ["Scanner input", "Classes and objects", "Constructors", "Fields", "Arithmetic", "Boolean comparisons", "Conditional expressions"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/bulletin.java"
  },
  {
    name: "DeveloperProfile",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Intermediate",
    description: "Collect a developer's name, favorite programming language, and project names, then display them as a profile. Ask whether to add another project until the user answers no.",
    learningOutcomes: ["Represent profile data in a class and initialize an ArrayList in its constructor.", "Collect a variable number of project names with a while loop.", "Store items in an ArrayList and display them with an enhanced for loop."],
    concepts: ["Scanner input", "Classes and objects", "Constructors", "ArrayList", "While loops", "Enhanced for loops"],
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

        <h4>What you will learn</h4>
        <ul class="project-learning-outcomes">
          ${projects[counter].learningOutcomes.map((outcome) => `<li>${outcome}</li>`).join("")}
        </ul>

        <h4>Concepts practiced</h4>
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