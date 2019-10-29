import React, {Component} from 'react';
import {Row, Col, Badge, Spinner, ListGroup, Button, Dropdown} from "react-bootstrap";
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {callPhone} from '../actions/users'

const onSelect = ({key, e, data, userId, nickname = {}}) => {
    e.preventDefault();
    debugger;
    switch (key) {
        case 'phone':
            callPhone(userId, data.id)
                .catch(e => console.log(e));
            break;
        case 'email':
            window.open(`mailto:${data.login}@api.nnov.ru`);
            break;
        case 'facebook': {
            const nick = nickname[key];
            window.open(`https://www.facebook.com/messages/t/${nick}`);
            break;
        }
        case 'telegram': {
            const nick = nickname[key];
            window.open(`tg://resolve?domain=${nick}`);
            break;
        }
        default:
            console.log(key, data);
    }
};

const Item = props => {
    const {data, isWatch, onWatch, userId, nickname = {}} = props;
    const {id, family, name, secondName, phone, departmentName, postName, cabinet, mode, login} = data;

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
    const drops = Object.keys(links).map(key => <Dropdown.Item key={key} href={key}>{key}</Dropdown.Item>);
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
                              onSelect={(key, e, login) => onSelect({key, e, data, userId, nickname})}>
                        <Dropdown.Toggle variant={mode === 1 ? "success" : "secondary"} id="dropdown-basic" size={"sm"}>
                            {phone || 'НЕТ'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="phone">Позвонить</Dropdown.Item>
                            <Dropdown.Item href="email">Ел. почта</Dropdown.Item>
                            {drops}
                            {/*<Dropdown.Item href="facebook">Facebook</Dropdown.Item>*/}
                            {/*<Dropdown.Item href="telegram">Telegram</Dropdown.Item>*/}
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
        const {workers, loading, error, watch, onWatch, user, nicknames} = this.props;
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
                               isWatch={watchUsers[item.id]}
            />);

        return (
            <ListGroup>
                {list}
            </ListGroup>
        );
    }
}