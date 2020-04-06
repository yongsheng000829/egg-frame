import React, { Component } from 'react'
import { InputItem, TextareaItem } from 'antd-mobile';
import { Select, Button, DatePicker } from 'antd';
const { Option } = Select;


export default class Add extends Component {
    state = {
        iptData: [{ value: '', placeholder: '请输入', id: Number(parseInt(Math.random() * new Date()).toString().slice(-6)) }],
        deadline: new Date().getTime(),
        isRadio: '',
        anonymous: '',
        description: '',
        title: ''
    }
    getNum = () => Number(parseInt(Math.random() * new Date()).toString().slice(-6));
    onChange = (a, dateString) => {
        this.setState({ deadline: dateString });
    }
    add = () => {
        let { iptData } = this.state;
        iptData.push({ value: '', placeholder: '请输入', id: this.getNum() });
        this.setState({ iptData });
    }
    findIndex = (data, id) => {
        return data.findIndex(val => val.id == id)
    }
    remove = (id) => {
        let { iptData } = this.state;
        let index = this.findIndex(iptData, id);
        iptData.splice(index, 1);
        this.setState({ iptData });
    }
    changeIpt = (id, e) => {
        let { iptData } = this.state;
        let index = this.findIndex(iptData, id);
        iptData[index].value = e.target.value;
        this.setState({ iptData });
    }
    submit = async () => {
        let { http, state } = this;
        let data = {
            title: state.title,
            deadline: new Date(state.deadline).getTime(),
            isRadio: state.isRadio,
            anonymous: state.anonymous,
            description: state.description,
        };
        let options = state.iptData;
        let flag = Object.keys(data).some(val => data[val] == '');
        let flagTwo = options.some(val => val.value == '');
        if (flag || flagTwo) return alert('请补全信息');
        let res = await http('post', '/addVote', { data, options });
        let { code, msg } = res.data;
        if (code === 0) {
            this.props.history.push('/home/main'); return;
        }
        alert(msg);
    }
    render() {
        let { iptData } = this.state;
        return (
            <div>
                <InputItem onChange={e => this.setState({ title: e })}>标题：</InputItem>
                <div style={{ marginTop: '15px' }}><p>描述：</p><TextareaItem onChange={e => this.setState({ description: e })} rows={4} count={100} /></div>
                <div className='addandend'>
                    {
                        iptData.map((item, index) => {
                            return <div key={index}><b>{'选项' + (index + 1)}</b>：<input onChange={(e) => this.changeIpt(item.id, e)} type="text" value={item.value} placeholder={item.placeholder} />{index === iptData.length - 1 ? <span className='add' onClick={this.add}>+</span> : <span className='end' onClick={() => this.remove(item.id)}>-</span>}</div>
                        })
                    }
                </div>
                <div>
                    <Select defaultValue='请选择单选或多选' onChange={e => this.setState({ isRadio: e })}>
                        <Option value='0'>
                            单选
                    </Option>
                        <Option value='1'>
                            多选
                    </Option>
                    </Select>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Select defaultValue='是否匿名' onChange={e => this.setState({ anonymous: e })}>
                        <Option value='0'>
                            匿名
                    </Option>
                        <Option value='1'>
                            不匿名
                    </Option>
                    </Select>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <DatePicker onChange={this.onChange} showTime={true} />
                </div>
                <div style={{ marginTop: '25px' }}>
                    <Button type="primary" size="small" onClick={this.submit}>提交</Button>
                </div>
            </div>
        )
    }
}
