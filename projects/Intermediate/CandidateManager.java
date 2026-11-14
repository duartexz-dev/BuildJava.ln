package Intermediate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class CandidateManager {

    public static void main(String[] args) {
        List<String> candidates = new ArrayList<>(Arrays.asList(
                "Ana Silva", "Bruno Costa", "Carla Souza", "Daniel Oliveira",
                "Eduarda Santos", "Felipe Pereira", "Gabriela Almeida", "Henrique Lima",
                "Isabela Rodrigues", "Joao Ferreira", "Karen Martins", "Lucas Araujo",
                "Mariana Carvalho", "Nicolas Gomes", "Lais Mirelle", "Pedro Barbosa",
                "Rafaela Nunes", "Samuel Cardoso", "Thais Moreira", "Vinicius Teixeira"));

        try (Scanner scanner = new Scanner(System.in)) {
            boolean running = true;

            while (running) {
                showMenu();
                int option = readInt(scanner, "Choose an option: ");

                switch (option) {
                    case 1:
                        addCandidate(candidates, scanner);
                        break;
                    case 2:
                        listCandidates(candidates);
                        break;
                    case 3:
                        searchCandidate(candidates, scanner);
                        break;
                    case 4:
                        removeCandidate(candidates, scanner);
                        break;
                    case 5:
                        System.out.printf("Total candidates: %d%n", candidates.size());
                        break;
                    case 0:
                        running = false;
                        System.out.println("Candidate manager closed.");
                        break;
                    default:
                        System.out.println("Invalid option. Choose a number from 0 to 5.");
                        break;
                }

                if (running) {
                    System.out.println();
                }
            }
        }
    }

    private static void showMenu() {
        System.out.println("========================================");
        System.out.println("       CANDIDATE MANAGEMENT SYSTEM");
        System.out.println("========================================");
        System.out.println("[1] Add a candidate");
        System.out.println("[2] List candidates");
        System.out.println("[3] Search for a candidate");
        System.out.println("[4] Remove a candidate");
        System.out.println("[5] Show the total number of candidates");
        System.out.println("[0] Exit");
    }

    private static int readInt(Scanner scanner, String prompt) {
        while (true) {
            System.out.print(prompt);

            if (scanner.hasNextInt()) {
                int value = scanner.nextInt();
                scanner.nextLine();
                return value;
            }

            scanner.nextLine();
            System.out.println("Please enter a whole number.");
        }
    }

    private static String readName(Scanner scanner, String prompt) {
        System.out.print(prompt);
        return scanner.nextLine().trim();
    }

    private static void addCandidate(List<String> candidates, Scanner scanner) {
        String name = readName(scanner, "Enter the candidate's name: ");

        if (name.isEmpty()) {
            System.out.println("A candidate name cannot be empty.");
            return;
        }

        candidates.add(name);
        System.out.printf("Candidate added: %s%n", name);
    }

    private static void listCandidates(List<String> candidates) {
        if (candidates.isEmpty()) {
            System.out.println("There are no candidates in the list.");
            return;
        }

        System.out.println("Candidates:");
        for (int index = 0; index < candidates.size(); index++) {
            System.out.printf("%d. %s%n", index + 1, candidates.get(index));
        }
    }

    private static void searchCandidate(List<String> candidates, Scanner scanner) {
        String name = readName(scanner, "Enter the candidate's full name: ");
        int index = candidates.indexOf(name);

        if (index == -1) {
            System.out.println("Candidate not found.");
            return;
        }

        System.out.printf("Found: %s (position %d)%n", candidates.get(index), index + 1);
    }

    private static void removeCandidate(List<String> candidates, Scanner scanner) {
        if (candidates.isEmpty()) {
            System.out.println("There are no candidates to remove.");
            return;
        }

        listCandidates(candidates);
        int candidateNumber = readInt(scanner, "Enter the candidate number to remove: ");

        if (candidateNumber < 1 || candidateNumber > candidates.size()) {
            System.out.printf(
                    "Invalid position. Choose a number between 1 and %d.%n",
                    candidates.size());
            return;
        }

        String removedCandidate = candidates.remove(candidateNumber - 1);
        System.out.printf("Removed: %s%n", removedCandidate);
    }
}
