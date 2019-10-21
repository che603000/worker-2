import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    WATCH_REQUEST,
    WATCH_SUCCESS,
    WATCH_ERROR,
    WATCH_REFRESH
} from '../../const';
import {sendMessage} from '../../utils';

export const searchUsers = (value, isLoading = true) => dispatch => {
    const action = {type: SEARCH_REQUEST, data: {value}};

    isLoading && dispatch(action);
    sendMessage(action)
        .then(data => dispatch({type: SEARCH_SUCCESS, data}))
        .catch(error => dispatch({type: SEARCH_ERROR, data: {error}}));
};

export const watchUser = (data) => dispatch => {
    const action = {type: WATCH_REQUEST, data};

    dispatch(action);
    sendMessage(action)
        .then(data => dispatch({type: WATCH_SUCCESS, data}))
        .catch(error => dispatch({type: WATCH_ERROR, data: {error}}));
};

export const watchRefresh = () => dispatch => {
    const action = {type: WATCH_REFRESH};
    sendMessage(action)
        .then(data => dispatch({type: WATCH_SUCCESS, data}))
        .catch(error => dispatch({type: WATCH_ERROR, data: {error}}));
};