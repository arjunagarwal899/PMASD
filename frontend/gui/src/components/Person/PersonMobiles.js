import React from 'react';
import { connect } from "react-redux";

import { Form, Select } from "antd";


const PersonMobiles = props => {
	return (
		<Form.Item name="mobiles" label="Mobile numbers:"
		           rules={[
			           {
				           type: 'array',
				           message: 'Please enter valid mobile numbers!'
			           },
			           () => ({
				           validator (rule, value) {
					           if (value) {
						           for (let mobile of value) {
							           if (!props.mobileRegEx.test(mobile)) {
								           return Promise.reject('Please enter valid mobile numbers!');
							           } else if (mobile.length && mobile.charAt(0) === '+') {
								           return Promise.reject('No need to add the country code!')
							           }
						           }
					           }
					
					           return Promise.resolve();
				           }
			           }),
		           ]}
		>
			<Select mode="tags" notFoundContent={null} tokenSeparators={props.tokenSeparators}
			        placeholder="Enter Mobile Numbers"
			>
				{null}
			</Select>
		</Form.Item>
	);
};


const mapStateToProps = state => {
	return {
		mobileRegEx: state.validators.mobileRegEx,
		tokenSeparators: state.tokenSeparators.selectTokenSeparators,
		maxlengths: state.maxlengths,
	}
};

export default connect(mapStateToProps)(PersonMobiles);
