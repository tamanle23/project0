import React from 'react';
import { useMetadataUiStore } from '../../store/use-metadata-ui-store';
import { useDeleteRelationshipType } from '../../api/metadata-api';
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

export const RelationshipTypeDeleteDialog: React.FC = () => {
  const {
    isRelationshipTypeDeleteDialogOpen,
    deletingRelationshipType,
    closeDeleteRelationshipTypeDialog,
  } = useMetadataUiStore();

  const deleteMutation = useDeleteRelationshipType();

  const handleDelete = () => {
    if (!deletingRelationshipType) return;
    deleteMutation.mutate(
      { id: deletingRelationshipType.id, force: true },
      {
        onSuccess: () => closeDeleteRelationshipTypeDialog(),
      }
    );
  };

  return (
    <AlertDialog
      open={isRelationshipTypeDeleteDialogOpen}
      onOpenChange={(open) => !open && closeDeleteRelationshipTypeDialog()}
    >
      <AlertDialogContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Delete Relationship Type?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete relationship type{' '}
              <span className="font-semibold text-foreground">
                "{deletingRelationshipType?.name}"
              </span>{' '}
              (<code className="font-mono text-xs">{deletingRelationshipType?.systemName}</code>)?
            </p>
            <p className="text-destructive font-medium text-xs">
              Warning: Deleting this relationship type will unlink all active edge associations between existing records.
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
