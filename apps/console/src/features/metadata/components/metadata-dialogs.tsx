import React from 'react';
import { EntityTypeDialog, EntityTypeDeleteDialog } from './entity-type';

export const MetadataDialogs: React.FC = () => {
  return (
    <>
      <EntityTypeDialog />
      <EntityTypeDeleteDialog />
    </>
  );
};
