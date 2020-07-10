import * as actionTypes from './patientTypes'


const initalState = {
	loading: false,
	error: null,
	patientID: null,
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
		patientID: action.patientID,
	}
}


const patientFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
		patientID: null,
	}
};


const patientReducer = (state = initalState, action) => {
	switch (action) {
		case actionTypes.PATIENT_BEGIN:
			return patientBegin(state, action);
		case actionTypes.PATIENT_SUCCESS:
			return patientSuccess(state, action);
		case actionTypes.PATIENT_FAIL:
			return patientFail(state, action);
		
		default:
			return state;
	}
};


export default patientReducer;