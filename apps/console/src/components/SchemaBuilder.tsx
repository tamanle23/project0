import React from 'react';
import { SchemaBuilder as ModernSchemaBuilder } from '../features/metadata';

interface Props {
  entityTypeId: string;
}

export const SchemaBuilder: React.FC<Props> = ({ entityTypeId }) => {
  return <ModernSchemaBuilder entityTypeId={entityTypeId} />;
};
