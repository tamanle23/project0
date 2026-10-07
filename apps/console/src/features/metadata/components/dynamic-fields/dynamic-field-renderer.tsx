import React from 'react';
import type { AttributeDefinition } from '../../api/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useEntityRecords } from '../../api/metadata-api';

interface RelationPickerControlProps {
  id: string;
  value: unknown;
  onChange: (value: unknown) => void;
  targetEntityTypeId?: string | number;
  placeholder?: string;
  errorClass: string;
}

const RelationPickerControl: React.FC<RelationPickerControlProps> = ({
  id,
  value,
  onChange,
  targetEntityTypeId,
  placeholder,
  errorClass,
}) => {
  const { data: recordsResponse } = useEntityRecords(targetEntityTypeId || '', {
    size: 50,
  });
  const records = recordsResponse?.content || [];

  if (targetEntityTypeId && records.length > 0) {
    return (
      <Select
        value={typeof value === 'string' || typeof value === 'number' ? String(value) : ''}
        onValueChange={(val) => onChange(val)}
      >
        <SelectTrigger
          id={id}
          className={cn('bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm', errorClass)}
        >
          <SelectValue placeholder={placeholder || 'Select Target Entity Record...'} />
        </SelectTrigger>
        <SelectContent>
          {records.map((r) => {
            const label =
              (r.attributes?.legal_name as string) ||
              (r.attributes?.resource_code as string) ||
              (r.attributes?.policy_id as string) ||
              `Record #${r.id}`;
            return (
              <SelectItem key={r.id} value={String(r.id)}>
                #{r.id} - {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Input
      id={id}
      type="text"
      value={typeof value === 'string' || typeof value === 'number' ? value : ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Target Entity Record ID...'}
      className={cn('bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm font-mono text-xs', errorClass)}
    />
  );
};

interface Props {
  attribute: AttributeDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}

export const DynamicFieldRenderer: React.FC<Props> = ({
  attribute,
  value,
  onChange,
  error,
}) => {
  const { name, systemName, uiComponent, isRequired, options } = attribute;

  const errorClass = error
    ? 'border-destructive/80 focus-visible:ring-destructive/40 focus:border-destructive shadow-[0_0_8px_rgba(239,68,68,0.25)]'
    : 'border-white/20';

  const renderControl = () => {
    switch (uiComponent) {
      case 'text':
        return (
          <Input
            id={systemName}
            type="text"
            value={typeof value === 'string' || typeof value === 'number' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={options?.placeholder || `Enter ${name.toLowerCase()}...`}
            className={cn('bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm', errorClass)}
          />
        );

      case 'textarea':
        return (
          <Textarea
            id={systemName}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={options?.placeholder || `Enter ${name.toLowerCase()}...`}
            rows={3}
            className={cn('bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm', errorClass)}
          />
        );

      case 'number':
        return (
          <Input
            id={systemName}
            type="number"
            value={value !== undefined && value !== null ? String(value) : ''}
            onChange={(e) => {
              const val = e.target.value;
              onChange(val === '' ? '' : Number(val));
            }}
            min={options?.min}
            max={options?.max}
            placeholder={options?.placeholder || '0'}
            className={cn('bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm', errorClass)}
          />
        );

      case 'switch':
        return (
          <div className="flex items-center gap-3 pt-1">
            <Switch
              id={systemName}
              checked={Boolean(value)}
              onCheckedChange={(checked) => onChange(checked)}
            />
            <span className="text-xs font-medium text-muted-foreground">
              {value ? 'Active / True' : 'Inactive / False'}
            </span>
          </div>
        );

      case 'select':
        return (
          <Select
            value={typeof value === 'string' ? value : ''}
            onValueChange={(val) => onChange(val)}
          >
            <SelectTrigger
              id={systemName}
              className={cn('bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm', errorClass)}
            >
              <SelectValue placeholder={options?.placeholder || `Select ${name}...`} />
            </SelectTrigger>
            <SelectContent>
              {options?.choices?.map((choice) => (
                <SelectItem key={choice} value={choice}>
                  {choice}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect': {
        const selectedList = Array.isArray(value) ? (value as string[]) : [];
        const choices = options?.choices || [];

        const toggleChoice = (choice: string) => {
          if (selectedList.includes(choice)) {
            onChange(selectedList.filter((c) => c !== choice));
          } else {
            onChange([...selectedList, choice]);
          }
        };

        return (
          <div className="space-y-2">
            <div
              className={cn(
                'flex flex-wrap gap-1.5 min-h-[38px] p-2 rounded-lg border bg-white/40 dark:bg-slate-800/40',
                errorClass
              )}
            >
              {selectedList.length === 0 ? (
                <span className="text-xs text-muted-foreground self-center">
                  None selected
                </span>
              ) : (
                selectedList.map((selected) => (
                  <Badge
                    key={selected}
                    variant="secondary"
                    className="gap-1 text-xs px-2 py-0.5 bg-primary/10 text-primary border border-primary/20"
                  >
                    <span>{selected}</span>
                    <button
                      type="button"
                      onClick={() => toggleChoice(selected)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>

            {choices.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {choices.map((c) => {
                  const isChosen = selectedList.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleChoice(c)}
                      className={`text-xs px-2 py-0.5 rounded-full border transition-all ${
                        isChosen
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-muted/40 hover:bg-muted text-muted-foreground border-white/10'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      }

      case 'datepicker':
        return (
          <Input
            id={systemName}
            type="date"
            value={typeof value === 'string' ? value.split('T')[0] : ''}
            onChange={(e) => onChange(e.target.value)}
            className={cn('bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm font-mono text-xs', errorClass)}
          />
        );

      case 'json_editor':
        return (
          <Textarea
            id={systemName}
            value={
              typeof value === 'object' && value !== null
                ? JSON.stringify(value, null, 2)
                : typeof value === 'string'
                ? value
                : '{}'
            }
            onChange={(e) => {
              const text = e.target.value;
              try {
                const parsed = JSON.parse(text);
                onChange(parsed);
              } catch {
                onChange(text);
              }
            }}
            rows={4}
            className={cn('font-mono text-xs bg-slate-950/80 text-emerald-400', errorClass)}
            placeholder="{}"
          />
        );

      case 'relation_picker': {
        const targetEntityTypeId = options?.targetEntityTypeId || options?.entityTypeId;
        return (
          <RelationPickerControl
            id={systemName}
            value={value}
            onChange={onChange}
            targetEntityTypeId={targetEntityTypeId as string | number | undefined}
            placeholder={options?.placeholder || 'Select or enter Target Entity Record ID...'}
            errorClass={errorClass}
          />
        );
      }

      default:
        return (
          <Input
            id={systemName}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
            className={cn('bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm', errorClass)}
          />
        );
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={systemName} className="text-xs font-semibold text-foreground">
          {name} {isRequired && <span className="text-destructive">*</span>}
        </Label>
        <span className="text-[10px] font-mono text-muted-foreground">{systemName}</span>
      </div>

      {renderControl()}

      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
};
