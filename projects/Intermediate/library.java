package Intermediate;

import java.util.ArrayList;
import java.util.Scanner;

public class library {
    public static void main(String[] args) {
        ArrayList<String> books = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        Boolean AddAgain = false; // Controls whether the book-entry loop repeats.
        // A do-while loop runs the body before checking whether to repeat.
        do {

            System.out.println("Hello, user. Add a book by typing its title below.");
            System.out.print("Book title: ");
            String nameBook = scanner.nextLine();
            books.add(nameBook);
            System.out.printf("Current library: %s\n", books);

            System.out.println("Would you like to add another? (Type true for yes or false for no.)\n");
            AddAgain = scanner.nextBoolean();
            scanner.nextLine();
        } while (AddAgain == true);

        if (AddAgain == false) {
            System.out.printf("Current library: %s\n", books);
        }
        scanner.close();
    }
}