import React, { useState } from 'react';
import { 
  Layout, Card, Form, Input, Button, Select, Row, Col, Steps, Typography, 
  Divider, Upload, message, Tabs, Tooltip
} from 'antd';
import { 
  UserOutlined, BookOutlined, BulbOutlined, ToolOutlined, ProjectOutlined,
  PlusOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined, 
  InfoCircleOutlined, ArrowLeftOutlined, ArrowRightOutlined, UploadOutlined
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { templateData } from '../data/resumeTemplateData'; // 假设模板数据已迁移到这个文件

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;
const { TabPane } = Tabs;

const GenerateResumePage: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // 步骤定义
  const steps = [
    {
      title: '个人信息',
      icon: <UserOutlined />
    },
    {
      title: '教育经历',
      icon: <BookOutlined />
    },
    {
      title: '工作经历',
      icon: <BulbOutlined />
    },
    {
      title: '技能特长',
      icon: <ToolOutlined />
    },
    {
      title: '选择模板',
      icon: <ProjectOutlined />
    }
  ];

  // 处理表单提交
  const handleFinish = (values: any) => {
    console.log('表单数据:', values);
    setIsGenerating(true);
    
    // 模拟生成简历过程
    setTimeout(() => {
      setIsGenerating(false);
      message.success('简历已成功生成！');
      // 这里可以添加简历下载或预览逻辑
    }, 2000);
  };

  // 显示示例信息的按钮
  const showExampleInfo = () => {
    message.info('我们提供了示例格式，您可以参照填写个人信息');
  };

  // 切换到下一步
  const nextStep = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    }).catch(errorInfo => {
      console.log('表单验证失败:', errorInfo);
    });
  };

  // 切换到上一步
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // 渲染当前步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card title="个人基本信息" extra={<Button type="link" onClick={showExampleInfo} icon={<InfoCircleOutlined />}>查看示例</Button>}>
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入您的姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            
            <Form.Item
              name="title"
              label="职位/头衔"
              rules={[{ required: true, message: '请输入您的职位或头衔' }]}
            >
              <Input placeholder="如：软件工程师、产品经理" />
            </Form.Item>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="邮箱"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' }
                  ]}
                >
                  <Input placeholder="邮箱地址" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="电话"
                  rules={[{ required: true, message: '请输入联系电话' }]}
                >
                  <Input placeholder="联系电话" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="location"
                  label="所在地"
                >
                  <Input placeholder="城市，如：北京市" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="website"
                  label="个人网站"
                >
                  <Input placeholder="网站或社交媒体链接" />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item
              name="summary"
              label="个人简介"
            >
              <TextArea 
                rows={4} 
                placeholder="简要描述您的专业背景、特长和职业目标（建议100-150字）" 
                maxLength={500} 
                showCount 
              />
            </Form.Item>
            
            <Form.Item
              name="avatar"
              label="个人照片"
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传</div>
                </div>
              </Upload>
            </Form.Item>
          </Card>
        );
      
      case 1:
        return (
          <Card title="教育经历">
            <Form.List name="education">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="mb-4 pb-4 border-b border-gray-200">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'school']}
                            rules={[{ required: true, message: '请输入学校名称' }]}
                          >
                            <Input placeholder="学校名称" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'major']}
                            rules={[{ required: true, message: '请输入专业' }]}
                          >
                            <Input placeholder="专业" />
                          </Form.Item>
                        </Col>
                      </Row>
                      
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'degree']}
                          >
                            <Select placeholder="学位">
                              <Option value="bachelor">本科</Option>
                              <Option value="master">硕士</Option>
                              <Option value="phd">博士</Option>
                              <Option value="associate">专科</Option>
                              <Option value="other">其他</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'startDate']}
                          >
                            <Input placeholder="开始日期 (年/月)" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'endDate']}
                          >
                            <Input placeholder="结束日期 (年/月 或 至今)" />
                          </Form.Item>
                        </Col>
                      </Row>
                      
                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                      >
                        <TextArea 
                          rows={3} 
                          placeholder="相关描述、成绩、活动等" 
                        />
                      </Form.Item>
                      
                      {fields.length > 1 && (
                        <Button 
                          type="text" 
                          danger 
                          onClick={() => remove(name)}
                          icon={<DeleteOutlined />}
                        >
                          删除该条
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Form.Item>
                    <Button 
                      type="dashed" 
                      onClick={() => add()} 
                      block 
                      icon={<PlusOutlined />}
                    >
                      添加教育经历
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Card>
        );
      
      case 2:
        return (
          <Card title="工作经历">
            {/* 工作经历表单，结构类似教育经历 */}
            <Form.List name="workExperience">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="mb-4 pb-4 border-b border-gray-200">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'company']}
                            rules={[{ required: true, message: '请输入公司名称' }]}
                          >
                            <Input placeholder="公司名称" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'position']}
                            rules={[{ required: true, message: '请输入职位' }]}
                          >
                            <Input placeholder="职位" />
                          </Form.Item>
                        </Col>
                      </Row>
                      
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'startDate']}
                          >
                            <Input placeholder="开始日期 (年/月)" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'endDate']}
                          >
                            <Input placeholder="结束日期 (年/月 或 至今)" />
                          </Form.Item>
                        </Col>
                      </Row>
                      
                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                      >
                        <TextArea 
                          rows={4} 
                          placeholder="工作职责、成就和贡献" 
                        />
                      </Form.Item>
                      
                      {fields.length > 1 && (
                        <Button 
                          type="text" 
                          danger 
                          onClick={() => remove(name)}
                          icon={<DeleteOutlined />}
                        >
                          删除该条
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Form.Item>
                    <Button 
                      type="dashed" 
                      onClick={() => add()} 
                      block 
                      icon={<PlusOutlined />}
                    >
                      添加工作经历
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Card>
        );
      
      case 3:
        return (
          <Card title="技能特长">
            <Form.List name="skills">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="mb-4">
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'category']}
                          >
                            <Input placeholder="技能类别（如：编程语言、设计工具）" />
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            {...restField}
                            name={[name, 'items']}
                          >
                            <Input placeholder="具体技能（多个技能用逗号分隔）" />
                          </Form.Item>
                        </Col>
                      </Row>
                      
                      {fields.length > 1 && (
                        <Button 
                          type="text" 
                          danger 
                          onClick={() => remove(name)}
                          icon={<DeleteOutlined />}
                        >
                          删除
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Form.Item>
                    <Button 
                      type="dashed" 
                      onClick={() => add()} 
                      block 
                      icon={<PlusOutlined />}
                    >
                      添加技能类别
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            
            <Divider />
            
            <Form.Item name="certificates" label="证书与资质">
              <TextArea 
                rows={4} 
                placeholder="列出您获得的证书、资质、奖项等（每项单独一行）" 
              />
            </Form.Item>
            
            <Form.Item name="languages" label="语言能力">
              <TextArea 
                rows={2} 
                placeholder="列出您掌握的语言和熟练程度（如：英语-精通）" 
              />
            </Form.Item>
          </Card>
        );
      
      case 4:
        return (
          <Card title="选择简历模板">
            <div className="mb-4">
              <Text>选择一个喜欢的模板样式用于生成简历</Text>
            </div>
            
            <Row gutter={[16, 16]}>
              {templateData.slice(0, 8).map(template => (
                <Col span={6} key={template.id}>
                  <Card
                    hoverable
                    className={`template-card ${selectedTemplate === template.id ? 'border-2 border-blue-500' : ''}`}
                    cover={
                      <div className="relative h-40 bg-gray-100 overflow-hidden">
                        <div 
                          className="h-full flex items-center justify-center" 
                          style={{ backgroundColor: `hsl(${template.id * 20}, 70%, 90%)` }}
                        >
                          <span className="text-center text-gray-700">{template.name}</span>
                        </div>
                      </div>
                    }
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <Card.Meta title={template.name} />
                  </Card>
                </Col>
              ))}
            </Row>
            
            <Form.Item name="templateId" hidden>
              <Input />
            </Form.Item>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <Content className="site-layout-background p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6 shadow-sm" bordered={false}>
          <Title level={2}>智能简历生成器</Title>
          <Paragraph className="text-gray-500">
            填写您的个人信息，选择喜欢的模板，一键生成专业简历
          </Paragraph>
        </Card>
        
        <Row gutter={24}>
          <Col span={24}>
            <Card className="shadow-sm mb-6" bordered={false}>
              <Steps current={currentStep}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} icon={item.icon} />
                ))}
              </Steps>
            </Card>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              initialValues={{
                education: [{}],
                workExperience: [{}],
                skills: [{}]
              }}
            >
              {renderStepContent()}
              
              <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                  <Button 
                    icon={<ArrowLeftOutlined />}
                    onClick={prevStep}
                  >
                    上一步
                  </Button>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <Button 
                    type="primary" 
                    onClick={nextStep}
                  >
                    下一步 <ArrowRightOutlined />
                  </Button>
                ) : (
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    loading={isGenerating}
                    disabled={!selectedTemplate}
                  >
                    生成简历 <DownloadOutlined />
                  </Button>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default GenerateResumePage; 