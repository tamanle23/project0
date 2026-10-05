import React from 'react';
import { useMetadataUiStore } from '../../store/use-metadata-ui-store';
import { useDeleteAttributeDefinition } from '../../api/metadata-api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Props {
  entityTypeId: string | number;
}

export const AttributeDeleteDialog: React.FC<Props> = ({ entityTypeId }) => {
  const {
    isAttributeDeleteDialogOpen,
    deletingAttribute,
    closeDeleteAttributeDialog,
  } = useMetadataUiStore();

  const deleteMutation = useDeleteAttributeDefinition(entityTypeId);

  const handleDelete = () => {
    if (!deletingAttribute) return;
    deleteMutation.mutate(deletingAttribute.id, {
      onSuccess: () => closeDeleteAttributeDialog(),
    });
  };

  return (
    <AlertDialog
      open={isAttributeDeleteDialogOpen}
      onOpenChange={(open) => !open && closeDeleteAttributeDialog()}
    >
      <AlertDialogContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Delete Attribute Definition?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete attribute{' '}
              <span className="font-semibold text-foreground">
                "{deletingAttribute?.name}"
              </span>{' '}
              (<code className="font-mono text-xs">{deletingAttribute?.systemName}</code>)?
            </p>
            <p className="text-destructive font-medium text-xs">
              Warning: Deleting this attribute may cause existing entity records to fail schema validation or hide historical values. Consider archiving the field instead.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Permanently'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
