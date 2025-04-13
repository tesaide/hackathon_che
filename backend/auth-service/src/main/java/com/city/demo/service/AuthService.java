package com.city.demo.service;

import com.city.demo.service.dto.TokenResponse;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    TokenResponse login(String email, String password);
    TokenResponse refresh(String refreshToken);
}
