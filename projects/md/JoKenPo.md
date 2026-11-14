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

## Guided code walkthrough

**Execution flow:** Preparar opções e placar → iniciar rodada → comparar escolhas → atualizar pontos → perguntar se haverá outra rodada.

Select a code section on the website to read its matching explanation. Each anchor is taken from the Java source and is checked by the repository tests.

### 1. Importar as ferramentas

**Anchor:** `import java.util.Random;`

O programa precisa de duas classes: Random para escolher uma opção do computador e Scanner para ler a opção da pessoa.

**Terms**
- `Random`: Classe que fornece valores pseudoaleatórios.
- `Scanner`: Classe que recebe a escolha digitada no terminal.

### 2. Definir a classe principal

**Anchor:** `public class JoKenPo {`

JoKenPo agrupa o programa. A execução começa em main, que prepara os objetos e controla as rodadas.

**Terms**
- `main`: Método de entrada usado pelo lançador Java.
- `void`: Indica que main não retorna um valor.

### 3. Preparar entrada e aleatoriedade

**Anchor:** `Scanner scanner = new Scanner(System.in);`

scanner lê o que o usuário digita; random gera a escolha do computador. A variável option guarda se a pessoa quer jogar novamente.

**Terms**
- `scanner`: Objeto responsável pela leitura do teclado.
- `random`: Objeto que gera números pseudoaleatórios.
- `boolean option`: Variável de controle: true repete o jogo e false encerra.

### 4. Inicializar o placar

**Anchor:** `int winsComputer = 0;`

As duas variáveis começam em zero porque nenhuma rodada foi decidida. Elas permanecem fora do do-while para que o placar não seja reiniciado a cada rodada.

**Terms**
- `winsComputer`: Quantidade de vitórias do computador.
- `winsUser`: Quantidade de vitórias da pessoa.
- `++`: Incrementa uma variável em uma unidade.

### 5. Garantir ao menos uma rodada

**Anchor:** `do {`

do-while executa o bloco primeiro e só depois verifica a condição. Por isso, a pessoa sempre joga uma rodada antes de decidir se quer continuar.

**Terms**
- `do`: Inicia o bloco que será executado pelo menos uma vez.
- `while`: Testa a condição de repetição no fim do bloco.

### 6. Ler a escolha da pessoa

**Anchor:** `int userSelect = scanner.nextInt();`

userSelect recebe o número digitado: 0 para Rock, 1 para Paper e 2 para Scissors. O programa não valida esse intervalo: um número fora de 0 a 2 não acessa o array, mas acaba caindo no else e sendo contado incorretamente como vitória do computador.

**Terms**
- `userSelect`: Variável que representa a opção escolhida pela pessoa.
- `nextInt()`: Lê o próximo token como inteiro.
- `0, 1 e 2`: Índices usados para representar as três opções.

### 7. Relacionar índices e opções

**Anchor:** `String[] options = new String[3];`

options é um array de Strings com três posições. A posição 0 guarda Rock, a 1 guarda Paper e a 2 guarda Scissors. O índice é a ligação entre o número digitado e o nome exibido.

**Terms**
- `String[]`: Declara um array que armazena valores do tipo String.
- `new String[3]`: Cria espaço para três referências a textos.
- `options[0]`: Acessa a primeira posição; arrays começam no índice zero.

### 8. Sortear a opção do computador

**Anchor:** `int computerChoice = random.nextInt(options.length);`

options.length vale 3. nextInt(3) pode devolver 0, 1 ou 2; esses valores são índices válidos para o array. Assim o programa não precisa escrever três sorteios separados.

**Terms**
- `options.length`: Quantidade de posições existentes no array.
- `nextInt(bound)`: Gera um inteiro a partir de zero e menor que bound.
- `computerChoice`: Índice sorteado para representar a escolha do computador.

### 9. Verificar empate

**Anchor:** `if (userSelect == computerChoice) {`

O operador == compara os dois inteiros. Quando os índices são iguais, os dois jogadores escolheram a mesma opção e o programa não aumenta nenhum placar.

**Terms**
- `if`: Executa o bloco somente quando a condição é verdadeira.
- `==`: Compara igualdade entre valores primitivos.
- `winsUser / winsComputer`: O placar é exibido, mas permanece igual em caso de empate.

### 10. Reconhecer as três vitórias da pessoa

**Anchor:** `} else if ((userSelect == 0 && computerChoice == 2)`

O else if verifica as três combinações vencedoras: pedra vence tesoura, papel vence pedra e tesoura vence papel. && exige que as duas comparações de uma combinação sejam verdadeiras; || permite que qualquer uma das três combinações vença.

**Terms**
- `else if`: Testa uma condição alternativa quando o if anterior não foi verdadeiro.
- `&&`: E lógico: os dois lados precisam ser verdadeiros.
- `||`: OU lógico: basta uma combinação completa ser verdadeira.
- `winsUser++`: Soma um ponto às vitórias da pessoa.

### 11. Tratar a vitória do computador

**Anchor:** `} else {`

Se não houve empate nem uma das três combinações vencedoras da pessoa, o computador venceu. O programa incrementa winsComputer e mostra o placar atualizado.

**Terms**
- `else`: Executa quando as condições anteriores falham.
- `winsComputer++`: Incrementa o placar do computador.

### 12. Perguntar se haverá outra rodada

**Anchor:** `option = scanner.nextBoolean();`

nextBoolean() lê true ou false e guarda a resposta em option. O do-while volta ao início somente quando option é true.

**Terms**
- `option`: Estado que controla a repetição do jogo.
- `nextBoolean()`: Lê um valor booleano; não aceita respostas livres como sim ou não.
- `while (option == true)`: Testa se a pessoa escolheu continuar. Em Java, também seria possível escrever apenas while (option).

### 13. Encerrar o programa

**Anchor:** `scanner.close();`

Depois que a condição do do-while fica falsa, o código chega ao fim e fecha o Scanner. Uma melhoria possível seria validar userSelect antes de usar esse número como índice.

**Terms**
- `close()`: Fecha o recurso de entrada.
- `Validação`: Conferir se o número recebido está entre 0 e 2 antes de acessar options.

