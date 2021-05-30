import React from 'react';
import { connect } from "react-redux";

import { Space } from "antd";

import PatientHistory from "components/Person/Patient/PatientHistory";


// A container to display all history details (4 or 5 depending on gender) of a patient. Patient ID is retrieved from the redux store and cannot be overridden
const PatientHistoryContainer = props => {
	
	const { patientID } = props;
	
	return (
		<React.Fragment>
			<Space direction="vertical" style={{ width: "100%" }}>
				<PatientHistory type="present" title="Present History" patientID={patientID} />
				<PatientHistory type="past" title="Past History" patientID={patientID} />
				<PatientHistory type="personal" title="Personal History" patientID={patientID} />
				<PatientHistory type="family" title="Family History" patientID={patientID} />
				{props.gender === 'F' ?
					<PatientHistory type="obgyn" heading="OBGYN History" patientID={patientID} />
					: null
				}
			</Space>
		</React.Fragment>
	);
};


const mapStateToProps = state => {
	return {
		patientID: state.patient.basic.patientFormData.patientID,
		gender: state.patient.basic.patientFormData.gender,
	};
};

export default connect(mapStateToProps)(PatientHistoryContainer);
