import React, { Component } from 'react'
import RouteView from '../router/router';


export default class Home extends Component {
    headerTitle = () => {
        let pathname = this.props.location.pathname;
        return pathname === '/home/main' ? '投票' : pathname === '/home/add' ? '发起投票' : pathname === '/home/detail' ? '投票详情' : '统计';
    }
    componentDidMount = () => this.push = this.props.history.push;
    go = () => {
        let pathname = this.props.location.pathname;
        if (pathname === '/home/main') {
            this.push('/home/add');
        } else if (pathname === '/home/detail') {
            this.push('/home/statistics');
        }
    }
    render() {
        let pathname = this.props.location.pathname;
        return (
            <div className="box">
                <header className="header">
                    <span onClick={() => this.props.history.goBack(-1)}>←</span>
                    <span>{this.headerTitle()}</span>
                    <span style={{ opacity: pathname === '/home/add' ? '0' : '1' }} onClick={this.go}>{pathname === '/home/main' ? '发起投票' : '统计'}</span>
                </header>
                <main className="main">
                    <RouteView routeData={this.props.routeData} />
                </main>
            </div>
        )
    }
}
