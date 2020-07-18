import moment from "moment";

function parsePatientInfo (data, convertToType) {
	let patientID = null,
		dob = null,
		emails = [],
		mobiles = [];
	
	switch (convertToType) {
		case 'py':
			patientID = data['patientID'];
			
			if (data['dob']) dob = data['dob'].format('YYYY-MM-DD');
			
			for (let email of data['emails']) {
				emails.push({
					email: email,
				})
			}
			
			for (let mobile of data['mobiles']) {
				mobiles.push({
					mobile: mobile,
				})
			}
			
			delete data['patientID'];
			data['patient_id'] = patientID;
			break;
		
		case 'js':
			patientID = data['patient_id'];
			
			if (data['dob']) dob = moment(data['dob'], 'YYYY-MM-DD');
			
			for (let email of data['emails']) {
				emails.push(email['email']);
			}
			
			for (let mobile of data['mobiles']) {
				mobiles.push(mobile['mobile']);
			}
			
			delete data['patient_id'];
			data['patientID'] = patientID;
			break;
		
		default:
	}
	
	data = {
		...data,
		dob,
		emails,
		mobiles,
	}
	return data;
}

export { parsePatientInfo };