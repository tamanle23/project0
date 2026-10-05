import React from 'react';
import { useMetadataUiStore } from '../../store/use-metadata-ui-store';
import { useDeleteEntityRecord } from '../../api/metadata-api';
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

export const RecordDeleteDialog: React.FC<Props> = ({ entityTypeId }) => {
  const { isRecordDeleteDialogOpen, deletingRecord, closeDeleteRecordDialog } =
    useMetadataUiStore();

  const deleteMutation = useDeleteEntityRecord(entityTypeId);

  const handleDelete = () => {
    if (!deletingRecord) return;
    deleteMutation.mutate(deletingRecord.id, {
      onSuccess: () => closeDeleteRecordDialog(),
    });
  };

  return (
    <AlertDialog
      open={isRecordDeleteDialogOpen}
      onOpenChange={(open) => !open && closeDeleteRecordDialog()}
    >
      <AlertDialogContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Delete Entity Record?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to permanently delete record ID{' '}
            <span className="font-mono font-semibold text-foreground">
              #{deletingRecord?.id}
            </span>
            ? This action cannot be undone.
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
