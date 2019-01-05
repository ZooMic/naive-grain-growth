let globalCanvas = null;

export const getGlobalCanvas = () => globalCanvas;
export const setGlobalCanvas = canvas => {
    if (canvas) {
        globalCanvas = canvas
    }
};