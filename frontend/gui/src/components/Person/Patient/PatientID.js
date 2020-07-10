import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

import { Col, Form, Input, Row, Select } from "antd";
import { axiosWithHeaders } from "apis/httpClient";


const dropDownColumnWidths = [3, 6, 13]


const PatientID = props => {
	
	
	//Temporary
	
	const [patientData, setPatientData] = useState([]);
	
	const getPatientData = searchValue => {
		if (searchValue.length > 3) {
			axiosWithHeaders
				.get('api/patient/search', {
					params: {
						search: searchValue,
					}
				})
				.then(response => {
					setPatientData(response.data)
				})
				.catch(error => {
					switch (error.status) {
						case 401:
							console.log('Unauthorized');
							break;
						case undefined:
							console.log('Unknown Error');
							break;
						
						default:
					}
					
					setPatientData([]);
				})
		} else {
			setPatientData([]);
		}
	};
	// End of temporary
	
	
	return (
		<React.Fragment>
			<Form.Item label="Patient ID:"
			           rules={[{
				           required: true,
				           message: 'Valid Patient ID is required!'
			           }]}
			>
				{props.newPatient ?
					
					<Input allowClear placeholder="Enter patient ID"
					       maxLength={props.maxlengths.patientID}
					       minLength={5}
					       value={props.patientID}
					       disabled={props.newPatient}
					       autoFocus={!props.newPatient}
					/>
					
					:
					
					<Select showSearch
					        showArrow={false}
					        placeholder="Enter patient ID"
					        onSearch={getPatientData}
					        filterOption={false}
					        notFoundContent={null}
					        defaultActiveFirstOption
					        optionLabelProp="value"
					        loading={props.loading}
					>
						{patientData.length ?
							
							<Select.OptGroup label={
								<Row>
									<Col span={dropDownColumnWidths[0]}>Patient ID</Col>
									<Col span={dropDownColumnWidths[1]}>Patient Name</Col>
									<Col span={dropDownColumnWidths[2]}>Mobile Numbers</Col>
								</Row>
							}>
								{patientData.map(patient => (
									<Select.Option value={patient.patient_id} key={patient.patient_id}>
										<Row>
											{/*TODO Apply style={{textOverflow: 'ellipsis', overflow: 'hidden' }}*/}
											<Col span={dropDownColumnWidths[0]}>{patient.patient_id}</Col>
											{/*<Col span={dropDownColumnWidths[1]}>{patient.name}</Col>*/}
											<Col span={dropDownColumnWidths[1]} style={{
												textOverflow: 'ellipsis',
												overflow: 'hidden'
											}}>{patient.name}</Col>
											<Col span={dropDownColumnWidths[2]}>{patient.mobiles.join(', ')}</Col>
										</Row>
									</Select.Option>
								))}
							</Select.OptGroup>
							
							: null
						}
					</Select>
					
				}
			</Form.Item>
		</React.Fragment>
	);
};


const mapStateToProps = state => {
	return {
		maxlengths: state.maxlengths,
		newPatient: state.patient.newPatient,
		patientID: state.patient.patientID,
		loading: state.patient.loading,
	};
};

export default connect(mapStateToProps)(PatientID);
