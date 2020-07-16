import * as actionTypes from './patientTypes';
import { PATIENT_SET_FORM_DATA } from './patientTypes';
import { axiosWithHeaders } from "apis/httpClient";
import { parsePatientInfo } from "myredux/patient/util";


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

const patientSetPatientType = patientType => {
	return {
		type: actionTypes.PATIENT_SET_PATIENT_TYPE,
		patientType: patientType,
	}
}

// Either pass (field, value) pair or pass formData
const patientSetFormData = (field, value, formData = null, dataType = 'complete') => {
	if (formData === null) {
		formData = {};
		formData[field] = value;
		
		return {
			type: PATIENT_SET_FORM_DATA,
			dataType: 'partial',
			formData: formData,
		};
	}
	
	return {
		type: PATIENT_SET_FORM_DATA,
		dataType: dataType,
		formData: formData,
	};
	
};

const patientResetFormData = () => {
	return {
		type: actionTypes.PATIENT_RESET_FORM_DATA,
	}
}


const patientAddNew = newPatientData => {
	return dispatch => {
	
	};
};


const patientRetrieve = patientID => {
	return dispatch => {
		dispatch(patientRetrieveBegin());
		axiosWithHeaders
			.get(`api/patient/basic/${patientID}/`)
			.then(response => {
				let data = response.data;
				
				dispatch(patientRetrieveSuccess(data));
				
				data = parsePatientInfo(data, 'js');
				
				dispatch(patientSetFormData(null, null, data));
			})
			.catch(error => {
				dispatch(patientResetFormData());
				dispatch(patientRetrieveFail(error.message));
			});
	};
}


const patientSearch = (searchValue, minLengthCheck = 0) => {
	return dispatch => {
		if (searchValue.length > minLengthCheck) {
			dispatch(patientSearchBegin());
			
			axiosWithHeaders
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
				})
				.catch(error => {
					dispatch(patientResetFormData());
					dispatch(patientSearchFail(error.message));
				})
		} else {
			dispatch(patientSearchSetDropdownVisibility(false));
		}
	};
}


const patientUpdate = (patientData) => {
	return dispatch => {
		dispatch(patientUpdateBegin());
		
		patientData = parsePatientInfo(patientData, 'py');
		
		axiosWithHeaders
			.put(`api/patient/basic/${patientData['patient_id']}/`, patientData)
			.then(response => {
				dispatch(patientUpdateSuccess());
			})
			.catch(error => {
				dispatch(patientUpdateFail(error.message));
			});
	};
}


const patientGenerateID = () => {
	return dispatch => {
		axiosWithHeaders
			.get('api/patient/newid/')
			.then(response => {
				dispatch(patientSetFormData('patientID', response.data['new_patient_id']))
			})
			.catch(error => {
				console.log(error);
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

const patientRetrieveSuccess = patientFormData => {
	return {
		type: actionTypes.PATIENT_RETRIEVE_SUCCESS,
		payload: patientFormData,
	};
};

const patientRetrieveFail = errorMessage => {
	return {
		type: actionTypes.PATIENT_RETRIEVE_FAIL,
		errorMessage: errorMessage,
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
		type: actionTypes.PATIENT_UPDATE_SUCCESS,
	};
};

const patientUpdateFail = errorMessage => {
	return {
		type: actionTypes.PATIENT_UPDATE_FAIL,
		errorMessage,
	};
};
