import {POPUP_USER} from '../../const';

export default (state = null, action) => {
    const {type, data} = action;
    switch (type) {
        case POPUP_USER: {
            const {user} = data;
            return user;
        }
        default: {
            return state;
        }
    }
};