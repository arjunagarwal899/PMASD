import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";

import {Avatar, Button, Form, Input, Space, Alert} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

import {authLogin} from '../redux';
import avatar_image from '../static/img/dr-raj.jpg';


const AuthLogin = (props) => {

	const defaultUsername = "admin";

	const onSubmit = (values) => {
		props.login(values.username, values.password);
	};


	useEffect(() => {
		document.title = 'Login | PMASD';
	});


	return (
		<React.Fragment>
			<Avatar size={85} src={avatar_image} className="avatar-img"/>

			<Form name="login" initialValues={{username: defaultUsername}} onFinish={onSubmit} justify="center">


				<Form.Item name="username" rules={[{required: true, message: 'Please input your username!'},]}>
					<Input size="large" prefix={<UserOutlined className="site-form-item-icon"/>}
					       placeholder="Username"/>
				</Form.Item>

				<Form.Item name="password" rules={[{required: true, message: 'Please input your password!'},]}>
					<Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon"/>}
					                placeholder="Password" autoFocus={true}/>
				</Form.Item>

				<Space direction="vertical" style={{width: "100%"}}>
					{props.error ?
						<Form.Item>
							<Alert message={props.error} type="error" showIcon/>
						</Form.Item>
						:
						null
					}

					<Form.Item justify="center">
						<Button type="primary" htmlType="submit" size="large" block>
							LOGIN
						</Button>
					</Form.Item>
				</Space>
			</Form>

			<NavLink to="/changepassword/">Change Password</NavLink>

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
		login: (username, password) => dispatch(authLogin(username, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogin);
