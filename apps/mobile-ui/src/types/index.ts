export interface Post {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  tags: string[];
  timestamp: number;
  likes?: number;
  commentsCount?: number;
}

export interface User {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  liquidGlass: boolean;
  glassIntensity: number;
}

export type RootTabParamList = {
  Dashboard: undefined;
  CreatePost: undefined;
  Profile: undefined;
};
