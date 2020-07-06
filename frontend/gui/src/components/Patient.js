import React from 'react';

import {DatePicker, Form, Input, Radio, Select} from "antd";


const Patient = () => {

	return (
		<Form>
			<Form.Item label="Patient ID:">
				<Input allowClear placeholder="Enter patient ID"/>
			</Form.Item>

			<Input.Group compact>
				<Form.Item label="Title:">
					<Select>
						<Select.Option value="Mr">Mr.</Select.Option>
						<Select.Option value="Mas">Master</Select.Option>
						<Select.Option value="Mrs">Mrs.</Select.Option>
						<Select.Option value="Ms">Ms.</Select.Option>
						<Select.Option value="Dr">Dr.</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item label="Patient Name:">
					<Input allowClear placeholder="Enter patient name"/>
				</Form.Item>
			</Input.Group>

			<Input.Group compact>
				<Form.Item label="Date of Birth:">
					<DatePicker/>
				</Form.Item>

				<Form.Item label="Age:">
					<Input placeholder="Age"/>
				</Form.Item>
			</Input.Group>

			<Form.Item label="Gender:">
				<Radio.Group>
					<Radio value="male">Male</Radio>
					<Radio value="female">Female</Radio>
					<Radio value="unknown">Unknown</Radio>
				</Radio.Group>
			</Form.Item>
		</Form>
	);
};

export default Patient;
