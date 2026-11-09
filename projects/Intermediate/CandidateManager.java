package Intermediate;

import java.util.Scanner;
import java.util.ArrayList;
import java.util.Arrays;

public class CandidateManager {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> candidates = new ArrayList<>

        (Arrays.asList("Ana Silva", "Bruno Costa", "Carla Souza", "Daniel Oliveira",
                "Eduarda Santos", "Felipe Pereira", "Gabriela Almeida", "Henrique Lima",
                "Isabela Rodrigues", "Joao Ferreira", "Karen Martins", "Lucas Araujo",
                "Mariana Carvalho", "Nicolas Gomes", "Lais Mirelle", "Pedro Barbosa",
                "Rafaela Nunes", "Samuel Cardoso", "Thais Moreira", "Vinicius Teixeira"));

        System.out.println("========================================");
        System.out.println("       CANDIDATE MANAGEMENT SYSTEM");
        System.out.println("========================================");
        System.out.println("[1] Cadastrar candidato");
        System.out.println("[2] Listar candidatos");
        System.out.println("[3] Pesquisar candidato");
        System.out.println("[4] Remover candidato");
        System.out.println("[5] Total de candidatos");
        System.out.println("[0] Encerrar sistema");
        System.out.println("Escolha uma opção:");
        int option = scanner.nextInt();
        switch (option) {
            case 1:
                System.out.println("Escreva o nome do candidato:");
                String name = scanner.nextLine();

                candidates.add(name);

                System.out.printf("Candiadato adicionado! , veja a lista completa de candidatos:%s\n", candidates);
                break;
            case 2:

                if (candidates.size() <= 0) {
                    System.out.println("Ainda não temos candidatos.");
                }

                for (int counter = 0; counter <= candidates.size(); counter++) {
                    System.out.println(candidates.get(counter));
                }
                ;
                break;

            case 3:
                System.out.println("Escreva o nome do candidato:");
                String nameSearch = scanner.nextLine();
                if (candidates.contains(nameSearch)) {
                    int position = candidates.indexOf(nameSearch);
                    System.out.printf("- %s [%s]", nameSearch, position);
                } else {
                    System.out.println("candidato não encontrado");
                }

                break;
            case 4:
                int counter1 = 0;
                while (counter1 <= candidates.size()) {
                    System.out.printf("%s - [%s]\n", candidates.get(counter1), counter1 + 1);
                    counter1++;
                }
                ;

                System.out.println("fale a colocação do candidato que deseja deletar ->");

                int selectNumber = scanner.nextInt();
                int colocation = selectNumber - 1;
                candidates.remove(colocation);

                for (int counter2 = 0; counter2 < candidates.size(); counter2++) {
                    System.out.println(candidates.get(counter2));

                }

                break;
            default:
                break;

        }
        scanner.close();
    }

}
