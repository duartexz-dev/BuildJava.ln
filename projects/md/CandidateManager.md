# CandidateManager

## Overview

**CandidateManager** is a command-line program for managing a list of candidate names. It supports adding, listing, searching, removing, and counting entries. The exercise uses an ArrayList and separates menu actions into small methods.

## Learning goals

- Store and update a resizable collection with ArrayList<String>.
- Organize a program with methods, parameters, and return values.
- Use switch to route menu choices.
- Traverse a collection and convert a one-based menu position into a zero-based index.
- Validate numeric input and reject positions outside the current list size.
- Keep resources scoped with try-with-resources.

## Prerequisites

You should understand variables, loops, conditionals, methods, Scanner, and basic collections.

## Program structure

The source file is projects/Intermediate/CandidateManager.java and belongs to the Intermediate package.

The program starts with twenty sample names. Its main method controls the menu loop, while supporting methods each handle one responsibility:

| Method | Responsibility |
| --- | --- |
| showMenu() | Prints the available actions. |
| readInt() | Reads an integer and rejects non-numeric input. |
| readName() | Reads and trims a full name. |
| addCandidate() | Validates and adds a name. |
| listCandidates() | Displays the current list with one-based positions. |
| searchCandidate() | Finds an exact full-name match. |
| removeCandidate() | Validates a position before removing an item. |

## Execution flow

1. main creates an ArrayList<String> from the sample names.
2. A while loop displays the menu until the user chooses option 0.
3. readInt() reads each menu choice. If the input is not an integer, the method consumes the invalid line and asks again.
4. switch calls the method associated with options 1–5.
5. Option 4 first checks whether the list is empty, then displays its current contents and asks for a one-based position.
6. A removal is accepted only when the selected position is between 1 and candidates.size(). The program subtracts one before calling remove().
7. Choosing option 0 ends the loop. The Scanner is closed automatically by try-with-resources.

## Important Java concepts

- **Methods:** menu actions are separated instead of placing every operation inside main.
- **Collections:** ArrayList<String> stores an ordered list whose size can change.
- **Index conversion:** people choose positions starting at 1, while Java list indexes start at 0.
- **Input validation:** hasNextInt() checks the next token before it is read as an integer.
- **Early return:** methods stop after handling empty lists or invalid values, avoiding unnecessary nested conditionals.
- **Resource management:** try-with-resources closes the scanner when the program exits the block.

## Example interaction

After removing the twentieth candidate, the list contains nineteen entries. Choosing position 20 again is rejected because the program checks the current list size, not the original sample count.

## Limitations

- Candidate names are stored only while the program is running. They are not saved to a file or database.
- Search is exact and case-sensitive; Ana Silva and ana silva are treated as different strings.
- The initial list is sample data rather than a real candidate database.
- The program validates integer input and list positions, but it does not validate menu values beyond the available options.

## Practice extensions

1. Make search case-insensitive with equalsIgnoreCase().
2. Prevent duplicate candidate names.
3. Add an edit operation.
4. Persist the list in a text or CSV file.

## Source

[CandidateManager.java](../Intermediate/CandidateManager.java)

## Guided code walkthrough

**Execution flow:** Montar a lista inicial → mostrar menu → ler uma opção → chamar o método correspondente → repetir até escolher sair.

Select a code section on the website to read its matching explanation. Each anchor is taken from the Java source and checked by repository tests.

### 1. Organizar a classe no pacote

**Anchor:** `package Intermediate;`

A classe pertence ao pacote Intermediate. O arquivo está dentro da pasta correspondente à declaração package.

**Terms**
- `package`: Declara o pacote da classe.

### 2. Importar as coleções e a entrada

**Anchor:** `import java.util.ArrayList;`

O projeto combina List, ArrayList e Arrays para preparar os dados iniciais e gerenciar a coleção. Scanner cuida da entrada do usuário.

**Terms**
- `List`: Interface que define operações comuns de uma lista.
- `ArrayList`: Implementação de List baseada em array redimensionável.
- `Arrays`: Classe utilitária com métodos para trabalhar com arrays, incluindo asList().
- `Scanner`: Classe que lê opções e nomes digitados.

