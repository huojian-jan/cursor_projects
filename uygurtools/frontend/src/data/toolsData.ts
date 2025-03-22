import { Category } from '../types';

export const categories: Category[] = [
  {
    id: "audio-tools",
    title: "AI音频",
    tools: [
      {
        id: "text-to-speech",
        name: "文字转语音",
        icon: "/resource/images/tool-icon.svg",
        description: "将文本转换为自然流畅的语音，支持多种语言和音色",
        rating: 4.7,
        usageCount: "45.3万次使用",
        category: "AI音频",
        categoryId: "audio-tools",
        badge: "语音合成"
      },
      {
        id: "speech-to-text",
        name: "音频转文字",
        icon: "/resource/images/tool-icon.svg",
        description: "准确识别音频内容并转换为文本，支持多种语言和方言",
        rating: 4.7,
        usageCount: "待上线",
        category: "AI音频",
        categoryId: "audio-tools",
        badge: "语音识别"
      },
      // 添加更多音频工具...
    ]
  },
  {
    id: "resume-tools",
    title: "AI简历",
    tools: [
      {
        id: "resume-maker",
        name: "智能简历生成",
        icon: "/resource/images/tool-icon.svg",
        description: "根据个人信息自动生成专业简历，支持多种模板和格式",
        rating: 4.8,
        usageCount: "35.6万次使用",
        category: "AI简历",
        categoryId: "resume-tools",
        badge: "简历生成"
      },
      // 添加更多简历工具...
    ]
  },
  {
    id: "photo-tools",
    title: "AI照片",
    tools: [
      {
        id: "photo-enhancer",
        name: "照片增强",
        icon: "/resource/images/tool-icon.svg",
        description: "智能提升照片质量，修复损坏照片，增强色彩和清晰度",
        rating: 4.9,
        usageCount: "89.7万次使用",
        category: "AI照片",
        categoryId: "photo-tools",
        badge: "图像处理"
      },
      // 添加更多照片工具...
    ]
  },
  {
    id: "doc-convert-tools",
    title: "AI文档",
    tools: [
      {
        id: "word-pdf-converter",
        name: "Word⇄PDF",
        icon: "/resource/images/tool-icon.svg",
        description: "智能转换Word和PDF文档格式，保留原始排版和样式",
        rating: 4.8,
        usageCount: "56.7万次使用",
        category: "AI文档",
        categoryId: "doc-convert-tools",
        badge: "格式转换"
      },
      {
        id: "image-to-word",
        name: "图片转Word",
        icon: "/resource/images/tool-icon.svg",
        description: "自动识别图片中的文字和表格，转换为可编辑Word文档",
        rating: 4.7,
        usageCount: "49.3万次使用",
        category: "AI文档",
        categoryId: "doc-convert-tools",
        badge: "文字识别"
      },
      // 添加更多文档工具...
    ]
  }
];

export const adCarouselData = [
  {
    id: 1,
    slides: [
      { color: "#FFB6C1", text: "这里是广告位，超划算！" },
      { color: "#87CEEB", text: "点我点我，我是广告君~" },
      { color: "#98FB98", text: "广告位招租，不贵不贵！" }
    ]
  },
  {
    id: 2,
    slides: [
      { color: "#DDA0DD", text: "我可是高端广告位哦！" },
      { color: "#FFDAB9", text: "广告位待认领，速来！" },
      { color: "#B0E0E6", text: "来了来了，广告没来我先来！" }
    ]
  },
  {
    id: 3,
    slides: [
      { color: "#FFA07A", text: "广告位虚位以待~" },
      { color: "#20B2AA", text: "我是一个有故事的广告位" },
      { color: "#B8860B", text: "抢广告位，先到先得！" }
    ]
  }
]; 