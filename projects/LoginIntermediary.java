package projects;

import java.util.Scanner;

public class LoginIntermediary {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        final String CORRECT_EMAIL = "bananaSplit@gmail.com";
        final String CORRECT_PASSWORD = "12345678910";

        byte attempts = 0;
        boolean validLogin = false;
        while (attempts < 3 && !validLogin) {
            System.out.print("Enter your email:");
            String email = scanner.nextLine();
            System.out.print("And your password:");
            String password = scanner.nextLine();

            attempts++;

            validLogin = email.equals(CORRECT_EMAIL)
                    && password.equals(CORRECT_PASSWORD);

            String result = validLogin
                    ? "Login sucessful"
                    : "Invalid email or password.";

            System.out.println(result);

        }

        boolean attmeptsLost = attempts == 3 && !validLogin;
        String resultAttempts = attmeptsLost
                ? "Attempts is lost , try again after"
                : "";

        System.out.println(resultAttempts);
        scanner.close();
    }

}
