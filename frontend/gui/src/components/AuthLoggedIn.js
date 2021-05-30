import React, { useEffect } from 'react';

import { Button, Space, Typography } from "antd";
import { NavLink } from "react-router-dom";

import project from 'constants/project.json';


const AuthLoggedIn = () => {
	
	useEffect(() => {
		document.title = `Login | ${project.projectNick}`;
	}, []);
	
	return (
		<div style={{ textAlign: "center", color: "white" }}>
			<Space direction="vertical">
				
				<Typography.Title level={3} style={{ color: "white" }}>
					You are already Logged in
				</Typography.Title>
				
				<NavLink to="/">
					<Button type="primary" size="large" block>
						Go to Home
					</Button>
				</NavLink>
				
				Temporary: <NavLink to="/logout">Logout</NavLink>
			</Space>
		</div>
	);
};


export default AuthLoggedIn;
