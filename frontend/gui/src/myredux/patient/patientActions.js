import * as actionTypes from './patientTypes';
import { PATIENT_SET_FORM_DATA } from './patientTypes';
import { axiosWithHeaders } from "util/httpClient";
import { parsePatientInfo } from "myredux/patient/util";
import { handleAxiosError, parseAxiosError } from "util/requestManagement";
import misc from "constants/misc";

// Action creator to reset entire patient store to initial state
const patientResetState = () => {
	return {
		type: actionTypes.PATIENT_RESET_STATE,
	};
};

// Function to change the type of patientID component (input type or select type)
const patientSetPatientIDNodeType = patientIDNodeType => {
	return {
		type: actionTypes.PATIENT_SET_PATIENT_ID_TYPE,
		patientIDNodeType: patientIDNodeType,
	};
};

// Function to disable or enable the patient ID component
const patientSetPatientIDNodeDisabled = patientIDNodeDisabled => {
	return {
		type: actionTypes.PATIENT_SET_PATIENT_ID_DISABLED,
		patientIDNodeDisabled: patientIDNodeDisabled,
	};
};

// Function to switch between patient type (new or existing)
const patientSetPatientType = patientType => {
	return {
		type: actionTypes.PATIENT_SET_PATIENT_TYPE,
		patientType: patientType,
	}
}

// Function to update store values of form data with the user entered values
const patientSetFormData = (formData, dataType = 'complete') => {
	return {
		type: PATIENT_SET_FORM_DATA,
		dataType: dataType,
		formData: formData,
	};
	
};

// Function to reset patient form data
const patientResetFormData = () => {
	return {
		type: actionTypes.PATIENT_RESET_FORM_DATA,
	}
}


// Function to add a new patient to the database
const patientAddNew = newPatientData => {
	return dispatch => {
		dispatch(patientAddNewBegin());
		
		newPatientData = parsePatientInfo(newPatientData, 'py');
		
		return axiosWithHeaders
			.post('api/patient/basic/', newPatientData)
			.then(response => {
				dispatch(patientAddNewSuccess());
				
				return Promise.resolve(response);
			})
			.catch(error => {
				dispatch(patientAddNewFail(error));
				
				return Promise.reject(error);
			});
	};
};


// FUnction to retrieve patient details from the database
const patientRetrieve = patientID => {
	return dispatch => {
		dispatch(patientRetrieveBegin());
		return axiosWithHeaders
			.get(`api/patient/basic/${patientID}/`)
			.then(response => {
				let data = response.data;
				
				dispatch(patientRetrieveSuccess(data));
				
				data = parsePatientInfo(data, 'js');
				
				dispatch(patientSetFormData(data));
				
				return Promise.resolve(response);
			})
			.catch(error => {
				dispatch(patientResetFormData());
				dispatch(patientRetrieveFail(error));
				
				return Promise.reject(error);
			});
	};
}


// Function to search for patients based on patient ID, name, referring doctor of last consultation,
// hospital of last consultation and mobile numbers
const patientSearch = (searchValue, minLengthCheck = misc.minLengthOfPatientIDForSearching) => {
	return dispatch => {
		if (searchValue && searchValue.length > minLengthCheck) {
			dispatch(patientSearchBegin());
			
			return axiosWithHeaders
				.get('api/patient/search/', {
					params: {
						search: searchValue,
					}
				})
				.then(response => {
					dispatch(patientSearchSuccess(response.data));
					
					dispatch(patientSearchSetDropdownVisibility(
						Object.keys(response.data).length > 0
					));
					
					return Promise.resolve(response);
				})
				.catch(error => {
					dispatch(patientResetFormData());
					dispatch(patientSearchFail(error));
					
					return Promise.reject(error);
				})
		} else {
			dispatch(patientSearchSetDropdownVisibility(false));
		}
	};
}


// Function to update a patient's details
const patientUpdate = (patientData) => {
	return dispatch => {
		dispatch(patientUpdateBegin());
		
		patientData = parsePatientInfo(patientData, 'py');
		
		return axiosWithHeaders
			.put(`api/patient/basic/${patientData['patient_id']}/`, patientData)
			.then(response => {
				dispatch(patientUpdateSuccess());
				
				return Promise.resolve(response);
			})
			.catch(error => {
				dispatch(patientUpdateFail(error));
				
				return Promise.reject(error);
			});
	};
}


// Function to generate a new patient ID
const patientGenerateID = () => {
	return dispatch => {
		return axiosWithHeaders
			.get('api/patient/newid/')
			.then(response => {
				dispatch(patientSetFormData({ patientID: response.data['new_patient_id'] }));
				
				return Promise.resolve(response);
			})
			.catch(error => {
				let parsedError = parseAxiosError(error);
				handleAxiosError(parsedError);
				return Promise.reject(error);
			})
	};
};


export {
	patientResetState,
	patientSetPatientIDNodeType,
	patientSetPatientIDNodeDisabled,
	patientSetPatientType,
	patientSetFormData,
	patientResetFormData,
	patientAddNew,
	patientRetrieve,
	patientSearch,
	patientUpdate,
	patientGenerateID
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

const patientAddNewFail = error => {
	let parsedError = parseAxiosError(error);
	handleAxiosError(parsedError);
	
	return {
		type: actionTypes.PATIENT_ADD_NEW_FAIL,
		errorMessage: parsedError.message,
	};
}


// Retrieving patient details
const patientRetrieveBegin = () => {
	return {
		type: actionTypes.PATIENT_RETRIEVE_BEGIN,
	};
};

const patientRetrieveSuccess = patientFormData => {
	return {
		type: actionTypes.PATIENT_RETRIEVE_SUCCESS,
		payload: patientFormData,
	};
};

const patientRetrieveFail = error => {
	let parsedError = parseAxiosError(error);
	handleAxiosError(parsedError);
	
	return {
		type: actionTypes.PATIENT_RETRIEVE_FAIL,
		errorMessage: parsedError.message,
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

const patientSearchFail = error => {
	let parsedError = parseAxiosError(error);
	handleAxiosError(parsedError);
	
	return {
		type: actionTypes.PATIENT_SEARCH_FAIL,
		errorMessage: parsedError.message,
	};
};

const patientSearchSetDropdownVisibility = visible => {
	return {
		type: actionTypes.PATIENT_SEARCH_SET_DROPDOWN_VISIBILITY,
		visible: visible,
	};
};      // Function to change the visibility of of the drop down while searching


// Updating an existing patient
const patientUpdateBegin = () => {
	return {
		type: actionTypes.PATIENT_UPDATE_BEGIN,
	};
};

const patientUpdateSuccess = () => {
	return {
		type: actionTypes.PATIENT_UPDATE_SUCCESS,
	};
};

const patientUpdateFail = error => {
	let parsedError = parseAxiosError(error);
	console.log(parsedError);
	handleAxiosError(parsedError);
	
	return {
		type: actionTypes.PATIENT_UPDATE_FAIL,
		errorMessage: parsedError.message,
	};
};
