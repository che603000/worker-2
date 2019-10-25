import {BIRTHDAY_SUCCESS} from '../../const';

const defState = {
    loading: false,
    error: null,
    workers: [],
};

export default (state = defState, action) => {
    const {type, data} = action;
    switch (type) {
        case BIRTHDAY_SUCCESS: {
            return {...state, loading: false, error: null, workers: data};
        }
        default: {
            return state;
        }
    }
};