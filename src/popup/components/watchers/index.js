import React, {Component} from 'react';
import {connect} from 'react-redux';
import Items from '../items';
import {watchUser} from '../../actions/users';


class UsersWatch extends Component {
    onWatch = data => {
        this.props.watchUser(data);
    };


    render() {
        const {user, watch, nicknames, config} = this.props;
        const {loading = false, error = null, workers} = watch;
        return (
            <div className={'panel-items'}>
                <Items loading={loading}
                       error={error}
                       user={user}
                       workers={workers}
                       watch={watch}
                       nicknames={nicknames}
                       config={config}
                       onWatch={this.onWatch}/>
            </div>
        )
    }
}


export default connect(state => {
    const {watch, user, options} = state;
    return {
        watch,
        user,
        nicknames: options.nicknames,
        config: options.config
    };
}, {watchUser})(UsersWatch);