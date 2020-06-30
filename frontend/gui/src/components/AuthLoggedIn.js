import React from 'react';

import {Button, Space, Typography} from "antd";
import {NavLink} from "react-router-dom";

import {authLogout} from "../redux";
import {connect} from "react-redux";


const AuthLoggedIn = (props) => {
	return (
		<div style={{textAlign: "center", color:"white"}}>
			<Space direction="vertical">

				<Typography.Title level={3} style={{color: "white"}}>
					You are already Logged in
				</Typography.Title>

				<NavLink to="/">
					<Button type="primary" size="large" block>
						Go to Home
					</Button>
				</NavLink>

				Temporary: <Button type="primary" onClick={props.logout}>Logout</Button>
			</Space>
		</div>
	);
};


//Temporary:
const mapDispathToProps = (dispatch) => {
	return {
		logout: () => dispatch(authLogout())
	}
};

export default connect(null, mapDispathToProps)(AuthLoggedIn);
// export default AuthLoggedIn;
