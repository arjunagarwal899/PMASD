import React from 'react';
import {connect} from "react-redux";

import {Card, Col, Row, Spin} from "antd";

import AuthLogin from "../components/AuthLogin";
import AuthLoggedIn from "../components/AuthLoggedIn";
import './AuthContainer.css'


const AuthContainer = (props) => {
	return (
		<div className="login-container">
			<Row
				justify="center"
				align="middle"
				style={{marginTop: '20vh'}}
				gutter="16">
				<Col xl={8} lg={10} md={12} sm={14} xs={20}>


					<Spin spinning={props.loading}>
						<Card style={{textAlign: "center"}}>

							{!props.isAuthenticated ?
								<AuthLogin/>        // If user has to be authenticated
								:
								<AuthLoggedIn/>       // If user is already authenticated
							}

						</Card>
					</Spin>


				</Col>
			</Row>
		</div>
	);
};


const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.auth.loading,
		isAuthenticated: state.auth.isAuthenticated,
	};
};


export default connect(mapStateToProps)(AuthContainer);
