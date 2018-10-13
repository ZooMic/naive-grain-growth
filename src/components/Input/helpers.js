const correct = { isValid: true, message: '' };
export const checkRequired = (value) => value === '' ? { isValid: false, message: 'This field can not be empty!' } : correct;
export const checkIfNumber = (value) => isNaN(Number(value)) ? { isValid: false, message: 'This field should be a number!' } : correct;

export const checkIfInteger = (value) => {
  const number = Number(value);
  let validation = checkIfNumber(number);
  if (validation.isValid) {
    if (!Number.isInteger(number)) {
      return { isValid: false, message: 'This number must be integer!'};
    }
  }
  return validation;
}

// This is factory of checkMinMax validator - it creates validator based on min, max values
export const factoryCheckMinMax = (min, max) => (value) => {
  const number = Number(value);
  let validation = checkIfNumber(number);  
  if (validation.isValid) {
    if (number > max) {
      return { isValid: false, message: `This field must be smaller than ${max}!`};
    }
    if (number < min) {
      return { isValid: false, message: `This field must be greater than ${min}!`};
    }
  }
  return validation;
}
