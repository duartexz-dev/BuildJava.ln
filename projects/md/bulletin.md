# bulletin

## 1. Overview

This program collects a student's name and grades in four subjects, calculates the arithmetic mean, and prints whether that mean reaches 60. The source file and outer class are both named `bulletin` with a lowercase initial.

## 2. Learning goals

You will learn to:

- Define a class with fields and a constructor.
- Create an object and pass values to its constructor.
- Add numeric values and calculate an average.
- Compare the average with a threshold.
- Use a conditional expression to choose a result message.

## 3. Prerequisites

You should understand variables, method calls, numeric input, and `if`-style comparisons. A **field** is a variable that belongs to an object. A **constructor** initializes a new object.

## 4. Project and file structure

[`bulletin.java`](../Intermediate/bulletin.java) is in the `Intermediate` package. The outer class contains a nested `public static` class named `Student`. The nested class groups a name and four grades; the outer class gathers input and calculates the result.

## 5. Program execution

The program reads a name and four decimal grade values, creates a `Student`, sets a passing threshold of `60.00`, adds the four grades, divides by four, and prints a pass or fail message based on the average.

## 6. Complete code walkthrough

1. `package Intermediate;` declares the package. `Scanner` is imported to read keyboard input.
2. `public class bulletin` declares the outer program class. Its lowercase name matches the filename, although Java convention normally uses `Bulletin`.
3. `public static class Student` defines a nested class. `static` lets `main` construct it without first creating a `bulletin` object.
4. The `Student` fields hold the student's name and four grades. They have package-private access because no access modifier is written. Each grade uses the wrapper type `Double`.
5. The constructor accepts all five values. Each `this.field = parameter` assignment stores a parameter in the new object; `this` refers to that object.
6. `main` creates a `Scanner`, reads the name with `nextLine()`, and reads each grade with `nextDouble()`. The initial prompt requests values from 10 to 100, but the program does not enforce that range.
7. `new Student(...)` creates an object and passes the collected values to the constructor.
8. `final Double passingGradeThreshold = 60.00` creates a threshold that cannot be reassigned. The sum reads the four object fields. During addition, each `Double` is automatically converted to a primitive numeric value (unboxed).
9. `averageGrade = totalGrades / 4` divides the sum by the number of subjects. Because the operands are `Double` and `int`, the calculation uses floating-point arithmetic.
10. `averageGrade >= passingGradeThreshold` produces a boolean. The ternary expression chooses the congratulations message when it is true, and the fail message otherwise.
11. `System.out.println(result)` displays the selected message; `scanner.close()` closes input.

## 7. Key Java concepts in context

- The `Student` object groups related data. Its constructor ensures all five values are supplied when it is created.
- `Double` is an object wrapper for the primitive `double`; arithmetic automatically unboxes it here. For simple numeric calculations, primitive `double` is commonly preferred.
- `final` prevents reassignment of the threshold variable.
- `>=` includes equality, so an average of exactly 60 passes.
- The ternary operator selects one expression based on a boolean condition.

## 8. Example execution

```text
Hello! Please enter your name. Grades must be between 10 and 100:Jordan Lee
Please enter your grade in Portuguese:80
Please enter your grade in Math:70
Please enter your grade in English:90
Please enter your grade in History:60
Congratulations! Your average grade is 75.0
```

The values total 300, and dividing by four gives an average of 75.

## 9. Limitations and common mistakes

- The prompt says grades must be from 10 to 100, but there is no range validation. Negative or unusually large values are still included.
- The student name is stored in the object but is not included in the output.
- Non-numeric grade input causes an input-mismatch exception.
- The calculation assumes exactly four subjects; adding or removing a subject also requires changing the divisor.
- This is a simple arithmetic mean; it does not use weighted grades or a grading policy beyond the fixed threshold.

## 10. Practice and extensions

1. Test averages below, equal to, and above 60.
2. Add validation that each grade is between 10 and 100.
3. Include the student's name and average in a more readable report.
4. Extract the average calculation into a method on `Student`.

## 11. Summary and source

The exercise combines object construction and numeric calculation. The average is compared with an inclusive threshold of 60, but the stated grade range is not validated by the program.

Source: [`bulletin.java`](../Intermediate/bulletin.java).

## Guided code walkthrough

**Execution flow:** Declarar Student → ler nome e notas → criar o objeto → calcular a média → comparar com a nota mínima.

Select a code section on the website to read its matching explanation. Each anchor is taken from the Java source and is checked by the repository tests.

### 1. Localizar a classe no pacote

**Anchor:** `package Intermediate;`

