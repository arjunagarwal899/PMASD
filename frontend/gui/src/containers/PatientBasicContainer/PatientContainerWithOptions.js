import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { Radio } from "antd";

import DisplayPatientContainer from "containers/PatientBasicContainer/ExistingPatientContainer";
import {
	patientBasicResetState,
	patientGenerateID,
	patientSetPatientIDNodeDisabled,
	patientSetPatientIDNodeType,
	patientSetPatientType
} from "myredux";


const defaultPatientType = 'existing';


const PatientContainerWithOptions = props => {
	
	// Set form state to the preffered patient type when component renders for the first time
	useEffect(() => {
		changePatientType();
	}, []);         // eslint-disable-line
	
	
	// Initialize form based on type of patient (new or existing)
	const changePatientType = (event = null) => {
		const switchValue = (event === null) ? defaultPatientType : (event.target.value || defaultPatientType);     // Can add functionality to determine the patient type through props if necessary
		
		switch (switchValue) {
			case "new":
				props.newPatient();
				break;
			case "existing":
				props.resetFormData();
				props.existingPatient();
				break;
			
			default:
		}
	};
	
	return (
		<div>
			<Radio.Group onChange={changePatientType} defaultValue={defaultPatientType}>
				<Radio value="new">New Patient</Radio>
				<Radio value="existing">Existing Patient</Radio>
			</Radio.Group>
			<DisplayPatientContainer />
		</div>
	);
};


const mapDispatchToProps = dispatch => {
	
	const newPatient = () => {
		dispatch(patientSetPatientType('new'));
		dispatch(patientSetPatientIDNodeDisabled(true));
		dispatch(patientSetPatientIDNodeType('input'));
		dispatch(patientGenerateID());
	};
	
	const existingPatient = () => {
		dispatch(patientSetPatientType('existing'));
		dispatch(patientSetPatientIDNodeDisabled(false));
		dispatch(patientSetPatientIDNodeType('select'));
	};
	
	return {
		newPatient: () => newPatient(),
		existingPatient: () => existingPatient(),
		
		resetFormData: () => dispatch(patientBasicResetState()),
	}
};

export default connect(null, mapDispatchToProps)(PatientContainerWithOptions);
