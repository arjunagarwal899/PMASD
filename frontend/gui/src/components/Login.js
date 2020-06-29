import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col, Card, Spin } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';

import { authSuccess, authLogin } from '../redux/auth/authActions';
import './Login.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = (props) => {
  const onSuccess = (values) => {
    console.log('Success:', values);
    props.authLogin(values.username, values.password);
  };

  const onFailure = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  return (
    <div className="login">
      <div className="bg-image"></div>
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
          <Col xl={8} lg={10} md={12} sm={14} xs={20}>
            <Card title="LOGIN TO CONTINUE">
              <Form
                name="basic"
                initialValues={{ username: props.username }}
                onFinish={onSuccess}
                onFinishFailed={onFailure}
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
  console.log(state);
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    username: state.auth.username,
  };
};

export default connect(mapStateToProps, {
  authSuccess,
  authLogin,
})(Login);
