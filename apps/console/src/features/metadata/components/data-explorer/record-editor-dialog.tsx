import React, { useEffect, useState } from 'react';
import { useMetadataUiStore } from '../../store/use-metadata-ui-store';
import {
  useAttributeDefinitions,
  useCreateEntityRecord,
  useUpdateEntityRecord,
  useEntityType,
} from '../../api/metadata-api';
import { buildZodSchema, getInitialFormValues } from '../../data/schema-generator';
import { DynamicFieldRenderer } from '../dynamic-fields/dynamic-field-renderer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle } from 'lucide-react';

interface Props {
  entityTypeId: string | number;
}

export const RecordEditorDialog: React.FC<Props> = ({ entityTypeId }) => {
  const { isRecordEditorDialogOpen, editingRecord, closeRecordEditorDialog } =
    useMetadataUiStore();

  const { data: attributesResponse } = useAttributeDefinitions(entityTypeId);
  const { data: entityType } = useEntityType(entityTypeId);

  const createMutation = useCreateEntityRecord(entityTypeId);
  const updateMutation = useUpdateEntityRecord(entityTypeId);

  const isEditMode = Boolean(editingRecord);
  const attributes = attributesResponse?.content || [];

  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  useEffect(() => {
    if (isRecordEditorDialogOpen && attributes.length > 0) {
      setFormData(
        getInitialFormValues(
          attributes,
          editingRecord?.attributes as Record<string, unknown> | undefined
        )
      );
      setErrors({});
      setGlobalError(null);
    }
  }, [isRecordEditorDialogOpen, editingRecord, attributes]);

  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    // Clear field-specific error upon edit
    if (errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleReset = () => {
    setFormData(
      getInitialFormValues(
        attributes,
        editingRecord?.attributes as Record<string, unknown> | undefined
      )
    );
    setErrors({});
    setGlobalError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    // Validate using dynamic Zod compiler
    const schema = buildZodSchema(attributes);
    const validationResult = schema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        const fieldKey = String(issue.path[0]);
        if (!fieldErrors[fieldKey]) {
          fieldErrors[fieldKey] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setGlobalError('Please resolve validation errors before saving.');
      return;
    }

    const payloadAttributes = validationResult.data as Record<string, unknown>;

    if (isEditMode && editingRecord) {
      updateMutation.mutate(
        {
          recordId: editingRecord.id,
          dto: {
            attributes: payloadAttributes,
          },
        },
        {
          onSuccess: () => closeRecordEditorDialog(),
          onError: (err: unknown) => {
            setGlobalError(err instanceof Error ? err.message : 'Failed to update record.');
          },
        }
      );
    } else {
      createMutation.mutate(
        {
          entityTypeId,
          attributes: payloadAttributes,
        },
        {
          onSuccess: () => closeRecordEditorDialog(),
          onError: (err: unknown) => {
            setGlobalError(err instanceof Error ? err.message : 'Failed to create record.');
          },
        }
      );
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isRecordEditorDialogOpen} onOpenChange={(open) => !open && closeRecordEditorDialog()}>
      <DialogContent className="max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold">
              {isEditMode ? 'Edit Entity Record' : `Create ${entityType?.name || 'Entity'} Record`}
            </DialogTitle>
            <DialogDescription>
              Submit structured attribute values conforming to the compiled schema constraints.
            </DialogDescription>
          </DialogHeader>

          {globalError && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-xs border border-destructive/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{globalError}</span>
            </div>
          )}

          <ScrollArea className="max-h-[60vh] pr-4">
            {attributes.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                This entity type has no defined attributes. Please define attributes in the Schema Builder first.
              </p>
            ) : (
              <div className="space-y-4 py-2">
                {attributes.map((attr) => (
                  <DynamicFieldRenderer
                    key={attr.id}
                    attribute={attr}
                    value={formData[attr.systemName]}
                    onChange={(val) => handleFieldChange(attr.systemName, val)}
                    error={errors[attr.systemName]}
                  />
                ))}
              </div>
            )}
          </ScrollArea>

          <DialogFooter className="mt-6 gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleReset}
              disabled={isSubmitting}
              className="text-xs mr-auto"
            >
              Reset Values
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={closeRecordEditorDialog}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || attributes.length === 0}>
              {isSubmitting ? 'Saving Record...' : isEditMode ? 'Update Record' : 'Save Record'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
