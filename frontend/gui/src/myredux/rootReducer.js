import { combineReducers } from "redux";

import authReducer from "./auth/authReducers";
import changePasswordReducer from './changePassword/changePassReducers';
import patientBasicReducer from "myredux/patient/patientBasic/patientBasicReducers";
import patientHistoryReducer from "myredux/patient/patientHistory/patientHistoryReducer";


const rootReducer = combineReducers({
	auth: authReducer,
	changePassword: changePasswordReducer,
	patientBasic: patientBasicReducer,
	patientHistory: patientHistoryReducer,
});


export default rootReducer;