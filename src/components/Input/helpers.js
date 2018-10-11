export const checkRequired = (value) => {
  return value === '' ? { isValid: false, message: 'This field can not be empty!' } : { isValid: true, message: '' };
}