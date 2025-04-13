package com.city.demo.service.impl;

import com.city.demo.security.HashPassword;
import com.city.demo.security.JwtUtil;
import com.city.demo.service.dto.TokenResponse;
import com.city.demo.domain.User;
import com.city.demo.repository.UserRepository;
import com.city.demo.service.AuthService;
import com.city.demo.utils.RefreshTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, JwtUtil jwtUtil){
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public TokenResponse login(String email, String password) {
        // Временная реализация
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Boolean isValidPassword = HashPassword.verifyPassword(user.getPassword().toString(), password);
        if (!isValidPassword) {
            throw new RuntimeException("Password is not valid");
        }

        Map<String, String> claims = new HashMap<>();
        claims.put("id", "testuser");

        String accessToken = jwtUtil.generateAccessToken(claims);

        String refreshToken = RefreshTokenUtil.generateAndStoreRefreshToken(user.getId().toString());
        return new TokenResponse(accessToken, refreshToken);
    }

    @Override
    public TokenResponse refresh(String refreshToken) {
        // Временная реализация
        String newAccessToken = "newGeneratedAccessToken";
        String newRefreshToken = "newGeneratedRefreshToken";
        return new TokenResponse(newAccessToken, newRefreshToken);
    }
}
