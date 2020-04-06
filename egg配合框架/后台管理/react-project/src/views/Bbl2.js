import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setData } from '../action/index';

function mapStateToProps(state) {
    return {
        list: state.voteReducer.list,
        data: state.voteReducer.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getList() {
            dispatch(setData)
        }
    };
}

class First extends Component {
    state = {
        list: [],
        tabList: [
            { title: '全部', index: 0 },
            { title: '已关闭', index: 1 },
            { title: '正在进行中', index: 2 },
        ],
        tabIndex: 0
    }
    componentWillMount = () => this.$push = this.props.history.push;
    componentDidMount() {
        // this.props.getList(localStorage.username);
        this.props.getList();
        console.log(this.props.data);
        // this.setState({ list: this.props.list })
    }
    tabFunc = (index) => {
        let { list } = this.state;
        this.setState({ tabIndex: index });
        let currentTime = new Date().getTime();
        list = this.props.list.filter(v => {
            if (index === 1) return currentTime > new Date(v.time.replace(/[\u4e00-\u9fa5]/g, '')).getTime();
            if (index === 2) return currentTime < new Date(v.time.replace(/[\u4e00-\u9fa5]/g, '')).getTime()
            return v
        })
        this.setState({ list }, () => { console.log(this.state.list) });
    }
    render() {
        // this.state.list = [...this.props.list];
        return (
            <div className="first" style={{ height: "100%" }}>
                <div className="header">
                    <div><span>ㄑ</span></div>
                    <div>投票</div>
                    <div onClick={() => this.$push('/home/vote')}>发起投票</div>
                </div>
                <div className="tab">
                    {
                        this.state.tabList.map(v => <span key={v.index} className={v.index === this.state.tabIndex ? "active" : ""} onClick={() => this.tabFunc(v.index)}>{v.title}</span>)
                    }
                </div>
                <div className="con">
                    {
                        this.state.list.map(v => {
                            return <div className="item" key={v.id} onClick={() => this.$push({ pathname: '/home/detail', state: v })} >
                                <div>
                                    <img src={`http://q4.qlogo.cn/headimg_dl?dst_uin=${v.qqnumber}&spec=100`} alt="" />
                                </div>
                                <div>
                                    <p>{v.name}</p>
                                    <p>{v.title}</p>
                                </div>
                                <div>
                                    <p>截止到{v.time}</p>
                                    <p>{v.type}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(First);