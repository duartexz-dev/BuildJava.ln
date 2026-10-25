package projects;

import java.util.Scanner;

public class loginSystem {
    public static void main(String[] args) {
        int errors = 0;
        Scanner scanner = new Scanner(System.in);

        while (errors < 3) {
            System.out.println("Hello! Please provide two things: first, your email:");
            String email = scanner.nextLine();

            System.out.println("Now, enter your password:");
            String password = scanner.nextLine();

            if (email.contains("@") && password.length() >= 8) {
                System.out.println("Login successful!");
                break;
            } else {
                System.out.println("Invalid email or password. Please try again.");
                errors++;
            }

            if (errors == 3) {
                System.out.println("You have reached the maximum number of attempts. Access denied.");
            }
        }

        scanner.close();
    }
}
