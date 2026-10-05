import React from 'react';
import { EntityDataGrid as ModernEntityDataGrid } from '../features/metadata';

interface Props {
  entityTypeId: string;
}

export const EntityDataGrid: React.FC<Props> = ({ entityTypeId }) => {
  return <ModernEntityDataGrid entityTypeId={entityTypeId} />;
};
