import React from 'react';
import { connect } from "react-redux";

import { Form, Input, Select } from "antd";


const PersonName = (props) => {
	return (
		<Form.Item name="name" label="Patient Name:"
		           rules={[{
			           required: true,
			           message: 'Patient Name is required!'
		           }]}
		>
			<Input allowClear placeholder="Enter patient name"
			       addonBefore={
				       <Form.Item name="title" noStyle
				                  rules={[{
					                  required: true,
					                  message: 'Patient Title is required!'
				                  }]}
				       >
					       <Select showSearch placeholder="Select title"
					               style={{minWidth: 100}}
					               optionFilterProp="children"
					       >
						       <Select.Option value="Mr">Mr.</Select.Option>
						       <Select.Option value="Mrs">Mrs.</Select.Option>
						       <Select.Option value="Mas">Master</Select.Option>
						       <Select.Option value="Ms">Miss</Select.Option>
						       <Select.Option value="Dr">Dr.</Select.Option>
					       </Select>
				       </Form.Item>
			       }
			       maxLength={props.maxlengths.personName}
			/>
		</Form.Item>
	);
};


const mapStateToProps = state => {
	return {
		maxlengths: state.maxlengths,
	}
};

export default connect(mapStateToProps)(PersonName);
