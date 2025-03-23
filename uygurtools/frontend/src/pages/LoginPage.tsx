import React, { useState } from 'react';
import { 
  Form, Input, Button, Checkbox, Card, Typography, message, Alert, Row, Col, Divider 
} from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (values: any) => {
    setLoading(true);
    setLoginError(null);
    
    try {
      // 这里只是模拟登录过程，后续可以替换为实际的API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 简单的模拟验证 - 后续替换为实际API
      if (values.username === 'admin' && values.password === 'password') {
        message.success('登录成功！');
        navigate('/'); // 登录成功后返回首页
      } else {
        setLoginError('用户名或密码错误');
      }
    } catch (error) {
      setLoginError('登录失败，请稍后再试');
      console.error('登录错误:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Row justify="center" className="w-full">
        <Col xs={22} sm={16} md={12} lg={8} xl={6}>
          <Card className="shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <div className="text-center mb-6">
                <Link to="/" className="inline-block mb-6">
                  <img src="/resource/images/sheep.png" alt="Logo" className="h-16 mx-auto" />
                </Link>
                <Title level={2} className="mb-1">欢迎登录</Title>
                <Text type="secondary">登录您的账号以使用所有功能</Text>
              </div>

              {loginError && (
                <Alert 
                  message={loginError} 
                  type="error" 
                  showIcon 
                  className="mb-4" 
                  closable 
                  onClose={() => setLoginError(null)}
                />
              )}

              <Form
                form={form}
                name="login"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
              >
                <Form.Item
                  name="username"
                  label="用户名/手机号"
                  rules={[{ required: true, message: '请输入用户名或手机号' }]}
                >
                  <Input 
                    prefix={<UserOutlined className="text-gray-400" />} 
                    placeholder="请输入用户名或手机号" 
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="密码"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password 
                    prefix={<LockOutlined className="text-gray-400" />} 
                    placeholder="请输入密码" 
                    size="large"
                  />
                </Form.Item>

                <div className="flex justify-between mb-4">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                  </Form.Item>
                  <Link to="/forgot-password" className="text-primary hover:underline">
                    忘记密码？
                  </Link>
                </div>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large" 
                    block 
                    loading={loading}
                    className="h-11"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>

              <Divider plain>
                <Text type="secondary">或者</Text>
              </Divider>

              <div className="text-center mt-4">
                <Text type="secondary">还没有账号？</Text>
                <Link to="/register" className="text-primary ml-1 hover:underline">
                  立即注册
                </Link>
              </div>
            </div>
          </Card>

          <div className="text-center mt-6 text-gray-500 text-sm">
            <Text type="secondary">© {new Date().getFullYear()} AI工具集. 保留所有权利</Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage; 