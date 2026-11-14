# Calculator

## 1. Overview

This console program reads two whole numbers and an operator, then performs one arithmetic operation. It is a small example of combining keyboard input, integer arithmetic, and `switch` selection.

## 2. Learning goals

After studying this program, you should be able to:

- Read integers and a word-like token with `Scanner`.
- Store and use values with Java's `int` type.
- Choose behavior with a `switch` statement.
- Format values with `printf`.
- Explain integer division and why dividing by zero is an error.

## 3. Prerequisites

You should know how to run a Java class with a `main` method, declare variables, and print text. An **operator** is a symbol that performs an operation, such as `+` for addition.

## 4. Project and file structure

The program is in the default package in [`Calculator.java`](../Beginner/Calculator.java). It imports `java.util.Scanner` to read console input. The file contains one public class, `Calculator`, and its `main` method; it does not depend on other project classes.

## 5. Program execution

Java starts at `main`. The program creates a scanner, asks for two integers, displays the supported choices, reads one operator token, and runs the matching `switch` case. An unsupported token produces an error message. The scanner is closed before the program ends.

## 6. Complete code walkthrough

1. `import java.util.Scanner;` makes the `Scanner` class available by its short name.
2. `public class Calculator` declares the class. Its name matches the filename, as required for a public Java class.
3. `public static void main(String[] args)` is the entry point. `public` makes it callable by the Java launcher, `static` means it belongs to the class, and `void` means it returns no value.
4. `new Scanner(System.in)` creates a reader for keyboard input.
5. Each `System.out.println` displays a prompt. `nextInt()` reads the next integer token into `number1` or `number2`. If the input is not an integer, `Scanner` throws an input-mismatch exception.
6. `var sign = scanner.next();` reads the operator as a token. Java infers that `sign` is a `String`; `var` does not mean the value has no type. Local-variable type inference with `var` is available starting with Java 10.
7. `switch (sign)` compares the string with each `case`. The `+`, `-`, and `/` cases use the corresponding integer operators. The `"x"` case is the user's multiplication choice, but the calculation itself uses `*`.
8. Each case prints a formatted expression. In `printf`, `%d` is an integer placeholder and `%n` starts a platform-appropriate new line. `break` exits the switch so another case does not run.
9. Integer division in `/` discards the fractional part: for example, `7 / 2` produces `3`.
10. `default` runs when no case matches, and its `break` ends the switch.
11. `scanner.close()` releases the scanner and closes `System.in`. This is suitable for this standalone program.

The comments beside `var` and `switch` explain those choices in the source; they do not execute.

## 7. Key Java concepts in context

- **Local variables** such as `number1` exist while `main` runs.
- **Type inference with `var`** lets the compiler infer `String` from `scanner.next()`. The type remains fixed.
- **Switch selection** is useful when one value has several exact alternatives.
- **Integer arithmetic** keeps the result an integer. It does not automatically produce a decimal quotient.
- **Formatted output** combines explanatory text and calculated values in one line.

## 8. Example execution

One possible run:

```text
Enter the first number:
7
Enter the second number:
2
---------------------
| Choose an operator|
|       + - / x     |
|
---------------------
Enter an operator on the next line:
/
Result: 7 / 2 = 3
```

The displayed quotient is `3`, not `3.5`, because both operands are integers. The calculation is deterministic: the same inputs produce the same result.

## 9. Limitations and common mistakes

- Division by zero is not handled. Entering `/` with a second number of `0` causes `ArithmeticException`.
- Only the exact tokens `+`, `-`, `/`, and lowercase `x` are accepted. `*` is not accepted as input.
- The program does not repeat the calculation or validate malformed numeric input.
- Very large results can overflow the range of `int`.
- Changing the division to decimal arithmetic would require a suitable type such as `double`; merely printing an `int` with another format does not restore a fractional part.

## 10. Practice and extensions

1. Try each supported operator and predict the result before running the program.
2. Add a `"*"` case as an additional multiplication choice.
3. Add a zero check before division and print a clear message instead of dividing by zero.
4. Experiment with `double` input and explain how decimal division differs from integer division.

## 11. Summary and source

