import React, { Component } from 'react'
import { Input, Tree, Button } from 'antd';
const { TreeNode } = Tree;


export default class AddRole extends Component {
    state = {
        treeList: [],
        caoZuoList: []
    }
    onCheckLeft = (checkedKeys) => this.setState({ treeList: checkedKeys.filter(val => val.indexOf('tree') == -1) });
    onCheckRight = (checkedKeys) => this.setState({ caoZuoList: checkedKeys.filter(val => val.indexOf('tree') == -1) });
    submit = async () => {
        let { treeList, caoZuoList } = this.state;
        let role = this.refs.name.input.value
        let res = await this.http('post', '/role/add', { treeList, caoZuoList, role });
        let { code, msg } = res.data;
        alert(msg);
        if (code === 0) {
            this.props.history.push('/main/rolelist'); return;
        }
    }
    render() {
        return (
            <div>
                <div><span>用户名:</span><br /><Input placeholder="角色名称" ref='name' /></div>
                <div style={{ float: 'left' }}>
                    <Tree
                        checkable
                        defaultExpandedKeys={['tree1', 'tree2']}
                        onCheck={this.onCheckLeft}
                    >
                        <TreeNode title="用户左侧列表视图" key="tree">
                            <TreeNode title="用户权限" key="tree1">
                                <TreeNode title="用户列表" key="1" />
                                <TreeNode title="添加用户" key="2" />
                            </TreeNode>
                            <TreeNode title="角色权限" key="tree2">
                                <TreeNode title="角色列表" key="3" />
                                <TreeNode title="添加角色" key="4" />
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                </div>
                <div style={{ float: 'right', marginRight: '50px' }}>
                    <Tree
                        checkable
                        defaultExpandedKeys={['tree']}
                        onCheck={this.onCheckRight}
                    >
                        <TreeNode title="用户操作权限" key="tree">
                            <TreeNode title="增加" key="add" />
                            <TreeNode title="删除" key="delete" />
                            <TreeNode title="修改" key="edit" />
                        </TreeNode>
                    </Tree>
                </div>
                <div style={{ clear: "both" }}></div>
                <Button onClick={this.submit} type="primary" style={{ marginTop: '40px' }}>提交</Button>
            </div>
        )
    }
}
