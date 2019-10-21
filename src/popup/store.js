import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const STATE_POPUP = 'state-popup';

const loadState = () => {
    const serState = localStorage.getItem(STATE_POPUP);
    try {
        return serState ? JSON.parse(serState) : {};
    } catch (e) {
        console.error(e);
        return {};
    }
};

const saveState = (store, props) => {
    try {
        const state = store.getState();
        localStorage.setItem(STATE_POPUP, JSON.stringify(state));
    } catch (e) {
        console.error(e);
        localStorage.setItem(STATE_POPUP, JSON.stringify({}));
    }
};

const store = createStore(rootReducer, loadState(), applyMiddleware(thunk));

window.addEventListener('unload', () => saveState(store, []));

export default store;