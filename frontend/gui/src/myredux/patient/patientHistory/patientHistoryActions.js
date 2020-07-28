import moment from "moment";

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
				dispatch(patientHistoryCreateFail(historyType, error));
				return Promise.reject(error);
			});
	};
};


const patientHistoryUpdate = (historyType, patientID, newHistoryData) => {
	return dispatch => {
		dispatch(patientHistoryUpdateBegin());
		
		return axiosWithHeaders
			.patch(`api/patient/history/${patientID}/${historyType}/`, newHistoryData)
			.then(response => {
				dispatch(patientHistoryUpdateSuccess());
			})
			.catch(error => {
				dispatch(patientHistoryUpdateFail());
			});
	};
};


const patientHistoryDelete = (historyType, patientID, historyKey) => {
	return dispatch => {
		dispatch(patientHistoryDeleteBegin(historyType, historyKey));
		
		axiosWithHeaders
			.delete(`api/patient/history/${patientID}/${historyType}/${historyKey}/`)
			.then(response => {
				dispatch(patientHistoryDeleteSuccess(historyType, historyKey, response));
				return Promise.resolve(response);
			})
			.catch(error => {
				dispatch(patientHistoryDeleteFail(historyType, historyKey, error));
				return Promise.reject(error);
			});
	};
};


const patientHistoryReset = (historyType) => {
	return {
		type: actionTypes.PATIENT_HISTORY_RESET_HISTORY_TYPE,
		historyType,
	}
};


export {
	patientHistoryList,
	patientHistoryCreate,
	patientHistoryUpdate,
	patientHistoryDelete,
	patientHistoryReset,
};

// TODO Add failure custom messages

const parseResponseData = responseData => {
	if (!Array.isArray(responseData)) {
		responseData = [responseData];
	}
	
	for (let item of responseData) {
		item.key = item.id;
		delete item.id;
		
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
	
	payload.sort((item1, item2) => (item2.created - item1.created));
	
	return {
		type: actionTypes.PATIENT_HISTORY_LIST_SUCCESS,
		historyType,
		payload,
	};
};

const patientHistoryListFail = (historyType, error) => {
	const parsedError = parseAxiosError(error);
	handleAxiosError(parsedError, `${historyType.charAt(0).toUpperCase() + historyType.slice(1)} history could not be retrieved.`);
	
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

const patientHistoryCreateFail = (historyType, error) => {
	const parsedError = parseAxiosError(error);
	handleAxiosError(parsedError);
	
	return {
		type: actionTypes.PATIENT_HISTORY_CREATE_FAIL,
		historyType,
	}
};


const patientHistoryUpdateBegin = historyType => {

};

const patientHistoryUpdateSuccess = (historyType, response) => {

};

const patientHistoryUpdateFail = (historyType, error) => {

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

const patientHistoryDeleteFail = (historyType, historyKey, error) => {
	const parsedError = parseAxiosError(error);
	handleAxiosError(parsedError);
	
	return {
		type: actionTypes.PATIENT_HISTORY_DELETE_FAIL,
		historyType,
		historyKey,
	};
};