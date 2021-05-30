import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { Button, Form, message } from "antd";

import { PatientID } from "components/Person/Patient";
import { PersonAddress, PersonDOBAge, PersonEmails, PersonGender, PersonMobiles, PersonName } from "components/Person";
import {
	patientAddNew,
	patientBasicResetState,
	patientBasicRetrieve,
	patientBasicSetFormData,
	patientBasicUpdate,
	patientGenerateID,
	patientSetPatientIDNodeDisabled,
	patientSetPatientIDNodeType
} from "myredux";
import project from 'constants/project.json';


const PatientBasicContainer = props => {
	
	const { formData, patientType } = props;
	const { patientID } = formData;
	const formDisabled = patientID === null || patientID === undefined || patientID === '';
	const [patientForm] = Form.useForm();
	
	
	// Set the document title on component render
	useEffect(() => {
		document.title = `Patient | ${project.projectNick}`
	}, []);
	
	// Update form whenever store values of patient form data changes
	useEffect(() => {
		for (let x = 1; x < 1000000; x++) {
		}
		patientForm.setFieldsValue(formData);
	}, [formData]);        // eslint-disable-line
	
	useEffect(() => {
		switch (patientType) {
			case 'new':
				props.newPatient();
				break;
			case 'existing':
				props.existingPatient();
				break;
			
			default:
				console.error('Incorrect patient type chosen!');
		}
	}, [patientType]);          // eslint-disable-line
	
	// Retrieve patient data if it's an existing patient and the value of patientID changes
	useEffect(() => {
		if (patientID && patientID.length > 0) {
			if (patientType === 'existing') {
				props.retrievePatientData(patientID);
			}
		}
	}, [patientID]);            // eslint-disable-line
	
	
	// Function to select the gender radio button based on the title selected
	const selectGenderBasedOnTitle = value => {
		switch (value) {
			case 'Mr.':
			case 'Master':
				patientForm.setFieldsValue({ gender: 'M' });
				break;
			
			case 'Mrs.':
			case 'Ms.':
				patientForm.setFieldsValue({ gender: 'F' });
				break;
			
			default:
		}
	};
	
	
	// Function to handle form submission
	const onSubmit = values => {
		values['patientID'] = patientID;         // Because patientID is being controlled by me manually and not through the Ant Design
		
		// Set store values of form data to user entered values
		props.setFormData(values);
		
		// Act on patient data based on existing patient or new patient
		if (patientType === 'existing') {
			props.updatePatientData(values)
				.then(() => {
					message.success('Patient details updated successfully.');
					
					if (props.onSubmit) props.onSubmit();
				});
		} else if (patientType === 'new') {
			props.addNewPatient(values)
				.then(() => {
					message.success('Patient added successfully.');
					
					if (props.onSubmit) props.onSubmit();
				})
		} else {
			console.error('Incorrect patient type chosen!');
		}
	};
	
	
	return (
		<React.Fragment>
			<Form onFinish={onSubmit} form={patientForm}>
				<PatientID />
				<PersonName disabled={formDisabled} onChange={selectGenderBasedOnTitle} />
				<PersonDOBAge form={patientForm} disabled={formDisabled} />
				<PersonGender disabled={formDisabled} />
				<PersonMobiles disabled={formDisabled} />
				<PersonEmails disabled={formDisabled} />
				<PersonAddress disabled={formDisabled} />
				
				<Form.Item>
					<Button type="primary" htmlType="submit" style={{float: 'right'}}>
						{patientType === 'new' ?        // Check state and update
							'Add'
							:
							'Update'
						}
					</Button>
				</Form.Item>
			</Form>
		</React.Fragment>
	);
};


const mapStateToProps = state => {
	return {
		formData: state.patient.basic.patientFormData,
	};
};

const mapDispatchToProps = dispatch => {
	
	const newPatient = () => {
		dispatch(patientBasicResetState());
		dispatch(patientSetPatientIDNodeDisabled(true));
		dispatch(patientSetPatientIDNodeType('input'));
		dispatch(patientGenerateID());
	};
	
	const existingPatient = () => {
		dispatch(patientSetPatientIDNodeDisabled(false));
		dispatch(patientSetPatientIDNodeType('select'));
	};
	
	return {
		setFormData: formData => dispatch(patientBasicSetFormData(formData)),
		
		newPatient: () => newPatient(),
		existingPatient: () => existingPatient(),
		
		retrievePatientData: patientID => dispatch(patientBasicRetrieve(patientID)),
		updatePatientData: patientData => dispatch(patientBasicUpdate(patientData)),
		addNewPatient: newPatientData => dispatch(patientAddNew(newPatientData)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientBasicContainer);
