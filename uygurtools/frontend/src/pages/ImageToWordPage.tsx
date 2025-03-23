import React, { useState } from 'react';
import { 
  Layout, Card, Upload, Button, message, Typography, Row, Col, 
  Divider, Radio, Spin, Space, Select, Empty, Checkbox, Tag, Tooltip
} from 'antd';
import { 
  UploadOutlined, FileWordOutlined, DownloadOutlined, 
  FileImageOutlined, SwapRightOutlined, DeleteOutlined,
  InfoCircleOutlined, EyeOutlined, SettingOutlined
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { RcFile } from 'antd/es/upload';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// 支持的语言选项
const languageOptions = [
  { value: 'zh-CN', label: '中文(简体)' },
  { value: 'zh-TW', label: '中文(繁体)' },
  { value: 'en', label: '英文' },
  { value: 'ja', label: '日文' },
  { value: 'ko', label: '韩文' },
  { value: 'fr', label: '法文' },
  { value: 'de', label: '德文' },
  { value: 'ru', label: '俄文' },
  { value: 'es', label: '西班牙文' },
];

const ImageToWordPage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [processed, setProcessed] = useState<boolean>(false);
  const [resultUrl, setResultUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>('zh-CN');
  const [recognizeMode, setRecognizeMode] = useState<string>('text');
  const [preserveLayout, setPreserveLayout] = useState<boolean>(true);
  const [previewText, setPreviewText] = useState<string>('');
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  // 文件上传配置
  const uploadProps: UploadProps = {
    name: 'image',
    listType: 'picture',
    maxCount: 1,
    beforeUpload: (file) => {
      // 检查文件类型
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件!');
        return Upload.LIST_IGNORE;
      }
      
      // 检查文件大小 (限制为 20MB)
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        message.error('图片不能超过 20MB!');
        return Upload.LIST_IGNORE;
      }
      
      // 重置状态
      setProcessed(false);
      setResultUrl('');
      setError(null);
      setPreviewText('');
      
      // 创建预览图
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      return false; // 阻止自动上传
    },
    onChange: ({ fileList }) => {
      setFileList(fileList);
    },
    onRemove: () => {
      setFileList([]);
      setImageUrl('');
      setProcessed(false);
      setResultUrl('');
      setPreviewText('');
      
      // 释放临时URL
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
        setResultUrl('');
      }
    },
    fileList,
    accept: '.jpg,.jpeg,.png,.bmp,.tiff,.webp',
  };
  
  // 重新上传图片
  const reuploadImage = () => {
    setFileList([]);
    setImageUrl('');
    setProcessed(false);
    setResultUrl('');
    setError(null);
    setPreviewText('');
    
    // 释放临时URL
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }
  };
  
  // 设置识别模式
  const handleRecognizeModeChange = (e: any) => {
    setRecognizeMode(e.target.value);
    setProcessed(false);
    if (processed) {
      message.info('识别模式已变更，请重新转换');
    }
  };
  
  // 设置语言
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setProcessed(false);
    if (processed) {
      message.info('识别语言已变更，请重新转换');
    }
  };
  
  // 开始处理图片
  const processImage = () => {
    if (fileList.length === 0 || !imageUrl) {
      message.warning('请先上传图片!');
      return;
    }
    
    setProcessing(true);
    setError(null);
    
    // 模拟处理过程 (实际项目中这里会调用API)
    setTimeout(() => {
      const success = Math.random() > 0.1; // 随机模拟成功或失败
      
      if (success) {
        // 模拟成功处理
        const sampleText = recognizeMode === 'text' ? 
          "这是从图片中识别出的文本内容示例。\n\n根据您选择的语言和识别模式，我们已经提取了图片中的所有文字内容。\n\n实际应用中，这里将显示真实的识别结果。" :
          "这是表格识别的预览结果：\n\n项目\t数量\t单价\t金额\n产品A\t5\t¥120\t¥600\n产品B\t2\t¥250\t¥500\n合计\t\t\t¥1100";
          
        setPreviewText(sampleText);
        setResultUrl('sample-result.docx'); // 模拟结果URL
        setProcessed(true);
        message.success('图片转换成功!');
      } else {
        // 模拟处理失败
        setError('图片处理失败，请确保图片中有清晰的文字，并尝试使用更高质量的图片。');
        message.error('处理失败，请重试!');
      }
      
      setProcessing(false);
    }, 2000);
  };
  
  // 下载Word文档
  const downloadWord = () => {
    if (!resultUrl) {
      message.warning('请先转换图片!');
      return;
    }
    
    // 模拟下载
    message.success('Word文档下载中...');
    
    // 实际项目中这里会触发真实的下载
    setTimeout(() => {
      message.success('Word文档已保存');
    }, 1000);
  };
  
  return (
    <Content className="p-4 min-h-screen">
      <Row gutter={16} className="max-h-[calc(100vh-160px)] overflow-hidden">
        {/* 左侧上传和设置区域 */}
        <Col span={12} className="h-full overflow-auto pr-1">
          {!imageUrl ? (
            <Card className="shadow-sm mb-4" bordered={false}>
              <div className="text-center p-4">
                <Upload.Dragger {...uploadProps} className="mb-4">
                  <p className="ant-upload-drag-icon">
                    <FileImageOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  </p>
                  <p className="ant-upload-text">点击或拖拽图片到此区域上传</p>
                  <p className="ant-upload-hint">
                    支持 JPG, PNG, JPEG, BMP, TIFF, WEBP 格式
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    最大支持 20MB 的图片文件
                  </p>
                </Upload.Dragger>
                
                <Divider>
                  <Text type="secondary">图片转Word说明</Text>
                </Divider>
                
                <div className="text-left">
                  <h4 className="font-medium mb-2 text-sm">功能介绍</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    通过OCR技术，将图片中的文字和表格内容提取，并转换为可编辑的Word文档。
                  </p>
                  
                  <h4 className="font-medium mb-2 text-sm">适用场景</h4>
                  <Row gutter={[8, 8]} className="mb-3">
                    <Col span={12}>
                      <Tag color="blue">扫描文档数字化</Tag>
                    </Col>
                    <Col span={12}>
                      <Tag color="blue">纸质资料电子化</Tag>
                    </Col>
                    <Col span={12}>
                      <Tag color="blue">表格数据提取</Tag>
                    </Col>
                    <Col span={12}>
                      <Tag color="blue">文本内容提取</Tag>
                    </Col>
                  </Row>
                  
                  <h4 className="font-medium mb-2 text-sm">使用提示</h4>
                  <ul className="list-disc pl-5 text-xs text-gray-600">
                    <li>确保图片清晰，不要有过多干扰元素</li>
                    <li>对于表格，建议选择"表格识别"模式</li>
                    <li>复杂版式可能会影响识别准确率</li>
                    <li>结果保存为可编辑的Word文档</li>
                  </ul>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="shadow-sm mb-4" bordered={false}>
              <div className="flex justify-between items-center mb-3">
                <Title level={5} style={{ margin: 0 }}>转换设置</Title>
                <Button 
                  type="link" 
                  icon={<DeleteOutlined />} 
                  onClick={reuploadImage}
                  size="small"
                >
                  重新上传
                </Button>
              </div>
              
              {/* 识别模式选择 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">识别模式</label>
                <Radio.Group 
                  onChange={handleRecognizeModeChange} 
                  value={recognizeMode}
                  className="w-full"
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Radio.Button value="text" style={{ width: '100%', textAlign: 'center' }}>
                        文本识别
                      </Radio.Button>
                    </Col>
                    <Col span={12}>
                      <Radio.Button value="table" style={{ width: '100%', textAlign: 'center' }}>
                        表格识别
                      </Radio.Button>
                    </Col>
                  </Row>
                </Radio.Group>
                <div className="mt-2 text-xs text-gray-500">
                  {recognizeMode === 'text' ? 
                    '文本识别适用于普通文档、文章等纯文本内容' : 
                    '表格识别适用于表格、清单等结构化数据'}
                </div>
              </div>
              
              {/* 语言选择 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">识别语言</label>
                <Select
                  style={{ width: '100%' }}
                  value={language}
                  onChange={handleLanguageChange}
                >
                  {languageOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
                <div className="mt-2 text-xs text-gray-500">
                  选择与图片中文字相符的语言，可提高识别准确率
                </div>
              </div>
              
              {/* 高级选项 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">高级选项</label>
                <div className="bg-gray-50 p-3 rounded">
                  <Checkbox 
                    checked={preserveLayout} 
                    onChange={(e) => setPreserveLayout(e.target.checked)}
                  >
                    保留原始布局
                    <Tooltip title="尝试在Word文档中保留与原图相似的排版布局">
                      <InfoCircleOutlined className="ml-1 text-gray-400" />
                    </Tooltip>
                  </Checkbox>
                </div>
              </div>
              
              <Divider />
              
              {/* 操作按钮 */}
              <div className="flex justify-center">
                <Button 
                  type="primary" 
                  size="large"
                  icon={<FileWordOutlined />}
                  onClick={processImage}
                  loading={processing}
                  className="mr-3"
                >
                  {processed ? '重新转换' : '转换为Word'}
                </Button>
                
                {processed && !error && (
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<DownloadOutlined />}
                    onClick={downloadWord}
                  >
                    下载Word文档
                  </Button>
                )}
              </div>
              
              {error && (
                <div className="bg-red-50 p-3 rounded-lg mt-4 text-red-700 border border-red-200">
                  <h4 className="font-medium mb-1">处理失败</h4>
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </Card>
          )}
        </Col>
        
        {/* 右侧预览区域 */}
        <Col span={12} className="h-full overflow-auto pl-1">
          <Card className="shadow-sm h-full" bordered={false}>
            <div className="flex justify-between items-center mb-3">
              <Title level={5} style={{ margin: 0 }}>转换预览</Title>
              {imageUrl && (
                <div className="text-xs text-gray-500">
                  {recognizeMode === 'text' ? '文本识别模式' : '表格识别模式'} · {
                    languageOptions.find(opt => opt.value === language)?.label
                  }
                </div>
              )}
            </div>
            
            <div className="h-[calc(100%-48px)] flex flex-col items-center justify-center">
              {!imageUrl ? (
                <div className="text-center p-8">
                  <Empty 
                    description="请先上传图片" 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-center justify-center mb-6 w-full">
                    <div className="mr-5 text-center">
                      <p className="text-sm text-gray-500 mb-2">上传的图片</p>
                      <div className="relative group">
                        <div 
                          className="border border-gray-200 rounded overflow-hidden"
                          style={{ 
                            width: '200px', 
                            height: '150px', 
                            backgroundColor: '#f0f0f0'
                          }}
                        >
                          <img 
                            src={imageUrl} 
                            alt="上传的图片" 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <SwapRightOutlined className="text-2xl text-gray-400" />
                    
                    <div className="ml-5 text-center">
                      <p className="text-sm text-gray-500 mb-2">
                        {processed ? 'Word文档预览' : '等待转换'}
                      </p>
                      <div className="relative group">
                        <div 
                          className="border border-gray-200 rounded overflow-hidden"
                          style={{ 
                            width: '200px', 
                            height: '150px', 
                            backgroundColor: '#fff'
                          }}
                        >
                          {(processing || processed) && (
                            <div className="w-full h-full p-2 text-xs text-left overflow-auto"
                                 style={{ fontFamily: 'Calibri, sans-serif' }}>
                              {previewText.split('\n').map((line, i) => (
                                <p key={i} className="mb-1">{line}</p>
                              ))}
                            </div>
                          )}
                          {!processing && !processed && imageUrl && (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              <p className="text-xs">点击"转换为Word"<br/>开始处理</p>
                            </div>
                          )}
                          {processing && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                              <Spin />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg w-full max-w-md">
                    <h4 className="font-medium mb-2 text-sm">识别效果说明</h4>
                    <ul className="list-disc pl-5 text-xs text-gray-600">
                      <li>图片越清晰，识别效果越好</li>
                      <li>文档倾斜可能会影响识别准确率</li>
                      <li>下载后的Word文档可直接编辑</li>
                      <li>特殊字体和符号可能需要手动调整</li>
                    </ul>
                    
                    <Divider className="my-3" />
                    
                    <h4 className="font-medium mb-2 text-sm">常见问题</h4>
                    <ul className="text-xs text-gray-600">
                      <li><strong>Q: 无法识别表格?</strong> 请选择"表格识别"模式</li>
                      <li><strong>Q: 中文识别不准?</strong> 确保选择了"中文"语言</li>
                      <li><strong>Q: 如何提高准确率?</strong> 上传更清晰的图片</li>
                      <li><strong>Q: 支持扫描件吗?</strong> 支持，但建议扫描质量高</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default ImageToWordPage; 