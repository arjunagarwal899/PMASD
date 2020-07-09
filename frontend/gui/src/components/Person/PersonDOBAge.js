import React from 'react';
import moment from "moment";

import { DatePicker, Form, Input, InputNumber } from "antd";


const disableDOBDates = current => {
	return current && current > moment().startOf('day');
};


const PersonDOBAge = () => {
	return (
		<Input.Group compact>
			<Form.Item name="dob" label="Date of Birth:">
				{/*TODO Add integration with Age*/}
				<DatePicker format="DD-MMM-YYYY" disabledDate={disableDOBDates} allowClear />
			</Form.Item>
			
			<Form.Item label="Age:">
				<InputNumber placeholder="Select Age" maxLength={2} />
			</Form.Item>
		</Input.Group>
	);
};

export default PersonDOBAge;
