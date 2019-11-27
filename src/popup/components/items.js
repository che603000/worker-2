import React, {Component} from 'react';
import {Row, Col, Badge, Spinner, ListGroup, Button, Dropdown} from "react-bootstrap";
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {callPhone, callMobilePhone} from '../actions/users';


const onSelect = ({key, e, data, userId, nickname = {}, config}) => {
    e.preventDefault();
    debugger;
    switch (key) {
        case 'phone':
            callPhone(userId, data.id)
                .catch(e => console.log(e));
            break;
        case 'email':
            window.open(`mailto:${data.email}`);
            break;
        case 'mobile':
            callMobilePhone(data.id)
                .catch(e => console.log(e));
            break;
        default:
            const {url} = config[key] || {};
            if (url) {
                const path = url.replace('${nick}', nickname[key]);
                window.open(path);
            }
    }
};

const Item = props => {
    const {data, isWatch, onWatch, userId, nickname = {}, config} = props;
    const {id, family, name, secondName, phone, departmentName, postName, canMobileCall, cabinet, mode} = data;

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

    const {id: _id, name: _name, ...links} = nickname;
    const drops = Object.keys(links)
        .filter(key => links[key])
        .map(key =>
            <Dropdown.Item key={key} href={key}>
                {config[key].title}
            </Dropdown.Item>
        );
    return (
        <ListGroup.Item style={{border: 'none'}}>
            <Row>
                <Col xs={2} style={{textAlign: 'center'}}>
                    <img className="img-rounded img-xs" src={`https://portal/api/xrm/img/WorkerPhoto/${id}`}
                         style={styleImg} alt="нет фото" title={id}/>
                    <Button variant="link" size="sm" onClick={() => onWatch(data)}>
                        <IconWatch title={isWatch ? "удалить из избранных" : "добавить в избранные"}
                                   size={18}
                                   style={{color: '#999'}}/>
                    </Button>
                </Col>
                <Col xs={10}>

                    <span style={styleFullName}>{family} {name} {secondName}</span>
                    <Dropdown style={{float: 'right', display: 'inline'}}
                              onSelect={(key, e, login) => onSelect({key, e, data, userId, nickname, config})}>
                        <Dropdown.Toggle variant={mode === 1 ? "success" : "secondary"} id="dropdown-basic" size={"sm"}>
                            {phone || 'НЕТ'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {phone ? <Dropdown.Item href="phone">Внутр. тел.</Dropdown.Item> : null}
                            {canMobileCall ? <Dropdown.Item href="mobile">Моб. тел.</Dropdown.Item> : null}
                            <Dropdown.Item href="email">Эл. почта</Dropdown.Item>
                            {drops.length > 0 ? <Dropdown.Divider/> : null}
                            {drops}
                        </Dropdown.Menu>
                    </Dropdown>

                    <div style={styleMemo}>{departmentName}. {postName}. {cabinet ? ("Офис: " + cabinet) : ""} </div>
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
};

const Error = props => (
    <ListGroup.Item>
        <ListGroup.Item className="alert alert-warning">Error: {props.error.message}</ListGroup.Item>
    </ListGroup.Item>
);

export default class Items extends Component {

    render() {
        const {workers, loading, error, watch, onWatch, user, nicknames = [], config = {}} = this.props;
        const watchUsers = (watch.workers || []).reduce((res, w) => ({...res, [w.id]: true}), {});
        if (loading)
            return <Wait/>;
        if (error)
            return <Error error={error}/>;

        const list = workers
            .filter(({login}) => login)
            .map(item => <Item key={item.id}
                               nickname={nicknames.find(n => n.id === item.id)}
                               data={item}
                               userId={user && user.id}
                               onWatch={onWatch}
                               config={config}
                               isWatch={watchUsers[item.id]}
            />);

        return (
            <ListGroup>
                {list}
            </ListGroup>
        );
    }
}