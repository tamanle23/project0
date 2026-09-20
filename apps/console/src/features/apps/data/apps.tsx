import { Newspaper } from 'lucide-react';
import {
  IconFacebook,
  IconNotion,
  IconTelegram,
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
    logo: <IconFacebook />,
    connected: false,
    desc: 'Connect with Facebook profile for management.',
  },
  {
    name: 'Tiktok',
    logo: <IconTelegram />,
    connected: false,
    desc: 'Connect with Telegram for real-time communication.',
  },
  {
    name: 'Youtube',
    logo: <IconNotion />,
    connected: true,
    desc: 'Effortlessly sync Notion pages for seamless collaboration.',
  },
]
