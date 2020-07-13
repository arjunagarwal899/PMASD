import * as actionTypes from './patientTypes';
import { axiosWithHeaders } from "apis/httpClient";


const patientResetState = () => {
	return {
		type: actionTypes.PATIENT_RESET_STATE,
	};
};

const patientSetPatientIDNodeType = patientIDNodeType => {
	return {
		type: actionTypes.PATIENT_SET_PATIENT_ID_TYPE,
		patientIDNodeType: patientIDNodeType,
	};
};

const patientSetPatientIDNodeDisabled = patientIDNodeDisabled => {
	return {
		type: actionTypes.PATIENT_SET_PATIENT_ID_DISABLED,
		patientIDNodeDisabled: patientIDNodeDisabled,
	};
};


const patientAddNew = newPatientData => {
	return dispatch => {
	
	};
};


const patientRetrieve = patientID => {
	return dispatch => {
	
	};
}


const patientSearch = (searchValue, minLengthCheck = 0) => {
	return dispatch => {
		if (searchValue.length > minLengthCheck) {
			dispatch(patientSearchBegin());
			
			axiosWithHeaders
				.get('api/patient/search', {
					params: {
						search: searchValue,
					}
				})
				.then(response => {
					dispatch(patientSearchSuccess(response.data));
					
					dispatch(patientSearchSetDropdownVisibility(
						Object.keys(response.data).length > 0
					));
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
					
					patientSearchFail(error.message);
				})
		} else {
			dispatch(patientSearchSetDropdownVisibility(false));
		}
	};
}


const patientUpdate = (patientID, patientData) => {
	return dispatch => {
	
	};
}

export {
	patientResetState,
	patientSetPatientIDNodeType,
	patientSetPatientIDNodeDisabled,
	patientAddNew,
	patientRetrieve,
	patientSearch,
	patientUpdate
};


// ******* Side effects *******

// Adding a new patient
const patientAddNewBegin = () => {
	return {
		type: actionTypes.PATIENT_ADD_NEW_BEGIN,
	};
};

const patientAddNewSuccess = () => {
	return {
		type: actionTypes.PATIENT_ADD_NEW_SUCCESS,
	};
};

const patientAddNewFail = () => {
	return {
		type: actionTypes.PATIENT_ADD_NEW_FAIL,
	};
}


// Retrieving patient details
const patientRetrieveBegin = () => {
	return {
		type: actionTypes.PATIENT_RETRIEVE_BEGIN,
	};
};

const patientRetrieveSuccess = () => {
	return {
		type: actionTypes.PATIENT_RETRIEVE_SUCCESS,
	};
};

const patientRetrieveFail = () => {
	return {
		type: actionTypes.PATIENT_RETRIEVE_FAIL,
	};
}


// Searching for a patient
const patientSearchBegin = () => {
	return {
		type: actionTypes.PATIENT_SEARCH_BEGIN,
	};
};

const patientSearchSuccess = searchData => {
	return {
		type: actionTypes.PATIENT_SEARCH_SUCCESS,
		payload: searchData,
	};
};

const patientSearchFail = errorMessage => {
	return {
		type: actionTypes.PATIENT_SEARCH_FAIL,
		errorMessage: errorMessage,
	};
};

const patientSearchSetDropdownVisibility = visible => {
	return {
		type: actionTypes.PATIENT_SEARCH_SET_DROPDOWN_VISIBILITY,
		visible: visible,
	};
};


// Updating an existing patient
const patientUpdateBegin = () => {
	return {
		type: actionTypes.PATIENT_UPDATE_BEGIN,
	};
};

const patientUpdateSuccess = () => {
	return {
		type: actionTypes.PATIENT_RETRIEVE_SUCCESS,
	};
};

const patientUpdateFail = () => {
	return {
		type: actionTypes.PATIENT_UPDATE_FAIL,
	};
};
