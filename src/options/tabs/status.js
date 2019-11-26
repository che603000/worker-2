import React from 'react';
import {Form} from "react-bootstrap";


const Status = props => {
    const {status, alert, onChange} = props;
    return (
        <div  className="tab-panel">
            <Form.Group controlId="status">
                <Form.Label>Проверка статуса</Form.Label>
                <Form.Control as="select"
                              value={status}
                              onChange={e => onChange('status', e.target.value)}>
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
                              onChange={e => onChange('alert', e.target.value)}>
                    <option value="0">не выводить</option>
                    <option value="1">выводить на 30 сек</option>
                    <option value="2">не закрывать автоматически</option>
                </Form.Control>
            </Form.Group>
        </div>
    )
};

export default Status;
