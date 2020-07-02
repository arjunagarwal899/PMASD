import {combineReducers} from "redux";

import authReducer from "./auth/authReducers";
import changePasswordReducer from './auth/changePassReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    changePass: changePasswordReducer
});

export default rootReducer;