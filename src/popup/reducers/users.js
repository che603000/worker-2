import {WORKER_REQUEST, WORKER_SUCCESS, WORKER_ERROR} from '../../const';

const defState = {
    loading: false,
    error: null,
    workers: [],
    total: 0,
};

export default (state = defState, action) => {
    const {type, data} = action;
    switch (type) {
        case WORKER_REQUEST: {
            return {...state, loading: true, error: null};
        }
        case WORKER_SUCCESS: {
            return {loading: false, error: null, workers: data};
        }
        case WORKER_ERROR: {
            const {error} = data;
            return {loading: false, error, workers: []};
        }
        default: {
            return state;
        }
    }
};