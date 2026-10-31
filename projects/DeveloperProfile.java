package projects;

import java.util.Scanner;

import java.util.ArrayList;

public class DeveloperProfile {
    public static class developerProfile {
        // ArrayList<String> stores a resizable list of project names.
        String name;
        String FavoriteLanguage;
        ArrayList<String> projects;

        public developerProfile(String name, String favoriteLanguage) {
            this.name = name;
            // Create an empty list for the profile's projects.
            this.projects = new ArrayList<>();
            this.FavoriteLanguage = favoriteLanguage;

        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Hello user , enter your name:");
        String name = scanner.nextLine();

        System.out.println("Now enter your favorite programming laguage");
        String favoriteLanguage = scanner.nextLine();

        System.out.println("if you have a project , write true , but you no have write false:");
        String respost = scanner.nextLine();

        developerProfile profile = new developerProfile(name, favoriteLanguage);

        // Repeat while the answer is "true", ignoring differences in letter case.
        while (respost.equalsIgnoreCase("true")) {
            System.out.println("So , say a your project name :");
            String nameProject = scanner.nextLine();

            // add appends the new project name to the ArrayList.
            profile.projects.add(nameProject);

            System.out.println("if you have another project , write true , but you no have write false:");
            respost = scanner.nextLine();
        }
        ;
        scanner.close();

        System.out.println("\n================================");
        System.out.println("       YOUR DEVELOPER PROFILE");
        System.out.println("================================");

        System.out.printf("name:%s \n", name);
        System.out.printf("Projects[%s]:\n", profile.projects.size());

        // The enhanced for loop visits each stored project once.
        for (String project : profile.projects) {
            System.out.printf(" - %s \n", project);
        }

        System.out.printf("Favorite Language : %s \n", profile.FavoriteLanguage);
    }
}
