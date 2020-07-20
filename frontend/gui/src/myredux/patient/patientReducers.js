import * as actionTypes from './patientTypes'


const initialState = {
	patientIDNodeType: 'select' || 'input',
	patientIDNodeDisabled: false,
	
	patientType: 'existing' || 'new',
	patientFormData: {
		patientID: null,
		title: null,
		name: null,
		dob: null,
		age: null,
		gender: null,
		mobiles: [],
		emails: [],
		building_details: null,
		lane: null,
		area: null,
		city: null,
		pincode: null,
	},
	
	patientIDLoading: false,
	
	patientSearchSuccessData: null,
	patientSearchShowDropdown: false,
};


const patientSetPatientIDNodeTypeState = (state, action) => {
	return {
		...state,
		patientIDNodeType: (action.patientIDNodeType === 'input' || action.patientIDNodeType === 'select') ? action.patientIDNodeType : state.patientIDNodeType,
	};
};

const patientSetPatientIDNodeDisabledState = (state, action) => {
	return {
		...state,
		patientIDNodeDisabled: action.patientIDNodeDisabled || false,
	};
};

const patientSetPatientTypeState = (state, action) => {
	return {
		...initialState,
		patientType: (action.patientType === 'existing' || action.patientType === 'new') ? action.patientType : state.patientType,
	}
};


const patientSetFormDataState = (state, action) => {
	switch (action.dataType) {
		case 'complete':
			return {
				...state,
				patientFormData: {
					...action.formData,
				}
			};
		
		case 'partial':
			return {
				...state,
				patientFormData: {
					...state.patientFormData,
					...action.formData,
				}
			};
		
		default:
			return state;
	}
};

const patientResetFormDataState = (state, action) => {
	return {
		...state,
		patientFormData: initialState.patientFormData,
	};
};


// Adding a new patient
const patientAddNewBeginState = (state, action) => {
	return {
		...state,
	};
};

const patientAddNewSuccessState = (state, action) => {
	return {
		...state,
	};
};

const patientAddNewFailState = (state, action) => {
	return {
		...state,
	};
};


// Retrieving patient details
const patientRetrieveBeginState = (state, action) => {
	return {
		...state,
		patientIDLoading: true,
	};
};

const patientRetrieveSuccessState = (state, action) => {
	return {
		...state,
		patientIDLoading: false,
	};
};

const patientRetrieveFailState = (state, action) => {
	return {
		...state,
		patientIDLoading: false,
	};
};


// Searching for a patient
const patientSearchBeginState = (state, action) => {
	return {
		...state,
		patientIDLoading: true,
	};
};

const patientSearchSuccessState = (state, action) => {
	return {
		...state,
		patientIDLoading: false,
		patientSearchSuccessData: action.payload,
	};
};

const patientSearchFailState = (state, action) => {
	return {
		...state,
		patientIDLoading: false,
	};
};

const patientSearchSetDropdownVisibility = (state, action) => {
	return {
		...state,
		patientSearchShowDropdown: action.visible,
	};
};


// Updating a patient's details
const patientUpdateBeginState = (state, action) => {
	return {
		...state,
	};
};

const patientUpdateSuccessState = (state, action) => {
	return {
		...state,
	};
};

const patientUpdateFailState = (state, action) => {
	return {
		...state,
	};
};


const patientReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PATIENT_RESET_STATE:
			return initialState;
		
		case actionTypes.PATIENT_SET_PATIENT_ID_TYPE:
			return patientSetPatientIDNodeTypeState(state, action);
		case actionTypes.PATIENT_SET_PATIENT_ID_DISABLED:
			return patientSetPatientIDNodeDisabledState(state, action);
		case actionTypes.PATIENT_SET_PATIENT_TYPE:
			return patientSetPatientTypeState(state, action);
		
		case actionTypes.PATIENT_SET_FORM_DATA:
			return patientSetFormDataState(state, action);
		case actionTypes.PATIENT_RESET_FORM_DATA:
			return patientResetFormDataState(state, action);
		
		case actionTypes.PATIENT_ADD_NEW_BEGIN:
			return patientAddNewBeginState(state, action);
		case actionTypes.PATIENT_ADD_NEW_SUCCESS:
			return patientAddNewSuccessState(state, action);
		case actionTypes.PATIENT_ADD_NEW_FAIL:
			return patientAddNewFailState(state, action);
		
		case actionTypes.PATIENT_RETRIEVE_BEGIN:
			return patientRetrieveBeginState(state, action);
		case actionTypes.PATIENT_RETRIEVE_SUCCESS:
			return patientRetrieveSuccessState(state, action);
		case actionTypes.PATIENT_RETRIEVE_FAIL:
			return patientRetrieveFailState(state, action);
		
		case actionTypes.PATIENT_SEARCH_BEGIN:
			return patientSearchBeginState(state, action);
		case actionTypes.PATIENT_SEARCH_SUCCESS:
			return patientSearchSuccessState(state, action);
		case actionTypes.PATIENT_SEARCH_FAIL:
			return patientSearchFailState(state, action);
		case actionTypes.PATIENT_SEARCH_SET_DROPDOWN_VISIBILITY:
			return patientSearchSetDropdownVisibility(state, action);
		
		case actionTypes.PATIENT_UPDATE_BEGIN:
			return patientUpdateBeginState(state, action);
		case actionTypes.PATIENT_UPDATE_SUCCESS:
			return patientUpdateSuccessState(state, action);
		case actionTypes.PATIENT_UPDATE_FAIL:
			return patientUpdateFailState(state, action);
		
		default:
			return state
	}
};


export default patientReducer;