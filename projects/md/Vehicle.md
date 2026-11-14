# Vehicle

## 1. Overview

**Vehicle** is a console exercise that collects information about a vehicle and groups the values in one object. The program asks for the year, name, horsepower, brand, and color, then prints a summary.

The main idea is to move from several independent variables to a class that represents one thing with related attributes.

## 2. Learning goals

- Understand how a class can model a real-world concept.
- Declare attributes with different data types.
- Create an object with the \`new\` keyword.
- Use a constructor to initialize the object's state.
- Use \`this\` to distinguish an attribute from a constructor parameter.
- Read numeric and text values with \`Scanner\`.

## 3. Prerequisites

You should be comfortable with variables, primitive types, \`String\`, console input, and creating a basic class.

## 4. Project and file structure

The exercise is stored in \`projects/Intermediate/Vehicle.java\`. The source contains a \`Vehicle\` program class and a nested \`vehicle\` class. The nested class holds the vehicle's data and defines a constructor.

## 5. Program execution

1. The program creates a \`Scanner\` for console input.
2. It reads the vehicle year.
3. It asks for the name, horsepower, brand, and color.
4. It creates one object containing those five values.
5. It prints a formatted summary and closes the scanner.

## 6. Complete code walkthrough

### The data model

The nested class declares five attributes:

- \`name\`, \`mark\`, and \`color\` are \`String\` values.
- \`horses\` and \`year\` are integers.

The constructor receives the five values and assigns each parameter to its matching attribute. Expressions such as \`this.name = name\` make the distinction explicit: \`this.name\` refers to the object's field, while \`name\` refers to the constructor parameter.

### Reading the input

The program uses \`nextInt()\` for the year and horsepower, and \`nextLine()\` for text. After each integer read, it calls \`nextLine()\` once to consume the remaining line break before reading more text.

### Creating the object

The expression \`new vehicle(...)\` creates an instance and passes the collected values to the constructor. The variables are grouped in one object rather than remaining only as unrelated local values.

## 7. Key Java concepts in context

| Concept | Where it appears | Why it matters |
| --- | --- | --- |
| Class | \`vehicle\` | Defines the structure of the data model. |
| Attributes | The five fields | Store the state belonging to one vehicle. |
| Constructor | \`vehicle(...)\` | Initializes the new object. |
| \`this\` | \`this.year = year\` | Refers to the current object's field. |
| Object creation | \`new vehicle(...)\` | Creates an instance from the class. |
| Scanner | \`nextInt()\` and \`nextLine()\` | Reads the user's values. |

## 8. Example execution

The program asks for five values in sequence. For example, a user could enter a year, a vehicle name, a horsepower value, a brand, and a color. The final formatted output displays those values on separate lines.

## 9. Limitations and common mistakes

- The program does not validate the range or format of the entered values.
- \`nextInt()\` leaves the line break in the input buffer; the following \`nextLine()\` calls are important for reading text as intended.
- The nested class is named \`vehicle\` with a lowercase initial. Java class names conventionally use PascalCase, such as \`Vehicle\`.
- The final \`System.out.println(vehicle)\` prints the default object representation because the class does not override \`toString()\`. It does not print the five attributes as a formatted object summary.

## 10. Practice and extensions

1. Add a method that returns a formatted description of the vehicle.
2. Override \`toString()\` so printing the object shows its attributes.
3. Create a second vehicle object and compare their years.
4. Add basic validation for year and horsepower.

## 11. Summary and source

This exercise practices class structure, attributes, constructor parameters, \`this\`, object creation, and mixed console input. The Java source remains the source of truth for the implementation.

Source: \`projects/Intermediate/Vehicle.java\`.