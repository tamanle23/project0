import React from 'react';
import { useMetadataUiStore } from '../../store/use-metadata-ui-store';
import { useDeleteEntityType } from '../../api/metadata-api';
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

export const EntityTypeDeleteDialog: React.FC = () => {
  const {
    isEntityTypeDeleteDialogOpen,
    deletingEntityType,
    closeDeleteEntityTypeDialog,
    selectedEntityTypeId,
    setSelectedEntityTypeId,
  } = useMetadataUiStore();

  const deleteMutation = useDeleteEntityType();

  const handleDelete = () => {
    if (!deletingEntityType) return;
    deleteMutation.mutate(deletingEntityType.id, {
      onSuccess: () => {
        closeDeleteEntityTypeDialog();
        if (String(selectedEntityTypeId) === String(deletingEntityType.id)) {
          setSelectedEntityTypeId(null);
        }
      },
    });
  };

  return (
    <AlertDialog
      open={isEntityTypeDeleteDialogOpen}
      onOpenChange={(open) => !open && closeDeleteEntityTypeDialog()}
    >
      <AlertDialogContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Delete Entity Type?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to permanently delete entity model{' '}
              <span className="font-semibold text-foreground">
                "{deletingEntityType?.name}"
              </span>{' '}
              (<code className="font-mono text-xs">{deletingEntityType?.systemName}</code>)?
            </p>
            <p className="text-destructive font-medium text-xs">
              This will remove all associated attribute definitions and records for this model. This action cannot be undone.
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
