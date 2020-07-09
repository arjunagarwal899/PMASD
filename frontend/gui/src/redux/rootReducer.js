import {combineReducers} from "redux";

import authReducer from "./auth/authReducers";
import changePasswordReducer from './changePassword/changePassReducers';
import validatorsReducer from "./globalConstants/validators";
import tokenSeparatorsReducer from "./globalConstants/tokenSerparators";
import maxlengthsReducer from "./globalConstants/maxlengths";

const rootReducer = combineReducers({
    auth: authReducer,
    changePassword: changePasswordReducer,


    // Global constants
    validators: validatorsReducer,
    tokenSeparators: tokenSeparatorsReducer,
    maxlengths: maxlengthsReducer,
});

export default rootReducer;