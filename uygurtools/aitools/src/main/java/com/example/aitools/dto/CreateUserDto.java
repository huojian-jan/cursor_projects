package com.example.aitools.dto;

import lombok.Data;

@Data
public class CreateUserDto {
    private String username;
    private String password;
    private String phone;
    private String captcha;
}
