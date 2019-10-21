import './App.css';

import React from 'react';
import {connect} from 'react-redux';

import {Tabs, Tab} from "react-bootstrap";
import {FaUser, FaSearch, FaBirthdayCake} from 'react-icons/fa';

import Users from './components/users';
import Watchers from './components/watchers';

import {selectTab} from './actions/tabs';
import {watchRefresh, searchUsers} from './actions/users';


class App extends React.Component {
    onTab = (key, e) => {
        e.preventDefault();
        this.props.selectTab(key);
    };

    render() {
        const {tabs} = this.props;
        return (
            <div className={'container panel'}>
                <Tabs id="main-tabs" onSelect={this.onTab} activeKey={tabs}>
                    <Tab eventKey="users" title={<FaUser title="users..." size="1em"/>}>
                        <Users/>
                    </Tab>
                    <Tab eventKey="watcher" title={<FaSearch/>}>
                        <Watchers/>
                    </Tab>
                    <Tab eventKey="birthday" title={<FaBirthdayCake/>}>
                        33333333333
                    </Tab>
                </Tabs>
            </div>
        );
    }

    componentDidMount() {
        this.props.watchRefresh();
        this.props.searchUsers(this.props.value, false);
    }

}

export default connect(state => {
    const {tabs, users} = state;
    return {
        tabs,
        value: users.value
    };
}, {selectTab, watchRefresh, searchUsers})(App);
