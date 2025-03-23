package com.example.aitools.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "首页", description = "首页API")
public class HomeController {

    @Operation(summary = "获取欢迎信息", description = "返回一个简单的欢迎信息字符串")
    @GetMapping("/")
    public String home() {
        return "Welcome to AITools API!";
    }
} 