import {
    WORKER_REQUEST,
    WORKER_SUCCESS,
    WORKER_ERROR,
    WATCH_REQUEST,
    WATCH_SUCCESS,
    WATCH_ERROR,
    WATCH_REFRESH,
    POPUP_OPEN,
    POPUP_USER
} from '../../const';
import {sendMessage} from '../../utils';

export const searchUsers = (value, isLoading = true) => dispatch => {
    const action = {type: WORKER_REQUEST, data: {value}};

    isLoading && dispatch(action);
    sendMessage(action)
    //.then(data => dispatch({type: SEARCH_SUCCESS, data}))
        .catch(error => dispatch({type: WORKER_ERROR, data: {error}}));
};

export const watchUser = (data) => dispatch => {
    const action = {type: WATCH_REQUEST, data};

    dispatch(action);
    sendMessage(action)
        .catch(error => dispatch({type: WATCH_ERROR, data: {error}}));
};

export const popupOpen = (value) => dispatch => {
    const action = {type: POPUP_OPEN, data: {value}};
    dispatch(action);
    sendMessage(action)
        .then(user => dispatch({type: POPUP_USER, data: {user}}))
        .catch(error => user => dispatch({type: POPUP_USER, data: {user: null}}));
};

export const callPhone = (userId, id) => {
    return window.fetch(`https://portal/api/xrm/json/WorkerCall/${userId}_${id}`);
};

