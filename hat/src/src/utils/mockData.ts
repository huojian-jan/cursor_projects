// 模拟英文句子数据
export const mockSentences = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "Practice makes perfect when you keep typing every day.",
  "Technology is best when it brings people together.",
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Your limitation is only your imagination and dedication.",
  "Great things never come from comfort zones in life.",
  "Success is not final, failure is not fatal, courage counts.",
  "Be yourself everyone else is already taken by someone."
];

// 获取随机句子
export const getRandomSentence = (): string => {
  const randomIndex = Math.floor(Math.random() * mockSentences.length);
  return mockSentences[randomIndex];
};

// 获取多个随机句子
export const getRandomSentences = (count: number): string[] => {
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) {
    sentences.push(getRandomSentence());
  }
  return sentences;
};

// 中文拼音练习数据
export interface ChineseWord {
  word: string;
  pinyin: string;
  meaning?: string;
}

export const mockChineseWords: ChineseWord[] = [
  { word: "你好", pinyin: "ni hao", meaning: "hello" },
  { word: "世界", pinyin: "shi jie", meaning: "world" },
  { word: "学习", pinyin: "xue xi", meaning: "study" },
  { word: "电脑", pinyin: "dian nao", meaning: "computer" },
  { word: "键盘", pinyin: "jian pan", meaning: "keyboard" },
  { word: "打字", pinyin: "da zi", meaning: "typing" },
  { word: "练习", pinyin: "lian xi", meaning: "practice" },
  { word: "技能", pinyin: "ji neng", meaning: "skill" },
  { word: "提高", pinyin: "ti gao", meaning: "improve" },
  { word: "速度", pinyin: "su du", meaning: "speed" },
  { word: "准确", pinyin: "zhun que", meaning: "accurate" },
  { word: "输入", pinyin: "shu ru", meaning: "input" },
  { word: "方法", pinyin: "fang fa", meaning: "method" },
  { word: "简单", pinyin: "jian dan", meaning: "simple" },
  { word: "困难", pinyin: "kun nan", meaning: "difficult" },
  { word: "坚持", pinyin: "jian chi", meaning: "persist" },
  { word: "进步", pinyin: "jin bu", meaning: "progress" },
  { word: "成功", pinyin: "cheng gong", meaning: "success" },
  { word: "努力", pinyin: "nu li", meaning: "effort" },
  { word: "完成", pinyin: "wan cheng", meaning: "complete" },
  { word: "开始", pinyin: "kai shi", meaning: "begin" },
  { word: "结束", pinyin: "jie shu", meaning: "end" },
  { word: "时间", pinyin: "shi jian", meaning: "time" },
  { word: "今天", pinyin: "jin tian", meaning: "today" },
  { word: "明天", pinyin: "ming tian", meaning: "tomorrow" },
  { word: "工作", pinyin: "gong zuo", meaning: "work" },
  { word: "生活", pinyin: "sheng huo", meaning: "life" },
  { word: "朋友", pinyin: "peng you", meaning: "friend" },
  { word: "家庭", pinyin: "jia ting", meaning: "family" },
  { word: "快乐", pinyin: "kuai le", meaning: "happy" }
];

// 获取随机中文词汇
export const getRandomChineseWord = (): ChineseWord => {
  const randomIndex = Math.floor(Math.random() * mockChineseWords.length);
  return mockChineseWords[randomIndex];
};

// 获取多个随机中文词汇
export const getRandomChineseWords = (count: number): ChineseWord[] => {
  const words: ChineseWord[] = [];
  const usedIndices = new Set<number>();
  
  while (words.length < count && words.length < mockChineseWords.length) {
    const randomIndex = Math.floor(Math.random() * mockChineseWords.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      words.push(mockChineseWords[randomIndex]);
    }
  }
  
  return words;
};

// 维吾尔语练习数据
export interface UyghurWord {
  word: string;
  latin: string;
  meaning?: string;
}

export const mockUyghurWords: UyghurWord[] = [
  { word: "ياخشىمۇسىز", latin: "yaxshimusiz", meaning: "你好" },
  { word: "دۇنيا", latin: "dunya", meaning: "世界" },
  { word: "ئۆگىنىش", latin: "öginish", meaning: "学习" },
  { word: "كومپيۇتېر", latin: "kompyutér", meaning: "电脑" },
  { word: "كۇنۇپكا تاختىسى", latin: "kunupka taxtisi", meaning: "键盘" },
  { word: "يېزىش", latin: "yëzish", meaning: "打字" },
  { word: "مەشىق قىلىش", latin: "meshiq qilish", meaning: "练习" },
  { word: "ماھارەت", latin: "maharet", meaning: "技能" },
  { word: "يۇقىرىلىتىش", latin: "yuqirilitish", meaning: "提高" },
  { word: "سۈرئەت", latin: "sür'et", meaning: "速度" },
  { word: "توغرا", latin: "toghra", meaning: "准确" },
  { word: "كىرگۈزۈش", latin: "kirgüzüsh", meaning: "输入" },
  { word: "ئۇسۇل", latin: "usul", meaning: "方法" },
  { word: "ئاددىي", latin: "addiy", meaning: "简单" },
  { word: "قىيىن", latin: "qiyin", meaning: "困难" },
  { word: "چىڭ تۇرۇش", latin: "ching turush", meaning: "坚持" },
  { word: "ئىلگىرىلەش", latin: "ilgirilesh", meaning: "进步" },
  { word: "مۇۋەپپەقىيەت", latin: "muweppeqiyet", meaning: "成功" },
  { word: "تىرىشچانلىق", latin: "tirishchanliq", meaning: "努力" },
  { word: "تاماملاش", latin: "tamamlash", meaning: "完成" },
  { word: "باشلاش", latin: "bashlash", meaning: "开始" },
  { word: "ئاخىرلاشتۇرۇش", latin: "axirlashturush", meaning: "结束" },
  { word: "ۋاقىت", latin: "waqit", meaning: "时间" },
  { word: "بۈگۈن", latin: "bügün", meaning: "今天" },
  { word: "ئەتە", latin: "ete", meaning: "明天" },
  { word: "خىزمەت", latin: "xizmet", meaning: "工作" },
  { word: "تۇرمۇش", latin: "turmush", meaning: "生活" },
  { word: "دوست", latin: "dost", meaning: "朋友" },
  { word: "ئائىلە", latin: "a'ile", meaning: "家庭" },
  { word: "خۇشاللىق", latin: "xushalliq", meaning: "快乐" }
];

// 获取随机维吾尔语词汇
export const getRandomUyghurWord = (): UyghurWord => {
  const randomIndex = Math.floor(Math.random() * mockUyghurWords.length);
  return mockUyghurWords[randomIndex];
};

// 获取多个随机维吾尔语词汇
export const getRandomUyghurWords = (count: number): UyghurWord[] => {
  const words: UyghurWord[] = [];
  const usedIndices = new Set<number>();
  
  while (words.length < count && words.length < mockUyghurWords.length) {
    const randomIndex = Math.floor(Math.random() * mockUyghurWords.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      words.push(mockUyghurWords[randomIndex]);
    }
  }
  
  return words;
};
