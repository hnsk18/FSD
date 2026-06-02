import java.util.*;
public class Guess{
    public static void main(String... args){
        Scanner sc=new Scanner(System.in);
        Random rand=new Random();
        int tar=rand.nextInt(100)+1;   
        System.out.println("Guess the number between 1 and 100:");
        int guess=sc.nextInt();
        while (guess!=tar){
            if (guess<tar){
                System.out.println("Too low! Try again:");
            }
            else{
                System.out.println("Too high! Try again:");
            }
            guess=sc.nextInt();
        }
        System.out.println("Congratulations! You guessed the number!");
    }
}