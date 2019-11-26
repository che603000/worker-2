import React from 'react';
import {Tabs, Tab} from "react-bootstrap";


export class AppTab extends React.Component {
    render() {
        return (
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                </Tab>
                <Tab eventKey="profile" title="Profile">
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                </Tab>
            </Tabs>
        )
    }
}