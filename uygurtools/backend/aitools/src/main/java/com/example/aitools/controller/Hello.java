package com.example.aitools.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Hello {


    @GetMapping("/hello")
    public String GetHello() {
        return "Hello World";
    }
}
