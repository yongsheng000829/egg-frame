import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.css';
import App from './App';
import http from './untils/axios';
import 'antd-mobile/dist/antd-mobile.css';
import 'antd/dist/antd.css';
React.Component.prototype.http = http;


ReactDOM.render(<App />, document.getElementById('root'));


