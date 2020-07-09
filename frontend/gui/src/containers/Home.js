import React from 'react';
import 'antd/dist/antd.css';
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
            
            <Layout>
                <Layout style={{height:"100vh"}}>
                   
                   <Content style={{padding: '0 50px'}}>
                       <Breadcrumb style={{margin: '16px 0'}}>
                           <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                           
                       </Breadcrumb>
                       <div style={{background: '#BBB', padding:24, justifyContent: 'center'}}>
                       <div className="site-card-wrapper" >
   
    <Row  gutter={[8,8]} style={{justifyContent: 'center'}}>
      <Col span={3}> <Card hoverable style={{ background: '#fff' }}>
            Card1
            </Card>
        </Col>
      <Col span={9}> <Card hoverable style={{ background: '#fff'}}>
            Card2
        </Card>
     </Col>
    </Row>
    <Row  gutter={[8,8]} style={{justifyContent: 'center'}}>
      <Col span={4}> <Card hoverable style={{ background: '#fff' }} >
            Card3
        </Card>
        </Col>
      <Col span={4}> <Card hoverable style={{ background: '#fff'  }} >
         Card4
        </Card></Col>
      <Col span={4}>
         <Card hoverable style={{  background: '#fff' }}>
    Card5
  </Card>
      </Col>
    </Row>
    <Row  gutter={[8,8]} style={{justifyContent: 'center'}}>
      <Col span={4}><Card hoverable style={{  background: '#fff' }}>
 Card6
</Card></Col>
      <Col span={4}><Card hoverable style={{  background: '#fff' }}>
 Card7
</Card></Col>
      <Col span={4}><Card hoverable style={{  background: '#fff' }}>
 Card8
</Card></Col>
     
    </Row>
    <Row  gutter={[8,8]} style={{justifyContent: 'center'}}>
      
      <Col span={9}> <Card hoverable style={{ background: '#fff'}}>
    Card2
  </Card></Col><Col span={3}> <Card hoverable style={{ background: '#fff' }}>
Card1
</Card></Col>
    </Row>
  
</div>

<div className="site-card-wrapper" textAlign="left"  >
<Row  gutter={[8,8]} style={{justifyContent: 'left' , padding:'30px 30px 0 30px'}}>
      <Col span={5}> <Card hoverable  style={{ background: '#fff' }}  >
    Card3
  </Card></Col>
      <Col span={5}> <Card hoverable style={{ background: '#fff'  }} >
    Card4
  </Card></Col>
  <Col span={5} offset={4}> <Card hoverable  style={{ background: '#fff' }}  >
    Card3
  </Card></Col>
      <Col span={5}> <Card hoverable style={{ background: '#fff'  }}  >
    Card4
  </Card></Col>
     
     
    </Row>
  <Row  gutter={[8,8]} style={{justifyContent: 'left' , padding:'0 30px 0 30px'}}>
      <Col span={3}> <Card hoverable style={{ background: '#fff' }} >
    Card1
  </Card></Col>
      <Col span={7}> <Card hoverable  style={{ background: '#fff'}}>
    Card2
  </Card></Col><Col span={3} offset={4}> <Card hoverable style={{ background: '#fff' }}>
Card1
</Card></Col>
  <Col span={7}> <Card hoverable style={{ background: '#fff'}}>
    Card2
  </Card></Col>
    </Row>
    <Row  gutter={[8,8]} style={{justifyContent: 'left' , padding:'0 30px 0 30px'}}>
      <Col span={6}><Card hoverable style={{  background: '#fff' }}>
 Card6
</Card></Col>
      <Col span={4}><Card hoverable style={{  background: '#fff' }}>
 Card7
</Card></Col>
<Col span={6} offset={4}><Card hoverable style={{  background: '#fff' }}>
 Card6
</Card></Col>
      <Col span={4}><Card hoverable style={{  background: '#fff' }}>
 Card7
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