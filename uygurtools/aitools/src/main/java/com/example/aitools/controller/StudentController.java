package com.example.aitools.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.aitools.entity.Student;
import com.example.aitools.mapper.StudentMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@Tag(name = "学生管理", description = "学生信息的增删改查接口")
public class StudentController {

    @Autowired
    private StudentMapper studentMapper;

    @PostMapping
    @Operation(summary = "添加学生", description = "创建一个新的学生记录")
    public boolean save(@RequestBody Student student) {
        return studentMapper.insert(student) > 0;
    }

    @PutMapping
    @Operation(summary = "更新学生", description = "根据ID更新学生信息")
    public boolean update(@RequestBody Student student) {
        return studentMapper.updateById(student) > 0;
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除学生", description = "根据ID删除学生")
    public boolean delete(@Parameter(description = "学生ID") @PathVariable Long id) {
        return studentMapper.deleteById(id) > 0;
    }

    @GetMapping("/{id}")
    @Operation(summary = "查询学生", description = "根据ID查询学生信息")
    public Student getById(@Parameter(description = "学生ID") @PathVariable Long id) {
        return studentMapper.selectById(id);
    }

    @GetMapping
    @Operation(summary = "查询所有学生", description = "获取所有学生的列表")
    public List<Student> list() {
        return studentMapper.selectList(null);
    }

    @GetMapping("/page")
    @Operation(summary = "分页查询", description = "分页获取学生列表")
    public Page<Student> page(
            @Parameter(description = "当前页码") @RequestParam(defaultValue = "1") Integer current,
            @Parameter(description = "每页大小") @RequestParam(defaultValue = "10") Integer size) {
        Page<Student> page = new Page<>(current, size);
        return studentMapper.selectPage(page, null);
    }

    @GetMapping("/search")
    @Operation(summary = "条件查询", description = "根据姓名和年龄条件查询学生")
    public List<Student> search(
            @Parameter(description = "学生姓名(模糊查询)") @RequestParam(required = false) String name,
            @Parameter(description = "学生年龄(精确查询)") @RequestParam(required = false) Integer age) {
        LambdaQueryWrapper<Student> queryWrapper = new LambdaQueryWrapper<>();
        
        if (name != null && !name.isEmpty()) {
            queryWrapper.like(Student::getName, name);
        }
        
        if (age != null) {
            queryWrapper.eq(Student::getAge, age);
        }
        
        return studentMapper.selectList(queryWrapper);
    }
}
