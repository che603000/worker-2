import React, {Component} from 'react';
import {Spinner, ListGroup} from "react-bootstrap";

export default class Index extends Component {
    render() {
        const {totalCount = 0, workers = [], loading, error = null} = this.props;
        if (loading)
            return (
                <ListGroup>
                    <ListGroup.Item className='text-center'>
                        <Spinner animation="grow" variant="primary" size="sm"/>
                        &nbsp;
                        <Spinner animation="grow" variant="primary" size="sm"/>
                        &nbsp;
                        <Spinner animation="grow" variant="primary" size="sm"/>
                        &nbsp;
                        <Spinner animation="grow" variant="primary" size="sm"/>
                        &nbsp;
                        <Spinner animation="grow" variant="primary" size="sm"/>
                        &nbsp;
                        <Spinner animation="grow" variant="primary" size="sm"/>
                    </ListGroup.Item>
                </ListGroup>
            );
        else {
            const content = error ?
                (<ListGroup.Item className="alert alert-warning">Error: {error.message}</ListGroup.Item>)
                : (workers.map(item => (<ListGroup.Item key={item.id}>{item.userName}</ListGroup.Item>)));
            return (
                <ListGroup>
                    {content}
                </ListGroup>
            );
        }
    }
}