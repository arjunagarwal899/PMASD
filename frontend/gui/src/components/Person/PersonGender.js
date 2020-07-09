import React from 'react';

import { Form, Radio } from "antd";

// TODO Add selection of gender by using keyboard

const PersonGender = () => {
	return (
		<Form.Item name="gender" label="Gender:"
		           rules={[{
			           required: true,
			           message: 'Patient Gender needs to be selected!'
		           }]}
		>
			<Radio.Group optionType="button">
				<Radio.Button value="M">Male</Radio.Button>
				<Radio.Button value="F">Female</Radio.Button>
			</Radio.Group>
		</Form.Item>
	);
};


export default PersonGender;
