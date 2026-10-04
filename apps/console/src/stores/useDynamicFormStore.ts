import { create } from 'zustand';

interface DynamicFormState {
  formData: Record<string, any>;
  setFieldValue: (fieldId: string, value: any) => void;
  resetForm: () => void;
  setFormData: (data: Record<string, any>) => void;
}

export const useDynamicFormStore = create<DynamicFormState>((set) => ({
  formData: {},
  setFieldValue: (fieldId, value) => set((state) => ({
    formData: {
      ...state.formData,
      [fieldId]: value,
    }
  })),
  resetForm: () => set({ formData: {} }),
  setFormData: (data) => set({ formData: data }),
}));
