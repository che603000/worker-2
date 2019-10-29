import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {loadState, saveState} from '../utils';

import {
    STORE_POPUP,
    STORE_WORKERS,
    STORE_WATCHERS,
    STORE_BIRTHDAY,
    WORKER_SUCCESS,
    WATCH_SUCCESS,
    BIRTHDAY_SUCCESS,
    STORE_OPTIONS,
    OPTIONS_SUCCESS
} from '../const';

const watchers = loadState(STORE_WATCHERS, []);
const users = loadState(STORE_WORKERS, []);
const birthday = loadState(STORE_BIRTHDAY, []);
const options = loadState(STORE_OPTIONS, {});

const defState = {
    ...{
        users: {
            workers: []
        },
        watch: {
            workers: []
        },
        birthday: {
            workers: []
        },
        options: {
            status: "3",
            alerts: "1",
            nicknames: '[]'
        }
    },
    ...loadState(STORE_POPUP)
};


defState.users.workers = users;
defState.watch.workers = watchers;
defState.birthday.workers = birthday;
defState.options = options;


const store = createStore(rootReducer, defState, applyMiddleware(thunk));


window.addEventListener('unload', () => saveState(STORE_POPUP, store.getState(), []));

window.addEventListener('storage', (e) => {
    const {key} = e;
    switch (key) {
        case STORE_WORKERS: {
            const data = JSON.parse(e.newValue || "[]");
            const action = {type: WORKER_SUCCESS, data};
            store.dispatch(action);
            break;
        }
        case STORE_WATCHERS: {
            const data = JSON.parse(e.newValue || "[]");
            const action = {type: WATCH_SUCCESS, data};
            store.dispatch(action);
            break;
        }
        case STORE_BIRTHDAY: {
            const data = JSON.parse(e.newValue || "[]");
            const action = {type: BIRTHDAY_SUCCESS, data};
            store.dispatch(action);
            break;
        }
        case STORE_OPTIONS: {
            const options = loadState(STORE_OPTIONS, {status: "3", alerts: "1", nicknames: '[]'});

            const action = {
                type: OPTIONS_SUCCESS,
                data: options
            };
            store.dispatch(action);
            break;
        }

        default: {

        }
    }

});

export default store;