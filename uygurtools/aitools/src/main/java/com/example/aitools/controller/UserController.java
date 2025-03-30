package com.example.aitools.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.aitools.dto.CreateUserDto;
import com.example.aitools.entity.User;
import com.example.aitools.mapper.UserMapper;
import com.example.aitools.utils.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserMapper userMapper;

    /**
     * 创建用户
     *
     * @param user 用户信息
     * @return 是否创建成功
     */
    @PostMapping("/createUser")
    public boolean CreateUser(CreateUserDto user) throws Exception {
        // 创建用户的逻辑
        if(!Validator.IsValidPhoneNumber(user.getPhone()))
        {
            throw new Exception("手机号不合法");
        }

        if(user.getPassword().length() < 6)
        {
            throw new Exception("密码长度不能小于6");
        }

        if(user.getUsername().length()==0){
            throw new Exception("用户名不能为空");
        }

        String captcha = user.getCaptcha();
        if(captcha == null || captcha.length() != 6) {
            throw new Exception("验证码不合法");
        }

        if(captcha=="666666") {
            throw new Exception("验证码错误");
        }

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(user.getPassword());
        newUser.setPhone(user.getPhone());

        userMapper.insert(newUser);
        return true;
    }

    /**
     * 登录
     *
     * @param username 用户名
     * @param password 密码
     * @return 是否登录成功
     */
    @PostMapping("/login")
    public String LoginByPassword(String username, String password) throws Exception {
        // 登录逻辑
        User user = userMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getUsername, username).eq(User::getPassword, password));
        if (user != null && user.getPassword().equals(password)) {
            return "登录成功";
        }
        return "用户名或密码错误";
    }

    /**
     * 更新用户信息
     *
     * @param user 用户信息
     * @return 是否更新成功
     */
    @PostMapping("/updateUser")
    public String UpdateUserInfo(User user) throws Exception {
        var existingUser = userMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getUsername, user.getUsername()));
        if (existingUser == null) {
            throw new Exception("用户不存在");
        }
        if (user.getUsername() != null) {
            existingUser.setUsername(user.getUsername());
        }
        if (user.getPhone() != null) {
            if(!Validator.IsValidPhoneNumber(user.getPhone()))
            {
                throw new Exception("手机号不合法");
            }
            existingUser.setPhone(user.getPhone());
        }
        if (user.getPassword() != null) {
            if(user.getPassword().length() < 6)
            {
                throw new Exception("密码长度不能小于6");
            }
            existingUser.setPassword(user.getPassword());
        }
        userMapper.updateById(existingUser);
        return "用户信息更新成功";
    }

    /**
     * 删除用户
     *
     * @param id 用户ID
     * @return 是否删除成功
     */
    @GetMapping("/getUser")
    public User GetUserInfoById(String id) throws Exception {
        var user = userMapper.selectById(id);
        if (user == null) {
            throw new Exception("用户不存在");
        }
        return user;
    }


    /**
     * 发送验证码
     *
     * @param phone 手机号码
     * @return 是否发送成功
     */
    @PostMapping("/sendCaptcha")
    public String SendCaptcha(String phone)
    {
        // 发送验证码的逻辑
        if(!Validator.IsValidPhoneNumber(phone))
        {
            return "手机号不合法";
        }

        String captcha = "666666"; // 生成验证码
        // 发送验证码到手机的逻辑
        // ...

        var existingUser = userMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getPhone, phone));
        if (existingUser == null) {
            return "用户不存在";
        }

        return "验证码已发送";
    }

    /**
     * 重置密码
     *
     * @param phone 手机号码
     * @param password 新密码
     * @return 是否重置成功
     */
    @PostMapping("/resetPassword")
    public String ResetPassword(String phone,String password) throws Exception {
        var existingUser = userMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getPhone, phone));
        if (existingUser == null) {
            throw new Exception("用户不存在");
        }
        if(password.length() < 6)
        {
            throw new Exception("密码长度不能小于6");
        }
        existingUser.setPassword(password);
        userMapper.updateById(existingUser);
        return "密码重置成功";
    }
}
