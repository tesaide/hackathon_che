package com.hackathon.backend.locationsservice.Controllers;

import com.hackathon.backend.locationsservice.Services.LocationService;
import com.hackathon.backend.locationsservice.Services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/locations/{locationId}/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final LocationService locationService;
}
