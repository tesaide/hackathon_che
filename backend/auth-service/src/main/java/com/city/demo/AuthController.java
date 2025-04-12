package com.city.demo;

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
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        logger.info("Login request: {}", request);
        return authService.login(request.getLogin(), request.getPassword());
    }

    @PostMapping("/refresh")
    public TokenResponse refresh(@RequestBody TokenResponse request) {
        return authService.refresh(request.getRefreshToken());
    }
}
