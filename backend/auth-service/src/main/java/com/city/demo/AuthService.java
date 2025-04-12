package com.city.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public ResponseEntity<TokenResponse> login(String login, String password) {
        // Временная реализация
        String accessToken = "generatedAccessToken";
        String refreshToken = "generatedRefreshToken";
        return ResponseEntity.ok(new TokenResponse(accessToken, refreshToken));
    }

    public TokenResponse refresh(String refreshToken) {
        // Временная реализация
        String newAccessToken = "newGeneratedAccessToken";
        String newRefreshToken = "newGeneratedRefreshToken";
        return new TokenResponse(newAccessToken, newRefreshToken);
    }
}
