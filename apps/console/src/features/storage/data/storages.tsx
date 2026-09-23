import { Database, Cloud, HardDrive, Box, Server } from 'lucide-react';

export type StorageMode = 'Archive' | 'CDN';

export interface StorageProvider {
  name: string;
  logo: React.ReactNode;
  connected: boolean;
  desc: string;
  storageMode: StorageMode;
}

export const storages: StorageProvider[] = [
  {
    name: 'Google Drive',
    logo: <Cloud className='size-6 text-blue-500' />,
    connected: true,
    desc: 'Connect with Google Drive to manage cloud files directly.',
    storageMode: 'Archive',
  },
  {
    name: 'Google Cloud Storage',
    logo: <Database className='size-6 text-indigo-500' />,
    connected: false,
    desc: 'Enterprise-grade object storage for archive and serving.',
    storageMode: 'CDN',
  },
  {
    name: 'Cloudflare R2',
    logo: <Server className='size-6 text-orange-500' />,
    connected: false,
    desc: 'Zero egress fee object storage distributed globally.',
    storageMode: 'CDN',
  },
  {
    name: 'Storj',
    logo: <HardDrive className='size-6 text-blue-600' />,
    connected: false,
    desc: 'Decentralized cloud storage network.',
    storageMode: 'Archive',
  },
  {
    name: 'Amazon S3',
    logo: <Box className='size-6 text-yellow-600' />,
    connected: true,
    desc: 'Industry standard object storage service.',
    storageMode: 'CDN',
  },
];
