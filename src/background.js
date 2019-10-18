import {SEARCH, URL_SEARCH} from './const';
import {Collection} from './models/collection';
import {load} from './utils';


//const {OPEN, TAB, CARD, REMOVE, SEARCH, WATCH, ERROR, app} = CONST;

// let keyInterval;
let state = {
    value: "",
    tab: "#workers"
};
//
//
// const {Watchers, Workers, Birthdays, Options, load} = app;

const collection = new Collection();

const auth = () => {
    const authUrl = "https://portal/auth/logon";
    const userUrl = "https://portal/api/getUser";
    return load(userUrl)
        .catch(res => load(authUrl));
};
/*

const appOptions = new Options();

const watchers = new Watchers();
const birthdays = new Birthdays();
const workers = new Workers([], {watchers});

const alert = (user, optionsAlert = {}) => {
    const {eventTime = (1000 * 60), status = false} = optionsAlert;
    const {id, name, family, secondName, departmentName, postName} = user;
    const notification = appOptions.getItem('notification');
    let optionsNotification;
    switch (notification) {
        case 1:
            return; // не выводить оповещение
            break;
        case 2:
            optionsNotification = {eventTime: Date.now() + 1000 * 30}; //  выводить оповещение на 30 сек
            break;
        case 3:
            optionsNotification = {requireInteraction: true}; // выводить оповещение
            break;
        default:
            optionsNotification = {};
    }
    chrome.notifications.create(
        user.id.toString(),
        {
            type: "basic",
            iconUrl: `https://portal/api/xrm/img/WorkerPhoto/${id}`,
            title: `Изменение статуса: ${status ? "В офисе" : "Не в офисе"}`,
            message: `${family} ${name} ${secondName}`,
            contextMessage: `${departmentName} ${postName}`,
            ...optionsNotification
        });
};

const commands = (options) => {
    const {type, data} = options;
    switch (type) {
        case OPEN: {
            workers.refresh();
            break;
        }
        case TAB: {
            const {tab} = data;
            state.tab = tab;
            break;
        }
        case SEARCH: {
            const {value} = data;
            state.value = value;
            workers.load(value);
            break;
        }
        case REMOVE: {
            const {id} = data;
            watchers.remove(id).save();
            break;
        }
        case WATCH: {
            const {id} = data;
            const item = workers.getById(id);
            if (item) {
                watchers.toggle(item).save();
                workers.add(item);
            }
            break;
        }
        default: {

        }
    }
};

const statusRequest = () => {
    watchers
        .refresh()
        .then(list => {
            list.length > 0 && workers.refresh();
            return list;
        })
        .then(list => {
            list.forEach(w => alert(w, {status: w.mode === 1}))
        });
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    sendResponse(state);
    commands(req);
});

keyInterval = setInterval(() => statusRequest(), 1000 * 60 * appOptions.getItem("status-request")); // 5 мин

appOptions.changeOptions = (change, props) => {
    clearInterval(keyInterval);
    keyInterval = setInterval(() => statusRequest(), 1000 * 60 * props["status-request"]); // 5 мин
}
*/

// const commands = (options) => {
//     const {type, data} = options;
//     switch (type) {
//         case SEARCH: {
//             const {value} = data;
//             //state.value = value;
//             //workers.load(value);
//             break;
//         }
//
//         default: {
//
//         }
//     }
// };

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    const {type, data} = req;
    load(`${URL_SEARCH}/${data}`)
        .then(data => {
            collection.add(data.workers);
            console.log(collection.toArray());
            sendResponse(data);
        });
    return true;
    //commands(req);
});


auth()
    .then(() => {
        // watchers.load();
        // birthdays.load();
        console.log('background start => ok')
    })
    .catch(err => {
        console.log('background start => error')
        console.log(err);
    });





