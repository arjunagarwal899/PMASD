import * as actionTypes from './patientHistoryTypes';
import { deleteLoading } from "./util";


const initialState = {
	historyData: {
		past: [],
		personal: [],
		present: [],
		family: [],
		obgyn: [],
	},
	
	loading: [],        // Will contain objects having keys: historyType (compulsary), actionType (compulsary), historyKey (only when updateing or deleting)
};


const patientHistoryBegin = (state, loadingData) => {
	return {
		...state,
		loading: [
			...state.loading,
			loadingData,
		]
	};
};

const patientHistoryFail = (state, loadingData) => {
	const newLoading = deleteLoading(state.loading, loadingData)
	return {
		...state,
		loading: newLoading,
	};
};


const patientHistoryListSuccess = (state, action, loadingData) => {
	let newHistoryData = { ...state.historyData };
	newHistoryData[action.historyType] = action.payload;
	
	const newLoading = deleteLoading(state.loading, loadingData)
	
	return {
		...state,
		historyData: newHistoryData,
		loading: newLoading,
	};
};


const patientHistoryCreateSuccess = (state, action, loadingData) => {
	const newHistoryData = { ...state.historyData };
	newHistoryData[action.historyType] = [
		...action.payload,
		...newHistoryData[action.historyType],
	]
	
	const newLoading = deleteLoading(state.loading, loadingData)
	
	return {
		...state,
		historyData: newHistoryData,
		loading: newLoading,
	};
};


const patientHistoryDeleteSuccess = (state, action, loadingData) => {
	let newHistoryData = { ...state.historyData };
	
	for (let i = 0; i < newHistoryData[action.historyType].length; i++) {
		if (newHistoryData[action.historyType][i].key === action.historyKey) {
			newHistoryData[action.historyType].splice(i, 1);
			break;
		}
	}
	
	const newLoading = deleteLoading(state.loading, loadingData)
	
	return {
		...state,
		historyData: newHistoryData,
		loading: newLoading,
	};
};


const patientHistoryReset = (state, action) => {
	let newHistoryData = { ...state.historyData };
	newHistoryData[action.historyType] = initialState.historyData[action.historyType];
	
	return {
		...state,
		historyData: newHistoryData,
	};
};


const patientHistoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PATIENT_HISTORY_LIST_BEGIN:
			return patientHistoryBegin(state, {
				historyType: action.historyType,
				actionType: 'list'
			});
		case actionTypes.PATIENT_HISTORY_LIST_SUCCESS:
			return patientHistoryListSuccess(state, action, {
				historyType: action.historyType,
				actionType: 'list'
			});
		case actionTypes.PATIENT_HISTORY_LIST_FAIL:
			return patientHistoryFail(state, {
				historyType: action.historyType,
				actionType: 'list',
			});
		
		
		case actionTypes.PATIENT_HISTORY_CREATE_BEGIN:
			return patientHistoryBegin(state, {
				historyType: action.historyType,
				actionType: 'create'
			});
		case actionTypes.PATIENT_HISTORY_CREATE_SUCCESS:
			return patientHistoryCreateSuccess(state, action, {
				historyType: action.historyType,
				actionType: 'create'
			});
		case actionTypes.PATIENT_HISTORY_CREATE_FAIL:
			return patientHistoryFail(state, {
				historyType: action.historyType,
				actionType: 'create',
			});
		
		
		case actionTypes.PATIENT_HISTORY_DELETE_BEGIN:
			return patientHistoryBegin(state, {
				historyType: action.historyType,
				historyKey: action.historyKey,
				actionType: 'delete'
			});
		case actionTypes.PATIENT_HISTORY_DELETE_SUCCESS:
			return patientHistoryDeleteSuccess(state, action, {
				historyType: action.historyType,
				historyKey: action.historyKey,
				actionType: 'delete'
			});
		case actionTypes.PATIENT_HISTORY_DELETE_FAIL:
			return patientHistoryFail(state, {
				historyType: action.historyType,
				historyKey: action.historyKey,
				actionType: 'delete',
			});
		
		
		case actionTypes.PATIENT_HISTORY_RESET_HISTORY_TYPE:
			return patientHistoryReset(state, action);
		
		default:
			return state;
	}
};

export default patientHistoryReducer;