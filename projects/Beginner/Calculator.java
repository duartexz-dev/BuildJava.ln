package projects.Beginner;

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

        var sign = scanner.next(); // var lets Java infer the variable's type; here, sign is a String.

        // switch checks sign and runs the matching case; break prevents the next case from running.
        switch (sign) {
            case "+":
                // The + operator adds the two numbers.
                System.out.printf("Result: %d + %d = %d%n", number1, number2, number1 + number2);
                break;
            case "-":
                // The - operator subtracts the second number from the first.
                System.out.printf("Result: %d - %d = %d%n", number1, number2, number1 - number2);
                break;
            case "/":
                // The / operator divides the first number by the second; integer division drops the decimal part.
                System.out.printf("Result: %d / %d = %d%n", number1, number2, number1 / number2);
                break;
            case "x":
                // The * operator multiplies the numbers; users enter "x" to select multiplication.
                System.out.printf("Result: %d x %d = %d%n", number1, number2, number1 * number2);
                break;

            default:
                // default runs when sign does not match any supported operator.
                System.out.println("Please enter a valid operator (+, -, /, or x).");
                break;
        }

        scanner.close();
    }
}
