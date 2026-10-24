
package projects;

import java.util.Scanner;

/**
 * ReturnName
 */
public class ReturnName {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Hello user , say your name pls:");
        var name = scanner.nextLine();
        System.out.println("And you age ?");
        int age = scanner.nextInt();

        if (age >= 18) {
            System.out.printf("%s you are a adult!\n", name);
            for (int counter = 1; counter < 4; counter++) {
                System.out.printf("%s System finished.%s\n", name, counter);
            }
        } else {
            System.out.printf("%s you are a kid", name);
            for (int counter = 1; counter < 4; counter++) {
                System.out.printf("%s System finished %s \n", name, counter);
            }
            scanner.close();
        }

    }
}