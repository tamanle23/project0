import React from 'react';
import { EntityTypeDialog, EntityTypeDeleteDialog } from './entity-type';
import {
  RelationshipTypeDialog,
  RelationshipTypeDeleteDialog,
  RecordRelationshipsInspector,
} from './relationships';
import { BlueprintGalleryDialog } from './blueprint-gallery';

export const MetadataDialogs: React.FC = () => {
  return (
    <>
      <EntityTypeDialog />
      <EntityTypeDeleteDialog />
      <RelationshipTypeDialog />
      <RelationshipTypeDeleteDialog />
      <RecordRelationshipsInspector />
      <BlueprintGalleryDialog />
    </>
  );
};

