export const codeNotes = {
  TypeProfile: {
    purpose: "Ler dados de tipos diferentes e montar um pequeno perfil no console.",
    flow: "Entrada de texto → leitura de números e booleano → extração de um caractere → resumo formatado.",
    sections: [
      {
        anchor: "import java.util.Scanner;",
        title: "1. Importar Scanner",
        explanation: "O import permite usar a classe Scanner pelo nome curto. Scanner é a ferramenta escolhida para receber o que a pessoa digita no terminal.",
        items: [
          { term: "import", meaning: "Traz uma classe de outro pacote para que ela possa ser usada neste arquivo." },
          { term: "java.util.Scanner", meaning: "Classe da biblioteca padrão do Java que lê dados de uma entrada, como o teclado." }
        ]
      },
      {
        anchor: "public class TypeProfile {",
        title: "2. Declarar a classe e o ponto de entrada",
        explanation: "A classe agrupa o código do programa. O método main é o ponto de partida: quando executamos esta classe, o Java começa por ele.",
        items: [
          { term: "public", meaning: "Modificador de acesso: permite que a classe ou método seja acessado de fora." },
          { term: "static", meaning: "Permite chamar main pela classe, sem criar antes um objeto TypeProfile." },
          { term: "void", meaning: "Indica que main não devolve um valor ao terminar." },
          { term: "String[] args", meaning: "Recebe argumentos de texto enviados na inicialização do programa; este exercício não os utiliza." }
        ]
      },
      {
        anchor: "Scanner scanner = new Scanner(System.in);",
        title: "3. Preparar a leitura do teclado",
        explanation: "Criamos um objeto Scanner e guardamos sua referência na variável scanner. System.in representa a entrada padrão, normalmente o teclado do terminal.",
        items: [
          { term: "Scanner", meaning: "Tipo da variável: informa que scanner poderá chamar os métodos de leitura dessa classe." },
          { term: "scanner", meaning: "Nome escolhido para a variável. Poderia ter outro nome, desde que fosse usado de forma consistente." },
          { term: "new", meaning: "Cria um novo objeto na memória." },
          { term: "System.in", meaning: "Origem dos dados que o Scanner vai ler." }
        ]
      },
      {
        anchor: "String name = scanner.nextLine();",
        title: "4. Ler um texto completo",
        explanation: "A variável name recebe o texto digitado até a pessoa pressionar Enter. nextLine() é adequado para nomes com espaços, como “Ana Souza”.",
        items: [
          { term: "String", meaning: "Tipo usado para representar texto." },
          { term: "name", meaning: "Variável local: guarda o nome informado durante a execução de main." },
          { term: "=", meaning: "Operador de atribuição: coloca o valor lido dentro da variável." },
          { term: "nextLine()", meaning: "Lê a linha inteira, incluindo espaços entre palavras." }
        ]
      },
      {
        anchor: "int age = scanner.nextInt();",
        title: "5. Ler um número inteiro",
        explanation: "age recebe a idade como int. Esse tipo é indicado para números inteiros, sem parte decimal. nextInt() interpreta o próximo token como inteiro.",
        items: [
          { term: "int", meaning: "Tipo primitivo para números inteiros, como 14, 0 ou -3." },
          { term: "age", meaning: "Nome da variável que representa a idade." },
          { term: "nextInt()", meaning: "Lê o próximo token e tenta convertê-lo para int." }
        ]
      },
      {
        anchor: "double heightInFeet = scanner.nextDouble();",
        title: "6. Ler um valor decimal",
        explanation: "A altura pode ter parte fracionária, então o programa usa double. O nome heightInFeet também registra a unidade esperada: pés.",
        items: [
          { term: "double", meaning: "Tipo primitivo usado para números com casas decimais." },
          { term: "heightInFeet", meaning: "Variável local que guarda a altura informada em pés." },
          { term: "nextDouble()", meaning: "Lê o próximo token como número decimal; o formato aceito depende da configuração regional do Scanner." }
        ]
      },
      {
        anchor: "boolean drive = scanner.nextBoolean();",
        title: "7. Guardar uma resposta verdadeira ou falsa",
        explanation: "A variável drive recebe um boolean. Em Java, um boolean só pode assumir true ou false, por isso a pergunta pede exatamente uma dessas respostas.",
        items: [
          { term: "boolean", meaning: "Tipo lógico com apenas dois valores possíveis: true e false." },
          { term: "drive", meaning: "Variável que registra a resposta para a pergunta sobre dirigir." },
          { term: "nextBoolean()", meaning: "Lê um token booleano. Palavras como yes ou no não são aceitas por esse método." }
        ]
      },
      {
        anchor: "char firstLetter = scanner.next().charAt(0);",
        title: "8. Extrair apenas um caractere",
        explanation: "A expressão acontece em duas etapas: next() lê uma palavra (String), depois charAt(0) devolve o caractere que está na posição zero, isto é, o primeiro.",
        items: [
          { term: "char", meaning: "Tipo primitivo para um único caractere." },
          { term: "next()", meaning: "Lê um token até encontrar espaço em branco." },
          { term: "charAt(0)", meaning: "Acessa o primeiro caractere. A contagem dos índices começa em zero." },
          { term: "firstLetter", meaning: "Variável que recebe somente a primeira letra digitada, não o nome inteiro." }
        ]
      },
      {
        anchor: "System.out.printf(\"----------%s----------\\n\", name);",
        title: "9. Montar a saída formatada",
        explanation: "printf combina um texto-modelo com valores. O marcador %s é substituído pelo argumento correspondente; neste caso, pelo conteúdo de name.",
        items: [
          { term: "System.out", meaning: "Saída padrão do programa, normalmente exibida no terminal." },
          { term: "printf()", meaning: "Imprime usando marcadores de formato e argumentos." },
          { term: "%s", meaning: "Marcador para exibir um valor como texto." },
          { term: "\\n", meaning: "Insere uma quebra de linha." }
        ]
      },
      {
        anchor: "scanner.close();",
        title: "10. Encerrar o Scanner",
        explanation: "close() encerra o Scanner e também fecha a entrada que ele está lendo. Como este programa terminou de receber dados, não precisará mais do teclado.",
        items: [
          { term: "close()", meaning: "Fecha o recurso associado ao Scanner." },
          { term: ";", meaning: "Finaliza a instrução Java. Em geral, cada declaração ou chamada simples termina com ponto e vírgula." }
        ]
      }
    ]
  },
  WeekDay: {
    purpose: "Converter um número de 1 a 7 no nome do dia da semana.",
    flow: "Ler o número → comparar com os casos do switch → exibir o dia ou uma mensagem de erro.",
    sections: [
      {
        anchor: "import java.util.Scanner;",
        title: "1. Importar a ferramenta de entrada",
        explanation: "Scanner será usado para ler o número digitado no terminal. O import evita escrever o nome completo java.util.Scanner toda vez.",
        items: [
          { term: "import", meaning: "Disponibiliza uma classe de outro pacote neste arquivo." },
          { term: "Scanner", meaning: "Classe que lê dados da entrada padrão, como o teclado." }
        ]
      },
      {
        anchor: "public class WeekDay {",
        title: "2. Criar a classe e o main",
        explanation: "WeekDay é a classe pública deste arquivo. A execução começa em main, que recebe os argumentos de inicialização e não devolve um valor.",
        items: [
          { term: "class", meaning: "Define uma estrutura que agrupa métodos e, quando necessário, dados." },
          { term: "static", meaning: "Permite que o Java execute main sem instanciar WeekDay." },
          { term: "void", meaning: "Indica ausência de valor de retorno." },
          { term: "args", meaning: "Array de Strings que poderia receber argumentos do terminal." }
        ]
      },
      {
        anchor: "Scanner scanner = new Scanner(System.in);",
        title: "3. Criar o leitor",
        explanation: "A variável scanner guarda o objeto que recebe os dados. new cria o objeto Scanner conectado a System.in.",
        items: [
          { term: "scanner", meaning: "Nome da variável que representa o leitor." },
          { term: "new", meaning: "Cria uma instância de uma classe." },
          { term: "System.in", meaning: "Entrada padrão, normalmente o teclado." }
        ]
      },
      {
        anchor: "int number = scanner.nextInt();",
        title: "4. Guardar a escolha numérica",
        explanation: "nextInt() lê o próximo número inteiro e o resultado é atribuído à variável number. O programa espera um valor entre 1 e 7, mas ainda não valida esse intervalo antes do switch.",
        items: [
          { term: "int", meaning: "Tipo para números inteiros." },
          { term: "number", meaning: "Variável local que guarda o número digitado." },
          { term: "nextInt()", meaning: "Lê o próximo token como inteiro." }
        ]
      },
      {
        anchor: "switch (number) {",
        title: "5. Selecionar um caso",
        explanation: "switch compara o valor de number com os valores escritos em cada case. É útil quando existem várias alternativas exatas para a mesma variável.",
        items: [
          { term: "switch", meaning: "Estrutura de seleção que escolhe um dos caminhos disponíveis." },
          { term: "case", meaning: "Define um valor que pode corresponder ao valor avaliado." },
          { term: "break", meaning: "Encerra o switch atual; sem ele, a execução poderia continuar pelo próximo caso." }
        ]
      },
      {
        anchor: "case 1:",
        title: "6. Associar os números aos dias",
        explanation: "Cada case representa um número. Quando number vale 1, o programa imprime Monday; quando vale 2, imprime Tuesday, e assim por diante. O break impede que os próximos dias também sejam impressos.",
        items: [
          { term: "case 1:", meaning: "Ramo executado quando number é igual a 1." },
          { term: "System.out.println()", meaning: "Exibe a mensagem e pula para a próxima linha." },
          { term: "break;", meaning: "Sai do switch depois de mostrar o dia escolhido." }
        ]
      },
      {
        anchor: "default:",
        title: "7. Tratar valores inesperados",
        explanation: "default funciona como o caminho alternativo: é executado quando nenhum case corresponde ao número. Neste exercício, isso inclui 0, 8 e outros valores fora de 1 a 7.",
        items: [
          { term: "default", meaning: "Bloco executado quando nenhum case corresponde ao valor analisado." },
          { term: "fallback", meaning: "Nome comum para um comportamento alternativo quando as opções esperadas não se aplicam." }
        ]
      },
      {
        anchor: "scanner.close();",
        title: "8. Fechar o recurso",
        explanation: "Como o programa já terminou de ler a entrada, fecha o Scanner. Em aplicações maiores, é importante pensar em quem é responsável por fechar cada recurso compartilhado.",
        items: [
          { term: "close()", meaning: "Fecha o Scanner e sua fonte de entrada." }
        ]
      }
    ]
  },
  Calculator: {
    purpose: "Ler dois inteiros e um operador para realizar uma operação aritmética.",
    flow: "Ler os operandos → ler o símbolo → escolher a operação → mostrar o resultado ou avisar que o símbolo não é aceito.",
    sections: [
      {
        anchor: "import java.util.Scanner;",
        title: "1. Preparar a entrada",
        explanation: "Scanner permite receber os dois números e o operador digitados pela pessoa.",
        items: [
          { term: "java.util.Scanner", meaning: "Classe da biblioteca padrão usada para ler dados." }
        ]
      },
      {
        anchor: "public class Calculator {",
        title: "2. Definir a classe e o ponto de partida",
        explanation: "Calculator é a classe pública. O Java começa a executar o programa pelo método main.",
        items: [
          { term: "public", meaning: "Permite acesso a partir de outras partes do programa e ao lançador Java." },
          { term: "static", meaning: "Permite chamar main diretamente pela classe." },
          { term: "void", meaning: "O método não devolve um resultado para quem o chamou." },
          { term: "String[] args", meaning: "Recebe argumentos opcionais enviados ao iniciar o programa." }
        ]
      },
      {
        anchor: "Scanner scanner = new Scanner(System.in);",
        title: "3. Criar o leitor de dados",
        explanation: "new cria um Scanner conectado à entrada padrão. A variável scanner permite reutilizar esse mesmo leitor em várias linhas.",
        items: [
          { term: "Scanner", meaning: "Tipo do objeto que lê a entrada." },
          { term: "scanner", meaning: "Nome da variável que guarda a referência ao leitor." },
          { term: "System.in", meaning: "Entrada padrão, geralmente o teclado." }
        ]
      },
      {
        anchor: "int number1 = scanner.nextInt();",
        title: "4. Ler os dois operandos",
        explanation: "Cada nextInt() lê um inteiro e armazena o resultado em uma variável diferente. number1 e number2 são os operandos: os valores sobre os quais a operação será feita.",
        items: [
          { term: "number1", meaning: "Primeiro número informado." },
          { term: "number2", meaning: "Segundo número informado." },
          { term: "int", meaning: "Tipo inteiro. A divisão entre dois int também produz um resultado inteiro." }
        ]
      },
      {
        anchor: "var sign = scanner.next();",
        title: "5. Ler o operador escolhido",
        explanation: "next() lê um token de texto, como +, - ou /. A palavra-chave var deixa o compilador inferir o tipo: como next() devolve String, sign é uma String. O tipo não fica dinâmico nem muda depois.",
        items: [
          { term: "var", meaning: "Inferência de tipo para variável local; o compilador descobre o tipo na inicialização." },
          { term: "sign", meaning: "Variável que guarda o símbolo da operação." },
          { term: "next()", meaning: "Lê o próximo token, parando em espaços em branco." }
        ]
      },
      {
        anchor: "switch (sign) {",
        title: "6. Escolher a operação",
        explanation: "O switch verifica o conteúdo de sign. Cada case implementa uma operação diferente. O símbolo x é apenas a opção mostrada à pessoa; a multiplicação real é feita pelo operador *.",
        items: [
          { term: "switch", meaning: "Seleciona um bloco com base no valor de uma expressão." },
          { term: "case \"+\":", meaning: "Executa a soma quando sign contém +." },
          { term: "break", meaning: "Sai do switch após executar o caso escolhido." }
        ]
      },
      {
        anchor: "case \"/\":",
        title: "7. Entender a divisão inteira",
        explanation: "Como os dois valores são int, number1 / number2 descarta a parte decimal. Por exemplo, 7 / 2 resulta em 3. Se o segundo número for zero, Java lança ArithmeticException; o código atual não trata esse caso.",
        items: [
          { term: "/", meaning: "Operador de divisão. O tipo dos operandos influencia o tipo do resultado." },
          { term: "%d", meaning: "Marcador do printf para imprimir um inteiro." },
          { term: "%n", meaning: "Quebra de linha independente do sistema operacional." }
        ]
      },
      {
        anchor: "default:",
        title: "8. Criar um caminho para operador inválido",
        explanation: "default será executado quando o símbolo não for +, -, / ou x. Esse ramo evita que uma entrada desconhecida seja tratada silenciosamente como uma operação válida.",
        items: [
          { term: "default", meaning: "Caso alternativo de um switch." },
          { term: "break", meaning: "Encerra o switch; aqui é o último ramo, mas mantém a estrutura explícita." }
        ]
      },
      {
        anchor: "scanner.close();",
        title: "9. Finalizar a leitura",
        explanation: "O programa encerra o Scanner depois da operação. Este exercício realiza apenas um cálculo; para repetir, seria necessário adicionar um laço ao redor da leitura e do switch.",
        items: [
          { term: "close()", meaning: "Fecha o Scanner e a entrada associada." }
        ]
      }
    ]
  },
  JoKenPo: {
    purpose: "Jogar pedra, papel e tesoura contra uma escolha aleatória do computador e acompanhar os pontos.",
    flow: "Preparar opções e placar → iniciar rodada → comparar escolhas → atualizar pontos → perguntar se haverá outra rodada.",
    sections: [
      {
        anchor: "import java.util.Random;",
        title: "1. Importar as ferramentas",
        explanation: "O programa precisa de duas classes: Random para escolher uma opção do computador e Scanner para ler a opção da pessoa.",
        items: [
          { term: "Random", meaning: "Classe que fornece valores pseudoaleatórios." },
          { term: "Scanner", meaning: "Classe que recebe a escolha digitada no terminal." }
        ]
      },
      {
        anchor: "public class JoKenPo {",
        title: "2. Definir a classe principal",
        explanation: "JoKenPo agrupa o programa. A execução começa em main, que prepara os objetos e controla as rodadas.",
        items: [
          { term: "main", meaning: "Método de entrada usado pelo lançador Java." },
          { term: "void", meaning: "Indica que main não retorna um valor." }
        ]
      },
      {
        anchor: "Scanner scanner = new Scanner(System.in);",
        title: "3. Preparar entrada e aleatoriedade",
        explanation: "scanner lê o que o usuário digita; random gera a escolha do computador. A variável option guarda se a pessoa quer jogar novamente.",
        items: [
          { term: "scanner", meaning: "Objeto responsável pela leitura do teclado." },
          { term: "random", meaning: "Objeto que gera números pseudoaleatórios." },
          { term: "boolean option", meaning: "Variável de controle: true repete o jogo e false encerra." }
        ]
      },
      {
        anchor: "int winsComputer = 0;",
        title: "4. Inicializar o placar",
        explanation: "As duas variáveis começam em zero porque nenhuma rodada foi decidida. Elas permanecem fora do do-while para que o placar não seja reiniciado a cada rodada.",
        items: [
          { term: "winsComputer", meaning: "Quantidade de vitórias do computador." },
          { term: "winsUser", meaning: "Quantidade de vitórias da pessoa." },
          { term: "++", meaning: "Incrementa uma variável em uma unidade." }
        ]
      },
      {
        anchor: "do {",
        title: "5. Garantir ao menos uma rodada",
        explanation: "do-while executa o bloco primeiro e só depois verifica a condição. Por isso, a pessoa sempre joga uma rodada antes de decidir se quer continuar.",
        items: [
          { term: "do", meaning: "Inicia o bloco que será executado pelo menos uma vez." },
          { term: "while", meaning: "Testa a condição de repetição no fim do bloco." }
        ]
      },
      {
        anchor: "int userSelect = scanner.nextInt();",
        title: "6. Ler a escolha da pessoa",
        explanation: "userSelect recebe o número digitado: 0 para Rock, 1 para Paper e 2 para Scissors. O programa assume que a entrada está nesse intervalo; não verifica isso antes de acessar o array.",
        items: [
          { term: "userSelect", meaning: "Variável que representa a opção escolhida pela pessoa." },
          { term: "nextInt()", meaning: "Lê o próximo token como inteiro." },
          { term: "0, 1 e 2", meaning: "Índices usados para representar as três opções." }
        ]
      },
      {
        anchor: "String[] options = new String[3];",
        title: "7. Relacionar índices e opções",
        explanation: "options é um array de Strings com três posições. A posição 0 guarda Rock, a 1 guarda Paper e a 2 guarda Scissors. O índice é a ligação entre o número digitado e o nome exibido.",
        items: [
          { term: "String[]", meaning: "Declara um array que armazena valores do tipo String." },
          { term: "new String[3]", meaning: "Cria espaço para três referências a textos." },
          { term: "options[0]", meaning: "Acessa a primeira posição; arrays começam no índice zero." }
        ]
      },
      {
        anchor: "int computerChoice = random.nextInt(options.length);",
        title: "8. Sortear a opção do computador",
        explanation: "options.length vale 3. nextInt(3) pode devolver 0, 1 ou 2; esses valores são índices válidos para o array. Assim o programa não precisa escrever três sorteios separados.",
        items: [
          { term: "options.length", meaning: "Quantidade de posições existentes no array." },
          { term: "nextInt(bound)", meaning: "Gera um inteiro a partir de zero e menor que bound." },
          { term: "computerChoice", meaning: "Índice sorteado para representar a escolha do computador." }
        ]
      },
      {
        anchor: "if (userSelect == computerChoice) {",
        title: "9. Verificar empate",
        explanation: "O operador == compara os dois inteiros. Quando os índices são iguais, os dois jogadores escolheram a mesma opção e o programa não aumenta nenhum placar.",
        items: [
          { term: "if", meaning: "Executa o bloco somente quando a condição é verdadeira." },
          { term: "==", meaning: "Compara igualdade entre valores primitivos." },
          { term: "winsUser / winsComputer", meaning: "O placar é exibido, mas permanece igual em caso de empate." }
        ]
      },
      {
        anchor: "} else if ((userSelect == 0 && computerChoice == 2)",
        title: "10. Reconhecer as três vitórias da pessoa",
        explanation: "O else if verifica as três combinações vencedoras: pedra vence tesoura, papel vence pedra e tesoura vence papel. && exige que as duas comparações de uma combinação sejam verdadeiras; || permite que qualquer uma das três combinações vença.",
        items: [
          { term: "else if", meaning: "Testa uma condição alternativa quando o if anterior não foi verdadeiro." },
          { term: "&&", meaning: "E lógico: os dois lados precisam ser verdadeiros." },
          { term: "||", meaning: "OU lógico: basta uma combinação completa ser verdadeira." },
          { term: "winsUser++", meaning: "Soma um ponto às vitórias da pessoa." }
        ]
      },
      {
        anchor: "} else {",
        title: "11. Tratar a vitória do computador",
        explanation: "Se não houve empate nem uma das três combinações vencedoras da pessoa, o computador venceu. O programa incrementa winsComputer e mostra o placar atualizado.",
        items: [
          { term: "else", meaning: "Executa quando as condições anteriores falham." },
          { term: "winsComputer++", meaning: "Incrementa o placar do computador." }
        ]
      },
      {
        anchor: "option = scanner.nextBoolean();",
        title: "12. Perguntar se haverá outra rodada",
        explanation: "nextBoolean() lê true ou false e guarda a resposta em option. O do-while volta ao início somente quando option é true.",
        items: [
          { term: "option", meaning: "Estado que controla a repetição do jogo." },
          { term: "nextBoolean()", meaning: "Lê um valor booleano; não aceita respostas livres como sim ou não." },
          { term: "while (option == true)", meaning: "Testa se a pessoa escolheu continuar. Em Java, também seria possível escrever apenas while (option)." }
        ]
      },
      {
        anchor: "scanner.close();",
        title: "13. Encerrar o programa",
        explanation: "Depois que a condição do do-while fica falsa, o código chega ao fim e fecha o Scanner. Uma melhoria possível seria validar userSelect antes de usar esse número como índice.",
        items: [
          { term: "close()", meaning: "Fecha o recurso de entrada." },
          { term: "Validação", meaning: "Conferir se o número recebido está entre 0 e 2 antes de acessar options." }
        ]
      }
    ]
  },
  LoginIntermediary: {
    purpose: "Simular uma tentativa de login com limite de três tentativas e uma condição booleana.",
    flow: "Definir credenciais de teste → repetir enquanto houver tentativas → comparar e-mail e senha → informar o resultado.",
    sections: [
      {
        anchor: "package Intermediate;",
        title: "1. Identificar o pacote",
        explanation: "package declara que esta classe pertence ao pacote Intermediate. O caminho do arquivo acompanha esse nome para organizar os exercícios por nível.",
        items: [
          { term: "package", meaning: "Declara o pacote ao qual a classe pertence." },
          { term: "Intermediate", meaning: "Nome do pacote, usado para organizar classes relacionadas." }
        ]
      },
      {
        anchor: "import java.util.Scanner;",
        title: "2. Importar Scanner",
        explanation: "A classe Scanner será usada para receber o e-mail e a senha digitados no terminal.",
        items: [
          { term: "import", meaning: "Disponibiliza uma classe externa ao pacote atual." }
        ]
      },
      {
        anchor: "public class LoginIntermediary {",
        title: "3. Criar a classe e o método main",
        explanation: "A classe guarda o exercício. A execução começa em main; o parâmetro args está disponível para argumentos da linha de comando, mas não é utilizado aqui.",
        items: [
          { term: "public", meaning: "Modificador de acesso." },
          { term: "static", meaning: "Permite executar main sem criar um objeto LoginIntermediary." },
          { term: "void", meaning: "O método não devolve um valor." }
        ]
      },
      {
        anchor: "Scanner scanner = new Scanner(System.in);",
        title: "4. Criar o leitor e definir credenciais fixas",
        explanation: "scanner recebe os dados digitados. As duas constantes armazenam credenciais de demonstração que o programa compara com o texto informado.",
        items: [
          { term: "final", meaning: "Impede que a variável receba outra atribuição depois de inicializada." },
          { term: "CORRECT_EMAIL", meaning: "Constante de texto que representa o e-mail esperado." },
          { term: "CORRECT_PASSWORD", meaning: "Constante de texto que representa a senha esperada." },
          { term: "System.in", meaning: "Entrada padrão do terminal." }
        ]
      },
      {
        anchor: "byte attempts = 0;",
        title: "5. Preparar o contador e o estado do login",
        explanation: "attempts registra quantas tentativas já foram feitas; validLogin começa como false porque ninguém foi autenticado ainda. byte é suficiente para contar valores pequenos, embora int seja mais comum para contadores.",
        items: [
          { term: "byte", meaning: "Tipo inteiro pequeno, com faixa de -128 a 127." },
          { term: "attempts", meaning: "Contador incrementado a cada envio de credenciais." },
          { term: "validLogin", meaning: "Estado lógico que informa se as credenciais correspondem." }
        ]
      },
      {
        anchor: "while (attempts < 3 && !validLogin) {",
        title: "6. Controlar as tentativas",
        explanation: "O laço continua enquanto ainda houver menos de três tentativas e o login não for válido. O && exige que as duas condições sejam verdadeiras; ! inverte o booleano validLogin.",
        items: [
          { term: "while", meaning: "Repete o bloco enquanto a condição for verdadeira." },
          { term: "attempts < 3", meaning: "Impede uma quarta tentativa." },
          { term: "&&", meaning: "E lógico: todas as condições precisam ser verdadeiras." },
          { term: "!validLogin", meaning: "Só continua quando validLogin ainda é false." }
        ]
      },
      {
        anchor: "String email = scanner.nextLine();",
        title: "7. Ler as credenciais e contar a tentativa",
        explanation: "email e password guardam as duas linhas digitadas. attempts++ é executado depois da leitura, então cada par de credenciais enviado consome uma tentativa.",
        items: [
          { term: "email", meaning: "Variável local com o e-mail informado." },
          { term: "password", meaning: "Variável local com a senha informada." },
          { term: "nextLine()", meaning: "Lê toda a linha, o que permite que a entrada seja capturada como texto." },
          { term: "attempts++", meaning: "Incrementa o contador em um." }
        ]
      },
      {
        anchor: "validLogin = email.equals(CORRECT_EMAIL)",
        title: "8. Comparar textos e combinar condições",
        explanation: "String deve ser comparada pelo conteúdo usando equals(), não por ==. O && só torna validLogin true quando o e-mail e a senha correspondem ao mesmo tempo.",
        items: [
          { term: "equals()", meaning: "Compara o conteúdo de duas Strings." },
          { term: "==", meaning: "Em objetos, normalmente compara referências; não é a escolha correta para comparar o conteúdo de Strings." },
          { term: "&&", meaning: "Exige que a comparação do e-mail e a comparação da senha sejam verdadeiras." }
        ]
      },
      {
        anchor: "String result = validLogin",
        title: "9. Escolher a mensagem com operador ternário",
        explanation: "O operador ternário funciona como uma expressão curta de decisão. Se validLogin for true, result recebe a mensagem de sucesso; caso contrário, recebe a mensagem de falha.",
        items: [
          { term: "condição ? valor1 : valor2", meaning: "Se a condição for verdadeira, produz valor1; se for falsa, produz valor2." },
          { term: "result", meaning: "Variável que armazena a mensagem escolhida." }
        ]
      },
      {
        anchor: "boolean attmeptsLost = attempts == 3 && !validLogin;",
        title: "10. Detectar o fim das tentativas",
        explanation: "Depois que o laço termina, esta expressão verifica se o contador chegou a três e se o login continua inválido. O nome attmeptsLost contém um erro de escrita, mas isso não impede a compilação; nomes melhores seriam attemptsLost ou attemptsExhausted.",
        items: [
          { term: "attempts == 3", meaning: "Compara se exatamente três tentativas foram usadas." },
          { term: "!validLogin", meaning: "Confirma que a autenticação não aconteceu." },
          { term: "attmeptsLost", meaning: "Variável booleana que guarda o resultado da verificação." }
        ]
      },
      {
        anchor: "scanner.close();",
        title: "11. Fechar a entrada",
        explanation: "O Scanner é fechado ao final da execução. Atenção: este projeto é uma simulação didática; credenciais fixas no código não devem ser usadas em um sistema de autenticação real.",
        items: [
          { term: "close()", meaning: "Fecha o recurso Scanner." },
          { term: "Limitação de segurança", meaning: "Uma aplicação real não deve guardar senhas em texto puro no código-fonte." }
        ]
      }
    ]
  },
  bulletin: {
    purpose: "Agrupar dados de um estudante em um objeto, calcular a média de quatro notas e mostrar o resultado.",
    flow: "Declarar Student → ler nome e notas → criar o objeto → calcular a média → comparar com a nota mínima.",
    sections: [
      {
        anchor: "package Intermediate;",
        title: "1. Localizar a classe no pacote",
        explanation: "A declaração package organiza bulletin dentro do pacote Intermediate. O nome do pacote também aparece no caminho do arquivo.",
        items: [
          { term: "package", meaning: "Declara a qual pacote esta classe pertence." }
        ]
      },
      {
        anchor: "import java.util.Scanner;",
        title: "2. Importar Scanner",
        explanation: "Scanner será utilizado para ler o nome e as quatro notas digitadas pelo usuário.",
        items: [
          { term: "Scanner", meaning: "Classe de leitura de dados do terminal." }
        ]
      },
      {
        anchor: "public class bulletin {",
        title: "3. Declarar a classe principal",
        explanation: "bulletin é a classe pública do arquivo. Dentro dela existe outra classe, Student, que descreve os dados de um estudante.",
        items: [
          { term: "public class", meaning: "Declara uma classe com acesso público." },
          { term: "Student", meaning: "Classe interna que modela um estudante." }
        ]
      },
      {
        anchor: "String name;",
        title: "4. Definir os atributos do estudante",
        explanation: "Os campos guardam informações que pertencem ao mesmo estudante. Em vez de espalhar quatro notas pelo programa, elas ficam reunidas no objeto Student.",
        items: [
          { term: "name", meaning: "Nome do estudante." },
          { term: "portugueseGrade / mathGrade / englishGrade / historyGrade", meaning: "Campos que armazenam as notas de cada disciplina." },
          { term: "Double", meaning: "Classe wrapper para valores decimais; double é o tipo primitivo equivalente." }
        ]
      },
      {
        anchor: "public Student(String name, Double portugueseGrade, Double mathGrade, Double englishGrade,",
        title: "5. Construir um objeto Student",
        explanation: "O construtor tem o mesmo nome da classe e não declara tipo de retorno. Cada parâmetro recebe um dado; this aponta para o objeto atual, permitindo diferenciar o campo do parâmetro que tem o mesmo nome.",
        items: [
          { term: "Student(...)", meaning: "Construtor chamado quando usamos new Student(...)." },
          { term: "parâmetros", meaning: "Valores recebidos pelo construtor para inicializar o objeto." },
          { term: "this.name", meaning: "Campo name pertencente ao objeto atual." },
          { term: "name", meaning: "Parâmetro recebido pelo construtor." }
        ]
      },
      {
        anchor: "public static void main(String[] args) {",
        title: "6. Iniciar a execução e receber as notas",
        explanation: "main cria o Scanner, mostra as perguntas e lê cada resposta. O nome é lido com nextLine(); as notas são lidas com nextDouble(), porque podem ter casas decimais.",
        items: [
          { term: "scanner", meaning: "Leitor usado para todas as entradas." },
          { term: "nextLine()", meaning: "Lê o nome completo até Enter." },
          { term: "nextDouble()", meaning: "Lê uma nota como valor decimal." }
        ]
      },
      {
        anchor: "Student student = new Student(name, portugueseGrade, mathGrade, englishGrade, historyGrade);",
        title: "7. Criar e guardar o objeto",
        explanation: "new chama o construtor de Student e passa os cinco dados na ordem esperada. A variável student guarda a referência ao objeto criado, e seus campos podem ser acessados com o ponto.",
        items: [
          { term: "new", meaning: "Cria uma instância da classe." },
          { term: "student", meaning: "Variável que referencia o objeto Student." },
          { term: ".", meaning: "Operador de acesso a membros, como student.mathGrade." }
        ]
      },
      {
        anchor: "final Double passingGradeThreshold = 60.00;",
        title: "8. Definir a média mínima e calcular",
        explanation: "passingGradeThreshold guarda a nota mínima e final impede sua reatribuição. totalGrades soma os quatro campos do objeto; averageGrade divide o total por quatro.",
        items: [
          { term: "final", meaning: "Torna a referência/variável não reatribuível depois da inicialização." },
          { term: "passingGradeThreshold", meaning: "Valor usado como limite para aprovação: 60.00." },
          { term: "totalGrades", meaning: "Soma das quatro notas do estudante." },
          { term: "averageGrade", meaning: "Média aritmética: soma dividida por quatro." }
        ]
      },
      {
        anchor: "boolean passed = averageGrade >= passingGradeThreshold;",
        title: "9. Decidir se o estudante passou",
        explanation: ">= compara a média com o limite. O resultado dessa comparação é boolean: true quando a média é maior ou igual a 60, e false nos outros casos.",
        items: [
          { term: "boolean passed", meaning: "Variável que guarda o resultado da comparação." },
          { term: ">=", meaning: "Maior ou igual." }
        ]
      },
      {
        anchor: "String result = passed",
        title: "10. Escolher e imprimir a mensagem",
        explanation: "O operador ternário escolhe a mensagem conforme passed. A concatenação com + junta o texto da mensagem ao valor de averageGrade.",
        items: [
          { term: "?", meaning: "Se a condição antes do ? for verdadeira, escolhe o primeiro resultado." },
          { term: ":", meaning: "Se a condição for falsa, escolhe o resultado depois dos dois-pontos." },
          { term: "+", meaning: "Com String, concatena textos e valores convertidos para texto." }
        ]
      },
      {
        anchor: "scanner.close();",
        title: "11. Encerrar o Scanner",
        explanation: "Depois de imprimir o resultado, o programa fecha o Scanner. Apesar do texto pedir notas entre 10 e 100, o código atual não valida essa faixa; essa é uma melhoria possível.",
        items: [
          { term: "close()", meaning: "Fecha o leitor de entrada." },
          { term: "Validação", meaning: "Seria necessário conferir cada nota antes de calcular a média." }
        ]
      }
    ]
  },
  Vehicle: {
    purpose: "Ler características de um veículo e representar esses dados em um objeto.",
    flow: "Declarar VehicleInfo → receber os dados → construir o objeto → transformar o objeto em texto com toString().",
    sections: [
      {
        anchor: "package Intermediate;",
        title: "1. Declarar o pacote",
        explanation: "A classe pertence ao pacote Intermediate, que organiza os exercícios de nível intermediário.",
        items: [
          { term: "package", meaning: "Declara o pacote da classe." }
        ]
      },
      {
        anchor: "import java.util.Scanner;",
        title: "2. Importar a leitura do teclado",
        explanation: "Scanner recebe os dados que serão usados para preencher o objeto do veículo.",
        items: [
          { term: "Scanner", meaning: "Classe que lê valores da entrada padrão." }
        ]
      },
      {
        anchor: "public class Vehicle {",
        title: "3. Criar a classe externa",
        explanation: "Vehicle é a classe pública do arquivo. Ela contém uma classe interna chamada VehicleInfo e o método main que coordena a execução.",
        items: [
          { term: "classe externa", meaning: "Classe declarada no nível principal do arquivo." },
          { term: "VehicleInfo", meaning: "Classe interna que representa os dados de um veículo." }
        ]
      },
      {
        anchor: "public static class VehicleInfo {",
        title: "4. Modelar o objeto VehicleInfo",
        explanation: "VehicleInfo é uma classe estática aninhada: pode ser usada a partir de Vehicle sem precisar de uma instância externa. Ela agrupa os atributos que descrevem um veículo.",
        items: [
          { term: "static class", meaning: "Classe aninhada que não depende de uma instância de Vehicle para ser criada." },
          { term: "atributos", meaning: "Campos que guardam o estado de cada objeto." }
        ]
      },
      {
        anchor: "private final String name;",
        title: "5. Proteger os atributos",
        explanation: "private restringe o acesso direto aos campos a partir de outras classes. final impede a troca do valor depois que ele for inicializado no construtor.",
        items: [
          { term: "private", meaning: "Modificador de acesso que oculta o campo de código externo à classe." },
          { term: "final", meaning: "Exige que o campo seja inicializado e não permite reatribuição posterior." },
          { term: "name / brand / color", meaning: "Atributos de texto para nome, marca e cor." },
          { term: "horsepower / year", meaning: "Atributos inteiros para potência e ano." }
        ]
      },
      {
        anchor: "public VehicleInfo(String name, String brand, String color, int horsepower, int year) {",
        title: "6. Receber os valores no construtor",
        explanation: "Quando main usa new VehicleInfo(...), o construtor recebe cinco argumentos na ordem definida. Cada linha this.campo = parâmetro copia o valor recebido para o atributo do objeto.",
        items: [
          { term: "VehicleInfo(...)", meaning: "Construtor: cria o estado inicial do novo objeto." },
          { term: "parâmetros", meaning: "Valores fornecidos na chamada do construtor." },
          { term: "this", meaning: "Referência ao objeto que está sendo construído." }
        ]
      },
      {
        anchor: "@Override",
        title: "7. Personalizar a representação em texto",
        explanation: "@Override indica que toString() está sobrescrevendo um método herdado de Object. Isso permite decidir como o objeto deve aparecer quando é convertido para texto.",
        items: [
          { term: "@Override", meaning: "Anotação que pede ao compilador para verificar se o método realmente sobrescreve outro." },
          { term: "toString()", meaning: "Método que devolve uma representação textual do objeto." },
          { term: "String.format()", meaning: "Monta um texto com espaços reservados como %s, %d e %n." },
          { term: "return", meaning: "Devolve a String construída e encerra a execução do método toString." }
        ]
      },
      {
        anchor: "public static void main(String[] args) {",
        title: "8. Começar a leitura dos dados",
        explanation: "main é o ponto de entrada. O Scanner aparece dentro de try-with-resources: ao sair do bloco, Java fecha o recurso automaticamente, mesmo se ocorrer uma exceção.",
        items: [
          { term: "try (...)", meaning: "Estrutura try-with-resources: fecha automaticamente recursos que implementam AutoCloseable." },
          { term: "Scanner scanner", meaning: "Objeto que recebe as entradas do teclado." }
        ]
      },
      {
        anchor: "int year = scanner.nextInt();",
        title: "9. Ler os campos do veículo",
        explanation: "O programa lê ano e potência como inteiros e nome, marca e cor como Strings. Depois de nextInt(), chama nextLine() para consumir a quebra de linha que ficou na entrada antes de ler um texto.",
        items: [
          { term: "year", meaning: "Variável local para o ano do veículo." },
          { term: "horsepower", meaning: "Variável local para a potência em cavalos." },
          { term: "nextInt()", meaning: "Lê um inteiro, mas deixa o Enter pendente na entrada." },
          { term: "nextLine()", meaning: "Consome o restante da linha; aqui evita que a próxima leitura de texto receba uma linha vazia." }
        ]
      },
      {
        anchor: "VehicleInfo vehicle = new VehicleInfo(name, brand, color, horsepower, year);",
        title: "10. Instanciar e imprimir o veículo",
        explanation: "A ordem dos argumentos deve corresponder à ordem dos parâmetros do construtor. Ao executar println(vehicle), Java chama toString() automaticamente para obter o texto do objeto.",
        items: [
          { term: "new VehicleInfo(...)", meaning: "Cria um objeto e executa seu construtor." },
          { term: "vehicle", meaning: "Variável que guarda a referência ao objeto criado." },
          { term: "println(vehicle)", meaning: "Imprime a representação textual produzida por toString()." }
        ]
      }
    ]
  },
  DeveloperProfile: {
    purpose: "Criar um perfil de desenvolvedor e adicionar nomes de projetos a uma lista dinâmica.",
    flow: "Ler nome e linguagem → criar o perfil → repetir a coleta de projetos → imprimir os dados e a lista.",
    sections: [
      {
        anchor: "import java.util.Scanner;",
        title: "1. Importar as classes utilizadas",
        explanation: "Scanner cuida das entradas de texto e ArrayList guarda uma quantidade variável de projetos.",
        items: [
          { term: "Scanner", meaning: "Ferramenta de leitura do terminal." },
          { term: "ArrayList", meaning: "Implementação de lista que pode aumentar ou diminuir de tamanho." }
        ]
      },
      {
        anchor: "public class DeveloperProfile {",
        title: "2. Declarar a classe do programa",
        explanation: "DeveloperProfile é a classe pública do arquivo. Dentro dela existe uma classe interna que representa os dados de um perfil.",
        items: [
          { term: "DeveloperProfile", meaning: "Nome da classe externa, que contém main." },
          { term: "main", meaning: "Ponto de entrada da execução Java." }
        ]
      },
      {
        anchor: "public static class developerProfile {",
        title: "3. Criar o modelo do perfil",
        explanation: "developerProfile é uma classe aninhada estática. Ela reúne nome, linguagem favorita e lista de projetos. Em Java, nomes de classes normalmente começam com letra maiúscula; DeveloperProfile seria uma convenção mais clara para essa classe interna.",
        items: [
          { term: "static class", meaning: "Classe aninhada que pode ser criada sem um objeto DeveloperProfile externo." },
          { term: "String", meaning: "Tipo usado para nome e linguagem." },
          { term: "ArrayList<String>", meaning: "Lista redimensionável que guarda Strings." }
        ]
      },
      {
        anchor: "public developerProfile(String name, String favoriteLanguage) {",
        title: "4. Inicializar o perfil com um construtor",
        explanation: "O construtor recebe o nome e a linguagem preferida. Em seguida, inicializa a lista vazia; sem essa inicialização, profile.projects seria null e a chamada add poderia causar NullPointerException.",
        items: [
          { term: "name", meaning: "Parâmetro com o nome informado." },
          { term: "favoriteLanguage", meaning: "Parâmetro com a linguagem preferida." },
          { term: "this.name", meaning: "Campo do objeto atual." },
          { term: "new ArrayList<>()", meaning: "Cria uma lista vazia capaz de receber novos itens." }
        ]
      },
      {
        anchor: "public static void main(String[] args) {",
        title: "5. Ler os dados do usuário",
        explanation: "main cria um Scanner e lê o nome e a linguagem com nextLine(). A variável respost recebe a resposta textual sobre a existência de projetos; mais adiante ela controla o while.",
        items: [
          { term: "scanner", meaning: "Leitor de entradas." },
          { term: "name", meaning: "Variável local para o nome digitado." },
          { term: "favoriteLanguage", meaning: "Variável local para a linguagem informada." },
          { term: "respost", meaning: "String usada como resposta de continuidade; o nome tem um erro de escrita, mas funciona." }
        ]
      },
      {
        anchor: "developerProfile profile = new developerProfile(name, favoriteLanguage);",
        title: "6. Criar o objeto de perfil",
        explanation: "new chama o construtor e passa os dois dados que foram lidos. profile passa a referenciar o objeto que contém os atributos e a lista de projetos.",
        items: [
          { term: "profile", meaning: "Variável que referencia o perfil criado." },
          { term: "new", meaning: "Cria uma instância da classe." },
          { term: "argumentos", meaning: "Valores enviados ao construtor, na mesma ordem dos parâmetros." }
        ]
      },
      {
        anchor: "while (respost.equalsIgnoreCase(\"true\")) {",
        title: "7. Repetir enquanto a resposta for true",
        explanation: "equalsIgnoreCase compara o conteúdo da String sem diferenciar maiúsculas de minúsculas. Assim, true, TRUE e True são aceitos. O laço só começa se a primeira resposta corresponder a true.",
        items: [
          { term: "while", meaning: "Repete o bloco enquanto a condição for verdadeira." },
          { term: "equalsIgnoreCase()", meaning: "Compara textos ignorando diferenças entre maiúsculas e minúsculas." },
          { term: "respost", meaning: "A resposta é uma String, portanto a comparação é feita com equalsIgnoreCase, não com ==." }
        ]
      },
      {
        anchor: "String nameProject = scanner.nextLine();",
        title: "8. Ler e armazenar cada projeto",
        explanation: "nameProject recebe o nome de um projeto. profile.projects.add(nameProject) acrescenta esse texto ao final da lista existente, sem substituir os itens anteriores.",
        items: [
          { term: "nameProject", meaning: "Variável local para o projeto informado nesta repetição." },
          { term: "profile.projects", meaning: "Acesso à lista que pertence ao objeto profile." },
          { term: "add()", meaning: "Acrescenta um elemento ao final de uma ArrayList." }
        ]
      },
      {
        anchor: "respost = scanner.nextLine();",
        title: "9. Atualizar a condição do laço",
        explanation: "O programa pergunta se há outro projeto e substitui respost pela nova resposta. A próxima verificação do while usa esse valor atualizado; sem essa leitura, o laço poderia repetir para sempre.",
        items: [
          { term: "=", meaning: "Atribui a nova resposta à variável respost." },
          { term: "while", meaning: "Reavalia a condição antes de iniciar a próxima repetição." }
        ]
      },
      {
        anchor: "scanner.close();",
        title: "10. Imprimir o perfil",
        explanation: "Depois da coleta, o Scanner é fechado. profile.projects.size() informa quantos projetos foram adicionados; o for-each percorre a lista e imprime cada String.",
        items: [
          { term: "size()", meaning: "Devolve a quantidade de elementos da lista." },
          { term: "for (String project : profile.projects)", meaning: "Percorre cada item da lista e coloca o item atual na variável project." },
          { term: "FavoriteLanguage", meaning: "Campo com a linguagem favorita. Pela convenção Java, seria mais claro usar favoriteLanguage em camelCase." }
        ]
      }
    ]
  },
  library: {
    purpose: "Adicionar títulos a uma biblioteca representada por uma ArrayList e mostrar a coleção.",
    flow: "Criar a lista → ler um título → adicionar → perguntar se continua → imprimir o estado final.",
    sections: [
      {
        anchor: "package Intermediate;",
        title: "1. Declarar o pacote",
        explanation: "O pacote Intermediate agrupa a classe library junto dos outros exercícios intermediários.",
        items: [
          { term: "package", meaning: "Identifica o pacote ao qual a classe pertence." }
        ]
      },
      {
        anchor: "import java.util.ArrayList;",
        title: "2. Importar ArrayList e Scanner",
        explanation: "ArrayList guarda a coleção de títulos, enquanto Scanner recebe as respostas digitadas no terminal.",
        items: [
          { term: "ArrayList", meaning: "Lista dinâmica que permite adicionar e remover elementos." },
          { term: "Scanner", meaning: "Classe de leitura de dados." }
        ]
      },
      {
        anchor: "public class library {",
        title: "3. Definir a classe e o método main",
        explanation: "library é a classe pública deste arquivo. O código executável está concentrado em main, que organiza o ciclo de entrada.",
        items: [
          { term: "public", meaning: "Modificador de acesso." },
          { term: "static", meaning: "Permite chamar main sem criar um objeto library." },
          { term: "void", meaning: "O método não retorna um valor." }
        ]
      },
      {
        anchor: "ArrayList<String> books = new ArrayList<>();",
        title: "4. Criar uma lista de livros",
        explanation: "books é uma ArrayList que só aceita elementos String. O operador new cria a lista vazia. Ela poderá crescer conforme novos títulos forem adicionados.",
        items: [
          { term: "ArrayList<String>", meaning: "Tipo da lista: cada elemento armazenado é uma String." },
          { term: "books", meaning: "Nome da variável que referencia a coleção de títulos." },
          { term: "<String>", meaning: "Parâmetro de tipo (generics): define o tipo dos elementos da lista." },
          { term: "new ArrayList<>()", meaning: "Cria uma lista vazia; o tipo é inferido a partir do lado esquerdo." }
        ]
      },
      {
        anchor: "Scanner scanner = new Scanner(System.in);",
        title: "5. Criar o leitor e a variável de controle",
        explanation: "scanner recebe a entrada do terminal. AddAgain começa como false, mas o do-while executará a primeira rodada antes de verificar seu valor.",
        items: [
          { term: "scanner", meaning: "Objeto que lê os títulos e a resposta de continuidade." },
          { term: "Boolean", meaning: "Classe wrapper de boolean; para um simples estado lógico, boolean primitivo costuma ser a opção mais direta." },
          { term: "AddAgain", meaning: "Variável que controla se o ciclo de cadastro deve repetir." }
        ]
      },
      {
        anchor: "do {",
        title: "6. Executar a coleta pelo menos uma vez",
        explanation: "O bloco do é executado antes da condição. Isso faz sentido aqui: o programa deve pedir pelo menos um título, mesmo que AddAgain comece como false.",
        items: [
          { term: "do-while", meaning: "Laço cuja condição é verificada depois da execução do bloco." },
          { term: "scanner.nextLine()", meaning: "Lê o título completo, incluindo espaços." }
        ]
      },
      {
        anchor: "String nameBook = scanner.nextLine();",
        title: "7. Guardar e adicionar o título",
        explanation: "nameBook recebe o texto informado. books.add(nameBook) adiciona esse título ao final da coleção; a lista permanece disponível para as próximas repetições.",
        items: [
          { term: "nameBook", meaning: "Variável local que guarda o título digitado nesta rodada." },
          { term: "add()", meaning: "Acrescenta um elemento à lista." },
          { term: "books", meaning: "Referência à mesma lista durante todo o programa." }
        ]
      },
      {
        anchor: "AddAgain = scanner.nextBoolean();",
        title: "8. Ler a decisão de continuar",
        explanation: "nextBoolean() espera true ou false. A chamada a nextLine() logo depois consome o Enter que ficou pendente, para que a próxima leitura do título não receba uma linha vazia.",
        items: [
          { term: "nextBoolean()", meaning: "Lê um token booleano." },
          { term: "nextLine()", meaning: "Consome o restante da linha após nextBoolean()." },
          { term: "AddAgain", meaning: "Recebe a decisão que será testada no final do do-while." }
        ]
      },
      {
        anchor: "} while (AddAgain == true);",
        title: "9. Decidir se o ciclo recomeça",
        explanation: "O laço repete quando AddAgain é true. Como a variável já é boolean, a condição poderia ser escrita apenas while (AddAgain), sem comparar explicitamente com true.",
        items: [
          { term: "== true", meaning: "Comparação explícita com o valor true; é redundante para um boolean." },
          { term: "do-while", meaning: "Volta ao início somente depois de avaliar a condição." }
        ]
      },
      {
        anchor: "if (AddAgain == false) {",
        title: "10. Mostrar o estado final e fechar",
        explanation: "Quando AddAgain é false, o if imprime a biblioteca mais uma vez. Essa checagem também poderia ser escrita como if (!AddAgain). scanner.close() encerra a leitura.",
        items: [
          { term: "if", meaning: "Executa o bloco quando a condição é verdadeira." },
          { term: "!AddAgain", meaning: "Forma mais direta de testar se AddAgain é false." },
          { term: "close()", meaning: "Fecha o Scanner." }
        ]
      }
    ]
  },
  CandidateManager: {
    purpose: "Gerenciar candidatos com opções de adicionar, listar, pesquisar, remover e contar registros.",
    flow: "Montar a lista inicial → mostrar menu → ler uma opção → chamar o método correspondente → repetir até escolher sair.",
    sections: [
      {
        anchor: "package Intermediate;",
        title: "1. Organizar a classe no pacote",
        explanation: "A classe pertence ao pacote Intermediate. O arquivo está dentro da pasta correspondente à declaração package.",
        items: [
          { term: "package", meaning: "Declara o pacote da classe." }
        ]
      },
      {
        anchor: "import java.util.ArrayList;",
        title: "2. Importar as coleções e a entrada",
        explanation: "O projeto combina List, ArrayList e Arrays para preparar os dados iniciais e gerenciar a coleção. Scanner cuida da entrada do usuário.",
        items: [
          { term: "List", meaning: "Interface que define operações comuns de uma lista." },
          { term: "ArrayList", meaning: "Implementação de List baseada em array redimensionável." },
          { term: "Arrays", meaning: "Classe utilitária com métodos para trabalhar com arrays, incluindo asList()." },
          { term: "Scanner", meaning: "Classe que lê opções e nomes digitados." }
        ]
      },
      {
        anchor: "public class CandidateManager {",
        title: "3. Declarar a classe principal",
        explanation: "CandidateManager representa o programa de gerenciamento. O método main coordena a aplicação e os métodos auxiliares dividem as responsabilidades.",
        items: [
          { term: "CandidateManager", meaning: "Nome da classe que corresponde ao arquivo CandidateManager.java." },
          { term: "métodos auxiliares", meaning: "Funções declaradas na classe para separar tarefas específicas." }
        ]
      },
      {
        anchor: "List<String> candidates = new ArrayList<>(Arrays.asList(",
        title: "4. Criar a lista inicial de candidatos",
        explanation: "A variável candidates é declarada pela interface List, mas recebe uma implementação ArrayList. Arrays.asList prepara os nomes iniciais; o construtor de ArrayList cria uma cópia redimensionável que permite adicionar e remover candidatos.",
        items: [
          { term: "List<String>", meaning: "Referência a uma lista cujos elementos são Strings." },
          { term: "candidates", meaning: "Coleção que guarda os nomes de todos os candidatos." },
          { term: "Arrays.asList(...)", meaning: "Cria uma lista baseada nos valores fornecidos." },
          { term: "new ArrayList<>(...)", meaning: "Copia os elementos para uma lista que pode mudar de tamanho." }
        ]
      },
      {
        anchor: "try (Scanner scanner = new Scanner(System.in)) {",
        title: "5. Abrir o Scanner com fechamento automático",
        explanation: "try-with-resources cria o Scanner no cabeçalho do try. Quando o bloco termina, Java chama close() automaticamente, inclusive se uma exceção interromper o fluxo.",
        items: [
          { term: "try-with-resources", meaning: "Estrutura que gerencia automaticamente o fechamento de recursos." },
          { term: "scanner", meaning: "Leitor usado pelos métodos de entrada." }
        ]
      },
      {
        anchor: "boolean running = true;",
        title: "6. Manter o menu em execução",
        explanation: "running começa true para permitir que o menu apareça. Quando a pessoa escolhe a opção 0, o programa muda essa variável para false e o while termina.",
        items: [
          { term: "running", meaning: "Estado que controla a continuidade do programa." },
          { term: "while (running)", meaning: "Repete enquanto running for true." }
        ]
      },
      {
        anchor: "while (running) {",
        title: "7. Repetir o menu e ler a opção",
        explanation: "Em cada volta, showMenu() apresenta as opções e readInt() lê um número. Depois, switch encaminha a execução para a tarefa correspondente.",
        items: [
          { term: "showMenu()", meaning: "Chamada de método: executa o método responsável por imprimir o menu." },
          { term: "readInt(scanner, ...)", meaning: "Passa o Scanner e uma mensagem para o método de leitura." },
          { term: "parâmetros", meaning: "Variáveis declaradas na assinatura do método que recebem os argumentos enviados na chamada." }
        ]
      },
      {
        anchor: "switch (option) {",
        title: "8. Direcionar cada opção do menu",
        explanation: "Cada case chama um método específico. A opção 5 usa candidates.size() para contar registros, e a opção 0 altera running para encerrar o laço. break sai do switch, não do método main nem do while.",
        items: [
          { term: "case 1–4", meaning: "Chamam os métodos de adicionar, listar, pesquisar e remover." },
          { term: "size()", meaning: "Devolve a quantidade atual de elementos da lista." },
          { term: "break", meaning: "Encerra o switch atual; não encerra o while externo." },
          { term: "running = false", meaning: "Faz a condição do while ficar falsa na próxima verificação." }
        ]
      },
      {
        anchor: "private static void showMenu() {",
        title: "9. Separar o desenho do menu",
        explanation: "showMenu não recebe parâmetros e não devolve valor. void significa que sua responsabilidade é executar uma ação: imprimir as opções.",
        items: [
          { term: "private", meaning: "O método só pode ser acessado diretamente de dentro da classe CandidateManager." },
          { term: "static", meaning: "Pode ser chamado pela classe sem criar um objeto CandidateManager." },
          { term: "void", meaning: "Não existe valor de retorno." },
          { term: "showMenu()", meaning: "Nome do método; os parênteses indicam a chamada sem argumentos." }
        ]
      },
      {
        anchor: "private static int readInt(Scanner scanner, String prompt) {",
        title: "10. Ler um inteiro e devolvê-lo",
        explanation: "readInt recebe dois parâmetros: o leitor e a mensagem que deve aparecer. O while(true) tenta novamente até receber um inteiro válido. Quando consegue, return value devolve o inteiro e encerra somente este método.",
        items: [
          { term: "int", meaning: "Tipo de retorno: quem chamar readInt receberá um inteiro." },
          { term: "Scanner scanner", meaning: "Parâmetro que recebe o leitor usado para capturar a resposta." },
          { term: "String prompt", meaning: "Parâmetro com o texto que será exibido antes da leitura." },
          { term: "hasNextInt()", meaning: "Verifica se o próximo token pode ser interpretado como inteiro sem consumi-lo." },
          { term: "return value", meaning: "Devolve o valor ao ponto da chamada e encerra readInt." }
        ]
      },
      {
        anchor: "while (true) {",
        title: "11. Entender o laço de validação",
        explanation: "while(true) é um laço sem condição de parada própria. Neste método, ele termina quando o caminho válido executa return. Se a entrada não for inteira, nextLine() descarta o token inválido e a repetição começa de novo.",
        items: [
          { term: "while (true)", meaning: "Repete continuamente até que um return, break ou outra saída encerre o fluxo." },
          { term: "hasNextInt()", meaning: "Permite validar a entrada antes de chamar nextInt()." },
          { term: "scanner.nextLine()", meaning: "Consome a entrada inválida para evitar que ela seja testada infinitamente." }
        ]
      },
      {
        anchor: "private static String readName(Scanner scanner, String prompt) {",
        title: "12. Reutilizar a leitura de nomes",
        explanation: "readName recebe um Scanner e uma mensagem, imprime o prompt, lê a linha e devolve o texto sem espaços extras no começo ou no fim. trim() não apaga os espaços entre palavras.",
        items: [
          { term: "String", meaning: "Tipo de retorno: o método devolve texto." },
          { term: "trim()", meaning: "Remove espaços em branco das extremidades da String." },
          { term: "return", meaning: "Entrega o texto tratado a quem chamou o método." }
        ]
      },
      {
        anchor: "private static void addCandidate(List<String> candidates, Scanner scanner) {",
        title: "13. Adicionar um candidato",
        explanation: "O método recebe a lista existente e o Scanner. Se o nome estiver vazio, return; encerra antecipadamente o método void. Caso contrário, add() inclui o nome na lista.",
        items: [
          { term: "List<String> candidates", meaning: "Parâmetro que referencia a lista compartilhada; não é uma nova lista." },
          { term: "String name", meaning: "Variável local com o nome já lido e tratado." },
          { term: "isEmpty()", meaning: "Verifica se a String não possui caracteres." },
          { term: "return;", meaning: "Sai do método void sem devolver um valor." },
          { term: "candidates.add(name)", meaning: "Modifica a lista recebida, acrescentando um novo elemento." }
        ]
      },
      {
        anchor: "private static void listCandidates(List<String> candidates) {",
        title: "14. Percorrer e listar os candidatos",
        explanation: "Primeiro o método verifica se a lista está vazia. Caso haja dados, um for percorre os índices de zero até size() - 1. O programa mostra index + 1 porque a interface apresenta posições começando em 1, embora a ArrayList comece em 0.",
        items: [
          { term: "candidates.isEmpty()", meaning: "Verifica se a coleção não contém elementos." },
          { term: "for", meaning: "Repetição controlada por inicialização, condição e atualização." },
          { term: "index", meaning: "Índice atual da posição que será lida." },
          { term: "get(index)", meaning: "Obtém o elemento armazenado naquele índice." },
          { term: "index + 1", meaning: "Converte o índice interno para a numeração apresentada à pessoa." }
        ]
      },
      {
        anchor: "private static void searchCandidate(List<String> candidates, Scanner scanner) {",
        title: "15. Pesquisar pelo nome",
        explanation: "indexOf(name) procura a primeira ocorrência do nome e devolve sua posição. Se não encontrar, devolve -1. O return; evita executar a mensagem de sucesso quando a busca falha.",
        items: [
          { term: "indexOf()", meaning: "Procura um elemento na lista e devolve seu índice, ou -1 quando não encontra." },
          { term: "index", meaning: "Armazena a posição encontrada." },
          { term: "-1", meaning: "Valor sentinela usado por indexOf para representar ausência." },
          { term: "return;", meaning: "Encerra o método antes da mensagem de sucesso." }
        ]
      },
      {
        anchor: "private static void removeCandidate(List<String> candidates, Scanner scanner) {",
        title: "16. Validar e remover um candidato",
        explanation: "O método impede remoções quando a lista está vazia, mostra os candidatos e lê a posição escolhida. A validação compara o número digitado com 1 e com o tamanho atual da lista antes de acessar qualquer posição.",
        items: [
          { term: "candidateNumber", meaning: "Número apresentado ao usuário, começando em 1." },
          { term: "candidates.size()", meaning: "Quantidade atual de candidatos; muda quando a lista é modificada." },
          { term: "candidateNumber - 1", meaning: "Converte a posição humana para o índice da ArrayList, que começa em zero." },
          { term: "candidates.remove(...)", meaning: "Remove a posição informada e devolve o elemento removido." },
          { term: "removedCandidate", meaning: "Variável que guarda o nome devolvido por remove para exibir a confirmação." }
        ]
      }
    ]
  }
};

export function getCodeNotes(projectId) {
  return codeNotes[projectId] || null;
}
