package projects;

import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Select a aleatory number :");
        int number1 = scanner.nextInt();
        System.out.println("Select a scond number :");
        int number2 = scanner.nextInt();

        System.out.println("---------------------");
        System.out.println("|    Select the     |");
        System.out.println("|  Sign for counter  |");
        System.out.println("|     +,-,/,x       |");
        System.out.println("|                   |");
        System.out.println("---------------------");
        System.out.println("Writing in next line:");

        scanner.close();
    }
}
