package com.city.demo.controller;

import com.city.demo.service.impl.AuthServiceImpl;
import com.city.demo.service.dto.LoginRequest;
import com.city.demo.service.dto.TokenResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthServiceImpl authService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        logger.info("Login request: {}", request);

        TokenResponse res = authService.login(request.getLogin(), request.getPassword());

        Cookie cookie = new Cookie("refreshToken", res.getRefreshToken());
        cookie.setPath("/");
        // TODO: Change to the refresh token ttl value
        cookie.setMaxAge(420);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@RequestBody TokenResponse request, HttpServletResponse response) {
        TokenResponse res = authService.refresh(request.getRefreshToken());

        Cookie cookie = new Cookie("refreshToken", res.getRefreshToken());
        cookie.setPath("/");
        // TODO: Change to the refresh token ttl value
        cookie.setMaxAge(420);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        return ResponseEntity.ok(res);
    }
}
