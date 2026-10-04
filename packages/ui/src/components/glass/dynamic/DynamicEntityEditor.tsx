import React from 'react';
import { DynamicForm, DynamicFormProps } from './DynamicForm';

export const DynamicEntityEditor: React.FC<DynamicFormProps> = (props) => {
  return (
    <div className="bg-white/65 dark:bg-slate-900/65 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/30 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Dynamic Entity Editor</h2>
      <DynamicForm {...props} />
    </div>
  );
};
