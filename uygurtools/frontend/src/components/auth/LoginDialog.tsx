import React, { useState } from 'react';
import { Modal, Form, Input, Button, Checkbox, Divider, Typography, message, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { login } from '../../utils/auth';

const { Text } = Typography;

interface LoginDialogProps {
  visible: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ visible, onClose, onLoginSuccess, onSwitchToRegister, onSwitchToForgotPassword }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (values: any) => {
    setLoading(true);
    setLoginError(null);
    
    try {
      // 使用验证工具进行登录验证
      const response = await login(values.username, values.password);
      
      if (response.success) {
        message.success(response.message);
        form.resetFields();
        onClose();
        
        // 如果提供了登录成功回调，则调用它
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setLoginError(response.message);
      }
    } catch (error) {
      setLoginError('登录失败，请稍后再试');
      console.error('登录错误:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setLoginError(null);
    onClose();
  };

  return (
    <Modal
      title="账号登录"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={400}
      destroyOnClose={true}
      className="login-dialog"
      centered
    >
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
        name="loginForm"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名或手机号' }]}
        >
          <Input 
            prefix={<UserOutlined className="text-gray-400" />} 
            placeholder="用户名/手机号/邮箱" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password 
            prefix={<LockOutlined className="text-gray-400" />} 
            placeholder="密码" 
            size="large"
          />
        </Form.Item>

        <div className="flex justify-between mb-4">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Button 
            type="link" 
            className="p-0 text-primary hover:underline"
            onClick={() => {
              handleCancel();
              onSwitchToForgotPassword();
            }}
          >
            忘记密码？
          </Button>
        </div>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            block 
            loading={loading}
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
        <Button 
          type="link" 
          className="p-0 ml-1"
          onClick={() => {
            handleCancel();
            onSwitchToRegister();
          }}
        >
          立即注册
        </Button>
      </div>
    </Modal>
  );
};

export default LoginDialog; 