package com.example.aitools.controller;

import com.example.aitools.service.AIService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TestApiController.class)
public class TestApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AIService aiService;

    @Test
    public void testGetEndpoint() throws Exception {
        mockMvc.perform(get("/api/test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.message").value("Test API is working"))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    public void testProcessEndpoint() throws Exception {
        when(aiService.processAIRequest(anyString())).thenReturn("Processed: test data");

        mockMvc.perform(post("/api/test/process")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"input\":\"test data\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.result").value("Processed: test data"))
                .andExpect(jsonPath("$.originalInput").value("test data"));
    }

    @Test
    public void testEchoEndpoint() throws Exception {
        mockMvc.perform(get("/api/test/echo/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string("Echo: hello"));
    }
} 