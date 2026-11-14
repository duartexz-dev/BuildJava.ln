# Calculator

## 1. Overview

This console program reads two whole numbers and an operator, then performs one arithmetic operation. It is a small example of combining keyboard input, integer arithmetic, and `switch` selection.

## 2. Learning goals

After studying this program, you should be able to:

- Read integers and a word-like token with `Scanner`.
- Store and use values with Java's `int` type.
- Choose behavior with a `switch` statement.
- Format values with `printf`.
- Explain integer division and why dividing by zero is an error.

## 3. Prerequisites

You should know how to run a Java class with a `main` method, declare variables, and print text. An **operator** is a symbol that performs an operation, such as `+` for addition.

## 4. Project and file structure

The program is in the default package in [`Calculator.java`](../Beginner/Calculator.java). It imports `java.util.Scanner` to read console input. The file contains one public class, `Calculator`, and its `main` method; it does not depend on other project classes.

## 5. Program execution

Java starts at `main`. The program creates a scanner, asks for two integers, displays the supported choices, reads one operator token, and runs the matching `switch` case. An unsupported token produces an error message. The scanner is closed before the program ends.

## 6. Complete code walkthrough

1. `import java.util.Scanner;` makes the `Scanner` class available by its short name.
2. `public class Calculator` declares the class. Its name matches the filename, as required for a public Java class.
3. `public static void main(String[] args)` is the entry point. `public` makes it callable by the Java launcher, `static` means it belongs to the class, and `void` means it returns no value.
4. `new Scanner(System.in)` creates a reader for keyboard input.
5. Each `System.out.println` displays a prompt. `nextInt()` reads the next integer token into `number1` or `number2`. If the input is not an integer, `Scanner` throws an input-mismatch exception.
6. `var sign = scanner.next();` reads the operator as a token. Java infers that `sign` is a `String`; `var` does not mean the value has no type. Local-variable type inference with `var` is available starting with Java 10.
7. `switch (sign)` compares the string with each `case`. The `+`, `-`, and `/` cases use the corresponding integer operators. The `"x"` case is the user's multiplication choice, but the calculation itself uses `*`.
8. Each case prints a formatted expression. In `printf`, `%d` is an integer placeholder and `%n` starts a platform-appropriate new line. `break` exits the switch so another case does not run.
9. Integer division in `/` discards the fractional part: for example, `7 / 2` produces `3`.
10. `default` runs when no case matches, and its `break` ends the switch.
11. `scanner.close()` releases the scanner and closes `System.in`. This is suitable for this standalone program.

The comments beside `var` and `switch` explain those choices in the source; they do not execute.

## 7. Key Java concepts in context

- **Local variables** such as `number1` exist while `main` runs.
- **Type inference with `var`** lets the compiler infer `String` from `scanner.next()`. The type remains fixed.
- **Switch selection** is useful when one value has several exact alternatives.
- **Integer arithmetic** keeps the result an integer. It does not automatically produce a decimal quotient.
- **Formatted output** combines explanatory text and calculated values in one line.

## 8. Example execution

One possible run:

```text
Enter the first number:
7
Enter the second number:
2
---------------------
| Choose an operator|
|       + - / x     |
|
---------------------
Enter an operator on the next line:
/
Result: 7 / 2 = 3
```

The displayed quotient is `3`, not `3.5`, because both operands are integers. The calculation is deterministic: the same inputs produce the same result.

## 9. Limitations and common mistakes

- Division by zero is not handled. Entering `/` with a second number of `0` causes `ArithmeticException`.
- Only the exact tokens `+`, `-`, `/`, and lowercase `x` are accepted. `*` is not accepted as input.
- The program does not repeat the calculation or validate malformed numeric input.
- Very large results can overflow the range of `int`.
- Changing the division to decimal arithmetic would require a suitable type such as `double`; merely printing an `int` with another format does not restore a fractional part.

## 10. Practice and extensions

1. Try each supported operator and predict the result before running the program.
2. Add a `"*"` case as an additional multiplication choice.
3. Add a zero check before division and print a clear message instead of dividing by zero.
4. Experiment with `double` input and explain how decimal division differs from integer division.

## 11. Summary and source

This exercise practices console input, `int`, arithmetic, `switch`, and formatted output. Its main subtlety is that integer division truncates the fractional part.

Source: [`Calculator.java`](../Beginner/Calculator.java).