### 3. Declarar a classe principal

**Anchor:** `public class CandidateManager {`

CandidateManager representa o programa de gerenciamento. O método main coordena a aplicação e os métodos auxiliares dividem as responsabilidades.

**Terms**
- `CandidateManager`: Nome da classe que corresponde ao arquivo CandidateManager.java.
- `métodos auxiliares`: Funções declaradas na classe para separar tarefas específicas.

### 4. Criar a lista inicial de candidatos

**Anchor:** `List<String> candidates = new ArrayList<>(Arrays.asList(`

A variável candidates é declarada pela interface List, mas recebe uma implementação ArrayList. Arrays.asList prepara os nomes iniciais; o construtor de ArrayList cria uma cópia redimensionável que permite adicionar e remover candidatos.

**Terms**
- `List<String>`: Referência a uma lista cujos elementos são Strings.
- `candidates`: Coleção que guarda os nomes de todos os candidatos.
- `Arrays.asList(...)`: Cria uma lista baseada nos valores fornecidos.
- `new ArrayList<>(...)`: Copia os elementos para uma lista que pode mudar de tamanho.

### 5. Abrir o Scanner com fechamento automático

**Anchor:** `try (Scanner scanner = new Scanner(System.in)) {`

try-with-resources cria o Scanner no cabeçalho do try. Quando o bloco termina, Java chama close() automaticamente, inclusive se uma exceção interromper o fluxo.

**Terms**
- `try-with-resources`: Estrutura que gerencia automaticamente o fechamento de recursos.
- `scanner`: Leitor usado pelos métodos de entrada.

### 6. Manter o menu em execução

**Anchor:** `boolean running = true;`

running começa true para permitir que o menu apareça. Quando a pessoa escolhe a opção 0, o programa muda essa variável para false e o while termina.

**Terms**
- `running`: Estado que controla a continuidade do programa.
- `while (running)`: Repete enquanto running for true.

### 7. Repetir o menu e ler a opção

**Anchor:** `while (running) {`

Em cada volta, showMenu() apresenta as opções e readInt() lê um número. Depois, switch encaminha a execução para a tarefa correspondente.

**Terms**
- `showMenu()`: Chamada de método: executa o método responsável por imprimir o menu.
- `readInt(scanner, ...)`: Passa o Scanner e uma mensagem para o método de leitura.
- `parâmetros`: Variáveis declaradas na assinatura do método que recebem os argumentos enviados na chamada.

### 8. Direcionar cada opção do menu

**Anchor:** `switch (option) {`

Cada case chama um método específico. A opção 5 usa candidates.size() para contar registros, e a opção 0 altera running para encerrar o laço. break sai do switch, não do método main nem do while.

**Terms**
- `case 1–4`: Chamam os métodos de adicionar, listar, pesquisar e remover.
- `size()`: Devolve a quantidade atual de elementos da lista.
- `break`: Encerra o switch atual; não encerra o while externo.
- `running = false`: Faz a condição do while ficar falsa na próxima verificação.

### 9. Separar o desenho do menu

**Anchor:** `private static void showMenu() {`

showMenu não recebe parâmetros e não devolve valor. void significa que sua responsabilidade é executar uma ação: imprimir as opções.

**Terms**
- `private`: O método só pode ser acessado diretamente de dentro da classe CandidateManager.
- `static`: Pode ser chamado pela classe sem criar um objeto CandidateManager.
- `void`: Não existe valor de retorno.
- `showMenu()`: Nome do método; os parênteses indicam a chamada sem argumentos.

### 10. Ler um inteiro e devolvê-lo

**Anchor:** `private static int readInt(Scanner scanner, String prompt) {`

readInt recebe dois parâmetros: o leitor e a mensagem que deve aparecer. O while(true) tenta novamente até receber um inteiro válido. Quando consegue, return value devolve o inteiro e encerra somente este método.

