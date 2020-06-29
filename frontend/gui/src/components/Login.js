import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col, Card, Spin } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';

import '../App.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = (props) => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  return (
    <div className="login">
      {errorMessage}
      {props.loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <Row
          justify="center"
          align="middle"
          style={{ marginTop: '20vh' }}
          gutter="16"
        >
          <Col xl={12} lg={14} md={16} sm={18} xs={20}>
            <Card title="LOGIN TO CONTINUE" hoverable>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                justify="center"
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item justify="center">
                  <Button type="primary" htmlType="submit" size="large" block>
                    LOGIN
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { loading: state.loading, error: state.error };
};

export default connect(mapStateToProps)(Login);
