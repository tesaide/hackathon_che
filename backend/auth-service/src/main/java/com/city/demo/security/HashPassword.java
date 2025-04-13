package com.city.demo.security;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;


public class HashPassword {
//    public static String hashPassword(String password) {
//        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
//
//        int iterations = 3;
//        int memory = 65536; // 64MB
//        int parallelism = 1;
//
//        try {
//            return argon2.hash(iterations, memory, parallelism, password.toCharArray());
//        } finally {
//            argon2.wipeArray(password.toCharArray()); // Optional
//        }
//    }

    public static boolean verifyPassword(String hashedPassword, String password) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        return argon2.verify(hashedPassword, password.toCharArray());
    }

    public static void main(String[] args) {
        String rawPassword = "1234ddd";
        String HashedPassword = "$argon2id$v=19$m=65536,t=3,p=1$5a8tHxwH8HmE6h3IbmNw3A$SU0R8Pnmm8u05GVrec4aTMUgNzSK5txXPJK9NumLurE";
        boolean match = verifyPassword(HashedPassword, rawPassword);
        System.out.println("Password match: " + match);
    }
}
