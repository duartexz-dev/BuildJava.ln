# CandidateManager

## 1. Overview

`CandidateManager` is a console menu for a list of candidate names. It can add, list, search, remove, and count entries. The list starts with twenty sample names, so this exercise focuses on working with an `ArrayList` and selecting menu actions.

## 2. Learning goals

After studying this program, you should be able to:

- Build a resizable list from sample data.
- Route menu choices with `switch`.
- Traverse a list with indexed `for` and `while` loops.
- Search using `contains()` and `indexOf()`.
- Convert a user-facing one-based number to a zero-based list index.
- Explain the program's current edge cases in input and removal.

## 3. Prerequisites

You should understand variables, loops, `if` statements, and integer input. An `ArrayList` is a resizable collection: its size can grow or shrink as items are added or removed.

## 4. Project and file structure

The source is [`CandidateManager.java`](../Intermediate/CandidateManager.java), in the `Intermediate` package. It imports `Scanner` for input, `ArrayList` for the editable list, and `Arrays` to create the initial names. The class uses no separate project classes.

To run it from the project root, compile and run the packaged class using the `Intermediate.CandidateManager` name.

## 5. Program execution

`main` constructs the sample list and enters a `do-while` menu. It reads a numeric option, executes the matching case, and most cases ask whether to continue. Choosing an invalid menu number automatically repeats. Option `0` asks the user to confirm whether to continue, so it is not an unconditional exit.

## 6. Complete code walkthrough

1. `package Intermediate;` places the class in the `Intermediate` namespace. The package line must come before imports.
2. The imports provide `Scanner`, `ArrayList`, and `Arrays`.
3. `new ArrayList<>(Arrays.asList(...))` creates a mutable list initialized with twenty names. The `ArrayList<String>` type means each stored item is a string.
4. `shouldContinue` starts as `false`, but the `do` loop shows the menu before checking it.
5. The menu's `nextInt()` reads the choice. `scanner.nextLine()` immediately consumes the remainder of that input line so case 1 or case 3 can safely read a full name with `nextLine()`.
6. `switch (option)` selects an operation:
   - **Case 1** reads a name, appends it with `candidates.add(name)`, prints the updated list, and reads a boolean continuation answer.
   - **Case 2** checks whether the list is empty. If it is, it prints a notice; the following indexed `for` loop still runs, but has no iterations for an empty list. Otherwise, it prints each item using `get(counter)`. The loop starts at index zero and stops before `candidates.size()`.
   - **Case 3** reads a search string. `contains()` checks for an exact, case-sensitive match. If present, `indexOf()` returns the first matching zero-based index; otherwise, the not-found message is printed. The case then reads the continuation boolean.
   - **Case 4** uses a `while` loop to display every name with a one-based number (`candidateIndex + 1`). It reads the chosen number, rejects values greater than 20, subtracts one to produce the list index, and removes that position. The removed list is then printed one item at a time, followed by the continuation answer.
   - **Case 5** prints `candidates.size()`, which is the current item count, then reads the continuation answer.
   - **Case 0** asks for a boolean continuation answer. Entering `false` exits on the next loop check; entering `true` displays the menu again.
   - **`default`** prints an invalid-option message and sets `shouldContinue` to `true`, so the menu repeats without asking the continuation question.
7. After a case, `while (shouldContinue)` decides whether to display the menu again.
8. `scanner.close()` runs after the menu ends. The isolated semicolons after the two loops are empty statements; they have no useful effect.

## 7. Key Java concepts in context

- `ArrayList<String>` stores an ordered, resizable sequence of names.
- List indexes start at `0`; the menu displays positions starting at `1`, so removal subtracts one.
- `size()`, `get()`, `add()`, `remove()`, `contains()`, and `indexOf()` are collection operations.
- `nextInt()` leaves the line separator behind; the explicit `nextLine()` after the menu choice consumes it.
- `do-while` guarantees that the menu appears at least once.

## 8. Example execution

If the user selects option `3` and searches for `Ana Silva`, the list contains an exact match and the program prints:

```text
Enter the candidate's name to search: Ana Silva
- Ana Silva [index 0]
Would you like to choose another option? Enter true or false:
```

The printed index is zero-based, unlike the one-based numbering shown by the remove menu.

## 9. Limitations and common mistakes

- Removal checks only `candidateNumber > 20`. It does not reject zero or negative numbers, and it does not compare the choice with the current list size. An invalid position can cause `IndexOutOfBoundsException`.
- The fixed limit of 20 becomes stale after additions or removals. A valid candidate beyond position 20 cannot be selected for removal; a candidate number within 1–20 can still be out of range if the list has shrunk.
- Search is case-sensitive and requires the complete name to match.
- A non-integer menu/removal choice or a non-boolean continuation answer causes an input-mismatch exception.
- Option `0` is worded like an exit choice but permits the user to continue by entering `true`.
- The empty `if` case after removal is not handled; the code immediately tries to remove an index.

## 10. Practice and extensions

1. Try searching for a name with different capitalization and observe the exact-match behavior.
2. Validate a removal number against `1` and `candidates.size()` before subtracting one.
3. Use the current list size instead of the hardcoded value `20`.
4. Make option `0` exit directly, and compare that flow with the current confirmation prompt.

## 11. Summary and source

This exercise ties a menu to a mutable `ArrayList`. The most important correctness issue is validating the user's one-based removal choice against the list's current size before converting it to an index.

Source: [`CandidateManager.java`](../Intermediate/CandidateManager.java).
