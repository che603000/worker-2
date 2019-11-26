import React from 'react';
import {Form} from "react-bootstrap";


const Conf = props => {
    const {config = "{}", error, onChange} = props;
    return (
        <div className="tab-panel">
            <Form.Group controlId="config">
                <Form.Control as="textarea"
                              rows={16}
                              value={config}
                              isInvalid={!!error}
                              onChange={e => onChange('config', e.target.value)}>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </Form.Group>
        </div>
    )
};

export default Conf;
