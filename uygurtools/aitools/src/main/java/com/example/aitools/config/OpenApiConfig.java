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
        devServer.setDescription("开发环境");

        Contact contact = new Contact();
        contact.setEmail("your-email@example.com");
        contact.setName("Your Name");
        contact.setUrl("https://www.example.com");

        License license = new License()
                .name("Apache 2.0")
                .url("https://www.apache.org/licenses/LICENSE-2.0");

        Info info = new Info()
                .title("学生管理系统 API")
                .version("1.0.0")
                .contact(contact)
                .description("这是使用 SpringDoc OpenAPI 创建的学生管理系统 API 文档")
                .license(license);

        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer));
    }
} 