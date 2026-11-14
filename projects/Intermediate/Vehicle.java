package Intermediate;

import java.util.Scanner;

public class Vehicle {

    public static class VehicleInfo {
        private final String name;
        private final String brand;
        private final String color;
        private final int horsepower;
        private final int year;

        public VehicleInfo(String name, String brand, String color, int horsepower, int year) {
            this.name = name;
            this.brand = brand;
            this.color = color;
            this.horsepower = horsepower;
            this.year = year;
        }

        @Override
        public String toString() {
            return String.format(
                    "Vehicle: %s%nYear: %d%nHorsepower: %d hp%nBrand: %s%nColor: %s",
                    name, year, horsepower, brand, color);
        }
    }

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Vehicle year: ");
            int year = scanner.nextInt();
            scanner.nextLine();

            System.out.print("Vehicle name: ");
            String name = scanner.nextLine();

            System.out.print("Horsepower: ");
            int horsepower = scanner.nextInt();
            scanner.nextLine();

            System.out.print("Brand: ");
            String brand = scanner.nextLine();

            System.out.print("Color: ");
            String color = scanner.nextLine();

            VehicleInfo vehicle = new VehicleInfo(name, brand, color, horsepower, year);
            System.out.println();
            System.out.println(vehicle);
        }
    }
}
