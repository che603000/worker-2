import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FaBirthdayCake} from 'react-icons/fa';
import {Badge, Col, Row, ListGroup,} from "react-bootstrap";

const Item = props => {
    const {data} = props;
    const {id, fullName, date, isAnniversary = false, isBirthday = false} = data;

    const styleImg = {
        width: '39px',
        height: '52px',
        display: 'block'
    };

    const styleFullName = {
        overflow: 'hidden',
        maxWidth: '30ch',
        display: 'inline-block',
        wordWrap: 'break-word'
    };


    return (
        <ListGroup.Item style={{border: 'none'}}>
            <Row>
                <Col xs={2} style={{textAlign: 'center'}}>
                    <img className="img-rounded img-xs" src={`https://portal/api/xrm/img/WorkerPhoto/${id}`}
                         style={styleImg} alt="нет фото"/>
                </Col>
                <Col xs={10}>

                    <span style={styleFullName}>{fullName}</span>
                    {isAnniversary ? <FaBirthdayCake size={12} style={{color: 'red'}} title="юбилейная дата"/> : ''}
                    <h5 style={{float: 'right', display: 'inline'}}>
                        <Badge variant={isBirthday ? "success" : "secondary"}>
                            {date}
                        </Badge>
                    </h5>
                </Col>
            </Row>
        </ListGroup.Item>

    )
};

class BirthDay extends Component {

    render() {
        const {workers} = this.props.birthday;
        const rows = workers.map(w => <Item key={w.id} data={w}/>);
        return (
            <div className={'panel-items'}>
                <ListGroup>
                    {rows}
                </ListGroup>
            </div>
        )
    }
}

export default connect(state => {
    const {birthday} = state;
    return {
        birthday
    };
}, {})(BirthDay);