// Generate new ID
// Get information for existing patient
// Add new patient
// Update existing patient


import * as actionTypes from "./patientTypes";
import { axiosWithHeaders } from "../../apis/httpClient";


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


export { patientGenerate, patientAdd, patientRetrieve, patientUpdate };