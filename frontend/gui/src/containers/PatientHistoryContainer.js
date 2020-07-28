import React from 'react';
import PatientHistory from "components/Person/Patient/PatientHistory";
import { connect } from "react-redux";

const PatientHistoryContainer = props => {
	
	const { patientID } = props;
	
	
	return (
		<React.Fragment>
			<PatientHistory type="personal" heading="Personal History" patientID={patientID} />
			<PatientHistory type="past" heading="Past History" patientID={patientID} />
			<PatientHistory type="present" heading="Present History" patientID={patientID} />
			<PatientHistory type="family" heading="Family History" patientID={patientID} />
			{props.gender === 'F' ?
				<PatientHistory type="obgyn" heading="OBGYN History" patientID={patientID} />
				: null
			}
		</React.Fragment>
	);
};


const mapStateToProps = state => {
	return {
		patientID: state.patientBasic.patientFormData.patientID,
		gender: state.patientBasic.patientFormData.gender,
	};
};

export default connect(mapStateToProps)(PatientHistoryContainer);
