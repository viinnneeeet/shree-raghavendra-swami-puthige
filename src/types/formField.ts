// src/types/formField.ts
export type FormField =
  | {
      id: string;
      type: 'input';
      label: string;
      required?: boolean;
      inputType?: 'text' | 'email' | 'tel' | 'numeric';
      placeholder?: string;
      className?: string;
      pattern?: string;
      isDisabled?: boolean;
      isNumberAllowed?: boolean;
      allowDecimal?: boolean;
    }
  | {
      id: string;
      type: 'textarea';
      label: string;
      required?: boolean;
      placeholder?: string;
      row?: number;
      className?: string;
    }
  | {
      id: string;
      type: 'checkbox-group';
      label: string;
      options: string[];
      required?: boolean;
      className?: string;
    }
  | {
      id: string;
      type: 'select';
      label: string;
      options: { label: string; value: string }[];
      required?: boolean;
      placeholder?: string;
      className?: string;
      isDisabled?: boolean;
    }
  | {
      id: string;
      type: 'file';
      label: string;
      required?: boolean;
      placeholder?: string;
      accept?: string;
      name?: string;
      className?: string;
    }
  | {
      id: string;
      type: 'date';
      label: string;
      required?: boolean;
      placeholder?: string;
      min?: string; // YYYY-MM-DD
      max?: string; // YYYY-MM-DD
      className?: string;
    }
  | {
      id: string;
      type: 'time';
      label: string;
      required?: boolean;
      placeholder?: string;
      min?: string; // HH:MM
      max?: string; // HH:MM
      step?: number; // seconds between allowed times
      className?: string;
    };