A declaração package organiza bulletin dentro do pacote Intermediate. O nome do pacote também aparece no caminho do arquivo.

**Terms**
- `package`: Declara a qual pacote esta classe pertence.

### 2. Importar Scanner

**Anchor:** `import java.util.Scanner;`

Scanner será utilizado para ler o nome e as quatro notas digitadas pelo usuário.

**Terms**
- `Scanner`: Classe de leitura de dados do terminal.

### 3. Declarar a classe principal

**Anchor:** `public class bulletin {`

bulletin é a classe pública do arquivo. Dentro dela existe outra classe, Student, que descreve os dados de um estudante.

**Terms**
- `public class`: Declara uma classe com acesso público.
- `Student`: Classe interna que modela um estudante.

### 4. Definir os atributos do estudante

**Anchor:** `String name;`

Os campos guardam informações que pertencem ao mesmo estudante. Em vez de espalhar quatro notas pelo programa, elas ficam reunidas no objeto Student.

**Terms**
- `name`: Nome do estudante.
- `portugueseGrade / mathGrade / englishGrade / historyGrade`: Campos que armazenam as notas de cada disciplina.
- `Double`: Classe wrapper para valores decimais; double é o tipo primitivo equivalente.

### 5. Construir um objeto Student

**Anchor:** `public Student(String name, Double portugueseGrade, Double mathGrade, Double englishGrade,`

O construtor tem o mesmo nome da classe e não declara tipo de retorno. Cada parâmetro recebe um dado; this aponta para o objeto atual, permitindo diferenciar o campo do parâmetro que tem o mesmo nome.

**Terms**
- `Student(...)`: Construtor chamado quando usamos new Student(...).
- `parâmetros`: Valores recebidos pelo construtor para inicializar o objeto.
- `this.name`: Campo name pertencente ao objeto atual.
- `name`: Parâmetro recebido pelo construtor.

### 6. Iniciar a execução e receber as notas

**Anchor:** `public static void main(String[] args) {`

main cria o Scanner, mostra as perguntas e lê cada resposta. O nome é lido com nextLine(); as notas são lidas com nextDouble(), porque podem ter casas decimais.

**Terms**
- `scanner`: Leitor usado para todas as entradas.
- `nextLine()`: Lê o nome completo até Enter.
- `nextDouble()`: Lê uma nota como valor decimal.

### 7. Criar e guardar o objeto

**Anchor:** `Student student = new Student(name, portugueseGrade, mathGrade, englishGrade, historyGrade);`

new chama o construtor de Student e passa os cinco dados na ordem esperada. A variável student guarda a referência ao objeto criado, e seus campos podem ser acessados com o ponto.

**Terms**
- `new`: Cria uma instância da classe.
- `student`: Variável que referencia o objeto Student.
- `.`: Operador de acesso a membros, como student.mathGrade.

### 8. Definir a média mínima e calcular

**Anchor:** `final Double passingGradeThreshold = 60.00;`

passingGradeThreshold guarda a nota mínima e final impede sua reatribuição. totalGrades soma os quatro campos do objeto; averageGrade divide o total por quatro.

**Terms**
- `final`: Torna a referência/variável não reatribuível depois da inicialização.
- `passingGradeThreshold`: Valor usado como limite para aprovação: 60.00.
- `totalGrades`: Soma das quatro notas do estudante.
- `averageGrade`: Média aritmética: soma dividida por quatro.

### 9. Decidir se o estudante passou

**Anchor:** `boolean passed = averageGrade >= passingGradeThreshold;`

>= compara a média com o limite. O resultado dessa comparação é boolean: true quando a média é maior ou igual a 60, e false nos outros casos.

**Terms**
- `boolean passed`: Variável que guarda o resultado da comparação.
- `>=`: Maior ou igual.

### 10. Escolher e imprimir a mensagem

**Anchor:** `String result = passed`

O operador ternário escolhe a mensagem conforme passed. A concatenação com + junta o texto da mensagem ao valor de averageGrade.

**Terms**
- `?`: Se a condição antes do ? for verdadeira, escolhe o primeiro resultado.
- `:`: Se a condição for falsa, escolhe o resultado depois dos dois-pontos.
- `+`: Com String, concatena textos e valores convertidos para texto.

### 11. Encerrar o Scanner

**Anchor:** `scanner.close();`

Depois de imprimir o resultado, o programa fecha o Scanner. Apesar do texto pedir notas entre 10 e 100, o código atual não valida essa faixa; essa é uma melhoria possível.

**Terms**
- `close()`: Fecha o leitor de entrada.
- `Validação`: Seria necessário conferir cada nota antes de calcular a média.

