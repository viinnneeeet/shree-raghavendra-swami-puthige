import axios from 'axios';
import { showToast } from '@/components/showToast';

export function isFormValid(fields, formData) {
  return fields.every((field) => {
    if (!field.required) return true; // only check required ones
    if (field?.id === 'src') return true;
    const value = formData[field.id];
    switch (field.type) {
      case 'file':
        return Boolean(value); // must have a file selected
      case 'checkbox-group':
        return Array.isArray(value) && value.length > 0;
      default:
        return (
          value !== undefined && value !== null && String(value).trim() !== ''
        );
    }
  });
}

export const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export const handleApiError = (error, fallbackMessage) => {
  const msg = axios.isAxiosError(error)
    ? error.response?.data?.message ?? error.message
    : error.message || fallbackMessage;
  showToast('Error', msg, 'danger');
};
