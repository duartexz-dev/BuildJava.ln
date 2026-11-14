# Vehicle

## Overview

**Vehicle** is a console exercise that collects five values and stores them in a VehicleInfo object. It demonstrates how a class groups related data and how an object can provide its own readable text representation.

## Learning goals

- Model a real-world item with a class.
- Declare private attributes and initialize them with a constructor.
- Use this to refer to the current object.
- Create an instance with new.
- Override toString() to control how an object is represented as text.
- Read numeric and text values with Scanner.

## Structure

The source is projects/Intermediate/Vehicle.java and belongs to the Intermediate package.

It contains two classes:

- **Vehicle** owns the main method and runs the console interaction.
- **VehicleInfo** represents one vehicle and stores its name, brand, color, horsepower, and year.

The five attributes in VehicleInfo are private final. This means they can be assigned by the constructor but cannot be reassigned afterward.

## Execution flow

1. Scanner reads the year.
2. nextLine() consumes the remaining line break before the program reads the vehicle name.
3. The program reads horsepower, consumes that line break, then reads the brand and color.
4. new VehicleInfo(...) constructs an object with all five values.
5. System.out.println(vehicle) asks Java to convert the object to text. The overridden toString() method returns a formatted description.

## Key concepts in context

| Concept | Example | Purpose |
| --- | --- | --- |
| Class | VehicleInfo | Defines the structure of vehicle data. |
| Private attributes | private final String name | Keeps the data inside the object and prevents reassignment. |
| Constructor | VehicleInfo(...) | Initializes all attributes. |
| this | this.name = name | Distinguishes the field from the constructor parameter. |
| Object creation | new VehicleInfo(...) | Creates an instance. |
| Method override | toString() | Defines the object's readable text representation. |

## Example output

The program prints the vehicle name, year, horsepower, brand, and color as a formatted summary.

## Limitations

- The program does not validate year or horsepower ranges.
- Invalid numeric input causes Scanner to throw an input-mismatch exception.
- The data object is created and printed, but it is not stored between program runs.

## Practice extensions

1. Reject negative horsepower and unrealistic year values.
2. Create a second VehicleInfo object and compare the years.
3. Add a method that identifies whether a vehicle is newer than another.
4. Move VehicleInfo into its own Java file.

## Source

[Vehicle.java](../Intermediate/Vehicle.java)

## Guided code walkthrough

**Execution flow:** Declarar VehicleInfo → receber os dados → construir o objeto → transformar o objeto em texto com toString().

Select a code section on the website to read its matching explanation. Each anchor is taken from the Java source and is checked by the repository tests.

### 1. Declarar o pacote

**Anchor:** `package Intermediate;`

A classe pertence ao pacote Intermediate, que organiza os exercícios de nível intermediário.

**Terms**
- `package`: Declara o pacote da classe.

### 2. Importar a leitura do teclado

**Anchor:** `import java.util.Scanner;`

Scanner recebe os dados que serão usados para preencher o objeto do veículo.

**Terms**
- `Scanner`: Classe que lê valores da entrada padrão.

### 3. Criar a classe externa

**Anchor:** `public class Vehicle {`

Vehicle é a classe pública do arquivo. Ela contém uma classe interna chamada VehicleInfo e o método main que coordena a execução.

**Terms**
- `classe externa`: Classe declarada no nível principal do arquivo.
- `VehicleInfo`: Classe interna que representa os dados de um veículo.

### 4. Modelar o objeto VehicleInfo

**Anchor:** `public static class VehicleInfo {`

VehicleInfo é uma classe estática aninhada: pode ser usada a partir de Vehicle sem precisar de uma instância externa. Ela agrupa os atributos que descrevem um veículo.

**Terms**
- `static class`: Classe aninhada que não depende de uma instância de Vehicle para ser criada.
- `atributos`: Campos que guardam o estado de cada objeto.

### 5. Proteger os atributos

**Anchor:** `private final String name;`

private restringe o acesso direto aos campos a partir de outras classes. final impede a troca do valor depois que ele for inicializado no construtor.

**Terms**
- `private`: Modificador de acesso que oculta o campo de código externo à classe.
- `final`: Exige que o campo seja inicializado e não permite reatribuição posterior.
- `name / brand / color`: Atributos de texto para nome, marca e cor.
- `horsepower / year`: Atributos inteiros para potência e ano.

### 6. Receber os valores no construtor

**Anchor:** `public VehicleInfo(String name, String brand, String color, int horsepower, int year) {`

Quando main usa new VehicleInfo(...), o construtor recebe cinco argumentos na ordem definida. Cada linha this.campo = parâmetro copia o valor recebido para o atributo do objeto.

**Terms**
- `VehicleInfo(...)`: Construtor: cria o estado inicial do novo objeto.
- `parâmetros`: Valores fornecidos na chamada do construtor.
- `this`: Referência ao objeto que está sendo construído.

### 7. Personalizar a representação em texto

**Anchor:** `@Override`

@Override indica que toString() está sobrescrevendo um método herdado de Object. Isso permite decidir como o objeto deve aparecer quando é convertido para texto.

**Terms**
- `@Override`: Anotação que pede ao compilador para verificar se o método realmente sobrescreve outro.
- `toString()`: Método que devolve uma representação textual do objeto.
- `String.format()`: Monta um texto com espaços reservados como %s, %d e %n.
- `return`: Devolve a String construída e encerra a execução do método toString.

### 8. Começar a leitura dos dados

**Anchor:** `public static void main(String[] args) {`

main é o ponto de entrada. O Scanner aparece dentro de try-with-resources: ao sair do bloco, Java fecha o recurso automaticamente, mesmo se ocorrer uma exceção.

**Terms**
- `try (...)`: Estrutura try-with-resources: fecha automaticamente recursos que implementam AutoCloseable.
- `Scanner scanner`: Objeto que recebe as entradas do teclado.

### 9. Ler os campos do veículo

**Anchor:** `int year = scanner.nextInt();`

O programa lê ano e potência como inteiros e nome, marca e cor como Strings. Depois de nextInt(), chama nextLine() para consumir a quebra de linha que ficou na entrada antes de ler um texto.

**Terms**
- `year`: Variável local para o ano do veículo.
- `horsepower`: Variável local para a potência em cavalos.
- `nextInt()`: Lê um inteiro, mas deixa o Enter pendente na entrada.
- `nextLine()`: Consome o restante da linha; aqui evita que a próxima leitura de texto receba uma linha vazia.

### 10. Instanciar e imprimir o veículo

**Anchor:** `VehicleInfo vehicle = new VehicleInfo(name, brand, color, horsepower, year);`

A ordem dos argumentos deve corresponder à ordem dos parâmetros do construtor. Ao executar println(vehicle), Java chama toString() automaticamente para obter o texto do objeto.

**Terms**
- `new VehicleInfo(...)`: Cria um objeto e executa seu construtor.
- `vehicle`: Variável que guarda a referência ao objeto criado.
- `println(vehicle)`: Imprime a representação textual produzida por toString().

