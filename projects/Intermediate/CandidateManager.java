package Intermediate;

import java.util.Scanner;
import java.util.ArrayList;
import java.util.Arrays;

public class CandidateManager {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> candidates = new ArrayList<>(
                Arrays.asList("Ana Silva", "Bruno Costa", "Carla Souza", "Daniel Oliveira",
                        "Eduarda Santos", "Felipe Pereira", "Gabriela Almeida", "Henrique Lima",
                        "Isabela Rodrigues", "Joao Ferreira", "Karen Martins", "Lucas Araujo",
                        "Mariana Carvalho", "Nicolas Gomes", "Lais Mirelle", "Pedro Barbosa",
                        "Rafaela Nunes", "Samuel Cardoso", "Thais Moreira", "Vinicius Teixeira"));

        boolean shouldContinue = false;

        do {
            System.out.println("========================================");
            System.out.println("       CANDIDATE MANAGEMENT SYSTEM");
            System.out.println("========================================");
            System.out.println("[1] Add a candidate");
            System.out.println("[2] List candidates");
            System.out.println("[3] Search for a candidate");
            System.out.println("[4] Remove a candidate");
            System.out.println("[5] Show the total number of candidates");
            System.out.println("[0] Exit");
            System.out.println("Choose an option:");
            int option = scanner.nextInt();
            scanner.nextLine();

            switch (option) {
                case 1:
                    System.out.print("Enter the candidate's name: ");
                    String name = scanner.nextLine();

                    candidates.add(name);

                    System.out.printf("Candidate added successfully! 🎉 Current candidates: %s%n", candidates);
                    System.out
                            .println("Would you like to choose another option? Enter true or false:");
                    shouldContinue = scanner.nextBoolean();
                    break;
                case 2:

                    if (candidates.size() <= 0) {
                        System.out.println("There are no candidates yet.");
                    }

                    for (int counter = 0; counter < candidates.size(); counter++) {
                        System.out.println(candidates.get(counter));
                    }
                    ;
                    System.out
                            .println("Would you like to choose another option? Enter true or false:");
                    shouldContinue = scanner.nextBoolean();
                    break;

                case 3:
                    System.out.print("Enter the candidate's name to search: ");
                    String nameSearch = scanner.nextLine();
                    if (candidates.contains(nameSearch)) {
                        int position = candidates.indexOf(nameSearch);
                        System.out.printf("- %s [index %s]%n", nameSearch, position);
                    } else {
                        System.out.println("Candidate not found.");
                    }
                    System.out
                            .println("Would you like to choose another option? Enter true or false:");
                    shouldContinue = scanner.nextBoolean();
                    break;
                case 4:
                    int candidateIndex = 0;
                    while (candidateIndex < candidates.size()) {
                        System.out.printf("%s - [%s]%n", candidates.get(candidateIndex), candidateIndex + 1);
                        candidateIndex++;
                    }
                    ;

                    System.out.println("Enter the number of the candidate you want to remove:");

                    int candidateNumber = scanner.nextInt();

                    if (candidateNumber > 20) {
                        System.out.println("You choose a inválid number .");
                        System.out
                                .println("Would you like to choose another option? Enter true or false:");
                        shouldContinue = scanner.nextBoolean();
                        break;
                    }

                    int candidatePosition = candidateNumber - 1;
                    candidates.remove(candidatePosition);

                    for (int remainingIndex = 0; remainingIndex < candidates.size(); remainingIndex++) {
                        System.out.println(candidates.get(remainingIndex));

                    }
                    System.out
                            .println("Would you like to choose another option? Enter true or false:");
                    shouldContinue = scanner.nextBoolean();

                    break;

                case 5:
                    System.out.printf("There are currently %s candidates in the system.%n", candidates.size());

                    System.out
                            .println("Would you like to choose another option? Enter true or false:");
                    shouldContinue = scanner.nextBoolean();
                    break;

                case 0:
                    System.out
                            .println("Try the program before leaving! Enter true to continue or false to exit:");
                    shouldContinue = scanner.nextBoolean();
                    break;
                default:
                    System.out.println("Please enter a valid option.");
                    shouldContinue = true;
                    break;

            }
        } while (shouldContinue);

        scanner.close();
    }

}
