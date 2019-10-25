import {combineReducers} from 'redux';

import tabs from './tabs';
import users from './users';
import watch from './watch';
import search from './search';
import birthday from './birthday';

export default combineReducers({
    search,
    tabs,
    users,
    watch,
    birthday
})