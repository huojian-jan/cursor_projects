import React, { useState, useRef } from 'react';
import { Layout, Select, Button, Card, Typography, Row, Col, Divider, Upload, message, Input } from 'antd';
import { UploadOutlined, AudioOutlined, CopyOutlined, DeleteOutlined, FileTextOutlined, PlayCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps, RcFile } from 'antd/es/upload/interface';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const AudioToTextPage: React.FC = () => {
  const [language, setLanguage] = useState<string>('zh');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordTime, setRecordTime] = useState<number>(0);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');
  
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // 文件上传相关配置
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      // 验证是否是音频文件
      const isAudio = file.type.startsWith('audio/');
      if (!isAudio) {
        message.error('只能上传音频文件!');
        return Upload.LIST_IGNORE;
      }
      
      // 检查文件大小 (限制为 50MB)
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        message.error('音频文件不能超过 50MB!');
        return Upload.LIST_IGNORE;
      }
      
      // 为上传的文件创建可播放的URL
      const fileUrl = URL.createObjectURL(file);
      setAudioUrl(fileUrl);
      
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
      // 清除音频URL
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl('');
      }
    },
    fileList,
    maxCount: 1
  };
  
  // 开始录音
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const fileName = `录音_${new Date().toISOString().slice(0, 10)}.wav`;
        
        // 创建音频URL供播放使用
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioUrl(audioURL);
        
        // 创建一个原生File对象
        const fileObject = new File([audioBlob], fileName, { type: 'audio/wav' });
        
        // 使用自定义对象合并属性而不是直接修改File对象
        const customFile = {
          ...fileObject,
          uid: '-1',
          lastModified: Date.now(),
          lastModifiedDate: new Date(),
          name: fileName,
          size: audioBlob.size,
          type: 'audio/wav'
        } as RcFile;
        
        const file: UploadFile = {
          uid: '-1',
          name: fileName,
          size: audioBlob.size,
          type: audioBlob.type,
          originFileObj: customFile
        };
        
        setFileList([file]);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // 开始计时
      let seconds = 0;
      recordingTimerRef.current = setInterval(() => {
        seconds += 1;
        setRecordTime(seconds);
      }, 1000);
      
    } catch (err) {
      message.error('无法访问麦克风，请检查浏览器权限设置');
      console.error('录音错误:', err);
    }
  };
  
  // 停止录音
  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingTimerRef.current) {
      mediaRecorderRef.current.stop();
      clearInterval(recordingTimerRef.current);
      
      // 关闭音频轨道
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      
      setIsRecording(false);
      setRecordTime(0);
    }
  };
  
  // 试听录音
  const playRecording = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  };
  
  // 下载录音
  const downloadRecording = () => {
    if (!audioUrl) return;
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = fileList[0]?.name || `录音_${new Date().toISOString().slice(0, 10)}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // 转换音频为文本
  const convertAudioToText = () => {
    if (fileList.length === 0) {
      message.error('请先上传或录制音频');
      return;
    }
    
    setIsConverting(true);
    setShowResult(true);
    
    // 模拟转换过程
    setTimeout(() => {
      setIsConverting(false);
      
      // 根据选择的语言生成不同的示例文本
      let sampleText = '';
      if (language === 'zh') {
        sampleText = '这是一段自动转换的中文文本示例。人工智能技术已经可以非常准确地识别语音并转换为文字。这个系统支持多种语言，包括中文、英语和维吾尔语。未来，我们将继续优化算法，提高识别准确率，支持更多的语言和方言。';
      } else if (language === 'en') {
        sampleText = 'This is a sample text automatically converted from English audio. Artificial intelligence technology can now accurately recognize speech and convert it to text. This system supports multiple languages including Chinese, English, and Uyghur. In the future, we will continue to optimize algorithms, improve recognition accuracy, and support more languages and dialects.';
      } else if (language === 'ug') {
        sampleText = 'بۇ ئۇيغۇرچە ئاۋازدىن ئاپتوماتىك ھالدا تېكىستكە ئايلاندۇرۇلغان بىر مىسال. سۈنئىي ئەقىل تېخنىكىسى ھازىر سۆزلەرنى توغرا تونۇپ تېكىستكە ئايلاندۇرالايدۇ. بۇ سىستېما خەنزۇچە، ئىنگلىزچە ۋە ئۇيغۇرچە قاتارلىق كۆپ خىل تىللارنى قوللايدۇ. كەلگۈسىدە، بىز ئالگورىزملارنى ئىزچىل ياخشىلاپ، تونۇش توغرىلىق نىسبىتىنى ئۆستۈرۈپ، تېخىمۇ كۆپ تىل ۋە شىۋىلەرنى قوللايمىز.';
      }
      
      setResultText(sampleText);
    }, 2000);
  };
  
  // 复制转换结果
  const copyResultText = () => {
    navigator.clipboard.writeText(resultText).then(() => {
      message.success('文本已复制到剪贴板');
    }).catch(err => {
      message.error('复制失败，请手动选择文本复制');
      console.error('复制错误:', err);
    });
  };
  
  // 清除结果
  const clearResult = () => {
    setResultText('');
    setShowResult(false);
    setFileList([]);
    
    // 清除音频URL
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl('');
    }
  };
  
  // 格式化录音时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <Content className="site-layout-background p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Row gutter={24}>
          {/* 左侧部分 - 参数设置和音频上传 */}
          <Col span={12}>
            <Card title="参数设置" className="mb-6 shadow-sm" bordered={false}>
              <div className="control-container">
                <div className="flex items-center mb-6">
                  <div className="w-20 text-right mr-4">语言：</div>
                  <Select 
                    value={language}
                    onChange={setLanguage}
                    className="w-48"
                    options={[
                      { value: 'zh', label: '汉语' },
                      { value: 'en', label: '英语' },
                      { value: 'ug', label: '维吾尔语' }
                    ]}
                  />
                </div>
              </div>
              
              <Divider />
              
              <div className="mt-4">
                <Paragraph>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>支持多种音频格式：MP3, WAV, M4A等</li>
                    <li>可直接上传本地音频文件</li>
                    <li>支持实时录音转文字</li>
                    <li>多语言识别支持</li>
                  </ul>
                </Paragraph>
              </div>
            </Card>
            
            <Card 
              title={<><AudioOutlined /> 音频输入</>} 
              className="mb-6 shadow-sm" 
              bordered={false}
            >
              <div className="flex flex-col items-center justify-center py-6 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <Upload {...uploadProps} className="mb-4">
                  <Button icon={<UploadOutlined />} size="large">
                    上传音频文件
                  </Button>
                </Upload>
                
                <Divider plain>或者</Divider>
                
                <div className="w-full flex flex-col items-center">
                  {!isRecording ? (
                    <Button 
                      type="primary" 
                      icon={<AudioOutlined />} 
                      onClick={startRecording}
                      size="large"
                      className="mb-2"
                      disabled={fileList.length > 0}
                    >
                      开始录音
                    </Button>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="text-red-500 animate-pulse mb-2 flex items-center">
                        <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        录音中... {formatTime(recordTime)}
                      </div>
                      <Button 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={stopRecording}
                        size="large"
                      >
                        停止录音
                      </Button>
                    </div>
                  )}
                  
                  {fileList.length > 0 && (
                    <div className="mt-4 w-full">
                      <div className="bg-blue-50 p-3 rounded flex justify-between items-center">
                        <span className="text-blue-700 flex items-center">
                          <AudioOutlined className="mr-2" />
                          {fileList[0].name}
                        </span>
                        <span className="text-gray-500">
                          {fileList[0].size ? `${(fileList[0].size / 1024 / 1024).toFixed(2)} MB` : ''}
                        </span>
                      </div>
                      
                      {/* 音频操作按钮 */}
                      {audioUrl && (
                        <div className="mt-3 flex justify-center space-x-3">
                          <Button 
                            type="primary" 
                            icon={<PlayCircleOutlined />} 
                            onClick={playRecording}
                          >
                            试听
                          </Button>
                          <Button 
                            type="default"
                            icon={<DownloadOutlined />} 
                            onClick={downloadRecording}
                          >
                            下载
                          </Button>
                          
                          {/* 隐藏的音频播放器 */}
                          <audio ref={audioRef} className="hidden" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  type="primary" 
                  size="large"
                  onClick={convertAudioToText}
                  disabled={fileList.length === 0 || isRecording}
                >
                  开始转换
                </Button>
              </div>
            </Card>
          </Col>
          
          {/* 右侧部分 - 转换结果 */}
          <Col span={12}>
            <Card 
              title={<><FileTextOutlined /> 识别结果</>} 
              className="shadow-md h-full flex flex-col"
              extra={
                <div>
                  <Button 
                    type="text" 
                    icon={<CopyOutlined />} 
                    onClick={copyResultText}
                    disabled={!resultText || isConverting}
                  >
                    复制
                  </Button>
                  <Button 
                    type="text" 
                    danger
                    icon={<DeleteOutlined />} 
                    onClick={clearResult}
                    disabled={isConverting}
                  >
                    清除
                  </Button>
                </div>
              }
            >
              {isConverting ? (
                <div className="flex justify-center items-center py-10 flex-grow">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-lg">正在识别音频内容...</span>
                </div>
              ) : !showResult ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 flex-grow">
                  <FileTextOutlined style={{ fontSize: '54px' }} />
                  <p className="mt-4 text-lg">转换结果将在这里显示</p>
                  <p className="text-sm">请上传或录制音频并点击"开始转换"</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded flex-grow flex flex-col">
                  <TextArea 
                    value={resultText}
                    autoSize={{ minRows: 18, maxRows: 22 }}
                    className="bg-transparent border-none text-base flex-grow"
                    readOnly
                  />
                  <div className="mt-4 text-right text-gray-500">
                    <Text type="secondary">
                      语言: {language === 'zh' ? '汉语' : (language === 'en' ? '英语' : '维吾尔语')} | 
                      字数: {resultText.length}
                    </Text>
                  </div>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default AudioToTextPage; 