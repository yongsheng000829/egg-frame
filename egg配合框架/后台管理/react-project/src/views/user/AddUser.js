import React, { Component } from 'react'
import { Input, Select, Button } from 'antd';
const { Option } = Select;

export default class AddUser extends Component {
    state = {
        data: [],
        options: [],
        viewData: this.props.location.state,
        selectValue: this.props.location.state ? this.props.location.state.item.role : '请选择'
    }
    getList = async () => {
        let res = await this.http('get', '/role/list');
        let { data, code, msg } = res.data;
        if (code === 0) {
            this.setState({ options: data }); return;
        }
        alert(msg);
    }
    componentDidMount() {
        this.push = this.props.history.push;
        this.getList();
    }
    handleChange = (value) => {
        this.setState({ selectValue: value });
    }
    submit = async () => {
        let obj = {
            user: this.refs.user.input.value,
            password: this.refs.password.input.value,
            role: this.state.selectValue
        };
        if (obj.user === '' || obj.password === '') {
            alert('请补全信息重试'); return;
        }
        if (this.state.selectValue === '请选择') {
            alert('请选择身份'); return;
        }
        let { viewData } = this.state;
        if (viewData) obj.userId = viewData.item.userId;
        let val = viewData ? '/user/edit' : '/user/register';
        let res = await this.http('post', val, { obj });
        let { code, msg } = res.data;
        if (code === 0) {
            this.push('/main/userlist'); return;
        }
        alert(msg);
    }
    render() {
        let { viewData, selectValue } = this.state;
        return (
            <div>
                <div style={{ marginBottom: '20px' }}>
                    <span>用户名:</span><br /><Input defaultValue={viewData ? viewData.item.user : ''} placeholder="用户名" ref='user' />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <span>密码:</span><br /><Input defaultValue={viewData ? viewData.item.password : ''} placeholder="密码" ref='password' />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <span>身份:</span><br />
                    <Select value={selectValue} style={{ width: 120 }} onChange={this.handleChange}>
                        {
                            this.state.options.map(item => {
                                return <Option key={item.roleId} value={item.role}>{item.role}</Option>;
                            })
                        }
                    </Select>
                </div>
                <Button type="primary" onClick={this.submit}>提交</Button>
            </div>
        )
    }
}
