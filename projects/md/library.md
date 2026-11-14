# library

## 1. Overview

The `library` program builds a simple in-memory list of book titles. It asks for at least one title, displays the growing list, and repeats while the user answers `true`.

## 2. Learning goals

After studying this program, you should be able to:

- Create and update an `ArrayList<String>`.
- Use `do-while` when the action must happen at least once.
- Read a full line and a boolean with `Scanner`.
- Explain why a newline is consumed after `nextBoolean()`.
- Recognize a redundant condition after a loop.

## 3. Prerequisites

You should know how to declare variables, call methods, and read console input. An **ArrayList** is a list that can change size as items are added or removed.

## 4. Project and file structure

[`library.java`](../Intermediate/library.java) belongs to the `Intermediate` package. It imports `ArrayList` for the book list and `Scanner` for input. Its class name is lowercase, matching the filename but differing from the usual Java convention of capitalizing class names.

## 5. Program execution

The program creates an empty list and a scanner, then enters a `do-while` loop. Each iteration reads one title, adds it to the list, displays the current list, and reads a boolean answer. It consumes the line break left by that boolean token, then repeats only if the answer was `true`. Once the answer is `false`, the program prints the list again and closes the scanner.

## 6. Complete code walkthrough

1. The package declaration places the class in `Intermediate`; the imports provide the list and input classes.
2. `ArrayList<String> books = new ArrayList<>();` creates an empty list of strings. The `<>` lets Java infer the type argument from the declaration.
3. `new Scanner(System.in)` prepares to read console input.
4. `Boolean AddAgain = false` initializes the loop-control value. `Boolean` is the object wrapper for primitive `boolean`; the variable name uses an uppercase initial, which is unusual for a local variable.
5. The `do` block starts before its condition is tested, guaranteeing that at least one book title is requested.
6. `scanner.nextLine()` reads the complete title line. `books.add(nameBook)` appends that title to the end of the list.
7. `printf("Current library: %s\n", books)` displays the list. When an `ArrayList` is formatted with `%s`, its string representation shows the elements in brackets.
8. `scanner.nextBoolean()` reads a `true` or `false` token. It does not consume the rest of the line, so `scanner.nextLine()` consumes the pending line break before the next iteration tries to read another title.
9. `while (AddAgain == true)` repeats when the answer is true. Comparing a `Boolean` with a primitive boolean unboxes the wrapper. A primitive `boolean` and `while (AddAgain)` would be simpler here.
10. After the loop, `if (AddAgain == false)` prints the list a second time. Since the loop exits only when the condition is false, this check is redundant for normal input.
11. `scanner.close()` closes the scanner and its underlying input stream.

## 7. Key Java concepts in context

- `ArrayList.add()` appends one element; the list's `size()` grows automatically.
- `do-while` checks the condition after running the body, which guarantees one entry.
- `nextLine()` reads spaces within a title. `nextBoolean()` reads one boolean token.
- Mixing token input and line input requires attention to the remaining newline.
- Wrapper `Boolean` can represent `null`, unlike primitive `boolean`, although this program initializes it to a non-null value.

## 8. Example execution

```text
Hello, user. Add a book by typing its title below.
Book title: The Hobbit
Current library: [The Hobbit]
Would you like to add another? (Type true for yes or false for no.)

true
Hello, user. Add a book by typing its title below.
Book title: Dune
Current library: [The Hobbit, Dune]
Would you like to add another? (Type true for yes or false for no.)

false
Current library: [The Hobbit, Dune]
```

The final list is printed once inside the final iteration and again after the loop, so it appears twice when the user answers `false`.

## 9. Limitations and common mistakes

- The list exists only while the program runs; there is no file or database storage.
- An empty title is accepted.
- Any response other than a valid boolean token causes an input-mismatch exception.
- The final `if` is always true after a normal loop exit and can be removed without changing that behavior.
- `Boolean` can be replaced with primitive `boolean` for this use.

## 10. Practice and extensions

1. Add two books and compare how the list is displayed after each insertion.
2. Remove the redundant final condition and preserve one final list display.
3. Reject blank titles.
4. Add a menu option to search for or remove a title.

## 11. Summary and source

This exercise uses an `ArrayList`, line input, boolean input, and a `do-while` loop. Its key input detail is consuming the line break after `nextBoolean()` before the next title is read.

Source: [`library.java`](../Intermediate/library.java).

## Guided code walkthrough

