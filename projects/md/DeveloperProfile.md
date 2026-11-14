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

## Guided code walkthrough

**Execution flow:** Ler nome e linguagem → criar o perfil → repetir a coleta de projetos → imprimir os dados e a lista.

Select a code section on the website to read its matching explanation. Each anchor is taken from the Java source and is checked by the repository tests.

### 1. Importar as classes utilizadas

**Anchor:** `import java.util.Scanner;`

Scanner cuida das entradas de texto e ArrayList guarda uma quantidade variável de projetos.

**Terms**
- `Scanner`: Ferramenta de leitura do terminal.
- `ArrayList`: Implementação de lista que pode aumentar ou diminuir de tamanho.

### 2. Declarar a classe do programa

**Anchor:** `public class DeveloperProfile {`

DeveloperProfile é a classe pública do arquivo. Dentro dela existe uma classe interna que representa os dados de um perfil.

**Terms**
- `DeveloperProfile`: Nome da classe externa, que contém main.
- `main`: Ponto de entrada da execução Java.

### 3. Criar o modelo do perfil

**Anchor:** `public static class developerProfile {`

developerProfile é uma classe aninhada estática. Ela reúne nome, linguagem favorita e lista de projetos. Em Java, nomes de classes normalmente começam com letra maiúscula; DeveloperProfile seria uma convenção mais clara para essa classe interna.

**Terms**
- `static class`: Classe aninhada que pode ser criada sem um objeto DeveloperProfile externo.
- `String`: Tipo usado para nome e linguagem.
- `ArrayList<String>`: Lista redimensionável que guarda Strings.

### 4. Inicializar o perfil com um construtor

**Anchor:** `public developerProfile(String name, String favoriteLanguage) {`

O construtor recebe o nome e a linguagem preferida. Em seguida, inicializa a lista vazia; sem essa inicialização, profile.projects seria null e a chamada add poderia causar NullPointerException.

**Terms**
- `name`: Parâmetro com o nome informado.
- `favoriteLanguage`: Parâmetro com a linguagem preferida.
- `this.name`: Campo do objeto atual.
- `new ArrayList<>()`: Cria uma lista vazia capaz de receber novos itens.

### 5. Ler os dados do usuário

**Anchor:** `public static void main(String[] args) {`

main cria um Scanner e lê o nome e a linguagem com nextLine(). A variável respost recebe a resposta textual sobre a existência de projetos; mais adiante ela controla o while.

**Terms**
- `scanner`: Leitor de entradas.
- `name`: Variável local para o nome digitado.
- `favoriteLanguage`: Variável local para a linguagem informada.
- `respost`: String usada como resposta de continuidade; o nome tem um erro de escrita, mas funciona.

### 6. Criar o objeto de perfil

**Anchor:** `developerProfile profile = new developerProfile(name, favoriteLanguage);`

new chama o construtor e passa os dois dados que foram lidos. profile passa a referenciar o objeto que contém os atributos e a lista de projetos.

**Terms**
- `profile`: Variável que referencia o perfil criado.
- `new`: Cria uma instância da classe.
- `argumentos`: Valores enviados ao construtor, na mesma ordem dos parâmetros.

### 7. Repetir enquanto a resposta for true

**Anchor:** `while (respost.equalsIgnoreCase("true")) {`

equalsIgnoreCase compara o conteúdo da String sem diferenciar maiúsculas de minúsculas. Assim, true, TRUE e True são aceitos. O laço só começa se a primeira resposta corresponder a true.

**Terms**
- `while`: Repete o bloco enquanto a condição for verdadeira.
- `equalsIgnoreCase()`: Compara textos ignorando diferenças entre maiúsculas e minúsculas.
- `respost`: A resposta é uma String, portanto a comparação é feita com equalsIgnoreCase, não com ==.

### 8. Ler e armazenar cada projeto

**Anchor:** `String nameProject = scanner.nextLine();`

nameProject recebe o nome de um projeto. profile.projects.add(nameProject) acrescenta esse texto ao final da lista existente, sem substituir os itens anteriores.

**Terms**
- `nameProject`: Variável local para o projeto informado nesta repetição.
- `profile.projects`: Acesso à lista que pertence ao objeto profile.
- `add()`: Acrescenta um elemento ao final de uma ArrayList.

### 9. Atualizar a condição do laço

**Anchor:** `respost = scanner.nextLine();`

O programa pergunta se há outro projeto e substitui respost pela nova resposta. A próxima verificação do while usa esse valor atualizado; sem essa leitura, o laço poderia repetir para sempre.

**Terms**
- `=`: Atribui a nova resposta à variável respost.
- `while`: Reavalia a condição antes de iniciar a próxima repetição.

### 10. Imprimir o perfil

**Anchor:** `scanner.close();`

Depois da coleta, o Scanner é fechado. profile.projects.size() informa quantos projetos foram adicionados; o for-each percorre a lista e imprime cada String.

**Terms**
- `size()`: Devolve a quantidade de elementos da lista.
- `for (String project : profile.projects)`: Percorre cada item da lista e coloca o item atual na variável project.
- `FavoriteLanguage`: Campo com a linguagem favorita. Pela convenção Java, seria mais claro usar favoriteLanguage em camelCase.

