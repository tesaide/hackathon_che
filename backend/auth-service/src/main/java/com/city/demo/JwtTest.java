package com.city.demo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.HashMap;
import java.util.Map;

public class JwtTest {
    public static void main(String[] args) {
        // 1. Generate a secret key
        String secret = "my-very-secret-key-that-is-32-bytes-long!";
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

        // 2. Create an instance of JwtUtil
        JwtUtil jwtUtil = new JwtUtil(secret, "example-app");

        // 3. Generate a token
        Map<String, String> claims = new HashMap<>();
        claims.put("username", "testuser");
        claims.put("role", "admin");
        String token = jwtUtil.generateToken(claims);
        System.out.println("Generated token: " + token);

        // 4. Decode the token
        JwtDecoder decoder = new JwtDecoder(key);
        System.out.println("\nDecode result:");
        Claims decodedClaims = decoder.decode(token);
        if (decodedClaims != null) {
            System.out.println("Subject: " + decodedClaims.getSubject());
            System.out.println("Username: " + decodedClaims.get("username"));
            System.out.println("Role: " + decodedClaims.get("role"));
        }
    }
}
