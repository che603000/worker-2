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

