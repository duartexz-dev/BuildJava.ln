package Intermediate;

import java.util.Scanner;
import java.util.Arrays;
import java.util.Random;

public class MoviesSystem {

    // A ticket object groups the customer, movie, seat, and formatted price.
    public static class ticket {
        String name;
        String seatNumber;
        String nameMovie;
        String ticketPrice;

        // The constructor copies each supplied value into the matching ticket field.
        public ticket(String name, String seatNumber, String nameMovie, String ticketPrice) {
            this.name = name;
            this.ticketPrice = ticketPrice;
            this.nameMovie = nameMovie;
            this.seatNumber = seatNumber;
        }

        @Override
        // toString() defines the multi-line text printed for a ticket object.
        public String toString() {
            return "Name:" + name +
                    "\n Movie:" + nameMovie +
                    "\n Seat:" + seatNumber +
                    "\n Ticket Price:" + ticketPrice;
        }

    }

    public static void main(String[] args) {

        Random random = new Random();

        // These arrays contain the fixed choices used for prices and seat parts.
        String[] prices = { "15,50$", "25,00$", "32,45$" };
        String[] CharSeats = { "A", "B", "C", "D", "F" };
        String[] NumberSeats = { "1", "2", "3", "4", "5" };

        Scanner scanner = new Scanner(System.in);
        // Only titles that exactly match an entry in this array are accepted.
        String[] movies = { "Jujutsu Kaisen 0", "Avengers DomsDay", "Avengers infinite War", "Panic",
                "The Maze Runner" };

        System.out.println("x----------------------------x");
        System.out.println("|    Welcome to javaCine     |");
        System.out.println("|  First step for watch your |");
        System.out.println("|Movie is wrinting your name:|");
        System.out.println("x----------------------------x");

        String nameUser = scanner.nextLine();

        System.out.println("x----------------------------x");
        System.out.println("|    Now you need write      |");
        System.out.println("|  the movie you wanna watch |");
        System.out.println("|   wrinting his name here:  |");
        System.out.println("x----------------------------x");

        String nameMovie = scanner.nextLine();

        // asList() exposes the movie array as a list so contains() can check the title.
        while (Arrays.asList(movies).contains(nameMovie)) {

            System.out.println("x----------------------------x");
            System.out.println("|    Ok , now let´s see      |");
            System.out.println("|  Your seat and price movie |");
            System.out.println("|  ........................  |");
            System.out.println("x----------------------------x");

            // nextInt(bound) returns an index from 0 up to (but not including) the array length.
            int PriceTicketIndex = random.nextInt(prices.length);
            String PriceTicket = prices[PriceTicketIndex];

            String CharSeatsSelected = CharSeats[random.nextInt(CharSeats.length)];
            String NumberSeatsSelected = NumberSeats[random.nextInt(NumberSeats.length)];

            // Concatenate the selected letter and number to create the seat label.
            String Seat = CharSeatsSelected + NumberSeatsSelected;

            ticket ticket = new ticket(nameUser, Seat, nameMovie, PriceTicket);

            System.out.println(ticket);
            break;
        }
        ;
        scanner.close();
    }

}
