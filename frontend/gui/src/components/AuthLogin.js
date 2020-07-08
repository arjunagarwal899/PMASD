import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";

import {Alert, Avatar, Button, Form, Input, notification, Space} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

import {authLogin, changePasswordReset} from '../redux';
import rajAvatarImage from '../static/img/dr-raj.jpg';
import defaultAvatarImage from '../static/img/default-user.jpg';


const AuthLogin = (props) => {

	const [username, setUsername] = useState(props.defaultUsername || "admin");
	let avatarImage = username === 'Raj' ? rajAvatarImage : defaultAvatarImage;

	const onSubmit = (values) => {
		props.login(values.username, values.password);
	};


	useEffect(() => {
		document.title = 'Login | PMASD';

		if (props.passwordChanged) {
			notification['success']({
				message: 'Change Password',
				description: 'Your password has been successfully changed',
			});

			props.resetPasswordChange();
		}
	}, []);             // eslint-disable-line


	return (
		<React.Fragment>
			<Avatar size={85} src={avatarImage} className="avatar-img"/>

			<Form name="login" onFinish={onSubmit} justify="center" initialValues={{'username': username}}>


				<Form.Item name="username" rules={[{required: true, message: 'Please input your username!'},]}>
					<Input size="large" prefix={<UserOutlined className="site-form-item-icon"/>}
					       placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
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

			<NavLink to="/changepassword/" style={{color: 'darkgrey'}}>Change Password</NavLink>

		</React.Fragment>
	);
};


const mapStateToProps = (state) => {
	return {
		error: state.auth.error,
		passwordChanged: state.changePassword.success
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (username, password) => dispatch(authLogin(username, password)),
		resetPasswordChange: () => dispatch(changePasswordReset()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogin);
