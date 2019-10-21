import {combineReducers} from 'redux';

import tabs from './tabs';
import users from './users';
import watch from './watch';

export default combineReducers({
    tabs,
    users,
    watch
})