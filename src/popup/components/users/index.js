import React, {Component} from 'react';
import {connect} from 'react-redux';
import Search from './search';
import Items from '../items';
import {searchUsers, watchUser} from '../../actions/users';


class Users extends Component {
    onWatch = data => {
        this.props.watchUser(data);
    };

    onSearch = value => {
        this.props.searchUsers(value);
    };

    render() {
        const {users, search, nicknames, config} = this.props;
        const {loading = false, workers: [], total = 0, error = null} = users;
        return (
            <div className={'panel'}>
                <Search value={search} onSearch={this.onSearch}/>
                <Items {...this.props.users}
                       watch={this.props.watch}
                       onWatch={this.onWatch}
                       user={this.props.user}
                       nicknames={nicknames}
                       config={config}
                />
            </div>
        )
    }
}


export default connect(state => {
    const {users, watch, search, user, options} = state;
    return {
        user,
        search,
        users,
        watch,
        nicknames: options.nicknames,
        config: options.config
    };
}, {searchUsers, watchUser})(Users);