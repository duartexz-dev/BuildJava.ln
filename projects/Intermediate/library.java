package projects.Intermediate;

import java.util.ArrayList;
import java.util.Scanner;

public class library {
    public static void main(String[] args) {
        ArrayList<String> books = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        Boolean AddAgain = false; // atribui o valor false á variável usando =
        do {// aqui eu condicionei usando == para ver se é igual

            System.out.println("olá usuário , adicione um livre escrevendo seu nome abaixo");
            System.out.print("Nome:");
            String nameBook = scanner.nextLine();
            books.add(nameBook);
            System.out.printf("biblioteca atual:%s\n", books);

            System.out.println("Quer adicionar mais um ?(Escreva true para sim e false para não.)\n");
            AddAgain = scanner.nextBoolean();
            scanner.nextLine();
        } while (AddAgain == true);

        if (AddAgain == false) {
            System.out.printf("biblioteca atual:%s\n", books);
        }
        scanner.close();
    }
}