import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TypingPractice from './pages/TypingPractice';
import ChinesePractice from './pages/ChinesePractice';
import UyghurPractice from './pages/UyghurPractice';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/typing-practice" element={<TypingPractice />} />
          <Route path="/chinese-practice" element={<ChinesePractice />} />
          <Route path="/uyghur-practice" element={<UyghurPractice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
