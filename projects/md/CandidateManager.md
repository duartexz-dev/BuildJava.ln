# CandidateManager

## 1. Overview

**CandidateManager** is a console application that manages a list of candidate names. The user interacts with a menu to add, list, search, remove, and count candidates. The exercise brings together object-oriented programming foundations, collections, methods, loops, input validation, and control flow.

The program starts with twenty example names. Changes exist only in memory while the application is running.

## 2. Learning goals

After studying this source, you should be able to:

- Explain why a variable declared as `List<String>` can reference an `ArrayList<String>`.
- Create a resizable list from an initial group of values.
- Separate a program into methods with different responsibilities.
- Distinguish a method parameter from the argument passed when the method is called.
- Explain the difference between `void`, `int`, and `String` return types.
- Use `while`, `switch`, `if`, and early `return` statements to control execution.
- Validate console input with `Scanner.hasNextInt()`.
- Convert a human-friendly list position into a zero-based Java index.
- Explain how try-with-resources closes a resource automatically.

## 3. Prerequisites

You should recognize variables, primitive types, strings, conditions, loops, methods, and basic console input.

A *collection* stores multiple values in one object. A *method* is a named block of code that performs a task. A *parameter* receives a value when a method is called; the value supplied at the call site is the *argument*.

## 4. Project and file structure

The source is [CandidateManager.java](../Intermediate/CandidateManager.java), inside the `Intermediate` package.

The program has one public class, `CandidateManager`. Its `main` method coordinates the application, while private static methods handle the menu actions:

| Method | Return type | Responsibility |
| --- | --- | --- |
| `showMenu()` | `void` | Displays the available options. |
| `readInt(...)` | `int` | Reads and returns a valid integer. |
| `readName(...)` | `String` | Reads a name and removes surrounding whitespace. |
| `addCandidate(...)` | `void` | Validates and adds a name. |
| `listCandidates(...)` | `void` | Displays all stored names. |
| `searchCandidate(...)` | `void` | Looks for an exact name match. |
| `removeCandidate(...)` | `void` | Validates a position and removes that entry. |

The list is created in `main` and passed to the methods that need to read or change it. Each method receives a reference to the same list object, so an addition or removal is visible to later menu actions.

## 5. Program execution

1. Java starts in `main`. The program builds an `ArrayList` from twenty sample names and opens a `Scanner` inside a try-with-resources block.
2. The `while` loop displays the menu and calls `readInt` to obtain an option.
3. A `switch` statement sends options 1–5 to the matching method. Option 0 changes `running` to `false`, which ends the loop.
4. `readInt` keeps asking until the next token is an integer. When the input is invalid, it consumes the rest of that line before trying again.
5. Methods that change the list update the same collection created in `main`. The list and its current size are therefore shared by all menu actions.
6. When the user exits, execution leaves the try block and Java closes the `Scanner` automatically.

## 6. Complete code walkthrough

### 6.1 Package and imports

`package Intermediate;` places the class in the `Intermediate` package. The imports provide the collection and input types:

- `ArrayList` is the resizable list implementation.
- `Arrays` provides `asList(...)`, which turns the initial names into a list.
- `List` is the interface used as the variable type.
- `Scanner` reads the user's console input.

Using the `List` interface on the left side keeps the code less dependent on one concrete list implementation.

### 6.2 Creating the initial collection

`List<String> candidates = new ArrayList<>(Arrays.asList(...));` creates a new resizable `ArrayList` containing the twenty initial names.

The `<String>` type argument means that the collection stores strings. `Arrays.asList(...)` supplies the initial elements; passing that result to the `ArrayList` constructor creates a list that can later grow and shrink.

### 6.3 Managing the scanner and loop state

`try (Scanner scanner = new Scanner(System.in))` opens the input reader as a resource. A try-with-resources statement closes it automatically when the block ends, including when an exception interrupts the block.

The primitive variable `boolean running = true` controls the menu loop. The loop continues while that value remains true.

### 6.4 Repeating the menu and choosing an action

`while (running)` repeats the menu. Each cycle calls `showMenu()`, then stores the result of `readInt(...)` in `option`.

`switch (option)` selects one branch:

- `case 1` adds a candidate.
- `case 2` lists the candidates.
- `case 3` searches by name.
- `case 4` removes a candidate.
- `case 5` prints `candidates.size()`.
- `case 0` changes `running` to false and prints the closing message.
- `default` handles an option outside the supported range.

Each `break` exits the current switch branch. It does not end the surrounding `while` loop. The loop ends because the exit branch changes the boolean condition.

### 6.5 Displaying the menu

`showMenu()` has the return type `void`, so it performs an action but does not return a value. It prints the available choices and does not need parameters because it does not depend on the candidate list or scanner.

### 6.6 Reading and validating an integer

`readInt(Scanner scanner, String prompt)` receives two parameters: the existing scanner and the message to display.

