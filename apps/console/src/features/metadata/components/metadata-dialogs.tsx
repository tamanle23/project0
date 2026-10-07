import React from 'react';
import { EntityTypeDialog, EntityTypeDeleteDialog } from './entity-type';
import {
  RelationshipTypeDialog,
  RelationshipTypeDeleteDialog,
  RecordRelationshipsInspector,
} from './relationships';

export const MetadataDialogs: React.FC = () => {
  return (
    <>
      <EntityTypeDialog />
      <EntityTypeDeleteDialog />
      <RelationshipTypeDialog />
      <RelationshipTypeDeleteDialog />
      <RecordRelationshipsInspector />
    </>
  );
};
