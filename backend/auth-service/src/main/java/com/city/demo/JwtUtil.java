package com.city.demo;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Date;
import java.util.Map;

public class JwtUtil {
    private final Algorithm algorithm;
    private final String issuer;

    public JwtUtil(String secretKey, String issuer) {
        this.algorithm = Algorithm.HMAC256(secretKey); // Шифруем секрет
        this.issuer = issuer; // Имя сервиса или приложения
    }

    public Algorithm getAlgorithm() {
        return algorithm;
    }

    public String getIssuer() {
        return issuer;
    }

    // Метод для генерации токена
    public String generateToken(Map<String, String> claims) {
        var jwtBuilder = JWT.create().withIssuer(issuer);
        claims.forEach(jwtBuilder::withClaim);

        // Устанавливаем время истечения токена (15 минут)
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 15 * 60 * 1000); // 15 минут в миллисекундах
        jwtBuilder.withIssuedAt(now).withExpiresAt(expiration);

        return jwtBuilder.sign(algorithm);
    }
}
