import React from 'react';

import { Form, Input } from "antd";

import maxlengths from "constants/maxlengths";
import validators from "constants/validators";


const PersonAddress = props => {
	return (
		<Form.Item label="Address">
			<Form.Item name="building_details" label="Building Details:">
				<Input.TextArea allowClear placeholder="Enter Building Details"
				                maxLength={maxlengths.addressBuildingDetails}
				                autoSize={{ minRows: 1, maxRows: 2 }}
				                disabled={props.disabled || false}
				/>
			</Form.Item>
			
			<Form.Item name="lane" label="Lane:">
				<Input.TextArea allowClear placeholder="Enter Lane"
				                maxLength={maxlengths.addressLane}
				                autoSize={{ minRows: 1, maxRows: 2 }}
				                disabled={props.disabled || false}
				/>
			</Form.Item>
			
			<Form.Item name="area" label="Area:">
				<Input allowClear placeholder="Enter Area"
				       maxLength={maxlengths.addressArea}
				       disabled={props.disabled || false}
				/>
			</Form.Item>
			
			<Form.Item name="city" label="City:">
				<Input allowClear placeholder="Enter City"
				       maxLength={maxlengths.addressCity}
				       disabled={props.disabled || false}
				/>
			</Form.Item>
			
			<Form.Item name="pincode" label="Pincode:"
			           rules={[{
				           pattern: validators.positiveNumberRegEx,
				           message: 'Pincode has to be numeric.',
			           }]}>
				<Input allowClear placeholder="Enter Pincode"
				       maxLength={maxlengths.addressPincode}
				       disabled={props.disabled || false}
				/>
			</Form.Item>
		</Form.Item>
	);
};

export default PersonAddress;