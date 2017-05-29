export const setNeighborhoodType = (neighborhoods) => {
    return {
        type: 'NEIGHBORHOOD_TYPE_CHANGE',
        neighborhoods,
    }
}
