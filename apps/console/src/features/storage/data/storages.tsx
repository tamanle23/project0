import React from 'react';
import { Database, Cloud, HardDrive, Box, Server } from 'lucide-react';

export type StorageMode = 'Archive' | 'CDN';
export type ProviderType = 'System Internal' | 'User Provided';
export type LifecycleStatus = 'Draft' | 'Live';

export type WorkspaceAssignment = {
  workspaceId: string;
  enabled: boolean;
};

export interface StorageProvider {
  id: string;
  name: string;
  logo: React.ReactNode;
  providerType: ProviderType;
  lifecycleStatus: LifecycleStatus;
  assignedWorkspaces: WorkspaceAssignment[] | 'all';
  status: 'enabled' | 'disabled';
  descKey: string;
  defaultDesc: string;
  storageMode: StorageMode;
}

export const predefinedProviderTemplates = [
  {
    id: 'template-s3',
    name: 'Amazon S3',
    logo: <Box className='size-6 text-yellow-600' />,
    providerType: 'User Provided' as ProviderType,
    descKey: 'storage.providers.amazonS3.description',
    defaultDesc: 'Industry standard object storage service.',
    storageMode: 'CDN' as StorageMode,
  },
  {
    id: 'template-r2',
    name: 'Cloudflare R2',
    logo: <Server className='size-6 text-orange-500' />,
    providerType: 'User Provided' as ProviderType,
    descKey: 'storage.providers.cloudflareR2.description',
    defaultDesc: 'Zero egress fee object storage distributed globally.',
    storageMode: 'CDN' as StorageMode,
  },
  {
    id: 'template-gcs',
    name: 'Google Cloud Storage',
    logo: <Database className='size-6 text-indigo-500' />,
    providerType: 'User Provided' as ProviderType,
    descKey: 'storage.providers.googleCloudStorage.description',
    defaultDesc: 'Enterprise-grade object storage for archive and serving.',
    storageMode: 'Archive' as StorageMode,
  },
];

export const storages: StorageProvider[] = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    logo: <Cloud className='size-6 text-blue-500' />,
    providerType: 'User Provided',
    lifecycleStatus: 'Live',
    assignedWorkspaces: [],
    status: 'enabled',
    descKey: 'storage.providers.googleDrive.description',
    defaultDesc: 'Connect with Google Drive to manage cloud files directly.',
    storageMode: 'Archive',
  },
  {
    id: 'google-cloud-storage',
    name: 'Google Cloud Storage',
    logo: <Database className='size-6 text-indigo-500' />,
    providerType: 'System Internal',
    lifecycleStatus: 'Live',
    assignedWorkspaces: 'all',
    status: 'enabled',
    descKey: 'storage.providers.googleCloudStorage.description',
    defaultDesc: 'Enterprise-grade object storage for archive and serving.',
    storageMode: 'CDN',
  },
  {
    id: 'cloudflare-r2',
    name: 'Cloudflare R2',
    logo: <Server className='size-6 text-orange-500' />,
    providerType: 'User Provided',
    lifecycleStatus: 'Live',
    assignedWorkspaces: [{ workspaceId: '1', enabled: false }],
    status: 'disabled',
    descKey: 'storage.providers.cloudflareR2.description',
    defaultDesc: 'Zero egress fee object storage distributed globally.',
    storageMode: 'CDN',
  },
  {
    id: 'storj',
    name: 'Storj',
    logo: <HardDrive className='size-6 text-blue-600' />,
    providerType: 'User Provided',
    lifecycleStatus: 'Live',
    assignedWorkspaces: [],
    status: 'enabled',
    descKey: 'storage.providers.storj.description',
    defaultDesc: 'Decentralized cloud storage network.',
    storageMode: 'Archive',
  },
  {
    id: 'amazon-s3',
    name: 'Amazon S3',
    logo: <Box className='size-6 text-yellow-600' />,
    providerType: 'System Internal',
    lifecycleStatus: 'Live',
    assignedWorkspaces: 'all',
    status: 'enabled',
    descKey: 'storage.providers.amazonS3.description',
    defaultDesc: 'Industry standard object storage service.',
    storageMode: 'CDN',
  },
];
