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
