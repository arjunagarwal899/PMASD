import React from 'react';
import {connect} from 'react-redux';

import {Avatar, Button, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

import {authLogin} from '../redux';


const AuthLogin = (props) => {

	const defaultUsername = "admin";


	const onSubmit = (values) => {
		props.login(values.username, values.password);
	};


	return (
		<React.Fragment>
			<Avatar size={60}
			        src="https://www.elliottsfancydress.co.uk/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/c/a/camel-800.jpg"
			        className="avatar-img"/>

			<Form name="basic" initialValues={{username: defaultUsername}} onFinish={onSubmit} justify="center">


				<Form.Item name="username" rules={[{required: true, message: 'Please input your username!'},]}>
					<Input size="large" prefix={<UserOutlined className="site-form-item-icon"/>}
					       placeholder="Username"/>
				</Form.Item>

				<Form.Item name="password" rules={[{required: true, message: 'Please input your password!'},]}>
					<Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon"/>}
					                placeholder="Password" autoFocus={true}/>
				</Form.Item>


				<span style={{color: "white"}}>
					{props.error}
				</span>


				<Form.Item justify="center">
					<Button type="primary" htmlType="submit" size="large" block>
						LOGIN
					</Button>
				</Form.Item>

			</Form>

		</React.Fragment>
	);
};


const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		token: state.auth.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (username, password) => dispatch(authLogin(username, password))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogin);
