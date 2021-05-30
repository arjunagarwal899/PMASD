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
		...info,
	}, parseSuccess = true;
	
	const backendError = {
		message: 'Backend server is not functioning. Please restart system.',
		status: errorCodes.networkError,
		...info,
	};
	
	switch (type) {
		case 'object':
			switch (error.response) {
				case undefined:
					switch (error.isAxiosError) {
						case true:
							parsedError = backendError;
							break;
						
						default:
							parseSuccess = false;
							parsedError = error;
							break;
					}
					break;
				
				default:
					switch (error.response.status) {
						case 400:
							parsedError = {
								message: 'Bad request. (Status code 400)',
								status: 400,
								errorMessage: error.message,
								...info,
							}
							break;
						
						case 401:
							parsedError = {
								message: 'Login credentials failed. (Status code 401)',
								status: 401,
								errorMessage: error.message,
								redirect: urls.logout,
								...info,
							}
							break;
						
						case 403:
							parsedError = {
								message: 'Request denied. (Status code 403)',
								status: 403,
								errorMessage: error.message,
								...info,
							}
							break;
						
						case 404:
							console.log(404);
							parsedError = {
								message: 'Requested resource could not be found. (Status code 404)',
								status: 404,
								errorMessage: error.message,
								...info,
							}
							break;
						
						case 500:
							parsedError = {
								message: 'Unexpected error. (Status code 500)',
								status: 500,
								errorMessage: error.message,
								...info,
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
					parsedError = backendError;
					break;
				
				default:
					parsedError = {
						message: error,
						...info,
					};
			}
			break;
		
		case 'number':
			parsedError = {
				message: `Error with code ${error}.`,
				status: error,
				...info,
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