This exercise practices console input, `int`, arithmetic, `switch`, and formatted output. Its main subtlety is that integer division truncates the fractional part.

Source: [`Calculator.java`](../Beginner/Calculator.java).

## Guided code walkthrough

**Execution flow:** Ler os operandos → ler o símbolo → escolher a operação → mostrar o resultado ou avisar que o símbolo não é aceito.

Select a code section on the website to read its matching explanation. Each anchor is taken from the Java source and is checked by the repository tests.

### 1. Preparar a entrada

**Anchor:** `import java.util.Scanner;`

Scanner permite receber os dois números e o operador digitados pela pessoa.

**Terms**
- `java.util.Scanner`: Classe da biblioteca padrão usada para ler dados.

### 2. Definir a classe e o ponto de partida

**Anchor:** `public class Calculator {`

Calculator é a classe pública. O Java começa a executar o programa pelo método main.

**Terms**
- `public`: Permite acesso a partir de outras partes do programa e ao lançador Java.
- `static`: Permite chamar main diretamente pela classe.
- `void`: O método não devolve um resultado para quem o chamou.
- `String[] args`: Recebe argumentos opcionais enviados ao iniciar o programa.

### 3. Criar o leitor de dados

**Anchor:** `Scanner scanner = new Scanner(System.in);`

new cria um Scanner conectado à entrada padrão. A variável scanner permite reutilizar esse mesmo leitor em várias linhas.

**Terms**
- `Scanner`: Tipo do objeto que lê a entrada.
- `scanner`: Nome da variável que guarda a referência ao leitor.
- `System.in`: Entrada padrão, geralmente o teclado.

### 4. Ler os dois operandos

**Anchor:** `int number1 = scanner.nextInt();`

Cada nextInt() lê um inteiro e armazena o resultado em uma variável diferente. number1 e number2 são os operandos: os valores sobre os quais a operação será feita.

**Terms**
- `number1`: Primeiro número informado.
- `number2`: Segundo número informado.
- `int`: Tipo inteiro. A divisão entre dois int também produz um resultado inteiro.

### 5. Ler o operador escolhido

**Anchor:** `var sign = scanner.next();`

next() lê um token de texto, como +, - ou /. A palavra-chave var deixa o compilador inferir o tipo: como next() devolve String, sign é uma String. O tipo não fica dinâmico nem muda depois.

**Terms**
- `var`: Inferência de tipo para variável local; o compilador descobre o tipo na inicialização.
- `sign`: Variável que guarda o símbolo da operação.
- `next()`: Lê o próximo token, parando em espaços em branco.

### 6. Escolher a operação

**Anchor:** `switch (sign) {`

O switch verifica o conteúdo de sign. Cada case implementa uma operação diferente. O símbolo x é apenas a opção mostrada à pessoa; a multiplicação real é feita pelo operador *.

**Terms**
- `switch`: Seleciona um bloco com base no valor de uma expressão.
- `case "+":`: Executa a soma quando sign contém +.
- `break`: Sai do switch após executar o caso escolhido.

### 7. Entender a divisão inteira

**Anchor:** `case "/":`

Como os dois valores são int, number1 / number2 descarta a parte decimal. Por exemplo, 7 / 2 resulta em 3. Se o segundo número for zero, Java lança ArithmeticException; o código atual não trata esse caso.

**Terms**
- `/`: Operador de divisão. O tipo dos operandos influencia o tipo do resultado.
- `%d`: Marcador do printf para imprimir um inteiro.
- `%n`: Quebra de linha independente do sistema operacional.

### 8. Criar um caminho para operador inválido

**Anchor:** `default:`

default será executado quando o símbolo não for +, -, / ou x. Esse ramo evita que uma entrada desconhecida seja tratada silenciosamente como uma operação válida.

**Terms**
- `default`: Caso alternativo de um switch.
- `break`: Encerra o switch; aqui é o último ramo, mas mantém a estrutura explícita.

### 9. Finalizar a leitura

**Anchor:** `scanner.close();`

O programa encerra o Scanner depois da operação. Este exercício realiza apenas um cálculo; para repetir, seria necessário adicionar um laço ao redor da leitura e do switch.

**Terms**
- `close()`: Fecha o Scanner e a entrada associada.

