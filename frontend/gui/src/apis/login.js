import axios from 'axios';
import store from "../redux/store";

const baseURL = 'http://127.0.0.1:8000/';


// If axios is being used to login
const axiosLogin = axios.create({
	baseURL: baseURL,
});

// If axios is being used after logging in
const default_headers = {
	"Content-Type": "application/json",
	Authorization: "Token " + store.getState().auth.token
};

const axiosLoggedIn = axios.create({
	baseURL: baseURL,
	headers: {
		post: default_headers,
		put: default_headers,
		delete: default_headers,
	}
});


export {axiosLogin, axiosLoggedIn};