Inside `while (true)`, the method prints the prompt and checks `scanner.hasNextInt()`:

- When the next token is an integer, `nextInt()` reads it. The following `nextLine()` consumes the remainder of that input line. The `return value` statement sends the integer back to the caller and immediately exits this method.
- When the token is not an integer, `nextLine()` discards that invalid line and the method prints an instruction before repeating.

The return type is `int` because the caller needs the selected numeric option. The infinite-looking loop is safe in ordinary interactive use because a valid integer causes the method to return.

### 6.7 Reading a candidate name

`readName(Scanner scanner, String prompt)` prints the requested message and returns `scanner.nextLine().trim()`.

`nextLine()` reads the entire line, including spaces between first and last names. `trim()` removes whitespace at the beginning and end. The method returns a `String`, allowing callers to reuse the same input behavior.

### 6.8 Adding a candidate

`addCandidate(List<String> candidates, Scanner scanner)` calls `readName(...)` to get the name. If `name.isEmpty()` is true, it prints an error and uses `return;` to stop this method early.

This `return;` does not close the application. It only finishes the current method, so the menu loop in `main` can continue. Otherwise, `candidates.add(name)` appends the name to the shared list.

### 6.9 Listing candidates

`listCandidates(List<String> candidates)` first checks whether the collection is empty. If it is, the method prints a message and returns.

Otherwise, a `for` loop visits each index from zero up to (but not including) `candidates.size()`. The display uses `index + 1` so the user sees positions beginning at 1. The actual Java list index still begins at 0.

### 6.10 Searching by name

`searchCandidate(...)` reads a name and calls `candidates.indexOf(name)`. This method returns the index of the first exact match, or `-1` when no match exists.

The condition `index == -1` detects the missing case. When a match exists, the program displays the stored name and converts its zero-based index to a one-based position for the user.

The search is case-sensitive because `indexOf` compares the string contents exactly.

### 6.11 Removing a candidate safely

`removeCandidate(...)` first checks whether the list is empty. If it is, the method returns before asking for a position.

After displaying the current list, it reads `candidateNumber`. The condition `candidateNumber < 1 || candidateNumber > candidates.size()` rejects positions below 1 or above the current number of candidates.

A valid position is converted with `candidateNumber - 1` before calling `candidates.remove(...)`. The removed name is stored in `removedCandidate` and displayed. Checking the current `size()` prevents a stale position such as 20 from being accepted after the list has shrunk to 19 entries.

## 7. Key Java concepts in context

| Concept | Where it appears | Why it matters |
| --- | --- | --- |
| Interface and implementation | `List<String>` and `new ArrayList<>()` | The variable depends on the list contract, not only on ArrayList. |
| Generics | `List<String>` | The compiler checks that list elements are strings. |
| Arguments and parameters | Calls to `addCandidate(...)`, `readInt(...)`, and other methods | Values are passed into methods so each method can do one job. |
| Return values | `readInt`, `readName`, `indexOf`, `size`, `isEmpty` | A caller can use information returned by another method. |
| `void` and `return;` | Menu action methods | A method can perform an action without returning data, and can stop early. |
| `break` | The `switch` statement | It exits the current switch branch, not the menu loop. |
| Early return | Empty-name, empty-list, and invalid-position checks | It avoids running code that cannot succeed. |
| Try-with-resources | The Scanner block | It closes the resource automatically. |

## 8. Example execution

A representative sequence is:

1. Choose option 4 to remove a candidate.
2. The program lists twenty names and asks for a position.
3. Enter `20`; the program removes the twentieth name.
4. Choose option 4 again. The list now contains nineteen names.
5. Enter `20` again. The program rejects it because the valid range is now 1–19.
6. Choose option 5 to see the current total, then choose option 0 to exit.

The important detail is that the removal check uses the list's current size, not the original number of sample names.

## 9. Limitations and common mistakes

- The candidates exist only in memory and disappear when the program exits.
- Search is exact and case-sensitive. The program does not treat `Ana Silva` and `ana silva` as the same name.
- Duplicate names are allowed.
- Menu input is checked for integer type, but unsupported integer values are only reported as invalid options.
- A blank name is rejected, but the program does not enforce a minimum name length or other personal-data rules.
- If standard input closes before a valid integer is entered, the retry loop has no explicit end-of-input handling.

## 10. Practice and extensions

1. Change the search to ignore letter case by comparing with `equalsIgnoreCase()`.
2. Reject duplicate names before adding them.
3. Add an edit operation while preserving the same position validation.
4. Move the list operations into a separate class and keep `main` focused on the menu.
5. Save and reload the candidates from a text file.

## 11. Summary and source

CandidateManager combines a shared `ArrayList`, methods, menu control flow, input validation, and safe list-index handling. The key design idea is to let `main` coordinate the application while small methods perform individual tasks.

Source: [CandidateManager.java](../Intermediate/CandidateManager.java).
