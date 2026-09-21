import { Newspaper } from 'lucide-react';
import {
  IconFacebook,
  IconTiktok,
  IconYoutube,
} from '@/assets/brand-icons';

export const apps = [
  {
    name: 'Internal Blog',
    logo: <Newspaper className='size-6 text-blue-600 dark:text-blue-400' />,
    connected: true,
    desc: 'Default built-in blog website provided natively by the system for direct content publishing.',
  },
  {
    name: 'Facebook',
    logo: <IconFacebook className='size-6 text-blue-600 dark:text-blue-500 fill-blue-600/10' />,
    connected: false,
    desc: 'Connect with Facebook profile for management.',
  },
  {
    name: 'Tiktok',
    logo: <IconTiktok className='size-6 text-zinc-900 dark:text-zinc-100 fill-zinc-900/10 dark:fill-zinc-100/10' />,
    connected: false,
    desc: 'Connect with TikTok account to manage videos, and interactions.',
  },
  {
    name: 'Youtube',
    logo: <IconYoutube className='size-6 text-red-600 dark:text-red-500 fill-red-600/10' />,
    connected: false,
    desc: 'Connect with YouTube channel to manage videos, playlists, and community posts.',
  },
]
