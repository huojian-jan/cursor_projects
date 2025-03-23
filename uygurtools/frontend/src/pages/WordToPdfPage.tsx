import React, { useState, useRef } from 'react';
import { Layout, Card, Tabs, Upload, Button, message, Spin, Typography, Row, Col, Divider, Alert } from 'antd';
import { 
  UploadOutlined, FileWordOutlined, FilePdfOutlined, SwapOutlined,
  DownloadOutlined, DeleteOutlined, EyeOutlined, CheckCircleOutlined
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { RcFile } from 'antd/es/upload';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const WordToPdfPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('wordToPdf');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [converting, setConverting] = useState<boolean>(false);
  const [converted, setConverted] = useState<boolean>(false);
  const [resultFileUrl, setResultFileUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  
  // 文件类型和大小限制
  const getAcceptedFileTypes = () => {
    return activeTab === 'wordToPdf' 
      ? '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      : '.pdf,application/pdf';
  };
  
  // 文件上传配置
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      // 检查文件类型
      const isWord = activeTab === 'wordToPdf' && 
        (file.type === 'application/msword' || 
         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      const isPdf = activeTab === 'pdfToWord' && file.type === 'application/pdf';
      
      if (!(isWord || isPdf)) {
        const fileType = activeTab === 'wordToPdf' ? 'Word文档 (.doc, .docx)' : 'PDF文件 (.pdf)';
        message.error(`只能上传${fileType}!`);
        return Upload.LIST_IGNORE;
      }
      
      // 检查文件大小 (限制为 20MB)
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        message.error('文件不能超过 20MB!');
        return Upload.LIST_IGNORE;
      }
      
      // 重置状态
      setError(null);
      setConverted(false);
      setResultFileUrl('');
      
      return false; // 阻止自动上传
    },
    onChange: ({ fileList }) => {
      // 限制只能上传一个文件
      if (fileList.length > 1) {
        fileList = [fileList[fileList.length - 1]];
      }
      setFileList(fileList);
    },
    onRemove: () => {
      setFileList([]);
      setConverted(false);
      setResultFileUrl('');
      setError(null);
      
      // 释放临时URL
      if (resultFileUrl) {
        URL.revokeObjectURL(resultFileUrl);
      }
    },
    fileList,
    maxCount: 1,
    accept: getAcceptedFileTypes(),
  };
  
  // 切换转换方式
  const handleTabChange = (key: string) => {
    if (key !== activeTab) {
      setActiveTab(key);
      setFileList([]);
      setConverted(false);
      setResultFileUrl('');
      setError(null);
      
      // 释放临时URL
      if (resultFileUrl) {
        URL.revokeObjectURL(resultFileUrl);
      }
    }
  };
  
  // 开始转换
  const startConversion = () => {
    if (fileList.length === 0) {
      message.warning('请先上传文件!');
      return;
    }
    
    setConverting(true);
    setError(null);
    
    // 模拟转换过程 (实际项目中这里会调用API)
    setTimeout(() => {
      const success = Math.random() > 0.2; // 随机模拟成功或失败
      
      if (success) {
        // 模拟成功返回结果
        const file = fileList[0].originFileObj as RcFile;
        const fileName = file.name.split('.')[0];
        const extension = activeTab === 'wordToPdf' ? '.pdf' : '.docx';
        const resultFileName = `${fileName}${extension}`;
        
        // 创建一个临时Blob URL来模拟转换结果
        // 实际项目中，这将是从API返回的文件
        const resultFileUrl = URL.createObjectURL(new Blob([file], { 
          type: activeTab === 'wordToPdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        }));
        
        setResultFileUrl(resultFileUrl);
        setConverted(true);
        message.success('文件转换成功!');
      } else {
        // 模拟转换失败
        setError('文件转换失败，请检查文件格式是否正确或尝试上传其他文件。');
        message.error('转换失败，请重试!');
      }
      
      setConverting(false);
    }, 2000);
  };
  
  // 下载转换后的文件
  const downloadResult = () => {
    if (!resultFileUrl) return;
    
    const file = fileList[0].originFileObj as RcFile;
    const fileName = file.name.split('.')[0];
    const extension = activeTab === 'wordToPdf' ? '.pdf' : '.docx';
    const resultFileName = `${fileName}${extension}`;
    
    const a = document.createElement('a');
    a.href = resultFileUrl;
    a.download = resultFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  // 预览文件
  const previewFile = () => {
    const url = converted ? resultFileUrl : fileList[0].originFileObj ? URL.createObjectURL(fileList[0].originFileObj as Blob) : '';
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <Content className="site-layout-background p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        <Row gutter={24}>
          <Col span={16}>
            <Card className="shadow-sm mb-6" bordered={false}>
              <Tabs activeKey={activeTab} onChange={handleTabChange} centered>
                <TabPane 
                  tab={
                    <span>
                      <FileWordOutlined /> Word 转 PDF
                    </span>
                  } 
                  key="wordToPdf"
                >
                  <div className="text-center p-2">
                    <Paragraph>
                      将 Word 文档(.doc, .docx)转换为 PDF 文件，保留原始格式
                    </Paragraph>
                  </div>
                </TabPane>
                <TabPane 
                  tab={
                    <span>
                      <FilePdfOutlined /> PDF 转 Word
                    </span>
                  } 
                  key="pdfToWord"
                >
                  <div className="text-center p-2">
                    <Paragraph>
                      将 PDF 文件转换为可编辑的 Word 文档(.docx)
                    </Paragraph>
                  </div>
                </TabPane>
              </Tabs>
              
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center mt-4">
                <Upload.Dragger {...uploadProps} className="py-8">
                  <p className="text-5xl text-gray-400 mb-4">
                    {activeTab === 'wordToPdf' ? <FileWordOutlined /> : <FilePdfOutlined />}
                  </p>
                  <p className="text-base mb-2">点击上传或拖拽文件到此区域</p>
                  <p className="text-xs text-gray-500">
                    {activeTab === 'wordToPdf' 
                      ? '支持 .doc, .docx 格式，最大 20MB' 
                      : '支持 .pdf 格式，最大 20MB'}
                  </p>
                </Upload.Dragger>
                
                {fileList.length > 0 && !converted && (
                  <div className="flex justify-center mt-6">
                    <Button 
                      type="primary" 
                      icon={<SwapOutlined />} 
                      size="large"
                      onClick={startConversion}
                      loading={converting}
                      disabled={converted}
                    >
                      开始转换
                    </Button>
                  </div>
                )}
              </div>
              
              {error && (
                <Alert
                  message="转换失败"
                  description={error}
                  type="error"
                  showIcon
                  className="mt-4"
                />
              )}
              
              {converted && (
                <div className="mt-4 bg-green-50 p-6 rounded-lg text-center">
                  <CheckCircleOutlined className="text-4xl text-green-500 mb-2" />
                  <h3 className="text-lg font-medium text-green-800">转换成功!</h3>
                  <p className="text-green-700 mb-4">
                    您的文件已成功转换为 {activeTab === 'wordToPdf' ? 'PDF' : 'Word'} 格式
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button 
                      type="primary" 
                      icon={<DownloadOutlined />}
                      onClick={downloadResult}
                    >
                      下载文件
                    </Button>
                    <Button 
                      icon={<EyeOutlined />}
                      onClick={previewFile}
                    >
                      预览
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </Col>
          
          <Col span={8}>
            <Card className="shadow-sm" bordered={false}>
              <Title level={4}>使用说明</Title>
              <Divider />
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Word 转 PDF</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>支持 .doc 和 .docx 格式</li>
                  <li>保留文本、图片、表格和排版</li>
                  <li>生成的 PDF 保持原始布局</li>
                  <li>适合用于正式文档和打印</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">PDF 转 Word</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>支持各种 PDF 文件</li>
                  <li>转换为可编辑的 .docx 文件</li>
                  <li>尽可能保留原始格式和布局</li>
                  <li>适合需要编辑 PDF 内容的场景</li>
                </ul>
              </div>
              
              <Divider />
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium text-blue-700 mb-2">提示</p>
                <ul className="text-sm text-blue-600 list-disc pl-5">
                  <li>复杂格式转换可能会有细微差异</li>
                  <li>转换大文件需要较长时间</li>
                  <li>确保上传文件不含敏感信息</li>
                  <li>文件大小限制为 20MB</li>
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default WordToPdfPage; 