import {POPUP_TAB_SELECT} from '../../const';

export default (state = "users", action) => {
    const {type, data} = action;
    switch (type) {
        case POPUP_TAB_SELECT: {
            return data;
        }
        default: {
            return state;
        }
    }
}