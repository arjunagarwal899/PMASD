import React from 'react';
import { Card, Col, Row } from 'antd';

const Home = () => {
  return (
    <div className="site-card-wrapper">
      <h2>Enteries</h2>
      <Row gutter={16} justify="center">
        <Col span={5}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
