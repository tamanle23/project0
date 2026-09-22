import {
  Construction,
  LayoutDashboard,
  Bug,
  ListTodo,
  FileX,
  HelpCircle,
  Lock,
  Bell,
  Package,
  Palette,
  ServerOff,
  Settings,
  Wrench,
  UserCog,
  UserX,
  Users,
  MessagesSquare,
  ShieldCheck,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from 'lucide-react'
import { ClerkLogo } from '@/assets/clerk-logo'
import { type SidebarData } from '../types'
import { useTranslation } from 'react-i18next'

export const sidebarTeams = [
  {
    name: 'Project0',
    logo: Command,
    plan: 'Vite + ShadcnUI',
  },
  {
    name: 'Acme Inc',
    logo: GalleryVerticalEnd,
    plan: 'Enterprise',
  },
  {
    name: 'Acme Corp.',
    logo: AudioWaveform,
    plan: 'Startup',
  },
];

export const useSidebarData = (): SidebarData => {
  const { t } = useTranslation('console');

  return {
    user: {
      name: 'satnaing',
      email: 'satnaingdev@gmail.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: sidebarTeams,
    navGroups: [
      {
        title: t('sidebar.groups.general', 'General'),
        items: [
          {
            title: t('sidebar.items.dashboard', 'Dashboard'),
            url: '/',
            icon: LayoutDashboard,
          },
          {
            title: t('sidebar.items.tasks', 'Tasks'),
            url: '/tasks',
            icon: ListTodo,
          },
          {
            title: t('sidebar.items.apps', 'Apps'),
            url: '/apps',
            icon: Package,
          },
          {
            title: t('sidebar.items.chats', 'Chats'),
            url: '/chats',
            badge: '3',
            icon: MessagesSquare,
          },
        ],
      },
      {
        title: t('sidebar.groups.admin', 'Admin'),
        items: [
          {
            title: t('sidebar.items.users', 'Users'),
            url: '/users',
            icon: Users,
          },
          {
            title: t('sidebar.items.clerk', 'Secured by Clerk'),
            icon: ClerkLogo,
            items: [
              {
                title: t('sidebar.items.clerkSignIn', 'Sign In'),
                url: '/clerk/sign-in',
              },
              {
                title: t('sidebar.items.clerkSignUp', 'Sign Up'),
                url: '/clerk/sign-up',
              },
              {
                title: t('sidebar.items.clerkUserManagement', 'User Management'),
                url: '/clerk/user-management',
              },
            ],
          },
        ],
      },
      {
        title: t('sidebar.groups.pages', 'Pages'),
        items: [
          {
            title: t('sidebar.items.auth', 'Auth'),
            icon: ShieldCheck,
            items: [
              {
                title: t('sidebar.items.signIn', 'Sign In'),
                url: '/sign-in',
              },
              {
                title: t('sidebar.items.signIn2Col', 'Sign In (2 Col)'),
                url: '/sign-in-2',
              },
              {
                title: t('sidebar.items.signUp', 'Sign Up'),
                url: '/sign-up',
              },
              {
                title: t('sidebar.items.forgotPassword', 'Forgot Password'),
                url: '/forgot-password',
              },
              {
                title: t('sidebar.items.otp', 'OTP'),
                url: '/otp',
              },
            ],
          },
          {
            title: t('sidebar.items.errors', 'Errors'),
            icon: Bug,
            items: [
              {
                title: t('sidebar.items.unauthorized', 'Unauthorized'),
                url: '/errors/unauthorized',
                icon: Lock,
              },
              {
                title: t('sidebar.items.forbidden', 'Forbidden'),
                url: '/errors/forbidden',
                icon: UserX,
              },
              {
                title: t('sidebar.items.notFound', 'Not Found'),
                url: '/errors/not-found',
                icon: FileX,
              },
              {
                title: t('sidebar.items.internalError', 'Internal Server Error'),
                url: '/errors/internal-server-error',
                icon: ServerOff,
              },
              {
                title: t('sidebar.items.maintenanceError', 'Maintenance Error'),
                url: '/errors/maintenance-error',
                icon: Construction,
              },
            ],
          },
        ],
      },
      {
        title: t('sidebar.groups.other', 'Other'),
        items: [
          {
            title: t('sidebar.items.settings', 'Settings'),
            icon: Settings,
            items: [
              {
                title: t('sidebar.items.profile', 'Profile'),
                url: '/settings',
                icon: UserCog,
              },
              {
                title: t('sidebar.items.account', 'Account'),
                url: '/settings/account',
                icon: Wrench,
              },
              {
                title: t('sidebar.items.appearance', 'Appearance'),
                url: '/settings/appearance',
                icon: Palette,
              },
              {
                title: t('sidebar.items.notifications', 'Notifications'),
                url: '/settings/notifications',
                icon: Bell,
              },
            ],
          },
          {
            title: t('sidebar.items.helpCenter', 'Help Center'),
            url: '/help-center',
            icon: HelpCircle,
          },
        ],
      },
    ],
  }
}
