import {
  IconFacebook,
  IconNotion,
  IconTelegram,
} from '@/assets/brand-icons';

export const apps = [
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
