import { combineReducers } from "redux";

import patientBasicReducer from "myredux/patient/patientBasic/patientBasicReducers";
import patientHistoryReducer from "myredux/patient/patientHistory/patientHistoryReducer";


// A reducer to combine the two patient reducers i.e. basic details and history details
const patientReducer = combineReducers({
	basic: patientBasicReducer,
	history: patientHistoryReducer,
});

export default patientReducer;