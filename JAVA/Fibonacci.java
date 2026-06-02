import java.util.Scanner;
import java.util.Arrays;
public class Fibonacci{
    private static int[] memo;

    public static int fib(int n){
        if (n<=1){
            return n;
        }
        if (memo[n]!=-1){
            return memo[n];
        }
        memo[n]=fib(n-1)+fib(n-2);
        return memo[n];
    }

    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter the number of terms: ");
        int n=sc.nextInt();
        memo=new int[n+1];
        Arrays.fill(memo, -1);
        System.out.println("Fibonacci sequence:");
        for (int i=0; i<n; i++){
            System.out.print(fib(i)+" ");
        }
    }
}