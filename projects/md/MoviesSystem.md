# MoviesSystem

## 1. Overview

`MoviesSystem` is a console exercise for a small cinema ticket flow. It asks for a customer's name and a movie title. When the title exactly matches one of the names stored in an array, the program randomly selects a ticket price and a seat, creates a `ticket` object, and prints its text representation.

## 2. Learning goals

After studying this source, you should be able to:

- Create a nested class to group related ticket data.
- Initialize an object with a constructor and `this`.
- Override `toString()` to define an object's printed representation.
- Store a fixed set of choices in arrays.
- Use `Random.nextInt(bound)` to select a valid array index.
- Check whether an array contains a value with `Arrays.asList(...).contains(...)`.
- Combine input, object creation, and formatted output in one console program.

## 3. Prerequisites

You should know how to declare variables, read console input with `Scanner`, create arrays, and use `if` or loop conditions. A **nested class** is a class declared inside another class. An **object** is an instance created from a class, and a **constructor** initializes the object's fields.

## 4. Project and file structure

The source is [`MoviesSystem.java`](../Intermediate/MoviesSystem.java), inside the `Intermediate` package. The public class `MoviesSystem` contains `main` and a static nested class named `ticket`.

The nested class stores four strings: the customer's name, selected seat, movie title, and formatted ticket price. Its constructor receives those values, and its overridden `toString()` method combines them into a multi-line string.

The `main` method contains the input flow and the available movie, price, seat-letter, and seat-number arrays. No other project class is required.

## 5. Program execution

1. Java starts in `MoviesSystem.main()`.
2. The program creates a `Random` object and arrays for ticket prices, seat letters, and seat numbers.
3. It opens a `Scanner`, creates an array of allowed movie titles, and asks for the customer's name and movie title.
4. `Arrays.asList(movies).contains(nameMovie)` checks whether the entered title exactly matches one of the array values.
5. When the title is present, the `while` body selects a random price, a random seat letter, and a random seat number.
6. The two seat parts are concatenated, then passed with the other values to the `ticket` constructor.
7. `System.out.println(ticket)` prints the string returned by the overridden `toString()` method. The `break` ends the loop after that one ticket.
8. The scanner is closed after the loop.

If the movie title does not match an array entry, the loop body is skipped. The current program does not print an invalid-title message or ask for another title.

## 6. Complete code walkthrough

### 6.1 Package and imports

`package Intermediate;` places the class in the `Intermediate` package. The imports provide three utilities:

- `Scanner` reads the customer's input.
- `Arrays` provides `asList(...)`, which allows the array values to be checked with the `List` method `contains(...)`.
- `Random` generates indexes used to select prices and seat parts.

### 6.2 Declaring the nested ticket class

`public static class ticket` declares a nested class inside `MoviesSystem`. The `static` modifier means this nested class can be instantiated from the static `main` method without first creating a `MoviesSystem` object.

Its fields are all `String` values:

- `name` stores the customer's name.
- `seatNumber` stores the combined seat label, such as `A3`.
- `nameMovie` stores the selected movie title.
- `ticketPrice` stores a price string, including its currency symbol.

The lowercase class name `ticket` matches the current source. Java convention normally uses an uppercase initial for class names, but this guide preserves the source's actual identifier.

### 6.3 Initializing a ticket with the constructor

`public ticket(String name, String seatNumber, String nameMovie, String ticketPrice)` is the constructor. It receives four arguments in a defined order and assigns them to the matching fields.

Statements such as `this.name = name;` distinguish the field belonging to the new object (`this.name`) from the constructor parameter (`name`). The same pattern initializes the seat, movie, and price fields.

### 6.4 Formatting the ticket with `toString()`

`@Override` marks the method as an implementation of the `toString()` method inherited from `Object`.

The method returns a string built with concatenation (`+`). The `\n` escape sequence places each ticket detail on a new line. When `System.out.println(ticket)` receives an object, Java uses its `toString()` result for the printed text.

### 6.5 Preparing random choices and arrays

`Random random = new Random();` creates the random-number generator.

The `prices` array contains three already-formatted price strings. `CharSeats` contains five letter choices (`A`, `B`, `C`, `D`, and `F`), while `NumberSeats` contains five number strings (`1` through `5`). These arrays hold strings, so the program does not perform numeric price calculations or numeric seat arithmetic.

