import React from 'react';
import {Form, Tab} from "react-bootstrap";


const Nicknames = props => {
    const {nicknames, error, onChange} = props;
    return (
        <div className="tab-panel">
            <Form.Group controlId="nicknames">
                <Form.Control as="textarea"
                              rows={16}
                              value={nicknames}
                              isInvalid={!!error}
                              onChange={e => onChange('nicknames', e.target.value)}>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </Form.Group>
        </div>
    )
};

export default Nicknames;
