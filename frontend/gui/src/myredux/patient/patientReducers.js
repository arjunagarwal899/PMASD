import * as actionTypes from './patientTypes'


const initalState = {
	loading: false,
	error: null,
	
	// If newPatient is true, patientSearch will always be []
	// patientData will always have information only if patientID is not null
	newPatient: false,
	patientID: null,
	patientData: {},
	patientSearch: [],
};


const patientBegin = (state, action) => {
	return {
		...state,
		loading: true,
		error: null,
	}
};


const patientSuccess = (state, action) => {
	return {
		...state,
		loading: false,
		error: null,
		patientID: action.patientID || null,
		patientData: action.patientData || {},
		patientSearch: action.patientSearch || [],
	}
}


const patientFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
		patientID: null,
		patientData: {},
		patientSearch: [],
	}
};


const patientNewPatient = (state, action) => {
	return {
		...state,
		newPatient: true,
		patientID: null,
		patientData: {},
		patientSearch: [],
	}
}


const patientExistingPatient = (state, action) => {
	return {
		...state,
		newPatient: false,
		patientID: null,
		patientData: {},
	}
}


const patientReducer = (state = initalState, action) => {
	switch (action.type) {
		case actionTypes.PATIENT_BEGIN:
			return patientBegin(state, action);
		case actionTypes.PATIENT_SUCCESS:
			return patientSuccess(state, action);
		case actionTypes.PATIENT_FAIL:
			return patientFail(state, action);
		case actionTypes.PATIENT_NEW_PATIENT:
			return patientNewPatient(state, action);
		case actionTypes.PATIENT_EXISTING_PATIENT:
			return patientExistingPatient(state, action);
		
		default:
			return state;
	}
};


export default patientReducer;