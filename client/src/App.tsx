import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import 'antd/dist/antd.css';


import { Layout, Menu, Breadcrumb } from 'antd';


import Sidebar from './components/Sidebar'
import Home from './components/Home'

interface IProps {
}

interface IState {
  collapsed: boolean;
}


const { Header, Content, Footer, Sider } = Layout;


class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      collapsed: false,
    };
    
  }



  componentDidUpdate(prevProps: any, prevState: any) { 

  }

  componentDidMount () {

  }

 render() {
 
    return (
      <Layout style={{ minHeight: '100vh' }}>
           <Sidebar/>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <Home/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    );

 }


}

export default App;
