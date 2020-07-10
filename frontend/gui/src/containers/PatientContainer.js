import React, { useEffect } from 'react';

import { Button, Form } from "antd";

import { PatientID } from "../components/Person/Patient";
import {
	PersonName,
	PersonDOBAge,
	PersonGender,
	PersonMobiles,
	PersonEmails,
	PersonAddress
} from "../components/Person";
import { connect } from "react-redux";


const PatientContainer = props => {
	
	const { newPatient } = props || false;
	const formDisabled = !newPatient || props.patientID;
	const [patientForm] = Form.useForm();
	
	useEffect(() => {
		document.title = 'Patient | PMASD'
	}, []);
	
	
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
		console.log(values);
		if (newPatient) {
		
		} else {
		
		}
	};
	
	
	return (
		<Form onFinish={onSubmit} form={patientForm}>
			{/* TODO: <PatientSearch/>*/}
			<PatientID newPatient={newPatient} />
			<PersonName onChange={selectGenderBasedOnTitle} disabled={formDisabled} />
			<PersonDOBAge form={patientForm} disabled={formDisabled} />
			<PersonGender disabled={formDisabled} />
			<PersonMobiles disabled={formDisabled} />
			<PersonEmails disabled={formDisabled} />
			<PersonAddress disabled={formDisabled} />
			
			<Form.Item>
				<Button type="primary" htmlType="submit">
					{newPatient ?
						'Add'
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
		loading: state.patient.loading,
		error: state.patient.loading,
		patientID: state.patient.patientID,
	};
};

export default connect(mapStateToProps)(PatientContainer);
