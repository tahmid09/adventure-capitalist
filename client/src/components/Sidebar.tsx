import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';

import Managers from './Managers'

const {  Sider } = Layout;

interface IProps {

}

interface IState {
  collapsed: boolean;
  loading: boolean;
  visible: boolean;
}

class Sidebar extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    
        this.state = {
          collapsed: false,
          loading: false,
          visible: false,
        };
        
    }


    onCollapse = (collapsed:boolean ) => {
      this.setState({ collapsed });
    };

    showModal = () => {
        this.setState({
          visible: true,
        });
    };

    handleCallback = (childData: boolean) =>{
        this.setState({
            visible: childData,
          });
    }
    

    render() {
        const { collapsed } = this.state;
        return (
            <>
              <Sider 
                breakpoint="lg"
                collapsedWidth="50"
                style={{
                  overflow: 'auto',
                  height: '100vh',
                  position: 'fixed',
                  left: 0,
                }}
                      
                onBreakpoint={broken => {
                }}
                collapsed={collapsed} onCollapse={this.onCollapse} className="customSidebar">
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                  <Menu.Item key="1" icon={<PieChartOutlined />}>
                      Upgrades
                  </Menu.Item>
                  <Menu.Item key="2" icon={<DesktopOutlined />} onClick={this.showModal} >
                      Managers
                  </Menu.Item>
                       
                </Menu>
              </Sider>
              <Managers visible={this.state.visible} parentCallback = {this.handleCallback} />
            </>    
        );
    }
}

export default Sidebar;
