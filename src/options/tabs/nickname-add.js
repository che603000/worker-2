import React, {useState} from 'react';
import {Form, InputGroup, Collapse, Button, Spinner, Row, Col} from "react-bootstrap";
import {URL_WORKER_SEARCH} from '../../const';
import {FaPlusCircle, FaUserPlus} from 'react-icons/fa';
import {load} from '../../utils';

let key = null;

const NicknameAdd = props => {

    const {nicknames, error, onInsert, visible} = props;
    const {config = "{}"} = props;
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(false);

    const dataCNF = JSON.parse(config);

    const onChange = e => {
        e.preventDefault();
        key && clearTimeout(key);
        setLoading(false);

        const {value} = e.target;
        setValue(value);
        if (value.length < 2) {
            setList([]);
            return;
        }
        const user = list.find(d => d.name === value);
        if (user) {
            setUserId(user.id);
            return;
        } else
            setUserId(null);

        key = setTimeout(() => {
            setLoading(true);
            load(`${URL_WORKER_SEARCH}/${decodeURIComponent(value)}`)
                .then(data => data.workers.filter(w => w.login).map(({family, name, id}) => ({
                    id,
                    name: `${family} ${name}`,
                })))
                .then(data => setList(data))
                .finally(() => setLoading(false))

        }, 300);

    };

    const onAdd = e => {
        const item = {
            id: userId,
            name: value,
        };
        Object.keys(dataCNF).forEach(key => item[key] = "");
        const dataNN = JSON.parse(nicknames);
        const res = (dataNN.some(d => d.id === item.id)) ? dataNN.map(d => d.id === item.id ? {...item, ...d} : d) : [item, ...dataNN];
        onInsert('nicknames', JSON.stringify(res, null, 4));
    };

    return (
        <div>
            <Collapse in={visible}>
                <div className="tab-panel">
                    <Form.Group controlId="nickname">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                {userId ? <InputGroup.Text>{userId}</InputGroup.Text> : null}
                            </InputGroup.Prepend>
                            <Form.Control
                                list="list-names"
                                placeholder="поиск сотрудника по фамилии"
                                value={value}
                                isInvalid={!!error}
                                isValid={userId}
                                onChange={onChange}>
                            </Form.Control>
                            <InputGroup.Append>
                                {loading ? <InputGroup.Text><Spinner animation="border"
                                                                     size="sm"/></InputGroup.Text> : null}
                                {userId ? <Button onClick={onAdd}><FaUserPlus/></Button> : null}
                            </InputGroup.Append>
                        </InputGroup>

                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
                        <datalist id="list-names">
                            {list.map(d => <option  key={d.id}>{d.name}</option>)}
                        </datalist>
                    </Form.Group>

                </div>
            </Collapse>
        </div>
    )
};

export default NicknameAdd;
