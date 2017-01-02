// Question5: What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

/* In order for a number N to be evenly divisible by a number D,
 *   N must be a multiple of D, or, rather, there exists some number F such that
 *   N = D*F.
 * Therefore the prime factorization of D is a subset of the prime factorization of N.
 * The smallest number divisible by each of the natural numbers [1,20] must
 *   therefore be the number whose prime factorization is a super set of each of
 *   the prime factorizations of the those numbers, and containing no other factors.
 * This can be calculated by hand.
 
P(1)  = [1];
P(2)  = [2];
P(3)  = [3];
P(4)  = [2,2];
P(5)  = [5];
P(6)  = [2,3];
P(7)  = [7];
P(8)  = [2,2,2];
P(9)  = [3,3];
P(10) = [2,5];
P(11) = [11];
P(12) = [2,2,3];
P(13) = [13];
P(14) = [2,7];
P(15) = [3,5];
P(16) = [2,2,2,2];
P(17) = [17];
P(18) = [2,3,3];
P(19) = [19];
P(20) = [2,2,5];

 * Some requirements are duplicates, such as how both P(2) and P(4) are subsets
 *   of P(16).
 * Eliminating these requirements results in a list of prime factors as follows:
 *   [2,2,2,2,3,3,5,7,11,13,17,19]
 * The number with this prime factorization is: 232792560
 */

function return232792560(){
    return 232792560;
}
console.log(return232792560());