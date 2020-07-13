import React from 'react';
import { connect } from "react-redux";

import { Alert, Col, Form, Input, Row, Select } from "antd";
import { LoadingOutlined } from '@ant-design/icons'

import { patientSearch } from "myredux";


const minLengthForSearching = 3;


const dropDownInfo = [
	{
		width: 2,
		heading: 'Patient ID',
		content: 'patient_id',
		join: false,
	},
	{
		width: 5,
		heading: 'Patient Name',
		content: 'name',
		join: false,
	},
	{
		width: 4,
		heading: 'Hospital',
		content: 'hospital',
		join: false,
	},
	{
		width: 6,
		heading: 'Referring Doctors',
		content: 'doctor_names',
		join: true,
		joinConnector: ', ',
	},
	{
		width: 6,
		heading: 'Mobile Numbers',
		content: 'mobiles',
		join: true,
		joinConnector: ', ',
	},
];


const PatientID = props => {
	
	return (
		<React.Fragment>
			<Form.Item label="Patient ID:"
			           rules={[{
				           required: true,
				           message: 'Valid Patient ID is required!'
			           }]}
			>
				{props.nodeType === 'input' ?
					<Input placeholder='Enter patient ID'
					       maxLength={props.maxlengths.patientID}
					       minLength={5}
					       disabled={props.disabled}
					       autoFocus={!props.disabled}
					       suffix={props.loading ? <LoadingOutlined /> : null}
					       value={props.patientIDState[0]}
					       onChange={props.patientIDState[1]}
					/>
					
					:
					
					<Select showSearch
					        placeholder="Enter patient ID"
					        onSearch={value => props.searchPatient(value, minLengthForSearching)}
					        filterOption={false}
					        notFoundContent={null}
					        defaultActiveFirstOption
					        optionLabelProp="patient_id"
					        loading={props.loading}
					        disabled={props.disabled}
					        value={props.patientIDState[0]}
					        onChange={props.patientIDState[1]}
					        suffixIcon={props.loading ? <LoadingOutlined /> : null}
					        showArrow={props.loading ?
						        <LoadingOutlined /> : null}      // Jugaad to show the loading icon, it is actually the arrow to toggle the dropdown
					>
						{props.showDropdown ?
							
							<Select.OptGroup label={
								<Row>
									{dropDownInfo.map((col, index) => (
										<Col span={col.width} key={index}>{col.heading}</Col>
									))}
								</Row>
							}>
								{props.searchData.map(patient => (
									<Select.Option value={patient['patient_id']} key={patient['patient_id']}>
										<Row>
											{/*TODO Apply style={{textOverflow: 'ellipsis', overflow: 'hidden' }}*/}
											{dropDownInfo.map((col, index) => (
												<Col span={col.width} key={index}>
													{col.join ?
														patient[col.content].join(col.joinConnector)
														:
														patient[col.content]
													}
												</Col>
											))}
										</Row>
									</Select.Option>
								))}
							</Select.OptGroup>
							
							: null
						}
					</Select>
					
				}
				
				{props.error ?
					
					<Form.Item>
						<Alert message={props.error} type="error" showIcon />
					</Form.Item>
					
					: null
				}
			</Form.Item>
		</React.Fragment>
	);
};


const mapStateToProps = state => {
	return {
		maxlengths: state.maxlengths,
		
		// For type and props of the Patient ID field
		loading: state.patient.patientIDLoading,
		disabled: state.patient.patientIDNodeDisabled,
		nodeType: state.patient.patientIDNodeType,
		
		// In case of errors
		error: state.patient.transactionError,
		
		// While retrieving search data
		searchData: state.patient.patientSearchSuccessData,
		showDropdown: state.patient.patientSearchShowDropdown,
		
		// While retrieving a new patient ID
		// TODO add generation of new patient ID from database
	};
};

const mapDispatchToProps = dispatch => {
	return {
		searchPatient: (searchValue, minLength) => dispatch(patientSearch(searchValue, minLength)),
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(PatientID);
