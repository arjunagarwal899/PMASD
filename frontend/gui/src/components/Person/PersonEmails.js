import React from 'react';
import { connect } from "react-redux";

import { Form, Select } from "antd";


const PersonEmails = props => {
	return (
		<Form.Item name="emails" label="Emails Addresses:"
		           rules={[
			           {
				           type: 'array',
				           message: 'Please enter valid email addresses!'
			           },
			           () => ({
				           validator (rule, value) {
					           if (value) {
						           for (let email of value) {
							           if (!props.emailRegEx.test(email)) {
								           return Promise.reject(' Please enter valid email addresses!');
							           } else if (email.length > props.maxlengths.personEmail) {
								           return Promise.reject('Email Addresses cannot be greater than 100 characters!');
							           }
						           }
					           }
					
					           return Promise.resolve();
				           }
			           }),
		           ]}
		>
			<Select mode="tags" notFoundContent={null} tokenSeparators={props.tokenSeparators}
			        placeholder="Enter Email Addresses"
			>
				{null}
			</Select>
		</Form.Item>
	);
};


const mapStateToProps = state => {
	return {
		emailRegEx: state.validators.emailRegEx,
		tokenSeparators: state.tokenSeparators.selectTokenSeparators,
		maxlengths: state.maxlengths,
	}
};

export default connect(mapStateToProps)(PersonEmails);
