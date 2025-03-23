import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Steps, message, Alert, Row, Col } from 'antd';
import { LockOutlined, MobileOutlined, SafetyOutlined } from '@ant-design/icons';
import { resetPassword } from '../../utils/auth';

const { Step } = Steps;

interface ForgotPasswordDialogProps {
  visible: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({ 
  visible, 
  onClose, 
  onSwitchToLogin 
}) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [smsLoading, setSmsLoading] = useState(false);
  const [smsCode, setSmsCode] = useState<string | null>(null);
  const [verifiedPhone, setVerifiedPhone] = useState<string>('');
  
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

  // 验证手机号和验证码
  const verifyPhoneAndCode = async () => {
    try {
      await form.validateFields(['phone', 'smsCode']);
      const values = form.getFieldsValue(['phone', 'smsCode']);
      
      setLoading(true);
      
      if (values.smsCode !== smsCode) {
        setError('验证码错误');
        setLoading(false);
        return;
      }
      
      // 验证成功，保存手机号并进入下一步
      setVerifiedPhone(values.phone);
      setCurrentStep(1);
      setError(null);
    } catch (error) {
      console.error('验证失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 重置密码
  const handleResetPassword = async () => {
    try {
      await form.validateFields(['newPassword', 'confirmPassword']);
      const values = form.getFieldsValue(['newPassword', 'confirmPassword']);
      
      setLoading(true);
      
      // 调用密码重置API
      const response = await resetPassword(verifiedPhone, values.newPassword);
      
      if (response.success) {
        message.success('密码重置成功！');
        handleCancel();
        onSwitchToLogin();
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('密码重置失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setCurrentStep(0);
    setError(null);
    setSmsCode(null);
    setVerifiedPhone('');
    onClose();
  };

  return (
    <Modal
      title="找回密码"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={400}
      destroyOnClose={true}
      className="forgot-password-dialog"
      centered
    >
      <Steps current={currentStep} className="mb-6">
        <Step title="验证手机" />
        <Step title="重置密码" />
      </Steps>

      {error && (
        <Alert 
          message={error} 
          type="error" 
          showIcon 
          className="mb-4" 
          closable 
          onClose={() => setError(null)}
        />
      )}

      <Form
        form={form}
        name="forgotPasswordForm"
        layout="vertical"
        requiredMark={false}
      >
        {currentStep === 0 ? (
          <>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: '请输入手机号' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
              ]}
            >
              <Input 
                prefix={<MobileOutlined className="text-gray-400" />} 
                placeholder="注册手机号" 
                size="large"
                maxLength={11}
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

            <Form.Item className="mt-6">
              <Button 
                type="primary" 
                size="large" 
                block 
                onClick={verifyPhoneAndCode}
                loading={loading}
              >
                下一步
              </Button>
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: '请输入新密码' },
                { min: 6, message: '密码至少6个字符' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400" />} 
                placeholder="新密码" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: '请确认新密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400" />} 
                placeholder="确认新密码" 
                size="large"
              />
            </Form.Item>

            <Form.Item className="mt-6">
              <Button 
                type="primary" 
                size="large" 
                block 
                onClick={handleResetPassword}
                loading={loading}
              >
                重置密码
              </Button>
            </Form.Item>
          </>
        )}
        
        <div className="flex justify-between mt-4">
          <Button type="link" onClick={handleCancel} className="p-0">
            返回
          </Button>
          <Button 
            type="link" 
            onClick={() => {
              handleCancel();
              onSwitchToLogin();
            }}
            className="p-0"
          >
            返回登录
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordDialog; 