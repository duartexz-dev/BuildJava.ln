package projects.Beginner;

import java.util.Scanner;

public class TypeProfile {
    public static void main(String[] args) {
        // Scanner reads user input from the console.
        Scanner scanner = new Scanner(System.in);
        System.out.println("Hello! Please enter your name:");
        String name = scanner.nextLine(); // A String stores text.
        System.out.println("Please enter your age:");
        int age = scanner.nextInt(); // An int stores whole numbers.
        System.out.println("Please enter your height in feet:");
        double heightInFeet = scanner.nextDouble(); // A double stores numbers with decimal places.
        System.out.println("Do you drive? Enter true or false:");
        boolean drive = scanner.nextBoolean(); // A boolean stores either true or false.
        System.out.println("Finally, enter the first letter of your name:");
        char firstLetter = scanner.next().charAt(0); // A char stores a single character.

        // printf formats values with placeholders; \n starts a new line in the output.
        System.out.printf("----------%s----------\n", name);
        System.out.printf("Age : %s\n", age);
        System.out.printf("Height : %s \n", heightInFeet);
        System.out.printf("Drive : %s\n", drive);
        System.out.printf("First letter of name : %s \n", firstLetter);
        scanner.close();

    }
}
