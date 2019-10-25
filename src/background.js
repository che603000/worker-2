import {SEARCH_REQUEST, URL_SEARCH, WATCH_REQUEST, WATCH_REFRESH} from './const';
import {Collection, Birthday} from './models/collection';
import {load, loadState} from './utils';
import {STORE_WATCHERS, STORE_OPTIONS} from './const'

let keyInterval;
let options = loadState(STORE_OPTIONS, {status: "3", alerts: "1"});
const collection = new Collection();

const auth = () => {
    const authUrl = "https://portal/auth/logon";
    const userUrl = "https://portal/api/getUser";
    return load(userUrl)
        .catch(res => load(authUrl));
};

const notification = (worker, options) => {
    const {alert} = options;
    const {id, name, family, secondName, departmentName, postName, mode} = worker;
    let optionsNotification;
    switch (alert) {
        case "0":
            return; // не выводить оповещение
            break;
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
        worker.id.toString(),
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
        keyInterval = setInterval(() => collection.refresh(), time);
};

collection.load();
collection.onChangeStatus = worker => notification(worker, options);
startInterval(options);


const birthday = new Birthday();
birthday.load();

const commands = (action, sendResponse) => {
    const {type, data} = action;
    switch (type) {
        case SEARCH_REQUEST: {
            load(`${URL_SEARCH}/${data.value}`)
                .then(data => sendResponse(data));
            return true;
        }
        case WATCH_REQUEST: {
            Promise.resolve()
                .then(() => {
                    collection.set(data);
                    collection.save();
                    const watchers = collection.toArray();
                    sendResponse(watchers);
                });
            return true;
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
        // watchers.load();
        // birthdays.load();
        collection.refresh();
        birthday.refresh();
        //console.log('background start => ok');
    })
    .catch(err => {
        console.log('background start => error')
        console.log(err);
    });





