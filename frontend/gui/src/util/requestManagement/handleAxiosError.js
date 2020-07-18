import { message } from "antd";

import history from '../../history';

function handleAxiosError (parsedError) {
	if (!parsedError.parseSuccess) return parsedError;
	
	switch (parsedError.status) {
		case 401:
			const messageKey = 'redirect';
			let timeout = 5, intervalID;
			
			message.error({
				content: `${parsedError.message}. Redirecting in ${timeout}s.`,
				key: messageKey,
				duration: 0,
			});
			intervalID = setInterval(() => {
				if (timeout === 1) {
					clearInterval(intervalID);
					history.push(parsedError.redirect);
					message.error({
						content: `Please login again.`,
						key: messageKey,
						duration: 2,
					});
				} else {
					timeout--;
					message.error({
						content: `${parsedError.message}. Redirecting in ${timeout}s.`,
						key: messageKey,
						duration: 0,
					});
				}
			}, 1000);
			break;
		
		default:
	}
	
}

export default handleAxiosError;