import React, { Component } from 'react'
import { Table, Modal, Tag } from 'antd';




export default class UserList extends Component {
    state = {
        columns: [
            {
                title: '用户ID',
                dataIndex: 'userId',
                key: 'userId'
            },
            {
                title: '用户账号',
                dataIndex: 'user',
                key: 'user',
            },
            {
                title: '用户密码',
                dataIndex: 'password',
                key: 'password',
            },
            {
                title: '用户角色',
                dataIndex: 'role',
                key: 'role',
            },
            {
                title: '操作',
                key: 'tags',
                dataIndex: 'tags',
                render: (tags, item) => (
                    <span key={item.userId}>
                        <Tag onClick={() => this.info(item)}>查看</Tag><Tag onClick={() => this.push({ pathname: '/main/adduser', state:{ item } })}>编辑</Tag> <Tag onClick={() => this.remove(item)}>删除</Tag>
                    </span>
                ),
            }
        ],
        data: [],
        visible: false
    }
    remove = async (item) => {
        let res = await this.http('delete', '/user/delete', { userId: item.userId });
        let { msg, code } = res.data;
        if (code === 0) {
            this.getList(); return;
        }
        alert(msg);
    }
    getList = async () => {
        let res = await this.http('get', '/user/list');
        let { data, msg, code } = res.data;
        if (code === 0) {
            this.setState({ data }); return;
        }
        alert(msg);
    }
    componentDidMount() {
        this.push = this.props.history.push;
        this.getList();
    }
    info = (val) => {
        Modal.info({
            title: '查看',
            content: (
                <div>
                    <p>用户名：{val.user}</p>
                    <p>密码：{val.password}</p>
                    <p>角色：{val.role}</p>
                </div>
            ),
        });
    }
    render() {
        return (
            <div>
                <Table rowKey={item => item.userId} columns={this.state.columns} pagination={false} dataSource={this.state.data} />
            </div>
        )
    }
}
