# TypeProfile

## 1. Overview

`TypeProfile` asks for several personal details in the console and prints them as a small profile. Its main teaching purpose is to show different Java data types and how `Scanner` reads them.

## 2. Learning goals

After this lesson, you should be able to:

- Distinguish `String`, `int`, `double`, `boolean`, and `char`.
- Read lines, numeric tokens, and boolean tokens with `Scanner`.
- Extract the first character from a token.
- Use `printf` placeholders to insert values into output.

## 3. Prerequisites

You should know how to run a Java class and recognize a variable declaration such as `int age`. A **data type** tells Java what kind of value a variable stores and which operations make sense for it.

## 4. Project and file structure

The default-package class [`TypeProfile.java`](../Beginner/TypeProfile.java) imports only `java.util.Scanner`. Its `main` method performs all input and output; there are no other classes in this exercise.

## 5. Program execution

The program prompts for a name, age, height in feet, driving status, and the first letter of the name. It stores each answer in a variable whose type matches the expected value, prints a formatted summary, and closes the scanner.

## 6. Complete code walkthrough

1. `import java.util.Scanner;` lets the class use `Scanner` without writing its full package name.
2. `public class TypeProfile` declares the class. The public class name matches the filename.
3. The `main` method is where execution begins.
4. `new Scanner(System.in)` creates a reader for console input.
5. The name prompt is followed by `scanner.nextLine()`. A `String` stores text through the end of that line, including spaces in a full name.
6. The age prompt is followed by `nextInt()`, which parses the next integer token into an `int`.
7. `nextDouble()` reads the height into a `double`, a type that can represent a fractional number.
8. `nextBoolean()` reads the word `true` or `false` into a `boolean`.
9. `scanner.next().charAt(0)` first reads one whitespace-delimited token as a `String`, then selects the character at index zero. The variable `firstLetter` has type `char`.
10. Each `printf` call uses `%s` as a general text placeholder and `\n` to add a line break. The values are inserted in the order they appear in the argument list. `%s` can display these values, though type-specific formats such as `%d`, `%f`, `%b`, and `%c` can make intent clearer.
11. `scanner.close()` closes the reader and its underlying `System.in` stream. This is fine when this standalone program is finished reading input.

The source comments describe the intended data type of each value and the purpose of formatted output; comments are not executed.

## 7. Key Java concepts in context

- `String` is a reference type used for text; `int`, `double`, `boolean`, and `char` are primitive types.
- `Scanner` has different methods for different input shapes. `nextLine()` reads a whole line, while `nextInt()`, `nextDouble()`, `nextBoolean()`, and `next()` read tokens.
- `charAt(0)` uses zero-based indexing, so `0` means the first character.
- `printf` combines a format string with values to display.

## 8. Example execution

```text
Hello! Please enter your name:
Maya Chen
Please enter your age:
21
Please enter your height in feet:
5.6
Do you drive? Enter true or false:
false
Finally, enter the first letter of your name:
M
----------Maya Chen----------
Age : 21
Height : 5.6
Drive : false
First letter of name : M
```

The exact height formatting follows the entered `double` and the machine's locale.

## 9. Limitations and common mistakes

- The program does not validate that age or height is reasonable, or that the supplied character matches the name.
- `nextBoolean()` accepts only boolean tokens; words such as `yes` cause an input-mismatch exception.
- `next().charAt(0)` reads only the first character of the next token, not an entire line. It cannot read an empty token.
- If input methods are rearranged, mixing token methods and `nextLine()` may require consuming the leftover newline.
- `\n` is a line-feed character. `printf` also provides `%n` for a platform-appropriate newline.

## 10. Practice and extensions

1. Change the name prompt to collect a nickname as well.
2. Print the age with `%d`, the driving answer with `%b`, and the first letter with `%c`.
3. Add a second character input and explain why it needs a separate token.
4. Add checks for negative ages and heights before printing the profile.

## 11. Summary and source

This program demonstrates five data types and several `Scanner` methods. Match each input method to the kind of value being read, and remember that `charAt(0)` selects only one character.

Source: [`TypeProfile.java`](../Beginner/TypeProfile.java).
