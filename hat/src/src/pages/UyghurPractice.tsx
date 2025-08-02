import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getRandomUyghurWords, type UyghurWord } from '../utils/mockData';
import './UyghurPractice.css';

const UyghurPractice = () => {
  const [words, setWords] = useState<UyghurWord[]>([]);
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
    const newWords = getRandomUyghurWords(10); // 每次练习10个词
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

    const targetWord = currentWord.word;

    // 防止输入超过当前维吾尔语词汇长度
    if (value.length > targetWord.length) {
      return;
    }

    setUserInput(value);
    setCurrentCharIndex(value.length);

    // 检查当前词是否完成
    if (value === targetWord) {
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
      if (value[i] !== targetWord[i]) {
        errorCount++;
      }
    }
    setErrors(errors + (errorCount > 0 ? 1 : 0));
  };

  const renderUyghurWord = (word: string) => {
    return word.split('').map((char, index) => {
      let className = 'uyghur-char';
      
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
    return <div className="loading">يۈكلىنىۋاتىدۇ...</div>;
  }

  const currentWord = getCurrentWord();

  return (
    <div className="uyghur-practice-container">
      <header className="practice-header">
        <Link to="/" className="back-button">← باش بەتكە قايتىش</Link>
        <h1>ئۇيغۇرچە يېزىش مەشىقى</h1>
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
            {completedWords}/{words.length} سۆز تاماملاندى
          </span>
        </div>

        {!isCompleted && currentWord && (
          <div className="word-display">
            <div className="uyghur-word-target">
              {renderUyghurWord(currentWord.word)}
            </div>
            
            <div className="latin-reference">
              <small>拉丁转写参考: {currentWord.latin}</small>
            </div>

            <div className="meaning-section">
              <button onClick={toggleMeaning} className="meaning-toggle">
                {showMeaning ? 'يوشۇرۇش' : 'مەنىسى'}
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
              placeholder="يۇقىرىدىكى سۆزنى يېزىڭ..."
              className="uyghur-input"
              dir="rtl"
            />
            <div className="input-hint">
              ئۇيغۇر ھەرپلىرى بىلەن يېزىڭ، مەسىلەن: ياخشىمۇسىز
            </div>
          </div>
        )}

        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-label">تاماملانغان:</span>
            <span className="stat-value">{completedWords}/{words.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">توغرىلىق نىسپىتى:</span>
            <span className="stat-value">{getAccuracy()}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">خاتالىق سانى:</span>
            <span className="stat-value">{errors}</span>
          </div>
        </div>

        {isCompleted && (
          <div className="completion-section">
            <h2>🎉 مەشىق تاماملاندى!</h2>
            <p>مۇبارەك بولسۇن! بۇ قېتىملىق ئۇيغۇرچە يېزىش مەشىقىنى تاماملىدىڭىز!</p>
            <div className="final-stats">
              <p>تاماملانغان سۆزلەر: {completedWords}</p>
              <p>توغرىلىق نىسپىتى: {getAccuracy()}%</p>
              <p>خاتالىق سانى: {errors}</p>
            </div>
            <button onClick={loadNewPractice} className="new-practice-button">
              يېڭى مەشىق باشلاش
            </button>
          </div>
        )}

        <div className="controls">
          <button onClick={loadNewPractice} className="reset-button">
            قايتا باشلاش
          </button>
          <button onClick={toggleMeaning} className="hint-button">
            {showMeaning ? 'بارلىق مەنىسىنى يوشۇرۇش' : 'بارلىق مەنىسىنى كۆرسىتىش'}
          </button>
        </div>

        <div className="word-list">
          <h3>بۇ قېتىملىق مەشىق سۆزلىرى</h3>
          <div className="words-grid">
            {words.map((word, index) => (
              <div 
                key={index} 
                className={`word-item ${index < currentWordIndex ? 'completed' : ''} ${index === currentWordIndex ? 'current' : ''}`}
              >
                <div className="word-uyghur">{word.word}</div>
                <div className="word-latin">{word.latin}</div>
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

export default UyghurPractice;
