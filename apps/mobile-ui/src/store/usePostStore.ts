import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../types';
import { INITIAL_POSTS } from '../constants/mockData';

interface PostState {
  posts: Post[];
  addPost: (post: Post) => void;
  clearPosts: () => void;
  resetPosts: () => void;
}

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      posts: INITIAL_POSTS,
      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
      clearPosts: () => set({ posts: [] }),
      resetPosts: () => set({ posts: INITIAL_POSTS }),
    }),
    {
      name: 'post-storage-v2',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

