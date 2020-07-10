import React from 'react';
import { connect } from "react-redux";

import { Radio } from "antd";

import PatientContainer from "./PatientContainer";
import { patientExistingPatient, patientNewPatient } from "myredux";


const ConsultationContainer = props => {
	
	const changed = event => {
		switch(event.target.value){
			case "New":
				props.new(); break;
			case "Existing":
				props.existing(); break;
				
			default:
		}
	};
	
	return (
		<div>
			<Radio.Group onChange={changed}>
				<Radio value="New">New Patient</Radio>
				<Radio value="Existing">Existing Patient</Radio>
			</Radio.Group>
			<PatientContainer />
		</div>
	);
};


const mapDispatchToProps = dispatch => {
	return {
		new: () => dispatch(patientNewPatient()),
		existing: () => dispatch(patientExistingPatient()),
	}
};

export default connect(null, mapDispatchToProps)(ConsultationContainer);
