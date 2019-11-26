import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import {STORE_OPTIONS} from '../const';
import {loadState, saveState} from '../utils';

const props = loadState(STORE_OPTIONS, {status: "3", alert: "1", nicknames: [], config: {}});

ReactDOM.render(<App {...props}/>, document.getElementById('root'));

