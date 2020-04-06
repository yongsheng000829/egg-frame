import React, { Component } from 'react'
import RouteView from '../router/Router';
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default class index extends Component {
    state = {
        navData: []
    }
    componentWillMount = () => this.push = this.props.history.push;
    async componentDidMount() {
        let res = await this.http('get', '/nav/list');
        let { code, msg, data } = res.data;
        if (code === 0) {
            this.setState({ navData: data }); return;
        };
        alert(msg);
    }
    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1', 'sub2']}>
                    <Menu.Item onClick={()=>this.push('/main/work')} style={{paddingLeft:'48px'}}>工作台</Menu.Item>
                        {
                            this.state.navData.map(item => {
                                if (item.options) {
                                    return <SubMenu key={item.key} title={<span>
                                        <Icon type={item.icon} />
                                        {item.type}
                                    </span>}>
                                        {
                                            item.options.map(jtem => <Menu.Item onClick={() => this.push(jtem.to)} key={jtem.key}>{jtem.title}</Menu.Item>)
                                        }
                                    </SubMenu>
                                }
                                return item.options.map(jtem => <Menu.Item key={jtem.key}>{jtem.title}</Menu.Item>)
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <RouteView routeData={this.props.routeData} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

