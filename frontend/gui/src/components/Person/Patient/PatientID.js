import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

import { Button, Form, Input } from "antd";


const PatientID = (props) => {
	
	const {newPatient} = props || false;
	const [patientID, setPatientID] = useState(null);
	
	
	const generateNewPatientID = () => {
		setPatientID(Math.floor(Math.random() * (1000000 - 100000)) + 100000);
	};
	
	
	useEffect(() => {
		// TODO add checking of unique patient id
	}, [patientID]);            // eslint-disable-line
	
	
	useEffect(() => {
		if (newPatient) {
			generateNewPatientID();
		}
	}, [newPatient]);
	
	
	return (
		<Form.Item>
			<Form.Item label="Patient ID:"
			           rules={[{
				           required: true,
				           message: 'Valid Patient ID is required!'
			           }]}
			>
				<Input allowClear placeholder="Enter patient ID"
				       maxLength={props.maxlengths.patientID}
				       minLength={5}
				       value={patientID}
				       onChange={event => setPatientID(event.target.value.toUpperCase())}
				       disabled={newPatient}
				/>
			</Form.Item>
			
			{newPatient ?
				<Button type="link" onClick={generateNewPatientID}>Generate new</Button>
				: null
			}
		</Form.Item>
	);
};


const mapStateToProps = state => {
	return {
		maxlengths: state.maxlengths,
	};
};

export default connect(mapStateToProps)(PatientID);
