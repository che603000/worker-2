import React from 'react';
import {Form, Button, Container, ButtonToolbar} from "react-bootstrap";
import {STORE_OPTIONS} from '../const';
import {saveState} from '../utils';

class App extends React.Component {

    constructor() {
        super(...arguments);
        this.state = {}
    }


    onClose = e => {
        window.close();
    }

    onChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    }

    onSubmit = e => {
        e.preventDefault();
        saveState(STORE_OPTIONS, this.state);
        this.onClose();
    }

    render() {
        const {status, alert} = this.state;
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="status">
                        <Form.Label>Проверка статуса</Form.Label>
                        <Form.Control as="select"
                                      value={status}
                                      onChange={e => this.onChange('status', e.target.value)}>
                            <option value="0">не проверять</option>
                            <option value="1">проверять каждую минуту</option>
                            <option value="3">проверять каждые 3 минуты</option>
                            <option value="5">проверять каждые 5 минуты</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="alert">
                        <Form.Label>Оповещение</Form.Label>
                        <Form.Control as="select"
                                      value={alert}
                                      onChange={e => this.onChange('alert', e.target.value)}>
                            <option value="0">не выводить</option>
                            <option value="1">выводить на 30 сек</option>
                            <option value="2">не закрывать автоматически</option>
                        </Form.Control>
                    </Form.Group>
                    <ButtonToolbar>
                        <Button variant="primary" type="submit">
                            Сохранить
                        </Button>
                        <span>&nbsp;</span>
                        <Button variant="secondary" type="cancel" onClick={this.onClose}>
                            Отменить
                        </Button>
                    </ButtonToolbar>
                </Form>
                <br/>
            </Container>
        )
    }

    componentDidMount() {
        const {status, alert} = this.props;
        this.setState({status, alert});
    }

}

export default App;