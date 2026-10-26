package projects;

import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter the first number:");
        int number1 = scanner.nextInt();
        System.out.println("Enter the second number:");
        int number2 = scanner.nextInt();

        System.out.println("---------------------");
        System.out.println("| Choose an operator|");
        System.out.println("|       + - / x     |");
        System.out.println("|                   |");
        System.out.println("---------------------");
        System.out.println("Enter an operator on the next line:");

        var sign = scanner.next();

        switch (sign) {
            case "+":
                System.out.printf("Result: %d + %d = %d%n", number1, number2, number1 + number2);
                break;
            case "-":
                System.out.printf("Result: %d - %d = %d%n", number1, number2, number1 - number2);
                break;
            case "/":
                System.out.printf("Result: %d / %d = %d%n", number1, number2, number1 / number2);
                break;
            case "x":
                System.out.printf("Result: %d x %d = %d%n", number1, number2, number1 * number2);
                break;

            default:
                System.out.println("Please enter a valid operator (+, -, /, or x).");
                break;
        }

        scanner.close();
    }
}
