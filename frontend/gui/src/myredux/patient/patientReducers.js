import * as actionTypes from './patientTypes'


const initialState = {
	patientIDNodeType: 'select' || 'input',
	patientIDNodeDisabled: false,
	
	patientIDLoading: false,
	transactionError: null,
	
	patientAddNewBegun: false,
	patientAddNewSuccess: false,
	
	patientRetrieveBegun: false,
	patientRetrieveSuccessData: null,
	
	patientSearchBegun: false,
	patientSearchSuccessData: null,
	patientSearchShowDropdown: false,
	
	patientUpdateBegun: false,
	patientUpdateSuccess: false,
};


const patientSetPatientIDNodeType = (state, action) => {
	return {
		...state,
		patientIDNodeType: action.patientIDNodeType || 'input',
	};
};


const patientSetPatientIDNodeDisabled = (state, action) => {
	return {
		...state,
		patientIDNodeDisabled: action.patientIDNodeDisabled || false,
	};
};


// Adding a new patient
const patientAddNewBeginState = (state, action) => {
	return {
		...initialState,
		patientIDNodeType: state.patientIDNodeType,
		patientIDNodeDisabled: state.patientIDNodeDisabled,
		
		patientIDLoading: true,
		transactionError: null,
		patientAddNewBegun: true,
	};
};

const patientAddNewSuccessState = (state, action) => {
	return {
		...state,
		patientIDLoading: false,
		patientAddNewSuccess: true,
	};
};

const patientAddNewFailState = (state, action) => {
	return {
		...state,
		patientIDLoading: false,
		transactionError: action.errorMessage,
	};
};


// Retrieving patient details
const patientRetrieveBeginState = (state, action) => {
	return {
		...initialState,
		patientIDNodeType: state.patientIDNodeType,
		patientIDNodeDisabled: state.patientIDNodeDisabled,
		
		patientIDLoading: true,
		transactionError: null,
		patientRetrieveBegun: true,
	};
};

const patientRetrieveSuccessState = (state, action) => {
	return {
		...state,
		patientIDLoading: false,
		patientRetrieveSuccessData: action.payload,
	};
};

const patientRetrieveFailState = (state, action) => {
	return {
		...state,
		patientIDLoading: false,
		transactionError: action.errorMessage,
	};
};


// Searching for a patient
const patientSearchBeginState = (state, action) => {
	return {
		...initialState,
		patientIDNodeType: state.patientIDNodeType,
		patientIDNodeDisabled: state.patientIDNodeDisabled,
		
		patientSearchSuccessData: state.patientSearchSuccessData,
		patientSearchShowDropdown: state.patientSearchShowDropdown,
		
		patientIDLoading: true,
		transactionError: null,
		patientSearchBegun: true,
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
		transactionError: action.errorMessage,
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
		...initialState,
		patientIDNodeType: state.patientIDNodeType,
		patientIDNodeDisabled: state.patientIDNodeDisabled,
		
		patientIDLoading: true,
		transactionError: null,
		patientUpdateBegun: true,
	};
};

const patientUpdateSuccessState = (state, action) => {
	return {
		...state,
		patientIDLoading: false,
		patientUpdateSuccess: true,
	};
};

const patientUpdateFailState = (state, action) => {
	return {
		...state,
		patientIDLoading: false,
		transactionError: action.errorMessage,
	};
};


const patientReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PATIENT_RESET_STATE:
			return initialState;
		
		case actionTypes.PATIENT_SET_PATIENT_ID_TYPE:
			return patientSetPatientIDNodeType(state, action);
		case actionTypes.PATIENT_SET_PATIENT_ID_DISABLED:
			return patientSetPatientIDNodeDisabled(state, action);
		
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