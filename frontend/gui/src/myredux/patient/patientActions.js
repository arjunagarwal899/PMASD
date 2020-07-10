import * as actionTypes from "./patientTypes";


// State actions
const patientBegin = () => {
	return {
		type: actionTypes.PATIENT_BEGIN,
	};
};

const patientSuccess = (patientID = null) => {
	return {
		type: actionTypes.PATIENT_SUCCESS,
		patientID: patientID,
	};
};

const patientFail = error => {
	return {
		type: actionTypes.PATIENT_FAIL,
		error: error,
	};
};


const patientNewPatient = () => {
	return {
		type: actionTypes.PATIENT_NEW_PATIENT,
	};
};

const patientExistingPatient = () => {
	return {
		type: actionTypes.PATIENT_EXISTING_PATIENT,
	};
};


// Main actions
const patientGenerate = () => {
	return (dispatch) => {
		dispatch(patientBegin());
		// axiosWithHeaders()
	};
};

const patientAdd = (patientID, patientData) => {
	return (dispatch) => {
		dispatch(patientBegin());
		// axiosWithHeaders()
	};
};

const patientSearch = (patientID) => {
	return (dispatch) => {
		dispatch(patientBegin());
		// axiosWithHeaders()
	};
};

const patientRetrieve = (patientID) => {
	return (dispatch) => {
		dispatch(patientBegin());
		// axiosWithHeaders()
	};
};

const patientUpdate = (patientID, patientDATA) => {
	return (dispatch) => {
		dispatch(patientBegin());
		// axiosWithHeaders()
	};
};


export {
	patientNewPatient,
	patientExistingPatient,
	patientGenerate,
	patientAdd,
	patientSearch,
	patientRetrieve,
	patientUpdate
};