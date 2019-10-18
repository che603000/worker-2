export class Collection {
    constructor() {
        this.store = new Map();
    }

    toArray() {
        return Array.from(this.store).map(s => s[1]);
    }

    add(items, nameKey = 'id') {
        const key = item[nameKey];
        if(!key)

        [].concat(items).forEach(item => this.store.set(key, item));
    }
}