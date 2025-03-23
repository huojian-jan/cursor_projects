import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css';
import './i18n'; // 导入i18n配置

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 