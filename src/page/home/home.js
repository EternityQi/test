/**
 * Created by admin on 2018/7/3.
 */
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react';
import '../../../node_modules/antd/dist/antd.css';
import logo from '../../logo.svg';
import './home.css';
import TableList from '../table/table';
import FormList from '../form/form';
import TreeList from '../tree/tree';
import {
    Route,
    Link
} from 'react-router-dom';

import HeaderWrap from "../../layouts/header.js" ;
import SiderWrap from "../../layouts/siderWrap.js" ; 

const { Content, Footer } = Layout;
class SiderDemo extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout>
                <SiderWrap collapseFlag = { this.state.collapsed } />
                <Layout className={this.state.collapsed?'hasSidebar':''}>
                    <HeaderWrap collapsedFlag = {this.state.collapsed} onFun = {this.toggle}/>
                    <Content style={{ margin: '0 16px',marginTop: 64}}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                            <Route exact path="/table" component={TableList}/>
                            <Route path="/form" component={FormList}/>
                            <Route path="/tree" component={TreeList}/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
export default SiderDemo;