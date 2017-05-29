export const setRandomizationType = (randomizations) => {
    return {
        type: 'RANDOMIZATION_TYPE_CHANGE',
        randomizations,
    }
}

export const setRandomElementsNumber = (randomElementsNumber) => {
    return {
        type: 'RANDOM_ELEMENTS_NUMBER_CHANGE',
        randomElementsNumber,
    }
}
