import axios from 'axios';
import store from "myredux/store";

const baseURL = 'http://127.0.0.1:8000/';


// If axios is being used to login
const axiosWithoutHeaders = axios.create({
	baseURL: baseURL,
});

// If axios is being used after logging in
const defaultHeaders = {
	"Content-Type": "application/json",
	Authorization: "Token " + store.getState().auth.token
};

const axiosWithHeaders = axios.create({
	baseURL: baseURL,
	headers: {
		get: defaultHeaders,
		post: defaultHeaders,
		put: defaultHeaders,
		patch: defaultHeaders,
		delete: defaultHeaders,
	}
});


export { axiosWithoutHeaders, axiosWithHeaders };
