import React, {Component} from 'react';
import {connect} from 'react-redux';
import Items from '../items';
import {watchUser} from '../../actions/users';


class UsersWatch extends Component {
    onWatch = data => {
        this.props.watchUser(data);
    };


    render() {
        const {loading = false, error = null} = this.props.watch;
        const workers = Object.values(this.props.watch.workers);

        return (
            <div className={'panel'}>
                <Items loading={loading}
                       error={error}
                       workers={workers}
                       watch={this.props.watch}
                       onWatch={this.onWatch}/>
            </div>
        )
    }
}


export default connect(state => {
    const {watch} = state;
    return {
        watch
    };
}, {watchUser})(UsersWatch);