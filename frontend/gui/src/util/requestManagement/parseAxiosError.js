import errorCodes from 'constants/errorCodes';
import * as urls from 'constants/urls';


// Always return 'message' and 'status' in the parsedError
// Don't forget to change the state of parseSuccess wherever applicable
function parseAxiosError (error, type, info = 'null') {
	if (type === undefined || type === null) {
		type = typeof error;
	}
	
	let parsedError = {
		message: null,
		status: null,
	}, parseSuccess = true;
	
	switch (type) {
		case 'object':
			switch (error.response) {
				case undefined:
					parseSuccess = false;
					parsedError = error;
					break;
				
				default:
					switch (error.response.status) {
						case 400:
							parsedError = {
								message: 'Bad request. (Status code 400)',
								status: 400,
								errorMessage: error.message,
							}
							break;
						
						case 401:
							parsedError = {
								message: 'Login credentials failed. (Status code 401)',
								status: 401,
								errorMessage: error.message,
								redirect: urls.logout,
							}
							break;
						
						case 403:
							parsedError = {
								message: 'Request denied. (Status code 403)',
								status: 403,
								errorMessage: error.message,
							}
							break;
						
						case 404:
							console.log(404);
							parsedError = {
								message: 'Requested resource could not be found. (Status code 404)',
								status: 404,
								errorMessage: error.message,
							}
							break;
						
						case 500:
							parsedError = {
								message: 'Unexpected error. (Status code 500)',
								status: 500,
								errorMessage: error.message,
							}
							break;
						
						default:
							parseSuccess = false;
							parsedError = error;
					}
			}
			break;
		
		case 'string':
			switch (error) {
				case 'Network Error':
					parsedError = {
						message: 'Backend server is not functioning. Please restart system.',
						status: errorCodes.networkError,
					};
					break;
				
				default:
					parsedError = {
						message: error,
					};
			}
			break;
		
		case 'number':
			parsedError = {
				message: `Error with code ${error}.`,
				status: error,
			}
			break;
		
		default:
			parseSuccess = false;
			parsedError = error;
	}
	
	return {
		...parsedError,
		parseSuccess,
	};
}

export default parseAxiosError;