**Execution flow:** Criar a lista → ler um título → adicionar → perguntar se continua → imprimir o estado final.

Select a code section on the website to read its matching explanation. Each anchor is taken from the Java source and is checked by the repository tests.

### 1. Declarar o pacote

**Anchor:** `package Intermediate;`

O pacote Intermediate agrupa a classe library junto dos outros exercícios intermediários.

**Terms**
- `package`: Identifica o pacote ao qual a classe pertence.

### 2. Importar ArrayList e Scanner

**Anchor:** `import java.util.ArrayList;`

ArrayList guarda a coleção de títulos, enquanto Scanner recebe as respostas digitadas no terminal.

**Terms**
- `ArrayList`: Lista dinâmica que permite adicionar e remover elementos.
- `Scanner`: Classe de leitura de dados.

### 3. Definir a classe e o método main

**Anchor:** `public class library {`

library é a classe pública deste arquivo. O código executável está concentrado em main, que organiza o ciclo de entrada.

**Terms**
- `public`: Modificador de acesso.
- `static`: Permite chamar main sem criar um objeto library.
- `void`: O método não retorna um valor.

### 4. Criar uma lista de livros

**Anchor:** `ArrayList<String> books = new ArrayList<>();`

books é uma ArrayList que só aceita elementos String. O operador new cria a lista vazia. Ela poderá crescer conforme novos títulos forem adicionados.

**Terms**
- `ArrayList<String>`: Tipo da lista: cada elemento armazenado é uma String.
- `books`: Nome da variável que referencia a coleção de títulos.
- `<String>`: Parâmetro de tipo (generics): define o tipo dos elementos da lista.
- `new ArrayList<>()`: Cria uma lista vazia; o tipo é inferido a partir do lado esquerdo.

### 5. Criar o leitor e a variável de controle

**Anchor:** `Scanner scanner = new Scanner(System.in);`

scanner recebe a entrada do terminal. AddAgain começa como false, mas o do-while executará a primeira rodada antes de verificar seu valor.

**Terms**
- `scanner`: Objeto que lê os títulos e a resposta de continuidade.
- `Boolean`: Classe wrapper de boolean; para um simples estado lógico, boolean primitivo costuma ser a opção mais direta.
- `AddAgain`: Variável que controla se o ciclo de cadastro deve repetir.

### 6. Executar a coleta pelo menos uma vez

**Anchor:** `do {`

O bloco do é executado antes da condição. Isso faz sentido aqui: o programa deve pedir pelo menos um título, mesmo que AddAgain comece como false.

**Terms**
- `do-while`: Laço cuja condição é verificada depois da execução do bloco.
- `scanner.nextLine()`: Lê o título completo, incluindo espaços.

### 7. Guardar e adicionar o título

**Anchor:** `String nameBook = scanner.nextLine();`

nameBook recebe o texto informado. books.add(nameBook) adiciona esse título ao final da coleção; a lista permanece disponível para as próximas repetições.

**Terms**
- `nameBook`: Variável local que guarda o título digitado nesta rodada.
- `add()`: Acrescenta um elemento à lista.
- `books`: Referência à mesma lista durante todo o programa.

### 8. Ler a decisão de continuar

**Anchor:** `AddAgain = scanner.nextBoolean();`

nextBoolean() espera true ou false. A chamada a nextLine() logo depois consome o Enter que ficou pendente, para que a próxima leitura do título não receba uma linha vazia.

**Terms**
- `nextBoolean()`: Lê um token booleano.
- `nextLine()`: Consome o restante da linha após nextBoolean().
- `AddAgain`: Recebe a decisão que será testada no final do do-while.

### 9. Decidir se o ciclo recomeça

**Anchor:** `} while (AddAgain == true);`

O laço repete quando AddAgain é true. Como a variável já é boolean, a condição poderia ser escrita apenas while (AddAgain), sem comparar explicitamente com true.

**Terms**
- `== true`: Comparação explícita com o valor true; é redundante para um boolean.
- `do-while`: Volta ao início somente depois de avaliar a condição.

### 10. Mostrar o estado final e fechar

**Anchor:** `if (AddAgain == false) {`

Quando AddAgain é false, o if imprime a biblioteca mais uma vez. Essa checagem também poderia ser escrita como if (!AddAgain). scanner.close() encerra a leitura.

**Terms**
- `if`: Executa o bloco quando a condição é verdadeira.
- `!AddAgain`: Forma mais direta de testar se AddAgain é false.
- `close()`: Fecha o Scanner.

