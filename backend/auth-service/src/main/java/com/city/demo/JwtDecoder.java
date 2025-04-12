package com.city.demo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

public class JwtDecoder {
    private final SecretKey key;

    public JwtDecoder(SecretKey key) {
        this.key = key;
    }

    // Метод для декодирования токена и получения Claims
    public Claims decode(String jwtToken) {
        if (jwtToken == null || jwtToken.trim().isEmpty()) {
            System.err.println("Ошибка: токен не может быть пустым.");
            return null;
        }
        try {

            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwtToken)
                    .getBody();
        } catch (Exception e) {
            System.err.println("Ошибка при декодировании токена: " + e.getMessage());
            return null;
        }
    }

    // Метод для извлечения конкретного значения из токена
    public String extractData(String jwtToken, String claimKey) {
        Claims claims = decode(jwtToken);
        if (claims != null) {
            return claims.get(claimKey, String.class);
        }
        return null;
    }
}
