# Vehicle

## 1. Overview

**Vehicle** is a console exercise that collects five pieces of information and uses them to create a vehicle object. It demonstrates how a class groups related data, how a constructor initializes that data, and how an object can define its own readable text representation.

## 2. Learning goals

After studying this program, you should be able to:

- Explain the difference between a class and an object.
- Identify fields, constructor parameters, and local variables.
- Explain how `this` refers to the current object.
- Use `private` to control access to fields.
- Understand why `final` prevents reassignment after initialization.
- Create an object with `new`.
- Override `toString()` to define an object's text representation.
- Read numbers and full text lines with `Scanner`.

## 3. Prerequisites

You should know how to declare variables, call methods, use `Scanner`, and write a class with a `main` method.

A *class* defines the structure and behavior of a kind of object. An *object* is one instance created from that class. A *field* is a variable declared inside a class to store information belonging to an object.

## 4. Project and file structure

The source is [Vehicle.java](../Intermediate/Vehicle.java), inside the `Intermediate` package.

It contains two nested classes:

- `Vehicle` is the public class and contains the program entry point, `main`.
- `VehicleInfo` is a public static nested class representing one vehicle.

`VehicleInfo` stores five fields: `name`, `brand`, `color`, `horsepower`, and `year`. All five are `private final`, so outside code cannot access them directly and their references or values cannot be reassigned after the constructor initializes them.

## 5. Program execution

1. Java starts in `Vehicle.main()`.
2. The program opens a `Scanner` inside a try-with-resources block.
3. It reads the year as an integer and consumes the remaining line break.
4. It reads the name, reads horsepower as an integer, consumes that line break, then reads the brand and color as full lines.
5. It passes all five values to the `VehicleInfo` constructor in the order expected by its parameters.
6. It prints the object. Java calls the overridden `toString()` method to obtain the formatted text.
7. When the try block ends, Java closes the scanner automatically.

## 6. Complete code walkthrough

### 6.1 Package and import

`package Intermediate;` places the public class in the `Intermediate` package. `import java.util.Scanner;` makes the console-input class available by its short name.

### 6.2 Declaring the VehicleInfo class and fields

`public static class VehicleInfo` declares a nested class. Because it is `static`, it can be instantiated from the static `main` method without first creating a `Vehicle` object.

The five field declarations describe the information stored in one vehicle:

- `String` is used for the name, brand, and color.
- `int` is used for horsepower and year.
- `private` restricts direct access to the fields from outside `VehicleInfo`.
- `final` allows each field to be assigned once and prevents later reassignment.

The fields are initialized by the constructor rather than at their declarations.

### 6.3 Initializing an object with a constructor

`public VehicleInfo(String name, String brand, String color, int horsepower, int year)` is the constructor. Its parameters receive the values supplied when an object is created.

Inside the constructor, assignments such as `this.name = name;` copy each parameter into the matching field:

- `this.name` refers to the field belonging to the object being initialized.
- `name` refers to the constructor parameter.

This distinction matters because both have the same identifier. The assignments initialize all five fields, satisfying the requirement imposed by `final`.

### 6.4 Defining the object's text representation

`@Override` indicates that the method replaces the inherited implementation of `toString()`.

The method returns a `String` created by `String.format(...)`. The format placeholders `%s` and `%d` insert text and integer values. `%n` inserts a platform-appropriate line separator.

This is why `System.out.println(vehicle)` prints a useful summary instead of the default class name and object identity text.

### 6.5 Opening the input resource

`try (Scanner scanner = new Scanner(System.in))` creates a scanner for standard input. The try-with-resources syntax ensures that the scanner is closed when execution leaves the block.

The scanner is declared inside the try statement, so its variable is available throughout that block.

### 6.6 Reading the year and vehicle name

`int year = scanner.nextInt();` reads an integer token. The following `scanner.nextLine();` consumes the rest of that line, usually the Enter key left after the number.

Without that extra call, the next `nextLine()` could immediately read the pending line break and return an empty string. The next line therefore stores the full vehicle name in `name`.

### 6.7 Reading horsepower, brand, and color

The program repeats the same input pattern for horsepower: `nextInt()` reads the numeric value and `nextLine()` consumes the remaining line break.

It then uses `nextLine()` for `brand` and `color`, preserving spaces in those text values. These variables are local to `main`; they are not fields of the `Vehicle` class.

### 6.8 Creating and printing the object

`VehicleInfo vehicle = new VehicleInfo(name, brand, color, horsepower, year);` uses `new` to create an object and call its constructor.

The argument order must match the constructor parameter order. The next statement, `System.out.println(vehicle);`, passes the object to the print method. Java obtains its text by calling `vehicle.toString()`, so the custom formatted output is displayed.

## 7. Key Java concepts in context

| Concept | Example | Purpose |
| --- | --- | --- |
| Class | `VehicleInfo` | Defines the data and behavior for a vehicle object. |
| Object | `vehicle` | Stores one set of vehicle details. |
| Field | `private final String name` | Holds information belonging to each object. |
| Constructor | `VehicleInfo(...)` | Initializes every field when the object is created. |
| `this` | `this.name = name` | Distinguishes an instance field from a parameter with the same name. |
| Encapsulation | `private` fields | Prevents direct external access to the stored data. |
| Immutability by field assignment | `final` fields | Prevents reassignment after construction. |
| Method overriding | `toString()` | Changes how the object is represented as text. |
| Resource management | try-with-resources | Closes the Scanner automatically. |

## 8. Example execution

A sample interaction could use:

- Year: `2020`
- Name: `Civic`
- Horsepower: `155`
- Brand: `Honda`
- Color: `Silver`

The final output contains one line for each stored value: vehicle name, year, horsepower, brand, and color. The exact labels and line breaks are defined by the format string in `toString()`.

## 9. Limitations and common mistakes

- The program does not check whether the year or horsepower is realistic or positive.
- Non-numeric input for year or horsepower causes an input-mismatch exception.
- The class has no getters, setters, or other behavior for changing or querying individual fields; the current exercise only constructs and prints an object.
- The object is not saved to a file or database, so its data is lost when the program exits.
- The nested `VehicleInfo` class is useful for this small exercise, but a larger application might place it in its own source file.

## 10. Practice and extensions

1. Reject a negative horsepower value before creating the object.
2. Add a getter for the vehicle name and explain why it can read a private field.
3. Create a second `VehicleInfo` object and compare the years.
4. Add a method that returns whether one vehicle is newer than another.
5. Move `VehicleInfo` into its own public Java file and update the package structure.

## 11. Summary and source

Vehicle separates the console interaction from the data model. The `VehicleInfo` class owns the five fields, its constructor initializes them, and `toString()` controls how the object appears when printed.

Source: [Vehicle.java](../Intermediate/Vehicle.java).
