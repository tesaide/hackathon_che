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

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

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
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        String test = new String(user.getPassword(), StandardCharsets.UTF_8);

        Boolean isValidPassword = HashPassword.verifyPassword(test, password);
        if (!isValidPassword) {
            throw new RuntimeException("Password is not valid");
        }

        Map<String, String> claims = new HashMap<>();
        claims.put("id", user.getId().toString());

        String accessToken = jwtUtil.generateAccessToken(claims);

        String refreshToken = RefreshTokenUtil.generateAndStoreRefreshToken(user.getId().toString());
        return new TokenResponse(accessToken, refreshToken);
    }

    @Override
    public TokenResponse refresh(String refreshToken) {
        String userId = RefreshTokenUtil.getUserId(refreshToken);
        if (userId == null) {
            throw new RuntimeException("This token doesn't exist");
        }
        Optional<User> user = userRepository.findById(UUID.fromString(userId));
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }

        Map<String, String> claims = new HashMap<>();
        claims.put("id", user.get().getId().toString());

        String newAccessToken = jwtUtil.generateAccessToken(claims);

        RefreshTokenUtil.removeToken(refreshToken);
        String newRefreshToken = RefreshTokenUtil.generateAndStoreRefreshToken(user.get().getId().toString());

        return new TokenResponse(newAccessToken, newRefreshToken);
    }
}
