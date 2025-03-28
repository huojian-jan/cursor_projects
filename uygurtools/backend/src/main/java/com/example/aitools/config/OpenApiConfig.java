package com.example.aitools.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI myOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8080");
        devServer.setDescription("服务器地址 - 开发环境");

        Contact contact = new Contact();
        contact.setEmail("info@example.com");
        contact.setName("API支持");
        contact.setUrl("https://www.example.com");

        License mitLicense = new License().name("MIT License").url("https://choosealicense.com/licenses/mit/");

        Info info = new Info()
                .title("AITools API文档")
                .version("1.0")
                .contact(contact)
                .description("这个API提供了AITools应用的所有接口信息")
                .termsOfService("https://www.example.com/terms")
                .license(mitLicense);

        return new OpenAPI().info(info).servers(List.of(devServer));
    }
} 