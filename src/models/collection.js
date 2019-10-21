export class Collection {
    constructor() {
        this.store = new Map();
    }

    toArray() {
        return Array.from(this.store).map(s => s[1]);
    }

    toObject() {
        return Array.from(this.store).reduce((res, s) => {
            res[s[0]] = s[1];
            return res;
        }, {});
    }

    set(items, nameKey = 'id') {
        [].concat(items).forEach(item => {
            const key = item[nameKey];
            if (this.store.has(key))
                this.store.delete(key);
            else
                this.store.set(key, item);
        });
    }
}