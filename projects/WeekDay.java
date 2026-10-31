package projects;

import java.util.Scanner;

public class WeekDay {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a number from 1 to 7 to find the corresponding day of the week:");
        int number = scanner.nextInt();
        // switch selects the case matching the number; break prevents fall-through to the next case.
        switch (number) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
                break;
            case 7:
                System.out.println("Sunday");
                break;

            default:
                // default handles numbers that do not match any weekday.
                System.out.println("You entered an invalid number.");
                break;
        }
        scanner.close();

    }
}
