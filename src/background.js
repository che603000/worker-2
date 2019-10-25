import {WORKER_REQUEST, URL_WORKER_SEARCH, WATCH_REQUEST, POPUP_OPEN} from './const';
import {Collection, Birthday} from './models/collection';
import {load, loadState, saveState} from './utils';
import {STORE_OPTIONS, STORE_WORKERS} from './const';

let keyInterval;
let options = loadState(STORE_OPTIONS, {status: "3", alerts: "1"});
const watchers = new Collection();

const auth = () => {
    const authUrl = "https://portal/auth/logon";
    const userUrl = "https://portal/api/getUser";
    return load(userUrl)
        .catch(() => load(authUrl));
};

const notification = (worker, options) => {
    const {alert} = options;
    const {id, name, family, secondName, departmentName, postName, mode} = worker;
    let optionsNotification;
    switch (alert) {
        case "0":
            return; // не выводить оповещение
        case "1":
            optionsNotification = {eventTime: Date.now() + 1000 * 30}; //  выводить оповещение на 30 сек
            break;
        case "2":
            optionsNotification = {requireInteraction: true}; // выводить оповещение
            break;
        default:
            optionsNotification = {};
    }
    chrome.notifications.create(
        `${worker.id} -${Date.now()}`,
        {
            type: "basic",
            iconUrl: `https://portal/api/xrm/img/WorkerPhoto/${id}`,
            title: `Изменение статуса: ${mode === 1 ? "В офисе" : "Не в офисе"}`,
            message: `${family} ${name} ${secondName}`,
            contextMessage: `${departmentName} ${postName}`,
            ...optionsNotification
        });
};

const startInterval = options => {
    const time = 1000 * 60 * (+options.status); //
    keyInterval && clearInterval(keyInterval);
    if (time > 0)
        keyInterval = setInterval(() => watchers.refresh(), time);
};

watchers.load();
watchers.onChangeStatus = worker => notification(worker, options);
startInterval(options);


const birthday = new Birthday();
birthday.load();

const commands = (action, sendResponse) => {
    const {type, data} = action;
    switch (type) {
        case POPUP_OPEN: {
            watchers.refresh();
            birthday.refresh();
            load(`${URL_WORKER_SEARCH}/${data.value}`)
                .then(data => saveState(STORE_WORKERS, data.workers));
            return sendResponse({});
        }
        case WORKER_REQUEST: {
            load(`${URL_WORKER_SEARCH}/${data.value}`)
                .then(data => {
                    saveState(STORE_WORKERS, data.workers);
                });
            return sendResponse({});
        }
        case WATCH_REQUEST: {
            Promise.resolve()
                .then(() => {
                    watchers.set(data);
                    watchers.save();
                });
            return sendResponse({});
            ;
        }
        default: {
            console.error("type not found");
            return undefined;
        }
    }
};

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    return commands(req, sendResponse);
});

window.addEventListener('storage', (e) => {
    const {key} = e;
    switch (key) {
        case STORE_OPTIONS: {
            options = loadState(STORE_OPTIONS, {status: "3", alerts: "1"});
            startInterval(options);
            break;
        }
        default: {

        }
    }
});

auth()
    .then(() => {
        console.log('background start => ok');
    })
    .catch(err => {
        console.log('background start => error');
        console.log(err);
    });





