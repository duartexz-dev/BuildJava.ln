# CandidateManager

## 1. Overview

`CandidateManager` is a console menu for managing twenty initial candidate names. It can add, list, search, remove, and count names stored in an `ArrayList<String>`.

## 2. Learning goals

- Initialize an `ArrayList` from existing values.
- Read menu options, names, and boolean answers with `Scanner`.
- Use `switch` to select actions and `do-while` to repeat the menu.
- Apply `add`, `get`, `contains`, `indexOf`, `remove`, and `size`.
- Convert a one-based displayed position into a zero-based Java index.

## 3. Prerequisites

You should know variables, strings, conditions, loops, arrays, and console input. An **array list** is a resizable collection; its indexes start at `0`.

## 4. Project and file structure

The source is [`CandidateManager.java`](../Intermediate/CandidateManager.java), in the `Intermediate` package. The public class contains one `main` method. Menu operations are written directly in its `switch`; there are no separate helper methods in the current source.

The `candidates` variable refers to an `ArrayList<String>` initialized with twenty names. One `Scanner` reads menu choices, names, positions, and continuation answers.

## 5. Program execution

1. `main` creates the scanner and initializes the list with `Arrays.asList(...)`.
2. A `do-while` loop displays the menu at least once.
3. `nextInt()` reads the selected option; `nextLine()` consumes the remainder of that input line.
4. `switch` executes the selected operation.
5. The program asks whether to continue and stores the boolean answer.
6. When `shouldContinue` is false, the loop ends and the scanner closes.

## 6. Complete code walkthrough

### 6.1 Package and imports

`package Intermediate;` declares the package. `Scanner` reads input, `ArrayList` provides a resizable collection, and `Arrays` provides `asList(...)` for the initial names.

### 6.2 Creating the list

`new ArrayList<>(Arrays.asList(...))` creates a resizable list from the twenty supplied names. `<String>` means the collection stores text. All menu cases access the same `candidates` list.

### 6.3 Controlling repetition

`boolean shouldContinue = false` initializes the loop flag. The `do` body runs before Java checks `while (shouldContinue)`. `nextBoolean()` accepts `true` or `false`; it does not accept a menu number such as `4`.

### 6.4 Reading a menu option

`nextInt()` reads the menu number. The following `nextLine()` consumes the rest of that line, allowing later `nextLine()` calls in cases 1 and 3 to read full names.

### 6.5 Selecting an operation

`switch (option)` routes options 1–5 to add, list, search, remove, and count. Option 0 asks whether to continue. `default` reports an unsupported option and sets the loop flag to true. Each `break` exits its switch case, not the surrounding loop.

### 6.6 Adding and listing

Case 1 reads a full name and appends it with `candidates.add(name)`. Case 2 checks whether the list is empty, then uses a `for` loop and `get(index)` to print each element. `size()` gives the current number of elements.

### 6.7 Searching

Case 3 reads a name and checks `contains(nameSearch)`. If it exists, `indexOf(nameSearch)` returns the first matching zero-based index. Matching is exact and case-sensitive.

### 6.8 Removing by position

Case 4 displays each candidate with `candidateIndex + 1`, so displayed positions start at one. It converts the chosen position with `candidateNumber - 1`, reads the name with `get(...)`, removes it with `remove(...)`, and prints the remaining list and removed name.

The current condition rejects a number greater than the list's current size. It does not check values below 1; this is documented as current behavior, not changed by the guide.

### 6.9 Counting, continuing, and closing

Case 5 prints `candidates.size()`. Case 0 reads a boolean: `true` returns to the menu and `false` ends the loop. After the loop, `scanner.close()` closes the input reader.

## 7. Key Java concepts in context

| Concept | Example | Purpose |
| --- | --- | --- |
| `ArrayList<String>` | `candidates` | Stores a resizable list of names. |
| `add()` / `remove()` | Add and removal cases | Insert and delete elements. |
| `contains()` / `indexOf()` | Search case | Check membership and find an index. |
| `size()` / `get()` | List and count cases | Read the collection size and an element. |
| `switch` / `break` | Menu | Choose one operation. |
| `do-while` / `boolean` | `shouldContinue` | Control menu repetition. |
| `Scanner` | `nextInt`, `nextLine`, `nextBoolean` | Read different input types. |

## 8. Example execution

Choose option `4` and enter `20` to remove `Vinicius Teixeira`. Enter `true` to return to the menu. Choose option `4` again and enter `20`; the list now has nineteen entries, so the program rejects that number. Enter `false` to finish. A successful removal prints `Removed: Vinicius Teixeira`.

## 9. Limitations and common mistakes

- The list is held in memory and resets to the initial names on each run.
- Search is exact and case-sensitive; duplicate names are allowed.
- The removal condition rejects numbers above the current size but does not reject numbers below 1 before converting to an index.
- Menu and position input use `nextInt()`, while continuation answers use `nextBoolean()`. A token of the wrong type causes an input-mismatch exception.
- The program does not save candidates to a file or database.

## 10. Practice and extensions

1. Prevent duplicate candidate names.
2. Display search results with a one-based position.
3. Add a menu operation to edit a name.
4. Save and reload the list from a file.
5. Move each menu action into a method after understanding the current switch.

## 11. Summary and source

`CandidateManager` practices `ArrayList` operations in a console menu. Its central ideas are list indexes, `switch`, `Scanner`, and a boolean controlling a `do-while` loop.

Source: [`CandidateManager.java`](../Intermediate/CandidateManager.java).
