import React, { useState } from 'react';
import { Layout, Card, Row, Col, Input, Select, Tag, Button, Divider, Typography, Radio, Pagination, Tooltip, Badge } from 'antd';
import { SearchOutlined, DownloadOutlined, EyeOutlined, FileWordOutlined, FileMarkdownOutlined, StarOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;

// 模板数据
const templateData = [
  {
    id: 1,
    name: "极简专业风",
    category: "简约",
    industry: ["技术", "金融", "教育"],
    popular: true,
    previewImage: "/resource/images/templates/template1.png",
    downloadWord: "/resource/templates/template1.docx",
    downloadMarkdown: "/resource/templates/template1.md"
  },
  {
    id: 2,
    name: "创意设计师",
    category: "创意",
    industry: ["设计", "艺术", "媒体"],
    popular: true,
    previewImage: "/resource/images/templates/template2.png",
    downloadWord: "/resource/templates/template2.docx",
    downloadMarkdown: "/resource/templates/template2.md"
  },
  {
    id: 3,
    name: "商务精英",
    category: "专业",
    industry: ["咨询", "金融", "管理"],
    popular: true,
    previewImage: "/resource/images/templates/template3.png",
    downloadWord: "/resource/templates/template3.docx",
    downloadMarkdown: "/resource/templates/template3.md"
  },
  {
    id: 4,
    name: "技术开发者",
    category: "专业",
    industry: ["技术", "工程", "研发"],
    popular: false,
    previewImage: "/resource/images/templates/template4.png",
    downloadWord: "/resource/templates/template4.docx",
    downloadMarkdown: "/resource/templates/template4.md"
  },
  {
    id: 5,
    name: "学术研究员",
    category: "专业",
    industry: ["教育", "研究", "医疗"],
    popular: false,
    previewImage: "/resource/images/templates/template5.png",
    downloadWord: "/resource/templates/template5.docx",
    downloadMarkdown: "/resource/templates/template5.md"
  },
  {
    id: 6,
    name: "时尚艺术家",
    category: "创意",
    industry: ["艺术", "时尚", "媒体"],
    popular: true,
    previewImage: "/resource/images/templates/template6.png",
    downloadWord: "/resource/templates/template6.docx",
    downloadMarkdown: "/resource/templates/template6.md"
  },
  {
    id: 7,
    name: "项目管理",
    category: "专业",
    industry: ["管理", "咨询", "技术"],
    popular: false,
    previewImage: "/resource/images/templates/template7.png",
    downloadWord: "/resource/templates/template7.docx",
    downloadMarkdown: "/resource/templates/template7.md"
  },
  {
    id: 8,
    name: "医疗专家",
    category: "专业",
    industry: ["医疗", "研究", "咨询"],
    popular: false,
    previewImage: "/resource/images/templates/template8.png",
    downloadWord: "/resource/templates/template8.docx",
    downloadMarkdown: "/resource/templates/template8.md"
  },
  {
    id: 9,
    name: "销售精英",
    category: "商务",
    industry: ["销售", "市场", "金融"],
    popular: true,
    previewImage: "/resource/images/templates/template9.png",
    downloadWord: "/resource/templates/template9.docx",
    downloadMarkdown: "/resource/templates/template9.md"
  },
  {
    id: 10,
    name: "教育工作者",
    category: "专业",
    industry: ["教育", "非营利", "咨询"],
    popular: false,
    previewImage: "/resource/images/templates/template10.png",
    downloadWord: "/resource/templates/template10.docx",
    downloadMarkdown: "/resource/templates/template10.md"
  },
  {
    id: 11,
    name: "数据分析师",
    category: "简约",
    industry: ["技术", "金融", "咨询"],
    popular: true,
    previewImage: "/resource/images/templates/template11.png",
    downloadWord: "/resource/templates/template11.docx",
    downloadMarkdown: "/resource/templates/template11.md"
  },
  {
    id: 12,
    name: "法律专业",
    category: "专业",
    industry: ["法律", "咨询", "金融"],
    popular: false,
    previewImage: "/resource/images/templates/template12.png",
    downloadWord: "/resource/templates/template12.docx",
    downloadMarkdown: "/resource/templates/template12.md"
  },
  {
    id: 13,
    name: "营销策划",
    category: "创意",
    industry: ["市场", "媒体", "销售"],
    popular: true,
    previewImage: "/resource/images/templates/template13.png",
    downloadWord: "/resource/templates/template13.docx",
    downloadMarkdown: "/resource/templates/template13.md"
  },
  {
    id: 14,
    name: "初级入门",
    category: "简约",
    industry: ["应届生", "实习", "教育"],
    popular: true,
    previewImage: "/resource/images/templates/template14.png",
    downloadWord: "/resource/templates/template14.docx",
    downloadMarkdown: "/resource/templates/template14.md"
  },
  {
    id: 15,
    name: "工程技术",
    category: "专业",
    industry: ["工程", "技术", "制造"],
    popular: false,
    previewImage: "/resource/images/templates/template15.png",
    downloadWord: "/resource/templates/template15.docx",
    downloadMarkdown: "/resource/templates/template15.md"
  },
  {
    id: 16,
    name: "双栏布局",
    category: "简约",
    industry: ["通用", "技术", "教育"],
    popular: true,
    previewImage: "/resource/images/templates/template16.png",
    downloadWord: "/resource/templates/template16.docx",
    downloadMarkdown: "/resource/templates/template16.md"
  },
  {
    id: 17,
    name: "创业者",
    category: "商务",
    industry: ["创业", "管理", "咨询"],
    popular: false,
    previewImage: "/resource/images/templates/template17.png",
    downloadWord: "/resource/templates/template17.docx",
    downloadMarkdown: "/resource/templates/template17.md"
  },
  {
    id: 18,
    name: "客户服务",
    category: "商务",
    industry: ["服务", "销售", "零售"],
    popular: false,
    previewImage: "/resource/images/templates/template18.png",
    downloadWord: "/resource/templates/template18.docx",
    downloadMarkdown: "/resource/templates/template18.md"
  },
  {
    id: 19,
    name: "色彩鲜明",
    category: "创意",
    industry: ["设计", "媒体", "艺术"],
    popular: true,
    previewImage: "/resource/images/templates/template19.png",
    downloadWord: "/resource/templates/template19.docx",
    downloadMarkdown: "/resource/templates/template19.md"
  },
  {
    id: 20,
    name: "高级管理",
    category: "专业",
    industry: ["管理", "金融", "咨询"],
    popular: true,
    previewImage: "/resource/images/templates/template20.png",
    downloadWord: "/resource/templates/template20.docx",
    downloadMarkdown: "/resource/templates/template20.md"
  }
];

// 获取所有可用的行业标签
const allIndustries = Array.from(new Set(templateData.flatMap(template => template.industry)));

const ResumeTemplatePage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('全部');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [showPopularOnly, setShowPopularOnly] = useState<boolean>(false);
  const [previewTemplate, setPreviewTemplate] = useState<number | null>(null);
  
  // 筛选模板
  const filteredTemplates = templateData.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || template.category === selectedCategory;
    const matchesIndustry = selectedIndustry === '全部' || template.industry.includes(selectedIndustry);
    const matchesPopular = !showPopularOnly || template.popular;
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesPopular;
  });
  
  // 分页
  const paginatedTemplates = filteredTemplates.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  
  // 下载模板
  const downloadTemplate = (templateId: number, format: 'word' | 'markdown') => {
    const template = templateData.find(t => t.id === templateId);
    if (!template) return;
    
    const link = document.createElement('a');
    link.href = format === 'word' ? template.downloadWord : template.downloadMarkdown;
    link.download = `${template.name}_${format === 'word' ? 'docx' : 'md'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // 预览模板
  const openPreview = (templateId: number) => {
    setPreviewTemplate(templateId);
    // 这里可以实现真实的预览功能，比如打开一个模态框
    console.log(`预览模板 ID: ${templateId}`);
  };
  
  return (
    <Content className="site-layout-background p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Row gutter={24}>
          {/* 左侧筛选区域 */}
          <Col span={6}>
            <Card className="shadow-sm" bordered={false}>
              <Title level={5}>筛选条件</Title>
              
              <div className="mb-4">
                <Search
                  placeholder="搜索模板名称"
                  allowClear
                  enterButton={<SearchOutlined />}
                  size="middle"
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  onSearch={value => setSearchText(value)}
                />
              </div>
              
              <Divider />
              
              <div className="mb-4">
                <p className="mb-2 font-medium">模板风格</p>
                <Radio.Group 
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <Radio.Button value="全部">全部</Radio.Button>
                    <Radio.Button value="简约">简约</Radio.Button>
                    <Radio.Button value="专业">专业</Radio.Button>
                    <Radio.Button value="创意">创意</Radio.Button>
                    <Radio.Button value="商务">商务</Radio.Button>
                  </div>
                </Radio.Group>
              </div>
              
              <div className="mb-4">
                <p className="mb-2 font-medium">其他筛选</p>
                <Button
                  type={showPopularOnly ? "primary" : "default"}
                  icon={<StarOutlined />}
                  onClick={() => setShowPopularOnly(!showPopularOnly)}
                  className="w-full"
                >
                  热门推荐
                </Button>
              </div>
              
              <Divider />
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium text-blue-700 mb-2">模板使用提示</p>
                <ul className="text-sm text-blue-600 list-disc pl-5">
                  <li>下载后可使用Word或Markdown编辑器打开</li>
                  <li>根据个人情况调整内容</li>
                  <li>保持简洁，突出重点经历和技能</li>
                  <li>避免排版过于复杂</li>
                </ul>
              </div>
            </Card>
          </Col>
          
          {/* 右侧模板展示区域 */}
          <Col span={18}>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-lg font-medium">找到 {filteredTemplates.length} 个模板</span>
                  {selectedCategory !== '全部' && (
                    <Tag color="blue" className="ml-2">{selectedCategory}</Tag>
                  )}
                  {selectedIndustry !== '全部' && (
                    <Tag color="green" className="ml-2">{selectedIndustry}</Tag>
                  )}
                  {showPopularOnly && (
                    <Tag color="orange" className="ml-2">热门推荐</Tag>
                  )}
                </div>
                
                <div>
                  <Select 
                    defaultValue="recent" 
                    style={{ width: 120 }}
                    className="mr-2"
                  >
                    <Option value="recent">最新上传</Option>
                    <Option value="popular">最受欢迎</Option>
                    <Option value="az">名称A-Z</Option>
                  </Select>
                </div>
              </div>
              
              <Row gutter={[16, 16]}>
                {paginatedTemplates.length > 0 ? (
                  paginatedTemplates.map(template => (
                    <Col span={8} key={template.id}>
                      <Card
                        className="template-card h-full shadow-sm hover:shadow-md transition-shadow duration-300"
                        cover={
                          <div className="relative h-64 bg-gray-100 overflow-hidden">
                            {template.popular && (
                              <div className="absolute top-2 right-2 z-10">
                                <Badge.Ribbon text="热门" color="orange" />
                              </div>
                            )}
                            <div className="h-full flex items-center justify-center">
                              {/* 实际项目中应使用真实预览图，这里用占位色块+文字替代 */}
                              <div 
                                className="w-5/6 h-5/6 flex items-center justify-center" 
                                style={{ backgroundColor: `hsl(${template.id * 20}, 70%, 90%)` }}
                              >
                                <span className="text-center text-gray-700 font-medium">{template.name}</span>
                              </div>
                            </div>
                          </div>
                        }
                        actions={[
                          <Tooltip title="预览模板">
                            <Button 
                              type="text" 
                              icon={<EyeOutlined />} 
                              onClick={() => openPreview(template.id)}
                            />
                          </Tooltip>,
                          <Tooltip title="下载Word版">
                            <Button 
                              type="text" 
                              icon={<FileWordOutlined />} 
                              onClick={() => downloadTemplate(template.id, 'word')}
                            />
                          </Tooltip>,
                          <Tooltip title="下载Markdown版">
                            <Button 
                              type="text" 
                              icon={<FileMarkdownOutlined />} 
                              onClick={() => downloadTemplate(template.id, 'markdown')}
                            />
                          </Tooltip>
                        ]}
                      >
                        <Meta
                          title={template.name}
                          description={
                            <div>
                              <div className="mb-2">
                                <Tag color="blue">{template.category}</Tag>
                              </div>
                              <div className="text-xs text-gray-500">
                                适用行业: {template.industry.join(', ')}
                              </div>
                            </div>
                          }
                        />
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col span={24}>
                    <div className="text-center p-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">没有找到符合条件的模板</p>
                    </div>
                  </Col>
                )}
              </Row>
              
              {filteredTemplates.length > pageSize && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredTemplates.length}
                    onChange={page => setCurrentPage(page)}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default ResumeTemplatePage; 