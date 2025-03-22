import React, { useState, useRef } from 'react';
import { Layout, Select, Slider, Input, Button, Card, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

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
    <Content className="site-layout-background p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <Title level={2} className="mb-8 text-center">文字转语音</Title>
        
        <div className="mb-8">
          {/* 控制选项 */}
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
                    tooltip={{ formatter: (value) => `${value}` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* 文本输入区 */}
          <div className="mb-6">
            <TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="请输入要转换为语音的文本..."
              autoSize={{ minRows: 6, maxRows: 12 }}
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
        </div>
        
        {/* 音频播放器 */}
        {showPlayer && (
          <Card className="mt-6 bg-blue-50">
            <div className="text-center mb-4">
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3">正在{isPlaying ? '加载' : '生成'}音频...</span>
                </div>
              ) : (
                <div>
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