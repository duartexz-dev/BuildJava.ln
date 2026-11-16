package Intermediate;

import java.util.Scanner;

public class MoviesSystem {

    public static class ticket {
        String name;
        int seatNumber;
        String nameMovie;
        Double ticketPrice;

        public ticket(String name, int seatNumber, String nameMovie, Double ticketPrice) {
            this.name = name;
            this.ticketPrice = ticketPrice;
            this.nameMovie = nameMovie;
            this.seatNumber = seatNumber;
        }

    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String[] movies = new String[9];
        movies[0] = "Jujutsu Kaisen 0";
        movies[1] = "Naruto";
        movies[2] = "One Piece";
        movies[3] = "Avengers infinity war";
        movies[4] = "Avengers ultimate";
        movies[5] = "Avengers Domsday";
        movies[6] = "The Maze Runner";
        movies[7] = "Panic";
        movies[8] = "Spider-man brand new day";
        movies[9] = "Avenger Civil War";

        System.out.println("x----------------------------x");
        System.out.println("|    Welcome to javaCine     |");
        System.out.println("|  First step for watch your |");
        System.out.println("|Movie is wrinting your name:|");
        System.out.println("x----------------------------x");

        String nameUser = scanner.nextLine();
        scanner.nextLine();

        System.out.println("x----------------------------x");
        System.out.println("|    Now you need write      |");
        System.out.println("|  the movie you wanna watch |");
        System.out.println("|   wrinting his name here:  |");
        System.out.println("x----------------------------x");

        String nameMovie = scanner.nextLine();
        scanner.nextLine();

        System.out.println("x----------------------------x");
        System.out.println("|    Now you need select      |");
        System.out.println("| your seat in movie theater  |");
        System.out.println("|-----------------------------|");
        System.out.println("| A1 - A2 - A3 - A4 - A5 - A6 |");
        System.out.println("| B1 - B2 - B3 - B4 - B5 - B6 |");
        System.out.println("| C1 - C2 - C3 - C4 - C5 - C6 |");
        System.out.println("| D1 - D2 - D3 - D4 - D5 - D6 |");
        System.out.println("x----------------------------x");

        scanner.close();
    }

}
