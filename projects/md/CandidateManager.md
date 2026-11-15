# CandidateManager

## 1. Overview

**CandidateManager** is a console exercise that stores candidate names in an `ArrayList`. A menu lets the user add, list, search, and remove names or display the current count. The program repeats the menu while the user answers `true` to the continuation prompt.

This guide explains the original implementation as it exists in [CandidateManager.java](../Intermediate/CandidateManager.java). It does not silently replace the original code with a refactored version.

## 2. Learning goals

After studying this program, you should be able to:

- Create a resizable `ArrayList<String>` from an initial group of values.
- Use `Scanner` to read numbers, names, and boolean responses.
- Explain how a `do-while` loop repeats a menu.
- Use `switch`, `case`, `break`, and `default` to select an action.
- Add and search for values with `add()`, `contains()`, and `indexOf()`.
- Display collection elements with `for` and `while` loops.
- Convert a one-based position shown to a person into a zero-based list index.
- Identify why an unchecked index can cause an exception.

## 3. Prerequisites

You should understand variables, strings, integer values, boolean values, conditions, loops, and basic console input.

An *array list* is a collection that stores several elements and can grow or shrink. An *index* is the zero-based position used by Java to access an element. A *boolean* stores either `true` or `false`.

## 4. Project and file structure

The source file is [CandidateManager.java](../Intermediate/CandidateManager.java), inside the `Intermediate` package.

The program is contained in one public class, `CandidateManager`, with one entry point: `main(String[] args)`. The menu actions are written directly inside the `switch`; the original version does not separate them into helper methods.

The imports provide:
- `Scanner` for reading console input.
- `ArrayList` for a resizable collection.
- `Arrays` for creating the initial group of names with `Arrays.asList(...)`.

## 5. Program execution

1. Java starts in `main` and creates a scanner for keyboard input.
2. The program builds an `ArrayList` containing twenty sample names.
3. The variable `shouldContinue` starts as `false`, but the `do-while` body executes once before this value is checked.
4. The program prints the menu, reads an integer option, and clears the rest of that input line.
5. The `switch` executes the selected case. Most cases ask whether the user wants another menu cycle and store the answer in `shouldContinue`.
6. The loop repeats while `shouldContinue` is true.
7. When the loop ends, `scanner.close()` closes the input reader.

The original option 0 is not an unconditional exit: it asks whether the user wants to continue. Answering `true` displays the menu again.

## 6. Complete code walkthrough

### 6.1 Package and imports

`package Intermediate;` places the class in the `Intermediate` package.

The imports make three Java library classes available:
- `Scanner` reads values entered in the console.
- `ArrayList` stores a resizable collection.
- `Arrays` provides `asList(...)`, which creates the initial group of names.

### 6.2 Declaring the class and main method

`public class CandidateManager` declares the public class. Its filename matches the class name.

`public static void main(String[] args)` is the entry point. The `public` modifier allows the Java launcher to call it, `static` means it belongs to the class, and `void` means it does not return a value.

### 6.3 Creating the scanner and candidate list

`Scanner scanner = new Scanner(System.in);` creates a scanner that reads from standard input, normally the keyboard.

`ArrayList<String> candidates = new ArrayList<>(Arrays.asList(...));` creates a resizable list containing the twenty sample names.

The generic type `<String>` means that this list is intended to store strings. `Arrays.asList(...)` supplies the initial values, and the `ArrayList` constructor copies those values into a collection that can later add or remove entries.

### 6.4 Controlling repetition with shouldContinue

`boolean shouldContinue = false;` declares the variable used by the loop condition.

The program then enters `do {` rather than a regular `while`. A `do-while` always executes its body at least once, so the initial false value does not prevent the first menu from appearing.

At the bottom, `while (shouldContinue);` checks whether another cycle should run.

### 6.5 Printing the menu and reading the option

The consecutive `System.out.println(...)` statements display the menu.

`int option = scanner.nextInt();` reads the selected number. Because `nextInt()` reads the numeric token but does not consume the line break created by Enter, `scanner.nextLine();` consumes the remainder of that line.

That second call is important before cases such as option 1 or 3 use `nextLine()` to read a full name. Without it, the next line-reading call could return the leftover empty line.

### 6.6 Selecting a menu action with switch

`switch (option)` checks the integer and enters the matching `case`.

A `break` exits the current switch case. It does not end the surrounding `do-while` loop. The loop ends only when its condition becomes false.

The `default` branch handles an integer that does not match any listed case.

### 6.7 Case 1: adding a candidate

The program prints a prompt and reads the full name with `scanner.nextLine()`.

`candidates.add(name)` appends the entered string to the end of the list. The program then prints a confirmation and the current collection.

Finally, `scanner.nextBoolean()` reads whether the user wants another menu cycle and stores the result in `shouldContinue`.

