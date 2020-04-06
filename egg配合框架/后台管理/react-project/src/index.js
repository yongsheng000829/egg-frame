import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/reset.css';
import axios from './untils/axios';
React.Component.prototype.http = axios;
ReactDOM.render(<App />, document.getElementById('root'));


