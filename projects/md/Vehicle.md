# Vehicle

## Overview

**Vehicle** is a console exercise that collects five values and stores them in a VehicleInfo object. It demonstrates how a class groups related data and how an object can provide its own readable text representation.

## Learning goals

- Model a real-world item with a class.
- Declare private attributes and initialize them with a constructor.
- Use this to refer to the current object.
- Create an instance with new.
- Override toString() to control how an object is represented as text.
- Read numeric and text values with Scanner.

## Structure

The source is projects/Intermediate/Vehicle.java and belongs to the Intermediate package.

It contains two classes:

- **Vehicle** owns the main method and runs the console interaction.
- **VehicleInfo** represents one vehicle and stores its name, brand, color, horsepower, and year.

The five attributes in VehicleInfo are private final. This means they can be assigned by the constructor but cannot be reassigned afterward.

## Execution flow

1. Scanner reads the year.
2. nextLine() consumes the remaining line break before the program reads the vehicle name.
3. The program reads horsepower, consumes that line break, then reads the brand and color.
4. new VehicleInfo(...) constructs an object with all five values.
5. System.out.println(vehicle) asks Java to convert the object to text. The overridden toString() method returns a formatted description.

## Key concepts in context

| Concept | Example | Purpose |
| --- | --- | --- |
| Class | VehicleInfo | Defines the structure of vehicle data. |
| Private attributes | private final String name | Keeps the data inside the object and prevents reassignment. |
| Constructor | VehicleInfo(...) | Initializes all attributes. |
| this | this.name = name | Distinguishes the field from the constructor parameter. |
| Object creation | new VehicleInfo(...) | Creates an instance. |
| Method override | toString() | Defines the object's readable text representation. |

## Example output

The program prints the vehicle name, year, horsepower, brand, and color as a formatted summary.

## Limitations

- The program does not validate year or horsepower ranges.
- Invalid numeric input causes Scanner to throw an input-mismatch exception.
- The data object is created and printed, but it is not stored between program runs.

## Practice extensions

1. Reject negative horsepower and unrealistic year values.
2. Create a second VehicleInfo object and compare the years.
3. Add a method that identifies whether a vehicle is newer than another.
4. Move VehicleInfo into its own Java file.

## Source

[Vehicle.java](../Intermediate/Vehicle.java)