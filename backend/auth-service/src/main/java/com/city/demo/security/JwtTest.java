package com.city.demo.security;

import com.city.demo.utils.PemUtils;
import io.jsonwebtoken.Claims;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.HashMap;
import java.util.Map;

public class JwtTest {

    private final static String PRIVATE_KEY_PATH = "private.pem";
    private final static String PUBLIC_KEY_PATH = "public.pem";

    public static void main(String[] args) {
        // 1. Generate a secret key
        try {
            RSAPublicKey publicKey = PemUtils.loadPublicKey(PUBLIC_KEY_PATH);
            RSAPrivateKey privateKey = PemUtils.loadPrivateKey(PRIVATE_KEY_PATH);

            // 2. Create an instance of JwtUtil
            JwtUtil jwtUtil = new JwtUtil();

            // 3. Generate a token
            Map<String, String> claims = new HashMap<>();
            claims.put("username", "testuser");
            claims.put("role", "admin");
            String token = jwtUtil.generateAccessToken(claims);
            System.out.println("Generated token: " + token);
        } catch (Exception e) {
            System.out.println(":C");
        }

    }
}
