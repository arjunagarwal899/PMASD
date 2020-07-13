import { combineReducers } from "redux";

import authReducer from "./auth/authReducers";
import changePasswordReducer from './changePassword/changePassReducers';
import validatorsReducer from "./globalConstants/validators";
import misc from "./globalConstants/misc";
import maxlengthsReducer from "./globalConstants/maxlengths";
import patientReducer from "./patient/patientReducers";


const rootReducer = combineReducers({
	auth: authReducer,
	changePassword: changePasswordReducer,
	patient: patientReducer,
	
	// Global constants
	validators: validatorsReducer,
	misc: misc,
	maxlengths: maxlengthsReducer,
});


export default rootReducer;