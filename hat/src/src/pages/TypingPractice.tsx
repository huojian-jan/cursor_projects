import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getRandomSentence } from '../utils/mockData';
import './TypingPractice.css';

const TypingPractice = () => {
  const [currentSentence, setCurrentSentence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // 初始化句子
  useEffect(() => {
    loadNewSentence();
  }, []);

  // 自动聚焦输入框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentSentence]);

  const loadNewSentence = () => {
    setCurrentSentence(getRandomSentence());
    setUserInput('');
    setCurrentIndex(0);
    setIsCompleted(false);
    setErrors(0);
    setStartTime(null);
    setWpm(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // 开始计时
    if (startTime === null && value.length === 1) {
      setStartTime(Date.now());
    }

    // 防止输入超过句子长度
    if (value.length > currentSentence.length) {
      return;
    }

    setUserInput(value);
    setCurrentIndex(value.length);

    // 检查完成状态
    if (value === currentSentence) {
      setIsCompleted(true);
      calculateWPM(value.length);
    }

    // 计算错误数
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentSentence[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
  };

  const calculateWPM = (charactersTyped: number) => {
    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // 分钟
      const wordsTyped = charactersTyped / 5; // 平均每个单词5个字符
      const calculatedWPM = Math.round(wordsTyped / timeElapsed);
      setWpm(calculatedWPM);
    }
  };

  const renderSentence = () => {
    return currentSentence.split('').map((char, index) => {
      let className = 'char';
      
      if (index < userInput.length) {
        // 已输入的字符
        if (userInput[index] === char) {
          className += ' correct';
        } else {
          className += ' incorrect';
        }
      } else if (index === currentIndex) {
        // 当前要输入的字符
        className += ' current';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const getAccuracy = () => {
    if (userInput.length === 0) return 100;
    return Math.round(((userInput.length - errors) / userInput.length) * 100);
  };

  return (
    <div className="typing-practice-container">
      <header className="practice-header">
        <Link to="/" className="back-button">← 返回首页</Link>
        <h1>英文打字练习</h1>
      </header>

      <div className="practice-content">
        <div className="sentence-display">
          <div className="sentence-text">
            {renderSentence()}
          </div>
        </div>

        <div className="input-section">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="开始输入上面的句子..."
            className="typing-input"
            disabled={isCompleted}
          />
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-label">进度:</span>
            <span className="stat-value">{userInput.length}/{currentSentence.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">准确率:</span>
            <span className="stat-value">{getAccuracy()}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">错误:</span>
            <span className="stat-value">{errors}</span>
          </div>
          {isCompleted && (
            <div className="stat-item">
              <span className="stat-label">速度:</span>
              <span className="stat-value">{wpm} WPM</span>
            </div>
          )}
        </div>

        {isCompleted && (
          <div className="completion-section">
            <h2>🎉 完成！</h2>
            <p>恭喜您完成了这个句子的练习！</p>
            <button onClick={loadNewSentence} className="new-sentence-button">
              下一句
            </button>
          </div>
        )}

        <div className="controls">
          <button onClick={loadNewSentence} className="reset-button">
            重新开始
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypingPractice;
