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
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/WeekDay.java"
  },
  {
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
    name: "loginSystem",
    status: "in-progress",
    type: "Fundamentals",
    difficulty: "Beginner",
    focus: ["input", "strings", "boolean", "loops"],
    codePreview: ['while (errors < 3) {', '    if (email.contains("@") && password.length() >= 8) {', '        System.out.println("Login successful!");'],
    description: "Repeatedly ask for an email and password. Accept the input when the email contains @ and the password has at least eight characters; otherwise count a failed attempt and stop after three. These are deliberately basic checks, not secure authentication.",
    learningOutcomes: ["Inspect text with String methods such as contains() and length().", "Combine boolean checks with && so both requirements must pass.", "Use a while loop, a counter, and break to control retries and exit after success."],
    concepts: ["Scanner input", "Strings", "String methods", "Boolean logic", "While loops", "Attempt limits"],
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/loginSystem.java"
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
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/LoginIntermediary.java"
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
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/bulletin.java"
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
    repoUrl: "https://github.com/duartexz-dev/BuildJava.ln/blob/main/projects/DeveloperProfile.java"
  }
];
function LoadProjects() {
  let ProjectsBase = document.getElementById("projects-list");

  for (let counter = 0; counter < projects.length; counter++) {
    ProjectsBase.innerHTML += `<div class="col-sm-6 col-lg-4 project-entry">
  <div class="project-card">
    <div class="project-card-top">
      <div class="project-title-group">
        <span class="project-type">${projects[counter].type}</span>
        <h3>${projects[counter].name}</h3>
      </div>

      <span class="project-difficulty" data-level="${projects[counter].difficulty.toLowerCase()}">${projects[counter].difficulty}</span>
    </div>

    <p class="project-summary">${projects[counter].description}</p>
    <div class="project-focus-list" aria-label="Learning focus">
      ${projects[counter].focus.map((focus) => `<span class="project-focus-tag">${focusLabels[focus]}</span>`).join("")}
    </div>
    <figure class="project-code-preview" data-level="${projects[counter].difficulty.toLowerCase()}">
      <figcaption><span>Code preview</span><span>${projects[counter].difficulty} · illustrative excerpt</span></figcaption>
      <pre aria-label="${projects[counter].difficulty} level code example"><code>${projects[counter].codePreview.map((line) => `<span class="project-code-line">${line}</span>`).join("")}</code></pre>
    </figure>

    <details class="project-disclosure">
      <summary>Explore what this project teaches</summary>

      <div class="project-card-details">
        <h4>What this project teaches</h4>
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