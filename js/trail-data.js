export const projects = [
  {
    id: "TypeProfile",
    name: "TypeProfile",
    step: 1,
    difficulty: "Beginner",
    theme: "profile",
    description: "Build a personal profile in the console using text, integer, decimal, boolean, and character values.",
    lesson: "Choose the right Java data type, read input with Scanner, and format a clear console summary.",
    concepts: ["Scanner", "Data types", "Formatted output"],
    javaPath: "projects/Beginner/TypeProfile.java",
    markdownPath: "projects/md/TypeProfile.md"
  },
  {
    id: "WeekDay",
    name: "WeekDay",
    step: 2,
    difficulty: "Beginner",
    theme: "calendar",
    description: "Turn a number from 1 to 7 into the matching weekday, with a fallback for invalid values.",
    lesson: "Use switch, case, break, and default to select one result from several possibilities.",
    concepts: ["Scanner", "switch", "Selection"],
    javaPath: "projects/Beginner/WeekDay.java",
    markdownPath: "projects/md/WeekDay.md"
  },
  {
    id: "Calculator",
    name: "Calculator",
    step: 3,
    difficulty: "Beginner",
    theme: "calculator",
    description: "Read two whole numbers and an operator, then perform one of four arithmetic operations.",
    lesson: "Combine arithmetic operators, integer values, switch selection, and formatted output.",
    concepts: ["Arithmetic", "Operators", "switch"],
    javaPath: "projects/Beginner/Calculator.java",
    markdownPath: "projects/md/Calculator.md"
  },
  {
    id: "JoKenPo",
    name: "JoKenPo",
    step: 4,
    difficulty: "Beginner",
    theme: "arena",
    description: "Play Rock, Paper, Scissors against a random computer choice and keep the round scores.",
    lesson: "Bring together random values, branching, repetition, and a simple game loop.",
    concepts: ["Random", "Loops", "Conditions"],
    javaPath: "projects/Beginner/JoKenPo.java",
    markdownPath: "projects/md/JoKenPo.md"
  },
  {
    id: "LoginIntermediary",
    name: "LoginIntermediary",
    step: 5,
    difficulty: "Intermediate",
    theme: "checkpoint",
    description: "Create a console login exercise with a limited number of attempts and a boolean state.",
    lesson: "Compare String values, combine boolean conditions, and control repetition with while.",
    concepts: ["String.equals", "Boolean logic", "while"],
    javaPath: "projects/Intermediate/LoginIntermediary.java",
    markdownPath: "projects/md/LoginIntermediary.md"
  },
  {
    id: "bulletin",
    name: "bulletin",
    step: 6,
    difficulty: "Intermediate",
    theme: "bulletin",
    description: "Group a student's name and subject grades in an object, calculate the average, and report the result.",
    lesson: "Create a class and object, keep related values together, and calculate from object data.",
    concepts: ["Classes", "Objects", "Average"],
    javaPath: "projects/Intermediate/bulletin.java",
    markdownPath: "projects/md/bulletin.md"
  },
  {
    id: "Vehicle",
    name: "Vehicle",
    step: 7,
    difficulty: "Intermediate",
    theme: "garage",
    description: "Collect a vehicle's year, name, horsepower, brand, and color, then group those values in an object.",
    lesson: "Use a constructor and this to initialize an object with several related attributes.",
    concepts: ["Classes", "Constructor", "this"],
    javaPath: "projects/Intermediate/Vehicle.java",
    markdownPath: "projects/md/Vehicle.md"
  },
  {
    id: "DeveloperProfile",
    name: "DeveloperProfile",
    step: 8,
    difficulty: "Intermediate",
    theme: "workstation",
    description: "Build a developer profile and keep adding project names to a dynamic list.",
    lesson: "Store user-entered values in an ArrayList and repeat an action based on the user's choice.",
    concepts: ["ArrayList", "Objects", "do-while"],
    javaPath: "projects/Intermediate/DeveloperProfile.java",
    markdownPath: "projects/md/DeveloperProfile.md"
  },
  {
    id: "library",
    name: "library",
    step: 9,
    difficulty: "Intermediate",
    theme: "library",
    description: "Create a book list by repeatedly adding titles to an ArrayList and printing the collection.",
    lesson: "Use a generic collection, add elements, and control a do-while input cycle.",
    concepts: ["ArrayList<String>", "add()", "Iteration"],
    javaPath: "projects/Intermediate/library.java",
    markdownPath: "projects/md/library.md"
  },
  {
    id: "CandidateManager",
    name: "CandidateManager",
    step: 10,
    difficulty: "Intermediate",
    theme: "archive",
    description: "Manage candidates with a menu that can add, list, search, remove, and count entries.",
    lesson: "Combine ArrayList operations, methods, search logic, and a menu-driven loop.",
    concepts: ["ArrayList", "Methods", "Menu loop"],
    javaPath: "projects/Intermediate/CandidateManager.java",
    markdownPath: "projects/md/CandidateManager.md"
  }
];

export function getProject(id) {
  return projects.find((project) => project.id === id) || null;
}