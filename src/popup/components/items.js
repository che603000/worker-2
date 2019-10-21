import React, {Component} from 'react';
import {Row, Col, Badge, Spinner, ListGroup, Button} from "react-bootstrap";
import {FaEye, FaEyeSlash} from 'react-icons/fa';

const Item = props => {
    const {data, isWatch, onWatch} = props;
    const {id, family, name, secondName, phone, departmentName, postName, cabinet, mode} = data;

    const styleImg = {
        width: '39px',
        height: '52px',
        display: 'block'
    };
    const styleMemo = {
        fontSize: 'small',
        color: '#999'
    };

    const styleFullName = {
        overflow: 'hidden',
        maxWidth: '30ch',
        display: 'inline-block',
        wordWrap: 'break-word'
    };

    const IconWatch = isWatch ? FaEyeSlash : FaEye;

    return (
        <ListGroup.Item style={{border: 'none'}}>
            <Row>
                <Col xs={2} style={{textAlign: 'center'}}>
                    <img className="img-rounded img-xs" src={`https://portal/api/xrm/img/WorkerPhoto/${id}`}
                         style={styleImg} alt="нет фото"/>
                    <Button variant="link" size="sm" onClick={() => onWatch(data)}>
                        <IconWatch title="вкл/выкл контроль статуса"
                                   size={18}
                                   style={{color: '#999'}}/>
                    </Button>
                </Col>
                <Col xs={10}>
                    <span style={styleFullName}>{family} {name} {secondName}</span>
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
        const {total, workers, loading, error, watch, onWatch} = this.props;
        const watchUsers = watch.workers || [];
        if (loading)
            return <Wait/>;
        if (error)
            return <Error error={error}/>;

        const list = workers
            .filter(({login}) => login)
            .map(item => <Item key={item.id} data={item} onWatch={onWatch} isWatch={!!watchUsers[item.id]}/>);

        return (
            <ListGroup>
                {list}
            </ListGroup>
        );
    }
}