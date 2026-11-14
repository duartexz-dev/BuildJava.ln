# WeekDay

## 1. Overview

`WeekDay` reads an integer and prints the corresponding day name for values from 1 through 7. It demonstrates a multi-branch `switch` and a `default` case for unmatched numbers.

## 2. Learning goals

You will learn to:

- Read an integer with `Scanner`.
- Route one value to one of several `switch` cases.
- Use `break` to leave a traditional switch case.
- Provide a fallback with `default`.

## 3. Prerequisites

You should know how to declare an integer and call a method. A **branch** is a path the program may take depending on a value or condition.

## 4. Project and file structure

The class is in the default package in [`WeekDay.java`](../Beginner/WeekDay.java). It imports `Scanner` and has one `main` method; it uses no other project classes.

## 5. Program execution

The program creates a scanner, prints a prompt, reads one integer, and compares it with the numbered cases. Values 1–7 print a weekday. Any other integer prints an invalid-number message. The scanner is then closed.

## 6. Complete code walkthrough

1. The import makes `Scanner` available.
2. `public class WeekDay` declares the public class; its name matches the source filename.
3. `main` is the program entry point.
4. `new Scanner(System.in)` prepares to read keyboard input.
5. The prompt explains that the program expects a number from 1 to 7.
6. `scanner.nextInt()` reads one integer token into `number`. Non-integer input causes an input-mismatch exception.
7. `switch (number)` checks the value. Each `case` label is an exact integer alternative: `1` prints Monday, `2` Tuesday, continuing through `7` Sunday.
8. Each `break` exits the switch after printing its day. Without a `break` in a traditional switch, execution could continue into following case bodies.
9. `default` handles any integer not matched by a case, including values below 1 or above 7. Its `break` ends the switch.
10. `scanner.close()` closes the input reader.

The source comments summarize the case selection and fallback; they do not change behavior.

## 7. Key Java concepts in context

- A traditional `switch` is useful when one expression must be compared with several exact values.
- `case` labels name possible values; `default` is the fallback.
- `break` exits this switch. It does not end the whole Java program.
- `nextInt()` expects numeric input and does not perform range validation.

## 8. Example execution

```text
Enter a number from 1 to 7 to find the corresponding day of the week:
3
Wednesday
```

An input of `9` instead prints:

```text
You entered an invalid number.
```

## 9. Limitations and common mistakes

- The mapping is fixed to start with Monday as `1`; it does not depend on a locale or calendar setting.
- The program handles out-of-range integers, but not text or decimal input.
- `break` prevents fall-through to the next case; it is not what chooses the matching case.
- The program reads only one number and then exits.

## 10. Practice and extensions

1. Try the boundary values `1`, `7`, `0`, and `8`.
2. Add a message that explains the accepted range when input is invalid.
3. Rewrite the selection with an `if`/`else if` chain and compare the two structures.
4. Add a loop so the user can request more than one day before exiting.

## 11. Summary and source

`WeekDay` maps integer cases to text with `switch`. Its `default` branch handles integer values that are not valid weekday numbers.

Source: [`WeekDay.java`](../Beginner/WeekDay.java).

## Guided code walkthrough

**Execution flow:** Ler o número → comparar com os casos do switch → exibir o dia ou uma mensagem de erro.

Select a code section on the website to read its matching explanation. Each anchor is taken from the Java source and is checked by the repository tests.

### 1. Importar a ferramenta de entrada

**Anchor:** `import java.util.Scanner;`

Scanner será usado para ler o número digitado no terminal. O import evita escrever o nome completo java.util.Scanner toda vez.

**Terms**
- `import`: Disponibiliza uma classe de outro pacote neste arquivo.
- `Scanner`: Classe que lê dados da entrada padrão, como o teclado.

### 2. Criar a classe e o main

**Anchor:** `public class WeekDay {`

WeekDay é a classe pública deste arquivo. A execução começa em main, que recebe os argumentos de inicialização e não devolve um valor.

**Terms**
- `class`: Define uma estrutura que agrupa métodos e, quando necessário, dados.
- `static`: Permite que o Java execute main sem instanciar WeekDay.
- `void`: Indica ausência de valor de retorno.
- `args`: Array de Strings que poderia receber argumentos do terminal.

### 3. Criar o leitor

**Anchor:** `Scanner scanner = new Scanner(System.in);`

A variável scanner guarda o objeto que recebe os dados. new cria o objeto Scanner conectado a System.in.

**Terms**
- `scanner`: Nome da variável que representa o leitor.
- `new`: Cria uma instância de uma classe.
- `System.in`: Entrada padrão, normalmente o teclado.

### 4. Guardar a escolha numérica

**Anchor:** `int number = scanner.nextInt();`

nextInt() lê o próximo número inteiro e o resultado é atribuído à variável number. O programa espera um valor entre 1 e 7, mas ainda não valida esse intervalo antes do switch.

**Terms**
- `int`: Tipo para números inteiros.
- `number`: Variável local que guarda o número digitado.
- `nextInt()`: Lê o próximo token como inteiro.

### 5. Selecionar um caso

**Anchor:** `switch (number) {`

switch compara o valor de number com os valores escritos em cada case. É útil quando existem várias alternativas exatas para a mesma variável.

**Terms**
- `switch`: Estrutura de seleção que escolhe um dos caminhos disponíveis.
- `case`: Define um valor que pode corresponder ao valor avaliado.
- `break`: Encerra o switch atual; sem ele, a execução poderia continuar pelo próximo caso.

### 6. Associar os números aos dias

**Anchor:** `case 1:`

Cada case representa um número. Quando number vale 1, o programa imprime Monday; quando vale 2, imprime Tuesday, e assim por diante. O break impede que os próximos dias também sejam impressos.

**Terms**
- `case 1:`: Ramo executado quando number é igual a 1.
- `System.out.println()`: Exibe a mensagem e pula para a próxima linha.
- `break;`: Sai do switch depois de mostrar o dia escolhido.

### 7. Tratar valores inesperados

**Anchor:** `default:`

default funciona como o caminho alternativo: é executado quando nenhum case corresponde ao número. Neste exercício, isso inclui 0, 8 e outros valores fora de 1 a 7.

**Terms**
- `default`: Bloco executado quando nenhum case corresponde ao valor analisado.
- `fallback`: Nome comum para um comportamento alternativo quando as opções esperadas não se aplicam.

### 8. Fechar o recurso

**Anchor:** `scanner.close();`

Como o programa já terminou de ler a entrada, fecha o Scanner. Em aplicações maiores, é importante pensar em quem é responsável por fechar cada recurso compartilhado.

**Terms**
- `close()`: Fecha o Scanner e sua fonte de entrada.

