import React, { Component } from 'react'
import { Table, Modal, Tag } from 'antd';


export default class RoleList extends Component {
    state = {
        columns: [
            {
                title: '角色ID',
                dataIndex: 'roleId',
                key: 'roleId'
            },
            {
                title: '角色名称',
                dataIndex: 'role',
                key: 'role',
            },
            {
                title: '操作',
                key: 'tags',
                dataIndex: 'tags',
                render: (tags, item) => (
                    <span key={item.userId}>
                        <Tag onClick={() => this.look(item)}>查看</Tag><Tag>编辑</Tag> <Tag onClick={() => this.remove(item)}>删除</Tag>
                    </span>
                ),
            }
        ],
        data: []
    }
    componentDidMount() {
        this.setData();
    }
    remove = async (val) => {
        let res = await this.http('delete', '/role/delete',{val});
        let {code,msg} = res.data;
        if(code===0){
            this.setData();return;
        }
        alert(msg);
    }
    look = (val) => {
        Modal.info({
            title: '查看',
            content: (
                <div>
                    <p>角色ID：{val.roleId}</p>
                    <p>角色名称：{val.role}</p>
                </div>
            ),
        });
    }
    setData = async () => {
        let res = await this.http('get', '/role/list');
        let { code, msg, data } = res.data;
        if (code === 0) {
            this.setState({ data }); return;
        }
        alert(msg);
    }
    render() {
        return (
            <div>
                <Table rowKey={item => item.roleId} columns={this.state.columns} pagination={false} dataSource={this.state.data} />
            </div>
        )
    }
}
