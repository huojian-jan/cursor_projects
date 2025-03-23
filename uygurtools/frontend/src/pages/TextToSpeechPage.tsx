import React, { useState, useRef } from 'react';
import { Layout, Select, Slider, Input, Button, Card, Typography, Row, Col, Divider } from 'antd';
import { DownloadOutlined, SoundOutlined, FileTextOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const TextToSpeechPage: React.FC = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('zh');
  const [voice, setVoice] = useState('male');
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const handleListen = () => {
    if (!text.trim()) {
      alert('请输入要转换的文字');
      return;
    }
    
    setShowPlayer(true);
    setLoading(true);
    
    // 模拟API调用
    setTimeout(() => {
      setLoading(false);
      if (audioRef.current) {
        audioRef.current.src = '/resource/audio/custom_audio.m4a';
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 2000);
  };
  
  const handleGenerate = () => {
    if (!text.trim()) {
      alert('请输入要转换的文字');
      return;
    }
    
    setShowPlayer(true);
    setLoading(true);
    
    // 模拟API调用
    setTimeout(() => {
      setLoading(false);
      if (audioRef.current) {
        audioRef.current.src = '/resource/audio/custom_audio.m4a';
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 1500);
  };
  
  const handleDownload = () => {
    if (!audioRef.current?.src) {
      alert('没有可下载的音频');
      return;
    }
    
    const link = document.createElement('a');
    link.href = audioRef.current.src;
    link.download = `${language}_${voice}_audio.m4a`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Content className="site-layout-background p-6 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <Row gutter={24}>
          <Col span={10}>
            <Card title="参数设置" className="mb-6 h-full shadow-sm" bordered={false}>
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
                
                <div className="flex items-center mb-6">
                  <div className="w-20 text-right mr-4">语音：</div>
                  <Select
                    value={voice}
                    onChange={setVoice}
                    className="w-48"
                    options={[
                      { value: 'male', label: '男声' },
                      { value: 'female', label: '女声' }
                    ]}
                  />
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-20 text-right mr-4">语速：</div>
                  <div className="w-48">
                    <div className="relative">
                      <Slider
                        min={0.1}
                        max={3.0}
                        step={0.1}
                        value={speed}
                        onChange={setSpeed}
                        className="w-full"
                        tooltip={{ formatter: (value) => `${value}x` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Divider />
              
              <div className="mt-6">
                <Paragraph>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>支持多语言转换</li>
                    <li>自然流畅的语音输出</li>
                    <li>可调节语速满足不同需求</li>
                  </ul>
                </Paragraph>
              </div>
            </Card>
          </Col>
          
          <Col span={14}>
            <Card 
              title={<><FileTextOutlined /> 文本输入</>} 
              className="mb-6 shadow-sm" 
              bordered={false}
            >
              {/* 文本输入区 */}
              <div className="mb-6">
                <TextArea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="请输入要转换为语音的文本..."
                  autoSize={{ minRows: 8, maxRows: 14 }}
                  className="w-full p-4 text-base"
                  maxLength={500}
                  showCount
                />
              </div>
              
              {/* 按钮区 */}
              <div className="flex justify-end gap-4">
                <Button 
                  type="primary" 
                  onClick={handleListen}
                  size="large"
                  icon={<SoundOutlined />}
                >
                  试听
                </Button>
                <Button 
                  type="primary" 
                  onClick={handleGenerate}
                  size="large"
                >
                  生成
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
        
        {/* 音频播放器 */}
        {showPlayer && (
          <Card className="mt-6 bg-blue-50 shadow-md">
            <div className="text-center mb-4">
              {loading ? (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-lg">正在{isPlaying ? '加载' : '生成'}音频...</span>
                </div>
              ) : (
                <div className="py-2 text-lg font-medium">
                  {`${language === 'zh' ? '汉语' : (language === 'en' ? '英语' : '维吾尔语')} | ${voice === 'male' ? '男声' : '女声'} | 语速: ${speed}`}
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <audio
                ref={audioRef}
                controls
                className="w-full"
                style={{ display: loading ? 'none' : 'block' }}
              />
              {!loading && (
                <Button
                  icon={<DownloadOutlined />}
                  onClick={handleDownload}
                  type="primary"
                  className="ml-2"
                >
                  下载
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </Content>
  );
};

export default TextToSpeechPage; 