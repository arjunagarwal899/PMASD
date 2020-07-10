import React from 'react';
import { connect } from "react-redux";

import { Form, Input } from "antd";


const PersonAddress = props => {
	return (
		<Form.Item label="Address">
			<Form.Item name="building_details" label="Building Details:">
				<Input.TextArea allowClear placeholder="Enter Building Details"
				                maxLength={props.maxlengths.addressBuildingDetails}
				                autoSize={{ minRows: 1, maxRows: 2 }}
				                disabled={props.disabled || false}
				/>
			</Form.Item>
			
			<Form.Item name="lane" label="Lane:">
				<Input.TextArea allowClear placeholder="Enter Lane"
				                maxLength={props.maxlengths.addressLane}
				                autoSize={{ minRows: 1, maxRows: 2 }}
				                disabled={props.disabled || false}
				/>
			</Form.Item>
			
			<Form.Item name="area" label="Area:">
				<Input allowClear placeholder="Enter Area"
				       maxLength={props.maxlengths.addressArea}
				       disabled={props.disabled || false}
				/>
			</Form.Item>
			
			<Form.Item name="city" label="City:">
				<Input allowClear placeholder="Enter City"
				       maxLength={props.maxlengths.addressCity}
				       disabled={props.disabled || false}
				/>
			</Form.Item>
			
			<Form.Item name="pincode" label="Pincode:">
				<Input allowClear placeholder="Enter Pincode"
				       maxLength={props.maxlengths.addressPincode}
				       disabled={props.disabled || false}
				/>
			</Form.Item>
		</Form.Item>
	);
};


const mapStateToProps = state => {
	return {
		maxlengths: state.maxlengths,
	}
};

export default connect(mapStateToProps)(PersonAddress);