import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setData } from '../actions/';
import { Tabs, WhiteSpace } from 'antd-mobile';



export class Main extends Component {
    state = {
        callBack: val => true,
        tabs: [
            { title: '全部', callBack: val => true },
            { title: '正在进行', callBack: val => val.deadline > new Date().getTime() },
            { title: '已结束', callBack: val => val.deadline <= new Date().getTime() },
        ],
        tabIndex: 0
    }
    componentDidMount() {
        this.push = this.props.history.push;
        this.props.getList();
    }
    changeIndex = val => {
        this.setState({ callBack: val.callBack });
    }
    go = (item) => {
        this.push({ pathname: '/home/detail', state: { item } });
        this.props.setId(item);
    }
    render() {
        let { tabs, tabIndex, callBack } = this.state;
        return (
            <div>
                <Tabs tabs={tabs} initialPage={tabIndex} onChange={(val) => this.changeIndex(val)} />
                <div style={{ marginTop: '20px' }} className='list'>
                    {
                        this.props.listData.filter(callBack).map((item, index) => {
                            let time = new Date(Number(item.deadline)).toLocaleDateString() + new Date(Number(item.deadline)).toLocaleTimeString();
                            return <div onClick={() => this.go(item)} className="item" key={index}>
                                <div className='img_box'>
                                    <img src={item.img} alt="" />
                                    <b>{item.anonymous == 0 ? '匿名用户' : item.name}</b>
                                </div>
                                <div>
                                    <span>{item.title}</span>
                                    <span>截至到 {time}</span>
                                </div>
                                <i>{item.isRadio == 0 ? '单选' : '多选'}</i>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listData: state.listData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList() {
            dispatch(setData);
        },
        setId(item) {
            dispatch({
                type: 'SET_ID',
                value: item
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)