`Scanner scanner = new Scanner(System.in);` creates the console input reader. The `movies` array stores the exact movie titles accepted by the program.

### 6.6 Reading the customer's details

The first prompt asks for the customer's name, which is read with `scanner.nextLine()` and stored in `nameUser`.

The second prompt asks for the movie title. A second `nextLine()` stores the full line in `nameMovie`, including spaces between words.

### 6.7 Checking the movie title

`Arrays.asList(movies)` creates a list view of the movie array. Calling `.contains(nameMovie)` checks whether the list has an equal string value.

String matching is case-sensitive and requires the spelling to match an entry exactly. If the condition is false, the `while` body does not run. If it is true, the body begins and later reaches `break`, so the loop can issue at most one ticket in this version.

### 6.8 Selecting a random price and seat

`random.nextInt(prices.length)` returns an integer from zero (inclusive) to the array length (exclusive). That value is used as an index in `prices`, producing one of the three price strings.

The same pattern selects an index from `CharSeats` and `NumberSeats`. The statement `String Seat = CharSeatsSelected + NumberSeatsSelected;` concatenates the chosen letter and number into one seat label.

### 6.9 Creating and printing the ticket

`new ticket(nameUser, Seat, nameMovie, PriceTicket)` creates the nested ticket object and passes the four details to its constructor. The variable `ticket` stores the object reference.

`System.out.println(ticket)` prints the result of the object's overridden `toString()` method. The final `break` exits the `while` body, and `scanner.close()` closes the input reader.

## 7. Key Java concepts in context

| Concept | Where it appears | Why it matters |
| --- | --- | --- |
| Static nested class | `ticket` inside `MoviesSystem` | Groups ticket data while allowing creation from static `main`. |
| Fields and constructor | The four ticket fields and `ticket(...)` | Store related values together in one object. |
| `this` | `this.name = name` | Distinguishes an object field from a parameter. |
| Method overriding | `toString()` | Controls the text printed for a ticket object. |
| Arrays | `prices`, `CharSeats`, `NumberSeats`, and `movies` | Store fixed sets of choices. |
| Random bounds | `random.nextInt(array.length)` | Produces an index that fits the selected array. |
| `Arrays.asList` and `contains` | Movie-title condition | Checks whether the entered string matches an allowed title. |
| String concatenation | `CharSeatsSelected + NumberSeatsSelected` | Combines the seat letter and number into one label. |

## 8. Example execution

The seat and price are random, so their values can differ between runs. One possible interaction is:

```text
Movie is wrinting your name:
Maya Chen
Now you need write the movie you wanna watch:
The Maze Runner

Name:Maya Chen
 Movie:The Maze Runner
 Seat:B4
 Ticket Price:25,00$
```

The example shows the structure of the ticket output. The actual prompts include the decorative borders printed by the source, and the selected seat and price are not predictable in advance.

## 9. Limitations and common mistakes

- The movie title must match an array entry exactly, including capitalization and spelling.
- An unrecognized title causes the ticket loop to be skipped; there is no invalid-title message or retry prompt.
- The `while` loop ends with `break`, so this version creates at most one ticket per program run.
- Seat letters and numbers are selected independently. The program does not keep a record of occupied seats or prevent the same seat from being selected in another run.
- Prices are strings, not numeric values, so the program cannot calculate totals or apply discounts to them.
- Input is not validated for blank customer names or unexpected end-of-input.

## 10. Practice and extensions

1. Add a message for a title that is not present in the `movies` array.
2. Let the customer choose another movie after receiving a ticket.
3. Store prices as numeric values and format them only when displaying the ticket.
4. Add a collection of occupied seats and avoid selecting a seat that is already reserved.
5. Rename the nested class to `Ticket` and update its constructor call consistently.

## 11. Summary and source

`MoviesSystem` combines arrays, random indexes, exact string membership checks, a nested class, a constructor, and an overridden `toString()` method. The central data-flow idea is to collect input, select values from fixed arrays, place the values in one ticket object, and print that object's text representation.

Source: [`MoviesSystem.java`](../Intermediate/MoviesSystem.java).
