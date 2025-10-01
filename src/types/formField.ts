// src/types/formField.ts
export type FormField =
  | {
      id: string;
      type: 'input';
      label: string;
      required?: boolean;
      inputType?: 'text' | 'email' | 'tel';
      placeholder?: string;
    }
  | {
      id: string;
      type: 'textarea';
      label: string;
      required?: boolean;
      placeholder?: string;
      row?: number;
    }
  | {
      id: string;
      type: 'checkbox-group';
      label: string;
      options: string[];
      required?: boolean;
    }
  | {
      id: string;
      type: 'select';
      label: string;
      options: { label: string; value: string }[];
      required?: boolean;
      placeholder?: string;
    };
