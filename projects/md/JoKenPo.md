# JoKenPo

## Overview

This console game lets you play Rock, Paper, Scissors against a computer. Each round compares numeric choices, reports a winner or tie, updates the win counts, and asks whether to play again.

## What you will learn

- Read integer and boolean input with `Scanner`.
- Store related text values in an array and access them by index.
- Generate a bounded random number with `Random`.
- Combine comparisons with `&&` and `||` to represent game rules.
- Repeat a round with a `do-while` loop and update counters.

## Prerequisites

You should be comfortable with variables, integer values, method calls, and basic `if`/`else` conditions. The exercise introduces arrays and a `do-while` loop in context.

## Inputs and outputs

For each round, enter `0` for Rock, `1` for Paper, or `2` for Scissors. The computer picks one of those values at random. The program displays the computer's move, announces the result, and prints the computer and user win counts. It then expects `true` to play again or `false` to stop.

The program assumes the inputs have the expected types and values. It does not validate the move number or handle invalid text.

## How the program works

1. It creates a `Scanner` for console input and a `Random` generator, then initializes both win counters to zero.
2. The `do` block asks for a move and reads an integer.
3. It creates an array containing the three move names and generates a random index for the computer's move.
4. It prints the computer's move. Equal choices are a tie; otherwise, three conditions check whether the user selected a winning combination. If none match, the computer's counter increases.
5. It asks for a boolean answer and repeats the loop only when the answer is `true`.
6. After the loop, it prints a goodbye message and closes the scanner.

## Code walkthrough

### Mapping numbers to move names

```java
String[] options = new String[3];
options[0] = "Rock";
options[1] = "Paper";
options[2] = "Scissors";
```

An array stores values of one type under numeric indexes. Here, the indexes deliberately match the numbers entered by the player. The computer's move can therefore be displayed with `options[computerChoice]`.

### Choosing for the computer

```java
int computerChoice = random.nextInt(options.length);
```

The one-argument `nextInt` returns an integer from zero up to, but not including, its argument. Since the array length is three, the result is always a valid index: `0`, `1`, or `2`.

### Checking the result and keeping score

The first condition checks for equal choices. The next condition combines the three user-winning combinations with `||`; within each combination, `&&` requires both move values to match. The matching counter is incremented with `++`. A tie increments neither counter.

### Repeating rounds

The `do-while` loop runs its body at least once. After each round, `nextBoolean()` reads either `true` or `false`; `true` starts another round. The counters are initialized before the loop, so their totals carry over between rounds.

## Example run

The computer's move is random. This sample assumes it picks Scissors when the player chooses Rock. The source does not print a newline after the score on a winning round, so the next prompt appears immediately after the score:

```text
Hello! Do you think you can beat the computer? Let's play Rock, Paper, Scissors!
Choose a number: 0 = Rock, 1 = Paper, or 2 = Scissors.
0
The computer chose: Scissors
You win!
Computer : 0 User : 1Do you wanna try again ? if yes write true , but you don´t wanna write false:false
Ok bro , cu.
```

## Important details and common mistakes

- The game does not check that the player's number is between `0` and `2`. An out-of-range integer matches no winning combination and falls through to the computer-win branch.
- Entering text where `nextInt()` or `nextBoolean()` expects a value causes an input mismatch exception; the program does not catch it.
- The move array is rebuilt on every round even though its contents stay the same.
- The score uses `%s` to print integer counters. Java formats them here, although `%d` would more clearly describe integer values.
- The score output has inconsistent newline behavior: the user-win `printf` has no newline, while the other branches include one.
- Comparing `option == true` and `option == false` works, but the boolean can be tested directly. The guide describes the existing code rather than changing it.

## Try it yourself

1. Add validation so only `0`, `1`, or `2` can be used as a move.
2. Print the player's move as well as the computer's move.
3. Print a final summary showing who won more rounds, or whether the match was tied.
4. Move the array initialization outside the loop and make all score lines end consistently.

## Source

[JoKenPo.java](../Beginner/JoKenPo.java)
