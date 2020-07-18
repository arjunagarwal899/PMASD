function getDateFormats () {
	let additionalDateFormats = ['DD-MMM-YYYY', 'DDMMYY', 'DDMMYYYY'];
	
	let formats = [];
	let days = ['D', 'DD'];
	let months = ['M', 'MM', 'MMM'];
	let years = ['YY', 'YYYY'];
	let separators = [' ', '-', '/']
	
	for (let day of days) {
		for (let month of months) {
			for (let year of years) {
				for (let separator of separators) {
					formats.push(`${day}${separator}${month}${separator}${year}`);
				}
			}
		}
	}
	
	return additionalDateFormats.concat(formats);
}


const misc = {
	selectTokenSeparators: [',', ' '],
	dateFormats: getDateFormats(),
};


export default misc;