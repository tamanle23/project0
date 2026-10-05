import { z, type ZodTypeAny } from 'zod';
import type { AttributeDefinition } from '../api/types';

/**
 * Dynamically builds a Zod schema based on attribute definitions and constraints
 */
export function buildZodSchema(attributes: AttributeDefinition[]): z.ZodObject<Record<string, ZodTypeAny>> {
  const shape: Record<string, ZodTypeAny> = {};

  attributes.forEach((attr) => {
    if (attr.isArchived) {
      shape[attr.systemName] = z.unknown().optional();
      return;
    }

    let fieldValidator: ZodTypeAny;

    switch (attr.uiComponent) {
      case 'text':
      case 'textarea': {
        let strVal = z.string();
        if (attr.options?.pattern) {
          try {
            const regex = new RegExp(attr.options.pattern);
            strVal = strVal.regex(regex, { message: `Must match pattern ${attr.options.pattern}` });
          } catch {
            // Ignore invalid regex in options
          }
        }
        if (attr.isRequired) {
          fieldValidator = strVal.min(1, { message: `${attr.name} is required` });
        } else {
          fieldValidator = strVal.optional().or(z.literal(''));
        }
        break;
      }

      case 'number': {
        let numVal = attr.dataType === 'DECIMAL'
          ? z.coerce.number()
          : z.coerce.number().int({ message: 'Must be an integer' });

        if (attr.options?.min !== undefined) {
          numVal = numVal.min(attr.options.min, { message: `Minimum value is ${attr.options.min}` });
        }
        if (attr.options?.max !== undefined) {
          numVal = numVal.max(attr.options.max, { message: `Maximum value is ${attr.options.max}` });
        }

        if (attr.isRequired) {
          fieldValidator = numVal;
        } else {
          fieldValidator = numVal.optional().nullable();
        }
        break;
      }

      case 'switch': {
        const boolVal = z.boolean();
        fieldValidator = attr.isRequired ? boolVal : boolVal.optional();
        break;
      }

      case 'select': {
        const strVal = z.string();
        if (attr.isRequired) {
          fieldValidator = strVal.min(1, { message: `Please select a ${attr.name}` });
        } else {
          fieldValidator = strVal.optional().or(z.literal(''));
        }
        break;
      }

      case 'multiselect': {
        const arrVal = z.array(z.string());
        if (attr.isRequired) {
          fieldValidator = arrVal.min(1, { message: `Select at least one ${attr.name}` });
        } else {
          fieldValidator = arrVal.optional();
        }
        break;
      }

      case 'datepicker': {
        const dateVal = z.string();
        if (attr.isRequired) {
          fieldValidator = dateVal.min(1, { message: `${attr.name} date is required` });
        } else {
          fieldValidator = dateVal.optional().or(z.literal(''));
        }
        break;
      }

      case 'json_editor': {
        fieldValidator = z.unknown().optional();
        break;
      }

      case 'relation_picker': {
        const relVal = z.union([z.string(), z.number()]);
        if (attr.isRequired) {
          fieldValidator = relVal;
        } else {
          fieldValidator = relVal.optional().nullable();
        }
        break;
      }

      default: {
        fieldValidator = z.unknown().optional();
      }
    }

    shape[attr.systemName] = fieldValidator;
  });

  return z.object(shape);
}

/**
 * Returns default form values populated from attribute default values
 */
export function getInitialFormValues(
  attributes: AttributeDefinition[],
  existingAttributes?: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  attributes.forEach((attr) => {
    if (existingAttributes && existingAttributes[attr.systemName] !== undefined) {
      result[attr.systemName] = existingAttributes[attr.systemName];
      return;
    }

    switch (attr.uiComponent) {
      case 'switch':
        result[attr.systemName] = attr.defaultValue === 'true' || attr.defaultValue === '1';
        break;
      case 'number':
        result[attr.systemName] = attr.defaultValue ? Number(attr.defaultValue) : '';
        break;
      case 'multiselect':
        result[attr.systemName] = [];
        break;
      case 'json_editor':
        result[attr.systemName] = attr.defaultValue || '{}';
        break;
      default:
        result[attr.systemName] = attr.defaultValue || '';
    }
  });

  return result;
}
