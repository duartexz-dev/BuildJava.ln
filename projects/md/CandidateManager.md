# CandidateManager

## Overview

**CandidateManager** is a command-line program for managing a list of candidate names. It supports adding, listing, searching, removing, and counting entries. The exercise uses an ArrayList and separates menu actions into small methods.

## Learning goals

- Store and update a resizable collection with ArrayList<String>.
- Organize a program with methods, parameters, and return values.
- Use switch to route menu choices.
- Traverse a collection and convert a one-based menu position into a zero-based index.
- Validate numeric input and reject positions outside the current list size.
- Keep resources scoped with try-with-resources.

## Prerequisites

You should understand variables, loops, conditionals, methods, Scanner, and basic collections.

## Program structure

The source file is projects/Intermediate/CandidateManager.java and belongs to the Intermediate package.

The program starts with twenty sample names. Its main method controls the menu loop, while supporting methods each handle one responsibility:

| Method | Responsibility |
| --- | --- |
| showMenu() | Prints the available actions. |
| readInt() | Reads an integer and rejects non-numeric input. |
| readName() | Reads and trims a full name. |
| addCandidate() | Validates and adds a name. |
| listCandidates() | Displays the current list with one-based positions. |
| searchCandidate() | Finds an exact full-name match. |
| removeCandidate() | Validates a position before removing an item. |

## Execution flow

1. main creates an ArrayList<String> from the sample names.
2. A while loop displays the menu until the user chooses option 0.
3. readInt() reads each menu choice. If the input is not an integer, the method consumes the invalid line and asks again.
4. switch calls the method associated with options 1–5.
5. Option 4 first checks whether the list is empty, then displays its current contents and asks for a one-based position.
6. A removal is accepted only when the selected position is between 1 and candidates.size(). The program subtracts one before calling remove().
7. Choosing option 0 ends the loop. The Scanner is closed automatically by try-with-resources.

## Important Java concepts

- **Methods:** menu actions are separated instead of placing every operation inside main.
- **Collections:** ArrayList<String> stores an ordered list whose size can change.
- **Index conversion:** people choose positions starting at 1, while Java list indexes start at 0.
- **Input validation:** hasNextInt() checks the next token before it is read as an integer.
- **Early return:** methods stop after handling empty lists or invalid values, avoiding unnecessary nested conditionals.
- **Resource management:** try-with-resources closes the scanner when the program exits the block.

## Example interaction

After removing the twentieth candidate, the list contains nineteen entries. Choosing position 20 again is rejected because the program checks the current list size, not the original sample count.

## Limitations

- Candidate names are stored only while the program is running. They are not saved to a file or database.
- Search is exact and case-sensitive; Ana Silva and ana silva are treated as different strings.
- The initial list is sample data rather than a real candidate database.
- The program validates integer input and list positions, but it does not validate menu values beyond the available options.

## Practice extensions

1. Make search case-insensitive with equalsIgnoreCase().
2. Prevent duplicate candidate names.
3. Add an edit operation.
4. Persist the list in a text or CSV file.

## Source

[CandidateManager.java](../Intermediate/CandidateManager.java)