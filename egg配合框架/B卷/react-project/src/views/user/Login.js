import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InputItem, Button } from 'antd-mobile';


export class Login extends Component {
    render() {
        return (
            <div>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', lineHeight: '30px' }}>登陆</h2>
                <div style={{ marginBottom: '20px' }}>
                    <InputItem placeholder="username" ref="username">用户名</InputItem>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <InputItem placeholder="password" ref="password">密码</InputItem>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button type="primary" onClick={this.login} size="small" inline>登陆</Button>
                </div>
            </div>
        )
    }
    login = async () => {
        let loginData = {
            username: this.refs.username.state.value,
            password: this.refs.password.state.value
        };
        if (loginData.username === "") return alert('用户名不能为空');
        if (loginData.password === "") return alert('密码不能为空');
        let res = await this.http('post', '/login', loginData);
        let { code, msg, data } = res.data;
        if (code === 0) {
            window.localStorage.setItem('token', data);
            this.props.history.push('/home/main');
            return;
        }
        alert(msg);
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