The original code does not reject blank names or duplicates.

### 6.8 Case 2: listing candidates

The condition `candidates.size() <= 0` checks whether the list is empty. When it is, the program prints a message.

The `for` loop starts at index zero and continues while `counter < candidates.size()`. Each iteration prints `candidates.get(counter)`, so the names appear in list order.

After listing, the program asks whether to continue and reads a boolean response. The semicolon after the loop is an empty statement; it has no useful effect here.

### 6.9 Case 3: searching for a name

The program reads the search text with `scanner.nextLine()`.

`candidates.contains(nameSearch)` checks whether the exact string exists in the list. If it does, `candidates.indexOf(nameSearch)` returns the index of its first occurrence. If it does not, the program displays `Candidate not found.`

The displayed value is a zero-based index, even though the removal menu displays positions beginning at one. This is a difference in presentation between the two cases.

The search is case-sensitive. A name with different capitalization is treated as a different string.

### 6.10 Case 4: displaying and removing a candidate

The variable `candidateIndex` starts at zero. The `while` loop displays each name with `candidateIndex + 1`, so the person sees positions beginning at one. The index itself is still zero-based.

The program then reads `candidateNumber` and calculates `candidatePosition = candidateNumber - 1`. This converts the displayed one-based position into the index expected by Java.

`candidates.remove(candidatePosition)` removes the element at that index. The following `for` loop displays the remaining candidates.

**Important limitation of the original code:** there is no range check before `remove(...)`. Entering zero, a negative number, or a number greater than the last valid position can cause an `IndexOutOfBoundsException`. The program does not catch that exception, so an invalid position can terminate the application.

### 6.11 Case 5: showing the total

`candidates.size()` returns the current number of elements. The `printf` statement inserts that value into the message.

The program then reads another boolean response to decide whether the menu repeats.

### 6.12 Case 0 and the default case

Case 0 prints a message that asks whether the user wants to continue. The entered boolean is stored in `shouldContinue`. Therefore, choosing 0 does not itself force the loop to stop.

The `default` branch prints an invalid-option message and sets `shouldContinue = true`. It does not ask for a boolean response; the menu simply repeats.

### 6.13 Closing the scanner

After the loop ends, `scanner.close()` closes the scanner and its underlying input stream. In this original version, the scanner is closed explicitly rather than with try-with-resources.

## 7. Key Java concepts in context

| Concept | Example | What it does here |
| --- | --- | --- |
| Generic collection | `ArrayList<String>` | Stores multiple candidate names as strings. |
| Initial collection values | `Arrays.asList(...)` | Supplies the twenty starting names. |
| `do-while` | `do { ... } while (shouldContinue);` | Guarantees that the menu appears once before the condition is checked. |
| `switch` | `switch (option)` | Routes the selected number to a menu action. |
| `break` | End of each case | Exits the current switch branch. |
| Collection size | `candidates.size()` | Reports how many names are currently stored. |
| Membership search | `contains(nameSearch)` | Checks whether an exact name is present. |
| Index search | `indexOf(nameSearch)` | Returns the first matching zero-based index. |
| Add and remove | `add(name)`, `remove(candidatePosition)` | Changes the contents of the shared list. |
| Boolean input | `nextBoolean()` | Decides whether another menu cycle runs. |

## 8. Example execution

A normal removal sequence can be:

1. Choose option 4.
2. The program displays the twenty names with positions from 1 to 20.
3. Enter `20`.
4. The program subtracts one, removes the element at index 19, and prints the remaining names.
5. Enter `false` when asked whether to continue.
6. The loop ends and the scanner is closed.

In this example, the twentieth name is removed. This demonstration uses a valid position; the original program does not protect against invalid positions.

## 9. Limitations and common mistakes

- The removal operation does not validate the selected position. An invalid number can throw an exception and terminate the program.
- Search is case-sensitive and returns only the first occurrence of a duplicated name.
- The search result displays a zero-based index, while the removal list displays one-based positions.
- Blank names and duplicate names can be added.
- Option 0 asks whether to continue rather than exiting unconditionally.
- Most actions require an additional `true` or `false` response before the next menu.
- The list exists only in memory. All changes are lost when the program exits.
- The scanner is closed explicitly and is not protected by try-with-resources.

## 10. Practice and extensions

1. Validate the removal position before calling `remove(...)`.
2. Display search results using a one-based position.
3. Reject blank names and prevent duplicate entries.
4. Extract the add, list, search, and remove actions into separate methods.
5. Replace the boolean continuation question with a clearer menu option that exits directly.
6. Save the list to a file so candidates remain available after the application closes.

## 11. Summary and source

The original CandidateManager practices collections, console input, menu selection, loops, searching, and index conversion. Its most important weakness is that the removal index is not validated before it is used.

Source: [CandidateManager.java](../Intermediate/CandidateManager.java).
