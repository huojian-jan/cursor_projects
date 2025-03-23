import { users } from '../data/userData';

// 用户类型定义
export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  createdAt: string;
  lastLogin: string;
  vipExpiry?: string;
}

// 登录响应类型定义
export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
}

/**
 * 模拟登录验证
 * @param username 用户名、邮箱或手机号
 * @param password 密码
 * @returns Promise<LoginResponse>
 */
export const login = (username: string, password: string): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    // 模拟网络延迟
    setTimeout(() => {
      try {
        // 在用户数据中查找匹配的用户
        const user = users.find(
          u => (u.username === username || u.email === username || u.phone === username) && 
               u.password === password
        );
        
        if (user) {
          // 登录成功，返回不包含密码的用户信息
          const { password, ...userInfo } = user;
          
          // 更新最后登录时间
          const updatedUser = {
            ...userInfo,
            lastLogin: new Date().toISOString()
          };
          
          // 将用户信息存储到本地存储
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          
          resolve({
            success: true,
            message: '登录成功',
            user: updatedUser as User
          });
        } else {
          // 登录失败
          resolve({
            success: false,
            message: '用户名或密码错误'
          });
        }
      } catch (error) {
        reject({
          success: false,
          message: '登录过程中发生错误'
        });
      }
    }, 800); // 模拟网络延迟
  });
};

/**
 * 检查用户是否已登录
 * @returns User | null
 */
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  if (userJson) {
    try {
      return JSON.parse(userJson) as User;
    } catch (e) {
      return null;
    }
  }
  return null;
};

/**
 * 退出登录
 */
export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

// 模拟注册方法 - 增强版，将新用户添加到内存中
export const mockRegister = (userData: any): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // 检查用户名或手机号是否已存在
        const existingUser = users.find(
          u => u.username === userData.username || u.phone === userData.phone
        );

        if (existingUser) {
          if (existingUser.username === userData.username) {
            resolve({ success: false, message: '用户名已存在' });
          } else {
            resolve({ success: false, message: '手机号已注册' });
          }
          return;
        }

        // 创建新用户对象
        const newUser = {
          id: (users.length + 1).toString(),
          username: userData.username,
          password: userData.password, // 注意：实际应用中应该对密码进行加密
          email: "", // 如果表单中有邮箱，可以添加
          phone: userData.phone,
          avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
          role: "user",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };

        // 添加新用户到用户数组
        users.push(newUser);

        // 可以在控制台打印当前用户列表，便于调试
        console.log('当前用户列表:', users);

        // 模拟将用户数据保存到db.txt（在实际应用中，这需要通过API请求服务器来完成）
        console.log('已将新用户保存到db.txt');
        
        // 模拟成功注册
        resolve({ 
          success: true, 
          message: '注册成功！请使用新账号登录' 
        });
      } catch (error) {
        reject({ success: false, message: '注册过程中发生错误' });
      }
    }, 1000);
  });
}; 