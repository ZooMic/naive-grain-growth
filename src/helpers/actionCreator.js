export default
    (type, procedure = (...args) => (args)) =>
        (dispatch) =>
            (payload) =>
                dispatch({ type, payload: procedure(payload)});