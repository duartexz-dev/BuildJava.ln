# WeekDay

## 1. Overview

`WeekDay` reads an integer and prints the corresponding day name for values from 1 through 7. It demonstrates a multi-branch `switch` and a `default` case for unmatched numbers.

## 2. Learning goals

You will learn to:

- Read an integer with `Scanner`.
- Route one value to one of several `switch` cases.
- Use `break` to leave a traditional switch case.
- Provide a fallback with `default`.

## 3. Prerequisites

You should know how to declare an integer and call a method. A **branch** is a path the program may take depending on a value or condition.

## 4. Project and file structure

The class is in the default package in [`WeekDay.java`](../Beginner/WeekDay.java). It imports `Scanner` and has one `main` method; it uses no other project classes.

## 5. Program execution

The program creates a scanner, prints a prompt, reads one integer, and compares it with the numbered cases. Values 1–7 print a weekday. Any other integer prints an invalid-number message. The scanner is then closed.

## 6. Complete code walkthrough

1. The import makes `Scanner` available.
2. `public class WeekDay` declares the public class; its name matches the source filename.
3. `main` is the program entry point.
4. `new Scanner(System.in)` prepares to read keyboard input.
5. The prompt explains that the program expects a number from 1 to 7.
6. `scanner.nextInt()` reads one integer token into `number`. Non-integer input causes an input-mismatch exception.
7. `switch (number)` checks the value. Each `case` label is an exact integer alternative: `1` prints Monday, `2` Tuesday, continuing through `7` Sunday.
8. Each `break` exits the switch after printing its day. Without a `break` in a traditional switch, execution could continue into following case bodies.
9. `default` handles any integer not matched by a case, including values below 1 or above 7. Its `break` ends the switch.
10. `scanner.close()` closes the input reader.

The source comments summarize the case selection and fallback; they do not change behavior.

## 7. Key Java concepts in context

- A traditional `switch` is useful when one expression must be compared with several exact values.
- `case` labels name possible values; `default` is the fallback.
- `break` exits this switch. It does not end the whole Java program.
- `nextInt()` expects numeric input and does not perform range validation.

## 8. Example execution

```text
Enter a number from 1 to 7 to find the corresponding day of the week:
3
Wednesday
```

An input of `9` instead prints:

```text
You entered an invalid number.
```

## 9. Limitations and common mistakes

- The mapping is fixed to start with Monday as `1`; it does not depend on a locale or calendar setting.
- The program handles out-of-range integers, but not text or decimal input.
- `break` prevents fall-through to the next case; it is not what chooses the matching case.
- The program reads only one number and then exits.

## 10. Practice and extensions

1. Try the boundary values `1`, `7`, `0`, and `8`.
2. Add a message that explains the accepted range when input is invalid.
3. Rewrite the selection with an `if`/`else if` chain and compare the two structures.
4. Add a loop so the user can request more than one day before exiting.

## 11. Summary and source

`WeekDay` maps integer cases to text with `switch`. Its `default` branch handles integer values that are not valid weekday numbers.

Source: [`WeekDay.java`](../Beginner/WeekDay.java).
