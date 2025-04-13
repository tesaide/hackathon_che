package com.city.demo.utils;

import java.util.UUID;

public class RefreshTokenUtil {

    private static final long TOKEN_EXPIRATION_SECONDS = 7 * 24 * 60 * 60; // 7 днів

    // Генерація та збереження токена
    public static String generateAndStoreRefreshToken(String userId) {
        String refreshToken = UUID.randomUUID().toString();
        valkeyclass.saveToken(userId, refreshToken, TOKEN_EXPIRATION_SECONDS);
        System.out.println("🔐 Generated Refresh Token for " + userId + ": " + refreshToken);
        return refreshToken;
    }

    // Отримання токена з кешу
    public static String getUserId(String token) {
        return valkeyclass.userId(token);
    }

    // Видалення токена вручну
    public static void removeToken(String token) {
        valkeyclass.deleteToken(token);
    }

    // Тестування
    public static void main(String[] args) {
        String userId = "user123";
        String token = generateAndStoreRefreshToken(userId);

        String cachedUserId = getUserId(token);
        System.out.println("🧠 Cached userId: " + cachedUserId);

        String mustBeNull = getUserId("invalidToken");
        System.out.println("🧠 Cached userId for invalid token: " + mustBeNull);
    }
}
