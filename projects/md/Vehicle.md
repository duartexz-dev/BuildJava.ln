# Vehicle

## 1. Overview

**Vehicle** is a console exercise that asks for a vehicle's year, name, horsepower, brand, and color. It stores those values in an instance of a nested class named `vehicle` and prints a formatted summary.

This guide explains the original implementation in [Vehicle.java](../Intermediate/Vehicle.java). It does not replace the original class with a refactored model or add behavior that is not present in the source.

## 2. Learning goals

After studying this program, you should be able to:

- Explain the relationship between a class, an object, and an instance.
- Identify fields, constructor parameters, and local variables.
- Use a constructor to initialize an object's fields.
- Explain how `this` refers to the current object.
- Read numeric and text input with `Scanner`.
- Understand why `nextLine()` is used after `nextInt()`.
- Use `printf` placeholders to format a summary.
- Recognize the default implementation of `Object.toString()`.

## 3. Prerequisites

You should know how to declare variables, call methods, create objects with `new`, and read console input.

A *class* defines a type. An *object* is an instance created from a class. A *field* is a variable that stores data belonging to an object. A *constructor* runs when an object is created and initializes its state.

## 4. Project and file structure

The source is [Vehicle.java](../Intermediate/Vehicle.java), inside the `Intermediate` package.

The file contains:
- The public class `Vehicle`, which contains the `main` method.
- A nested public static class named `vehicle`, which stores the vehicle's data.

The nested class has five fields: `name`, `horses`, `mark`, `color`, and `year`. These fields have package-private access because no access modifier such as `private` or `public` is declared.

The lowercase name `vehicle` is the name used by the original source. Java allows it, although class names conventionally use PascalCase.

## 5. Program execution

1. Java starts at `Vehicle.main()`.
2. The program creates a `Scanner` to read from the keyboard.
3. It displays a prompt and reads the vehicle year with `nextInt()`.
4. It consumes the line break, then reads the vehicle name with `nextLine()`.
5. It reads horsepower as an integer, consumes the following line break, and reads the brand and color as complete lines.
6. It creates a `vehicle` object by passing the five values to the constructor.
7. It prints a formatted summary using the local variables.
8. It also passes the object itself to `System.out.println(vehicle)`, then closes the scanner.

## 6. Complete code walkthrough

### 6.1 Package and import

`package Intermediate;` places the public class in the `Intermediate` package.

`import java.util.Scanner;` makes the `Scanner` class available by its short name so the program can read console input.

### 6.2 Declaring the Vehicle class and nested data class

`public class Vehicle` declares the class whose name matches the filename.

Inside it, `public static class vehicle` declares a nested class. The `static` modifier means this nested class does not require an existing `Vehicle` instance before it can be created.

The nested class uses lowercase `vehicle`. This is legal Java, but PascalCase is the conventional naming style for classes.

### 6.3 Declaring the vehicle fields

The fields `name`, `mark`, and `color` have type `String`. The fields `horses` and `year` have type `int`.

They store the five properties supplied by the user. Because no access modifier is specified, the fields have package-private access: other code in the same package can access them directly.

The fields are not declared `private` or `final` in this original version.

### 6.4 Initializing the object with a constructor

`public vehicle(String name, String mark, String color, int horses, int year)` is the constructor. Its name must match the nested class name, including its lowercase spelling.

Each assignment uses `this` to identify the field belonging to the current object:
- `this.name = name` stores the name parameter in the object's name field.
- `this.mark = mark` stores the brand.
- `this.year = year` stores the year.
- `this.horses = horses` stores horsepower.
- `this.color = color` stores the color.

The constructor parameters are local to the constructor. The fields remain part of the created object after the constructor finishes.

### 6.5 Creating the scanner and displaying the first prompt

Inside `main`, `Scanner scanner = new Scanner(System.in);` creates a scanner that reads standard input.

The first group of `System.out.println(...)` statements draws a text prompt asking for the vehicle year. These lines are presentation only; they do not change the object's data.

### 6.6 Reading the year and name

`int yearVehicle = scanner.nextInt();` reads the year as an integer.

The next statement, `scanner.nextLine();`, consumes the rest of that line, normally the Enter key. This matters because the following `scanner.nextLine()` is meant to read the vehicle name, not the leftover line break.