**Terms**
- `int`: Tipo de retorno: quem chamar readInt receberá um inteiro.
- `Scanner scanner`: Parâmetro que recebe o leitor usado para capturar a resposta.
- `String prompt`: Parâmetro com o texto que será exibido antes da leitura.
- `hasNextInt()`: Verifica se o próximo token pode ser interpretado como inteiro sem consumi-lo.
- `return value`: Devolve o valor ao ponto da chamada e encerra readInt.

### 11. Entender o laço de validação

**Anchor:** `while (true) {`

while(true) é um laço sem condição de parada própria. Neste método, ele termina quando o caminho válido executa return. Se a entrada não for inteira, nextLine() descarta o token inválido e a repetição começa de novo.

**Terms**
- `while (true)`: Repete continuamente até que um return, break ou outra saída encerre o fluxo.
- `hasNextInt()`: Permite validar a entrada antes de chamar nextInt().
- `scanner.nextLine()`: Consome a entrada inválida para evitar que ela seja testada infinitamente.

### 12. Reutilizar a leitura de nomes

**Anchor:** `private static String readName(Scanner scanner, String prompt) {`

readName recebe um Scanner e uma mensagem, imprime o prompt, lê a linha e devolve o texto sem espaços extras no começo ou no fim. trim() não apaga os espaços entre palavras.

**Terms**
- `String`: Tipo de retorno: o método devolve texto.
- `trim()`: Remove espaços em branco das extremidades da String.
- `return`: Entrega o texto tratado a quem chamou o método.

### 13. Adicionar um candidato

**Anchor:** `private static void addCandidate(List<String> candidates, Scanner scanner) {`

O método recebe a lista existente e o Scanner. Se o nome estiver vazio, return; encerra antecipadamente o método void. Caso contrário, add() inclui o nome na lista.

**Terms**
- `List<String> candidates`: Parâmetro que referencia a lista compartilhada; não é uma nova lista.
- `String name`: Variável local com o nome já lido e tratado.
- `isEmpty()`: Verifica se a String não possui caracteres.
- `return;`: Sai do método void sem devolver um valor.
- `candidates.add(name)`: Modifica a lista recebida, acrescentando um novo elemento.

### 14. Percorrer e listar os candidatos

**Anchor:** `private static void listCandidates(List<String> candidates) {`

Primeiro o método verifica se a lista está vazia. Caso haja dados, um for percorre os índices de zero até size() - 1. O programa mostra index + 1 porque a interface apresenta posições começando em 1, embora a ArrayList comece em 0.

**Terms**
- `candidates.isEmpty()`: Verifica se a coleção não contém elementos.
- `for`: Repetição controlada por inicialização, condição e atualização.
- `index`: Índice atual da posição que será lida.
- `get(index)`: Obtém o elemento armazenado naquele índice.
- `index + 1`: Converte o índice interno para a numeração apresentada à pessoa.

### 15. Pesquisar pelo nome

**Anchor:** `private static void searchCandidate(List<String> candidates, Scanner scanner) {`

indexOf(name) procura a primeira ocorrência do nome e devolve sua posição. Se não encontrar, devolve -1. O return; evita executar a mensagem de sucesso quando a busca falha.

**Terms**
- `indexOf()`: Procura um elemento na lista e devolve seu índice, ou -1 quando não encontra.
- `index`: Armazena a posição encontrada.
- `-1`: Valor sentinela usado por indexOf para representar ausência.
- `return;`: Encerra o método antes da mensagem de sucesso.

### 16. Validar e remover um candidato

**Anchor:** `private static void removeCandidate(List<String> candidates, Scanner scanner) {`

O método impede remoções quando a lista está vazia, mostra os candidatos e lê a posição escolhida. A validação compara o número digitado com 1 e com o tamanho atual da lista antes de acessar qualquer posição.

**Terms**
- `candidateNumber`: Número apresentado ao usuário, começando em 1.
- `candidates.size()`: Quantidade atual de candidatos; muda quando a lista é modificada.
- `candidateNumber - 1`: Converte a posição humana para o índice da ArrayList, que começa em zero.
- `candidates.remove(...)`: Remove a posição informada e devolve o elemento removido.
- `removedCandidate`: Variável que guarda o nome devolvido por remove para exibir a confirmação.

