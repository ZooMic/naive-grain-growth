
const validators = {
    'none': (value) => ({ isValid: true, msg: '' }),
    'integer-gt-0': (value) => {
        const parsed = parseInt(value);
        
        if (isNaN(parsed)) {
            return { isValid: false, msg: "Value is not a number." };
        }
        if (parsed <= 0) {
            return { isValid: false, msg: "Value is less than or equal 0." };
        }
        return { isValid: true, msg: '' };
    },
}

export default validate = (validatorType, value) => {

}

// TRY TO BE AS ATOMIC AS POSSIBLE
// const isEmpty = ()