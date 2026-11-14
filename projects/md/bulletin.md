# bulletin

## 1. Overview

This program collects a student's name and grades in four subjects, calculates the arithmetic mean, and prints whether that mean reaches 60. The source file and outer class are both named `bulletin` with a lowercase initial.

## 2. Learning goals

You will learn to:

- Define a class with fields and a constructor.
- Create an object and pass values to its constructor.
- Add numeric values and calculate an average.
- Compare the average with a threshold.
- Use a conditional expression to choose a result message.

## 3. Prerequisites

You should understand variables, method calls, numeric input, and `if`-style comparisons. A **field** is a variable that belongs to an object. A **constructor** initializes a new object.

## 4. Project and file structure

[`bulletin.java`](../Intermediate/bulletin.java) is in the `Intermediate` package. The outer class contains a nested `public static` class named `Student`. The nested class groups a name and four grades; the outer class gathers input and calculates the result.

## 5. Program execution

The program reads a name and four decimal grade values, creates a `Student`, sets a passing threshold of `60.00`, adds the four grades, divides by four, and prints a pass or fail message based on the average.

## 6. Complete code walkthrough

1. `package Intermediate;` declares the package. `Scanner` is imported to read keyboard input.
2. `public class bulletin` declares the outer program class. Its lowercase name matches the filename, although Java convention normally uses `Bulletin`.
3. `public static class Student` defines a nested class. `static` lets `main` construct it without first creating a `bulletin` object.
4. The `Student` fields hold the student's name and four grades. They have package-private access because no access modifier is written. Each grade uses the wrapper type `Double`.
5. The constructor accepts all five values. Each `this.field = parameter` assignment stores a parameter in the new object; `this` refers to that object.
6. `main` creates a `Scanner`, reads the name with `nextLine()`, and reads each grade with `nextDouble()`. The initial prompt requests values from 10 to 100, but the program does not enforce that range.
7. `new Student(...)` creates an object and passes the collected values to the constructor.
8. `final Double passingGradeThreshold = 60.00` creates a threshold that cannot be reassigned. The sum reads the four object fields. During addition, each `Double` is automatically converted to a primitive numeric value (unboxed).
9. `averageGrade = totalGrades / 4` divides the sum by the number of subjects. Because the operands are `Double` and `int`, the calculation uses floating-point arithmetic.
10. `averageGrade >= passingGradeThreshold` produces a boolean. The ternary expression chooses the congratulations message when it is true, and the fail message otherwise.
11. `System.out.println(result)` displays the selected message; `scanner.close()` closes input.

## 7. Key Java concepts in context

- The `Student` object groups related data. Its constructor ensures all five values are supplied when it is created.
- `Double` is an object wrapper for the primitive `double`; arithmetic automatically unboxes it here. For simple numeric calculations, primitive `double` is commonly preferred.
- `final` prevents reassignment of the threshold variable.
- `>=` includes equality, so an average of exactly 60 passes.
- The ternary operator selects one expression based on a boolean condition.

## 8. Example execution

```text
Hello! Please enter your name. Grades must be between 10 and 100:Jordan Lee
Please enter your grade in Portuguese:80
Please enter your grade in Math:70
Please enter your grade in English:90
Please enter your grade in History:60
Congratulations! Your average grade is 75.0
```

The values total 300, and dividing by four gives an average of 75.

## 9. Limitations and common mistakes

- The prompt says grades must be from 10 to 100, but there is no range validation. Negative or unusually large values are still included.
- The student name is stored in the object but is not included in the output.
- Non-numeric grade input causes an input-mismatch exception.
- The calculation assumes exactly four subjects; adding or removing a subject also requires changing the divisor.
- This is a simple arithmetic mean; it does not use weighted grades or a grading policy beyond the fixed threshold.

## 10. Practice and extensions

1. Test averages below, equal to, and above 60.
2. Add validation that each grade is between 10 and 100.
3. Include the student's name and average in a more readable report.
4. Extract the average calculation into a method on `Student`.

## 11. Summary and source

The exercise combines object construction and numeric calculation. The average is compared with an inclusive threshold of 60, but the stated grade range is not validated by the program.

Source: [`bulletin.java`](../Intermediate/bulletin.java).
