package projects;

import java.util.Scanner;

public class LoginIntermediary {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // final makes these practice credentials constants that cannot be reassigned.
        final String CORRECT_EMAIL = "bananaSplit@gmail.com";
        final String CORRECT_PASSWORD = "12345678910";

        byte attempts = 0;
        boolean validLogin = false;
        // Continue while attempts remain and the credentials have not matched.
        while (attempts < 3 && !validLogin) {
            System.out.print("Enter your email:");
            String email = scanner.nextLine();
            System.out.print("And your password:");
            String password = scanner.nextLine();

            attempts++;

            // equals compares String contents; && requires both credentials to match.
            validLogin = email.equals(CORRECT_EMAIL)
                    && password.equals(CORRECT_PASSWORD);

            // The ternary operator selects the success or failure message.
            String result = validLogin
                    ? "Login sucessful"
                    : "Invalid email or password.";

            System.out.println(result);

        }

        // ! reverses the boolean; this checks whether all attempts were used without a match.
        boolean attmeptsLost = attempts == 3 && !validLogin;
        String resultAttempts = attmeptsLost
                ? "Attempts is lost , try again after"
                : "";

        System.out.println(resultAttempts);
        scanner.close();
    }

}
