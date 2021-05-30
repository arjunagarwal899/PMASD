import React, { useEffect, useReducer } from 'react';
import { connect } from "react-redux";
import moment from "moment";

import { Anchor, Button, Col, Collapse, Descriptions, Divider, Modal, PageHeader, Row, Space, Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import project from 'constants/project.json';
import patientAvatar from 'static/img/default-person.jpg';
import BaseContainer from "containers/BaseContainer";
import PatientHistoryContainer from "containers/PatientHistoryContainer";
import PatientID from "components/Person/Patient/PatientID";
import {
	patientBasicResetFormData,
	patientBasicRetrieve,
	patientSetPatientIDNodeDisabled,
	patientSetPatientIDNodeType
} from "myredux";
import PatientBasicContainer from "containers/PatientBasicContainer";


const BirthdayWeek = props => {
	const { dob, age } = props;
	
	if (!dob || !age) return null;
	
	const birthday = moment(dob).add(age, 'years');
	if (birthday.isSame(moment(), 'day')) {
		return (
			<Typography.Text strong style={{ color: 'green' }}>
				<SmileOutlined /> Today is patient's birthday
			</Typography.Text>
		)
	}
	
	birthday.add(1, 'years');
	const daysToGo = birthday.diff(moment(), 'days') + 1
	if (daysToGo <= 7) {
		return (
			<Typography.Text strong style={{ color: 'green' }}>
				<SmileOutlined /> Patient's birthday is in {daysToGo} day(s)
			</Typography.Text>
		
		);
	}
	
	return null;
};


const ConsultationContainer = props => {
	
	const { patientData } = props;
	
	const defaultPatientBasicState = { visible: false, patientType: 'existing', };
	const [patientBasicState, patientBasicDispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'new':
				return { visible: true, patientType: 'new' };
			case 'existing':
				return { visible: true, patientType: 'existing' };
			case 'existingButModalClosed':
				return { visible: false, patientType: 'existing' };
			case 'reset':
				return defaultPatientBasicState;
			default:
				return state;
		}
	}, defaultPatientBasicState);
	
	
	useEffect(() => {
		document.title = `Consultation | ${project.projectNick}`;
		
		return () => {
			//	TODO add reseting of redux state when unmounting
			console.log('unmounting');
		};
	}, []);
	
	// Retrieve patient data if it's an existing patient and the value of patientID changes
	useEffect(() => {
		if (patientData.patientID && patientData.patientID.length > 0) {
			if (patientBasicState.patientType && patientBasicState.patientType === 'existing') {
				props.retrievePatientData(patientData.patientID);
				patientBasicDispatch({ type: 'existingButModalClosed' });
			}
		}
	}, [patientData.patientID]);            // eslint-disable-line
	
	
	return (
		<BaseContainer>
			<Row>
				<Col span={20}>
					<section id="patient-profile">
						<PageHeader title="Patient Profile"
						            onBack={false}
						            avatar={{ src: patientAvatar }}
						            ghost={false}
						            extra={
							            <React.Fragment>
								            {patientData.patientID && patientBasicState.patientType && patientBasicState.patientType === 'existing' ?
									            <Button type="primary"
									                    onClick={() => patientBasicDispatch({ type: 'existing' })}>
										            Edit Patient
									            </Button>
									            : null
								            }
								            <Button type="primary"
								                    onClick={() => patientBasicDispatch({ type: 'new' })}>
									            Add Patient
								            </Button>
							            </React.Fragment>
						            }
						>
							<section id="patient-basic">
								<Descriptions size="small"
								              column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
									<Descriptions.Item label="Patient ID">
										<PatientID noFormStyle style={{ width: '150px' }} />
									</Descriptions.Item>
									<Descriptions.Item label="Name">
										{patientData.patientID && patientData.title && patientData.name ?
											`${patientData.title} ${patientData.name}`
											: "Unknown"
										}
									</Descriptions.Item>
									<Descriptions.Item label="Age">
										{patientData.patientID && patientData.age ?
											`${patientData.age} years`
											: "Unknown"
										}
									</Descriptions.Item>
									<Descriptions.Item label="Address">
										{[patientData.building_details, patientData.lane, patientData.area, patientData.city, patientData.pincode].filter(Boolean).length > 0 ?
											[patientData.building_details, patientData.lane, patientData.area, patientData.city, patientData.pincode].filter(Boolean).join(', ')
											: "Unknown"
										}
									</Descriptions.Item>
									<Descriptions.Item>
										<BirthdayWeek dob={patientData.dob} age={patientData.age} />
									</Descriptions.Item>
								</Descriptions>
								
								<Modal visible={patientBasicState.visible}
								       footer={null}
								       destroyOnClose
								       onCancel={() => {
									       patientBasicDispatch({ type: 'existingButModalClosed' });
									       if (patientBasicState.patientType === 'new') props.resetPatientData();
								       }}
								       afterClose={() => {
									       props.formatPatientIDField();
								       }}
								       title={patientBasicState.patientType && patientBasicState.patientType === 'new' ?
									       "Add New Patient"
									       : (patientBasicState.patientType && patientBasicState.patientType === 'existing' ?
											       "Edit Patient Details"
											       : null
									       )
								       }
								>
									<PatientBasicContainer
										patientType={patientBasicState.patientType || 'new'}
										onSubmit={() => patientBasicDispatch({ 'type': 'existingButModalClosed' })}
									/>
								</Modal>
							</section>
							
							<Divider />
							
							<section id="patient-history">
								<Collapse>
									<Collapse.Panel key="patient-history-collapse" header="Patient History">
										<PatientHistoryContainer />
									</Collapse.Panel>
								</Collapse>
							</section>
						</PageHeader>
					</section>
				</Col>
				
				
				<Col span={4}>
					<Anchor>
						<Anchor.Link href="#patient-profile" title="Patient Profile">
							<Anchor.Link href="#patient-basic" title="Patient Details" />
							<Anchor.Link href="#patient-history" title="Patient History" />
						</Anchor.Link>
					</Anchor>
				</Col>
			</Row>
		</BaseContainer>
	);
};


const mapStateToProps = state => {
	return {
		patientData: state.patient.basic.patientFormData,
	};
};

const mapDispatchToProps = dispatch => {
	const formatPatientIDField = () => {
		dispatch(patientSetPatientIDNodeDisabled(false));
		dispatch(patientSetPatientIDNodeType('select'));
	};
	
	return {
		retrievePatientData: patientID => dispatch(patientBasicRetrieve(patientID)),
		resetPatientData: () => dispatch(patientBasicResetFormData()),
		formatPatientIDField: () => formatPatientIDField(),
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(ConsultationContainer);
