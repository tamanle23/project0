import React from 'react';
import { Database, Cloud, HardDrive, Box, Server } from 'lucide-react';

export type StorageMode = 'Archive' | 'CDN';

export interface StorageProvider {
  id: string;
  name: string;
  logo: React.ReactNode;
  connected: boolean;
  descKey: string;
  defaultDesc: string;
  storageMode: StorageMode;
}

export const storages: StorageProvider[] = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    logo: <Cloud className='size-6 text-blue-500' />,
    connected: true,
    descKey: 'storage.providers.googleDrive.description',
    defaultDesc: 'Connect with Google Drive to manage cloud files directly.',
    storageMode: 'Archive',
  },
  {
    id: 'google-cloud-storage',
    name: 'Google Cloud Storage',
    logo: <Database className='size-6 text-indigo-500' />,
    connected: false,
    descKey: 'storage.providers.googleCloudStorage.description',
    defaultDesc: 'Enterprise-grade object storage for archive and serving.',
    storageMode: 'CDN',
  },
  {
    id: 'cloudflare-r2',
    name: 'Cloudflare R2',
    logo: <Server className='size-6 text-orange-500' />,
    connected: false,
    descKey: 'storage.providers.cloudflareR2.description',
    defaultDesc: 'Zero egress fee object storage distributed globally.',
    storageMode: 'CDN',
  },
  {
    id: 'storj',
    name: 'Storj',
    logo: <HardDrive className='size-6 text-blue-600' />,
    connected: false,
    descKey: 'storage.providers.storj.description',
    defaultDesc: 'Decentralized cloud storage network.',
    storageMode: 'Archive',
  },
  {
    id: 'amazon-s3',
    name: 'Amazon S3',
    logo: <Box className='size-6 text-yellow-600' />,
    connected: true,
    descKey: 'storage.providers.amazonS3.description',
    defaultDesc: 'Industry standard object storage service.',
    storageMode: 'CDN',
  },
];
