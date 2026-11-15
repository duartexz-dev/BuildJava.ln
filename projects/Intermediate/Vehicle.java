package Intermediate;

import java.util.Scanner;

public class Vehicle {
    // A simple data model that groups vehicle information in one object.
    public static class vehicle {
        String name;
        int horses;
        String mark;
        String color;
        int year;

        public vehicle(String name, String mark, String color, int horses, int year) {
            this.name = name;
            this.mark = mark;
            this.year = year;
            this.horses = horses;
            this.color = color;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Step 1: ask for the vehicle year.
        // nextInt() reads only the number, but it leaves the newline in the buffer.
        // We consume that newline before asking for a text input with nextLine().
        System.out.println("x--------------------------------------x");
        System.out.println("| Welcome to build your vehicle!       |");
        System.out.println("| First, tell us the year of your       |");
        System.out.println("| vehicle, type it below:              |");
        System.out.println("x--------------------------------------x");

        int yearVehicle = scanner.nextInt();
        scanner.nextLine();

        // Step 2: ask for the vehicle name.
        System.out.println("x--------------------------------------x");
        System.out.println("| Second, tell us the name of your     |");
        System.out.println("| vehicle, type it below:              |");
        System.out.println("x--------------------------------------x");
        String nameVehicle = scanner.nextLine();

        // Step 3: ask for horsepower.
        System.out.println("x--------------------------------------x");
        System.out.println("| Third, tell us how many horsepower  |");
        System.out.println("| your vehicle has, type it below:     |");
        System.out.println("x--------------------------------------x");
        int horsesPotence = scanner.nextInt();
        scanner.nextLine();

        // Step 4: ask for the brand.
        System.out.println("x--------------------------------------x");
        System.out.println("| Fourth, tell us the brand of your   |");
        System.out.println("| vehicle, type it below:              |");
        System.out.println("x--------------------------------------x");
        String markVehicle = scanner.nextLine();

        // Step 5: ask for the color.
        System.out.println("x--------------------------------------x");
        System.out.println("| Last step: tell us the color of your |");
        System.out.println("| vehicle, type it below:              |");
        System.out.println("x--------------------------------------x");
        String colorVehicle = scanner.nextLine();

        // The object groups all the data collected in one place.
        vehicle vehicle = new vehicle(nameVehicle, markVehicle, colorVehicle, horsesPotence, yearVehicle);

        // Use the correct format specifiers for each value type.
        // %s is for strings, %d is for integer values, and %n creates a new line.
        System.out.printf(
            "Name: %s%nYear: %d%nHorse power: %d%nBrand: %s%nVehicle color: %s%n",
            nameVehicle,
            yearVehicle,
            horsesPotence,
            markVehicle,
            colorVehicle
        );

        // The object reference is printed only as a useful debug output.
        // The formatted summary above is the more readable and didactic result.
        System.out.println(vehicle);
        scanner.close();
    }
}
