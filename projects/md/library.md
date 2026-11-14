# library

## 1. Overview

The `library` program builds a simple in-memory list of book titles. It asks for at least one title, displays the growing list, and repeats while the user answers `true`.

## 2. Learning goals

After studying this program, you should be able to:

- Create and update an `ArrayList<String>`.
- Use `do-while` when the action must happen at least once.
- Read a full line and a boolean with `Scanner`.
- Explain why a newline is consumed after `nextBoolean()`.
- Recognize a redundant condition after a loop.

## 3. Prerequisites

You should know how to declare variables, call methods, and read console input. An **ArrayList** is a list that can change size as items are added or removed.

## 4. Project and file structure

[`library.java`](../Intermediate/library.java) belongs to the `Intermediate` package. It imports `ArrayList` for the book list and `Scanner` for input. Its class name is lowercase, matching the filename but differing from the usual Java convention of capitalizing class names.

## 5. Program execution

The program creates an empty list and a scanner, then enters a `do-while` loop. Each iteration reads one title, adds it to the list, displays the current list, and reads a boolean answer. It consumes the line break left by that boolean token, then repeats only if the answer was `true`. Once the answer is `false`, the program prints the list again and closes the scanner.

## 6. Complete code walkthrough

1. The package declaration places the class in `Intermediate`; the imports provide the list and input classes.
2. `ArrayList<String> books = new ArrayList<>();` creates an empty list of strings. The `<>` lets Java infer the type argument from the declaration.
3. `new Scanner(System.in)` prepares to read console input.
4. `Boolean AddAgain = false` initializes the loop-control value. `Boolean` is the object wrapper for primitive `boolean`; the variable name uses an uppercase initial, which is unusual for a local variable.
5. The `do` block starts before its condition is tested, guaranteeing that at least one book title is requested.
6. `scanner.nextLine()` reads the complete title line. `books.add(nameBook)` appends that title to the end of the list.
7. `printf("Current library: %s\n", books)` displays the list. When an `ArrayList` is formatted with `%s`, its string representation shows the elements in brackets.
8. `scanner.nextBoolean()` reads a `true` or `false` token. It does not consume the rest of the line, so `scanner.nextLine()` consumes the pending line break before the next iteration tries to read another title.
9. `while (AddAgain == true)` repeats when the answer is true. Comparing a `Boolean` with a primitive boolean unboxes the wrapper. A primitive `boolean` and `while (AddAgain)` would be simpler here.
10. After the loop, `if (AddAgain == false)` prints the list a second time. Since the loop exits only when the condition is false, this check is redundant for normal input.
11. `scanner.close()` closes the scanner and its underlying input stream.

## 7. Key Java concepts in context

- `ArrayList.add()` appends one element; the list's `size()` grows automatically.
- `do-while` checks the condition after running the body, which guarantees one entry.
- `nextLine()` reads spaces within a title. `nextBoolean()` reads one boolean token.
- Mixing token input and line input requires attention to the remaining newline.
- Wrapper `Boolean` can represent `null`, unlike primitive `boolean`, although this program initializes it to a non-null value.

## 8. Example execution

```text
Hello, user. Add a book by typing its title below.
Book title: The Hobbit
Current library: [The Hobbit]
Would you like to add another? (Type true for yes or false for no.)

true
Hello, user. Add a book by typing its title below.
Book title: Dune
Current library: [The Hobbit, Dune]
Would you like to add another? (Type true for yes or false for no.)

false
Current library: [The Hobbit, Dune]
```

The final list is printed once inside the final iteration and again after the loop, so it appears twice when the user answers `false`.

## 9. Limitations and common mistakes

- The list exists only while the program runs; there is no file or database storage.
- An empty title is accepted.
- Any response other than a valid boolean token causes an input-mismatch exception.
- The final `if` is always true after a normal loop exit and can be removed without changing that behavior.
- `Boolean` can be replaced with primitive `boolean` for this use.

## 10. Practice and extensions

1. Add two books and compare how the list is displayed after each insertion.
2. Remove the redundant final condition and preserve one final list display.
3. Reject blank titles.
4. Add a menu option to search for or remove a title.

## 11. Summary and source

This exercise uses an `ArrayList`, line input, boolean input, and a `do-while` loop. Its key input detail is consuming the line break after `nextBoolean()` before the next title is read.

Source: [`library.java`](../Intermediate/library.java).
