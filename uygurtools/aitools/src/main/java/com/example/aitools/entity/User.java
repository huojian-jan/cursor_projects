package com.example.aitools.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("user")
@Schema(description = "用户实体类")
public class User {

    @TableId(type = IdType.ASSIGN_UUID)
    @Schema(description = "用户ID")
    private String id;

    @Schema(description = "用户名")
    private String username;

    @Schema(description = "密码")
    private String password;

    @Schema(description = "头像URL")
    private String avatar;

    @Schema(description = "电子邮箱")
    private String email;

    @Schema(description = "手机号码")
    private String phone;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

    @Schema(description = "更新时间")
    private LocalDateTime updateTime;
}