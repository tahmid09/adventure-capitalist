import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar'
import Home from './components/Home'

interface IProps {
}

interface IState {
  collapsed: boolean;
}

const { Header, Content, Footer } = Layout;


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
        <Layout className="site-layout siteMailLayout" >
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Home/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );

 }


}

export default App;
