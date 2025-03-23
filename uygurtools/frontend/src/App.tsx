import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ToolDetailPage from './pages/ToolDetailPage';
import TextToSpeechPage from './pages/TextToSpeechPage';
import AudioToTextPage from './pages/AudioToTextPage';
import ResumeTemplatePage from './pages/ResumeTemplatePage';
import WordToPdfPage from './pages/WordToPdfPage';
import ZhengjianzhaoPage from './pages/ZhengjianzhaoPage';
import ImageToWordPage from './pages/ImageToWordPage';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="tool/:id" element={<ToolDetailPage />} />
            <Route path="text-to-speech" element={<TextToSpeechPage />} />
            <Route path="speech-to-text" element={<AudioToTextPage />} />
            <Route path="resume-templates" element={<ResumeTemplatePage />} />
            <Route path="word-pdf-converter" element={<WordToPdfPage />} />
            <Route path="id-photo-maker" element={<ZhengjianzhaoPage />} />
            <Route path="image-to-word" element={<ImageToWordPage />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App; 