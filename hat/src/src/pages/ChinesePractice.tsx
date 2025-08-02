import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getRandomChineseWords, type ChineseWord } from '../utils/mockData';
import './ChinesePractice.css';

const ChinesePractice = () => {
  const [words, setWords] = useState<ChineseWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedWords, setCompletedWords] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 初始化练习
  useEffect(() => {
    loadNewPractice();
  }, []);

  // 自动聚焦输入框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [words]);

  const loadNewPractice = () => {
    const newWords = getRandomChineseWords(10); // 每次练习10个词
    setWords(newWords);
    setCurrentWordIndex(0);
    setUserInput('');
    setCurrentCharIndex(0);
    setCompletedWords(0);
    setErrors(0);
    setShowMeaning(false);
    setStartTime(null);
    setIsCompleted(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const currentWord = words[currentWordIndex];
    if (!currentWord) return;

    // 开始计时
    if (startTime === null && value.length === 1) {
      setStartTime(Date.now());
    }

    const targetPinyin = currentWord.pinyin;

    // 防止输入超过当前拼音长度
    if (value.length > targetPinyin.length) {
      return;
    }

    setUserInput(value);
    setCurrentCharIndex(value.length);

    // 检查当前词是否完成
    if (value === targetPinyin) {
      // 完成当前词
      setTimeout(() => {
        const newCompletedWords = completedWords + 1;
        setCompletedWords(newCompletedWords);
        
        if (currentWordIndex + 1 >= words.length) {
          // 完成所有词汇
          setIsCompleted(true);
        } else {
          // 移动到下一个词
          setCurrentWordIndex(currentWordIndex + 1);
          setUserInput('');
          setCurrentCharIndex(0);
        }
      }, 500);
    }

    // 计算错误数
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== targetPinyin[i]) {
        errorCount++;
      }
    }
    setErrors(errors + (errorCount > 0 ? 1 : 0));
  };

  const renderPinyin = (pinyin: string) => {
    return pinyin.split('').map((char, index) => {
      let className = 'pinyin-char';
      
      if (index < userInput.length) {
        // 已输入的字符
        if (userInput[index] === char) {
          className += ' correct';
        } else {
          className += ' incorrect';
        }
      } else if (index === currentCharIndex) {
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
    if (completedWords === 0) return 100;
    return Math.round(((completedWords * 10 - errors) / (completedWords * 10)) * 100);
  };

  const getCurrentWord = () => words[currentWordIndex];

  const toggleMeaning = () => {
    setShowMeaning(!showMeaning);
  };

  if (words.length === 0) {
    return <div className="loading">加载中...</div>;
  }

  const currentWord = getCurrentWord();

  return (
    <div className="chinese-practice-container">
      <header className="practice-header">
        <Link to="/" className="back-button">← 返回首页</Link>
        <h1>中文拼音练习</h1>
      </header>

      <div className="practice-content">
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(completedWords / words.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {completedWords}/{words.length} 词汇完成
          </span>
        </div>

        {!isCompleted && currentWord && (
          <div className="word-display">
            <div className="chinese-word">
              {currentWord.word}
            </div>
            
            <div className="pinyin-display">
              {renderPinyin(currentWord.pinyin)}
            </div>

            <div className="meaning-section">
              <button onClick={toggleMeaning} className="meaning-toggle">
                {showMeaning ? '隐藏' : '显示'}含义
              </button>
              {showMeaning && currentWord.meaning && (
                <div className="word-meaning">
                  {currentWord.meaning}
                </div>
              )}
            </div>
          </div>
        )}

        {!isCompleted && (
          <div className="input-section">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="输入上面汉字的拼音..."
              className="pinyin-input"
            />
            <div className="input-hint">
              请用空格分隔音节，如：ni hao
            </div>
          </div>
        )}

        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-label">已完成:</span>
            <span className="stat-value">{completedWords}/{words.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">准确率:</span>
            <span className="stat-value">{getAccuracy()}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">错误次数:</span>
            <span className="stat-value">{errors}</span>
          </div>
        </div>

        {isCompleted && (
          <div className="completion-section">
            <h2>🎉 练习完成！</h2>
            <p>恭喜您完成了本轮中文拼音练习！</p>
            <div className="final-stats">
              <p>完成词汇: {completedWords}</p>
              <p>准确率: {getAccuracy()}%</p>
              <p>错误次数: {errors}</p>
            </div>
            <button onClick={loadNewPractice} className="new-practice-button">
              开始新练习
            </button>
          </div>
        )}

        <div className="controls">
          <button onClick={loadNewPractice} className="reset-button">
            重新开始
          </button>
          <button onClick={toggleMeaning} className="hint-button">
            {showMeaning ? '隐藏所有含义' : '显示所有含义'}
          </button>
        </div>

        <div className="word-list">
          <h3>本轮练习词汇</h3>
          <div className="words-grid">
            {words.map((word, index) => (
              <div 
                key={index} 
                className={`word-item ${index < currentWordIndex ? 'completed' : ''} ${index === currentWordIndex ? 'current' : ''}`}
              >
                <div className="word-chinese">{word.word}</div>
                <div className="word-pinyin">{word.pinyin}</div>
                {showMeaning && word.meaning && (
                  <div className="word-meaning-small">{word.meaning}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChinesePractice;
