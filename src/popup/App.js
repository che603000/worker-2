import './App.css';

import React from 'react';
import {connect} from 'react-redux';

import {Tabs, Tab} from "react-bootstrap";
import {FaUser, FaStar, FaBirthdayCake} from 'react-icons/fa';

import Users from './components/users';
import Watchers from './components/watchers';
import BirthDay from './components/birthday';

import {selectTab} from './actions/tabs';
import {searchUsers} from './actions/users';

import {sendMessage} from '../utils';
import {POPUP_OPEN} from '../const';

class App extends React.Component {
    onTab = (key, e) => {
        e.preventDefault();
        this.props.selectTab(key);
    };

    onClose = e => {
        e.preventDefault();
        window.close();
    };

    render() {
        const {tabs} = this.props;
        return (
            <div className={'container panel'}>
                <button id="close" className="close" onClick={this.onClose}>
                    <span aria-hidden="true">×</span>
                </button>
                <Tabs id="main-tabs" onSelect={this.onTab} activeKey={tabs}>
                    <Tab eventKey="users" title={<FaUser title="искать сотрудника..." size="1em"/>}>
                        <Users/>
                    </Tab>
                    <Tab eventKey="watcher" title={<FaStar title="избранные сотрудники"/>}>
                        <Watchers/>
                    </Tab>
                    <Tab eventKey="birthday" title={<FaBirthdayCake title="дни рождения"/>}>
                        <BirthDay/>
                    </Tab>
                </Tabs>
            </div>
        );
    }

    componentDidMount() {
        //this.props.searchUsers(this.props.search, false);
        sendMessage({type: POPUP_OPEN, data: {value: this.props.search}});
    }

}

export default connect(state => {
    const {tabs, users, search} = state;
    return {
        tabs,
        search
    };
}, {selectTab, searchUsers})(App);
