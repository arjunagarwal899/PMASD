import React from 'react';
import {connect} from 'react-redux';

import {Card, Col, Row, Spin} from 'antd';

import AuthLogin from '../components/AuthLogin';
import AuthLoggedIn from '../components/AuthLoggedIn';

import './AuthContainer.css';
import ChangePassword from "../components/ChangePassword";


const AuthContainer = (props) => {
	return (
		<React.Fragment>
			<div className="bg-image" ></div>
			<div className="login-container">
				<Row justify="center" align="middle">
					<Col span={24}>


						<Spin spinning={props.loading}>
							<Card style={{textAlign: "center"}}>

								{props.changePass || false ?

									<ChangePassword defaultUsername="Raj"/>

									:

									(!props.isAuthenticated ?
											<AuthLogin defaultUsername="Raj"/>        // If user has to be authenticated
											:
											<AuthLoggedIn/>       // If user is already authenticated
									)
								}

							</Card>
						</Spin>


					</Col>
				</Row>
			</div>
		</React.Fragment>
	);
};


const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.auth.loading || state.changePassword.loading,
		isAuthenticated: state.auth.isAuthenticated,
	};
};


export default connect(mapStateToProps)(AuthContainer);
