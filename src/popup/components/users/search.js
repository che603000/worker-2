import React, {Component} from 'react';
import {Form} from "react-bootstrap";

const LOCAL_POPUP = 'local-popup';

export default class Search extends Component {

    key = null;

    constructor() {
        super(...arguments);
        this.defaultValue = localStorage.getItem(LOCAL_POPUP);
    }

    onSearch = value => {
        this.key && clearTimeout(this.key);
        this.key = setTimeout(() => {
            this.props.onSearch(value);
        }, 300);
    }

    onChange = e => {
        e.preventDefault();
        const value = e.target.value;
        localStorage.setItem(LOCAL_POPUP, value);
        this.onSearch(value);
    };

    render() {
        return (
            <Form>
                <Form.Group controlId="inputSearch">
                    <Form.Control type="text"
                                  placeholder="фамилия или номер тел"
                                  defaultValue={this.defaultValue}
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

    componentDidMount() {
        if (this.defaultValue)
            this.onSearch(this.defaultValue);
    }
}