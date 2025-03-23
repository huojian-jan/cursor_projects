import React, { useState, useRef } from 'react';
import { 
  Layout, Card, Upload, Button, message, Typography, Row, Col, 
  Divider, Radio, Spin, Space, Input, Tooltip, Image, Modal,
  ColorPicker, Empty, Select, Popover
} from 'antd';
import type { ColorPickerProps } from 'antd';
import { 
  UploadOutlined, CameraOutlined, DownloadOutlined, 
  DeleteOutlined, SwapRightOutlined, ScissorOutlined,
  CheckCircleOutlined, EyeOutlined, InfoCircleOutlined,
  UndoOutlined, CheckOutlined, EditOutlined, SettingOutlined
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { RcFile } from 'antd/es/upload';
import { RadioChangeEvent } from 'antd/lib/radio';
import type { SelectProps } from 'antd';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// 证件照尺寸选项
const photoSizes = [
  { id: '1inch', name: '一寸', width: 25, height: 35, description: '25×35mm 身份证、驾照' },
  { id: '2inch', name: '二寸', width: 35, height: 49, description: '35×49mm 护照、签证' },
  { id: 'small1inch', name: '小一寸', width: 22, height: 32, description: '22×32mm 证件' },
  { id: 'large2inch', name: '大二寸', width: 40, height: 60, description: '40×60mm 简历' },
  { id: 'graduate', name: '毕业证', width: 35, height: 45, description: '35×45mm 毕业照' },
  { id: 'visa', name: '签证照', width: 33, height: 48, description: '33×48mm 签证' },
];

// 底色选项
const backgroundColors = [
  { id: 'white', name: '白底', color: '#FFFFFF' },
  { id: 'blue', name: '蓝底', color: '#0E72CC' },
  { id: 'red', name: '红底', color: '#D40000' },
  { id: 'gray', name: '灰底', color: '#CCCCCC' },
];

const ZhengjianzhaoPage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('1inch');
  const [backgroundColor, setBackgroundColor] = useState<string>('white');
  const [customColor, setCustomColor] = useState<string>('#FFFFFF');
  const [useCustomColor, setUseCustomColor] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [processed, setProcessed] = useState<boolean>(false);
  const [resultUrl, setResultUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [rotation, setRotation] = useState<number>(0);
  const [colorPickerOpen, setColorPickerOpen] = useState<boolean>(false);
  
  // 获取当前选择的尺寸信息
  const getCurrentSize = () => {
    return photoSizes.find(size => size.id === selectedSize) || photoSizes[0];
  };
  
  // 获取当前选择的背景颜色信息
  const getCurrentBackgroundColor = () => {
    if (useCustomColor) {
      return { id: 'custom', name: '自定义', color: customColor };
    }
    return backgroundColors.find(bg => bg.id === backgroundColor) || backgroundColors[0];
  };
  
  // 文件上传配置
  const uploadProps: UploadProps = {
    name: 'photo',
    listType: 'picture',
    maxCount: 1,
    beforeUpload: (file) => {
      // 检查文件类型
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件!');
        return Upload.LIST_IGNORE;
      }
      
      // 检查文件大小 (限制为 10MB)
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('图片不能超过 10MB!');
        return Upload.LIST_IGNORE;
      }
      
      // 重置状态
      setProcessed(false);
      setResultUrl('');
      setError(null);
      
      // 创建预览图
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      return false; // 阻止自动上传
    },
    onChange: ({ fileList }) => {
      setFileList(fileList);
    },
    onRemove: () => {
      setFileList([]);
      setPhotoUrl('');
      setProcessed(false);
      setResultUrl('');
      
      // 释放临时URL
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
        setResultUrl('');
      }
    },
    fileList,
    accept: '.jpg,.jpeg,.png,.bmp',
  };
  
  // 重新上传照片
  const reuploadPhoto = () => {
    setFileList([]);
    setPhotoUrl('');
    setProcessed(false);
    setResultUrl('');
    setError(null);
    setRotation(0);
    
    // 释放临时URL
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }
  };
  
  // 处理尺寸选择变化
  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
    if (processed) {
      setProcessed(false);
      message.info('尺寸已变更，请重新生成证件照');
    }
  };
  
  // 处理背景颜色选择变化
  const handleBackgroundChange = (value: string) => {
    if (value === 'settings') {
      // 打开色轮选择器
      setColorPickerOpen(true);
      return;
    }
    
    setBackgroundColor(value);
    setUseCustomColor(value === 'custom');
    if (processed) {
      setProcessed(false);
      message.info('底色已变更，请重新生成证件照');
    }
  };
  
  // 处理自定义颜色变化
  const handleCustomColorChange = (value: string) => {
    setCustomColor(value);
    setUseCustomColor(true);
    if (processed) {
      setProcessed(false);
      message.info('底色已变更，请重新生成证件照');
    }
  };
  
  // 应用自定义颜色
  const applyCustomColor = () => {
    setUseCustomColor(true);
    setColorPickerOpen(false);
    if (processed) {
      setProcessed(false);
      message.info('底色已变更，请重新生成证件照');
    }
  };
  
  // 开始处理证件照
  const processPhoto = () => {
    if (fileList.length === 0 || !photoUrl) {
      message.warning('请先上传照片!');
      return;
    }
    
    setProcessing(true);
    setError(null);
    
    // 模拟处理过程 (实际项目中这里会调用API)
    setTimeout(() => {
      const success = Math.random() > 0.1; // 随机模拟成功或失败
      
      if (success) {
        // 模拟成功处理
        setResultUrl(photoUrl);
        setProcessed(true);
        message.success('证件照生成成功!');
      } else {
        // 模拟处理失败
        setError('照片处理失败，请确保照片中有清晰的人像，并尝试使用更高质量的照片。');
        message.error('处理失败，请重试!');
      }
      
      setProcessing(false);
    }, 2000);
  };
  
  // 下载处理后的照片
  const downloadPhoto = () => {
    if (!resultUrl) {
      message.warning('请先生成证件照!');
      return;
    }
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `${getCurrentSize().name}_证件照_${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // 显示预览
  const showPreview = (url: string, title: string) => {
    setPreviewImage(url);
    setPreviewTitle(title);
    setPreviewVisible(true);
  };

  // 自定义颜色选择器内容
  const colorPickerContent = (
    <div style={{ width: 235 }}>
      <div className="mb-3">
        <ColorPicker 
          value={customColor}
          onChange={(color, hex) => handleCustomColorChange(hex)}
          showText
          format="rgb"
          presets={[
            {
              label: '推荐底色',
              colors: [
                '#FFFFFF', '#F5F5F5', '#0E72CC', '#D40000',
                '#2A6D3C', '#000000', '#87CEEB', '#FFA500'
              ],
            }
          ]}
        />
      </div>
      
      <div className="mt-3">
        <p className="text-xs mb-2">RGB值</p>
        <div className="flex">
          <Input
            className="w-full"
            value={customColor}
            onChange={(e) => handleCustomColorChange(e.target.value)}
            addonBefore="色值"
          />
        </div>
      </div>
      
      <div className="mt-3 text-right">
        <Button type="primary" size="small" onClick={applyCustomColor}>
          应用
        </Button>
      </div>
    </div>
  );

  return (
    <Content className="p-4 min-h-screen">
      <Row gutter={16} className="max-h-[calc(100vh-160px)] overflow-hidden">
        {/* 左侧上传和设置区域 */}
        <Col span={12} className="h-full overflow-auto pr-1">
          {!photoUrl ? (
            <Card className="shadow-sm" bordered={false}>
              <div className="text-center mb-4">
                <Title level={4}>上传照片制作证件照</Title>
                <Paragraph className="text-gray-500">
                  支持JPG、PNG格式，文件大小不超过10MB
                </Paragraph>
              </div>
              
              <Upload.Dragger {...uploadProps} className="mb-4">
                <p className="ant-upload-drag-icon">
                  <CameraOutlined className="text-primary text-4xl" />
                </p>
                <p className="ant-upload-text">点击或拖拽照片到此区域上传</p>
                <p className="ant-upload-hint text-xs text-gray-500">
                  请上传清晰的正面免冠照片，系统将自动处理成标准证件照
                </p>
              </Upload.Dragger>
              
              <div className="bg-blue-50 p-3 rounded text-sm">
                <h4 className="font-medium mb-1 text-blue-800">照片要求</h4>
                <ul className="list-disc pl-5 text-xs text-blue-700">
                  <li>正面免冠，表情自然</li>
                  <li>光线均匀，无明显阴影</li>
                  <li>人像居中，确保五官清晰</li>
                  <li>建议穿着深色上衣拍摄</li>
                </ul>
              </div>
            </Card>
          ) : (
            <Card className="shadow-sm mb-4" bordered={false}>
              <div className="flex justify-between items-center mb-3">
                <Title level={5} style={{ margin: 0 }}>照片设置</Title>
                <Button 
                  type="link" 
                  icon={<UndoOutlined />} 
                  onClick={reuploadPhoto}
                  size="small"
                >
                  重新上传
                </Button>
              </div>
              
              {/* 尺寸选择 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">选择尺寸</label>
                <Select
                  style={{ width: '100%' }}
                  value={selectedSize}
                  onChange={handleSizeChange}
                  optionLabelProp="label"
                  dropdownMatchSelectWidth={false}
                  dropdownStyle={{ minWidth: '220px' }}
                >
                  {photoSizes.map(size => (
                    <Option 
                      key={size.id} 
                      value={size.id}
                      label={size.name}
                    >
                      <div className="flex justify-between items-center py-1">
                        <div>
                          <div className="font-medium">{size.name}</div>
                          <div className="text-xs text-gray-500">{size.width}×{size.height}mm</div>
                        </div>
                        <div className="text-xs text-gray-500 ml-4">{size.description.split(' ')[1]}</div>
                      </div>
                    </Option>
                  ))}
                </Select>
                <div className="mt-2 text-xs text-gray-500">
                  当前规格：{getCurrentSize().name} ({getCurrentSize().width}×{getCurrentSize().height}mm)
                </div>
              </div>
              
              {/* 底色选择 - 带自定义齿轮按钮 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">选择底色</label>
                <div className="flex items-center">
                  <Select
                    style={{ width: 'calc(100% - 32px)' }}
                    value={useCustomColor ? 'custom' : backgroundColor}
                    onChange={handleBackgroundChange}
                    optionLabelProp="label"
                    dropdownMatchSelectWidth={false}
                  >
                    {backgroundColors.map(bg => (
                      <Option 
                        key={bg.id} 
                        value={bg.id}
                        label={
                          <div className="flex items-center">
                            <div 
                              className="w-4 h-4 mr-1 inline-block border border-gray-300" 
                              style={{ backgroundColor: bg.color }} 
                            />
                            {bg.name}
                          </div>
                        }
                      >
                        <div className="flex items-center py-1">
                          <div 
                            className="w-5 h-5 mr-2 inline-block border border-gray-300" 
                            style={{ backgroundColor: bg.color }} 
                          />
                          <span>{bg.name}</span>
                        </div>
                      </Option>
                    ))}
                    {useCustomColor && (
                      <Option 
                        key="custom" 
                        value="custom"
                        label={
                          <div className="flex items-center">
                            <div 
                              className="w-4 h-4 mr-1 inline-block border border-gray-300" 
                              style={{ backgroundColor: customColor }} 
                            />
                            自定义
                          </div>
                        }
                      >
                        <div className="flex items-center py-1">
                          <div 
                            className="w-5 h-5 mr-2 inline-block border border-gray-300" 
                            style={{ backgroundColor: customColor }} 
                          />
                          <span>自定义色值</span>
                        </div>
                      </Option>
                    )}
                  </Select>
                  
                  {/* 齿轮按钮 - 打开颜色选择器 */}
                  <Popover
                    content={colorPickerContent}
                    title="自定义底色"
                    trigger="click"
                    open={colorPickerOpen}
                    onOpenChange={setColorPickerOpen}
                    placement="right"
                  >
                    <Button 
                      icon={<SettingOutlined />} 
                      className="ml-1"
                      type="text"
                    />
                  </Popover>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                  <div 
                    className="w-3 h-3 mr-1 inline-block border border-gray-300" 
                    style={{ backgroundColor: getCurrentBackgroundColor().color }} 
                  />
                  当前选择：{getCurrentBackgroundColor().name} 
                  {useCustomColor && ` (${customColor})`}
                </div>
              </div>
              
              <Divider />
              
              {/* 操作按钮 */}
              <div className="flex justify-center">
                <Button 
                  type="primary" 
                  size="large"
                  icon={<ScissorOutlined />}
                  onClick={processPhoto}
                  loading={processing}
                  className="mr-3"
                >
                  {processed ? '重新生成' : '生成证件照'}
                </Button>
                
                {processed && !error && (
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<DownloadOutlined />}
                    onClick={downloadPhoto}
                  >
                    下载证件照
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
              <Title level={5} style={{ margin: 0 }}>证件照预览</Title>
              <div className="text-xs text-gray-500">
                {photoUrl ? `${getCurrentSize().name} (${getCurrentSize().width}×${getCurrentSize().height}mm) ${getCurrentBackgroundColor().name}` : '请先上传照片'}
              </div>
            </div>
            
            <div className="h-[calc(100%-48px)] flex flex-col items-center justify-center">
              {!photoUrl ? (
                <div className="text-center p-8">
                  <Empty 
                    description="请先上传照片" 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="mr-5 text-center">
                      <p className="text-sm text-gray-500 mb-2">原始照片</p>
                      <div className="relative group">
                        <div 
                          className="border border-gray-200 rounded-sm overflow-hidden"
                          style={{ 
                            width: '140px', 
                            height: '180px', 
                            backgroundColor: '#f0f0f0'
                          }}
                        >
                          <img 
                            src={photoUrl} 
                            alt="原始照片" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            type="primary" 
                            size="small" 
                            shape="circle" 
                            icon={<EyeOutlined />} 
                            onClick={() => showPreview(photoUrl, '原始照片')}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <SwapRightOutlined className="text-2xl text-gray-400" />
                    
                    <div className="ml-5 text-center">
                      <p className="text-sm text-gray-500 mb-2">
                        {processed ? '处理结果' : '预览效果'}
                      </p>
                      <div className="relative group">
                        <div 
                          className="border border-gray-200 rounded-sm overflow-hidden"
                          style={{ 
                            width: '140px', 
                            height: '180px', 
                            backgroundColor: getCurrentBackgroundColor().color
                          }}
                        >
                          {(processing || processed) && (
                            <img 
                              src={resultUrl || photoUrl} 
                              alt="处理结果" 
                              className="w-full h-full object-cover"
                            />
                          )}
                          {!processing && !processed && photoUrl && (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              <p className="text-xs">点击"生成证件照"<br/>查看效果</p>
                            </div>
                          )}
                          {processing && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                              <Spin />
                            </div>
                          )}
                        </div>
                        {processed && !error && (
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              type="primary" 
                              size="small" 
                              shape="circle" 
                              icon={<EyeOutlined />} 
                              onClick={() => showPreview(resultUrl, '处理结果')}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg w-full max-w-md">
                    <h4 className="font-medium mb-2 text-sm">照片拍摄小贴士</h4>
                    <ul className="list-disc pl-5 text-xs text-gray-600">
                      <li>免冠正面照，头部居中</li>
                      <li>面部清晰，神态自然</li>
                      <li>光线均匀，无反光和阴影</li>
                      <li>纯色背景，深色上衣</li>
                    </ul>
                    
                    <Divider className="my-3" />
                    
                    <h4 className="font-medium mb-2 text-sm">常见用途</h4>
                    <ul className="text-xs text-gray-600 grid grid-cols-2 gap-1">
                      <li><strong>一寸:</strong> 身份证、驾照</li>
                      <li><strong>二寸:</strong> 护照、签证、简历</li>
                      <li><strong>小一寸:</strong> 各类证件</li>
                      <li><strong>大二寸:</strong> 简历、资格证书</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
      
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img
          alt={previewTitle}
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </Content>
  );
};

export default ZhengjianzhaoPage; 