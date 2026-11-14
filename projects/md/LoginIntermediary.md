# LoginIntermediary

## 1. Overview

`LoginIntermediary` asks for an email and password and allows up to three attempts to match two values stored in the source code. It demonstrates loops, boolean logic, string comparison, constants, and a conditional expression.

## 2. Learning goals

After studying the program, you should be able to:

- Compare `String` contents with `equals()`.
- Combine conditions with `&&` and negate a condition with `!`.
- Control a `while` loop with an attempt counter and a success flag.
- Select one of two strings with the ternary (`?:`) operator.
- Recognize the limitations of credentials embedded in source code.

## 3. Prerequisites

You should know how to read lines from `Scanner`, use `if`-style boolean conditions, and repeat statements with a loop. A **boolean flag** is a true/false variable used to represent a state, such as whether login succeeded.

## 4. Project and file structure

The class is in the `Intermediate` package in [`LoginIntermediary.java`](../Intermediate/LoginIntermediary.java). It imports `Scanner` and performs all work in `main`; no other project class is required.

## 5. Program execution

The program sets its practice credentials, initializes an attempt counter and a false login flag, then repeats while fewer than three attempts have been used and the credentials have not matched. After each attempt it prints success or failure. After the loop it checks whether all three attempts were used without a match, prints the corresponding message (or a blank line), and closes the scanner.

## 6. Complete code walkthrough

1. `package Intermediate;` declares the package; the import provides `Scanner`.
2. `CORRECT_EMAIL` and `CORRECT_PASSWORD` are `final` local strings. `final` prevents these variables from being reassigned after initialization. The values are directly visible in the source.
3. `byte attempts = 0` stores the number of tries. `boolean validLogin = false` records whether a match has occurred.
4. `while (attempts < 3 && !validLogin)` continues only when both conditions are true: fewer than three tries have been used, and login is not yet valid. `!` reverses the boolean value.
5. `nextLine()` reads the email and password as full lines, preserving spaces if entered.
6. `attempts++` counts the current try after both inputs have been read.
7. `email.equals(CORRECT_EMAIL) && password.equals(CORRECT_PASSWORD)` compares string contents. Both comparisons must be true for `validLogin` to become true. The comparison is case-sensitive.
8. The ternary expression `validLogin ? "Login sucessful" : "Invalid email or password."` selects the success string when the condition is true, otherwise the failure string. `System.out.println(result)` displays it.
9. After the loop, `attempts == 3 && !validLogin` is true only when all three attempts were used and none succeeded. That result selects the message `"Attempts is lost , try again after"` or an empty string.
10. The final `println` always runs, so a successful login prints an additional blank line because the selected string is empty.
11. `scanner.close()` ends input use.

The source contains spelling errors in some output text; they are part of the actual messages, not Java keywords.

## 7. Key Java concepts in context

- `String.equals()` tests text content. `==` would compare object references, not reliably the characters.
- `&&` is logical AND; both sides must be true. `!` means NOT.
- A `while` loop checks its condition before each iteration.
- `final` local variables cannot be assigned a new value after initialization.
- The ternary operator is a compact expression with the form `condition ? valueWhenTrue : valueWhenFalse`.

## 8. Example execution

The credentials in the source are `bananaSplit@gmail.com` and `12345678910`. One successful run is:

```text
Enter your email:bananaSplit@gmail.com
And your password:12345678910
Login sucessful
```

After this output, the program prints a blank line and ends. The credentials are shown here because they are literal practice values in the source, not private account credentials.

## 9. Limitations and common mistakes

- This is a console exercise, not secure authentication. Anyone with the source can read the credentials; there is no hashing, account store, network service, or protected secret.
- Comparisons are case-sensitive and require an exact match.
- The failure message after three attempts does not state when the user may try again, and the program does not implement a waiting period or another login session.
- The empty success-path message still produces a blank output line.
- A non-line-oriented redesign using `next()` would behave differently for input containing spaces.

## 10. Practice and extensions

1. Try a wrong email and a correct password, then explain why login still fails.
2. Add a visible attempt number to the prompt.
3. Avoid printing a blank line after success by printing the final lockout message only when its condition is true.
4. As a learning exercise only, discuss why moving credentials out of source code is necessary but not, by itself, enough to build a secure authentication system.

## 11. Summary and source

This program combines a loop, attempt counter, boolean state, exact string comparisons, and a ternary expression. Its hardcoded credentials make it a demonstration only, not a real login system.

Source: [`LoginIntermediary.java`](../Intermediate/LoginIntermediary.java).
