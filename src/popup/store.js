import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {loadState, saveState} from '../utils';

import {STATE_POPUP, STORE_WATCHERS, STORE_BIRTHDAY, WATCH_SUCCESS, BIRTHDAY_SUCCESS} from '../const';

const watchers = loadState(STORE_WATCHERS, []);
const birthday = loadState(STORE_BIRTHDAY, []);

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
        }
    },
    ...loadState(STATE_POPUP)
};

defState.watch.workers = watchers;
defState.birthday.workers = birthday;

const store = createStore(rootReducer, defState, applyMiddleware(thunk));


window.addEventListener('unload', () => saveState(STATE_POPUP, store.getState(), []));

window.addEventListener('storage', (e) => {
    const {key} = e;
    switch (key) {
        case STORE_WATCHERS: {
            const data = JSON.parse(e.newValue || "[]");
            const action = {type: WATCH_SUCCESS, data};
            store.dispatch(action);
            break;
        }
        case STORE_BIRTHDAY: {
            const data = JSON.parse(e.newValue || "[]");
            debugger;

            const action = {type: BIRTHDAY_SUCCESS, data};
            store.dispatch(action);
            break;
        }

        default: {

        }
    }

});

export default store;