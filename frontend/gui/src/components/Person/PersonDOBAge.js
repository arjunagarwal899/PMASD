import React from 'react';
import { connect } from "react-redux";
import moment from "moment";

import { DatePicker, Form, Input, InputNumber } from "antd";


const disableDOBDates = current => {
	return current && current > moment().startOf('day');
};


const PersonDOBAge = props => {
	
	const dobChange = value => {
		if (value) {
			props.form.setFieldsValue({ age: moment().diff(value, 'years') });
		} else {
			props.form.setFieldsValue({ age: '' });
		}
	};
	
	const ageChange = value => {
		if (value) {
			props.form.setFieldsValue({ dob: moment([moment().year() - value]) });
		} else {
			props.form.setFieldsValue({ dob: '' });
		}
	};
	
	
	return (
		<Input.Group compact>
			<Form.Item name="dob" label="Date of Birth:">
				<DatePicker format={props.dateFormats} disabledDate={disableDOBDates} onChange={dobChange} allowClear
				            showToday={false} disabled={props.disabled || false} />
			</Form.Item>
			
			<Form.Item name="age" label="Age:">
				<InputNumber placeholder="Select Age" maxLength={3} max={120} onChange={ageChange}
				             disabled={props.disabled || false} />
			</Form.Item>
		</Input.Group>
	);
};


const mapStateToProps = state => {
	return {
		dateFormats: state.misc.dateFormats,
	}
};

export default connect(mapStateToProps)(PersonDOBAge);
