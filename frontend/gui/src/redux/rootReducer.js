import {combineReducers} from "redux";

import authReducer from "./auth/authReducers";
import changePasswordReducer from './changePassword/changePassReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    changePassword: changePasswordReducer
});

export default rootReducer;