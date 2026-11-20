# PizzaCenter

## 1. Overview

`PizzaCenter` is a console exercise that collects a customer's name and five yes/no choices: Calabresa, Frango, Mussarela, Borda, and Molho. It creates one `Pizza` object, adds it to an `ArrayList<Pizza>`, and prints the list.

The catalogue classifies this exercise as **Intermediate** because it practices object modelling, a constructor, `this`, `toString()`, and a generic `ArrayList`. The source remains in `projects/Advanced/` and keeps `package Advanced;`; folder and package names do not determine catalogue difficulty.

## 2. Learning goals

- Declare a static nested class and create an object from it.
- Store object state in fields and initialize it with a constructor.
- Use `this` to refer to the object being initialized.
- Override `toString()` to define an object's text representation.
- Use an `ArrayList` whose element type is a custom class.
- Read boolean and text input with `Scanner`.

## 3. Prerequisites

You should know variables, `String`, boolean values, console input/output, and basic class/object syntax. Familiarity with constructors and `ArrayList` is useful.

## 4. Project and file structure

The source is [`PizzaCenter.java`](../Advanced/PizzaCenter.java), in the `Advanced` package. The outer public class is `PizzaCenter`; it contains the public static nested class `Pizza`.

`Pizza` declares five `Boolean` fields (`Molho`, `Borda`, `Mussarela`, `Calabresa`, and `Frango`) and one `String` field (`Name`). Its constructor receives those values, and the class overrides `toString()`.

The `main` method is declared **inside the nested `Pizza` class**, not directly in `PizzaCenter`. The launch class is therefore `Advanced.PizzaCenter$Pizza`, not `Advanced.PizzaCenter`.

## 5. Program execution

1. Java starts the `main` method inside `PizzaCenter.Pizza`.
2. The program creates a `Scanner` and an empty `ArrayList<Pizza>` named `Pedidos`.
3. It prints a welcome banner and asks about Calabresa, Frango, Mussarela, Borda, and Molho. Each answer is read with `nextBoolean()`.
4. It asks for the customer's name. The first `nextLine()` consumes the line break left by the final `nextBoolean()`; the next reads the name.
5. `new Pizza(...)` creates the object. Arguments are passed in this order: Molho, Borda, Mussarela, Frango, Name, and Calabresa.
6. `Pedidos.add(Pizza)` stores the object in the list.
7. `System.out.println(Pedidos)` prints the collection, using the stored object's `toString()`.
8. The scanner is closed.

The current execution creates one order. The list can hold several `Pizza` objects, but the program does not repeat the ordering process.

## 6. Complete code walkthrough

### 6.1 Package and imports

`package Advanced;` places the classes in the `Advanced` package. `Scanner` reads console input, and `ArrayList` provides a resizable collection.

### 6.2 Outer and nested classes

`public class PizzaCenter` is the outer class. Its `public static class Pizza` declares the order's data type. Because the nested class is static, it can be used from a static context without first creating a `PizzaCenter` object.

### 6.3 Pizza fields

The five `Boolean` fields represent the topping and crust choices. `Name` stores the customer's name. `Boolean` is the wrapper type for boolean values; the source uses it instead of primitive `boolean`.

### 6.4 Constructor and `this`

The `Pizza(...)` constructor receives all six values and assigns them to the matching fields. For example, `this.Molho = Molho;` assigns the parameter value to the field belonging to the new object. `this` distinguishes the field from a parameter with the same name.

### 6.5 The `toString()` method

`@Override` marks `toString()` as an implementation of the method inherited from `Object`. It returns a string containing `Name`, `Frango`, `Calabresa`, `Mussarela`, and `Borda`, with line breaks.

Although `Molho` is stored in the object, the current `toString()` does not include it in the returned text.

### 6.6 Starting the program and creating the list

The static `main` method is nested inside `Pizza`. It creates `Scanner scanner = new Scanner(System.in)` and `ArrayList<Pizza> Pedidos = new ArrayList<>()`. The generic type `<Pizza>` means the list stores `Pizza` objects.

### 6.7 Reading the choices

Each topping question is followed by `scanner.nextBoolean()`, which reads the tokens `true` or `false`. The five results remain in separate variables until the object is created.

### 6.8 Reading the name

After the final `nextBoolean()`, the input line still contains a newline. The first `nextLine()` consumes the remainder of that line; the second reads the customer's name.

### 6.9 Creating and printing the order

`new Pizza(...)` constructs an object from the six values. `Pedidos.add(Pizza)` appends it to the collection. Printing `Pedidos` uses the string representation of the collection, including the object's overridden `toString()`.

## 7. Key Java concepts in context

| Concept | Where it appears | Why it matters |
| --- | --- | --- |
| Static nested class | `PizzaCenter.Pizza` | Declares the order type inside the outer class. |
| Fields | Six `Pizza` attributes | Keeps related values in one object. |
| Constructor | `Pizza(...)` | Initializes object fields. |
| `this` | `this.Molho = Molho` | Refers to the current object. |
| Method overriding | `toString()` | Defines the object's printed representation. |
| Generics | `ArrayList<Pizza>` | Restricts the collection to pizza objects. |
| `ArrayList.add()` | `Pedidos.add(Pizza)` | Adds the new object to the list. |
| `Scanner` | `nextBoolean()`, `nextLine()` | Reads choices and the customer's name. |

## 8. Example execution

A customer could answer `true` for Calabresa and Mussarela, `false` for the other choices, and enter `Alex`. The list is printed in this general format:

```text
[Name:Alex
 Frango:false
 Calabresa:true
 Mussarela:true
 Borda:false]
```

The values depend on the answers. `Molho` is not shown because the current `toString()` does not include it.

## 9. Limitations and common mistakes

- Only one pizza is created per execution, even though the program uses an `ArrayList`.
- `Molho` is read and stored but omitted from `toString()`.
- Answers must be boolean tokens (`true` or `false`); other text is not accepted by `nextBoolean()`.
- The two `nextLine()` calls after the boolean inputs have different purposes: one consumes the pending line break, and the other reads the name.
- The source does not calculate a price, save orders, or provide a menu for editing an order.
- `main` belongs to the nested `Pizza` class. Launching `Advanced.PizzaCenter` directly will not find that method.

## 10. Practice and extensions

1. Include `Molho` in the string returned by `toString()`.
2. Allow multiple pizza orders and add each object to `Pedidos`.
3. Move the input flow into a method that returns a `Pizza`.
4. Add a method that displays a readable order summary.
5. Introduce a price field and calculate totals after defining pricing rules.

These are practice ideas, not features of the current source.

## 11. Summary and source

`PizzaCenter` practices a static nested class, object fields, a constructor, `this`, `toString()`, `Scanner`, and `ArrayList<Pizza>`. Its flow is to collect choices, construct one pizza object, store it in a list, and print that list.

Source: [`PizzaCenter.java`](../Advanced/PizzaCenter.java).
