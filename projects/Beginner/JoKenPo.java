
import java.util.Random;
import java.util.Scanner;

public class JoKenPo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        boolean option;

        int winsComputer = 0;
        int winsUser = 0;

        System.out.println("Hello! Do you think you can beat the computer? Let's play Rock, Paper, Scissors!");
        do {
            System.out.println("Choose a number: 0 = Rock, 1 = Paper, or 2 = Scissors.");
            int userSelect = scanner.nextInt();

            // An array stores multiple values of the same type. Each value has an index
            // starting at 0, so these positions match the numbers the user can enter.
            String[] options = new String[3];
            options[0] = "Rock";
            options[1] = "Paper";
            options[2] = "Scissors";

            // nextInt(bound) returns a random integer from 0 (inclusive) to bound
            // (exclusive). Using the array length gives a valid index: 0, 1, or 2.
            int computerChoice = random.nextInt(options.length);

            System.out.println("The computer chose: " + options[computerChoice]);

            // Matching choices are a tie; otherwise, check the three winning combinations.
            if (userSelect == computerChoice) {
                System.out.println("It's a tie!");
                System.out.printf("Computer : %s User : %s\n", winsComputer, winsUser);

            } else if ((userSelect == 0 && computerChoice == 2)
                    || (userSelect == 1 && computerChoice == 0)
                    || (userSelect == 2 && computerChoice == 1)) {
                System.out.println("You win!");
                winsUser++;
                System.out.printf("Computer : %s User : %s", winsComputer, winsUser);

            } else {
                System.out.println("The computer wins!");
                winsComputer++;
                System.out.printf("Computer : %s User : %s \n", winsComputer, winsUser);
            }

            System.out.println("Do you wanna try again ? if yes write true , but you don´t wanna write false:");
            option = scanner.nextBoolean();
        } while (option == true);

        if (option == false) {
            System.out.println(
                    "Ok bro , cu.");
        }
        scanner.close();
    }
}
