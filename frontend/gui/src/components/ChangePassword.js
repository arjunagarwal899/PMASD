import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, Col, Row, Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';

import { changePassword } from '../redux';

const ChangePassword = (props) => {
  const onSubmit = (values) => {
    props.changePass(
      values.old_password,
      values.new_password1,
      values.new_password2
    );
  };

  return (
    <div className="login-container">
      <Row justify="center" align="middle">
        <Col span={24}>
          <Card style={{ textAlign: 'center' }}>
            <Form name="basic" onFinish={onSubmit} justify="center">
              <Form.Item
                name="old_password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Enter Old Password"
                  autoFocus={true}
                />
              </Form.Item>

              <Form.Item
                name="new_password1"
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password!',
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Enter New Password"
                />
              </Form.Item>

              <Form.Item
                name="new_password2"
                dependencies={['new_password1']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your new password again!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('new_password1') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        'The two passwords that you entered do not match!'
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Confirm New Password"
                />
              </Form.Item>

              {props.error ? (
                <Form.Item>
                  <span style={{ color: 'white' }}>{props.error}</span>
                </Form.Item>
              ) : null}

              <Form.Item justify="center">
                <Button type="primary" htmlType="submit" size="large" block>
                  CHANGE PASSWORD
                </Button>
              </Form.Item>

              <Link to="/login">Go Back To Login</Link>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.changePass.loading,
    error: state.changePass.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePass: (old_password, new_password1, new_password2) =>
      dispatch(changePassword(old_password, new_password1, new_password2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
