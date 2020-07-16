import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { Radio } from "antd";

import PatientContainer from "./PatientContainer";
import {
	patientGenerateID,
	patientResetState,
	patientSetPatientIDNodeDisabled,
	patientSetPatientIDNodeType,
	patientSetPatientType
} from "myredux";


const defaultPatientType = 'existing';


const ConsultationContainer = props => {
	
	useEffect(() => {
		changed();
	}, []);         // eslint-disable-line
	
	
	const changed = (event = null) => {
		const switchValue = (event === null) ? defaultPatientType : (event.target.value || defaultPatientType);
		
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
			<Radio.Group onChange={changed} defaultValue={defaultPatientType}>
				<Radio value="new">New Patient</Radio>
				<Radio value="existing">Existing Patient</Radio>
			</Radio.Group>
			<PatientContainer />
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
		
		resetFormData: () => dispatch(patientResetState()),
	}
};

export default connect(null, mapDispatchToProps)(ConsultationContainer);
