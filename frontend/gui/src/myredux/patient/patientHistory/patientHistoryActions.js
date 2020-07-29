import moment from "moment";
import _ from 'lodash';

import * as actionTypes from './patientHistoryTypes';
import { axiosWithHeaders } from "util/httpClient";
import { handleAxiosError, parseAxiosError } from "util/requestManagement";


const patientHistoryList = (historyType, patientID) => {
	return dispatch => {
		dispatch(patientHistoryListBegin(historyType));
		
		return axiosWithHeaders
			.get(`api/patient/history/${patientID}/${historyType}/`)
			.then(response => {
				dispatch(patientHistoryListSuccess(historyType, response));
				return Promise.resolve(response);
			})
			.catch(error => {
				dispatch(patientHistoryListFail(historyType, error));
				return Promise.reject(error);
			});
	};
};


const patientHistoryCreate = (historyType, patientID, historyData) => {
	return dispatch => {
		dispatch(patientHistoryCreateBegin(historyType));
		
		return axiosWithHeaders
			.post(`api/patient/history/${patientID}/${historyType}/`, historyData)
			.then(response => {
				dispatch(patientHistoryCreateSuccess(historyType, response));
				return Promise.resolve(response);
			})
			.catch(error => {
				dispatch(patientHistoryCreateFail(historyType, error, historyData.history));
				return Promise.reject(error);
			});
	};
};


const patientHistoryDelete = (historyType, patientID, historyData) => {
	const historyKey = historyData.key;
	
	return dispatch => {
		dispatch(patientHistoryDeleteBegin(historyType, historyKey));
		
		axiosWithHeaders
			.delete(`api/patient/history/${patientID}/${historyType}/${historyKey}/`)
			.then(response => {
				dispatch(patientHistoryDeleteSuccess(historyType, historyKey, response));
				return Promise.resolve(response);
			})
			.catch(error => {
				dispatch(patientHistoryDeleteFail(historyType, historyKey, error, historyData.history));
				return Promise.reject(error);
			});
	};
};


// A function to reset all history data of a particular history type
const patientHistoryReset = (historyType) => {
	return {
		type: actionTypes.PATIENT_HISTORY_RESET_HISTORY_TYPE,
		historyType,
	}
};


export {
	patientHistoryList,
	patientHistoryCreate,
	patientHistoryDelete,
	patientHistoryReset,
};


// A function to parse the history items which are retrieved from backend into frontend format
const parseResponseData = responseData => {
	// convert data to array format
	if (!Array.isArray(responseData)) {
		responseData = [responseData];
	}
	
	for (let item of responseData) {
		//convert object key 'id' to 'key'
		item.key = item.id;
		delete item.id;
		
		// recognize datetime as a moment object
		item.created = moment(item.created);
	}
	
	return responseData;
};


const patientHistoryListBegin = historyType => {
	return {
		type: actionTypes.PATIENT_HISTORY_LIST_BEGIN,
		historyType,
		actionType: 'list',
	};
};

const patientHistoryListSuccess = (historyType, response) => {
	let payload = parseResponseData(response.data);
	
	// sort in descending order
	payload.sort((item1, item2) => (item2.created - item1.created));
	
	return {
		type: actionTypes.PATIENT_HISTORY_LIST_SUCCESS,
		historyType,
		payload,
	};
};

const patientHistoryListFail = (historyType, error) => {
	const parsedError = parseAxiosError(error);
	handleAxiosError(parsedError, `${_.capitalize(historyType)} history could not be retrieved.`);
	
	return {
		type: actionTypes.PATIENT_HISTORY_LIST_FAIL,
		historyType,
	};
};


const patientHistoryCreateBegin = historyType => {
	return {
		type: actionTypes.PATIENT_HISTORY_CREATE_BEGIN,
		historyType,
		actionType: 'create',
	};
};

const patientHistoryCreateSuccess = (historyType, response) => {
	let payload = parseResponseData(response.data);
	
	return {
		type: actionTypes.PATIENT_HISTORY_CREATE_SUCCESS,
		historyType,
		payload,
	}
};

const patientHistoryCreateFail = (historyType, error, history) => {
	const parsedError = parseAxiosError(error);
	handleAxiosError(parsedError, `Could not add history "${history}".`);
	
	return {
		type: actionTypes.PATIENT_HISTORY_CREATE_FAIL,
		historyType,
	}
};


const patientHistoryDeleteBegin = (historyType, historyKey) => {
	return {
		type: actionTypes.PATIENT_HISTORY_DELETE_BEGIN,
		historyType,
		historyKey,
	};
};

const patientHistoryDeleteSuccess = (historyType, historyKey, response) => {
	return {
		type: actionTypes.PATIENT_HISTORY_DELETE_SUCCESS,
		historyType,
		historyKey,
	};
};

const patientHistoryDeleteFail = (historyType, historyKey, error, history) => {
	const parsedError = parseAxiosError(error);
	handleAxiosError(parsedError, `Could not delete history "${history}".`);
	
	return {
		type: actionTypes.PATIENT_HISTORY_DELETE_FAIL,
		historyType,
		historyKey,
	};
};