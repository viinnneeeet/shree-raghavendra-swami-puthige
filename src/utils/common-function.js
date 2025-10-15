import axios from 'axios';
import { showToast } from '../components/ShowToast';

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

export function isOnlyNumber(value, allowDecimal = false) {
  if (value === '') return true; // allow empty input (so user can delete all)
  if (value === '.') return allowDecimal; // allow just "." while typing
  if (allowDecimal) {
    return /^(\d+(\.\d{0,2})?|\.\d{0,2})$/.test(value);
  } else {
    return /^\d+$/.test(value);
  }
}

export function formatTime(time24) {
  if (!time24) return '';

  const [hoursStr, minutes] = time24.split(':');
  let hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // convert 0 -> 12 for midnight
  const formattedHours = String(hours).padStart(2, '0');

  return `${formattedHours}:${minutes} ${ampm}`;
}

export function formatDateTime(isoString) {
  if (!isoString) return '';

  const date = new Date(isoString);

  // Options for formatting
  const options = {
    year: 'numeric',
    month: 'short', // "Oct"
    day: '2-digit', // "14"
    hour: '2-digit', // "15"
    minute: '2-digit', // "13"
    second: '2-digit', // "15"
    hour12: false, // 24-hour format; set true for AM/PM
  };

  return date.toLocaleString('en-GB', options); // e.g., "14 Oct 2025, 15:13:15"
}
