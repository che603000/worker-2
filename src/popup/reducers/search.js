import {SEARCH_REQUEST} from '../../const';

export default (state = "", action) => {
    const {type, data} = action;
    switch (type) {
        case SEARCH_REQUEST: {
            const {value} = data;
            return value;
        }
        default: {
            return state;
        }
    }
};