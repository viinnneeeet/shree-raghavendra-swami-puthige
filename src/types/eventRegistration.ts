// src/types/eventRegistration.ts
export interface EventRegistrationFormData {
  name: string;
  email: string;
  phone: string;
  event: string;
  message?: string;

  [key: string]: unknown; // keeps it compatible with FormFields<T>
}
