import React from 'react';

import { Form, Select } from "antd";
import tokenSeparators from "constants/tokenSeparators";
import validators from "constants/validators";


const PersonMobiles = props => {
	return (
		<Form.Item name="mobiles" label="Mobile numbers:"
		           rules={[
			           {
				           type: 'array',
				           message: 'Please enter valid mobile numbers!'
			           },
			           () => ({
				           validator (rule, value) {
					           if (value) {
						           for (let mobile of value) {
							           if (!validators.mobileRegEx.test(mobile)) {
								           return Promise.reject('Please enter valid mobile numbers!');
							           } else if (mobile.length && mobile.charAt(0) === '+') {
								           return Promise.reject('No need to add the country code!')
							           }
						           }
					           }
					
					           return Promise.resolve();
				           }
			           }),
		           ]}
		>
			<Select mode="tags" notFoundContent={null} tokenSeparators={tokenSeparators.selectTokenSeparators}
			        placeholder="Enter Mobile Numbers" disabled={props.disabled || false}
			>
				{null}
			</Select>
		</Form.Item>
	);
};


export default PersonMobiles;
