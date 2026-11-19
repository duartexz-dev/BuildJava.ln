# Vehicle

## 1. Overview

`Vehicle` asks for five vehicle details, creates an object to group them, and prints a formatted summary. It demonstrates a nested class, a constructor, `this`, `Scanner`, and `printf`.

## 2. Learning goals

- Distinguish a class from an object.
- Identify fields, constructor parameters, and local variables.
- Explain how `this` refers to the object being initialized.
- Create an object with `new`.
- Read numeric tokens and full text lines with `Scanner`.
- Format strings and integers with `printf`.
- Recognize the default object representation when `toString()` is not overridden.

## 3. Prerequisites

You should know variables, method calls, console input, and classes with `main`. A **field** belongs to an object; a **constructor** initializes a new object.

## 4. Project and file structure

The source is [`Vehicle.java`](../Intermediate/Vehicle.java), in the `Intermediate` package. Public class `Vehicle` contains `main` and a static nested class named `vehicle` (lowercase, matching the source).

The nested class stores `name`, `horses`, `mark`, `color`, and `year`. These fields have package-private access because they declare no access modifier. Its constructor assigns the five values. The class does not override `toString()`.

## 5. Program execution

1. `main` creates a `Scanner`.
2. It reads the year with `nextInt()` and consumes the remaining line with `nextLine()`.
3. It reads the vehicle name as a full line.
4. It reads horsepower with `nextInt()` and consumes that line's remainder.
5. It reads brand and color as full lines.
6. It creates a `vehicle` object with the five local values.
7. It prints a formatted summary, then prints the object reference.
8. It closes the scanner.

## 6. Complete code walkthrough

### 6.1 Package and import

`package Intermediate;` declares the package. `import java.util.Scanner;` makes the console-input class available by its short name.

### 6.2 The nested `vehicle` class

`public static class vehicle` declares a nested class. `static` allows `main` to instantiate it without first creating a `Vehicle` object. Its fields are three `String` values (`name`, `mark`, `color`) and two `int` values (`horses`, `year`).

### 6.3 Constructor and `this`

`public vehicle(String name, String mark, String color, int horses, int year)` receives five values. An assignment such as `this.name = name` stores the parameter in the object's field: `this.name` is the field, while `name` is the constructor parameter.

### 6.4 Reading input

`nextInt()` reads a numeric token but leaves the rest of its line in the input stream. The following `nextLine()` consumes that remainder so the next full-line read does not immediately return an empty string. The same pattern is used after reading horsepower. Name, brand, and color are read with `nextLine()` and can contain spaces.

### 6.5 Creating and printing the object

`new vehicle(nameVehicle, markVehicle, colorVehicle, horsesPotence, yearVehicle)` creates the nested object and calls its constructor. The `printf` call uses `%s` for text, `%d` for integers, and `%n` for line breaks. The formatted summary is built in `main`, not by the object.

`System.out.println(vehicle)` prints the object reference. Since the nested class has no custom `toString()`, Java uses the default implementation inherited from `Object`; it does not print the five field values. `scanner.close()` closes the input reader.

## 7. Key Java concepts in context

| Concept | Example | Purpose |
| --- | --- | --- |
| Nested class | `vehicle` inside `Vehicle` | Groups vehicle data. |
| Fields | `name`, `horses`, `mark`, `color`, `year` | Store object data. |
| Constructor | `vehicle(...)` | Initializes the fields. |
| `this` | `this.name = name` | Distinguishes field and parameter. |
| Object creation | `new vehicle(...)` | Creates an instance. |
| `Scanner` | `nextInt()` / `nextLine()` | Reads numbers and full lines. |
| `printf` | `System.out.printf(...)` | Prints a labeled summary. |

## 8. Example execution

Input:

```text
2020
Civic
155
Honda
Silver
```

The formatted summary is:

```text
Vehicle: Civic
Year: 2020
Horse power: 155
Brand: Honda
Vehicle color: Silver
```

A second line prints the default object representation; its identity-style portion can vary between runs.

## 9. Limitations and common mistakes

- The program does not validate whether year or horsepower is realistic or positive.
- Non-integer input for year or horsepower causes an input-mismatch exception.
- The fields are not private, and there are no getters or setters.
- The nested class does not override `toString()`, so printing the object does not print its fields.
- The object is not saved to a file or database.

## 10. Practice and extensions

1. Add a custom `toString()` method and compare it with the default output.
2. Make the fields `private` and add getters.
3. Create a second vehicle object and print both summaries.
4. Add a method to compare two vehicle years.
5. Validate numeric input before creating the object.

## 11. Summary and source

`Vehicle` collects five values, passes them to a nested `vehicle` object's constructor, and prints a formatted summary. The key distinction is between local input variables in `main` and fields stored in the object.

Source: [`Vehicle.java`](../Intermediate/Vehicle.java).