`String nameVehicle = scanner.nextLine();` stores the complete name entered by the user, including spaces.

### 6.7 Reading horsepower, brand, and color

`int horsesPotence = scanner.nextInt();` reads horsepower as an integer. The following `scanner.nextLine();` again consumes the remaining line break.

The later calls to `scanner.nextLine()` read the brand into `markVehicle` and the color into `colorVehicle`. These are local variables inside `main`; the object fields are initialized later by the constructor.

### 6.8 Creating the vehicle object

`vehicle vehicle = new vehicle(nameVehicle, markVehicle, colorVehicle, horsesPotence, yearVehicle);` creates an object of the nested class.

The first `vehicle` is the type name. The second `vehicle` is the local variable that stores the object reference. Java distinguishes uppercase and lowercase identifiers, so the nested type `vehicle` and the outer type `Vehicle` are different names.

The constructor arguments are passed in the same order as the constructor parameters: name, brand, color, horsepower, and year.

### 6.9 Printing the formatted summary

The `System.out.printf(...)` statement prints the values stored in the local variables.

- `%s` inserts a string.
- `%d` inserts an integer.
- `%n` inserts a platform-appropriate line break.

This formatted output is the part that clearly displays the five vehicle properties.

### 6.10 Printing the object and closing the scanner

`System.out.println(vehicle)` passes the object reference to the print method. The nested class does not override `toString()`, so Java uses the default implementation inherited from `Object`. The result is typically a class name followed by an at-sign and a hash-style value, not a readable list of fields.

The object is created and its fields receive the input values, but the formatted summary above uses the local variables rather than reading the fields back from the object.

Finally, `scanner.close()` closes the scanner. In this original version, the scanner is closed explicitly rather than with try-with-resources.

## 7. Key Java concepts in context

| Concept | Example | What it does here |
| --- | --- | --- |
| Nested class | `Vehicle.vehicle` | Defines the data type inside the outer class. |
| Field | `String name` | Stores a value belonging to each vehicle object. |
| Constructor | `vehicle(...)` | Receives the five values and initializes the fields. |
| `this` | `this.name = name` | Distinguishes the field from a constructor parameter. |
| Object creation | `new vehicle(...)` | Creates the instance that stores the vehicle data. |
| Local variable | `nameVehicle` | Holds user input inside `main`. |
| Scanner | `nextInt()`, `nextLine()` | Reads numeric and text values from the console. |
| Formatted output | `printf` | Inserts text and integer values into a formatted string. |
| Inherited method | `Object.toString()` | Supplies the default object representation because no override exists. |

## 8. Example execution

A sample input sequence is:

- Year: `2020`
- Name: `Civic`
- Horsepower: `155`
- Brand: `Honda`
- Color: `Silver`

The formatted summary displays the name, year, horsepower, brand, and color. After that, the original program prints the object reference using the inherited default `toString()`; that second line is not a formatted vehicle description.

## 9. Limitations and common mistakes

- The nested class name `vehicle` does not follow the Java convention of PascalCase.
- Its fields are not private, so code in the same package can access them directly.
- The program does not validate whether the year or horsepower is positive or realistic.
- Non-numeric input for year or horsepower can cause an input-mismatch exception.
- The object does not override `toString()`. Printing it directly therefore does not display its fields in a useful format.
- The formatted summary uses the local variables instead of reading values back from the created object.
- The scanner is closed explicitly instead of using try-with-resources.
- The object is not saved, so the values are lost after the program exits.

## 10. Practice and extensions

1. Rename the nested class to `VehicleInfo` and update its constructor and object creation.
2. Make the fields private and explain how this changes access from outside the class.
3. Override `toString()` to return a readable description of the object's fields.
4. Print the object's own field values through a method rather than using only the local variables.
5. Add input validation for year and horsepower.
6. Move the data class into its own Java file.

## 11. Summary and source

The original Vehicle exercise reads five values, creates a nested object, and prints a formatted summary. It demonstrates fields, a constructor, `this`, object creation, scanner input, and formatted output. Its final direct object print uses the default `toString()`, which is an important difference between the object and the formatted summary.

Source: [Vehicle.java](../Intermediate/Vehicle.java).
