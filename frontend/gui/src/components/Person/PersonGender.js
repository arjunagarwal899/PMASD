import React from 'react';

import { Form, Radio } from "antd";


const PersonGender = props => {
	return (
		<Form.Item name="gender" label="Gender:"
		           rules={[{
			           required: true,
			           message: 'Patient Gender needs to be selected!'
		           }]}
		>
			<Radio.Group optionType="button" buttonStyle="solid" disabled={props.disabled || false}>
				<Radio.Button value="M">Male</Radio.Button>
				<Radio.Button value="F">Female</Radio.Button>
			</Radio.Group>
		</Form.Item>
	);
};


export default PersonGender;
