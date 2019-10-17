const data = [
    {id: 98798, userName: 'Петров'},
    {id: 98794, userName: 'Иванов'},
    {id: 98791, userName: 'Федоров'},
];

const URL_SEARCH = "https://portal/api/xrm/json/WorkerByName";
const URL_LOGON = "https://portal/auth/logon";
//const URL_CARD = "https://portal/api/xrm/json/WorkerCard";
//const URL_WORKER_IDS = "https://portal/api/xrm/json/WorkerByIds";

const logon = () => {
    return fetch(URL_LOGON, {credentials: 'include',  mode: 'no-cors'})
        .then(res => {
            debugger;
            return res;
        })
        .catch(err => {
            debugger;
            throw  err;
        })
};

export const loaderUser = options => {
    const {value} = options;
    if (value)
        //return fetch(`${URL_SEARCH}/${value}`, {
        return fetch("/auth/logon", {
            credentials: 'include',
            mode: 'no-cors'
        })
            .then(res => {
                if (res.ok)
                    return res.json();
                else
                    return res;
                // return res.json().then(data => {
                //     throw data;
                // });
            });
    else
        return Promise.resolve({totalCount: 7, workers: []});
};

export const loaderUser_test = options => new Promise((res, rej) => {
    const {value} = options;
    if (value)
        setTimeout(() => {
            res(data);
        }, 1000);
    else
        res([]);
});