package projects;

import java.util.Scanner;

public class bulletin {
    public static class Student {
        // These fields store the data that belongs to one student object.
        String name;
        Double portugueseGrade;
        Double mathGrade;
        Double englishGrade;
        Double historyGrade;

        public Student(String name, Double portugueseGrade, Double mathGrade, Double englishGrade,
                Double historyGrade) {
            // this refers to the current object; assign each constructor argument to its matching field.
            this.name = name;
            this.portugueseGrade = portugueseGrade;
            this.mathGrade = mathGrade;
            this.englishGrade = englishGrade;
            this.historyGrade = historyGrade;
        }
    }

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Hello! Please enter your name. Grades must be between 10 and 100:");
        String name = scanner.nextLine();

        System.out.print("Please enter your grade in Portuguese:");
        Double portugueseGrade = scanner.nextDouble();
        System.out.print("Please enter your grade in Math:");
        Double mathGrade = scanner.nextDouble();
        System.out.print("Please enter your grade in English:");
        Double englishGrade = scanner.nextDouble();
        System.out.print("Please enter your grade in History:");
        Double historyGrade = scanner.nextDouble();

        // new creates a Student object and passes its data to the constructor.
        Student student = new Student(name, portugueseGrade, mathGrade, englishGrade, historyGrade);
        final Double passingGradeThreshold = 60.00;
        Double totalGrades = student.englishGrade + student.historyGrade + student.mathGrade + student.portugueseGrade;
        Double averageGrade = totalGrades / 4;

        // Add the four grades, divide by four, then compare the average with the passing threshold.
        boolean passed = averageGrade >= passingGradeThreshold;
        // The ternary operator chooses a message based on whether passed is true or false.
        String result = passed
                ? "Congratulations! Your average grade is " + averageGrade
                : "You did not pass. Your average grade is " + averageGrade;

        System.out.println(result);
        scanner.close();
    }
}