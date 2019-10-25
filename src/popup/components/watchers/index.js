import React, {Component} from 'react';
import {connect} from 'react-redux';
import Items from '../items';
import {watchUser} from '../../actions/users';


class UsersWatch extends Component {
    onWatch = data => {
        this.props.watchUser(data);
    };


    render() {
        const {loading = false, error = null, workers} = this.props.watch;

        return (
            <div className={'panel-items'}>
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