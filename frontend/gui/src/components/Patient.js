import React from 'react';

import {DatePicker, Form, Input, Select} from "antd";

const Patient = () => {
	return (
		<Form>
			<Form.Item label="Patient ID:">
				<Input placeholder="Enter patient ID" />
			</Form.Item>

			<Form.Item label="Title:">
				<Input placeholder="Enter title" />
			</Form.Item>

			<Form.Item label="Patient Name:">
				<Input placeholder="Enter patient name" />
			</Form.Item>

			<Form.Item label="Date of Birth:">
				<DatePicker/>
			</Form.Item>

			<Form.Item label="Age:">
				<Input placeholder="Age" />
			</Form.Item>

			<Form.Item label="Gender:">
				<Select defaultValue="Unknown">
					<Select.Option value="male">Male</Select.Option>
					<Select.Option value="female">Female</Select.Option>
					<Select.Option value="unknown">Unknown</Select.Option>
				</Select>
			</Form.Item>
		</Form>
	);
};

export default Patient;
