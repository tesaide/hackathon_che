package com.hackathon.backend.locationsservice.Domain.JSONB_POJOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contacts {
    private String phone;
    private String email;
    private String website;
}
