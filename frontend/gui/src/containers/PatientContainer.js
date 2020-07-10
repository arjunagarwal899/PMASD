import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { Button, Form } from "antd";

import { PatientID } from "components/Person/Patient";
import { PersonAddress, PersonDOBAge, PersonEmails, PersonGender, PersonMobiles, PersonName } from "components/Person";


const PatientContainer = (props) => {
	
	const formDisabled = !props.newPatient || props.patientID;
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
		if (props.newPatient) {
		
		} else {
		
		}
	};
	
	
	return (
		<Form onFinish={onSubmit} form={patientForm}>
			<PatientID />
			<PersonName onChange={selectGenderBasedOnTitle} disabled={formDisabled} />
			<PersonDOBAge form={patientForm} disabled={formDisabled} />
			<PersonGender disabled={formDisabled} />
			<PersonMobiles disabled={formDisabled} />
			<PersonEmails disabled={formDisabled} />
			<PersonAddress disabled={formDisabled} />
			
			<Form.Item>
				<Button type="primary" htmlType="submit">
					{props ?
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
		newPatient: state.patient.newPatient,
	};
};

export default connect(mapStateToProps)(PatientContainer);
