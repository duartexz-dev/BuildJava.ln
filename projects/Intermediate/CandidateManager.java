package Intermediate;

import java.util.Scanner;
import java.util.ArrayList;

public class CandidateManager {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> candidates = new ArrayList<>();
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

                break;

            default:
                break;
        }
    }

}
