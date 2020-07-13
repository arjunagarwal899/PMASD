import React, { useState } from 'react';
import { connect } from "react-redux";

import { Radio } from "antd";

import PatientContainer from "./PatientContainer";
import { patientSetPatientIDNodeDisabled, patientSetPatientIDNodeType } from "myredux";


const ConsultationContainer = props => {
	
	const [patientIDState, setPatientIDState] = useState(null);         // SHift to Redux later
	
	const changed = event => {
		switch (event.target.value) {
			case "new":
				props.new();
				break;
			case "existing":
				props.existing();
				break;
			
			default:
		}
	};
	
	return (
		<div>
			<Radio.Group onChange={changed}>
				<Radio value="new">New Patient</Radio>
				<Radio value="existing">Existing Patient</Radio>
			</Radio.Group>
			<PatientContainer patientIDState={[patientIDState, setPatientIDState]} />
		</div>
	);
};


const mapDispatchToProps = dispatch => {
	
	const newPatient = () => {
		dispatch(patientSetPatientIDNodeDisabled(true));
		dispatch(patientSetPatientIDNodeType('input'));
	};
	
	const existingPatient = () => {
		dispatch(patientSetPatientIDNodeDisabled(false));
		dispatch(patientSetPatientIDNodeType('select'));
	};
	
	return {
		new: () => newPatient(),
		existing: () => existingPatient(),
	}
};

export default connect(null, mapDispatchToProps)(ConsultationContainer);
