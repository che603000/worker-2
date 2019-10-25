import {WORKER_REQUEST} from '../../const';

export default (state = "", action) => {
    const {type, data} = action;
    switch (type) {
        case WORKER_REQUEST: {
            const {value} = data;
            return value;
        }
        default: {
            return state;
        }
    }
};