import {OPTIONS_SUCCESS} from '../../const';

const defState = {
    status: "3",
    alerts: "1",
    nicknames: '[]'
};

export default (state = defState, action) => {
    const {type, data} = action;
    switch (type) {
        case OPTIONS_SUCCESS: {
            return  data;
        }
        default: {
            return state;
        }
    }
};