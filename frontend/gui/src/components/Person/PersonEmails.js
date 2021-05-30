import React from 'react';

import { Form, Select } from "antd";

import maxlengths from "constants/maxlengths";
import tokenSeparators from "constants/tokenSeparators";
import validators from "constants/validators";


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
							           if (!validators.emailRegEx.test(email)) {
								           return Promise.reject(' Please enter valid email addresses!');
							           } else if (email.length > maxlengths.person.email) {
								           return Promise.reject('Email Addresses cannot be greater than 100 characters!');
							           }
						           }
					           }
					
					           return Promise.resolve();
				           }
			           }),
		           ]}
		>
			<Select mode="tags" notFoundContent={null} tokenSeparators={tokenSeparators.selectTokenSeparators}
			        placeholder="Enter Email Addresses" disabled={props.disabled || false}
			>
				{null}
			</Select>
		</Form.Item>
	);
};


export default PersonEmails;
