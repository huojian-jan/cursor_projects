import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>打字练习网站</h1>
        <p>提升您的打字速度和准确性</p>
      </header>
      
      <main className="home-main">
        <div className="feature-card">
          <h2>🎯 英文打字练习</h2>
          <p>通过练习英文句子来提高您的打字技能</p>
          <Link to="/typing-practice" className="practice-button">
            开始英文练习
          </Link>
        </div>

        <div className="feature-card">
          <h2>🈲 中文拼音练习</h2>
          <p>练习中文拼音输入，提升中文输入速度</p>
          <Link to="/chinese-practice" className="practice-button chinese-button">
            开始拼音练习
          </Link>
        </div>

        <div className="feature-card">
          <h2>🌙 维吾尔语练习</h2>
          <p>练习维吾尔语拉丁转写，掌握RTL语言输入</p>
          <Link to="/uyghur-practice" className="practice-button uyghur-button">
            ئۇيغۇرچە مەشىق
          </Link>
        </div>
        
        <div className="coming-soon">
          <h3>即将推出</h3>
          <ul>
            <li>阿拉伯语练习</li>
            <li>五笔输入练习</li>
            <li>数字练习</li>
            <li>特殊符号练习</li>
            <li>打字速度测试</li>
            <li>多人竞技模式</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;
