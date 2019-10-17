import React, {Component} from 'react';
import Search from './search';
import Items from './items';
import {loaderUser} from '../../utils/loaders'

export default class Index extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            totalCount: 0,
            workers: [],
            loading: false
        }
    }

    onSearch = value => {
        this.setState({loading: true});
        loaderUser({value})
            .then(data => {
                this.setState({...data, error: null});
            })
            .catch(error => this.setState({error}))
            .finally(() => this.setState({loading: false}))
    };

    render() {
        return (
            <div className={'panel'}>
                <Search onSearch={this.onSearch}/>
                <Items {...this.state}/>
            </div>
        )
    }
}