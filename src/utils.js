const defaultOptions = {
    method: 'GET',
    credentials: 'include'
};

export const load = (url, options) => fetch(url, {...defaultOptions, ...options})
    .then(res => {
        if (res.ok)
            return res.json();
        else
            throw res;
    });

export const sendMessage = (action) => new Promise((res, rej) => chrome.runtime.sendMessage(action, res));


export const loadState = (STATE_POPUP, defaultValue = {}) => {
    const serState = localStorage.getItem(STATE_POPUP);
    try {
        return serState ? JSON.parse(serState) : defaultValue;
    } catch (e) {
        console.error(e);
        return {};
    }
};

export const saveState = (STATE_POPUP, state, props) => {
    try {
        localStorage.setItem(STATE_POPUP, JSON.stringify(state));
    } catch (e) {
        console.error(e);
        localStorage.setItem(STATE_POPUP, JSON.stringify({}));
    }
};