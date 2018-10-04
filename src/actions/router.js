export const LOCATION_CHANGED = '@router/LOCATION_CHANGED';
export const changeLocation = (path) => ({
  type: LOCATION_CHANGED,
  payload: {
    location: path,
  },
});