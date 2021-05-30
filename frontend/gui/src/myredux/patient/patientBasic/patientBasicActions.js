import * as actionTypes from 'myredux/patient/patientBasic/patientBasicTypes';
import { PATIENT_BASIC_SET_FORM_DATA } from 'myredux/patient/patientBasic/patientBasicTypes';
import { axiosWithHeaders } from "util/httpClient";
import { parsePatientInfo } from "myredux/patient/patientBasic/util";
import { handleAxiosError, parseAxiosError } from "util/requestManagement";
import misc from "constants/misc";

// Action creator to reset entire patient store to initial state
const patientBasicResetState = () => {
	return {
		type: actionTypes.PATIENT_BASIC_RESET_STATE,
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

// Function to update store values of form data with the user entered values
const patientBasicSetFormData = (formData, dataType = 'complete') => {
	return {
		type: PATIENT_BASIC_SET_FORM_DATA,
		dataType: dataType,
		formData: formData,
	};
};

// Function to reset patient form data
const patientBasicResetFormData = () => {
	return {
		type: actionTypes.PATIENT_BASIC_RESET_FORM_DATA,
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
const patientBasicRetrieve = patientID => {
	return dispatch => {
		dispatch(patientBasicRetrieveBegin());
		return axiosWithHeaders
			.get(`api/patient/basic/${patientID}/`)
			.then(response => {
				let data = response.data;
				
				dispatch(patientBasicRetrieveSuccess(data));
				
				data = parsePatientInfo(data, 'js');
				
				dispatch(patientBasicSetFormData(data));
				
				return Promise.resolve(response);
			})
			.catch(error => {
				dispatch(patientBasicResetFormData());
				dispatch(patientBasicRetrieveFail(error));
				
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
					dispatch(patientBasicResetFormData());
					dispatch(patientSearchFail(error));
					
					return Promise.reject(error);
				})
		} else {
			dispatch(patientSearchSetDropdownVisibility(false));
		}
	};
}


// Function to update a patient's details
const patientBasicUpdate = (patientData) => {
	return dispatch => {
		dispatch(patientBasicUpdateBegin());
		
		patientData = parsePatientInfo(patientData, 'py');
		
		return axiosWithHeaders
			.put(`api/patient/basic/${patientData['patient_id']}/`, patientData)
			.then(response => {
				dispatch(patientBasicUpdateSuccess());
				
				return Promise.resolve(response);
			})
			.catch(error => {
				dispatch(patientBasicUpdateFail(error));
				
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
				dispatch(patientBasicSetFormData({ patientID: response.data['new_patient_id'] }));
				
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
	patientBasicResetState,
	patientSetPatientIDNodeType,
	patientSetPatientIDNodeDisabled,
	patientBasicSetFormData,
	patientBasicResetFormData,
	patientAddNew,
	patientBasicRetrieve,
	patientSearch,
	patientBasicUpdate,
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
const patientBasicRetrieveBegin = () => {
	return {
		type: actionTypes.PATIENT_BASIC_RETRIEVE_BEGIN,
	};
};

const patientBasicRetrieveSuccess = patientFormData => {
	return {
		type: actionTypes.PATIENT_BASIC_RETRIEVE_SUCCESS,
		payload: patientFormData,
	};
};

const patientBasicRetrieveFail = error => {
	let parsedError = parseAxiosError(error);
	handleAxiosError(parsedError);
	
	return {
		type: actionTypes.PATIENT_BASIC_RETRIEVE_FAIL,
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
const patientBasicUpdateBegin = () => {
	return {
		type: actionTypes.PATIENT_BASIC_UPDATE_BEGIN,
	};
};

const patientBasicUpdateSuccess = () => {
	return {
		type: actionTypes.PATIENT_BASIC_UPDATE_SUCCESS,
	};
};

const patientBasicUpdateFail = error => {
	let parsedError = parseAxiosError(error);
	handleAxiosError(parsedError);
	
	return {
		type: actionTypes.PATIENT_BASIC_UPDATE_FAIL,
		errorMessage: parsedError.message,
	};
};
