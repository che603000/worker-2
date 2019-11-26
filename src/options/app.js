import React from 'react';
import {Form, Button, Container, ButtonToolbar, Tabs, Tab, TabContainer, TabPane, Dropdown, Col} from "react-bootstrap";
import {STORE_OPTIONS, VERSION} from '../const';
import {saveState} from '../utils';


import Status from './tabs/status';
import NickNames from './tabs/nicknames';
import Config from './tabs/config';

class App extends React.Component {

    constructor() {
        super(...arguments);
        this.state = {
            data: {},
            error: {}
        }
    }

    onClose = e => {
        window.close();
    };

    onChange = (name, value) => {
        const state = this.state;
        this.setState({...state, data: {...state.data, [name]: value}});
    };

    validateJSON(json) {
        try {
            JSON.parse(json);
            return;
        } catch (e) {
            return e.message;
        }
    };

    onSubmit = e => {
        e.preventDefault();
        const {data} = this.state;
        const error = {
            nicknames: this.validateJSON(data.nicknames),
            config: this.validateJSON(data.config)
        };
        if (error.nicknames || error.config) {
            this.setState({error, data})
        } else {
            saveState(STORE_OPTIONS, {
                ...data,
                nicknames: JSON.parse(data.nicknames),
                config: JSON.parse(data.config),
                ver: VERSION
            });
            this.onClose();
        }
    };

    onSelect = (key, e) => {
        e.preventDefault();
        console.log(key);
    };

    render() {
        const {data, error = {}} = this.state;
        const {status, alert, nicknames, config} = data;
        return (
            <Container>
                <p/>
                <p style={{color: '#999'}}>
                    <img src="../images/phone_32.png"/>
                    <span className="h4"> Телефонный справочник АПИ - настройки <small>(версия 3.0)</small></span>

                </p>
                <Form onSubmit={this.onSubmit}>
                    <Tabs defaultActiveKey="tabStatus">
                        <Tab eventKey="tabStatus" title="Статус">
                            <Status status={status} alert={alert} onChange={this.onChange}/>
                        </Tab>
                        <Tab eventKey="tabNicks" title="Пользователи">
                            <NickNames nicknames={nicknames} error={error.nicknames} onChange={this.onChange}/>
                        </Tab>
                        <Tab eventKey="tabConfig" title="Конфигурация">
                            <Config config={config} error={error.config} onChange={this.onChange}/>
                        </Tab>
                    </Tabs>


                    <ButtonToolbar style={{float: 'right'}}>
                        <Button variant="primary" type="submit" >
                            Сохранить
                        </Button >
                        <span>&nbsp;</span>
                        <Button variant="secondary" type="cancel" onClick={this.onClose}>
                            Отменить
                        </Button>
                        <span>&nbsp;</span>

                        <Dropdown  onSelect={this.onSelect} >
                            <Dropdown.Toggle variant="secondary" disabled>
                                Загрузить
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item  href="nicknames">Пользователи</Dropdown.Item>
                                <Dropdown.Item href="config">Конфигурация</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ButtonToolbar>
                </Form>
                <br/>
            </Container>
        )
    }

    componentDidMount() {
        const {status, alert, nicknames, config = ""} = this.props;
        this.setState({
            data: {
                status,
                alert,
                nicknames: JSON.stringify(nicknames, null, 4),
                config: JSON.stringify(config, null, 4)
            }
        });
    }

}

export default App;