package com.city.demo.service.dto;

public class RefreshRequest {
    private String refreshToken;

    public RefreshRequest(String refreshToken, String password) {
        this.refreshToken = refreshToken;
    }

    // Getters and setters
    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

}
