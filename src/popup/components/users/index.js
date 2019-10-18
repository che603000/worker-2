import React, {Component} from 'react';
import Search from './search';
import Items from './items';
import {sendMessage} from '../../../utils';
import {SEARCH, WATCH} from '../../../const';


export default class Index extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            totalCount: 0,
            workers: [],
            loading: false
        }
    }

    onWatch = id => {
        console.log(id);
        sendMessage({type: WATCH, data: id})
            .then(id => {
            })
    };

    onSearch = value => {
        this.setState({loading: true});
        sendMessage({type: SEARCH, data: value})
            .then(data => {
                console.log(data);
                this.setState({...data, error: null});
            })
            .catch(error => this.setState({error}))
            .finally(() => this.setState({loading: false}));
    };

    render() {
        return (
            <div className={'panel'}>
                <Search onSearch={this.onSearch}/>
                <Items {...this.state} onWatch={this.onWatch}/>
            </div>
        )
    }
}