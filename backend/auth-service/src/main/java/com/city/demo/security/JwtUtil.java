package com.city.demo.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.city.demo.utils.PemUtils;
import org.springframework.stereotype.Component;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {
    private final Algorithm algorithm;
    private final String issuer;

    private final RSAPublicKey PUBLIC_KEY;
    private final RSAPrivateKey PRIVATE_KEY;

    public JwtUtil() {
        try {
            PUBLIC_KEY = PemUtils.loadPublicKey("src/main/resources/public.pem");
            PRIVATE_KEY = PemUtils.loadPrivateKey("src/main/resources/private.pem");
        } catch (Exception e) {
            throw new RuntimeException("Failed to load RSA keys", e);
        }
        this.algorithm = Algorithm.RSA256(PUBLIC_KEY, PRIVATE_KEY); // Шифруем секрет
        this.issuer = "auth"; // Имя сервиса или приложения
    }

    public Algorithm getAlgorithm() {
        return algorithm;
    }

    public String getIssuer() {
        return issuer;
    }

    // Метод для генерации токена
    public String generateAccessToken(Map<String, String> claims) {
        var jwtBuilder = JWT.create().withIssuer(issuer);
        claims.forEach(jwtBuilder::withClaim);

        // Устанавливаем время истечения токена (15 минут)
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 15 * 60 * 1000); // 15 минут в миллисекундах
        jwtBuilder.withIssuedAt(now).withExpiresAt(expiration);

        return jwtBuilder.sign(algorithm);
    }
}
