package com.example.aitools.controller;

import com.example.aitools.service.AIService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@Tag(name = "测试API", description = "用于测试的API端点")
public class TestApiController {

    private final AIService aiService;

    @Autowired
    public TestApiController(AIService aiService) {
        this.aiService = aiService;
    }

    @Operation(summary = "测试GET请求", description = "返回一个包含状态、消息和时间戳的响应")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "成功获取测试数据")
    })
    @GetMapping
    public ResponseEntity<Map<String, Object>> testGet() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Test API is working");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "处理数据", description = "接收输入并返回处理结果")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "数据处理成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误", 
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    @PostMapping("/process")
    public ResponseEntity<Map<String, Object>> processData(@RequestBody Map<String, String> request) {
        String input = request.getOrDefault("input", "");
        String result = aiService.processAIRequest(input);
        
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("result", result);
        response.put("originalInput", input);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "回显消息", description = "回显路径参数中的消息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "成功回显消息")
    })
    @GetMapping("/echo/{message}")
    public ResponseEntity<String> echoMessage(
            @Parameter(description = "要回显的消息") @PathVariable String message) {
        return ResponseEntity.ok("Echo: " + message);
    }
} 