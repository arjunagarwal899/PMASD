import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { Button, Form } from "antd";

import { PatientID } from "components/Person/Patient";
import { PersonAddress, PersonDOBAge, PersonEmails, PersonGender, PersonMobiles, PersonName } from "components/Person";
import { patientRetrieve, patientSetFormData, patientUpdate } from "myredux";


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
		console.log(props.setFormData(values));
		
		if (props.patientType === 'existing') {
			console.log(props.formData);
			props.updatePatientData(props.formData);
		}
	};
	
	
	return (
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
	);
};


const mapStateToProps = state => {
	return {
		patientType: state.patient.patientType,
		formData: state.patient.patientFormData,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setFormData: formData => dispatch(patientSetFormData(null, null, formData)),
		
		retrievePatientData: patientID => dispatch(patientRetrieve(patientID)),
		updatePatientData: patientData => dispatch(patientUpdate(patientData)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientContainer);
