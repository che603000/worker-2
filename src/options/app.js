import React from 'react';
import {Form, Button, Container, ButtonToolbar} from "react-bootstrap";
import {STORE_OPTIONS} from '../const';
import {saveState} from '../utils';

class App extends React.Component {

    constructor() {
        super(...arguments);
        this.state = {
            data: {},
            error: null
        }
    }


    onClose = e => {
        window.close();
    };

    onChange = (name, value) => {
        const state = this.state;
        this.setState({...state, data: {...state.data, [name]: value}});
    };

    validateNicknames(nicknames) {
        try {
            JSON.parse(nicknames);
            return;
        } catch (e) {
            return e.message;
        }
    };

    onSubmit = e => {
        e.preventDefault();
        const {data} = this.state;
        const error = this.validateNicknames(data.nicknames);
        debugger;
        if (error) {
            this.setState({error, data})
        } else {
            saveState(STORE_OPTIONS, {...data, nicknames: JSON.parse(data.nicknames)});
            this.onClose();
        }
    };

    render() {
        const {data, error} = this.state;
        const {status, alert, nicknames} = data;
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
                    <Form.Group controlId="nicknames">
                        <Form.Label>Опции</Form.Label>
                        <Form.Control as="textarea"
                                      rows={10}
                                      value={nicknames}
                                      isInvalid={!!error}
                                      onChange={e => this.onChange('nicknames', e.target.value)}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
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
        const {status, alert, nicknames} = this.props;
        this.setState({data: {status, alert, nicknames: JSON.stringify(nicknames, null, 4)}});
    }

}

export default App;