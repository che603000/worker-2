import {combineReducers} from 'redux';

import tabs from './tabs';
import users from './users';
import user from './user';
import watch from './watch';
import search from './search';
import birthday from './birthday';
import options from './options';

export default combineReducers({
    user,
    search,
    tabs,
    users,
    watch,
    birthday,
    options
})