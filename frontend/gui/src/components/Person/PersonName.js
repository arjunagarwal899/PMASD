import React from 'react';

import { Form, Input, Select } from "antd";

import maxlengths from "constants/maxlengths.json";


const PersonName = props => {
	
	const titleChange = value => {
		if (props.onChange) {
			props.onChange(value);
		}
	};
	
	
	return (
		<Form.Item name="name" label="Patient Name:"
		           rules={[{
			           required: true,
			           message: 'Patient Name is required!'
		           }]}
		>
			<Input allowClear placeholder="Enter patient name"
			       disabled={props.disabled || false}
			       addonBefore={
				       <Form.Item name="title" noStyle
				                  rules={[{
					                  required: true,
					                  message: 'Patient Title is required!'
				                  }]}
				       >
					       <Select placeholder="Select title"
					               style={{ minWidth: 100 }}
					               optionFilterProp="children"
					               onChange={titleChange}
					               disabled={props.disabled || false}
					               autoFocus={!props.disabled}
					       >
						       <Select.Option value="Mr.">Mr.</Select.Option>
						       <Select.Option value="Mrs.">Mrs.</Select.Option>
						       <Select.Option value="Master">Master</Select.Option>
						       <Select.Option value="Ms.">Miss</Select.Option>
						       <Select.Option value="Dr.">Dr.</Select.Option>
					       </Select>
				       </Form.Item>
			       }
			       maxLength={maxlengths.person.name}
			/>
		</Form.Item>
	);
};


export default PersonName;
