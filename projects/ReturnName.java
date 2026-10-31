
package projects;

import java.util.Scanner;

/** Greets a user and reports whether they are an adult or a minor. */
public class ReturnName {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Hello! Please enter your name:");
        String name = scanner.nextLine();
        System.out.println("How old are you?");
        int age = scanner.nextInt();

        // if/else chooses a message by comparing the age with 18.
        if (age >= 18) {
            System.out.printf("%s, you are an adult!%n", name);
            // A for loop counts from 1 to 3 and prints one progress message per pass.
            for (int counter = 1; counter < 4; counter++) {
                System.out.printf("Step %d of 3 completed for %s.%n", counter, name);
            }
        } else {
            System.out.printf("%s, you are a minor.%n", name);
            // The same loop runs for the minor case.
            for (int counter = 1; counter < 4; counter++) {
                System.out.printf("Step %d of 3 completed for %s.%n", counter, name);
            }
        }

        scanner.close();
    }
}