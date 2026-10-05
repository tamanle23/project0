import React, { useMemo, useState } from 'react';
import type { AttributeDefinition } from '../../api/types';
import { useMetadataUiStore } from '../../store/use-metadata-ui-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Copy, Code } from 'lucide-react';

interface Props {
  entityTypeName?: string;
  attributes: AttributeDefinition[];
}

export const SchemaJsonPreview: React.FC<Props> = ({ entityTypeName, attributes }) => {
  const { isJsonSchemaPreviewOpen, closeJsonSchemaPreview } = useMetadataUiStore();
  const [copied, setCopied] = useState(false);

  // Compile JSON Schema Draft-07 (matching Spring Modulith SchemaValidationService.java)
  const compiledSchema = useMemo(() => {
    const properties: Record<string, unknown> = {};
    const required: string[] = [];

    attributes.forEach((attr) => {
      if (attr.isArchived) return;

      const propDef: Record<string, unknown> = {};

      switch (attr.uiComponent) {
        case 'text':
        case 'textarea':
          propDef.type = 'string';
          if (attr.options?.pattern) {
            propDef.pattern = attr.options.pattern;
          }
          break;
        case 'number':
          propDef.type = attr.dataType === 'DECIMAL' ? 'number' : 'integer';
          if (attr.options?.min !== undefined) propDef.minimum = attr.options.min;
          if (attr.options?.max !== undefined) propDef.maximum = attr.options.max;
          break;
        case 'switch':
          propDef.type = 'boolean';
          break;
        case 'select':
          propDef.type = 'string';
          if (attr.options?.choices && attr.options.choices.length > 0) {
            propDef.enum = attr.options.choices;
          }
          break;
        case 'multiselect':
          propDef.type = 'array';
          propDef.items = { type: 'string' };
          if (attr.options?.choices && attr.options.choices.length > 0) {
            propDef.items = { type: 'string', enum: attr.options.choices };
          }
          break;
        case 'datepicker':
          propDef.type = 'string';
          propDef.format = attr.dataType === 'DATE' ? 'date' : 'date-time';
          break;
        case 'json_editor':
          propDef.type = 'object';
          break;
        case 'relation_picker':
          propDef.type = 'string';
          propDef.description = `Reference to target entity: ${attr.options?.targetEntityTypeId || 'external'}`;
          break;
        default:
          propDef.type = 'string';
      }

      if (attr.defaultValue) {
        propDef.default = attr.defaultValue;
      }

      properties[attr.systemName] = propDef;

      if (attr.isRequired) {
        required.push(attr.systemName);
      }
    });

    const schema: Record<string, unknown> = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: `${entityTypeName || 'Entity'}Schema`,
      type: 'object',
      properties,
    };

    if (required.length > 0) {
      schema.required = required;
    }

    return schema;
  }, [attributes, entityTypeName]);

  const jsonString = useMemo(() => {
    return JSON.stringify(compiledSchema, null, 2);
  }, [compiledSchema]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isJsonSchemaPreviewOpen} onOpenChange={(open) => !open && closeJsonSchemaPreview()}>
      <DialogContent className="max-w-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              <DialogTitle className="text-xl font-bold">
                Compiled JSON Schema (Draft-07)
              </DialogTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5 text-xs bg-white/40 dark:bg-white/5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy Schema
                </>
              )}
            </Button>
          </div>
          <DialogDescription>
            Live JSON Schema specification compiled directly from active attribute definitions. Matches the backend validation engine.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-2">
          <pre className="max-h-[500px] overflow-auto p-4 rounded-xl font-mono text-xs bg-slate-950 text-slate-100 border border-white/10 shadow-inner">
            <code>{jsonString}</code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
};
