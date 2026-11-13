# DeveloperProfile

## 1. Overview

This program asks for a developer's name, favorite programming language, and zero or more project names. It stores the project names in an `ArrayList` and prints a profile summary.

## 2. Learning goals

You will practice:

- Declaring a nested class and creating an object.
- Initializing an `ArrayList` in a constructor.
- Repeating input while a string represents `true`.
- Comparing text without regard to letter case.
- Printing a collection with an enhanced `for` loop.

## 3. Prerequisites

You should understand variables, constructors, and loops. A **class** describes a kind of object; an **object** is a value created from that class. A **collection** stores multiple values.

## 4. Project and file structure

[`DeveloperProfile.java`](../Intermediate/DeveloperProfile.java) belongs to the `Intermediate` package. It imports `Scanner` and `ArrayList`. Inside the outer `DeveloperProfile` class is a `public static` nested class named `developerProfile`; the unusual lowercase class name is the one actually used by this source.

## 5. Program execution

`main` reads a name, favorite language, and a text answer. It constructs a profile object, then asks for project names as long as the answer equals `"true"` ignoring capitalization. Finally, it closes input and prints the name, stored project count and names, and the favorite language.

## 6. Complete code walkthrough

1. `package Intermediate;` identifies the package. The imports make `Scanner` and `ArrayList` available.
2. `public class DeveloperProfile` declares the outer class that contains `main`.
3. `public static class developerProfile` declares a nested class. `static` means an instance of the nested class does not need an instance of the outer class.
4. Its fields store a name, favorite language, and project list. They have package-private access because no access modifier is written. `FavoriteLanguage` uses an uppercase initial, which is not the usual Java field naming style.
5. The constructor accepts a name and a favorite language. It assigns them with `this.name` and `this.FavoriteLanguage`, where `this` refers to the object being initialized. It also creates an empty `ArrayList<String>` for projects.
6. `main` creates a scanner and reads the name and favorite language with `nextLine()`, so both can contain spaces.
7. The `respost` variable stores the yes/no answer as a `String`, not a `boolean`. `equalsIgnoreCase("true")` compares the text without distinguishing uppercase and lowercase.
8. `new developerProfile(name, favoriteLanguage)` creates the profile. While the answer is `"true"`, the program reads one project name, appends it with `profile.projects.add(nameProject)`, then reads the next answer.
9. Any answer other than a case-insensitive `"true"` stops the loop. There is no separate check that the answer was exactly `false`.
10. The semicolon immediately after the while block is an empty statement and has no effect.
11. `scanner.close()` runs before the output section. No more keyboard input is needed after that point.
12. The summary prints the local `name`, then `profile.projects.size()`, then each project with an enhanced `for` loop. The loop assigns each list element to `project` in turn.
13. The final line prints `profile.FavoriteLanguage`. Although the constructor also stores the name in `profile.name`, the output uses the local `name` variable instead.

## 7. Key Java concepts in context

- A **constructor** runs when `new developerProfile(...)` creates an object.
- `this.field` distinguishes an object's field from a constructor parameter with the same name.
- `ArrayList<String>` can grow as project names are added.
- `equalsIgnoreCase()` compares string contents without case sensitivity; `==` would not be the right way to compare string contents.
- An enhanced `for` loop visits each element without managing an index.

## 8. Example execution

```text
Hello user , enter your name:
Maya Chen
Now enter your favorite programming laguage
Java
if you have a project , write true , but you no have write false:
true
So , say a your project name :
Study Planner
if you have another project , write true , but you no have write false:
false

================================
       YOUR DEVELOPER PROFILE
================================
name:Maya Chen
Projects[1]:
 - Study Planner
Favorite Language : Java
```

The program's prompts contain spelling and grammar choices shown as written in the source.

## 9. Limitations and common mistakes

- Only the text `true`, in any letter case, continues the loop. Other answers silently stop it.
- An empty project name is accepted.
- The nested class and fields use naming/access conventions that would usually be improved in a larger application, but changing them is not required to understand this program.
- The `profile.name` field is stored but not used in the printed summary; the local variable is printed instead.
- There is no option to edit or remove a project after it is added.

## 10. Practice and extensions

1. Try `TRUE` and `yes` as the continuation answer and compare their behavior.
2. Change the response variable to a `boolean` and use `nextBoolean()`.
3. Print the stored `profile.name` to see the object's name field being used.
4. Add a project count or a way to remove a project.

## 11. Summary and source

The exercise models profile data with a nested class and stores a variable number of projects in an `ArrayList`. Its loop is controlled by a string comparison, so only `"true"` (ignoring case) continues.

Source: [`DeveloperProfile.java`](../Intermediate/DeveloperProfile.java).
