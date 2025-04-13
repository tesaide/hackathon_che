package com.city.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;

public class JwtDecoder {
    private final SecretKey key;

    public JwtDecoder(SecretKey key) {
        this.key = key;
    }

    public Claims decode(String jwtToken) {
        if (jwtToken == null || jwtToken.trim().isEmpty()) {
            return null;
        }
        try {

            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwtToken)
                    .getBody();
        } catch (Exception e) {
            return null;
        }
    }

    public String extractData(String jwtToken, String claimKey) {
        Claims claims = decode(jwtToken);
        if (claims != null) {
            return claims.get(claimKey, String.class);
        }
        return null;
    }
}
