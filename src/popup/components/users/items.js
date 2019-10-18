import React, {Component} from 'react';
import {Row, Col, Badge, Spinner, ListGroup, Button} from "react-bootstrap";
import {FaEye} from 'react-icons/fa';

const Item = props => {
    const {id, family, name, secondName, phone, departmentName, postName, cabinet, mode, onWatch} = props;
    const styleImg = {
        width: '39px',
        height: '52px',
        display: 'block'
    };
    const styleMemo = {
        fontSize: 'small',
        color: '#999'
    };

    return (
        <ListGroup.Item style={{border: 'none'}}>
            <Row>
                <Col xs={2} style={{textAlign: 'center'}}>
                    <img className="img-rounded img-xs" src={`https://portal/api/xrm/img/WorkerPhoto/${id}`}
                         style={styleImg} alt="нет фото"/>
                    <Button variant="link" size="sm" onClick={() => onWatch(id)}>
                        <FaEye title="вкл/выкл контроль статуса"
                               size={18}
                               style={{color: '#999'}}/>
                    </Button>
                </Col>
                <Col xs={10}>
                    <span data-id={id} data-command={"CARD"}>{family} {name} {secondName}</span>
                    <h5 style={{float: 'right', display: 'inline'}}>
                        <Badge variant={mode === 1 ? "success" : "secondary"}>
                            {phone || 'НЕТ'}
                        </Badge>
                    </h5>

                    <div style={styleMemo}>{departmentName}. {postName}</div>
                    <div style={styleMemo}>{cabinet ? ("Офис: " + cabinet) : ""}</div>

                </Col>
            </Row>
        </ListGroup.Item>
    )
};

const Wait = () => {
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
}

const Error = props => (
    <ListGroup.Item>
        <ListGroup.Item className="alert alert-warning">Error: {props.error.message}</ListGroup.Item>
    </ListGroup.Item>
);

export default class Items extends Component {

    render() {
        const {totalCount = 0, workers = [], loading, error = null, onWatch} = this.props;

        if (loading)
            return <Wait/>;
        if (error)
            return <Error error={error}/>;

        const list = workers
            .filter(({login}) => login)
            .map(item => <Item key={item.id} {...item} onWatch={onWatch}/>);

        return (
            <ListGroup>
                {list}
            </ListGroup>
        );
    }
}