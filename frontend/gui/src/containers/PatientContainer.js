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


// TODO Add automatic selection of gender based on title

const PatientContainer = (props) => {
	
	const {newPatient} = props || false;
	const [patientForm] = Form.useForm();
	
	useEffect(() => {
		document.title = 'Patient | PMASD'
	}, []);
	
	
	const onSubmit = values => {
		console.log(values);
	};
	
	
	return (
		<Form onFinish={onSubmit} form={patientForm}>
			<PatientID newPatient={newPatient} />
			<PersonName />
			<PersonDOBAge />
			<PersonGender />
			<PersonMobiles />
			<PersonEmails />
			<PersonAddress />
			
			<Form.Item><Button type="primary" htmlType="submit">Submit</Button></Form.Item>
		</Form>
	);
};

export default PatientContainer;
