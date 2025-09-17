export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isOnlyNumber(value, allowDecimal = false) {
  if (value === '') return true; // allow empty input (so user can delete all)
  if (value === '.') return allowDecimal; // allow just "." while typing
  if (allowDecimal) {
    return /^(\d+(\.\d{0,2})?|\.\d{0,2})$/.test(value);
  } else {
    return /^\d+$/.test(value);
  }
}
