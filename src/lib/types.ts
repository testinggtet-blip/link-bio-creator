// Database Types
export interface User {
  id: number;
  username: string;
  name: string;
  bio: string;
  profileImage: string;
  backgroundImage: string;
  theme: string;
  createdAt: string;
  updatedAt: string;
}

export interface Link {
  id: number;
  userId: number;
  title: string;
  url: string;
  icon: string;
  orderIndex: number;
  clickCount: number;
  layout?: 'classic' | 'featured';
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsData {
  totalClicks: number;
  totalLinks: number;
  linkStats: {
    linkId: number;
    title: string;
    clicks: number;
    url: string;
  }[];
  clicksOverTime: {
    date: string;
    clicks: number;
  }[];
}

export interface Theme {
  id: string;
  name: string;
  background: string;
  backgroundImage?: string;
  cardBackground: string;
  textColor: string;
  linkBackground: string;
  linkHoverBackground: string;
  linkTextColor: string;
  borderColor?: string;
  accentColor: string;
}