import { message } from "antd";

import history from '../../history';


function redirectWithTimeout (messageObj, timeoutDuration, redirectLoc) {
	if (!messageObj.key) {
		let key = '';
		for (let i = 0; i < 6; i++) {
			key += '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 36)];
		}
		
		messageObj.key = key;
	}
	
	console.log(messageObj.key);
	
	
	message.error({
		...messageObj,
		content: `${messageObj.content} Redirecting in ${timeoutDuration}s.`,
		duration: 0,
	});
	let intervalID = setInterval(() => {
		if (timeoutDuration === 1) {
			clearInterval(intervalID);
			history.push(redirectLoc);
			message.error(messageObj);
		} else {
			timeoutDuration--;
			message.error({
				...messageObj,
				content: `${messageObj.content} Redirecting in ${timeoutDuration}s.`,
				duration: 0,
			})
		}
	}, 1000);
}


function handleAxiosError (parsedError, customMessage = null) {
	if (!parsedError.parseSuccess) return parsedError;
	
	customMessage = customMessage || parsedError.message;
	
	if (parsedError.redirect) {
		redirectWithTimeout({
			content: customMessage,
			duration: 3,
		}, 5, parsedError.redirect);
	} else {
		message.error({
			content: customMessage,
		})
	}
}

export default handleAxiosError;