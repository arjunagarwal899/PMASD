import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { Button, Form, message } from "antd";

import { PatientID } from "components/Person/Patient";
import { PersonAddress, PersonDOBAge, PersonEmails, PersonGender, PersonMobiles, PersonName } from "components/Person";
import { patientAddNew, patientRetrieve, patientSetFormData, patientUpdate } from "myredux";


const PatientContainer = props => {
	
	const patientID = props.formData.patientID;
	const formDisabled = patientID === null || patientID === undefined || patientID === '';
	const [patientForm] = Form.useForm();
	
	useEffect(() => {
		document.title = 'Patient | PMASD'
	}, []);
	
	useEffect(() => {
		patientForm.setFieldsValue(props.formData);
	}, [props.formData]);        // eslint-disable-line
	
	useEffect(() => {
		if (patientID !== null && patientID.length > 0) {
			if (props.patientType === 'existing') {
				props.retrievePatientData(patientID);
			}
		}
	}, [patientID]);            // eslint-disable-line
	
	
	const selectGenderBasedOnTitle = value => {
		switch (value) {
			case 'Mr':
			case 'Mas':
				patientForm.setFieldsValue({ gender: 'M' });
				break;
			
			case 'Mrs':
			case 'Ms':
				patientForm.setFieldsValue({ gender: 'F' });
				break;
			
			default:
		}
	};
	
	
	const onSubmit = values => {
		values['patientID'] = props.formData.patientID;         // Because patientID is being controlled by me manually and not through the Ant Design
		
		props.setFormData(values);
		
		if (props.patientType === 'existing') {
			props.updatePatientData(values)
				.then(() => {
					message.success('Patient details updated successfully.');
				});
		} else if (props.patientType === 'new') {
			props.addNewPatient(values)
				.then(() => {
					message.success('Patient added successfully.');
				})
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
					<Button type="primary" htmlType="submit">
						{props.patientType === 'new' ?        // Check state and update
							'Add New'
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
		patientType: state.patient.patientType,
		formData: state.patient.patientFormData,
		
		transactionError: state.patient.transactionError,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setFormData: formData => dispatch(patientSetFormData(null, null, formData)),
		
		retrievePatientData: patientID => dispatch(patientRetrieve(patientID)),
		updatePatientData: patientData => dispatch(patientUpdate(patientData)),
		addNewPatient: newPatientData => dispatch(patientAddNew(newPatientData)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientContainer);
