import React, {Component} from 'react';
import {Form} from "react-bootstrap";

export default class Search extends Component {

    key = null;

    onSearch = value => {
        this.key && clearTimeout(this.key);
        this.key = setTimeout(() => {
            this.props.onSearch(value);
        }, 300);
    };

    onChange = e => {
        e.preventDefault();
        const value = e.target.value;
        this.onSearch(value);
    };

    render() {
        return (
            <Form>
                <Form.Group controlId="inputSearch">
                    <Form.Control type="text"
                                  placeholder="фамилия или номер тел"
                                  defaultValue={this.props.value}
                                  onChange={this.onChange}/>
                    {/*<Form.Text className="text-muted">*/}
                    {/*    We'll never share your email with anyone else.*/}
                    {/*</Form.Text>*/}
                </Form.Group>
            </Form>
        )
    }

    componentWillUnmount() {
        this.key && clearTimeout(this.key);
    }
}