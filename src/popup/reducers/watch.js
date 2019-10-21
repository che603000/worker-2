import {WATCH_REQUEST, WATCH_SUCCESS, WATCH_ERROR} from '../../const';

const defState = {
    loading: false,
    error: null,
    workers: [],
};

export default (state = defState, action) => {
    const {type, data} = action;
    switch (type) {
        case WATCH_REQUEST: {
            return {...state, loading: true, error: null};
        }
        case WATCH_SUCCESS: {
            return {...state, loading: false, error: null, workers: data};
        }
        case WATCH_ERROR: {
            return {...state, loading: false, error: data.error, workers: []};
        }
        default: {
            return state;
        }
    }
};