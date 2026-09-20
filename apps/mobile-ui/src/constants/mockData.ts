import { Post } from '../types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: {
      id: 'user-1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    content:
      'Chasing the neon sunsets in Tokyo 🌆✨ The interplay of glass facades and evening light is mesmerizing.',
    imageUrl:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    tags: ['photography', 'tokyo', 'cyberpunk', 'vibes'],
    timestamp: Date.now() - 1000 * 60 * 18, // 18 mins ago
    likes: 142,
    commentsCount: 19,
  },
  {
    id: 'post-2',
    author: {
      id: 'user-2',
      username: 'marcus_dev',
      displayName: 'Marcus Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    },
    content:
      'Exploring frosted UI aesthetics today! What are your favorite design systems incorporating translucent glass and fluid gradients?',
    tags: ['design', 'uiux', 'reactnative', 'glassmorphism'],
    timestamp: Date.now() - 1000 * 60 * 65, // 1 hour ago
    likes: 88,
    commentsCount: 34,
  },
  {
    id: 'post-3',
    author: {
      id: 'user-3',
      username: 'sara_nordic',
      displayName: 'Sara Lindqvist',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
    content:
      'First light over the fjord in Lofoten. Crisp air and silent waters. Nature never needs a filter. ❄️🏔️',
    imageUrl:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    tags: ['wanderlust', 'norway', 'nature', 'landscape'],
    timestamp: Date.now() - 1000 * 60 * 180, // 3 hours ago
    likes: 312,
    commentsCount: 45,
  },
  {
    id: 'post-4',
    author: {
      id: 'user-4',
      username: 'alex_minimal',
      displayName: 'Alex Rivers',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    content:
      'Clean architecture isn’t just about code organization; it’s about providing space for the mind to think and iterate quickly. Keep it simple.',
    tags: ['technology', 'software', 'architecture'],
    timestamp: Date.now() - 1000 * 60 * 420, // 7 hours ago
    likes: 54,
    commentsCount: 12,
  },
  {
    id: 'post-5',
    author: {
      id: 'user-5',
      username: 'maya_art',
      displayName: 'Maya V.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    content:
      'Fresh colors and gradients for a new branding study. The refraction in organic curves always brings things alive!',
    imageUrl:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80',
    tags: ['abstract', 'art', 'colors', 'visuals'],
    timestamp: Date.now() - 1000 * 60 * 720, // 12 hours ago
    likes: 215,
    commentsCount: 27,
  },
];
