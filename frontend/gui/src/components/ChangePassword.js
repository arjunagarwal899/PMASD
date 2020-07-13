import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {Button, Form, Input, Alert} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

import {authLogout, changePassword} from '../myredux';


const ChangePassword = (props) => {

	const defaultUsername = props.defaultUsername || "admin";

	const onSubmit = (values) => {
		props.changePassword(
			values.username,
			values.old_password,
			values.new_password1,
			values.new_password2,
		);
	};


	useEffect(() => {
		props.logout();
	}, []);             // eslint-disable-line


	return (
		<Form name="change_password" initialValues={{username: defaultUsername}} onFinish={onSubmit} justify="center">

			<Form.Item name="username" rules={[{required: true, message: 'Please input your username!'},]}>
				<Input size="large" prefix={<UserOutlined className="site-form-item-icon"/>}
				       placeholder="Username"/>
			</Form.Item>

			<Form.Item name="old_password" rules={[{required: true, message: 'Please input your password!'},]}>
				<Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon"/>}
				                placeholder="Enter Old Password" autoFocus={true}/>
			</Form.Item>

			<Form.Item name="new_password1" dependencies={['old_password']} hasFeedback
			           rules={[
				           {
					           required: true,
					           message: 'Please input your new password!',
				           },
				           ({getFieldValue}) => ({
			           	        validator(rule, value) {
			           	        	if (value && value.length < 6)
			           	        		return Promise.reject('Password should be atleast 6 characters!');
				                    else if (value && !isNaN(value))
				                    	return Promise.reject('Password cannot be completely numeric!');
				                    else if (value && getFieldValue('old_password') === value) {
				                    	return Promise.reject('New password cannot be the same as old password!');
				                    }

				                    return Promise.resolve();
			                    }
				           }),
			           ]}>
				<Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon"/>}
				                placeholder="Enter New Password"/>
			</Form.Item>

			<Form.Item name="new_password2" dependencies={['new_password1']} hasFeedback
			           rules={[
				           {
					           required: true,
					           message: 'Please confirm your new password again!',
				           },
				           ({getFieldValue}) => ({
					           validator(rule, value) {
						           if (!value || getFieldValue('new_password1') === value) {
							           return Promise.resolve();
						           }
						           return Promise.reject(
							           'The two passwords that you entered do not match!'
						           );
					           },
				           }),
			           ]}>
				<Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon"/>}
				                placeholder="Confirm New Password"/>
			</Form.Item>

			{props.error ? (
				<Form.Item>
					<Alert type="error" message={props.error}/>
				</Form.Item>
			) : null}

			<Form.Item justify="center">
				<Button type="primary" htmlType="submit" size="large" block>
					CHANGE PASSWORD
				</Button>
			</Form.Item>

			<NavLink to="/login" style={{color: 'darkgrey'}}>Go Back To Login</NavLink>
		</Form>
	);
};


const mapStateToProps = (state) => {
	return {
		error: state.changePassword.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePassword: (username, old_password, new_password1, new_password2) =>
			dispatch(changePassword(username, old_password, new_password1, new_password2)),

		logout: () => dispatch(authLogout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
