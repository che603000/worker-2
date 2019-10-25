import {SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_ERROR} from '../../const';

const defState = {
    loading: false,
    error: null,
    workers: [],
    total: 0,
};

export default (state = defState, action) => {
    const {type, data} = action;
    switch (type) {
        case SEARCH_REQUEST: {
            return {...state, loading: true, error: null};
        }
        case SEARCH_SUCCESS: {
            const {workers, totalCount} = data;
            return {...state, loading: false, error: null, workers, total: totalCount};
        }
        case SEARCH_ERROR: {
            const {error} = data;
            return {...state, loading: false, error, workers: [], total: 0};
        }
        default: {
            return state;
        }
    }
};