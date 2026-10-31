package projects;

import java.util.Scanner;

public class DrivingCarWallet {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("How old are you?");
        int age = scanner.nextInt();
        // Consume the leftover newline so nextLine() can read the name.
        scanner.nextLine();
        System.out.println("Let's see if you are old enough to drive.");
        System.out.println("What's your name?");
        String name = scanner.nextLine();

        // The comparison checks whether the entered age meets the program's threshold.
        if (age >= 18) {
            System.out.printf("Okay, %s. You are %d years old and can drive.%n", name, age);
        } else {
            System.out.printf("Okay, %s. You are %d years old and are not old enough to drive.%n", name, age);
        }

        scanner.close();
    }
}
