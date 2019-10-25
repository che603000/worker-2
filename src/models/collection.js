import {URL_WORKER_IDS, URL_WORKER_BIRTHDAY} from '../const';
import {STORE_WATCHERS, STORE_BIRTHDAY} from '../const';
import {load, loadState, saveState} from '../utils';

export class Collection {

    nameStore = STORE_WATCHERS;

    constructor() {
        this.store = {};
    }

    toArray() {
        return Object.keys(this.store)
            .map(key => this.store[key])
            .sort((a, b) => ('' + a.family).localeCompare(b.family));
    }

    toObject() {
        return {...this.store};
    }

    set(items, nameKey = 'id') {
        [].concat(items).forEach(item => {
            const key = item[nameKey];
            if (this.store[key])
                delete this.store[key];
            else
                this.store[key] = item;
        });
    }

    save() {
        saveState(this.nameStore, this.toArray());
    }

    load() {
        const items = loadState(this.nameStore, []);
        items && this.set(items);
    }

    refresh() {
        const ids = Object.keys(this.store).map(key => 'id=' + key).join('&');
        const url = `${URL_WORKER_IDS}?${ids}`;
        load(url)
            .then(res => {
                const {workers} = res;
                let isChange = false;
                workers.forEach(w => {
                    if (this.store[w.id] && this.store[w.id].mode !== w.mode) {
                        this.store[w.id].mode = w.mode;
                        this.onChangeStatus(this.store[w.id]);
                        isChange = true;
                    }
                })
                isChange && this.save();
            })
    }

    onChangeStatus(worker) {
    }
}

export class Birthday extends Collection {
    nameStore = STORE_BIRTHDAY;

    refresh() {
        load(URL_WORKER_BIRTHDAY, {method: "POST"})
            .then(workers => {
                this.store = {};
                this.set(workers);
                this.save();
            })
    }
}