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
        const {loading = false, workers: [], total = 0, error = null, value = ""} = this.props.users;
        return (
            <div className={'panel'}>
                <Search value={value} onSearch={this.onSearch}/>
                <Items {...this.props.users} watch={this.props.watch} onWatch={this.onWatch}/>
            </div>
        )
    }
}



export default connect(state => {
    const {users, watch} = state;
    return {
        users,
        watch
    };
}, {searchUsers, watchUser})(Users);