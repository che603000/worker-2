import React from 'react';
import './App.css';

import {Tabs, Tab} from "react-bootstrap";
import {FaUser, FaSearch, FaBirthdayCake} from 'react-icons/fa';

import Users from './components/users';

function App() {
    return (
        <div className={'container panel'}>
            <Tabs defaultActiveKey="users" id="main-tabs">
                <Tab eventKey="users" title={<FaUser title="users..." size="1em"/>}>
                    <Users/>
                </Tab>
                <Tab eventKey="watcher" title={<FaSearch/>}>
                    2222222222222
                </Tab>
                <Tab eventKey="birthday" title={<FaBirthdayCake/>}>
                    33333333333
                </Tab>
            </Tabs>
        </div>
    );
}

export default App;
