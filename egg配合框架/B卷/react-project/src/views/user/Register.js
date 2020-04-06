import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InputItem, Button } from 'antd-mobile';

export class Register extends Component {
    register = async () => {
        let { refs, http } = this;
        let registerData = {
            username: refs.username.state.value,
            password: refs.password.state.value,
            name: refs.name.state.value,
            qqmailbox: refs.qqmailbox.state.value,
            qqnumber: refs.qqnumber.state.value,
            img: `http://q4.qlogo.cn/headimg_dl?dst_uin=${refs.qqnumber.state.value}&spec=100`
        };
        let res = await http('post', '/register', { registerData });
        alert(res.data.msg);
        if (res.data.code === 0) {
            if (window.confirm('是否去登陆')) {
                this.props.history.push('/login');
            }
        }
    }
    render() {
        return (
            <div className='register'>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', lineHeight: '30px' }}>注册</h2>
                <div>
                    <InputItem ref="username">用户名</InputItem>
                </div>
                <div>
                    <InputItem ref="password">密码</InputItem>
                </div>
                <div>
                    <InputItem ref="name">昵称</InputItem>
                </div>
                <div>
                    <InputItem ref="qqmailbox">邮箱</InputItem>
                </div>
                <div>
                    <InputItem ref="qqnumber">qq号码</InputItem>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button type="primary" onClick={this.register} size="small" inline>注册</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
