import React, { Component } from 'react'
import { Button, Progress } from 'antd';



export default class Detail extends Component {
    state = {
        item: this.props.location.state.item,
        options: [],
        arr: [],
        isShow: true,
        flag: false
    }
    componentDidMount() {
        this.setOptions();
    }
    setOptions = async () => {
        let { deadline } = this.state.item;
        let res = await this.http('get', '/voteData', { vote_id: this.state.item.voteId });
        let { code, msg, data } = res.data;
        let flag = deadline > new Date().getTime() && data.isSubmit ? true : false;
        if (code === 0) {
            this.setState({ options: data.data, isShow: flag }); return;
        }
        alert(msg);
    }
    Change = (id, val) => {
        let { arr, item, options } = this.state;
        let index = options.findIndex(val => val.id === id);
        if (item.isRadio == 0 && val === true) {
            arr = [{ id, timer: new Date().getTime() }];
            options = options.map(item => {
                item.checked = false;
                return item;
            })
            options[index].checked = true;
        }
        if (item.isRadio == 1) {
            if (val) {
                arr.push({ id, timer: new Date().getTime() });
                options[index].checked = true;
            } else {
                arr.splice(index, 1);
                options[index].checked = false;
            }
        }
        this.setState({ arr, options }, () => console.log(this.state.arr));
    }
    submit = async () => {
        let { arr, item } = this.state;
        let res = await this.http('post', '/pushVote', { arr, vote_id: item.voteId });
        let { code, msg } = res.data;
        if (code === 0) {
            this.setState({ flag: true });
            this.setOptions();
            return;
        }
        alert(msg);
    }
    render() {
        let { item, options, flag, isShow } = this.state;
        return (
            <div className='detail'>
                <div className="top">
                    <img src={item.img} alt="" />
                    <b>{item.anonymous == 0 ? '匿名用户' : item.name}</b>
                    <span>截至到{new Date(Number(item.deadline)).toLocaleDateString() + new Date(Number(item.deadline)).toLocaleTimeString()}</span>
                </div>
                <p>{item.title}</p>
                <div className="option_list">
                    {
                        options.map((item, index) => <div key={index}> <input disabled={flag} checked={item.checked ? item.checked : false} onChange={(e) => this.Change(item.id, e.target.checked)} type="checkbox" /><span>{item.value}</span><i>{item.count}票</i><Progress percent={item.count * 10} showInfo={false} /> </div>)
                    }
                </div>
                <div className='bottom'>
                    {isShow ? <Button type="primary" disabled={flag} onClick={this.submit} size="small">提交</Button> : null}
                </div>
            </div>
        )
    }
}
