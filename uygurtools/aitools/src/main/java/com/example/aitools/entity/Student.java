package com.example.aitools.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@TableName("student")
@NoArgsConstructor
@Schema(description = "学生实体类")
public class Student {
    @TableId(type = IdType.AUTO)
    @Schema(description = "学生ID")
    private Long id;
    
    @Schema(description = "学生姓名")
    private String name;
    
    @Schema(description = "学生年龄")
    private Integer age;
}
