package com.city.demo.utils;


import redis.clients.jedis.Jedis;

public class valkeyclass {
    private static final Jedis jedis;

    static {
        jedis = new Jedis("192.168.1.174", 6379); // заміни при потребі
        jedis.select(4); // використовуємо БД №4
        System.out.println("✅ Connected to Valkey (DB 4)");
    }

    // Зберегти токен з TTL
    public static void saveToken(String userId, String token, long ttlSeconds) {
        jedis.setex(token, (int) ttlSeconds, userId);
    }

    // Отримати токен
    public static String userId(String token) {
        return jedis.get(token);
    }

    // Видалити токен
    public static void deleteToken(String token) {
        jedis.del(token);
    }
}
