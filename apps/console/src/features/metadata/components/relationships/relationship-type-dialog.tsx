import React, { useEffect, useState } from 'react';
import { useMetadataUiStore } from '../../store/use-metadata-ui-store';
import {
  useCreateRelationshipType,
  useUpdateRelationshipType,
  useEntityTypes,
} from '../../api/metadata-api';
import type { CardinalityType } from '../../api/types';
import { ConflictBanner, isConflictError } from '../conflict-banner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

export const RelationshipTypeDialog: React.FC = () => {
  const {
    isRelationshipTypeDialogOpen,
    editingRelationshipType,
    closeRelationshipTypeDialog,
    selectedEntityTypeId,
  } = useMetadataUiStore();

  const { data: entityTypesResponse } = useEntityTypes();
  const entityTypes = entityTypesResponse?.content || [];

  const createMutation = useCreateRelationshipType();
  const updateMutation = useUpdateRelationshipType(editingRelationshipType?.id || '');

  const [name, setName] = useState('');
  const [systemName, setSystemName] = useState('');
  const [description, setDescription] = useState('');
  const [sourceEntityTypeId, setSourceEntityTypeId] = useState<string>('');
  const [targetEntityTypeId, setTargetEntityTypeId] = useState<string>('');
  const [cardinality, setCardinality] = useState<CardinalityType>('ONE_TO_MANY');
  const [error, setError] = useState<string | null>(null);
  const [isConflict, setIsConflict] = useState(false);

  const isEditMode = Boolean(editingRelationshipType);

  useEffect(() => {
    if (editingRelationshipType) {
      setName(editingRelationshipType.name);
      setSystemName(editingRelationshipType.systemName);
      setDescription(editingRelationshipType.description || '');
      setSourceEntityTypeId(String(editingRelationshipType.sourceEntityTypeId));
      setTargetEntityTypeId(String(editingRelationshipType.targetEntityTypeId));
      setCardinality(editingRelationshipType.cardinality);
    } else {
      setName('');
      setSystemName('');
      setDescription('');
      setSourceEntityTypeId(selectedEntityTypeId ? String(selectedEntityTypeId) : '');
      setTargetEntityTypeId('');
      setCardinality('ONE_TO_MANY');
    }
    setError(null);
    setIsConflict(false);
  }, [editingRelationshipType, isRelationshipTypeDialogOpen, selectedEntityTypeId]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditMode) {
      const slug = val
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
      setSystemName(slug ? `rel_${slug}` : '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Relationship Name is required.');
      return;
    }
    if (!systemName.trim()) {
      setError('System Name is required.');
      return;
    }
    if (!sourceEntityTypeId) {
      setError('Source Entity Model is required.');
      return;
    }
    if (!targetEntityTypeId) {
      setError('Target Entity Model is required.');
      return;
    }

    if (isEditMode && editingRelationshipType) {
      updateMutation.mutate(
        {
          name: name.trim(),
          description: description.trim(),
          cardinality,
          version: editingRelationshipType.version,
        },
        {
          onSuccess: () => closeRelationshipTypeDialog(),
          onError: (err: unknown) => {
            if (isConflictError(err)) {
              setIsConflict(true);
              return;
            }
            setError(err instanceof Error ? err.message : 'Failed to update relationship type.');
          },
        }
      );
    } else {
      createMutation.mutate(
        {
          name: name.trim(),
          systemName: systemName.trim(),
          sourceEntityTypeId,
          targetEntityTypeId,
          cardinality,
          description: description.trim(),
        },
        {
          onSuccess: () => closeRelationshipTypeDialog(),
          onError: (err: unknown) => {
            setError(err instanceof Error ? err.message : 'Failed to create relationship type.');
          },
        }
      );
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isRelationshipTypeDialogOpen} onOpenChange={(open) => !open && closeRelationshipTypeDialog()}>
      <DialogContent className="max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold">
              {isEditMode ? 'Edit Relationship Type' : 'Create Relationship Edge Type'}
            </DialogTitle>
            <DialogDescription>
              Configure graph connections, source-to-target entity models, and cardinality constraints.
            </DialogDescription>
          </DialogHeader>

          {isConflict && (
            <ConflictBanner
              onRefresh={() => {
                setIsConflict(false);
                closeRelationshipTypeDialog();
              }}
            />
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-xs border border-destructive/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="rel-name" className="text-xs font-semibold">
                Relationship Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="rel-name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Account Subscriptions, Deployment Spec"
                className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rel-system-name" className="text-xs font-semibold">
                System Identifier <span className="text-destructive">*</span>
              </Label>
              <Input
                id="rel-system-name"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
                disabled={isEditMode}
                placeholder="rel_system_name"
                className="font-mono text-xs bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Source Entity</Label>
                <Select
                  value={sourceEntityTypeId}
                  onValueChange={setSourceEntityTypeId}
                  disabled={isEditMode}
                >
                  <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 text-xs">
                    <SelectValue placeholder="Select Source" />
                  </SelectTrigger>
                  <SelectContent>
                    {entityTypes.map((et) => (
                      <SelectItem key={et.id} value={String(et.id)}>
                        {et.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Target Entity</Label>
                <Select
                  value={targetEntityTypeId}
                  onValueChange={setTargetEntityTypeId}
                  disabled={isEditMode}
                >
                  <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 text-xs">
                    <SelectValue placeholder="Select Target" />
                  </SelectTrigger>
                  <SelectContent>
                    {entityTypes.map((et) => (
                      <SelectItem key={et.id} value={String(et.id)}>
                        {et.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Cardinality</Label>
              <Select
                value={cardinality}
                onValueChange={(val) => setCardinality(val as CardinalityType)}
              >
                <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONE_TO_ONE">One to One (1 : 1)</SelectItem>
                  <SelectItem value="ONE_TO_MANY">One to Many (1 : N)</SelectItem>
                  <SelectItem value="MANY_TO_ONE">Many to One (N : 1)</SelectItem>
                  <SelectItem value="MANY_TO_MANY">Many to Many (N : N)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rel-description" className="text-xs font-semibold">
                Description
              </Label>
              <Textarea
                id="rel-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Business rules or purpose of this graph relationship..."
                rows={2}
                className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 text-xs"
              />
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeRelationshipTypeDialog}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Saving...'
                : isEditMode
                ? 'Update Relationship'
                : 'Create Relationship'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
