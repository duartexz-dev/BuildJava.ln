package Advanced;

import java.util.Scanner;
import java.util.ArrayList;

public class PizzaCenter {

    public static class Pizza {

        Boolean Molho;
        Boolean Borda;
        Boolean Mussarela;
        Boolean Calabresa;
        Boolean Frango;
        String Name;

        public Pizza(Boolean Molho, Boolean Borda, Boolean Mussarela, Boolean Frango, String Name,
                Boolean Calabresa) {
            this.Molho = Molho;
            this.Borda = Borda;
            this.Mussarela = Mussarela;
            this.Calabresa = Calabresa;
            this.Frango = Frango;
            this.Name = Name;
        }

        @Override
        public String toString() {
            return "Name:" + Name +
                    "\n Frango:" + Frango +
                    "\n Calabresa:" + Calabresa +
                    "\n Mussarela:" + Mussarela +
                    "\n Borda:" + Borda;

        }

        public static void main(String[] args) {

            Scanner scanner = new Scanner(System.in);

            ArrayList<Pizza> Pedidos = new ArrayList<>();

            System.out.println("x-------------------------x");
            System.out.println("| Welcome to Pizza Center |");
            System.out.println("| Say true if you want or |");
            System.out.println("| Say false if you don´t  |");
            System.out.println("| wanna this.             |");
            System.out.println("x-------------------------x");

            System.out.println("You wanna Calabresa?");
            Boolean CalabresaOnPizza = scanner.nextBoolean();
            System.out.println("You wanna Frango?");
            Boolean FrangoOnPizza = scanner.nextBoolean();
            System.out.println("You wanna Mussarela?");
            Boolean MussarelaOnPizza = scanner.nextBoolean();
            System.out.println("You wanna Borda?");
            Boolean BordaOnPizza = scanner.nextBoolean();
            System.out.println("You wanna Molho?");
            Boolean MolhoOnPizza = scanner.nextBoolean();
            System.out.println("And Whats your name?");
            String Name = scanner.nextLine();
            scanner.nextLine();
            Pizza Pizza = new Pizza(
                    MolhoOnPizza,
                    BordaOnPizza,
                    MussarelaOnPizza,
                    FrangoOnPizza,
                    Name,
                    CalabresaOnPizza);

            Pedidos.add(Pizza);

            System.out.println(Pedidos);
            scanner.close();

        }
    }

}
