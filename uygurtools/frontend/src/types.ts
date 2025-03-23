export interface Tool {
  id: string;
  name: string;
  icon: string;
  description: string;
  rating: number;
  usageCount: string;
  category: string;
  categoryId: string;
  badge: string;
  path?: string;
}

export interface Category {
  id: string;
  title: string;
  tools: Tool[];
} 