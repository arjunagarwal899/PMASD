import React from 'react';
import {Provider} from "react-redux";
import store from "./redux/store";

import 'antd/dist/antd.css';

import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import {Layout, Menu, Breadcrumb } from 'antd';

import Title from 'antd/lib/typography/Title';
import Submenu from 'antd/lib/menu/SubMenu';
import { Card, Col, Row } from 'antd';

const { Meta } = Card;
const { Header, Footer, Sider, Content} = Layout;
function App() {
    return (
        <div>
            <Layout>     
            <Header style={{background: '#17252A'}}>
                <Title style= {{color:'white', padding:'10px 0'}} level={2}>PMASD</Title>
            </Header>
            <Layout>
                <Sider style={{background: '#17252A'}}>
                    <Menu
                    defaultSelectedKeys={['Dashboard']}
                    mode="inline"
                    >
                        <Menu.Item key='Dashboard'>
                            Dashboard
                        </Menu.Item>
                        <Submenu title={
                            
                                <span>About Us</span>
                            
                        }>
                            {/* <Menu.ItemGroup key='AboutUs' title='Country 1'>
                            <Menu.item key='location1'>Location 1</Menu.item>
                            <Menu.item key='location2'>Location 2</Menu.item>
                            </Menu.ItemGroup> */}
                            
                        </Submenu>
                    </Menu>


                </Sider>
                <Layout style={{height:"100vh"}}>
                   
                   <Content style={{padding: '0 50px'}}>
                       <Breadcrumb style={{margin: '16px 0'}}>
                           <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                           
                       </Breadcrumb>
                       <div style={{background: '#fff', padding:24, justifyContent: 'center'}}>
                       <div className="site-card-wrapper" >
    <Row gutter={16} style={{justifyContent: 'center', padding: '40px 0 0 10px'}}>
      <Col span={7}>
  <Card
    hoverable
    style={{ width: 300, background: '#fff' }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card></Col>
  <Col span={7}>
  <Card
    hoverable
    style={{ width: 300, background: '#fff' }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card></Col>
  <Col span={7}>
  <Card
    hoverable
    style={{ width: 300, background: '#fff' }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card></Col></Row>
  {"\n"}
  <Row gutter={16} style={{justifyContent: 'center', padding: '40px 0 0 10px'}}>
  <Col span={7}>
  <Card
    hoverable
    style={{ width: 300, background: '#fff' }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card></Col>

      <Col span={7}>
  <Card
    hoverable
    style={{ width: 300, background: '#fff' }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card></Col>
  <Col span={7}>
  <Card
    hoverable
    style={{ width: 300, background: '#fff' }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card></Col> </Row>
 
  <Row gutter={16} style={{justifyContent: 'center', padding: '40px 0 0 10px'}}>
  <Col span={7}>
  <Card
    hoverable
    style={{ width: 300, background: '#fff' }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card></Col>
  <Col span={7}>
  <Card
    hoverable
    style={{ width: 300, background: '#fff' }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card></Col>
  </Row>
  </div>
  </div>
  <Footer style={{textAlign: 'center'}}>Created by PMASD</Footer>    
                   </Content>
                   
                </Layout>
            </Layout>       
            </Layout>        
                    

               
            </div>
    );
}

export default App;
