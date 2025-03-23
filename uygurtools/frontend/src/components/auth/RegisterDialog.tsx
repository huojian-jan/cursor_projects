import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Checkbox, Divider, Typography, message, Alert, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, SafetyOutlined } from '@ant-design/icons';
import { mockRegister } from '../../utils/auth';

const { Text } = Typography;

interface RegisterDialogProps {
  visible: boolean;
  onClose: () => void;
  onRegisterSuccess?: () => void;
  onSwitchToLogin: () => void; // 切换到登录表单
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ 
  visible, 
  onClose, 
  onRegisterSuccess,
  onSwitchToLogin
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [smsLoading, setSmsLoading] = useState(false);
  const [smsCode, setSmsCode] = useState<string | null>(null);
  
  // 处理倒计时
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  // 获取短信验证码
  const handleGetSmsCode = async () => {
    try {
      // 验证手机号
      await form.validateFields(['phone']);
      const phoneValue = form.getFieldValue('phone');
      
      setSmsLoading(true);
      
      // 模拟API调用获取验证码
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 生成随机验证码
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSmsCode(randomCode);
      
      // 显示验证码（实际应用中这是通过短信发送的）
      message.success(`验证码：${randomCode}（实际应用中会通过短信发送）`);
      
      // 开始倒计时
      setCountdown(60);
    } catch (error) {
      message.error('请输入有效的手机号');
    } finally {
      setSmsLoading(false);
    }
  };

  // 提交注册表单
  const handleRegister = async (values: any) => {
    if (values.smsCode !== smsCode) {
      setRegisterError('验证码错误');
      return;
    }
    
    setLoading(true);
    setRegisterError(null);
    
    try {
      // 模拟注册API调用
      const response: any = await mockRegister({
        username: values.username,
        phone: values.phone,
        password: values.password
      });
      
      if (response.success) {
        message.success('注册成功！');
        form.resetFields();
        onClose();
        
        if (onRegisterSuccess) {
          onRegisterSuccess();
        }
      } else {
        setRegisterError(response.message || '注册失败，请稍后再试');
      }
    } catch (error) {
      setRegisterError('注册过程中发生错误');
      console.error('注册错误:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setRegisterError(null);
    onClose();
  };

  return (
    <Modal
      title="注册账号"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={400}
      destroyOnClose={true}
      className="register-dialog"
      centered
    >
      {registerError && (
        <Alert 
          message={registerError} 
          type="error" 
          showIcon 
          className="mb-4" 
          closable 
          onClose={() => setRegisterError(null)}
        />
      )}

      <Form
        form={form}
        name="registerForm"
        layout="vertical"
        onFinish={handleRegister}
        requiredMark={false}
      >
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
          ]}
        >
          <Input 
            prefix={<MobileOutlined className="text-gray-400" />} 
            placeholder="手机号" 
            size="large"
            maxLength={11}
          />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名至少3个字符' },
            { max: 20, message: '用户名最多20个字符' }
          ]}
        >
          <Input 
            prefix={<UserOutlined className="text-gray-400" />} 
            placeholder="用户名" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' }
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined className="text-gray-400" />} 
            placeholder="密码" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined className="text-gray-400" />} 
            placeholder="确认密码" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="smsCode"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Row gutter={8}>
            <Col span={16}>
              <Input 
                prefix={<SafetyOutlined className="text-gray-400" />} 
                placeholder="验证码" 
                size="large"
              />
            </Col>
            <Col span={8}>
              <Button 
                size="large" 
                onClick={handleGetSmsCode} 
                loading={smsLoading}
                disabled={countdown > 0}
                className="w-full"
              >
                {countdown > 0 ? `${countdown}秒` : '获取验证码'}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name="agreement" valuePropName="checked" rules={[
          { 
            validator: (_, value) => 
              value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意协议')) 
          }
        ]}>
          <Checkbox>我已阅读并同意 <a href="#" className="text-primary">用户协议</a> 和 <a href="#" className="text-primary">隐私政策</a></Checkbox>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            block 
            loading={loading}
          >
            注册
          </Button>
        </Form.Item>
      </Form>

      <Divider plain>
        <Text type="secondary">或者</Text>
      </Divider>

      <div className="text-center mt-4">
        <Text type="secondary">已有账号？</Text>
        <Button 
          type="link" 
          className="p-0 ml-1"
          onClick={() => {
            handleCancel();
            onSwitchToLogin();
          }}
        >
          立即登录
        </Button>
      </div>
    </Modal>
  );
};

export default RegisterDialog; 