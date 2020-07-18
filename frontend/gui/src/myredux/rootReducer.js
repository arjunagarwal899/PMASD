import { combineReducers } from "redux";

import authReducer from "./auth/authReducers";
import changePasswordReducer from './changePassword/changePassReducers';
import patientReducer from "./patient/patientReducers";


const rootReducer = combineReducers({
	auth: authReducer,
	changePassword: changePasswordReducer,
	patient: patientReducer,
});


export default rootReducer;