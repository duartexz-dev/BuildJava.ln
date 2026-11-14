# JoKenPo (Rock, Paper, Scissors)

## 1. Overview

This console game lets a person play Rock, Paper, Scissors against a randomly chosen computer move. It reports each round, tracks wins for both sides, and repeats when the player enters `true`.

## 2. Learning goals

You will practice:

- Reading numbers and booleans with `Scanner`.
- Storing related choices in an array and using indexes.
- Generating a random valid array index.
- Combining comparisons with `&&` and `||`.
- Repeating a round with a `do-while` loop and updating score counters.

## 3. Prerequisites

You should understand variables, `if`/`else`, and basic comparisons. An **array** stores a fixed number of values of one type. An **index** is an item's position; Java indexes start at zero.

## 4. Project and file structure

The standalone `JoKenPo` class is in the default package in [`JoKenPo.java`](../Beginner/JoKenPo.java). It imports `Random` for the computer's choice and `Scanner` for keyboard input. No other project class is required.

## 5. Program execution

The program initializes the input reader, random-number generator, and two score counters. It then enters a `do-while`: read the player's number, create the three move names, choose and display a random move, decide the round, update a winner's score if applicable, and ask whether to play again. When the answer is `false`, the loop ends, a farewell is printed, and the scanner closes.

## 6. Complete code walkthrough

1. The two imports make `Random` and `Scanner` available.
2. `main` creates a scanner for `System.in` and a `Random` generator. `boolean option` will hold the replay answer.
3. `winsComputer` and `winsUser` start at zero. They are **counters**: each winner's counter increases by one.
4. The `do` block starts before its condition is checked, so at least one round always runs.
5. `nextInt()` reads the player's choice. The prompt defines `0` as Rock, `1` as Paper, and `2` as Scissors.
6. Each round creates `String[] options = new String[3]` and assigns the three labels to indexes `0`, `1`, and `2`. The array is recreated every round even though its contents never change.
7. `random.nextInt(options.length)` returns an integer from zero up to, but not including, the array length. With length three, it can safely index any of the three choices.
8. `options[computerChoice]` retrieves the move at that index and is joined with the message using string concatenation (`+`).
9. If the two numbers are equal, the round is a tie. Neither score changes.
10. Otherwise, the `else if` checks the three winning combinations for the player. `&&` requires both parts of one combination to be true; `||` accepts any one of the three combinations. `winsUser++` adds one.
11. If neither tie nor player win matched, the final `else` awards a point to the computer. This assumes the player's input is valid; see the limitations below.
12. Each result branch prints the current score. `%s` in `printf` displays the integer counter as text. The branches use slightly different newline formatting.
13. `nextBoolean()` reads `true` or `false`. The loop repeats while `option == true`; this is equivalent to `while (option)`.
14. After the loop, `option` is false, so the `if (option == false)` prints the farewell. The scanner then closes.

## 7. Key Java concepts in context

- `String[]` has a fixed length, while each position can be read with `[index]`.
- `Random.nextInt(bound)` uses an exclusive upper bound, which makes the array length a convenient bound.
- Boolean operators combine the exact conditions that define a win.
- `do-while` is appropriate when at least one game round is required.
- `++` increments an integer by one.

## 8. Example execution

The computer's choice is random, so this is one possible round:

```text
Hello! Do you think you can beat the computer? Let's play Rock, Paper, Scissors!
Choose a number: 0 = Rock, 1 = Paper, or 2 = Scissors.
0
The computer chose: Scissors
You win!
Computer : 0 User : 1Do you wanna try again ? if yes write true , but you don´t wanna write false:
false
Ok bro , cu.
```

The user-win branch does not print a newline after the score, so the replay prompt begins on that same output line. Here, the player chose Rock (`0`) and the computer chose Scissors (`2`), so the player's score increases.

## 9. Limitations and common mistakes

- The input is not checked to ensure it is `0`, `1`, or `2`. Any other integer that is not a tie or a listed player win reaches the final `else` and incorrectly awards a point to the computer.
- Non-integer choices and non-boolean replay answers cause `Scanner` input errors.
- Ties do not change either score, and the game does not show a total number of rounds.
- The move array is rebuilt on every round even though it could be created once before the loop.
- The result messages and score lines are not formatted consistently; this does not change the game logic.

## 10. Practice and extensions

1. Test all three valid player choices and identify their winning combinations.
2. Reject a choice outside `0`–`2` before evaluating the round.
3. Move the `options` array outside the loop.
4. Add a tie counter and display it with the two win totals.

## 11. Summary and source

The game combines arrays, random numbers, boolean logic, counters, and a `do-while` loop. Validate the player's index before treating every unmatched case as a computer win.

Source: [`JoKenPo.java`](../Beginner/JoKenPo.java).
